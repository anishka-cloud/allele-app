/**
 * Product recommendation database — 8 categories × 3 price tiers × 12 seasons.
 * Real brand names, product names, shade names, prices, and hex colors.
 * Phase 2 sweep: budget + splurge tiers rebuilt across all categories,
 * value tiers for foundation/concealer/lipLiner/bronzer rebuilt,
 * value tiers for lips/blush/eyes/nails retained from Phase 1.
 * Duplicate " II" placeholder entries removed — each tier is a single-item array.
 */

const TIER_META = {
  budget:  { label: "Budget Pick", range: "$5–15" },
  value:   { label: "Best Value",  range: "$15–30", popular: true },
  splurge: { label: "Splurge",     range: "$30–60+" },
};

const CATEGORIES = [
  { key: "foundation", label: "Foundation", icon: "foundation" },
  { key: "concealer",  label: "Concealer",  icon: "concealer" },
  { key: "lips",       label: "Lips",       icon: "lips" },
  { key: "lipLiner",   label: "Lip Liner",  icon: "lipLiner" },
  { key: "blush",      label: "Blush",      icon: "blush" },
  { key: "eyes",       label: "Eyes",       icon: "eyes" },
  { key: "bronzer",    label: "Bronzer",    icon: "bronzer" },
  { key: "nails",      label: "Nails",      icon: "nails" },
];

const B = "budget", V = "value", S = "splurge";

const productDB = {
"Clear Spring": {
  foundation: {
    [B]: [{ brand:"L'Oréal", product:"True Match", shade:"W4 Natural Beige", price:"$12", hex:"#D4A574" }],
    [V]: [{ brand:"Rare Beauty", product:"Liquid Touch Weightless Foundation", shade:"230W", price:"$30", hex:"#D4A574" }],
    [S]: [{ brand:"Armani Beauty", product:"Luminous Silk Foundation", shade:"6", price:"$69", hex:"#D4A574" }],
  },
  concealer: {
    [B]: [{ brand:"Maybelline", product:"Instant Age Rewind Eraser", shade:"Warm Nude", price:"$10", hex:"#E0BB95" }],
    [V]: [{ brand:"NARS", product:"Radiant Creamy Concealer", shade:"Café Con Leche", price:"$32", hex:"#DDB892" }],
    [S]: [{ brand:"Tarte", product:"Shape Tape Concealer", shade:"34S Medium Sand", price:"$32", hex:"#DFB594" }],
  },
  lips: {
    [B]: [{ brand:"NYX", product:"Butter Gloss", shade:"Praline", price:"$6", hex:"#C47A5A" }],
    [V]: [{ brand:"Rare Beauty", product:"Soft Pinch Tinted Lip Oil", shade:"Joy", price:"$22", hex:"#E35335" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Matte Revolution Lipstick", shade:"Walk of Shame", price:"$38", hex:"#C44E3E" }],
  },
  lipLiner: {
    [B]: [{ brand:"NYX", product:"Slim Lip Pencil", shade:"Natural", price:"$4", hex:"#C4795A", pairsWith:"Complementary Lipstick" }],
    [V]: [{ brand:"Urban Decay", product:"24/7 Glide-On Lip Pencil", shade:"Naked", price:"$24", hex:"#B86B4A" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Lip Cheat Lip Liner", shade:"Iconic Nude", price:"$26", hex:"#B57358" }],
  },
  blush: {
    [B]: [{ brand:"Milani", product:"Baked Blush", shade:"Luminoso", price:"$9", hex:"#E8896B" }],
    [V]: [{ brand:"Rare Beauty", product:"Soft Pinch Liquid Blush", shade:"Joy", price:"$23", hex:"#F08A7A" }],
    [S]: [{ brand:"NARS", product:"Blush", shade:"Orgasm", price:"$36", hex:"#F5A09E" }],
  },
  eyes: {
    [B]: [{ brand:"e.l.f.", product:"Bite-Size Eyeshadow", shade:"Cream & Sugar", price:"$4", hex:"#CD7F32" }],
    [V]: [{ brand:"ColourPop", product:"Sweet Talk Palette", shade:"Meadow", price:"$16", hex:"#F05030" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Luxury Palette", shade:"Stars in Her Eyes", price:"$55", hex:"#C8973C" }],
  },
  bronzer: {
    [B]: [{ brand:"Physicians Formula", product:"Butter Bronzer", shade:"Light", price:"$15", hex:"#C4955A" }],
    [V]: [{ brand:"Milk Makeup", product:"Matte Bronzer Stick", shade:"Baked", price:"$26", hex:"#B08050" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Airbrush Bronzer", shade:"1 Fair", price:"$50", hex:"#A87040" }],
  },
  nails: {
    [B]: [{ brand:"Sally Hansen", product:"Miracle Gel", shade:"Mango Dream", price:"$7", hex:"#FF7F50" }],
    [V]: [{ brand:"OPI", product:"Nail Lacquer", shade:"Cajun Shrimp", price:"$12", hex:"#F26E44" }],
    [S]: [{ brand:"Chanel", product:"Le Vernis", shade:"Coralium", price:"$32", hex:"#E35335" }],
  },
},
"True Spring": {
  foundation: {
    [B]: [{ brand:"Maybelline", product:"Fit Me Dewy + Smooth Foundation", shade:"220 Natural Beige", price:"$9", hex:"#D4A574" }],
    [V]: [{ brand:"Glossier", product:"Skin Tint", shade:"G8", price:"$28", hex:"#D4A574" }],
    [S]: [{ brand:"Armani Beauty", product:"Luminous Silk Foundation", shade:"5.5", price:"$69", hex:"#D4A574" }],
  },
  concealer: {
    [B]: [{ brand:"e.l.f.", product:"Hydrating Camo Concealer", shade:"Medium Sand", price:"$7", hex:"#DEBB95" }],
    [V]: [{ brand:"Kosas", product:"Revealer Concealer", shade:"Tone 5.5 W", price:"$28", hex:"#DEBB95" }],
    [S]: [{ brand:"NARS", product:"Radiant Creamy Concealer", shade:"Honey", price:"$32", hex:"#DEBB95" }],
  },
  lips: {
    [B]: [{ brand:"NYX", product:"Lip Lingerie XXL", shade:"Peach Flirt", price:"$11", hex:"#E8956A" }],
    [V]: [{ brand:"NARS", product:"Afterglow Lip Balm", shade:"Orgasm", price:"$30", hex:"#F08563" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Matte Revolution Lipstick", shade:"Walk of Shame", price:"$38", hex:"#C44E3E" }],
  },
  lipLiner: {
    [B]: [{ brand:"NYX", product:"Slim Lip Pencil", shade:"Peekaboo Neutral", price:"$4", hex:"#C09070", pairsWith:"Complementary Lipstick" }],
    [V]: [{ brand:"Anastasia Beverly Hills", product:"Lip Liner", shade:"Warm Taupe", price:"$22", hex:"#B07858" }],
    [S]: [{ brand:"MAC", product:"Lip Pencil", shade:"Spice", price:"$24", hex:"#A06848" }],
  },
  blush: {
    [B]: [{ brand:"Milani", product:"Baked Blush", shade:"Berry Amore", price:"$9", hex:"#E89078" }],
    [V]: [{ brand:"NARS", product:"Blush", shade:"Orgasm", price:"$36", hex:"#E28B7E" }],
    [S]: [{ brand:"Patrick Ta", product:"Major Headlines Double-Take Crème & Powder Blush Duo", shade:"She's Baby", price:"$42", hex:"#F4A460" }],
  },
  eyes: {
    [B]: [{ brand:"e.l.f.", product:"Bite-Size Eyeshadow", shade:"Honey Drizzle", price:"$4", hex:"#E8B872" }],
    [V]: [{ brand:"Urban Decay", product:"Naked Honey Palette", shade:"Honey", price:"$35", hex:"#C9982B" }],
    [S]: [{ brand:"Natasha Denona", product:"Biba Eyeshadow Palette", shade:"Warm Gold", price:"$65", hex:"#E8C77A" }],
  },
  bronzer: {
    [B]: [{ brand:"e.l.f.", product:"Putty Bronzer", shade:"Tan Lines", price:"$7", hex:"#C08848" }],
    [V]: [{ brand:"Tower 28", product:"BronzinoIlluminating Cream Bronzer", shade:"Capri", price:"$22", hex:"#B07A40" }],
    [S]: [{ brand:"Patrick Ta", product:"Major Glow Face Glow", shade:"She's Sun-Kissed", price:"$58", hex:"#A07038" }],
  },
  nails: {
    [B]: [{ brand:"Sally Hansen", product:"Miracle Gel", shade:"Game of Chromes", price:"$7", hex:"#E8C547" }],
    [V]: [{ brand:"Olive & June", product:"Nail Polish", shade:"Stinson Sunset", price:"$9", hex:"#FF7F50" }],
    [S]: [{ brand:"Dior", product:"Vernis Nail Lacquer", shade:"Coral Pop", price:"$32", hex:"#E17055" }],
  },
},
"Light Spring": {
  foundation: {
    [B]: [{ brand:"L'Oréal", product:"True Match", shade:"W2 Light Ivory", price:"$12", hex:"#F0D5B8" }],
    [V]: [{ brand:"Glossier", product:"Skin Tint", shade:"G5", price:"$28", hex:"#F0D5B8" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Airbrush Flawless Foundation", shade:"3.5 Warm", price:"$48", hex:"#F0D5B8" }],
  },
  concealer: {
    [B]: [{ brand:"Maybelline", product:"Instant Age Rewind Eraser", shade:"Fair", price:"$10", hex:"#F5E0CC" }],
    [V]: [{ brand:"IT Cosmetics", product:"Bye Bye Under Eye Concealer", shade:"11.5 Light", price:"$29", hex:"#F5E0CC" }],
    [S]: [{ brand:"NARS", product:"Radiant Creamy Concealer", shade:"Chantilly", price:"$32", hex:"#F5E0CC" }],
  },
  lips: {
    [B]: [{ brand:"e.l.f.", product:"Glossy Lip Stain", shade:"Pinkies Up", price:"$5", hex:"#E8A0A8" }],
    [V]: [{ brand:"Rare Beauty", product:"Kind Words Matte Lipstick", shade:"Lively", price:"$22", hex:"#E8A0A8" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Matte Revolution Lipstick", shade:"Pillow Talk Original", price:"$38", hex:"#C88D87" }],
  },
  lipLiner: {
    [B]: [{ brand:"NYX", product:"Slim Lip Pencil", shade:"Pink Nude", price:"$4", hex:"#D4A09A", pairsWith:"Complementary Lipstick" }],
    [V]: [{ brand:"Urban Decay", product:"24/7 Glide-On Lip Pencil", shade:"Naked 2", price:"$24", hex:"#C49088" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Lip Cheat Lip Liner", shade:"Pillow Talk", price:"$26", hex:"#B88080" }],
  },
  blush: {
    [B]: [{ brand:"e.l.f.", product:"Putty Blush", shade:"Bora Bora", price:"$6", hex:"#F2B598" }],
    [V]: [{ brand:"Glossier", product:"Cloud Paint", shade:"Beam", price:"$22", hex:"#F5B095" }],
    [S]: [{ brand:"NARS", product:"Blush", shade:"Sex Appeal", price:"$36", hex:"#F5C1B0" }],
  },
  eyes: {
    [B]: [{ brand:"e.l.f.", product:"Bite-Size Eyeshadow", shade:"Creme Brulee", price:"$4", hex:"#F3E5AB" }],
    [V]: [{ brand:"ColourPop", product:"Sweet Talk Palette", shade:"Catch Me", price:"$16", hex:"#F5C8A8" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Luxury Palette", shade:"Pillow Talk", price:"$55", hex:"#E8B898" }],
  },
  bronzer: {
    [B]: [{ brand:"Physicians Formula", product:"Butter Bronzer", shade:"Light", price:"$15", hex:"#E8C8A0" }],
    [V]: [{ brand:"Tower 28", product:"BronzinoIlluminating Cream Bronzer", shade:"Santorini", price:"$22", hex:"#D0AA80" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Airbrush Bronzer", shade:"1 Fair", price:"$50", hex:"#C49A70" }],
  },
  nails: {
    [B]: [{ brand:"Sally Hansen", product:"Miracle Gel", shade:"Pink Up the Pace", price:"$7", hex:"#FFB6C1" }],
    [V]: [{ brand:"Essie", product:"Nail Polish", shade:"Fiji", price:"$10", hex:"#F5C6C8" }],
    [S]: [{ brand:"Dior", product:"Vernis Nail Lacquer", shade:"Rose Porcelaine", price:"$32", hex:"#F2D2CF" }],
  },
},
"Light Summer": {
  foundation: {
    [B]: [{ brand:"L'Oréal", product:"True Match", shade:"C1 Alabaster", price:"$12", hex:"#F0DAD0" }],
    [V]: [{ brand:"Glossier", product:"Skin Tint", shade:"G4", price:"$28", hex:"#F0DAD0" }],
    [S]: [{ brand:"Armani Beauty", product:"Luminous Silk Foundation", shade:"2", price:"$69", hex:"#F0DAD0" }],
  },
  concealer: {
    [B]: [{ brand:"Maybelline", product:"Instant Age Rewind Eraser", shade:"Brightener", price:"$10", hex:"#F8E8DC" }],
    [V]: [{ brand:"Kosas", product:"Revealer Concealer", shade:"Tone 2 C", price:"$28", hex:"#F8E8DC" }],
    [S]: [{ brand:"NARS", product:"Radiant Creamy Concealer", shade:"Vanilla", price:"$32", hex:"#F8E8DC" }],
  },
  lips: {
    [B]: [{ brand:"NYX", product:"Butter Gloss", shade:"Tiramisu", price:"$6", hex:"#E8A5A8" }],
    [V]: [{ brand:"MAC", product:"Cremesheen Lipstick", shade:"Creme Cup", price:"$24", hex:"#E8A5A8" }],
    [S]: [{ brand:"Dior", product:"Rouge Dior", shade:"458 Paris", price:"$45", hex:"#E8B4D0" }],
  },
  lipLiner: {
    [B]: [{ brand:"e.l.f.", product:"Lip Liner Pencil", shade:"Pink", price:"$3", hex:"#D0A0B0", pairsWith:"Complementary Lipstick" }],
    [V]: [{ brand:"Urban Decay", product:"24/7 Glide-On Lip Pencil", shade:"Naked 3", price:"$24", hex:"#C090A0" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Lip Cheat Lip Liner", shade:"Pillow Talk", price:"$26", hex:"#B08890" }],
  },
  blush: {
    [B]: [{ brand:"Milani", product:"Baked Blush", shade:"Dolce Pink", price:"$9", hex:"#F0C0D0" }],
    [V]: [{ brand:"Glossier", product:"Cloud Paint", shade:"Puff", price:"$22", hex:"#F2B5C0" }],
    [S]: [{ brand:"NARS", product:"Blush", shade:"Sex Appeal", price:"$36", hex:"#F7CAC9" }],
  },
  eyes: {
    [B]: [{ brand:"e.l.f.", product:"Bite-Size Eyeshadow", shade:"Rose Water", price:"$4", hex:"#E5C3C8" }],
    [V]: [{ brand:"Urban Decay", product:"Naked3 Mini Palette", shade:"Strange", price:"$29", hex:"#E0C8C8" }],
    [S]: [{ brand:"Natasha Denona", product:"Mini Nude Eyeshadow Palette", shade:"Nude", price:"$35", hex:"#C8C8D0" }],
  },
  bronzer: {
    [B]: [{ brand:"e.l.f.", product:"Putty Bronzer", shade:"Tan Lines", price:"$7", hex:"#D4B8A0" }],
    [V]: [{ brand:"Tower 28", product:"BronzinoIlluminating Cream Bronzer", shade:"Capri", price:"$22", hex:"#C4A890" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Airbrush Bronzer", shade:"1 Fair", price:"$50", hex:"#B49880" }],
  },
  nails: {
    [B]: [{ brand:"Sally Hansen", product:"Miracle Gel", shade:"Lavender Fields", price:"$7", hex:"#E0BBE4" }],
    [V]: [{ brand:"Chanel", product:"Le Vernis", shade:"Ballerina", price:"$32", hex:"#F5D8D8" }],
    [S]: [{ brand:"Dior", product:"Vernis Nail Lacquer", shade:"Incognito", price:"$32", hex:"#F7CAC9" }],
  },
},
"True Summer": {
  foundation: {
    [B]: [{ brand:"Maybelline", product:"Fit Me Matte + Poreless Foundation", shade:"120 Classic Ivory", price:"$9", hex:"#E0C4B5" }],
    [V]: [{ brand:"Rare Beauty", product:"Liquid Touch Weightless Foundation", shade:"170C", price:"$30", hex:"#E0C4B5" }],
    [S]: [{ brand:"Armani Beauty", product:"Luminous Silk Foundation", shade:"4", price:"$69", hex:"#E0C4B5" }],
  },
  concealer: {
    [B]: [{ brand:"e.l.f.", product:"Hydrating Camo Concealer", shade:"Light Ivory", price:"$7", hex:"#EAD4C5" }],
    [V]: [{ brand:"NARS", product:"Soft Matte Complete Concealer", shade:"Custard", price:"$32", hex:"#EAD4C5" }],
    [S]: [{ brand:"Fenty Beauty", product:"Pro Filt'r Instant Retouch Concealer", shade:"170", price:"$28", hex:"#EAD4C5" }],
  },
  lips: {
    [B]: [{ brand:"NYX", product:"Soft Matte Lip Cream", shade:"Milan", price:"$8", hex:"#B07572" }],
    [V]: [{ brand:"MAC", product:"Satin Lipstick", shade:"Twig", price:"$24", hex:"#9E6F6B" }],
    [S]: [{ brand:"Pat McGrath", product:"MatteTrance Lipstick", shade:"Elson", price:"$40", hex:"#8B3A62" }],
  },
  lipLiner: {
    [B]: [{ brand:"NYX", product:"Slim Lip Pencil", shade:"Mauve", price:"$4", hex:"#A07080", pairsWith:"Complementary Lipstick" }],
    [V]: [{ brand:"Anastasia Beverly Hills", product:"Lip Liner", shade:"Dusty Rose", price:"$22", hex:"#904868" }],
    [S]: [{ brand:"MAC", product:"Lip Pencil", shade:"Whirl", price:"$24", hex:"#885060" }],
  },
  blush: {
    [B]: [{ brand:"e.l.f.", product:"Putty Blush", shade:"Berry Smoothie", price:"$6", hex:"#E8A0B4" }],
    [V]: [{ brand:"Rare Beauty", product:"Soft Pinch Liquid Blush", shade:"Happy", price:"$23", hex:"#D46988" }],
    [S]: [{ brand:"NARS", product:"Blush", shade:"Impassioned", price:"$36", hex:"#C08090" }],
  },
  eyes: {
    [B]: [{ brand:"e.l.f.", product:"Bite-Size Eyeshadow", shade:"Mauve Bar", price:"$4", hex:"#9A8B80" }],
    [V]: [{ brand:"Urban Decay", product:"Naked3 Mini Palette", shade:"Limit", price:"$29", hex:"#B28E90" }],
    [S]: [{ brand:"Natasha Denona", product:"Mini Retro Eyeshadow Palette", shade:"Rose", price:"$35", hex:"#C4B0D4" }],
  },
  bronzer: {
    [B]: [{ brand:"Physicians Formula", product:"Butter Bronzer", shade:"Light", price:"$15", hex:"#B09888" }],
    [V]: [{ brand:"Milk Makeup", product:"Matte Bronzer Stick", shade:"Blaze", price:"$26", hex:"#A08878" }],
    [S]: [{ brand:"NARS", product:"Laguna Bronzing Powder", shade:"Laguna", price:"$42", hex:"#907868" }],
  },
  nails: {
    [B]: [{ brand:"Sally Hansen", product:"Miracle Gel", shade:"Pink Up the Pace", price:"$7", hex:"#D88098" }],
    [V]: [{ brand:"Essie", product:"Nail Polish", shade:"Bikini So Teeny", price:"$10", hex:"#8CA8D8" }],
    [S]: [{ brand:"Chanel", product:"Le Vernis", shade:"Rose Confidentiel", price:"$32", hex:"#B87585" }],
  },
},
"Soft Summer": {
  foundation: {
    [B]: [{ brand:"L'Oréal", product:"True Match", shade:"C3 Creamy Natural", price:"$12", hex:"#D5B5A0" }],
    [V]: [{ brand:"Rare Beauty", product:"Liquid Touch Weightless Foundation", shade:"210C", price:"$30", hex:"#D5B5A0" }],
    [S]: [{ brand:"Armani Beauty", product:"Luminous Silk Foundation", shade:"4.5", price:"$69", hex:"#D5B5A0" }],
  },
  concealer: {
    [B]: [{ brand:"Maybelline", product:"Instant Age Rewind Eraser", shade:"Neutralizer", price:"$10", hex:"#E0C8B8" }],
    [V]: [{ brand:"IT Cosmetics", product:"Bye Bye Under Eye Concealer", shade:"21.0 Medium", price:"$29", hex:"#E0C8B8" }],
    [S]: [{ brand:"NARS", product:"Radiant Creamy Concealer", shade:"Custard", price:"$32", hex:"#E0C8B8" }],
  },
  lips: {
    [B]: [{ brand:"NYX", product:"Soft Matte Lip Cream", shade:"Cannes", price:"$8", hex:"#C9929D" }],
    [V]: [{ brand:"Rare Beauty", product:"Kind Words Matte Lipstick", shade:"Humble", price:"$22", hex:"#A86A6E" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Matte Revolution Lipstick", shade:"Pillow Talk Medium", price:"$38", hex:"#B8908A" }],
  },
  lipLiner: {
    [B]: [{ brand:"e.l.f.", product:"Lip Liner Pencil", shade:"Berry", price:"$3", hex:"#A08888", pairsWith:"Complementary Lipstick" }],
    [V]: [{ brand:"Urban Decay", product:"24/7 Glide-On Lip Pencil", shade:"Rock Steady", price:"$24", hex:"#9A7880" }],
    [S]: [{ brand:"MAC", product:"Lip Pencil", shade:"Soar", price:"$24", hex:"#A07078" }],
  },
  blush: {
    [B]: [{ brand:"Milani", product:"Baked Blush", shade:"Rosa Romantica", price:"$9", hex:"#D4A0B0" }],
    [V]: [{ brand:"Glossier", product:"Cloud Paint", shade:"Dusk", price:"$22", hex:"#B88078" }],
    [S]: [{ brand:"NARS", product:"Blush", shade:"Douceur", price:"$36", hex:"#CCADA0" }],
  },
  eyes: {
    [B]: [{ brand:"e.l.f.", product:"Bite-Size Eyeshadow", shade:"Mauve Bar", price:"$4", hex:"#B0A0B0" }],
    [V]: [{ brand:"Huda Beauty", product:"Mauve Obsessions Palette", shade:"Mauve", price:"$27", hex:"#A08088" }],
    [S]: [{ brand:"Natasha Denona", product:"Mini Retro Eyeshadow Palette", shade:"Dusk", price:"$35", hex:"#8B7B8B" }],
  },
  bronzer: {
    [B]: [{ brand:"e.l.f.", product:"Putty Bronzer", shade:"Feelin' Shady", price:"$7", hex:"#B8A088" }],
    [V]: [{ brand:"Milk Makeup", product:"Matte Bronzer Stick", shade:"Blaze", price:"$26", hex:"#A89078" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Airbrush Bronzer", shade:"2 Medium", price:"$50", hex:"#988068" }],
  },
  nails: {
    [B]: [{ brand:"Sally Hansen", product:"Miracle Gel", shade:"Mauve-lous", price:"$7", hex:"#C9929D" }],
    [V]: [{ brand:"Chanel", product:"Le Vernis", shade:"Particulière", price:"$32", hex:"#B8A090" }],
    [S]: [{ brand:"Dior", product:"Vernis Nail Lacquer", shade:"Grège", price:"$32", hex:"#A09088" }],
  },
},
"Soft Autumn": {
  foundation: {
    [B]: [{ brand:"L'Oréal", product:"True Match", shade:"W4.5 Fresh Beige", price:"$12", hex:"#CCAA88" }],
    [V]: [{ brand:"Rare Beauty", product:"Liquid Touch Weightless Foundation", shade:"270W", price:"$30", hex:"#CCAA88" }],
    [S]: [{ brand:"Armani Beauty", product:"Luminous Silk Foundation", shade:"6.5", price:"$69", hex:"#CCAA88" }],
  },
  concealer: {
    [B]: [{ brand:"e.l.f.", product:"Hydrating Camo Concealer", shade:"Medium Warm", price:"$7", hex:"#DABB9A" }],
    [V]: [{ brand:"Kosas", product:"Revealer Concealer", shade:"Tone 6 W", price:"$28", hex:"#DABB9A" }],
    [S]: [{ brand:"NARS", product:"Radiant Creamy Concealer", shade:"Caramel", price:"$32", hex:"#DABB9A" }],
  },
  lips: {
    [B]: [{ brand:"NYX", product:"Soft Matte Lip Cream", shade:"Istanbul", price:"$8", hex:"#C4A882" }],
    [V]: [{ brand:"MAC", product:"Matte Lipstick", shade:"Velvet Teddy", price:"$24", hex:"#B07865" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Matte Revolution Lipstick", shade:"Pillow Talk Medium", price:"$38", hex:"#B8908A" }],
  },
  lipLiner: {
    [B]: [{ brand:"NYX", product:"Slim Lip Pencil", shade:"Cappuccino", price:"$4", hex:"#A08870", pairsWith:"Complementary Lipstick" }],
    [V]: [{ brand:"Anastasia Beverly Hills", product:"Lip Liner", shade:"Warm Taupe", price:"$22", hex:"#907858" }],
    [S]: [{ brand:"MAC", product:"Lip Pencil", shade:"Stripdown", price:"$24", hex:"#886848" }],
  },
  blush: {
    [B]: [{ brand:"Milani", product:"Baked Blush", shade:"Rose D'Oro", price:"$9", hex:"#C4A090" }],
    [V]: [{ brand:"NARS", product:"Blush", shade:"Deep Throat", price:"$36", hex:"#E4928A" }],
    [S]: [{ brand:"Patrick Ta", product:"Major Headlines Double-Take Crème & Powder Blush Duo", shade:"She's That Girl", price:"$42", hex:"#C4B09A" }],
  },
  eyes: {
    [B]: [{ brand:"e.l.f.", product:"Bite-Size Eyeshadow", shade:"Cream & Sugar", price:"$4", hex:"#A09080" }],
    [V]: [{ brand:"ColourPop", product:"Yes, Please! Palette", shade:"Note to Self", price:"$16", hex:"#9B6A48" }],
    [S]: [{ brand:"Anastasia Beverly Hills", product:"Soft Glam Eyeshadow Palette", shade:"Soft Glam", price:"$45", hex:"#8B6B50" }],
  },
  bronzer: {
    [B]: [{ brand:"Physicians Formula", product:"Butter Bronzer", shade:"Bronzer", price:"$15", hex:"#B09068" }],
    [V]: [{ brand:"Milk Makeup", product:"Matte Bronzer Stick", shade:"Blaze", price:"$26", hex:"#A08058" }],
    [S]: [{ brand:"NARS", product:"Laguna Bronzing Powder", shade:"Laguna", price:"$42", hex:"#907048" }],
  },
  nails: {
    [B]: [{ brand:"Sally Hansen", product:"Miracle Gel", shade:"Totem-ly Yours", price:"$7", hex:"#A08870" }],
    [V]: [{ brand:"Olive & June", product:"Nail Polish", shade:"Wild & Free", price:"$9", hex:"#F5C8A0" }],
    [S]: [{ brand:"Chanel", product:"Le Vernis", shade:"Beige Pur", price:"$32", hex:"#C0A58A" }],
  },
},
"True Autumn": {
  foundation: {
    [B]: [{ brand:"Maybelline", product:"Fit Me Dewy + Smooth Foundation", shade:"310 Sun Beige", price:"$9", hex:"#C49060" }],
    [V]: [{ brand:"Rare Beauty", product:"Liquid Touch Weightless Foundation", shade:"330W", price:"$30", hex:"#C49060" }],
    [S]: [{ brand:"Armani Beauty", product:"Luminous Silk Foundation", shade:"8", price:"$69", hex:"#C49060" }],
  },
  concealer: {
    [B]: [{ brand:"e.l.f.", product:"Hydrating Camo Concealer", shade:"Medium Golden", price:"$7", hex:"#D4A878" }],
    [V]: [{ brand:"NARS", product:"Radiant Creamy Concealer", shade:"Caramel", price:"$32", hex:"#D4A878" }],
    [S]: [{ brand:"Fenty Beauty", product:"Pro Filt'r Instant Retouch Concealer", shade:"330", price:"$28", hex:"#D4A878" }],
  },
  lips: {
    [B]: [{ brand:"NYX", product:"Soft Matte Lip Cream", shade:"Cairo", price:"$8", hex:"#CC6633" }],
    [V]: [{ brand:"MAC", product:"Lustre Lipstick", shade:"Velvet Teddy", price:"$24", hex:"#B07865" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Matte Revolution Lipstick", shade:"Pillow Talk Medium", price:"$38", hex:"#B8908A" }],
  },
  lipLiner: {
    [B]: [{ brand:"NYX", product:"Slim Lip Pencil", shade:"Hot Cocoa", price:"$4", hex:"#8B5030", pairsWith:"Complementary Lipstick" }],
    [V]: [{ brand:"Anastasia Beverly Hills", product:"Lip Liner", shade:"Brick", price:"$22", hex:"#7A4028" }],
    [S]: [{ brand:"MAC", product:"Lip Pencil", shade:"Chestnut", price:"$24", hex:"#6A3020" }],
  },
  blush: {
    [B]: [{ brand:"Milani", product:"Baked Blush", shade:"Rose D'Oro", price:"$9", hex:"#CC6633" }],
    [V]: [{ brand:"Milk Makeup", product:"Lip + Cheek", shade:"Werk", price:"$22", hex:"#B8593B" }],
    [S]: [{ brand:"NARS", product:"Blush", shade:"Taj Mahal", price:"$36", hex:"#C08050" }],
  },
  eyes: {
    [B]: [{ brand:"e.l.f.", product:"Bite-Size Eyeshadow", shade:"Truffles", price:"$4", hex:"#B8860B" }],
    [V]: [{ brand:"ColourPop", product:"Yes, Please! Palette", shade:"Gno", price:"$16", hex:"#A8542C" }],
    [S]: [{ brand:"Anastasia Beverly Hills", product:"Modern Renaissance Eyeshadow Palette", shade:"Warm Neutrals", price:"$45", hex:"#B87333" }],
  },
  bronzer: {
    [B]: [{ brand:"e.l.f.", product:"Putty Bronzer", shade:"Tan Lines", price:"$7", hex:"#A07840" }],
    [V]: [{ brand:"Milk Makeup", product:"Matte Bronzer Stick", shade:"Blaze", price:"$26", hex:"#906830" }],
    [S]: [{ brand:"NARS", product:"Laguna Bronzing Powder", shade:"Laguna", price:"$42", hex:"#805828" }],
  },
  nails: {
    [B]: [{ brand:"Sally Hansen", product:"Miracle Gel", shade:"Terra-Coppa", price:"$7", hex:"#CC6633" }],
    [V]: [{ brand:"Zoya", product:"Nail Polish", shade:"Rocha", price:"$12", hex:"#B8001F" }],
    [S]: [{ brand:"Chanel", product:"Le Vernis", shade:"Rouge Essentiel", price:"$32", hex:"#8B4513" }],
  },
},
"Dark Autumn": {
  foundation: {
    [B]: [{ brand:"L'Oréal", product:"True Match", shade:"W7 Caramel Beige", price:"$12", hex:"#A07848" }],
    [V]: [{ brand:"Rare Beauty", product:"Liquid Touch Weightless Foundation", shade:"410W", price:"$30", hex:"#A07848" }],
    [S]: [{ brand:"Armani Beauty", product:"Luminous Silk Foundation", shade:"10", price:"$69", hex:"#A07848" }],
  },
  concealer: {
    [B]: [{ brand:"Maybelline", product:"Instant Age Rewind Eraser", shade:"Honey", price:"$10", hex:"#B49060" }],
    [V]: [{ brand:"Kosas", product:"Revealer Concealer", shade:"Tone 7 W", price:"$28", hex:"#B49060" }],
    [S]: [{ brand:"NARS", product:"Radiant Creamy Concealer", shade:"Cacao", price:"$32", hex:"#B49060" }],
  },
  lips: {
    [B]: [{ brand:"NYX", product:"Lip Lingerie XXL", shade:"Push'd Up", price:"$11", hex:"#9C6650" }],
    [V]: [{ brand:"MAC", product:"Matte Lipstick", shade:"Mocha", price:"$24", hex:"#9D5B47" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Matte Revolution Lipstick", shade:"Pillow Talk Medium", price:"$38", hex:"#B8908A" }],
  },
  lipLiner: {
    [B]: [{ brand:"NYX", product:"Slim Lip Pencil", shade:"Plum", price:"$4", hex:"#5A2020", pairsWith:"Complementary Lipstick" }],
    [V]: [{ brand:"Urban Decay", product:"24/7 Glide-On Lip Pencil", shade:"Venom", price:"$24", hex:"#4A1818" }],
    [S]: [{ brand:"MAC", product:"Lip Pencil", shade:"Nightmoth", price:"$24", hex:"#3A1010" }],
  },
  blush: {
    [B]: [{ brand:"e.l.f.", product:"Putty Blush", shade:"Tahiti", price:"$6", hex:"#B07050" }],
    [V]: [{ brand:"NARS", product:"Blush", shade:"Taj Mahal", price:"$36", hex:"#B8653A" }],
    [S]: [{ brand:"Patrick Ta", product:"Major Headlines Double-Take Crème & Powder Blush Duo", shade:"She's My Dream", price:"$42", hex:"#A06060" }],
  },
  eyes: {
    [B]: [{ brand:"e.l.f.", product:"Bite-Size Eyeshadow", shade:"Truffles", price:"$4", hex:"#6B4226" }],
    [V]: [{ brand:"Urban Decay", product:"Naked Cherry Palette", shade:"Bing", price:"$35", hex:"#6A4050" }],
    [S]: [{ brand:"Pat McGrath", product:"Mothership Eyeshadow Palette", shade:"Bronze Seduction", price:"$55", hex:"#8B7220" }],
  },
  bronzer: {
    [B]: [{ brand:"Physicians Formula", product:"Butter Bronzer", shade:"Deep", price:"$15", hex:"#906838" }],
    [V]: [{ brand:"Fenty Beauty", product:"Sun Stalk'r Instant Warmth Bronzer", shade:"Private Island", price:"$34", hex:"#805828" }],
    [S]: [{ brand:"NARS", product:"Laguna Bronzing Powder", shade:"Casino", price:"$42", hex:"#704820" }],
  },
  nails: {
    [B]: [{ brand:"Sally Hansen", product:"Miracle Gel", shade:"Rhapsody Red", price:"$7", hex:"#800020" }],
    [V]: [{ brand:"OPI", product:"Nail Lacquer", shade:"Malaga Wine", price:"$12", hex:"#5F1A27" }],
    [S]: [{ brand:"Chanel", product:"Le Vernis", shade:"Rouge Noir", price:"$32", hex:"#4A0E1F" }],
  },
},
"Dark Winter": {
  foundation: {
    [B]: [{ brand:"Maybelline", product:"Fit Me Matte + Poreless Foundation", shade:"355 Coconut", price:"$9", hex:"#956848" }],
    [V]: [{ brand:"Rare Beauty", product:"Liquid Touch Weightless Foundation", shade:"440C", price:"$30", hex:"#956848" }],
    [S]: [{ brand:"Armani Beauty", product:"Luminous Silk Foundation", shade:"11.5", price:"$69", hex:"#956848" }],
  },
  concealer: {
    [B]: [{ brand:"e.l.f.", product:"Hydrating Camo Concealer", shade:"Rich Chocolate", price:"$7", hex:"#A88060" }],
    [V]: [{ brand:"IT Cosmetics", product:"Bye Bye Under Eye Concealer", shade:"40.0 Deep", price:"$29", hex:"#A88060" }],
    [S]: [{ brand:"NARS", product:"Radiant Creamy Concealer", shade:"Amande", price:"$32", hex:"#A88060" }],
  },
  lips: {
    [B]: [{ brand:"NYX", product:"Soft Matte Lip Cream", shade:"Stockholm", price:"$8", hex:"#9D5B58" }],
    [V]: [{ brand:"MAC", product:"Matte Lipstick", shade:"Whirl", price:"$24", hex:"#A87574" }],
    [S]: [{ brand:"Pat McGrath", product:"MatteTrance Lipstick", shade:"Divine Rose II", price:"$40", hex:"#B07A75" }],
  },
  lipLiner: {
    [B]: [{ brand:"NYX", product:"Slim Lip Pencil", shade:"Cabaret", price:"$4", hex:"#5A1030", pairsWith:"Complementary Lipstick" }],
    [V]: [{ brand:"Urban Decay", product:"24/7 Glide-On Lip Pencil", shade:"Blackmail", price:"$24", hex:"#4A0828" }],
    [S]: [{ brand:"MAC", product:"Lip Pencil", shade:"Burgundy", price:"$24", hex:"#400020" }],
  },
  blush: {
    [B]: [{ brand:"Milani", product:"Baked Blush", shade:"Red Vino", price:"$9", hex:"#8B3A5A" }],
    [V]: [{ brand:"Milk Makeup", product:"Lip + Cheek", shade:"Rally", price:"$22", hex:"#7A2035" }],
    [S]: [{ brand:"NARS", product:"Blush", shade:"Seduction", price:"$36", hex:"#6B3060" }],
  },
  eyes: {
    [B]: [{ brand:"e.l.f.", product:"Bite-Size Eyeshadow", shade:"Midnight Oil", price:"$4", hex:"#191970" }],
    [V]: [{ brand:"Huda Beauty", product:"Smokey Obsessions Palette", shade:"Smoke", price:"$27", hex:"#3A3A4A" }],
    [S]: [{ brand:"Pat McGrath", product:"Mothership Eyeshadow Palette", shade:"Subversive", price:"$55", hex:"#36454F" }],
  },
  bronzer: {
    [B]: [{ brand:"Physicians Formula", product:"Butter Bronzer", shade:"Deep", price:"$15", hex:"#886040" }],
    [V]: [{ brand:"Fenty Beauty", product:"Sun Stalk'r Instant Warmth Bronzer", shade:"Mocha Mami", price:"$34", hex:"#785030" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Airbrush Bronzer", shade:"4 Deep", price:"$50", hex:"#684028" }],
  },
  nails: {
    [B]: [{ brand:"Sally Hansen", product:"Miracle Gel", shade:"Plum Luck", price:"$7", hex:"#400040" }],
    [V]: [{ brand:"OPI", product:"Nail Lacquer", shade:"Lincoln Park After Dark", price:"$12", hex:"#2A1030" }],
    [S]: [{ brand:"Chanel", product:"Le Vernis", shade:"Blue Satin", price:"$32", hex:"#191970" }],
  },
},
"True Winter": {
  foundation: {
    [B]: [{ brand:"L'Oréal", product:"True Match", shade:"C2 Natural Ivory", price:"$12", hex:"#E8CEC0" }],
    [V]: [{ brand:"Rare Beauty", product:"Liquid Touch Weightless Foundation", shade:"150C", price:"$30", hex:"#E8CEC0" }],
    [S]: [{ brand:"Armani Beauty", product:"Luminous Silk Foundation", shade:"3", price:"$69", hex:"#E8CEC0" }],
  },
  concealer: {
    [B]: [{ brand:"Maybelline", product:"Instant Age Rewind Eraser", shade:"Light/Pale", price:"$10", hex:"#F0DAD0" }],
    [V]: [{ brand:"Kosas", product:"Revealer Concealer", shade:"Tone 3 C", price:"$28", hex:"#F0DAD0" }],
    [S]: [{ brand:"NARS", product:"Radiant Creamy Concealer", shade:"Chantilly", price:"$32", hex:"#F0DAD0" }],
  },
  lips: {
    [B]: [{ brand:"NYX", product:"Soft Matte Lip Cream", shade:"Stockholm", price:"$8", hex:"#9D5B58" }],
    [V]: [{ brand:"Rare Beauty", product:"Soft Pinch Tinted Lip Oil", shade:"Believe", price:"$22", hex:"#A85066" }],
    [S]: [{ brand:"YSL", product:"Rouge Pur Couture", shade:"1 Le Rouge", price:"$45", hex:"#CC0000" }],
  },
  lipLiner: {
    [B]: [{ brand:"NYX", product:"Slim Lip Pencil", shade:"Cherry", price:"$4", hex:"#AA0000", pairsWith:"Complementary Lipstick" }],
    [V]: [{ brand:"Anastasia Beverly Hills", product:"Lip Liner", shade:"Rich Berry", price:"$22", hex:"#990033" }],
    [S]: [{ brand:"MAC", product:"Lip Pencil", shade:"Cherry", price:"$24", hex:"#880022" }],
  },
  blush: {
    [B]: [{ brand:"Milani", product:"Baked Blush", shade:"Fantastico Mauve", price:"$9", hex:"#A05F75" }],
    [V]: [{ brand:"NARS", product:"Blush", shade:"Exhibit A", price:"$36", hex:"#C73A3A" }],
    [S]: [{ brand:"Dior", product:"Rosy Glow Blush", shade:"047 Charnelle", price:"$42", hex:"#C71585" }],
  },
  eyes: {
    [B]: [{ brand:"e.l.f.", product:"Bite-Size Eyeshadow", shade:"Midnight Metals", price:"$4", hex:"#C0C0C0" }],
    [V]: [{ brand:"ColourPop", product:"Yes, Please! Palette", shade:"French Kiss", price:"$16", hex:"#6B2820" }],
    [S]: [{ brand:"Pat McGrath", product:"Mothership Eyeshadow Palette", shade:"Celestial Odyssey", price:"$55", hex:"#046307" }],
  },
  bronzer: {
    [B]: [{ brand:"e.l.f.", product:"Putty Bronzer", shade:"Feelin' Shady", price:"$7", hex:"#B8A098" }],
    [V]: [{ brand:"Tower 28", product:"BronzinoIlluminating Cream Bronzer", shade:"Capri", price:"$22", hex:"#A89088" }],
    [S]: [{ brand:"NARS", product:"Laguna Bronzing Powder", shade:"Laguna", price:"$42", hex:"#988078" }],
  },
  nails: {
    [B]: [{ brand:"Sally Hansen", product:"Miracle Gel", shade:"Off With Her Red", price:"$7", hex:"#FF0000" }],
    [V]: [{ brand:"Chanel", product:"Le Vernis", shade:"Pirate", price:"$32", hex:"#C8001F" }],
    [S]: [{ brand:"Dior", product:"Vernis Nail Lacquer", shade:"Rouge 999", price:"$32", hex:"#B8001F" }],
  },
},
"Bright Winter": {
  foundation: {
    [B]: [{ brand:"Maybelline", product:"Fit Me Matte + Poreless Foundation", shade:"118 Light Beige", price:"$9", hex:"#E5CCB8" }],
    [V]: [{ brand:"Rare Beauty", product:"Liquid Touch Weightless Foundation", shade:"160C", price:"$30", hex:"#E5CCB8" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Airbrush Flawless Foundation", shade:"3.5 Cool", price:"$48", hex:"#E5CCB8" }],
  },
  concealer: {
    [B]: [{ brand:"e.l.f.", product:"Hydrating Camo Concealer", shade:"Fair Beige", price:"$7", hex:"#F0DCC8" }],
    [V]: [{ brand:"NARS", product:"Radiant Creamy Concealer", shade:"Vanilla", price:"$32", hex:"#F0DCC8" }],
    [S]: [{ brand:"Fenty Beauty", product:"Pro Filt'r Instant Retouch Concealer", shade:"160", price:"$28", hex:"#F0DCC8" }],
  },
  lips: {
    [B]: [{ brand:"NYX", product:"Soft Matte Lip Cream", shade:"Antwerp", price:"$8", hex:"#A86870" }],
    [V]: [{ brand:"Rare Beauty", product:"Soft Pinch Tinted Lip Oil", shade:"Worth", price:"$22", hex:"#B7626E" }],
    [S]: [{ brand:"YSL", product:"Rouge Volupté Shine", shade:"86 Mauve Cuir", price:"$45", hex:"#A8516A" }],
  },
  lipLiner: {
    [B]: [{ brand:"NYX", product:"Slim Lip Pencil", shade:"Hot Red", price:"$4", hex:"#CC0066", pairsWith:"Complementary Lipstick" }],
    [V]: [{ brand:"Urban Decay", product:"24/7 Glide-On Lip Pencil", shade:"Bad Blood", price:"$24", hex:"#BB0055" }],
    [S]: [{ brand:"MAC", product:"Lip Pencil", shade:"Magenta", price:"$24", hex:"#AA0044" }],
  },
  blush: {
    [B]: [{ brand:"Milani", product:"Baked Blush", shade:"Dolce Pink", price:"$9", hex:"#FF69B4" }],
    [V]: [{ brand:"Rare Beauty", product:"Soft Pinch Liquid Blush", shade:"Bliss", price:"$23", hex:"#E06090" }],
    [S]: [{ brand:"Dior", product:"Rosy Glow Blush", shade:"001 Pink", price:"$42", hex:"#DA1884" }],
  },
  eyes: {
    [B]: [{ brand:"e.l.f.", product:"Bite-Size Eyeshadow", shade:"Cobalt", price:"$4", hex:"#1E90FF" }],
    [V]: [{ brand:"Huda Beauty", product:"Electric Obsessions Palette", shade:"Electric", price:"$27", hex:"#1E78CC" }],
    [S]: [{ brand:"Natasha Denona", product:"Mini Retro Eyeshadow Palette", shade:"Aqua", price:"$35", hex:"#00CED1" }],
  },
  bronzer: {
    [B]: [{ brand:"Physicians Formula", product:"Butter Bronzer", shade:"Light", price:"$15", hex:"#B09888" }],
    [V]: [{ brand:"Milk Makeup", product:"Matte Bronzer Stick", shade:"Baked", price:"$26", hex:"#A08878" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Airbrush Bronzer", shade:"2 Medium", price:"$50", hex:"#907868" }],
  },
  nails: {
    [B]: [{ brand:"Sally Hansen", product:"Miracle Gel", shade:"Pink Up the Pace", price:"$7", hex:"#FF1493" }],
    [V]: [{ brand:"Essie", product:"Nail Polish", shade:"Turquoise & Caicos", price:"$10", hex:"#30A8B8" }],
    [S]: [{ brand:"Dior", product:"Vernis Nail Lacquer", shade:"Lucky", price:"$32", hex:"#C71585" }],
  },
},
};

export function getProductRecommendations(seasonName) {
  const seasonProducts = productDB[seasonName];
  if (!seasonProducts) return { categories: [], tierMeta: TIER_META };
  const categories = CATEGORIES.map((cat) => ({
    ...cat,
    tiers: seasonProducts[cat.key] || null,
  })).filter((cat) => cat.tiers !== null);
  return { categories, tierMeta: TIER_META };
}

export { TIER_META, CATEGORIES };
