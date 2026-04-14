// ShopMy collection URLs per season — used by ResultsContent and
// emailTemplate as a fallback "shop the whole palette" link.
//
// The previous version of this file contained a 2500-line curated product
// table auto-generated from fabricated source data (Glossier nail polish,
// miscategorized shades, wrong brand/product combos). That table was never
// imported by any render path — ResultsContent builds Amazon search URLs
// inline from the patched productData.js, which is the canonical source.
// The table was removed 2026-04-14 as dead code. Only the ShopMy collection
// fallbacks are kept.

const SEASON_FALLBACK = {
  "Clear Spring": "https://shopmy.us/collections/4672985",
  "True Spring": "https://shopmy.us/collections/4673080",
  "Light Spring": "https://shopmy.us/collections/4673208",
  "Soft Summer": "https://shopmy.us/collections/4678999",
  "True Summer": "https://shopmy.us/collections/4679320",
  "Light Summer": "https://shopmy.us/collections/4679551",
  "Soft Autumn": "https://shopmy.us/collections/4680251",
  "True Autumn": "https://shopmy.us/collections/4680429",
  "Dark Autumn": "https://shopmy.us/collections/4680621",
  "Dark Winter": "https://shopmy.us/collections/4680854",
  "True Winter": "https://shopmy.us/collections/4681130",
  "Bright Winter": "https://shopmy.us/collections/4681313",
};

const FALLBACK_URL = "https://shopmy.us/shop/nish";

export function getShopUrl(season) {
  return SEASON_FALLBACK[season] || FALLBACK_URL;
}
