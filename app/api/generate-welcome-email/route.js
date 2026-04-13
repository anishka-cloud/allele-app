import { kv } from "@vercel/kv";
import { generateWelcomeEmail } from "@/lib/emailTemplate";
import {
  SEASONS,
  REFRESH_CATEGORIES,
  TIERS,
  buildKvKey,
  CATEGORY_KEY_MAP,
} from "@/lib/seasons";

const TIER_DB_MAP = { Budget: "budget", "Best Value": "value", Splurge: "splurge" };

// KV hydration disabled — the Perplexity refresh job writes placeholder hex
// (#999999), miscategorizes products (highlighters as concealers, eyeshadows
// as nail polish), and fabricates product names. See the KV_HYDRATION flag
// in app/results/ResultsContent.js for the matching disable on the website.
// Flip back to true only after the refresh pipeline is rebuilt with
// validation.
const KV_ENABLED = false;

/**
 * POST /api/generate-welcome-email
 * Body: { season: "Clear Spring" }
 *
 * Returns: { subject, previewText, html }
 * Products are pulled from KV (if available) with static fallback.
 */
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const seasonName = body.season;

  if (!seasonName) {
    return Response.json({ error: "season field required" }, { status: 400 });
  }

  // Try to read KV products for this season (gated behind KV_ENABLED).
  let kvProducts = null;
  const season = SEASONS.find((s) => s.name === seasonName);

  if (KV_ENABLED && season) {
    try {
      const fetches = [];
      for (const category of REFRESH_CATEGORIES) {
        for (const tier of TIERS) {
          fetches.push({
            kvKey: buildKvKey(season.id, category, tier.name),
            category,
            tierName: tier.name,
          });
        }
      }

      const results = await Promise.all(
        fetches.map(async ({ kvKey, category, tierName }) => {
          try {
            const raw = await kv.get(kvKey);
            if (!raw) return null;
            const product = typeof raw === "string" ? JSON.parse(raw) : raw;
            return { category, tier: tierName, ...product };
          } catch {
            return null;
          }
        })
      );

      const products = results.filter(Boolean);
      if (products.length > 0) {
        kvProducts = {};
        for (const item of products) {
          const catKey = CATEGORY_KEY_MAP[item.category];
          const tierKey = TIER_DB_MAP[item.tier];
          if (!catKey || !tierKey) continue;
          if (!kvProducts[catKey]) kvProducts[catKey] = { budget: [], value: [], splurge: [] };
          kvProducts[catKey][tierKey].push({
            brand: item.brand,
            product: item.product,
            shade: item.shade,
            price: item.price,
            buy_url: item.buy_url,
          });
        }
      }
    } catch (err) {
      console.error("[generate-welcome-email] KV read error:", err);
    }
  }

  const email = generateWelcomeEmail(seasonName, kvProducts);

  return Response.json({
    ...email,
    source: kvProducts ? "kv" : "static",
    season: seasonName,
  });
}

/**
 * GET /api/generate-welcome-email?season=Clear+Spring
 * Same as POST but via query param. Convenient for browser preview.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const seasonName = searchParams.get("season");

  if (!seasonName) {
    return Response.json({ error: "season parameter required" }, { status: 400 });
  }

  // Reuse POST logic
  const fakeRequest = {
    json: async () => ({ season: seasonName }),
  };
  return POST(fakeRequest);
}
