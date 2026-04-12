/**
 * Vibe DNA archetype metadata + Perplexity prompt builder for zero-human product refresh.
 * 11 archetypes × 8 categories × 3 tiers = 264 product slots.
 */

export const VIBE_ARCHETYPES = [
  {
    id: "clean-girl",
    code: "CG",
    name: "Clean Girl",
    aesthetic: "Effortless polish, understated luxury, minimal but intentional",
    keyPieces: "white tee, gold hoops, tailored trousers, clean sneakers",
    brands: "Skims, COS, Mejuri, The Row, Everlane",
  },
  {
    id: "coastal-grandmother",
    code: "COG",
    name: "Coastal Grandmother",
    aesthetic: "Nancy Meyers elegance, linen and cashmere, seaside sophistication",
    keyPieces: "linen shirt, wide-leg trousers, straw tote, loafers",
    brands: "Eileen Fisher, J.Crew, Jenni Kayne, L.L.Bean, Vince",
  },
  {
    id: "quiet-luxury",
    code: "OM",
    name: "Quiet Luxury",
    aesthetic: "Heritage quality, no logos, investment dressing, old money",
    keyPieces: "cashmere sweater, wool coat, leather loafers, structured bag",
    brands: "The Row, Brunello Cucinelli, Loro Piana, Totême, Max Mara",
  },
  {
    id: "dark-academia",
    code: "DA",
    name: "Dark Academia",
    aesthetic: "Intellectual, library-inspired, tweed and leather, autumnal tones",
    keyPieces: "blazer, turtleneck, oxford shoes, satchel bag",
    brands: "Ralph Lauren, Barbour, Dr. Martens, Cambridge Satchel, J.Crew",
  },
  {
    id: "cottagecore",
    code: "CT",
    name: "Cottagecore",
    aesthetic: "Pastoral romance, handmade details, floral prints, soft textures",
    keyPieces: "floral dress, knit cardigan, Mary Janes, wicker basket",
    brands: "Doen, Christy Dawn, Reformation, Free People, Hill House",
  },
  {
    id: "coquette",
    code: "CQ",
    name: "Coquette",
    aesthetic: "Soft femininity, bows, pastels, dainty details, romantic",
    keyPieces: "bow blouse, mini skirt, ballet flats, pearl jewelry",
    brands: "Sézane, Rouje, Miu Miu, Sandy Liang, LoveShackFancy",
  },
  {
    id: "y2k-revival",
    code: "Y2K",
    name: "Y2K Revival",
    aesthetic: "Early 2000s nostalgia, low-rise, metallics, bold colors, fun",
    keyPieces: "baby tee, low-rise jeans, platform shoes, mini bag",
    brands: "Juicy Couture, Steve Madden, Urban Outfitters, ASOS, Nasty Gal",
  },
  {
    id: "balletcore",
    code: "BC",
    name: "Balletcore",
    aesthetic: "Graceful discipline, ballet-inspired, blush tones, soft structure",
    keyPieces: "wrap top, tulle skirt, ballet flats, ribbon details",
    brands: "Repetto, Capezio, Free People, Zara, & Other Stories",
  },
  {
    id: "scandi-minimalist",
    code: "SM",
    name: "Scandi Minimalist",
    aesthetic: "Clean lines, architectural, edited wardrobe, neutral palette",
    keyPieces: "structured coat, straight-leg trousers, minimal sneakers, tote",
    brands: "COS, Arket, Totême, Acne Studios, & Other Stories",
  },
  {
    id: "indie-sleaze",
    code: "IS",
    name: "Indie Sleaze",
    aesthetic: "Thrifted, undone, interesting textures, band tees, vintage",
    keyPieces: "vintage band tee, leather jacket, skinny jeans, ankle boots",
    brands: "AllSaints, Urban Outfitters, Levi's, Dr. Martens, Madewell",
  },
  {
    id: "tomboy-luxe",
    code: "TL",
    name: "Tomboy Luxe",
    aesthetic: "Menswear-inspired, androgynous, powerful, tailored but relaxed",
    keyPieces: "oversized blazer, wide-leg pants, loafers, structured bag",
    brands: "The Frankie Shop, COS, Vince, Anine Bing, Nili Lotan",
  },
];

export const VIBE_CATEGORIES = [
  { key: "top", name: "Signature Top", description: "defining upper-body piece" },
  { key: "bottom", name: "Signature Bottom", description: "key bottom piece" },
  { key: "layer", name: "Layering Piece", description: "outerwear or layering essential" },
  { key: "shoes", name: "Shoes", description: "signature footwear" },
  { key: "bag", name: "Bag", description: "everyday bag" },
  { key: "jewelry", name: "Jewelry", description: "signature jewelry piece" },
  { key: "fragrance", name: "Fragrance", description: "signature scent" },
  { key: "finishing", name: "Finishing Touch", description: "the detail that completes the look" },
];

export const VIBE_TIERS = [
  { name: "Budget", range: "under $50" },
  { name: "Best Value", range: "$50–$150" },
  { name: "Splurge", range: "$150+" },
];

export const VIBE_TIER_KEY_MAP = {
  Budget: "budget",
  "Best Value": "best-value",
  Splurge: "splurge",
};

/**
 * Build a KV key for a Vibe DNA product slot.
 * e.g. "vibe:clean-girl:top:budget"
 */
export function buildVibeKvKey(archetypeId, categoryKey, tier) {
  const tierSlug = VIBE_TIER_KEY_MAP[tier] || tier.toLowerCase();
  return `vibe:${archetypeId}:${categoryKey}:${tierSlug}`;
}

/**
 * Build Perplexity prompt for a Vibe DNA product slot.
 */
export function buildVibePerplexityPrompt(archetype, category, tier) {
  const tierObj = VIBE_TIERS.find((t) => t.name === tier);
  const tierRange = tierObj ? tierObj.range : tier;

  let tierBrandGuidance = "";
  if (tier === "Budget") {
    tierBrandGuidance = "Budget tier: affordable brands (e.g., Uniqlo, H&M, ASOS, Target, Amazon Essentials, Zara)";
  } else if (tier === "Best Value") {
    tierBrandGuidance = "Best Value tier: mid-range brands (e.g., Madewell, COS, & Other Stories, Everlane, Banana Republic)";
  } else {
    tierBrandGuidance = "Splurge tier: premium/luxury brands (e.g., The Row, Totême, APC, Vince, Acne Studios, Anine Bing)";
  }

  return `You are a professional fashion stylist specializing in aesthetic archetypes and personal style.

I need ONE product recommendation for the "${archetype.name}" aesthetic.

Aesthetic description: ${archetype.aesthetic}
Key pieces for this aesthetic: ${archetype.keyPieces}
Reference brands: ${archetype.brands}
Category: ${category.name} (${category.description})
Price tier: ${tier} (${tierRange})

Return ONLY a JSON object with this exact structure:
{
  "brand": "Brand Name",
  "product": "Product Name",
  "shade": "Color/Variant Name",
  "price": "$XX",
  "buy_url": "https://... (direct product link from the brand's site, Nordstrom, SSENSE, or Amazon)",
  "why": "One sentence: why this piece embodies the ${archetype.name} aesthetic"
}

Requirements:
- Product must currently be available to purchase online (not sold out or discontinued)
- Must authentically represent the ${archetype.name} aesthetic — not generic
- ${tierBrandGuidance}
- Link to the actual product page (not a search results page)
- For fragrances: recommend a specific scent, not a sampler set
- For jewelry: recommend one specific piece, not a set
- Do NOT recommend discontinued items or limited editions
- Return ONLY the JSON. No other text.`;
}
