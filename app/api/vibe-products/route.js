import { kv } from "@vercel/kv";
import {
  VIBE_ARCHETYPES,
  VIBE_CATEGORIES,
  VIBE_TIERS,
  buildVibeKvKey,
} from "@/lib/vibeRefresh";

const TIER_DB_MAP = { Budget: "budget", "Best Value": "value", Splurge: "splurge" };

/**
 * GET /api/vibe-products?archetype=CG
 *
 * Returns all 24 products for an archetype from Vercel KV.
 * Returns { source: "kv", products: {...} } or { source: null }.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("archetype");

  if (!code) {
    return Response.json({ error: "archetype parameter required" }, { status: 400 });
  }

  const archetype = VIBE_ARCHETYPES.find((a) => a.code === code);
  if (!archetype) {
    return Response.json({ source: null });
  }

  try {
    const fetches = [];
    for (const category of VIBE_CATEGORIES) {
      for (const tier of VIBE_TIERS) {
        fetches.push({
          kvKey: buildVibeKvKey(archetype.id, category.key, tier.name),
          categoryKey: category.key,
          tierName: tier.name,
        });
      }
    }

    const results = await Promise.all(
      fetches.map(async ({ kvKey, categoryKey, tierName }) => {
        try {
          const raw = await kv.get(kvKey);
          if (!raw) return null;
          const product = typeof raw === "string" ? JSON.parse(raw) : raw;
          return { categoryKey, tier: tierName, ...product };
        } catch {
          return null;
        }
      })
    );

    const products = results.filter(Boolean);
    if (products.length === 0) {
      return Response.json({ source: null });
    }

    // Restructure into vibeProducts format: { top: { budget: {...}, value: {...}, splurge: {...} } }
    const categoryMap = {};
    for (const item of products) {
      const tierKey = TIER_DB_MAP[item.tier];
      if (!tierKey) continue;

      if (!categoryMap[item.categoryKey]) {
        categoryMap[item.categoryKey] = {};
      }

      categoryMap[item.categoryKey][tierKey] = {
        brand: item.brand,
        product: item.product,
        shade: item.shade,
        price: typeof item.price === "string" ? parseInt(item.price.replace(/[^0-9]/g, "")) : item.price,
        swatch: "#999999",
        onSkinSwatch: "#999999",
        buy_url: item.buy_url,
        why: item.why,
      };
    }

    return Response.json({
      source: "kv",
      archetype: code,
      refreshed_at: products[0]?.refreshed_at || null,
      count: products.length,
      products: categoryMap,
    });
  } catch (err) {
    console.error("[vibe-products API] KV read error:", err);
    return Response.json({ source: null });
  }
}
