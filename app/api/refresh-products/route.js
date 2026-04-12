import { kv } from "@vercel/kv";
import {
  SEASONS,
  REFRESH_CATEGORIES,
  TIERS,
  buildKvKey,
  buildPerplexityPrompt,
} from "@/lib/seasons";

const KV_TTL = 691200; // 8 days in seconds
const RATE_LIMIT_MS = 200; // delay between Perplexity calls

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Call Perplexity Sonar API for a single product slot.
 */
async function fetchProduct(season, category, tier) {
  const prompt = buildPerplexityPrompt(season, category, tier);
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

  // Extract JSON from response (handle potential markdown wrapping)
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error(`No JSON found in response: ${content.slice(0, 200)}`);

  const product = JSON.parse(jsonMatch[0]);

  // Validate required fields
  const required = ["brand", "product", "shade", "price", "buy_url"];
  for (const field of required) {
    if (!product[field]) throw new Error(`Missing field: ${field}`);
  }

  return product;
}

export async function POST(request) {
  const startTime = Date.now();

  // Auth check
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check for Perplexity API key
  if (!process.env.PERPLEXITY_API_KEY) {
    return Response.json(
      { error: "PERPLEXITY_API_KEY not configured" },
      { status: 500 }
    );
  }

  let success = 0;
  let failed = 0;
  const errors = [];

  for (const season of SEASONS) {
    for (const category of REFRESH_CATEGORIES) {
      for (const tier of TIERS) {
        const key = buildKvKey(season.id, category, tier.name);

        try {
          const product = await fetchProduct(season, category, tier.name);
          product.refreshed_at = new Date().toISOString();

          await kv.set(key, JSON.stringify(product), { ex: KV_TTL });
          success++;
          console.log(`[refresh] OK: ${key}`);
        } catch (err) {
          failed++;
          const msg = `${key}: ${err.message}`;
          errors.push(msg);
          console.error(`[refresh] FAIL: ${msg}`);
        }

        // Rate limit
        await sleep(RATE_LIMIT_MS);
      }
    }
  }

  const duration = Date.now() - startTime;

  return Response.json({
    success,
    failed,
    total: success + failed,
    duration_ms: duration,
    errors: errors.slice(0, 20), // cap error list
  });
}

// Vercel cron hits GET by default
export async function GET(request) {
  // Vercel cron sends authorization via CRON_SECRET automatically
  return POST(request);
}
