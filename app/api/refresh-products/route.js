import { kv } from "@vercel/kv";
import {
  SEASONS,
  REFRESH_CATEGORIES,
  TIERS,
  buildKvKey,
  buildPerplexityPrompt,
} from "@/lib/seasons";
import {
  VIBE_ARCHETYPES,
  VIBE_CATEGORIES,
  VIBE_TIERS,
  buildVibeKvKey,
  buildVibePerplexityPrompt,
} from "@/lib/vibeRefresh";

const KV_TTL = 691200; // 8 days in seconds
const RATE_LIMIT_MS = 200; // delay between Perplexity calls

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Call Perplexity Sonar API with a given prompt.
 */
async function fetchFromPerplexity(prompt) {
  const apiKey = process.env.PERPLEXITY_API_KEY;

  const res = await fetch("https://api.perplexity.ai/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "sonar",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
      max_tokens: 300,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "unknown");
    throw new Error(`Perplexity API ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty response from Perplexity");

  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error(`No JSON found in response: ${content.slice(0, 200)}`);

  const product = JSON.parse(jsonMatch[0]);

  const required = ["brand", "product", "shade", "price", "buy_url"];
  for (const field of required) {
    if (!product[field]) throw new Error(`Missing field: ${field}`);
  }

  return product;
}

/**
 * Refresh Shade DNA products. If seasonId is provided, only refresh that season (24 calls).
 * Otherwise refresh all 288 slots.
 */
async function refreshShade(counters, seasonId = null) {
  const seasonsToRefresh = seasonId
    ? SEASONS.filter((s) => s.id === seasonId)
    : SEASONS;

  for (const season of seasonsToRefresh) {
    for (const category of REFRESH_CATEGORIES) {
      for (const tier of TIERS) {
        const key = buildKvKey(season.id, category, tier.name);
        try {
          const prompt = buildPerplexityPrompt(season, category, tier.name);
          const product = await fetchFromPerplexity(prompt);
          product.refreshed_at = new Date().toISOString();
          await kv.set(key, JSON.stringify(product), { ex: KV_TTL });
          counters.success++;
          console.log(`[refresh] OK: ${key}`);
        } catch (err) {
          counters.failed++;
          counters.errors.push(`${key}: ${err.message}`);
          console.error(`[refresh] FAIL: ${key}: ${err.message}`);
        }
        await sleep(RATE_LIMIT_MS);
      }
    }
  }
}

/**
 * Refresh Vibe DNA products. If archetypeId is provided, only refresh that archetype (24 calls).
 */
async function refreshVibe(counters, archetypeId = null) {
  const archetypesToRefresh = archetypeId
    ? VIBE_ARCHETYPES.filter((a) => a.id === archetypeId)
    : VIBE_ARCHETYPES;

  for (const archetype of archetypesToRefresh) {
    for (const category of VIBE_CATEGORIES) {
      for (const tier of VIBE_TIERS) {
        const key = buildVibeKvKey(archetype.id, category.key, tier.name);
        try {
          const prompt = buildVibePerplexityPrompt(archetype, category, tier.name);
          const product = await fetchFromPerplexity(prompt);
          product.refreshed_at = new Date().toISOString();
          await kv.set(key, JSON.stringify(product), { ex: KV_TTL });
          counters.success++;
          console.log(`[refresh] OK: ${key}`);
        } catch (err) {
          counters.failed++;
          counters.errors.push(`${key}: ${err.message}`);
          console.error(`[refresh] FAIL: ${key}: ${err.message}`);
        }
        await sleep(RATE_LIMIT_MS);
      }
    }
  }
}

export async function POST(request) {
  const startTime = Date.now();

  // Auth check
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.PERPLEXITY_API_KEY) {
    return Response.json(
      { error: "PERPLEXITY_API_KEY not configured" },
      { status: 500 }
    );
  }

  const url = new URL(request.url);
  const type = url.searchParams.get("type"); // "shade", "vibe", or null (both)
  const season = url.searchParams.get("season"); // e.g. "clear-spring" — refreshes one season only
  const archetype = url.searchParams.get("archetype"); // e.g. "clean-girl" — refreshes one archetype only

  const counters = { success: 0, failed: 0, errors: [] };

  if (!type || type === "shade") {
    await refreshShade(counters, season || null);
  }
  if (!type || type === "vibe") {
    await refreshVibe(counters, archetype || null);
  }

  const duration = Date.now() - startTime;

  return Response.json({
    success: counters.success,
    failed: counters.failed,
    total: counters.success + counters.failed,
    duration_ms: duration,
    errors: counters.errors.slice(0, 30),
  });
}

// Vercel cron hits GET by default
export async function GET(request) {
  return POST(request);
}
