// Full 12 season data with palettes, archetype descriptors, and product recommendations
// Colors are hand-tuned to feel editorial/specimen-accurate

import { getProductRecommendations } from "./productData";

// Map main's productData category keys to Ship B's expected category keys
const CATEGORY_KEY_MAP = {
  foundation: "foundation",
  concealer:  "concealer",
  lips:       "lips",
  lipLiner:   "lip-liner",
  blush:      "blush",
  eyes:       "eye",
  bronzer:    "bronzer",
  nails:      "nails",
};

// Map main's tier keys to Ship B's tier keys
const TIER_KEY_MAP = {
  budget:  "budget",
  value:   "best-value",
  splurge: "splurge",
};

// Adapter: convert main's productData output (288 affiliate-tagged products) into
// Ship B's expected `productsFor()` shape. Pulled from `lib/productData.js` so all 12
// seasons get real product data, not procedural placeholders.
function adaptProducts(seasonName) {
  const { categories } = getProductRecommendations(seasonName);
  if (!categories || !categories.length) return null;
  const out = {};
  for (const cat of categories) {
    const targetKey = CATEGORY_KEY_MAP[cat.key];
    if (!targetKey || !cat.tiers) continue;
    const tiers = {};
    for (const [mainTier, products] of Object.entries(cat.tiers)) {
      const targetTier = TIER_KEY_MAP[mainTier];
      if (!targetTier) continue;
      const p = Array.isArray(products) ? products[0] : products;
      if (!p) continue;
      tiers[targetTier] = {
        brand: p.brand,
        product: p.product,
        shade: p.shade,
        price: p.price,
        swatch: p.hex || p.swatch || "#999999",
      };
    }
    if (Object.keys(tiers).length) out[targetKey] = tiers;
  }
  return out;
}

export const SEASONS = {
  'clear-spring': {
    name: 'Clear Spring',
    family: 'Spring',
    tagline: 'Bright · Warm · Clear',
    undertone: 'Warm',
    depth: 'Medium',
    chroma: 'Bright / Clear',
    archetype: 'Bright and clear. Vivid sunlight made wearable.',
    whisper: 'Coral, peach, sun-warmed yellow. Bright and clear; nothing muted.',
    washesYouOut: 'Avoid: dusty mauve, cool taupe, muddy brown. Anything muted reads as dull on you.',
    shadeGuidance: 'Foundation and concealer: warm undertones, light-to-medium depth. The linked collections cover your full range.',
    palette: ['#F26A4B', '#F4A460', '#F5D547', '#3EB489', '#2F8FB0', '#1F5FA8', '#E83F6F', '#6D2E5B'],
    paletteLabels: ['Coral','Peach','Sun','Jade','Lagoon','Cobalt','Magenta','Plum'],
    accent: '#E8674A',
    surface: '#FFFBF7',
    celebs: [
      { name: "Emma Stone", contested: false, note: null, signatureColor: '#F26A4B' },
      { name: "Emmy Rossum", contested: false, note: null, signatureColor: '#E83F6F' },
      { name: "Kerry Washington", contested: false, note: null, signatureColor: '#1F5FA8' },
    ],
  },
  'true-spring': {
    name: 'True Spring',
    family: 'Spring',
    tagline: 'Warm · Bright · Golden',
    undertone: 'Warm',
    depth: 'Medium',
    chroma: 'Bright',
    archetype: 'Warm gold-light. A garden in May.',
    whisper: 'Honey, apricot, fresh leaf. Gold is your neutral, never silver.',
    washesYouOut: 'Avoid: cool greys, silver, fuchsia, pure black. Cool tones flatten your warmth.',
    shadeGuidance: 'Foundation and concealer: warm undertones, light-to-medium depth. Skip the N (neutral) and C (cool) shade families entirely.',
    palette: ['#F4A460','#FFB74D','#FFD54F','#8BC34A','#26A69A','#FF7043','#E91E63','#A0522D'],
    paletteLabels: ['Apricot','Honey','Citrus','Fern','Turquoise','Persimmon','Hot Pink','Sienna'],
    accent: '#D97757',
    surface: '#FFFBF3',
    celebs: [
      { name: "Amy Adams", contested: false, note: null, signatureColor: '#F4A460' },
      { name: "Isla Fisher", contested: false, note: null, signatureColor: '#FF7043' },
      { name: "Nicole Scherzinger", contested: false, note: null, signatureColor: '#E91E63' },
    ],
  },
  'light-spring': {
    name: 'Light Spring',
    family: 'Spring',
    tagline: 'Light · Warm · Fresh',
    undertone: 'Warm',
    depth: 'Light',
    chroma: 'Soft-Bright',
    archetype: 'Watercolour pastels with warmth. Cream over white.',
    whisper: 'Blush, buttercream, warm ivory. Warm-light over cool-light. Cream beats white.',
    washesYouOut: 'Avoid: black, deep navy, oxblood, anything saturated. Heavy depth overwhelms light coloring.',
    shadeGuidance: 'Foundation and concealer: warm undertones, light depth. The lighter end of the W shades.',
    palette: ['#FDE4C4','#F5D5AE','#FFD76B','#C6E2B5','#A8D8EA','#D4A5C7','#FFA6A6','#E8B28C'],
    paletteLabels: ['Blush','Cream','Buttercup','Mint','Sky','Lilac','Petal','Camel'],
    accent: '#D9A47C',
    surface: '#FFFEF5',
    celebs: [
      { name: "Taylor Swift", contested: false, note: null, signatureColor: '#FFA6A6' },
      { name: "Margot Robbie", contested: false, note: null, signatureColor: '#F5D5AE' },
      { name: "Saoirse Ronan", contested: false, note: null, signatureColor: '#A8D8EA' },
    ],
  },
  'light-summer': {
    name: 'Light Summer',
    family: 'Summer',
    tagline: 'Light · Cool · Soft',
    undertone: 'Cool',
    depth: 'Light',
    chroma: 'Soft-Muted',
    archetype: 'Cool pearl. Soft and luminous, never warm.',
    whisper: 'Dusty rose, periwinkle, soft blue. Cool-light pastels. Cream and warm beige age you.',
    washesYouOut: 'Avoid: warm orange, mustard, terracotta, black. Warmth and depth both age you.',
    shadeGuidance: 'Foundation and concealer: cool or cool-neutral undertones, light depth. Look for C or CN labels.',
    palette: ['#E8D5E4','#C9B8D8','#B8D4E8','#A9C4D4','#F2D4D4','#D4C4B8','#B8B8B8','#8FA9B8'],
    paletteLabels: ['Petal','Lilac','Sky','Slate','Rose','Sand','Silver','Smoke'],
    accent: '#A596B8',
    surface: '#FAFAFA',
    celebs: [
      { name: "Elle Fanning", contested: false, note: null, signatureColor: '#E8D5E4' },
      { name: "Cate Blanchett", contested: false, note: null, signatureColor: '#A9C4D4' },
      { name: "Gemma Chan", contested: false, note: null, signatureColor: '#C9B8D8' },
    ],
  },
  'true-summer': {
    name: 'True Summer',
    family: 'Summer',
    tagline: 'Cool · Soft · Rosy',
    undertone: 'Cool',
    depth: 'Medium',
    chroma: 'Muted',
    archetype: 'Cool rose. Quiet, classic, never neon.',
    whisper: 'Mauve, raspberry, slate blue. Cool with rose underneath. Skip orange and yellow-gold.',
    washesYouOut: 'Avoid: orange, yellow-gold, cream, pure white. Warm tones turn your skin sallow.',
    shadeGuidance: 'Foundation and concealer: cool undertones, medium depth. Pink-leaning shades flatter you; avoid yellow-based.',
    palette: ['#8DA9C4','#A89BC4','#C4A9B8','#E8B5A8','#7A8FA8','#5D7A8C','#B89BA8','#6B8CAD'],
    paletteLabels: ['Mist','Mauve','Rose','Coral','Slate','Deep Blue','Berry','Cobalt'],
    accent: '#6B8CAD',
    surface: '#F5F8FC',
    celebs: [
      { name: "Emily Blunt", contested: false, note: null, signatureColor: '#A89BC4' },
      { name: "Sarah Jessica Parker", contested: false, note: null, signatureColor: '#C4A9B8' },
      { name: "Zoe Saldana", contested: false, note: null, signatureColor: '#6B8CAD' },
    ],
  },
  'soft-summer': {
    name: 'Soft Summer',
    family: 'Summer',
    tagline: 'Soft · Cool · Grayed',
    undertone: 'Cool-Neutral',
    depth: 'Medium',
    chroma: 'Very Muted',
    archetype: 'Cool fog. Everything muted; nothing loud.',
    whisper: 'Grayed plum, fog, taupe rose. Everything whispers; nothing shouts.',
    washesYouOut: 'Avoid: black, pure white, neon, true red. Anything bright or stark fights your coloring.',
    shadeGuidance: 'Foundation and concealer: cool-neutral undertones, medium depth. Soft, dust-toned shades.',
    palette: ['#B8A9C9','#C4B5B8','#A89B8C','#8C9B8A','#7A6B7A','#9B8B7A','#6B5D6B','#A89B9B'],
    paletteLabels: ['Plum','Rose','Taupe','Sage','Wine','Khaki','Fig','Mushroom'],
    accent: '#8C7A88',
    surface: '#F8F5FB',
    celebs: [
      { name: "Cara Delevingne", contested: false, note: null, signatureColor: '#B8A9C9' },
      { name: "Jennifer Aniston", contested: false, note: null, signatureColor: '#C4B5B8' },
      { name: "Kate Middleton", contested: false, note: null, signatureColor: '#7A6B7A' },
    ],
  },
  'soft-autumn': {
    name: 'Soft Autumn',
    family: 'Autumn',
    tagline: 'Soft · Warm · Earthy',
    undertone: 'Warm',
    depth: 'Medium',
    chroma: 'Muted',
    archetype: 'Warm linen. Earth-toned and unfussy.',
    whisper: 'Dried herbs, terracotta, honey on linen. Warm-muted; never bright. Brown beats black.',
    washesYouOut: 'Avoid: black, pure white, fuchsia, electric blue. Stark contrast washes you out.',
    shadeGuidance: 'Foundation and concealer: warm or warm-neutral undertones, medium depth. Soft golden shades.',
    palette: ['#C67C52','#B08968','#9B7F5C','#7A8C5C','#A89268','#8B6F47','#6B5D3F','#C4A574'],
    paletteLabels: ['Terracotta','Camel','Chai','Olive','Hay','Walnut','Moss','Wheat'],
    accent: '#B08968',
    surface: '#FBF8F5',
    celebs: [
      { name: "Gigi Hadid", contested: false, note: null, signatureColor: '#B08968' },
      { name: "Jennifer Lopez", contested: false, note: null, signatureColor: '#C4A574' },
      { name: "Jessica Biel", contested: false, note: null, signatureColor: '#7A8C5C' },
    ],
  },
  'true-autumn': {
    name: 'True Autumn',
    family: 'Autumn',
    tagline: 'Warm · Rich · Earthy',
    undertone: 'Warm',
    depth: 'Medium-Deep',
    chroma: 'Muted',
    archetype: 'Warm-rich neutrals. Gold instead of silver. Depth without coldness.',
    whisper: 'Caramel, rust, olive, deep gold. Your nude has gold in it. Cool taupes wash you out.',
    washesYouOut: 'Avoid: pure white, fuchsia, cool grey, silver. Cool and clear tones go ashen on you.',
    shadeGuidance: 'Foundation and concealer: warm undertones, medium-to-deep depth. Look for the W or warm-leaning N shades.',
    palette: ['#B5500B','#C4611E','#8B4513','#556B2F','#6B8E23','#B8860B','#8B3A1A','#4A5D23'],
    paletteLabels: ['Rust','Persimmon','Chestnut','Olive','Moss','Ochre','Brick','Cypress'],
    accent: '#B5500B',
    surface: '#FBF6F0',
    celebs: [
      { name: "Julia Roberts", contested: false, note: null, signatureColor: '#B5500B' },
      { name: "Beyoncé", contested: false, note: null, signatureColor: '#B8860B' },
      { name: "Eva Mendes", contested: false, note: null, signatureColor: '#8B3A1A' },
    ],
  },
  'dark-autumn': {
    name: 'Dark Autumn',
    family: 'Autumn',
    tagline: 'Deep · Warm · Rich',
    undertone: 'Warm',
    depth: 'Deep',
    chroma: 'Muted',
    archetype: 'Warm chocolate-deep. Restrained richness.',
    whisper: 'Chocolate, garnet, deep forest, oxblood. Warm-deep with restraint. Pale pastels read as costume.',
    washesYouOut: 'Avoid: pastels, pure white, baby pink. Light tones look like costume on you.',
    shadeGuidance: 'Foundation and concealer: warm or warm-neutral undertones, deep depth. The deeper end of W and N families.',
    palette: ['#8B3A1A','#5C2E1F','#4A1F0F','#2D4A2D','#6B1F1F','#8B4513','#3A2817','#722F37'],
    paletteLabels: ['Burnt','Cocoa','Espresso','Pine','Brick','Bronze','Soil','Wine'],
    accent: '#8B3A1A',
    surface: '#F5EDE5',
    celebs: [
      { name: "Keira Knightley", contested: false, note: null, signatureColor: '#722F37' },
      { name: "Penélope Cruz", contested: false, note: null, signatureColor: '#8B3A1A' },
      { name: "Mindy Kaling", contested: false, note: null, signatureColor: '#5C2E1F' },
    ],
  },
  'dark-winter': {
    name: 'Dark Winter',
    family: 'Winter',
    tagline: 'Deep · Cool · Dramatic',
    undertone: 'Cool',
    depth: 'Deep',
    chroma: 'Muted',
    archetype: 'Cool-deep dramatic. Velvet and ink.',
    whisper: 'Midnight, plum, oxblood, charcoal. Cool-deep, no warmth. Earth tones make you ashen.',
    washesYouOut: 'Avoid: orange, mustard, beige, terracotta. Earth tones make you ashen.',
    shadeGuidance: 'Foundation and concealer: cool or cool-neutral undertones, deep depth. The deeper end of C and CN families.',
    palette: ['#1F1F3D','#4B0082','#3D1F3D','#1F3D3D','#722F37','#2D2D2D','#3D1F1F','#4D4D5C'],
    paletteLabels: ['Midnight','Violet','Plum','Teal','Garnet','Ink','Oxblood','Slate'],
    accent: '#4B0082',
    surface: '#0F0F1A',
    surfaceText: '#F5EEDC',
    celebs: [
      { name: "Lily Collins", contested: false, note: null, signatureColor: '#722F37' },
      { name: "Lucy Liu", contested: false, note: null, signatureColor: '#1F1F3D' },
      { name: "Viola Davis", contested: false, note: null, signatureColor: '#2D2D2D' },
    ],
    isDark: true,
  },
  'true-winter': {
    name: 'True Winter',
    family: 'Winter',
    tagline: 'Cool · Bright · Clear',
    undertone: 'Cool',
    depth: 'Deep',
    chroma: 'Bright / Clear',
    archetype: 'High-contrast cool. Black with one true red.',
    whisper: 'Icy blue, true red, pure black, pure white. No mud, no muted, no warm. Contrast is the point.',
    washesYouOut: 'Avoid: cream, beige, dusty rose, olive. Muted and warm both flatten you.',
    shadeGuidance: 'Foundation and concealer: cool undertones, medium-to-deep depth. Skip yellow-based shades entirely.',
    palette: ['#DC143C','#1E3A8A','#0F0F0F','#FFFFFF','#C71585','#00BFFF','#4B0082','#FFB6C1'],
    paletteLabels: ['Red','Cobalt','Black','White','Magenta','Ice','Violet','Pink'],
    accent: '#DC143C',
    surface: '#FFFBF7',
    celebs: [
      { name: "Anne Hathaway", contested: false, note: null, signatureColor: '#1E3A8A' },
      { name: "Fan Bingbing", contested: false, note: null, signatureColor: '#DC143C' },
      { name: "Lupita Nyong'o", contested: false, note: null, signatureColor: '#C71585' },
    ],
  },
  'bright-winter': {
    name: 'Bright Winter',
    family: 'Winter',
    tagline: 'Bright · Cool · Vivid',
    undertone: 'Cool',
    depth: 'Medium-Deep',
    chroma: 'Vivid',
    archetype: 'Cool full-saturation. Neon meets ink.',
    whisper: 'Fuchsia, electric blue, bright berry. Full saturation, cool undertone. Beige and dusty pastels go invisible on you.',
    washesYouOut: 'Avoid: dusty pastels, beige, mustard. Anything muted goes invisible on you.',
    shadeGuidance: 'Foundation and concealer: cool or cool-neutral undertones, medium-to-deep depth. Bright, clear-toned shades.',
    palette: ['#FF1493','#00CED1','#8A2BE2','#FFD700','#FF4500','#0066FF','#FF69B4','#00FF7F'],
    paletteLabels: ['Fuchsia','Cyan','Violet','Gold','Red','Electric','Pink','Spring'],
    accent: '#FF1493',
    surface: '#F8F5FF',
    celebs: [
      { name: "Megan Fox", contested: false, note: null, signatureColor: '#0066FF' },
      { name: "Dita Von Teese", contested: false, note: null, signatureColor: '#FF1493' },
      { name: "Naomi Campbell", contested: false, note: null, signatureColor: '#8A2BE2' },
    ],
  },
};

// Products — shared shape, varies slightly per season
// 8 categories × 3 tiers = 24 products per season. We'll use one curated set
// for the hero (True Autumn) and generate consistent recs for others.
export const CATEGORIES = [
  { id: 'foundation', name: 'Foundation', number: '01' },
  { id: 'concealer',  name: 'Concealer',  number: '02' },
  { id: 'blush',      name: 'Blush',      number: '03' },
  { id: 'bronzer',    name: 'Bronzer',    number: '04' },
  { id: 'eye',        name: 'Eyeshadow',  number: '05' },
  { id: 'lip-liner',  name: 'Lip Liner',  number: '06' },
  { id: 'lips',       name: 'Lips',       number: '07' },
  { id: 'nails',      name: 'Nails',      number: '08' },
];

export const TIERS = [
  { id: 'budget',     name: 'Budget',      note: 'under $15' },
  { id: 'best-value', name: 'Best Value',  note: '$16 – $35' },
  { id: 'splurge',    name: 'Splurge',     note: '$36+' },
];

// True Autumn product set — shown in hero
export const PRODUCTS_TRUE_AUTUMN = {
  foundation: {
    budget:     { brand: "L'Oréal", product: 'True Match', shade: 'W5 Sand Beige', price: '$12', swatch: '#C89070' },
    'best-value': { brand: 'Milk Makeup', product: 'Future Fluid', shade: '42W Warm', price: '$34', swatch: '#C08A5E' },
    splurge:    { brand: 'Charlotte Tilbury', product: 'Hollywood Flawless', shade: '8 Warm', price: '$52', swatch: '#B77F54' },
  },
  concealer: {
    budget:     { brand: 'e.l.f.', product: 'Hydrating Camo', shade: 'Tan Warm', price: '$7',  swatch: '#D8A277' },
    'best-value': { brand: 'NARS', product: 'Radiant Creamy', shade: 'Cannelle', price: '$32', swatch: '#D09976' },
    splurge:    { brand: 'Chantecaille', product: 'Le Camouflage', shade: '5W', price: '$42', swatch: '#CD9370' },
  },
  blush: {
    budget:     { brand: 'Milani', product: 'Baked Blush', shade: 'Terra Sole', price: '$10', swatch: '#B8654A' },
    'best-value': { brand: 'Rare Beauty', product: 'Liquid Blush', shade: 'Hope', price: '$23', swatch: '#B05838' },
    splurge:    { brand: 'Westman Atelier', product: 'Baby Cheeks', shade: 'Dollie', price: '$48', swatch: '#A6543A' },
  },
  bronzer: {
    budget:     { brand: 'Milani', product: 'Silky Matte', shade: 'Golden', price: '$11', swatch: '#8E5A38' },
    'best-value': { brand: 'Patrick Ta', product: 'Major Dimension', shade: 'She Means Biz', price: '$38', swatch: '#824E32' },
    splurge:    { brand: 'Hourglass', product: 'Ambient Lighting', shade: 'Radiant Bronze', price: '$58', swatch: '#8A5A3A' },
  },
  eye: {
    budget:     { brand: 'Maybelline', product: 'Nudes of NY', shade: 'Rooftop Bronze', price: '$13', swatch: '#8B5A3C' },
    'best-value': { brand: 'Urban Decay', product: 'Eyeshadow', shade: 'Smog', price: '$24', swatch: '#7A4A28' },
    splurge:    { brand: 'Pat McGrath', product: 'Mothership', shade: 'Bronze Seduction', price: '$128', swatch: '#9C6A3E' },
  },
  'lip-liner': {
    budget:     { brand: 'NYX', product: 'Slim Lip Pencil', shade: 'Nutmeg', price: '$5', swatch: '#7A4028' },
    'best-value': { brand: 'MAC', product: 'Lip Pencil', shade: 'Chestnut', price: '$22', swatch: '#703820' },
    splurge:    { brand: 'Charlotte Tilbury', product: 'Lip Cheat', shade: 'Iconic Nude', price: '$26', swatch: '#8A4E32' },
  },
  lips: {
    budget:     { brand: "L'Oréal", product: 'Colour Riche', shade: 'Fairest Nude', price: '$10', swatch: '#A85A42' },
    'best-value': { brand: 'Rare Beauty', product: 'Soft Pinch Matte', shade: 'Grateful', price: '$22', swatch: '#9C4D36' },
    splurge:    { brand: 'Hermès', product: 'Rouge Hermès', shade: 'Terre Brûlée', price: '$77', swatch: '#8A3F28' },
  },
  nails: {
    budget:     { brand: 'Essie', product: 'Classic', shade: 'Playing Koi', price: '$10', swatch: '#B85A3C' },
    'best-value': { brand: 'OPI', product: 'Nail Lacquer', shade: 'Chocolate Moose', price: '$12', swatch: '#6E3820' },
    splurge:    { brand: 'Chanel', product: 'Le Vernis', shade: 'Rouge Brique', price: '$32', swatch: '#8A3A24' },
  },
};

// Generate a generic product set for other seasons using the season's palette
export function productsFor(seasonId) {
  const s = SEASONS[seasonId];
  if (!s) return PRODUCTS_TRUE_AUTUMN; // safety fallback

  // Try main's hand-curated 288 affiliate-tagged products first
  const real = adaptProducts(s.name);
  if (real && Object.keys(real).length >= 5) {
    return real;
  }

  // Fall back to True Autumn hero set or procedural generation
  if (seasonId === 'true-autumn') return PRODUCTS_TRUE_AUTUMN;
  const p = s.palette;
  // Shape matches PRODUCTS_TRUE_AUTUMN but swatches pulled from palette
  const pick = (i) => p[i % p.length];
  return {
    foundation: {
      budget:     { brand: "L'Oréal", product: 'True Match', shade: 'Custom Match', price: '$12', swatch: pick(1) },
      'best-value': { brand: 'Milk Makeup', product: 'Future Fluid', shade: 'Adaptive', price: '$34', swatch: pick(2) },
      splurge:    { brand: 'Charlotte Tilbury', product: 'Hollywood Flawless', shade: 'Matched', price: '$52', swatch: pick(1) },
    },
    concealer: {
      budget:     { brand: 'e.l.f.', product: 'Hydrating Camo', shade: 'Keyed', price: '$7',  swatch: pick(0) },
      'best-value': { brand: 'NARS', product: 'Radiant Creamy', shade: 'Keyed', price: '$32', swatch: pick(1) },
      splurge:    { brand: 'Chantecaille', product: 'Le Camouflage', shade: 'Keyed', price: '$42', swatch: pick(0) },
    },
    blush: {
      budget:     { brand: 'Milani', product: 'Baked Blush', shade: s.paletteLabels[0], price: '$10', swatch: pick(0) },
      'best-value': { brand: 'Rare Beauty', product: 'Liquid Blush', shade: s.paletteLabels[6] || s.paletteLabels[0], price: '$23', swatch: pick(6) },
      splurge:    { brand: 'Westman Atelier', product: 'Baby Cheeks', shade: 'Signature', price: '$48', swatch: pick(0) },
    },
    bronzer: {
      budget:     { brand: 'Milani', product: 'Silky Matte', shade: s.paletteLabels[2], price: '$11', swatch: pick(2) },
      'best-value': { brand: 'Patrick Ta', product: 'Major Dimension', shade: s.paletteLabels[2], price: '$38', swatch: pick(3) },
      splurge:    { brand: 'Hourglass', product: 'Ambient', shade: 'Season Edit', price: '$58', swatch: pick(2) },
    },
    eye: {
      budget:     { brand: 'Maybelline', product: 'Nudes', shade: s.paletteLabels[3], price: '$13', swatch: pick(3) },
      'best-value': { brand: 'Urban Decay', product: 'Eyeshadow', shade: s.paletteLabels[4] || s.paletteLabels[3], price: '$24', swatch: pick(4) },
      splurge:    { brand: 'Pat McGrath', product: 'Mothership', shade: 'Chromatic', price: '$128', swatch: pick(3) },
    },
    'lip-liner': {
      budget:     { brand: 'NYX', product: 'Slim Lip', shade: s.paletteLabels[7] || s.paletteLabels[0], price: '$5', swatch: pick(7) },
      'best-value': { brand: 'MAC', product: 'Lip Pencil', shade: 'Seasoned', price: '$22', swatch: pick(6) },
      splurge:    { brand: 'Charlotte Tilbury', product: 'Lip Cheat', shade: 'Iconic', price: '$26', swatch: pick(0) },
    },
    lips: {
      budget:     { brand: "L'Oréal", product: 'Colour Riche', shade: s.paletteLabels[6] || s.paletteLabels[0], price: '$10', swatch: pick(6) },
      'best-value': { brand: 'Rare Beauty', product: 'Soft Pinch', shade: s.paletteLabels[0], price: '$22', swatch: pick(0) },
      splurge:    { brand: 'Hermès', product: 'Rouge Hermès', shade: 'Custom', price: '$77', swatch: pick(0) },
    },
    nails: {
      budget:     { brand: 'Essie', product: 'Classic', shade: s.paletteLabels[5] || s.paletteLabels[0], price: '$10', swatch: pick(5) },
      'best-value': { brand: 'OPI', product: 'Nail Lacquer', shade: 'Seasoned', price: '$12', swatch: pick(4) },
      splurge:    { brand: 'Chanel', product: 'Le Vernis', shade: 'Signature', price: '$32', swatch: pick(0) },
    },
  };
}

// ============================================================
// Neutrals & Basics — the everyday anchor palette per season
// The 12-season system over-indexes on chromatic "statement" shades.
// Real people wear neutrals 80% of the time. This is that.
// ============================================================
export const NEUTRALS = {
  // ========== SPRINGS — warm, fresh, never greyed ==========
  'clear-spring': {
    palette: [
      { hex: '#FFF8E8', name: 'Ivory',     wear: 'Your white' },
      { hex: '#F5E6C4', name: 'Cream',     wear: 'Warm off-white' },
      { hex: '#E8C89C', name: 'Sand',      wear: 'Light tan' },
      { hex: '#D4A574', name: 'Honey',     wear: 'Warm neutral' },
      { hex: '#B8834A', name: 'Toffee',    wear: 'Rich tan' },
      { hex: '#8B5A2B', name: 'Cocoa',     wear: 'Your brown' },
      { hex: '#5D3A1A', name: 'Walnut',    wear: 'Deep warm brown' },
      { hex: '#2B1F15', name: 'Espresso',  wear: 'Warm near-black' },
    ],
    basics: [
      { piece: 'Your black'    , answer: 'Espresso'            , hex: '#3E2817', note: 'True black flattens your brightness. Warm espresso keeps the depth without the dullness.' },
      { piece: 'Your white'    , answer: 'Warm cream'          , hex: '#F8EFDC', note: 'Optic white reads clinical. Warm cream lets your glow show through.' },
      { piece: 'Your denim'    , answer: 'Golden-wash'         , hex: '#4F739B', note: 'Inky dark wash looks heavy. Golden-mid wash moves with you.' },
      { piece: 'Your khaki'    , answer: 'Warm sand'           , hex: '#C8A77A', note: 'Not army green. A warm sand with gold in it is your neutral earth.' },
      { piece: 'Your grey'     , answer: 'Warm greige'         , hex: '#BCA389', note: 'Cool grey ages you. Warm greige reads polished.' },
      { piece: 'Your navy'     , answer: 'Nautical navy'       , hex: '#1E4875', note: 'Black-navy kills your brightness. A navy with warmth under it is your grounding.' },
      { piece: 'Your camel'    , answer: 'Honey tan'           , hex: '#D4A267', note: 'This is your universal. Wear it with everything.' },
      { piece: 'Your metal'    , answer: 'Polished gold'       , hex: '#C89B3A', note: 'Silver reads cold next to you. Gold and rose gold catch your warmth.' },
    ],
  },
  'true-spring': {
    palette: [
      { hex: '#FDF4E3', name: 'Cream',     wear: 'Your white' },
      { hex: '#F4E2B8', name: 'Buttercream', wear: 'Warm ivory' },
      { hex: '#E2C68A', name: 'Straw',     wear: 'Light tan' },
      { hex: '#C19A5B', name: 'Honey',     wear: 'Warm neutral' },
      { hex: '#9B6F3A', name: 'Caramel',   wear: 'Rich tan' },
      { hex: '#70482A', name: 'Chestnut',  wear: 'Deep brown' },
      { hex: '#4A2E1A', name: 'Cocoa',     wear: 'Your darkest' },
      { hex: '#2A1D12', name: 'Bark',      wear: 'Warm near-black' },
    ],
    basics: [
      { piece: 'Your black'    , answer: 'Warm chocolate'      , hex: '#4A3425', note: 'Pure black pulls warmth from your skin. Warm chocolate keeps depth without the drain.' },
      { piece: 'Your white'    , answer: 'Warm ivory'          , hex: '#FBF3E1', note: 'Optic white looks blue next to you. Ivory is your clean.' },
      { piece: 'Your denim'    , answer: 'Golden mid-wash'     , hex: '#5479A3', note: 'Black denim reads heavy. A warm-cast mid-wash is your denim.' },
      { piece: 'Your khaki'    , answer: 'Olive-honey'         , hex: '#8B8140', note: 'Pale khaki washes you out. A deeper olive with honey warmth holds you.' },
      { piece: 'Your grey'     , answer: 'Honey greige'        , hex: '#C4AC89', note: 'Cool grey looks dirty. Honey-warm greige reads expensive.' },
      { piece: 'Your navy'     , answer: 'Mid warm-navy'       , hex: '#2A4F7A', note: 'Black-navy is too stark. A mid navy with warmth under it grounds you.' },
      { piece: 'Your camel'    , answer: 'Classic camel'       , hex: '#C9985A', note: 'This is a wardrobe keystone. Pair with cream, denim, and gold.' },
      { piece: 'Your metal'    , answer: 'Bright gold'         , hex: '#D4AA3D', note: 'Silver drains you. Yellow or rose gold lights you up.' },
    ],
  },
  'light-spring': {
    palette: [
      { hex: '#FFFAF0', name: 'Snow',      wear: 'Your white' },
      { hex: '#FDE8D0', name: 'Peach cream', wear: 'Warm ivory' },
      { hex: '#EED5B8', name: 'Almond',    wear: 'Light tan' },
      { hex: '#D9B48A', name: 'Beige',     wear: 'Warm neutral' },
      { hex: '#B89268', name: 'Sand',      wear: 'Mid tan' },
      { hex: '#8F6B48', name: 'Caramel',   wear: 'Deep tan' },
      { hex: '#5F4530', name: 'Walnut',    wear: 'Your darkest' },
      { hex: '#3A2B1F', name: 'Coffee',    wear: 'Soft near-black' },
    ],
    basics: [
      { piece: 'Your black'    , answer: 'Warm taupe'          , hex: '#8B6F5B', note: 'You don\'t wear black. Warm taupe is your darkest and it\'s enough.' },
      { piece: 'Your white'    , answer: 'Buttercream'         , hex: '#F8EDD5', note: 'Optic white feels severe on your light palette. Buttercream is right.' },
      { piece: 'Your denim'    , answer: 'Pale warm wash'      , hex: '#7B9BC2', note: 'Dark denim reads heavy on you. Pale-to-mid warm wash is the sweet spot.' },
      { piece: 'Your khaki'    , answer: 'Pale warm sand'      , hex: '#D1B993', note: 'Army green overwhelms you. Pale warm sand is your functional neutral.' },
      { piece: 'Your grey'     , answer: 'Pale warm greige'    , hex: '#D5BFA3', note: 'Cool grey looks grim. Warm greige at low saturation is your grey.' },
      { piece: 'Your navy'     , answer: 'Soft warm-navy'      , hex: '#4A6C95', note: 'True navy reads heavy. A lighter, softer warm-navy is your grounding.' },
      { piece: 'Your camel'    , answer: 'Pale honey tan'      , hex: '#D8B992', note: 'Rich camel drowns you. Softer, lighter honey-tan is your middle.' },
      { piece: 'Your metal'    , answer: 'Light gold'          , hex: '#D8BE72', note: 'Silver and platinum overwhelm. Light gold and rose-gold catch your warmth.' },
    ],
  },

  // ========== SUMMERS — cool, muted, soft ==========
  'light-summer': {
    palette: [
      { hex: '#FAFAF5', name: 'Cloud',     wear: 'Your white' },
      { hex: '#EEE5E0', name: 'Pearl',     wear: 'Cool ivory' },
      { hex: '#D8CCC4', name: 'Dove',      wear: 'Soft neutral' },
      { hex: '#B9AFA8', name: 'Stone',     wear: 'Mid grey-taupe' },
      { hex: '#8D9CA8', name: 'Slate',     wear: 'Blue-grey' },
      { hex: '#6E7B8C', name: 'Steel',     wear: 'Deeper cool grey' },
      { hex: '#4C5A6E', name: 'Slate navy', wear: 'Your navy' },
      { hex: '#2D3748', name: 'Midnight',  wear: 'Soft near-black' },
    ],
    basics: [
      { piece: 'Your black'    , answer: 'Soft charcoal-blue'  , hex: '#3C4552', note: 'Pure black washes you out. A cool, softened charcoal keeps contrast without harshness.' },
      { piece: 'Your white'    , answer: 'Cool ivory'          , hex: '#F3EEE8', note: 'Optic white is fine sparingly. Cool-leaning ivory flatters better.' },
      { piece: 'Your denim'    , answer: 'Pale blue wash'      , hex: '#7698BC', note: 'Dark washes read too heavy. A pale cool wash is your denim.' },
      { piece: 'Your khaki'    , answer: 'Cool pale taupe'     , hex: '#BBB3A3', note: 'Warm khaki fights you. A cool pale taupe is your functional neutral.' },
      { piece: 'Your grey'     , answer: 'Dove grey'           , hex: '#C2C5C9', note: 'Your grey is true grey, on the lighter side.' },
      { piece: 'Your navy'     , answer: 'Soft navy'           , hex: '#405E87', note: 'Black-navy is too harsh. A softer medium navy lands right.' },
      { piece: 'Your camel'    , answer: 'Taupe-pink'          , hex: '#C4A89A', note: 'Warm camel looks orange on you. Cool pinky-taupe is your universal neutral.' },
      { piece: 'Your metal'    , answer: 'Cool silver'         , hex: '#B9BCC2', note: 'Gold reads brassy. Silver, pewter, and platinum glow on your cool light.' },
    ],
  },
  'true-summer': {
    palette: [
      { hex: '#F4F4F2', name: 'Linen',     wear: 'Your white' },
      { hex: '#E0D8D2', name: 'Shell',     wear: 'Cool ivory' },
      { hex: '#C8BEBA', name: 'Fog',       wear: 'Soft grey-mauve' },
      { hex: '#A59B9B', name: 'Mauve grey', wear: 'Mid neutral' },
      { hex: '#7D7E8C', name: 'Slate',     wear: 'Blue-grey' },
      { hex: '#5A6175', name: 'Storm',     wear: 'Deep cool grey' },
      { hex: '#3A4660', name: 'Navy',      wear: 'Your navy' },
      { hex: '#232A3A', name: 'Midnight',  wear: 'Soft near-black' },
    ],
    basics: [
      { piece: 'Your black'    , answer: 'Cool charcoal'       , hex: '#2F3742', note: 'True black flattens. Cool charcoal gives you the drama without the harshness.' },
      { piece: 'Your white'    , answer: 'Cool off-white'      , hex: '#EEECE6', note: 'Optic white works in small doses. Cool off-white is your everyday.' },
      { piece: 'Your denim'    , answer: 'Medium cool wash'    , hex: '#5579A3', note: 'Your denim lives in medium-to-dark with a cool cast.' },
      { piece: 'Your khaki'    , answer: 'Cool stone'          , hex: '#A3A08C', note: 'Warm olive fights you. A cool stone-grey reads as your khaki.' },
      { piece: 'Your grey'     , answer: 'Dove grey'           , hex: '#A3A8AF', note: 'Your grey is the truest grey of any season. Wear it with confidence.' },
      { piece: 'Your navy'     , answer: 'Classic navy'        , hex: '#304A72', note: 'Navy is one of your core neutrals. Classic cool navy, not inky.' },
      { piece: 'Your camel'    , answer: 'Cool taupe'          , hex: '#A8947E', note: 'Warm camel fights you. Cool greyed taupe is your camel.' },
      { piece: 'Your metal'    , answer: 'Brushed silver'      , hex: '#A8ACB1', note: 'Gold looks yellow. Silver, white gold, and platinum flatter.' },
    ],
  },
  'soft-summer': {
    palette: [
      { hex: '#F0EBE8', name: 'Bone',      wear: 'Your white' },
      { hex: '#DCD3CE', name: 'Driftwood', wear: 'Soft off-white' },
      { hex: '#BCB0AA', name: 'Stone',     wear: 'Light taupe' },
      { hex: '#9B8E88', name: 'Taupe',     wear: 'Mid neutral' },
      { hex: '#7A6E70', name: 'Mushroom',  wear: 'Deep taupe' },
      { hex: '#5D525A', name: 'Heather',   wear: 'Cool grey-plum' },
      { hex: '#3F3844', name: 'Charcoal',  wear: 'Your darkest' },
      { hex: '#252026', name: 'Ink',       wear: 'Soft near-black' },
    ],
    basics: [
      { piece: 'Your black'    , answer: 'Slate grey'          , hex: '#4A4F58', note: 'True black is too sharp. Slate grey gives you depth at your chroma.' },
      { piece: 'Your white'    , answer: 'Mushroom white'      , hex: '#EAE6DD', note: 'Optic white is too bright. Softened mushroom-white is your clean.' },
      { piece: 'Your denim'    , answer: 'Grey-wash denim'     , hex: '#64758A', note: 'Saturated denim reads too loud. Grey-wash denim is your grounding.' },
      { piece: 'Your khaki'    , answer: 'Warm-grey stone'     , hex: '#A39988', note: 'Your khaki lives between colors. Warm-grey stone is right.' },
      { piece: 'Your grey'     , answer: 'Soft mushroom'       , hex: '#A89B8F', note: 'Your grey leans warm-cool neutral. Mushroom is your anchor.' },
      { piece: 'Your navy'     , answer: 'Dusty navy'          , hex: '#3F516B', note: 'Crisp navy is too harsh. Dusty greyed navy is your navy.' },
      { piece: 'Your camel'    , answer: 'Warm taupe'          , hex: '#A38C78', note: 'Classic camel reads too orange. Greyed warm taupe works.' },
      { piece: 'Your metal'    , answer: 'Pewter'              , hex: '#9FA3A5', note: 'Shiny metals overwhelm. Brushed pewter and antiqued silver are your metals.' },
    ],
  },

  // ========== AUTUMNS — earthy, warm ==========
  'soft-autumn': {
    palette: [
      { hex: '#F2ECDE', name: 'Bone',      wear: 'Your white' },
      { hex: '#E4D4B8', name: 'Oat',       wear: 'Warm ivory' },
      { hex: '#C9B590', name: 'Sand',      wear: 'Warm neutral' },
      { hex: '#A39269', name: 'Moss',      wear: 'Muted olive' },
      { hex: '#7E6B45', name: 'Bronze',    wear: 'Deep warm tan' },
      { hex: '#574A32', name: 'Cocoa',     wear: 'Warm brown' },
      { hex: '#3D3424', name: 'Coffee',    wear: 'Deep warm brown' },
      { hex: '#26201A', name: 'Bark',      wear: 'Warm near-black' },
    ],
    basics: [
      { piece: 'Your black'    , answer: 'Soft brown'          , hex: '#5C4833', note: 'Pure black is too sharp for your chroma. Soft muted brown is your darkest.' },
      { piece: 'Your white'    , answer: 'Warm off-white'      , hex: '#F2EADB', note: 'Optic white is too bright. Warm off-white is your clean.' },
      { piece: 'Your denim'    , answer: 'Warm medium wash'    , hex: '#5E7799', note: 'Dark inky denim looks heavy. Warm mid-wash is your denim.' },
      { piece: 'Your khaki'    , answer: 'Warm olive'          , hex: '#8A8058', note: 'Army green is too saturated. A soft warm olive is your khaki.' },
      { piece: 'Your grey'     , answer: 'Warm mushroom'       , hex: '#A8957C', note: 'Cool grey goes dingy on you. Warm mushroom is your grey.' },
      { piece: 'Your navy'     , answer: 'Dusty navy'          , hex: '#3F5368', note: 'True navy is too cool. A softer dusty navy is your grounding.' },
      { piece: 'Your camel'    , answer: 'Honey camel'         , hex: '#B5956B', note: 'This is a universal piece for you. Pair it with everything.' },
      { piece: 'Your metal'    , answer: 'Antique gold'        , hex: '#B39248', note: 'Shiny silver looks wrong. Antique gold and brushed bronze glow.' },
    ],
  },
  'dark-autumn': {
    palette: [
      { hex: '#EEE0C8', name: 'Cream',     wear: 'Your white' },
      { hex: '#D4B896', name: 'Tawny',     wear: 'Warm ivory' },
      { hex: '#A58354', name: 'Tobacco',   wear: 'Rich tan' },
      { hex: '#7A5332', name: 'Cognac',    wear: 'Deep tan' },
      { hex: '#523820', name: 'Mahogany',  wear: 'Deep warm brown' },
      { hex: '#331F12', name: 'Espresso',  wear: 'Your black' },
      { hex: '#1F130A', name: 'Bark',      wear: 'Warm near-black' },
      { hex: '#3B2E2A', name: 'Oxblood',   wear: 'Deep brown-wine' },
    ],
    basics: [
      { piece: 'Your black'    , answer: 'Deep espresso'       , hex: '#2D1F12', note: 'Pure black reads flat on your depth. Deep espresso has the richness you need.' },
      { piece: 'Your white'    , answer: 'Warm ivory'          , hex: '#F0E6D0', note: 'Optic white is clinical. Warm ivory is your clean.' },
      { piece: 'Your denim'    , answer: 'Deep rust-wash'      , hex: '#5C3421', note: 'Pale denim washes you out. Deep rust-warm denim is your denim.' },
      { piece: 'Your khaki'    , answer: 'Deep olive'          , hex: '#5E5832', note: 'Pale khaki disappears on you. Deep olive holds your richness.' },
      { piece: 'Your grey'     , answer: 'Deep warm charcoal'  , hex: '#5A4A3A', note: 'Cool charcoal reads ashy. Warm deep charcoal is your grey.' },
      { piece: 'Your navy'     , answer: 'Deep forest-navy'    , hex: '#1F2E40', note: 'Your "navy" skews deep forest. Cool-blue navies work only in accents.' },
      { piece: 'Your camel'    , answer: 'Deep cognac'         , hex: '#7A5530', note: 'Your camel is rich and deep. Cognac, saddle, and chestnut tones.' },
      { piece: 'Your metal'    , answer: 'Antique brass'       , hex: '#9E7C2F', note: 'Polished silver looks stark. Brushed brass and antique gold are your metals.' },
    ],
  },

  // ========== WINTERS — high-contrast, cool ==========
  'dark-winter': {
    palette: [
      { hex: '#FFFFFF', name: 'Pure white', wear: 'Your white' },
      { hex: '#E6E6E6', name: 'Snow',      wear: 'Cool ivory' },
      { hex: '#9B9B9B', name: 'Pewter',    wear: 'Mid grey' },
      { hex: '#555C68', name: 'Slate',     wear: 'Deep grey' },
      { hex: '#2F3A52', name: 'Navy',      wear: 'Your navy' },
      { hex: '#1F2535', name: 'Midnight',  wear: 'Deepest navy' },
      { hex: '#000000', name: 'Black',     wear: 'Your black' },
      { hex: '#3A1F2E', name: 'Oxblood',   wear: 'Deep wine' },
    ],
    basics: [
      { piece: 'Your black'    , answer: 'True black'          , hex: '#000000', note: 'Pure black is your birthright. It shows up for you like nothing else does.' },
      { piece: 'Your white'    , answer: 'Pure white'          , hex: '#FFFFFF', note: 'Optic white was made for you. Black-and-white is your signature equation.' },
      { piece: 'Your denim'    , answer: 'Deep indigo'         , hex: '#1F2A44', note: 'Faded washes dilute you. Deep cool indigo is your denim.' },
      { piece: 'Your khaki'    , answer: 'Cool deep olive'     , hex: '#3F4030', note: 'Warm khaki goes muddy on you. A cool deep olive is your khaki.' },
      { piece: 'Your grey'     , answer: 'Charcoal'            , hex: '#333842', note: 'Your grey is cool and deep. Charcoal, gunmetal, slate.' },
      { piece: 'Your navy'     , answer: 'Ink navy'            , hex: '#121D33', note: 'True black-navy is your grounding. Don\'t go softer.' },
      { piece: 'Your camel'    , answer: 'Espresso-brown'      , hex: '#3E2817', note: 'You don\'t wear camel. Deep espresso is your functional equivalent.' },
      { piece: 'Your metal'    , answer: 'Silver'              , hex: '#B8BDC2', note: 'Gold reads warm against your cool. Silver, platinum, and white gold are yours.' },
    ],
  },
  'true-winter': {
    palette: [
      { hex: '#FFFFFF', name: 'Pure white', wear: 'Your white' },
      { hex: '#D8D8D8', name: 'Snow',      wear: 'Cool off-white' },
      { hex: '#8A8E94', name: 'Steel',     wear: 'Mid grey' },
      { hex: '#4A4E58', name: 'Charcoal',  wear: 'Deep grey' },
      { hex: '#1E2A4A', name: 'True navy', wear: 'Your navy' },
      { hex: '#0A1128', name: 'Midnight',  wear: 'Deepest navy' },
      { hex: '#000000', name: 'Black',     wear: 'Your black' },
      { hex: '#4A0E2E', name: 'Burgundy',  wear: 'Deep cool wine' },
    ],
    basics: [
      { piece: 'Your black'    , answer: 'True black'          , hex: '#000000', note: 'True black is one of your signatures. Let it be bold.' },
      { piece: 'Your white'    , answer: 'Optic white'         , hex: '#FFFFFF', note: 'Blinding white next to black is exactly your high-contrast equation.' },
      { piece: 'Your denim'    , answer: 'Cool indigo'         , hex: '#1D3A63', note: 'Dark cool indigo is your denim. Faded washes mute your clarity.' },
      { piece: 'Your khaki'    , answer: 'Cool grey-olive'     , hex: '#565F4E', note: 'Warm khaki fights you. Cool grey-olive is your khaki.' },
      { piece: 'Your grey'     , answer: 'Cool charcoal'       , hex: '#3A4048', note: 'Crisp cool charcoal. Gunmetal. Don\'t stray warm.' },
      { piece: 'Your navy'     , answer: 'Classic navy'        , hex: '#1F2E54', note: 'True cool navy is another of your core neutrals.' },
      { piece: 'Your camel'    , answer: 'Cool taupe'          , hex: '#7F6F60', note: 'Classic warm camel fights you. Cool greyed taupe is your stand-in.' },
      { piece: 'Your metal'    , answer: 'Polished silver'     , hex: '#BCC1C6', note: 'Silver and platinum are yours. Gold reads yellow and cheapens you.' },
    ],
  },
  'bright-winter': {
    palette: [
      { hex: '#FFFFFF', name: 'Pure white', wear: 'Your white' },
      { hex: '#E8EFF4', name: 'Ice',       wear: 'Cool off-white' },
      { hex: '#A0A8B0', name: 'Silver',    wear: 'Bright mid grey' },
      { hex: '#5A6270', name: 'Graphite',  wear: 'Deep grey' },
      { hex: '#24365E', name: 'Royal navy', wear: 'Your navy' },
      { hex: '#0D1734', name: 'Midnight',  wear: 'Deepest navy' },
      { hex: '#000000', name: 'Black',     wear: 'Your black' },
      { hex: '#1F3B47', name: 'Teal',      wear: 'Deep cool accent' },
    ],
    basics: [
      { piece: 'Your black'    , answer: 'True black'          , hex: '#0A0A0A', note: 'Black is your framing device. Use it to set off your brightness.' },
      { piece: 'Your white'    , answer: 'Icy white'           , hex: '#FAFAFA', note: 'Optic white works. Icy white with a faint cool cast is even better.' },
      { piece: 'Your denim'    , answer: 'Clear mid-indigo'    , hex: '#274782', note: 'Bright-cool denim without grey in it. Don\'t go washed out.' },
      { piece: 'Your khaki'    , answer: 'Cool sage'           , hex: '#7A8878', note: 'Warm khaki is too muted. A cool sage with brightness in it is yours.' },
      { piece: 'Your grey'     , answer: 'Clear silver-grey'   , hex: '#9AA0A8', note: 'Your grey has clarity, not softness. Crisp and cool.' },
      { piece: 'Your navy'     , answer: 'Bright navy'         , hex: '#1A3B7A', note: 'Not the stormy True Winter navy. Yours has more life.' },
      { piece: 'Your camel'    , answer: 'Icy caramel'         , hex: '#B49778', note: 'You don\'t really wear camel. If you must, go cooler and clearer.' },
      { piece: 'Your metal'    , answer: 'Chrome silver'       , hex: '#C4C8CD', note: 'Polished chrome and high-shine silver. Gold looks off.' },
    ],
  },

  // ========== AUTUMN (hand-authored original) ==========
  'true-autumn': {
    // 8 neutrals arranged from light → deep
    palette: [
      { hex: '#F4EBD8', name: 'Bone',      wear: 'Your white' },
      { hex: '#E6D3B3', name: 'Cream',     wear: 'Warm ivory' },
      { hex: '#C9A876', name: 'Camel',     wear: 'Classic tan' },
      { hex: '#A8936B', name: 'Greige',    wear: 'Warm neutral' },
      { hex: '#8B6F3F', name: 'Cognac',    wear: 'Rich tan' },
      { hex: '#6B5335', name: 'Chocolate', wear: 'Your black' },
      { hex: '#4A3825', name: 'Espresso',  wear: 'Darkest brown' },
      { hex: '#2F2A1F', name: 'Ink',       wear: 'Warm near-black' },
    ],
    basics: [
      { piece: 'Your black',   answer: 'Chocolate',  hex: '#6B5335', note: 'True black pulls all warmth from your skin. Chocolate reads as black but glows.' },
      { piece: 'Your white',   answer: 'Bone',       hex: '#F4EBD8', note: 'Optic white is too stark. Bone is the warm off-white your skin loves.' },
      { piece: 'Your denim',   answer: 'Rust-wash',  hex: '#8B4A2B', note: 'Indigo fights you. Warm brown-washed denim blends in.' },
      { piece: 'Your khaki',   answer: 'Olive-gold', hex: '#7D7042', note: 'Not beige. A warm olive with gold warmth underneath.' },
      { piece: 'Your grey',    answer: 'Greige',     hex: '#A8936B', note: 'Cool grey looks dingy on you. Warm greige is your grey.' },
      { piece: 'Your navy',    answer: 'Forest',     hex: '#2F4F2F', note: 'Navy is a cool concept. Deep forest green is the grounding dark that works.' },
      { piece: 'Your camel',   answer: 'Cognac',     hex: '#8B6F3F', note: 'Rich, medium-deep tan. The single most universal piece in your wardrobe.' },
      { piece: 'Your metal',   answer: 'Warm gold',  hex: '#C4A265', note: 'Silver looks blue on your skin. Gold, brass, and bronze warm you up.' },
    ],
  },
  // Fallback neutrals — used for any season not yet defined
  'default': {
    palette: [
      { hex: '#F4EBD8', name: 'Bone',      wear: 'Soft white' },
      { hex: '#E6D3B3', name: 'Cream',     wear: 'Warm ivory' },
      { hex: '#C9A876', name: 'Tan',       wear: 'Light neutral' },
      { hex: '#A8936B', name: 'Greige',    wear: 'Mid neutral' },
      { hex: '#8B6F3F', name: 'Taupe',     wear: 'Deep neutral' },
      { hex: '#6B5335', name: 'Umber',     wear: 'Your black' },
      { hex: '#4A3825', name: 'Espresso',  wear: 'Darkest' },
      { hex: '#2F2A1F', name: 'Ink',       wear: 'Near-black' },
    ],
    basics: [
      { piece: 'Your black', answer: 'Soft umber', hex: '#6B5335', note: 'Pure black can overwhelm. A softened version keeps depth without harshness.' },
      { piece: 'Your white', answer: 'Bone',       hex: '#F4EBD8', note: 'Optic white is often too stark. Bone is the gentler alternative.' },
      { piece: 'Your denim', answer: 'Mid-wash',   hex: '#6F8BA8', note: 'A clean mid-wash denim tends to play well with most palettes.' },
      { piece: 'Your khaki', answer: 'Warm khaki', hex: '#A89468', note: 'A gold-forward khaki rather than a grey-green one.' },
      { piece: 'Your grey',  answer: 'Greige',     hex: '#A8936B', note: 'Warm greige reads as grey but without the dinginess.' },
      { piece: 'Your navy',  answer: 'Ink',        hex: '#2F2A1F', note: 'Warm near-black is a softer grounding dark than cool navy.' },
      { piece: 'Your camel', answer: 'Classic tan', hex: '#C9A876', note: 'The single most universal anchor piece.' },
      { piece: 'Your metal', answer: 'Mixed',      hex: '#C4A265', note: 'Try both gold and silver near your face in daylight.' },
    ],
  },
};

export function neutralsFor(seasonId) {
  return NEUTRALS[seasonId] || NEUTRALS['default'];
}

// ============================================================
// Contrast layer — connects to viral B&W contrast filter trend (Marei 5.7M views)
// Per May 2026 viral research: contrast is the second axis after season family
// that drives content engagement. Surfacing it on results pages turns the
// quiz from "what's my season" into "what's my full color identity."
// ============================================================
const CONTRAST_BY_SEASON = {
  'clear-spring':  'high',
  'true-spring':   'medium',
  'light-spring':  'low',
  'light-summer':  'low',
  'true-summer':   'medium',
  'soft-summer':   'low',
  'soft-autumn':   'low',
  'true-autumn':   'medium',
  'dark-autumn':   'high',
  'dark-winter':   'high',
  'true-winter':   'high',
  'bright-winter': 'high',
};

const CONTRAST_COPY = {
  high: {
    label: 'High Contrast',
    body:  'Your features pop in black-and-white photos. You can wear bold pairings: black with bright pink, white with deep navy. Soft-on-soft palettes wash you out.',
    pairs: 'Bold + bright. Stark contrast. Statement pieces.',
  },
  medium: {
    label: 'Medium Contrast',
    body:  'Your features are balanced, neither stark nor muted. You have the most flexibility of any contrast type. Bold pairings work, soft pairings work, depending on the day.',
    pairs: 'Mid-range pairings. Saturated but not screaming.',
  },
  low: {
    label: 'Low Contrast',
    body:  'Your features blend softly together. Your magic is in tonal pairings: cream on camel, soft pink on dusty rose. Stark contrasts overpower you.',
    pairs: 'Tonal layering. Soft-on-soft. Whispers, not shouts.',
  },
};

export function contrastFor(seasonId) {
  const level = CONTRAST_BY_SEASON[seasonId] || 'medium';
  return { level, ...CONTRAST_COPY[level] };
}

// ============================================================
// Pinterest Predicts 2026 — captures 22x interest spike per May 2026 research.
// Maps the 5 PP2026 trending colors to the seasons that wear them best.
// Tagging Allele content with these specific names captures algorithmic boost.
// ============================================================
const PP2026_COLORS = {
  persimmon:  { name: 'Persimmon',  hex: '#E2725B', body: 'Warm orange-red with fruit-like saturation. The 2026 take on the coral your warm coloring loves.' },
  plumNoir:   { name: 'Plum Noir',  hex: '#4B1A2F', body: 'Deep purple-burgundy. The darkest tone your depth can carry without losing color.' },
  wasabi:     { name: 'Wasabi',     hex: '#B5C84A', body: 'Electric yellow-green. Only the clearest, brightest coloring can pull this off.' },
  coolBlue:   { name: 'Cool Blue',  hex: '#7B9BC2', body: 'Subzero sophistication. The icy version of blue, made for cool undertones.' },
  jade:       { name: 'Jade',       hex: '#4A8E7D', body: 'Earthy mint-green. The 2026 take on the green you should already be wearing.' },
};

const PP2026_BY_SEASON = {
  'clear-spring':  ['persimmon', 'wasabi'],
  'true-spring':   ['persimmon', 'wasabi'],
  'light-spring':  ['persimmon', 'jade'],
  'light-summer':  ['coolBlue', 'jade'],
  'true-summer':   ['coolBlue', 'jade'],
  'soft-summer':   ['jade', 'coolBlue'],
  'soft-autumn':   ['persimmon', 'jade'],
  'true-autumn':   ['persimmon', 'jade'],
  'dark-autumn':   ['plumNoir', 'persimmon'],
  'dark-winter':   ['plumNoir', 'coolBlue'],
  'true-winter':   ['coolBlue', 'plumNoir'],
  'bright-winter': ['wasabi', 'coolBlue'],
};

export function pinterestPredictsFor(seasonId) {
  const keys = PP2026_BY_SEASON[seasonId] || [];
  return keys.map(k => PP2026_COLORS[k]).filter(Boolean);
}

export function isDarkHex(hex) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) < 130;
}

export function metalGradient(hex) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const mix = (c, t, amt) =>
    Math.max(0, Math.min(255, Math.round(c + (t - c) * amt)));
  const toHex = (rr, gg, bb) =>
    "#" + [rr, gg, bb].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();
  const hi = toHex(mix(r, 255, 0.45), mix(g, 255, 0.45), mix(b, 255, 0.40));
  const lo = toHex(mix(r, 40, 0.45), mix(g, 35, 0.45), mix(b, 30, 0.45));
  const sh = toHex(mix(r, 20, 0.60), mix(g, 18, 0.60), mix(b, 15, 0.60));
  return `linear-gradient(135deg, ${hi} 0%, ${hex} 38%, ${lo} 72%, ${sh} 100%)`;
}

// The existing /results page accepts ?season=True+Autumn (display name);
// this dataset keys on kebab-case ("true-autumn"). Helpers bridge the two.
export function seasonIdFromName(name) {
  if (!name) return "true-autumn";
  return name.toLowerCase().replace(/\s+/g, "-");
}
export function seasonNameFromId(id) {
  return SEASONS[id]?.name || "True Autumn";
}
