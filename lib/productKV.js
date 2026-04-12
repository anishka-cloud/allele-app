/**
 * Reads product data from Vercel KV with fallback to static productData.js.
 * Used by ResultsContent to display current, in-stock recommendations.
 */
import { kv } from "@vercel/kv";
import { SEASONS, REFRESH_CATEGORIES, TIERS, buildKvKey, CATEGORY_KEY_MAP, TIER_KEY_MAP } from "./seasons";

// Inverse map: productData key → tier key for productDB
const TIER_DB_MAP = { Budget: "budget", "Best Value": "value", Splurge: "splurge" };

/**
 * Fetch all 24 products for a season from KV.
 * Returns null if KV is unavailable or has no data for this season.
 * Format matches what productData.js getProductRecommendations() returns.
 */
export async function getKVProducts(seasonName) {
  try {
    // Find season metadata
    const season = SEASONS.find((s) => s.name === seasonName);
    if (!season) return null;

    // Build all 24 keys
    const keys = [];
    for (const category of REFRESH_CATEGORIES) {
      for (const tier of TIERS) {
        keys.push({
          kvKey: buildKvKey(season.id, category, tier.name),
          category,
          tier: tier.name,
        });
      }
    }

    // Parallel fetch from KV
    const results = await Promise.all(
      keys.map(async ({ kvKey, category, tier }) => {
        try {
          const raw = await kv.get(kvKey);
          if (!raw) return { category, tier, product: null };
          const product = typeof raw === "string" ? JSON.parse(raw) : raw;
          return { category, tier, product };
        } catch {
          return { category, tier, product: null };
        }
      })
    );

    // Check if we have any KV data at all
    const hasData = results.some((r) => r.product !== null);
    if (!hasData) return null;

    // Restructure into productData.js format:
    // { categories: [{ key, label, icon, tiers: { budget: [...], value: [...], splurge: [...] } }] }
    const categoryMap = {};

    for (const { category, tier, product } of results) {
      if (!product) continue;
      const catKey = CATEGORY_KEY_MAP[category];
      const tierKey = TIER_DB_MAP[tier];
      if (!catKey || !tierKey) continue;

      if (!categoryMap[catKey]) {
        categoryMap[catKey] = { budget: [], value: [], splurge: [] };
      }

      // Build product object matching productDB format
      categoryMap[catKey][tierKey].push({
        brand: product.brand,
        product: product.product,
        shade: product.shade,
        price: product.price,
        hex: "#999999", // KV products don't have hex — UI uses brand color or default
        buy_url: product.buy_url,
        why: product.why,
        source: "kv",
      });
    }

    return categoryMap;
  } catch (err) {
    console.error("[productKV] Error reading from KV:", err);
    return null;
  }
}
