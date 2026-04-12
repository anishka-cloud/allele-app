/**
 * Season metadata + Perplexity prompt builder for the zero-human product refresh system.
 * 12 seasons × 8 categories × 3 tiers = 288 product slots.
 */

export const SEASONS = [
  {
    id: "clear-spring",
    name: "Clear Spring",
    undertone: "warm",
    depth: "medium",
    chroma: "bright",
    paletteCharacter: "coral, peach, golden yellow, warm red",
    blushTone: "warm peach or coral",
    finish: "luminous",
  },
  {
    id: "true-spring",
    name: "True Spring",
    undertone: "warm",
    depth: "medium",
    chroma: "bright",
    paletteCharacter: "golden, peachy, fresh coral, warm green",
    blushTone: "warm peach or golden coral",
    finish: "luminous",
  },
  {
    id: "light-spring",
    name: "Light Spring",
    undertone: "warm",
    depth: "light",
    chroma: "soft-bright",
    paletteCharacter: "blush, light peach, golden, warm ivory",
    blushTone: "delicate warm peach",
    finish: "luminous",
  },
  {
    id: "light-summer",
    name: "Light Summer",
    undertone: "cool",
    depth: "light",
    chroma: "soft-muted",
    paletteCharacter: "dusty rose, soft lavender, light blue-pink, soft grey",
    blushTone: "soft cool rose",
    finish: "natural",
  },
  {
    id: "true-summer",
    name: "True Summer",
    undertone: "cool",
    depth: "medium",
    chroma: "muted",
    paletteCharacter: "mauve, soft raspberry, dusty pink, cool lilac",
    blushTone: "cool rose or soft berry",
    finish: "natural",
  },
  {
    id: "soft-summer",
    name: "Soft Summer",
    undertone: "cool-neutral",
    depth: "medium",
    chroma: "very-muted",
    paletteCharacter: "grayed rose, taupe, soft plum, cool greige",
    blushTone: "muted rose or cool taupe-pink",
    finish: "natural",
  },
  {
    id: "soft-autumn",
    name: "Soft Autumn",
    undertone: "warm",
    depth: "medium",
    chroma: "muted",
    paletteCharacter: "terracotta, dusty peach, warm brown, muted olive",
    blushTone: "muted warm peach or soft terracotta",
    finish: "satin",
  },
  {
    id: "true-autumn",
    name: "True Autumn",
    undertone: "warm",
    depth: "medium-deep",
    chroma: "muted",
    paletteCharacter: "pumpkin, brick, warm brown, olive, rust",
    blushTone: "warm terracotta or brick",
    finish: "satin",
  },
  {
    id: "dark-autumn",
    name: "Dark Autumn",
    undertone: "warm",
    depth: "deep",
    chroma: "muted",
    paletteCharacter: "chocolate, deep burgundy, rich terracotta, forest green",
    blushTone: "deep terracotta or warm burgundy",
    finish: "satin",
  },
  {
    id: "dark-winter",
    name: "Dark Winter",
    undertone: "cool",
    depth: "deep",
    chroma: "muted",
    paletteCharacter: "deep navy, plum, charcoal, deep wine",
    blushTone: "deep cool berry or plum",
    finish: "soft-matte",
  },
  {
    id: "true-winter",
    name: "True Winter",
    undertone: "cool",
    depth: "deep",
    chroma: "bright",
    paletteCharacter: "pure red, hot pink, black, icy white, royal blue",
    blushTone: "bold cool berry or fuchsia",
    finish: "soft-matte",
  },
  {
    id: "bright-winter",
    name: "Bright Winter",
    undertone: "cool",
    depth: "medium-deep",
    chroma: "vivid",
    paletteCharacter:
      "fuchsia, electric blue, bright berry, icy pink, vivid purple",
    blushTone: "vivid cool pink or bright berry",
    finish: "soft-matte",
  },
];

export const REFRESH_CATEGORIES = [
  "Foundation",
  "Concealer",
  "Lips",
  "Lip Liner",
  "Blush",
  "Eyeshadow",
  "Bronzer",
  "Nails",
];

export const TIERS = [
  { name: "Budget", range: "under $15" },
  { name: "Best Value", range: "$16–$35" },
  { name: "Splurge", range: "$36+" },
];

// Map category names to KV key slugs and productData.js keys
export const CATEGORY_KEY_MAP = {
  Foundation: "foundation",
  Concealer: "concealer",
  Lips: "lips",
  "Lip Liner": "lipLiner",
  Blush: "blush",
  Eyeshadow: "eyes",
  Bronzer: "bronzer",
  Nails: "nails",
};

export const TIER_KEY_MAP = {
  Budget: "budget",
  "Best Value": "best-value",
  Splurge: "splurge",
};

/**
 * Build a KV key for a product slot.
 * e.g. "products:clear-spring:foundation:budget"
 */
export function buildKvKey(seasonId, category, tier) {
  const catSlug = CATEGORY_KEY_MAP[category] || category.toLowerCase();
  const tierSlug = TIER_KEY_MAP[tier] || tier.toLowerCase();
  return `products:${seasonId}:${catSlug}:${tierSlug}`;
}

/**
 * Category-specific prompt additions for Perplexity.
 */
function getCategoryAddition(category, season) {
  const warmSeasons = ["warm"];
  const isWarm = warmSeasons.includes(season.undertone);

  switch (category) {
    case "Foundation":
      return `Additional: The shade must match medium-depth skin with ${season.undertone} undertones. Recommend a formula with ${season.finish} finish appropriate for ${season.name} skin tone.`;
    case "Concealer":
      return `Additional: Shade should be 1-2 shades lighter than foundation for ${season.name}. Undertone must be ${season.undertone}. Avoid shades with opposing undertones.`;
    case "Lips":
      return `Additional: Shade color family must harmonize with ${season.name} palette: ${season.paletteCharacter}. Avoid shades from contrasting palette families.`;
    case "Lip Liner":
      return `Additional: Must work as a nude liner OR complement the lips recommendation. Shade should be close to the natural lip color for ${season.name} coloring.`;
    case "Blush":
      return `Additional: Blush tone must be ${season.blushTone}. ${isWarm ? "Warm seasons: peachy, coral, warm pink, terracotta." : "Cool seasons: rose, berry, cool pink, mauve."}`;
    case "Eyeshadow":
      return `Additional: Recommend a single versatile shade (not a palette) in a neutral that complements ${season.name}. ${isWarm ? "Warm tones: warm taupe, peachy brown, golden, champagne, bronze, terracotta, olive." : "Cool tones: cool taupe, soft mauve, grey-brown, rose, cool grey, deep navy."}`;
    case "Bronzer":
      return `Additional: Bronzer undertone must be ${season.undertone}. ${isWarm ? "Use orange-bronze, golden, or terracotta." : "Use neutral-cool bronze or grey-brown. Avoid orange bronzer entirely."}`;
    case "Nails":
      return `Additional: Polish color must be from ${season.name}'s wearable palette: ${season.paletteCharacter}. Recommend one specific shade name, not just a color family.`;
    default:
      return "";
  }
}

/**
 * Build the full Perplexity prompt for one [season × category × tier] slot.
 */
export function buildPerplexityPrompt(season, category, tier) {
  const tierObj = TIERS.find((t) => t.name === tier);
  const tierRange = tierObj ? tierObj.range : tier;
  const categoryAddition = getCategoryAddition(category, season);

  let tierBrandGuidance = "";
  if (tier === "Budget") {
    tierBrandGuidance =
      "For Budget tier: drugstore brands (e.g., L'Oréal, NYX, Maybelline, e.l.f., Milani)";
  } else if (tier === "Best Value") {
    tierBrandGuidance =
      "For Best Value tier: mid-range brands (e.g., Rare Beauty, Milk Makeup, Glossier, Urban Decay)";
  } else {
    tierBrandGuidance =
      "For Splurge tier: luxury brands (e.g., Charlotte Tilbury, NARS, Tom Ford, Armani Beauty, Pat McGrath)";
  }

  return `You are a professional makeup artist and color analyst specializing in seasonal color analysis.

I need ONE makeup product recommendation for a ${season.name} color season.

Season characteristics: ${season.undertone} undertone, ${season.depth} depth, ${season.chroma} chroma. Palette: ${season.paletteCharacter}.
Category: ${category}
Price tier: ${tier} (${tierRange})

${categoryAddition}

Return ONLY a JSON object with this exact structure:
{
  "brand": "Brand Name",
  "product": "Product Name",
  "shade": "Shade Name",
  "price": "$XX",
  "buy_url": "https://sephora.com/... or https://amazon.com/... or https://ulta.com/...",
  "why": "One sentence: why this shade works for ${season.name} coloring"
}

Requirements:
- Product must currently be available (in stock, not discontinued)
- Shade must be appropriate for ${season.name} undertone (${season.undertone}) and depth (${season.depth})
- Prefer products from: Sephora, Ulta, Amazon — link to the exact product page
- ${tierBrandGuidance}
- Do NOT recommend discontinued products or limited editions
- Return ONLY the JSON. No other text.`;
}
