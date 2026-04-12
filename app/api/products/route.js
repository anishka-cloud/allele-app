import { kv } from "@vercel/kv";
import {
  SEASONS,
  REFRESH_CATEGORIES,
  TIERS,
  buildKvKey,
  CATEGORY_KEY_MAP,
} from "@/lib/seasons";

const TIER_DB_MAP = { Budget: "budget", "Best Value": "value", Splurge: "splurge" };

/**
 * GET /api/products?season=Clear+Spring
 *
 * Returns all 24 products for a season from Vercel KV.
 * Returns { source: "kv", products: {...} } or { source: null } if no KV data.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const seasonName = searchParams.get("season");

  if (!seasonName) {
    return Response.json({ error: "season parameter required" }, { status: 400 });
  }

  const season = SEASONS.find((s) => s.name === seasonName);
  if (!season) {
    return Response.json({ source: null });
  }

  try {
    // Build all 24 keys and fetch in parallel
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
    if (products.length === 0) {
      return Response.json({ source: null });
    }

    // Restructure into productDB format for the UI
    const categoryMap = {};
    for (const item of products) {
      const catKey = CATEGORY_KEY_MAP[item.category];
      const tierKey = TIER_DB_MAP[item.tier];
      if (!catKey || !tierKey) continue;

      if (!categoryMap[catKey]) {
        categoryMap[catKey] = { budget: [], value: [], splurge: [] };
      }

      categoryMap[catKey][tierKey].push({
        brand: item.brand,
        product: item.product,
        shade: item.shade,
        price: item.price,
        hex: "#999999",
        buy_url: item.buy_url,
        why: item.why,
      });
    }

    return Response.json({
      source: "kv",
      refreshed_at: products[0]?.refreshed_at || null,
      count: products.length,
      products: categoryMap,
    });
  } catch (err) {
    console.error("[products API] KV read error:", err);
    return Response.json({ source: null });
  }
}
