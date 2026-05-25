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
    [B]: [{ brand:"L'Oréal", product:"True Match", shade:"W4 Natural Beige", price:"$12", hex:"#D4A574", shopUrl:"https://go.shopmy.us/p-50960609", productImageUrl:"https://static.shopmy.us/pins/zoom-50960609-1775390748612-2602392" }],
    [V]: [{ brand:"Rare Beauty", product:"Liquid Touch Weightless Foundation", shade:"230W", price:"$30", hex:"#D4A574", shopUrl:"https://go.shopmy.us/p-50960629", productImageUrl:"https://static.shopmy.us/pins/zoom-50960629-1775390781797-Foundation-100W-SKU_dc8e5700-8cf9-4357-9ccb-57e0c580a3e1.jpg" }],
    [S]: [{ brand:"Armani Beauty", product:"Luminous Silk Foundation", shade:"6", price:"$69", hex:"#D4A574", shopUrl:"https://go.shopmy.us/p-50960661", productImageUrl:"https://static.shopmy.us/pins/zoom-50960661-1775390822210-16973019_fpx.tif" }],
  },
  concealer: {
    [B]: [{ brand:"Maybelline", product:"Instant Age Rewind Eraser", shade:"Warm Nude", price:"$10", hex:"#E0BB95", shopUrl:"https://go.shopmy.us/p-50960691", productImageUrl:"https://www.adorebeauty.com.au/pim_media/000/427/067/maybelline_instant_age_rewind_eye_eraser.png?1673848341" }],
    [V]: [{ brand:"NARS", product:"Radiant Creamy Concealer", shade:"Café Con Leche", price:"$32", hex:"#DDB892", shopUrl:"https://go.shopmy.us/p-50960746", productImageUrl:"https://static.shopmy.us/pins/zoom-50960746-1775390975192-variant_images-size-CafeconLecheL26-607845012252-1.jpg" }],
    [S]: [{ brand:"Tarte", product:"Shape Tape Concealer", shade:"34S Medium Sand", price:"$32", hex:"#DFB594", shopUrl:"https://www.amazon.com/s?k=NARS+Radiant+Creamy+Cafe+Con+Leche&tag=anishkanawa00-20" }],
  },
  lips: {
    [B]: [{ brand:"NYX", product:"Butter Gloss", shade:"Praline", price:"$6", hex:"#C47A5A", shopUrl:"https://go.shopmy.us/p-51070855", productImageUrl:"https://static.shopmy.us/pins/zoom-51070855-1775461046972-2254806" }],
    [V]: [{ brand:"Rare Beauty", product:"Soft Pinch Tinted Lip Oil", shade:"Joy", price:"$22", hex:"#E35335", shopUrl:"https://www.amazon.com/s?k=Rare+Beauty+Soft+Pinch+Liquid+Joy&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Matte Revolution Lipstick", shade:"Walk of Shame", price:"$38", hex:"#C44E3E", shopUrl:"https://www.amazon.com/s?k=Charlotte+Tilbury+Hot+Lips+2+JK+Magic&tag=anishkanawa00-20" }],
  },
  lipLiner: {
    [B]: [{ brand:"NYX", product:"Slim Lip Pencil", shade:"Natural", price:"$4", hex:"#C4795A", shopUrl:"https://www.amazon.com/s?k=e.l.f.+Lip+Liner+Natural&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Urban Decay", product:"24/7 Glide-On Lip Pencil", shade:"Naked", price:"$24", hex:"#B86B4A", shopUrl:"https://www.amazon.com/s?k=Patrick+Ta+Precision+Liner+She%27s+Confident&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Lip Cheat Lip Liner", shade:"Iconic Nude", price:"$26", hex:"#B57358", shopUrl:"https://go.shopmy.us/p-50960877", productImageUrl:"https://static.shopmy.us/uploads/pretty-prod-1755976146986" }],
  },
  blush: {
    [B]: [{ brand:"Milani", product:"Baked Blush", shade:"Luminoso", price:"$9", hex:"#E8896B", shopUrl:"https://go.shopmy.us/p-51071038", productImageUrl:"https://static.shopmy.us/pins/zoom-51071038-1775461684349-77003916" }],
    [V]: [{ brand:"Rare Beauty", product:"Soft Pinch Liquid Blush", shade:"Joy", price:"$23", hex:"#F08A7A", shopUrl:"https://go.shopmy.us/p-51070888", productImageUrl:"https://www.sephora.com/productimages/sku/s2518991-main-zoom.jpg?imwidth=2000&pb=allure-2022-bestofbeauty-badge" }],
    [S]: [{ brand:"NARS", product:"Blush", shade:"Orgasm", price:"$36", hex:"#F5A09E", shopUrl:"https://go.shopmy.us/p-50960966", productImageUrl:"https://static.shopmy.us/pins/zoom-50960966-1775391339150-0400021023583_777ORGASM" }],
  },
  eyes: {
    [B]: [{ brand:"e.l.f.", product:"Bite-Size Eyeshadow", shade:"Cream & Sugar", price:"$4", hex:"#CD7F32", shopUrl:"https://www.amazon.com/s?k=ColourPop+Super+Shock+Wisp&tag=anishkanawa00-20" }],
    [V]: [{ brand:"ColourPop", product:"Sweet Talk Palette", shade:"Meadow", price:"$16", hex:"#F05030", shopUrl:"https://www.amazon.com/s?k=Urban+Decay+24%2F7+Shadow+Mushroom&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Luxury Palette", shade:"Stars in Her Eyes", price:"$55", hex:"#C8973C", shopUrl:"https://www.amazon.com/s?k=Tom+Ford+Quad+Golden+Mink&tag=anishkanawa00-20" }],
  },
  bronzer: {
    [B]: [{ brand:"Physicians Formula", product:"Butter Bronzer", shade:"Light", price:"$15", hex:"#C4955A", shopUrl:"https://www.amazon.com/s?k=Wet+n+Wild+Color+Icon+Sunset+Striptease&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Milk Makeup", product:"Matte Bronzer Stick", shade:"Baked", price:"$26", hex:"#B08050", shopUrl:"https://www.amazon.com/s?k=Milk+Makeup+Matte+Bronzer+Baked&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Airbrush Bronzer", shade:"1 Fair", price:"$50", hex:"#A87040", shopUrl:"https://www.amazon.com/s?k=Charlotte+Tilbury+Filmstar+Bronze+Medium&tag=anishkanawa00-20" }],
  },
  nails: {
    [B]: [{ brand:"Sally Hansen", product:"Miracle Gel", shade:"Mango Dream", price:"$7", hex:"#FF7F50", shopUrl:"https://www.amazon.com/s?k=e.l.f.+Nail+Polish+Coral+Dream&tag=anishkanawa00-20" }],
    [V]: [{ brand:"OPI", product:"Nail Lacquer", shade:"Cajun Shrimp", price:"$12", hex:"#F26E44", shopUrl:"https://www.amazon.com/s?k=Glossier+Gel+Cream+Prickly+Pear&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Chanel", product:"Le Vernis", shade:"Coralium", price:"$32", hex:"#E35335", shopUrl:"https://www.amazon.com/s?k=Tom+Ford+Nail+Lacquer+Coral+Beach&tag=anishkanawa00-20" }],
  },
},
"True Spring": {
  foundation: {
    [B]: [{ brand:"Maybelline", product:"Fit Me Dewy + Smooth Foundation", shade:"220 Natural Beige", price:"$9", hex:"#D4A574", shopUrl:"https://go.shopmy.us/p-50961546", productImageUrl:"https://static.shopmy.us/pins/zoom-product-9424-1609254953985-2537808" }],
    [V]: [{ brand:"Glossier", product:"Skin Tint", shade:"G8", price:"$28", hex:"#D4A574", shopUrl:"https://go.shopmy.us/p-50961589", productImageUrl:"https://www.sephora.com/productimages/sku/s2649085-main-zoom.jpg?imwidth=2000" }],
    [S]: [{ brand:"Armani Beauty", product:"Luminous Silk Foundation", shade:"5.5", price:"$69", hex:"#D4A574", shopUrl:"https://go.shopmy.us/p-50961629", productImageUrl:"https://static.shopmy.us/pins/zoom-50961629-1775392046926-16973019_fpx.tif" }],
  },
  concealer: {
    [B]: [{ brand:"e.l.f.", product:"Hydrating Camo Concealer", shade:"Medium Sand", price:"$7", hex:"#DEBB95", shopUrl:"https://go.shopmy.us/p-51071224", productImageUrl:"https://cdn-fsly.yottaa.net/5a0c9b7632f01c35d42101b2/www.elfcosmetics.com/v~4b.a3/dw/image/v2/BBXC_PRD/on/demandware.static/-/Sites-elf-master/default/dw8bd27906/2020/84823_Open_A_R.jpg?sfrm=png&sw=425&q=90&yocs=1u_1y_1A_" }],
    [V]: [{ brand:"Kosas", product:"Revealer Concealer", shade:"Tone 5.5 W", price:"$28", hex:"#DEBB95", shopUrl:"https://www.amazon.com/s?k=Milk+Makeup+Future+Fluid+12&tag=anishkanawa00-20" }],
    [S]: [{ brand:"NARS", product:"Radiant Creamy Concealer", shade:"Honey", price:"$32", hex:"#DEBB95", shopUrl:"https://www.amazon.com/s?k=Pat+McGrath+Sublime+Perfection+LM12&tag=anishkanawa00-20" }],
  },
  lips: {
    [B]: [{ brand:"NYX", product:"Lip Lingerie XXL", shade:"Peach Flirt", price:"$11", hex:"#E8956A", shopUrl:"https://go.shopmy.us/p-50961807", productImageUrl:"https://static.shopmy.us/pins/zoom-50961807-1775392216089-19110511_fpx.tif" }],
    [V]: [{ brand:"NARS", product:"Afterglow Lip Balm", shade:"Orgasm", price:"$30", hex:"#F08563", shopUrl:"https://www.amazon.com/s?k=Rare+Beauty+Kind+Words+Gifted&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Matte Revolution Lipstick", shade:"Walk of Shame", price:"$38", hex:"#C44E3E", shopUrl:"https://go.shopmy.us/p-50961910", productImageUrl:"https://static.shopmy.us/pins/zoom-50961910-1775392339951-CTIL-WU118_V1.jpg" }],
  },
  lipLiner: {
    [B]: [{ brand:"NYX", product:"Slim Lip Pencil", shade:"Peekaboo Neutral", price:"$4", hex:"#C09070", shopUrl:"https://www.amazon.com/s?k=NYX+Suede+Matte+Sandstorm&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Anastasia Beverly Hills", product:"Lip Liner", shade:"Warm Taupe", price:"$22", hex:"#B07858", shopUrl:"https://www.amazon.com/s?k=Patrick+Ta+Precision+Liner+She%27s+Passionate&tag=anishkanawa00-20" }],
    [S]: [{ brand:"MAC", product:"Lip Pencil", shade:"Spice", price:"$24", hex:"#A06848", shopUrl:"https://go.shopmy.us/p-50961991", productImageUrl:"https://static.shopmy.us/pins/zoom-50961991-1775392420847-17027964_fpx.tif" }],
  },
  blush: {
    [B]: [{ brand:"Milani", product:"Baked Blush", shade:"Berry Amore", price:"$9", hex:"#E89078", shopUrl:"https://go.shopmy.us/p-51071245", productImageUrl:"https://static.shopmy.us/pins/zoom-51071245-1775462798662-77003916" }],
    [V]: [{ brand:"NARS", product:"Blush", shade:"Orgasm", price:"$36", hex:"#E28B7E", shopUrl:"https://go.shopmy.us/p-50962139", productImageUrl:"https://static.shopmy.us/pins/zoom-50962139-1775392547687-2621272" }],
    [S]: [{ brand:"Patrick Ta", product:"Major Headlines Double-Take Crème & Powder Blush Duo", shade:"She's Baby", price:"$42", hex:"#F4A460", shopUrl:"https://www.amazon.com/s?k=NARS+Blush+Torrid&tag=anishkanawa00-20" }],
  },
  eyes: {
    [B]: [{ brand:"e.l.f.", product:"Bite-Size Eyeshadow", shade:"Honey Drizzle", price:"$4", hex:"#E8B872", shopUrl:"https://www.amazon.com/s?k=Wet+n+Wild+Color+Icon+Comfort+Zone&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Urban Decay", product:"Naked Honey Palette", shade:"Honey", price:"$35", hex:"#C9982B", shopUrl:"https://www.amazon.com/s?k=Too+Faced+Shadow+Insurance+Gilded&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Natasha Denona", product:"Biba Eyeshadow Palette", shade:"Warm Gold", price:"$65", hex:"#E8C77A", shopUrl:"https://www.amazon.com/s?k=Charlotte+Tilbury+Eyes+to+Mesmerise+Jean&tag=anishkanawa00-20" }],
  },
  bronzer: {
    [B]: [{ brand:"e.l.f.", product:"Putty Bronzer", shade:"Tan Lines", price:"$7", hex:"#C08848", shopUrl:"https://go.shopmy.us/p-51071305", productImageUrl:"https://cdn-fsly.yottaa.net/5a0c9b7632f01c35d42101b2/www.elfcosmetics.com/v~4b.a3/dw/image/v2/BBXC_PRD/on/demandware.static/-/Sites-elf-master/default/dwc50b8e0c/2021/82782_FCBRZ_OpenA_R.jpg?sfrm=png&sw=425&q=90&yocs=1u_1y_1A_" }],
    [V]: [{ brand:"Tower 28", product:"BronzinoIlluminating Cream Bronzer", shade:"Capri", price:"$22", hex:"#B07A40", shopUrl:"https://www.amazon.com/s?k=Milk+Makeup+Matte+Bronzer+Baked&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Patrick Ta", product:"Major Glow Face Glow", shade:"She's Sun-Kissed", price:"$58", hex:"#A07038", shopUrl:"https://www.amazon.com/s?k=Tom+Ford+Soleil+Glow+Gold+Dust&tag=anishkanawa00-20" }],
  },
  nails: {
    [B]: [{ brand:"Sally Hansen", product:"Miracle Gel", shade:"Game of Chromes", price:"$7", hex:"#E8C547", shopUrl:"https://www.amazon.com/s?k=e.l.f.+Nail+Polish+Golden+Glow&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Olive & June", product:"Nail Polish", shade:"Stinson Sunset", price:"$9", hex:"#FF7F50", shopUrl:"https://www.amazon.com/s?k=Glossier+Gel+Cream+Fete&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Dior", product:"Vernis Nail Lacquer", shade:"Coral Pop", price:"$32", hex:"#E17055", shopUrl:"https://www.amazon.com/s?k=Tom+Ford+Nail+Lacquer+Coral+Sand&tag=anishkanawa00-20" }],
  },
},
"Light Spring": {
  foundation: {
    [B]: [{ brand:"L'Oréal", product:"True Match", shade:"W2 Light Ivory", price:"$12", hex:"#F0D5B8", shopUrl:"https://go.shopmy.us/p-50962725", productImageUrl:"https://static.shopmy.us/pins/zoom-50962725-1775393044399-2602392" }],
    [V]: [{ brand:"Glossier", product:"Skin Tint", shade:"G5", price:"$28", hex:"#F0D5B8", shopUrl:"https://go.shopmy.us/p-50962789", productImageUrl:"https://www.sephora.com/productimages/sku/s2649085-main-zoom.jpg?imwidth=2000" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Airbrush Flawless Foundation", shade:"3.5 Warm", price:"$48", hex:"#F0D5B8", shopUrl:"https://www.amazon.com/s?k=Armani+Beauty+Luminous+Silk+3.5&tag=anishkanawa00-20" }],
  },
  concealer: {
    [B]: [{ brand:"Maybelline", product:"Instant Age Rewind Eraser", shade:"Fair", price:"$10", hex:"#F5E0CC", shopUrl:"https://go.shopmy.us/p-50962985", productImageUrl:"https://www.adorebeauty.com.au/pim_media/000/427/067/maybelline_instant_age_rewind_eye_eraser.png?1673848341" }],
    [V]: [{ brand:"IT Cosmetics", product:"Bye Bye Under Eye Concealer", shade:"11.5 Light", price:"$29", hex:"#F5E0CC", shopUrl:"https://www.amazon.com/s?k=Too+Faced+Born+This+Way+Swan&tag=anishkanawa00-20" }],
    [S]: [{ brand:"NARS", product:"Radiant Creamy Concealer", shade:"Chantilly", price:"$32", hex:"#F5E0CC", shopUrl:"https://go.shopmy.us/p-50963197", productImageUrl:"https://static.shopmy.us/pins/zoom-50963197-1775393425297-variant_images-size-CafeconLecheL26-607845012252-1.jpg" }],
  },
  lips: {
    [B]: [{ brand:"e.l.f.", product:"Glossy Lip Stain", shade:"Pinkies Up", price:"$5", hex:"#E8A0A8", shopUrl:"https://www.amazon.com/s?k=NYX+Butter+Gloss+Creme+Brulee&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Rare Beauty", product:"Kind Words Matte Lipstick", shade:"Lively", price:"$22", hex:"#E8A0A8", shopUrl:"https://go.shopmy.us/p-50963364", productImageUrl:"https://static.shopmy.us/pins/zoom-50963364-1775393591932-kind-words-matte-lipstick-talented.jpg" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Matte Revolution Lipstick", shade:"Pillow Talk Original", price:"$38", hex:"#C88D87", shopUrl:"https://go.shopmy.us/p-50963418", productImageUrl:"https://static.shopmy.us/pins/zoom-50963418-1775393672281-Bridal_First_Dance_Packshot_Open.png" }],
  },
  lipLiner: {
    [B]: [{ brand:"NYX", product:"Slim Lip Pencil", shade:"Pink Nude", price:"$4", hex:"#D4A09A", shopUrl:"https://www.amazon.com/s?k=e.l.f.+Lip+Liner+Blush&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Urban Decay", product:"24/7 Glide-On Lip Pencil", shade:"Naked 2", price:"$24", hex:"#C49088", shopUrl:"https://www.amazon.com/s?k=Patrick+Ta+Precision+Liner+She%27s+Gentle&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Lip Cheat Lip Liner", shade:"Pillow Talk", price:"$26", hex:"#B88080", shopUrl:"https://go.shopmy.us/p-50963615", productImageUrl:"https://static.shopmy.us/uploads/pretty-prod-1755976146986" }],
  },
  blush: {
    [B]: [{ brand:"e.l.f.", product:"Putty Blush", shade:"Bora Bora", price:"$6", hex:"#F2B598", shopUrl:"https://www.amazon.com/s?k=Milani+Baked+Blush+Dolce+Pink&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Glossier", product:"Cloud Paint", shade:"Beam", price:"$22", hex:"#F5B095", shopUrl:"https://go.shopmy.us/p-50963782", productImageUrl:"https://www.sephora.com/productimages/sku/s2649358-main-zoom.jpg?imwidth=2000" }],
    [S]: [{ brand:"NARS", product:"Blush", shade:"Sex Appeal", price:"$36", hex:"#F5C1B0", shopUrl:"https://go.shopmy.us/p-50963868", productImageUrl:"https://www.sephora.com/productimages/sku/s2756062-main-zoom.jpg?imwidth=2000&pb=allure-2024-bestofbeauty" }],
  },
  eyes: {
    [B]: [{ brand:"e.l.f.", product:"Bite-Size Eyeshadow", shade:"Creme Brulee", price:"$4", hex:"#F3E5AB", shopUrl:"https://www.amazon.com/s?k=ColourPop+Super+Shock+Frog&tag=anishkanawa00-20" }],
    [V]: [{ brand:"ColourPop", product:"Sweet Talk Palette", shade:"Catch Me", price:"$16", hex:"#F5C8A8", shopUrl:"https://www.amazon.com/s?k=Urban+Decay+Moondust+Space+Cowboy&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Luxury Palette", shade:"Pillow Talk", price:"$55", hex:"#E8B898", shopUrl:"https://www.amazon.com/s?k=Tom+Ford+Quad+Nude+Dip&tag=anishkanawa00-20" }],
  },
  bronzer: {
    [B]: [{ brand:"Physicians Formula", product:"Butter Bronzer", shade:"Light", price:"$15", hex:"#E8C8A0", shopUrl:"https://www.amazon.com/s?k=Wet+n+Wild+Color+Icon+Reserve+Your+Cabana&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Tower 28", product:"BronzinoIlluminating Cream Bronzer", shade:"Santorini", price:"$22", hex:"#D0AA80", shopUrl:"https://www.amazon.com/s?k=Milk+Makeup+Matte+Bronzer+Light&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Airbrush Bronzer", shade:"1 Fair", price:"$50", hex:"#C49A70", shopUrl:"https://www.amazon.com/s?k=Charlotte+Tilbury+Filmstar+Bronze+Fair&tag=anishkanawa00-20" }],
  },
  nails: {
    [B]: [{ brand:"Sally Hansen", product:"Miracle Gel", shade:"Pink Up the Pace", price:"$7", hex:"#FFB6C1", shopUrl:"https://www.amazon.com/s?k=e.l.f.+Nail+Polish+Petal+Pink&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Essie", product:"Nail Polish", shade:"Fiji", price:"$10", hex:"#F5C6C8", shopUrl:"https://www.amazon.com/s?k=Glossier+Gel+Cream+Hollyberry&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Dior", product:"Vernis Nail Lacquer", shade:"Rose Porcelaine", price:"$32", hex:"#F2D2CF", shopUrl:"https://www.amazon.com/s?k=Tom+Ford+Nail+Lacquer+Pink+Crush&tag=anishkanawa00-20" }],
  },
},
"Light Summer": {
  foundation: {
    [B]: [{ brand:"L'Oréal", product:"True Match", shade:"C1 Alabaster", price:"$12", hex:"#F0DAD0", shopUrl:"https://go.shopmy.us/p-51031348", productImageUrl:"https://static.shopmy.us/pins/zoom-51031348-1775432681563-2602392" }],
    [V]: [{ brand:"Glossier", product:"Skin Tint", shade:"G4", price:"$28", hex:"#F0DAD0", shopUrl:"https://go.shopmy.us/p-51031461", productImageUrl:"https://www.sephora.com/productimages/sku/s2649085-main-zoom.jpg?imwidth=2000" }],
    [S]: [{ brand:"Armani Beauty", product:"Luminous Silk Foundation", shade:"2", price:"$69", hex:"#F0DAD0", shopUrl:"https://go.shopmy.us/p-51031569", productImageUrl:"https://static.shopmy.us/pins/zoom-51031569-1775432816481-16973019_fpx.tif" }],
  },
  concealer: {
    [B]: [{ brand:"Maybelline", product:"Instant Age Rewind Eraser", shade:"Brightener", price:"$10", hex:"#F8E8DC", shopUrl:"https://go.shopmy.us/p-51037295", productImageUrl:"https://www.adorebeauty.com.au/pim_media/000/427/067/maybelline_instant_age_rewind_eye_eraser.png?1673848341" }],
    [V]: [{ brand:"Kosas", product:"Revealer Concealer", shade:"Tone 2 C", price:"$28", hex:"#F8E8DC", shopUrl:"https://www.amazon.com/s?k=Too+Faced+Born+This+Way+Cloud&tag=anishkanawa00-20" }],
    [S]: [{ brand:"NARS", product:"Radiant Creamy Concealer", shade:"Vanilla", price:"$32", hex:"#F8E8DC", shopUrl:"https://go.shopmy.us/p-51037451", productImageUrl:"https://static.shopmy.us/pins/zoom-51037451-1775435969360-variant_images-size-CafeconLecheL26-607845012252-1.jpg" }],
  },
  lips: {
    [B]: [{ brand:"NYX", product:"Butter Gloss", shade:"Tiramisu", price:"$6", hex:"#E8A5A8", shopUrl:"https://go.shopmy.us/p-51037526", productImageUrl:"https://static.shopmy.us/pins/zoom-51037526-1775435994439-nyx-buttergloss-cherrycheesecake-swatch-large.jpeg" }],
    [V]: [{ brand:"MAC", product:"Cremesheen Lipstick", shade:"Creme Cup", price:"$24", hex:"#E8A5A8", shopUrl:"https://www.amazon.com/s?k=Rare+Beauty+Kind+Words+Lovely&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Dior", product:"Rouge Dior", shade:"458 Paris", price:"$45", hex:"#E8B4D0", shopUrl:"https://www.amazon.com/s?k=Charlotte+Tilbury+Lip+Lustre+Sweet+Stiletto&tag=anishkanawa00-20" }],
  },
  lipLiner: {
    [B]: [{ brand:"e.l.f.", product:"Lip Liner Pencil", shade:"Pink", price:"$3", hex:"#D0A0B0", shopUrl:"https://www.amazon.com/s?k=e.l.f.+Lip+Liner+Pink&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Urban Decay", product:"24/7 Glide-On Lip Pencil", shade:"Naked 3", price:"$24", hex:"#C090A0", shopUrl:"https://www.amazon.com/s?k=Patrick+Ta+Precision+Liner+She%27s+Delicate&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Lip Cheat Lip Liner", shade:"Pillow Talk", price:"$26", hex:"#B08890", shopUrl:"https://go.shopmy.us/p-51037764", productImageUrl:"https://static.shopmy.us/pins/zoom-51037764-1775436094508-variant_images-size-IconicNude-5056446619219-1.jpg" }],
  },
  blush: {
    [B]: [{ brand:"Milani", product:"Baked Blush", shade:"Dolce Pink", price:"$9", hex:"#F0C0D0", shopUrl:"https://go.shopmy.us/p-51037815", productImageUrl:"https://static.shopmy.us/pins/zoom-51037815-1775436118348-10270967" }],
    [V]: [{ brand:"Glossier", product:"Cloud Paint", shade:"Puff", price:"$22", hex:"#F2B5C0", shopUrl:"https://www.amazon.com/s?k=Glossier+Cloud+Paint+Puff&tag=anishkanawa00-20" }],
    [S]: [{ brand:"NARS", product:"Blush", shade:"Sex Appeal", price:"$36", hex:"#F7CAC9", shopUrl:"https://go.shopmy.us/p-51037968", productImageUrl:"https://static.shopmy.us/pins/zoom-51037968-1775436184896-variant_images-size-CatchMe-194251171661-1.jpg" }],
  },
  eyes: {
    [B]: [{ brand:"e.l.f.", product:"Bite-Size Eyeshadow", shade:"Rose Water", price:"$4", hex:"#E5C3C8", shopUrl:"https://www.amazon.com/s?k=Wet+n+Wild+Color+Icon+Petalette&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Urban Decay", product:"Naked3 Mini Palette", shade:"Strange", price:"$29", hex:"#E0C8C8", shopUrl:"https://www.amazon.com/s?k=Urban+Decay+Moondust+Cosmic&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Natasha Denona", product:"Mini Nude Eyeshadow Palette", shade:"Nude", price:"$35", hex:"#C8C8D0", shopUrl:"https://www.amazon.com/s?k=Tom+Ford+Quad+Silvered+Topaz&tag=anishkanawa00-20" }],
  },
  bronzer: {
    [B]: [{ brand:"e.l.f.", product:"Putty Bronzer", shade:"Tan Lines", price:"$7", hex:"#D4B8A0", shopUrl:"https://go.shopmy.us/p-51038235", productImageUrl:"https://static.shopmy.us/pins/zoom-51038235-1775436307875-ELFC0120F_8.jpg" }],
    [V]: [{ brand:"Tower 28", product:"BronzinoIlluminating Cream Bronzer", shade:"Capri", price:"$22", hex:"#C4A890", shopUrl:"https://www.amazon.com/s?k=Milk+Makeup+Matte+Bronzer+Light&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Airbrush Bronzer", shade:"1 Fair", price:"$50", hex:"#B49880", shopUrl:"https://www.amazon.com/s?k=Charlotte+Tilbury+Filmstar+Bronze+Fair&tag=anishkanawa00-20" }],
  },
  nails: {
    [B]: [{ brand:"Sally Hansen", product:"Miracle Gel", shade:"Lavender Fields", price:"$7", hex:"#E0BBE4", shopUrl:"https://www.amazon.com/s?k=e.l.f.+Nail+Polish+Light+Lilac&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Chanel", product:"Le Vernis", shade:"Ballerina", price:"$32", hex:"#F5D8D8", shopUrl:"https://www.amazon.com/s?k=Glossier+Gel+Cream+Iris&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Dior", product:"Vernis Nail Lacquer", shade:"Incognito", price:"$32", hex:"#F7CAC9", shopUrl:"https://www.amazon.com/s?k=Tom+Ford+Nail+Lacquer+Sugar+Dune&tag=anishkanawa00-20" }],
  },
},
"True Summer": {
  foundation: {
    [B]: [{ brand:"Maybelline", product:"Fit Me Matte + Poreless Foundation", shade:"120 Classic Ivory", price:"$9", hex:"#E0C4B5", shopUrl:"https://go.shopmy.us/p-51028993", productImageUrl:"https://static.shopmy.us/pins/pin-51028993-1775449248098-2510202" }],
    [V]: [{ brand:"Rare Beauty", product:"Liquid Touch Weightless Foundation", shade:"170C", price:"$30", hex:"#E0C4B5", shopUrl:"https://go.shopmy.us/p-51029093", productImageUrl:"https://static.shopmy.us/pins/zoom-51029093-1775431472236-Foundation-100W-SKU_dc8e5700-8cf9-4357-9ccb-57e0c580a3e1.jpg" }],
    [S]: [{ brand:"Armani Beauty", product:"Luminous Silk Foundation", shade:"4", price:"$69", hex:"#E0C4B5", shopUrl:"https://go.shopmy.us/p-51029186", productImageUrl:"https://static.shopmy.us/pins/zoom-51029186-1775431530419-16973019_fpx.tif" }],
  },
  concealer: {
    [B]: [{ brand:"e.l.f.", product:"Hydrating Camo Concealer", shade:"Light Ivory", price:"$7", hex:"#EAD4C5", shopUrl:"https://go.shopmy.us/p-51029297", productImageUrl:"https://static.shopmy.us/pins/pin-51029297-1775449370643-2558521" }],
    [V]: [{ brand:"NARS", product:"Soft Matte Complete Concealer", shade:"Custard", price:"$32", hex:"#EAD4C5", shopUrl:"https://www.amazon.com/s?k=Too+Faced+Born+This+Way+Porcelain&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Fenty Beauty", product:"Pro Filt'r Instant Retouch Concealer", shade:"170", price:"$28", hex:"#EAD4C5", shopUrl:"https://www.amazon.com/s?k=Pat+McGrath+Sublime+Perfection+L5&tag=anishkanawa00-20" }],
  },
  lips: {
    [B]: [{ brand:"NYX", product:"Soft Matte Lip Cream", shade:"Milan", price:"$8", hex:"#B07572", shopUrl:"https://www.amazon.com/s?k=NYX+Butter+Gloss+Angel+Food+Cake&tag=anishkanawa00-20" }],
    [V]: [{ brand:"MAC", product:"Satin Lipstick", shade:"Twig", price:"$24", hex:"#9E6F6B", shopUrl:"https://www.amazon.com/s?k=Rare+Beauty+Soft+Pinch+Liquid+Happy&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Pat McGrath", product:"MatteTrance Lipstick", shade:"Elson", price:"$40", hex:"#8B3A62", shopUrl:"https://www.amazon.com/s?k=Charlotte+Tilbury+Matte+Revolution+Very+Victoria&tag=anishkanawa00-20" }],
  },
  lipLiner: {
    [B]: [{ brand:"NYX", product:"Slim Lip Pencil", shade:"Mauve", price:"$4", hex:"#A07080", shopUrl:"https://www.amazon.com/s?k=NYX+Suede+Matte+Tea+%26+Cookies&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Anastasia Beverly Hills", product:"Lip Liner", shade:"Dusty Rose", price:"$22", hex:"#904868", shopUrl:"https://www.amazon.com/s?k=Patrick+Ta+Precision+Liner+She%27s+Poised&tag=anishkanawa00-20" }],
    [S]: [{ brand:"MAC", product:"Lip Pencil", shade:"Whirl", price:"$24", hex:"#885060", shopUrl:"https://go.shopmy.us/p-51030005", productImageUrl:"https://static.shopmy.us/pins/zoom-51030005-1775431960484-17027964_fpx.tif" }],
  },
  blush: {
    [B]: [{ brand:"e.l.f.", product:"Putty Blush", shade:"Berry Smoothie", price:"$6", hex:"#E8A0B4", shopUrl:"https://www.amazon.com/s?k=Milani+Baked+Blush+Bella+Rosa&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Rare Beauty", product:"Soft Pinch Liquid Blush", shade:"Happy", price:"$23", hex:"#D46988", shopUrl:"https://go.shopmy.us/p-51029640", productImageUrl:"https://static.shopmy.us/pins/pin-51029640-1775449547762-s2640258-main-zoom.jpg" }],
    [S]: [{ brand:"NARS", product:"Blush", shade:"Impassioned", price:"$36", hex:"#C08090", shopUrl:"https://go.shopmy.us/p-51030276", productImageUrl:"https://static.shopmy.us/pins/zoom-51030276-1775432130542-variant_images-size-CatchMe-194251171661-1.jpg" }],
  },
  eyes: {
    [B]: [{ brand:"e.l.f.", product:"Bite-Size Eyeshadow", shade:"Mauve Bar", price:"$4", hex:"#9A8B80", shopUrl:"https://www.amazon.com/s?k=ColourPop+Super+Shock+Amaze&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Urban Decay", product:"Naked3 Mini Palette", shade:"Limit", price:"$29", hex:"#B28E90", shopUrl:"https://www.amazon.com/s?k=Urban+Decay+24%2F7+Shadow+Tease&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Natasha Denona", product:"Mini Retro Eyeshadow Palette", shade:"Rose", price:"$35", hex:"#C4B0D4", shopUrl:"https://www.amazon.com/s?k=Tom+Ford+Quad+Seductive+Rose&tag=anishkanawa00-20" }],
  },
  bronzer: {
    [B]: [{ brand:"Physicians Formula", product:"Butter Bronzer", shade:"Light", price:"$15", hex:"#B09888", shopUrl:"https://www.amazon.com/s?k=Wet+n+Wild+Color+Icon+Dulce+De+Leche&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Milk Makeup", product:"Matte Bronzer Stick", shade:"Blaze", price:"$26", hex:"#A08878", shopUrl:"https://www.amazon.com/s?k=Milk+Makeup+Matte+Bronzer+Light&tag=anishkanawa00-20" }],
    [S]: [{ brand:"NARS", product:"Laguna Bronzing Powder", shade:"Laguna", price:"$42", hex:"#907868", shopUrl:"https://www.amazon.com/s?k=Charlotte+Tilbury+Filmstar+Bronze+Light%2FMedium&tag=anishkanawa00-20" }],
  },
  nails: {
    [B]: [{ brand:"Sally Hansen", product:"Miracle Gel", shade:"Pink Up the Pace", price:"$7", hex:"#D88098", shopUrl:"https://www.amazon.com/s?k=e.l.f.+Nail+Polish+Berry+Nice&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Essie", product:"Nail Polish", shade:"Bikini So Teeny", price:"$10", hex:"#8CA8D8", shopUrl:"https://www.amazon.com/s?k=Glossier+Gel+Cream+Petal&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Chanel", product:"Le Vernis", shade:"Rose Confidentiel", price:"$32", hex:"#B87585", shopUrl:"https://www.amazon.com/s?k=Tom+Ford+Nail+Lacquer+Indian+Pink&tag=anishkanawa00-20" }],
  },
},
"Soft Summer": {
  foundation: {
    [B]: [{ brand:"L'Oréal", product:"True Match", shade:"C3 Creamy Natural", price:"$12", hex:"#D5B5A0", shopUrl:"https://go.shopmy.us/p-51025780", productImageUrl:"https://static.shopmy.us/pins/zoom-51025780-1775429880522-2602392" }],
    [V]: [{ brand:"Rare Beauty", product:"Liquid Touch Weightless Foundation", shade:"210C", price:"$30", hex:"#D5B5A0", shopUrl:"https://go.shopmy.us/p-51025966", productImageUrl:"https://static.shopmy.us/pins/zoom-51025966-1775429970327-Foundation-100W-SKU_dc8e5700-8cf9-4357-9ccb-57e0c580a3e1.jpg" }],
    [S]: [{ brand:"Armani Beauty", product:"Luminous Silk Foundation", shade:"4.5", price:"$69", hex:"#D5B5A0", shopUrl:"https://go.shopmy.us/p-51026077", productImageUrl:"https://static.shopmy.us/pins/zoom-51026077-1775430026750-16973019_fpx.tif" }],
  },
  concealer: {
    [B]: [{ brand:"Maybelline", product:"Instant Age Rewind Eraser", shade:"Neutralizer", price:"$10", hex:"#E0C8B8", shopUrl:"https://go.shopmy.us/p-51026213", productImageUrl:"https://static.shopmy.us/pins/zoom-51026213-1775430075401-2529471" }],
    [V]: [{ brand:"IT Cosmetics", product:"Bye Bye Under Eye Concealer", shade:"21.0 Medium", price:"$29", hex:"#E0C8B8", shopUrl:"https://www.amazon.com/s?k=Too+Faced+Born+This+Way+Natural+Beige&tag=anishkanawa00-20" }],
    [S]: [{ brand:"NARS", product:"Radiant Creamy Concealer", shade:"Custard", price:"$32", hex:"#E0C8B8", shopUrl:"https://go.shopmy.us/p-51026468", productImageUrl:"https://static.shopmy.us/pins/zoom-51026468-1775430175374-variant_images-size-CafeconLecheL26-607845012252-1.jpg" }],
  },
  lips: {
    [B]: [{ brand:"NYX", product:"Soft Matte Lip Cream", shade:"Cannes", price:"$8", hex:"#C9929D", shopUrl:"https://www.amazon.com/s?k=NYX+Lip+Lingerie+Embellishment&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Rare Beauty", product:"Kind Words Matte Lipstick", shade:"Humble", price:"$22", hex:"#A86A6E", shopUrl:"https://go.shopmy.us/p-51026683", productImageUrl:"https://static.shopmy.us/pins/zoom-51026683-1775430273308-kind-words-matte-lipstick-talented.jpg" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Matte Revolution Lipstick", shade:"Pillow Talk Medium", price:"$38", hex:"#B8908A", shopUrl:"https://go.shopmy.us/p-51026772", productImageUrl:"https://static.shopmy.us/pins/zoom-51026772-1775430320435-CTIL-WU118_V1.jpg" }],
  },
  lipLiner: {
    [B]: [{ brand:"e.l.f.", product:"Lip Liner Pencil", shade:"Berry", price:"$3", hex:"#A08888", shopUrl:"https://www.amazon.com/s?k=NYX+Suede+Matte+Lavender+%26+Lace&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Urban Decay", product:"24/7 Glide-On Lip Pencil", shade:"Rock Steady", price:"$24", hex:"#9A7880", shopUrl:"https://go.shopmy.us/p-51027818", productImageUrl:"https://static.shopmy.us/pins/zoom-51027818-1775430793921-13029075-1934876754153466.jpg" }],
    [S]: [{ brand:"MAC", product:"Lip Pencil", shade:"Soar", price:"$24", hex:"#A07078", shopUrl:"https://go.shopmy.us/p-51027142", productImageUrl:"https://static.shopmy.us/pins/zoom-51027142-1775430494419-17027964_fpx.tif" }],
  },
  blush: {
    [B]: [{ brand:"Milani", product:"Baked Blush", shade:"Rosa Romantica", price:"$9", hex:"#D4A0B0", shopUrl:"https://go.shopmy.us/p-51027272", productImageUrl:"https://static.shopmy.us/pins/zoom-51027272-1775430545810-10270967" }],
    [V]: [{ brand:"Glossier", product:"Cloud Paint", shade:"Dusk", price:"$22", hex:"#B88078", shopUrl:"https://go.shopmy.us/p-51027413", productImageUrl:"https://static.shopmy.us/pins/zoom-51027413-1775430601841-glossier-cloud-paint-beam-carousel-01.png" }],
    [S]: [{ brand:"NARS", product:"Blush", shade:"Douceur", price:"$36", hex:"#CCADA0", shopUrl:"https://go.shopmy.us/p-51027526", productImageUrl:"https://static.shopmy.us/pins/zoom-51027526-1775430653382-variant_images-size-CatchMe-194251171661-1.jpg" }],
  },
  eyes: {
    [B]: [{ brand:"e.l.f.", product:"Bite-Size Eyeshadow", shade:"Mauve Bar", price:"$4", hex:"#B0A0B0", shopUrl:"https://www.amazon.com/s?k=Wet+n+Wild+Color+Icon+Walking+on+Eggshells&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Huda Beauty", product:"Mauve Obsessions Palette", shade:"Mauve", price:"$27", hex:"#A08088", shopUrl:"https://www.amazon.com/s?k=Urban+Decay+24%2F7+Shadow+Fog&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Natasha Denona", product:"Mini Retro Eyeshadow Palette", shade:"Dusk", price:"$35", hex:"#8B7B8B", shopUrl:"https://www.amazon.com/s?k=Tom+Ford+Quad+Orchid+Haze&tag=anishkanawa00-20" }],
  },
  bronzer: {
    [B]: [{ brand:"e.l.f.", product:"Putty Bronzer", shade:"Feelin' Shady", price:"$7", hex:"#B8A088", shopUrl:"https://go.shopmy.us/p-51027977", productImageUrl:"https://static.shopmy.us/pins/zoom-51027977-1775430897431-ELFC0120F_8.jpg" }],
    [V]: [{ brand:"Milk Makeup", product:"Matte Bronzer Stick", shade:"Blaze", price:"$26", hex:"#A89078", shopUrl:"https://www.amazon.com/s?k=Milk+Makeup+Matte+Bronzer+Baked&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Airbrush Bronzer", shade:"2 Medium", price:"$50", hex:"#988068", shopUrl:"https://www.amazon.com/s?k=Charlotte+Tilbury+Filmstar+Bronze+Fair%2FMedium&tag=anishkanawa00-20" }],
  },
  nails: {
    [B]: [{ brand:"Sally Hansen", product:"Miracle Gel", shade:"Mauve-lous", price:"$7", hex:"#C9929D", shopUrl:"https://www.amazon.com/s?k=e.l.f.+Nail+Polish+Dusty+Rose&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Chanel", product:"Le Vernis", shade:"Particulière", price:"$32", hex:"#B8A090", shopUrl:"https://www.amazon.com/s?k=Glossier+Gel+Cream+Lavender&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Dior", product:"Vernis Nail Lacquer", shade:"Grège", price:"$32", hex:"#A09088", shopUrl:"https://www.amazon.com/s?k=Tom+Ford+Nail+Lacquer+Mink+Brulee&tag=anishkanawa00-20" }],
  },
},
"Soft Autumn": {
  foundation: {
    [B]: [{ brand:"L'Oréal", product:"True Match", shade:"W4.5 Fresh Beige", price:"$12", hex:"#CCAA88", shopUrl:"https://go.shopmy.us/p-51067544", productImageUrl:"https://static.shopmy.us/pins/zoom-51067544-1775454891032-2602392" }],
    [V]: [{ brand:"Rare Beauty", product:"Liquid Touch Weightless Foundation", shade:"270W", price:"$30", hex:"#CCAA88", shopUrl:"https://go.shopmy.us/p-51038995", productImageUrl:"https://static.shopmy.us/pins/zoom-51038995-1775436617499-Foundation-100W-SKU_dc8e5700-8cf9-4357-9ccb-57e0c580a3e1.jpg" }],
    [S]: [{ brand:"Armani Beauty", product:"Luminous Silk Foundation", shade:"6.5", price:"$69", hex:"#CCAA88", shopUrl:"https://go.shopmy.us/p-51039067", productImageUrl:"https://static.shopmy.us/pins/zoom-51039067-1775436650904-16973019_fpx.tif" }],
  },
  concealer: {
    [B]: [{ brand:"e.l.f.", product:"Hydrating Camo Concealer", shade:"Medium Warm", price:"$7", hex:"#DABB9A", shopUrl:"https://go.shopmy.us/p-51067706", productImageUrl:"https://static.shopmy.us/pins/zoom-51067706-1775455156195-GUEST_78dfe1d0-f448-4dbd-8b17-98b37c7c6073" }],
    [V]: [{ brand:"Kosas", product:"Revealer Concealer", shade:"Tone 6 W", price:"$28", hex:"#DABB9A", shopUrl:"https://www.amazon.com/s?k=Milk+Makeup+Future+Fluid+14&tag=anishkanawa00-20" }],
    [S]: [{ brand:"NARS", product:"Radiant Creamy Concealer", shade:"Caramel", price:"$32", hex:"#DABB9A", shopUrl:"https://www.amazon.com/s?k=Pat+McGrath+Sublime+Perfection+LM15&tag=anishkanawa00-20" }],
  },
  lips: {
    [B]: [{ brand:"NYX", product:"Soft Matte Lip Cream", shade:"Istanbul", price:"$8", hex:"#C4A882", shopUrl:"https://www.amazon.com/s?k=NYX+Lip+Lingerie+Bedtime+Flirt&tag=anishkanawa00-20" }],
    [V]: [{ brand:"MAC", product:"Matte Lipstick", shade:"Velvet Teddy", price:"$24", hex:"#B07865", shopUrl:"https://www.amazon.com/s?k=Rare+Beauty+Kind+Words+Humble&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Matte Revolution Lipstick", shade:"Pillow Talk Medium", price:"$38", hex:"#B8908A", shopUrl:"https://www.amazon.com/s?k=Charlotte+Tilbury+Pillow+Talk+Medium&tag=anishkanawa00-20" }],
  },
  lipLiner: {
    [B]: [{ brand:"NYX", product:"Slim Lip Pencil", shade:"Cappuccino", price:"$4", hex:"#A08870", shopUrl:"https://www.amazon.com/s?k=NYX+Suede+Matte+Soft-Spoken&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Anastasia Beverly Hills", product:"Lip Liner", shade:"Warm Taupe", price:"$22", hex:"#907858", shopUrl:"https://www.amazon.com/s?k=Patrick+Ta+Precision+Liner+She%27s+Subtle&tag=anishkanawa00-20" }],
    [S]: [{ brand:"MAC", product:"Lip Pencil", shade:"Stripdown", price:"$24", hex:"#886848", shopUrl:"https://go.shopmy.us/p-51039750", productImageUrl:"https://static.shopmy.us/pins/zoom-51039750-1775436937468-17027964_fpx.tif" }],
  },
  blush: {
    [B]: [{ brand:"Milani", product:"Baked Blush", shade:"Rose D'Oro", price:"$9", hex:"#C4A090", shopUrl:"https://www.amazon.com/s?k=Milani+Baked+Blush+Luminoso&tag=anishkanawa00-20" }],
    [V]: [{ brand:"NARS", product:"Blush", shade:"Deep Throat", price:"$36", hex:"#E4928A", shopUrl:"https://go.shopmy.us/p-51040049", productImageUrl:"https://static.shopmy.us/pins/zoom-51040049-1775437102684-variant_images-size-CatchMe-194251171661-1.jpg" }],
    [S]: [{ brand:"Patrick Ta", product:"Major Headlines Double-Take Crème & Powder Blush Duo", shade:"She's That Girl", price:"$42", hex:"#C4B09A", shopUrl:"https://www.amazon.com/s?k=NARS+Blush+Madly&tag=anishkanawa00-20" }],
  },
  eyes: {
    [B]: [{ brand:"e.l.f.", product:"Bite-Size Eyeshadow", shade:"Cream & Sugar", price:"$4", hex:"#A09080", shopUrl:"https://www.amazon.com/s?k=ColourPop+Super+Shock+Nillionaire&tag=anishkanawa00-20" }],
    [V]: [{ brand:"ColourPop", product:"Yes, Please! Palette", shade:"Note to Self", price:"$16", hex:"#9B6A48", shopUrl:"https://www.amazon.com/s?k=Urban+Decay+24%2F7+Shadow+Roach&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Anastasia Beverly Hills", product:"Soft Glam Eyeshadow Palette", shade:"Soft Glam", price:"$45", hex:"#8B6B50", shopUrl:"https://www.amazon.com/s?k=Tom+Ford+Quad+Cognac+Sable&tag=anishkanawa00-20" }],
  },
  bronzer: {
    [B]: [{ brand:"Physicians Formula", product:"Butter Bronzer", shade:"Bronzer", price:"$15", hex:"#B09068", shopUrl:"https://www.amazon.com/s?k=Wet+n+Wild+Color+Icon+Ticket+to+Brazil&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Milk Makeup", product:"Matte Bronzer Stick", shade:"Blaze", price:"$26", hex:"#A08058", shopUrl:"https://www.amazon.com/s?k=Milk+Makeup+Matte+Bronzer+Baked&tag=anishkanawa00-20" }],
    [S]: [{ brand:"NARS", product:"Laguna Bronzing Powder", shade:"Laguna", price:"$42", hex:"#907048", shopUrl:"https://www.amazon.com/s?k=Charlotte+Tilbury+Filmstar+Bronze+Medium&tag=anishkanawa00-20" }],
  },
  nails: {
    [B]: [{ brand:"Sally Hansen", product:"Miracle Gel", shade:"Totem-ly Yours", price:"$7", hex:"#A08870", shopUrl:"https://www.amazon.com/s?k=e.l.f.+Nail+Polish+Taupe&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Olive & June", product:"Nail Polish", shade:"Wild & Free", price:"$9", hex:"#F5C8A0", shopUrl:"https://www.amazon.com/s?k=Glossier+Gel+Cream+Cachet&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Chanel", product:"Le Vernis", shade:"Beige Pur", price:"$32", hex:"#C0A58A", shopUrl:"https://www.amazon.com/s?k=Tom+Ford+Nail+Lacquer+Sable+Smoke&tag=anishkanawa00-20" }],
  },
},
"True Autumn": {
  foundation: {
    [B]: [{ brand:"Maybelline", product:"Fit Me Dewy + Smooth Foundation", shade:"310 Sun Beige", price:"$9", hex:"#C49060", shopUrl:"https://go.shopmy.us/p-51040708", productImageUrl:"https://static.shopmy.us/pins/zoom-product-9424-1609254953985-2537808" }],
    [V]: [{ brand:"Rare Beauty", product:"Liquid Touch Weightless Foundation", shade:"330W", price:"$30", hex:"#C49060", shopUrl:"https://go.shopmy.us/p-51040809", productImageUrl:"https://static.shopmy.us/pins/zoom-51040809-1775437474983-Foundation-100W-SKU_dc8e5700-8cf9-4357-9ccb-57e0c580a3e1.jpg" }],
    [S]: [{ brand:"Armani Beauty", product:"Luminous Silk Foundation", shade:"8", price:"$69", hex:"#C49060", shopUrl:"https://go.shopmy.us/p-51040897", productImageUrl:"https://static.shopmy.us/pins/zoom-51040897-1775437515787-nm_4321526_100244_m" }],
  },
  concealer: {
    [B]: [{ brand:"e.l.f.", product:"Hydrating Camo Concealer", shade:"Medium Golden", price:"$7", hex:"#D4A878", shopUrl:"https://go.shopmy.us/p-51040979", productImageUrl:"https://static.shopmy.us/pins/zoom-51040979-1775437555095-10335076" }],
    [V]: [{ brand:"NARS", product:"Radiant Creamy Concealer", shade:"Caramel", price:"$32", hex:"#D4A878", shopUrl:"https://go.shopmy.us/p-51041139", productImageUrl:"https://static.shopmy.us/pins/zoom-51041139-1775437634470-variant_images-size-CafeconLecheL26-607845012252-1.jpg" }],
    [S]: [{ brand:"Fenty Beauty", product:"Pro Filt'r Instant Retouch Concealer", shade:"330", price:"$28", hex:"#D4A878", shopUrl:"https://www.amazon.com/s?k=NARS+Radiant+Creamy+Caramel&tag=anishkanawa00-20" }],
  },
  lips: {
    [B]: [{ brand:"NYX", product:"Soft Matte Lip Cream", shade:"Cairo", price:"$8", hex:"#CC6633", shopUrl:"https://www.amazon.com/s?k=NYX+Lip+Lingerie+Exotic&tag=anishkanawa00-20" }],
    [V]: [{ brand:"MAC", product:"Lustre Lipstick", shade:"Velvet Teddy", price:"$24", hex:"#B07865", shopUrl:"https://www.amazon.com/s?k=Rare+Beauty+Soft+Pinch+Liquid+Inspire&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Matte Revolution Lipstick", shade:"Pillow Talk Medium", price:"$38", hex:"#B8908A", shopUrl:"https://go.shopmy.us/p-51041428", productImageUrl:"https://static.shopmy.us/pins/zoom-51041428-1775437760732-variant_images-size-Supermodel-5056446600484-1.jpg" }],
  },
  lipLiner: {
    [B]: [{ brand:"NYX", product:"Slim Lip Pencil", shade:"Hot Cocoa", price:"$4", hex:"#8B5030", shopUrl:"https://www.amazon.com/s?k=NYX+Suede+Matte+Leon&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Anastasia Beverly Hills", product:"Lip Liner", shade:"Brick", price:"$22", hex:"#7A4028", shopUrl:"https://www.amazon.com/s?k=Patrick+Ta+Precision+Liner+She%27s+Bold&tag=anishkanawa00-20" }],
    [S]: [{ brand:"MAC", product:"Lip Pencil", shade:"Chestnut", price:"$24", hex:"#6A3020", shopUrl:"https://go.shopmy.us/p-51041628", productImageUrl:"https://static.shopmy.us/pins/zoom-51041628-1775437851637-17027964_fpx.tif" }],
  },
  blush: {
    [B]: [{ brand:"Milani", product:"Baked Blush", shade:"Rose D'Oro", price:"$9", hex:"#CC6633", shopUrl:"https://go.shopmy.us/p-51041713", productImageUrl:"https://static.shopmy.us/pins/zoom-51041713-1775437892459-10270967" }],
    [V]: [{ brand:"Milk Makeup", product:"Lip + Cheek", shade:"Werk", price:"$22", hex:"#B8593B", shopUrl:"https://www.amazon.com/s?k=Rare+Beauty+Soft+Pinch+Encourage&tag=anishkanawa00-20" }],
    [S]: [{ brand:"NARS", product:"Blush", shade:"Taj Mahal", price:"$36", hex:"#C08050", shopUrl:"https://go.shopmy.us/p-51041978", productImageUrl:"https://static.shopmy.us/pins/zoom-51041978-1775438002425-variant_images-size-CatchMe-194251171661-1.jpg" }],
  },
  eyes: {
    [B]: [{ brand:"e.l.f.", product:"Bite-Size Eyeshadow", shade:"Truffles", price:"$4", hex:"#B8860B", shopUrl:"https://www.amazon.com/s?k=ColourPop+Super+Shock+Bae&tag=anishkanawa00-20" }],
    [V]: [{ brand:"ColourPop", product:"Yes, Please! Palette", shade:"Gno", price:"$16", hex:"#A8542C", shopUrl:"https://www.amazon.com/s?k=Urban+Decay+24%2F7+Shadow+Smog&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Anastasia Beverly Hills", product:"Modern Renaissance Eyeshadow Palette", shade:"Warm Neutrals", price:"$45", hex:"#B87333", shopUrl:"https://www.amazon.com/s?k=Tom+Ford+Quad+Leopard+Sun&tag=anishkanawa00-20" }],
  },
  bronzer: {
    [B]: [{ brand:"e.l.f.", product:"Putty Bronzer", shade:"Tan Lines", price:"$7", hex:"#A07840", shopUrl:"https://www.amazon.com/s?k=Wet+n+Wild+Color+Icon+Ticket+to+Brazil&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Milk Makeup", product:"Matte Bronzer Stick", shade:"Blaze", price:"$26", hex:"#906830", shopUrl:"https://www.amazon.com/s?k=Milk+Makeup+Matte+Bronzer+Baked&tag=anishkanawa00-20" }],
    [S]: [{ brand:"NARS", product:"Laguna Bronzing Powder", shade:"Laguna", price:"$42", hex:"#805828", shopUrl:"https://www.amazon.com/s?k=Charlotte+Tilbury+Filmstar+Bronze+Medium%2FDark&tag=anishkanawa00-20" }],
  },
  nails: {
    [B]: [{ brand:"Sally Hansen", product:"Miracle Gel", shade:"Terra-Coppa", price:"$7", hex:"#CC6633", shopUrl:"https://www.amazon.com/s?k=e.l.f.+Nail+Polish+Terracotta&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Zoya", product:"Nail Polish", shade:"Rocha", price:"$12", hex:"#B8001F", shopUrl:"https://www.amazon.com/s?k=Glossier+Gel+Cream+Cachet&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Chanel", product:"Le Vernis", shade:"Rouge Essentiel", price:"$32", hex:"#8B4513", shopUrl:"https://www.amazon.com/s?k=Tom+Ford+Nail+Lacquer+Burnished+Rouge&tag=anishkanawa00-20" }],
  },
},
"Dark Autumn": {
  foundation: {
    [B]: [{ brand:"L'Oréal", product:"True Match", shade:"W7 Caramel Beige", price:"$12", hex:"#A07848", shopUrl:"https://go.shopmy.us/p-51042870", productImageUrl:"https://static.shopmy.us/uploads/img-product-1755502303641" }],
    [V]: [{ brand:"Rare Beauty", product:"Liquid Touch Weightless Foundation", shade:"410W", price:"$30", hex:"#A07848", shopUrl:"https://go.shopmy.us/p-51042957", productImageUrl:"https://static.shopmy.us/pins/zoom-51042957-1775438531986-Foundation-100W-SKU_dc8e5700-8cf9-4357-9ccb-57e0c580a3e1.jpg" }],
    [S]: [{ brand:"Armani Beauty", product:"Luminous Silk Foundation", shade:"10", price:"$69", hex:"#A07848", shopUrl:"https://go.shopmy.us/p-51043069", productImageUrl:"https://static.shopmy.us/pins/zoom-51043069-1775438581645-nm_4321526_100244_m" }],
  },
  concealer: {
    [B]: [{ brand:"Maybelline", product:"Instant Age Rewind Eraser", shade:"Honey", price:"$10", hex:"#B49060", shopUrl:"https://go.shopmy.us/p-51043206", productImageUrl:"https://static.shopmy.us/pins/zoom-51043206-1775438641480-2529471" }],
    [V]: [{ brand:"Kosas", product:"Revealer Concealer", shade:"Tone 7 W", price:"$28", hex:"#B49060", shopUrl:"https://www.amazon.com/s?k=Too+Faced+Born+This+Way+Toffee&tag=anishkanawa00-20" }],
    [S]: [{ brand:"NARS", product:"Radiant Creamy Concealer", shade:"Cacao", price:"$32", hex:"#B49060", shopUrl:"https://www.amazon.com/s?k=Pat+McGrath+Sublime+Perfection+M18&tag=anishkanawa00-20" }],
  },
  lips: {
    [B]: [{ brand:"NYX", product:"Lip Lingerie XXL", shade:"Push'd Up", price:"$11", hex:"#9C6650", shopUrl:"https://www.amazon.com/s?k=NYX+Lip+Lingerie+Beauty+Mark&tag=anishkanawa00-20" }],
    [V]: [{ brand:"MAC", product:"Matte Lipstick", shade:"Mocha", price:"$24", hex:"#9D5B47", shopUrl:"https://www.amazon.com/s?k=Rare+Beauty+Soft+Pinch+Liquid+Devotion&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Matte Revolution Lipstick", shade:"Pillow Talk Medium", price:"$38", hex:"#B8908A", shopUrl:"https://go.shopmy.us/p-51043829", productImageUrl:"https://static.shopmy.us/pins/zoom-51043829-1775438899846-CTIL-WU118_V1.jpg" }],
  },
  lipLiner: {
    [B]: [{ brand:"NYX", product:"Slim Lip Pencil", shade:"Plum", price:"$4", hex:"#5A2020", shopUrl:"https://www.amazon.com/s?k=NYX+Suede+Matte+Cold+Brew&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Urban Decay", product:"24/7 Glide-On Lip Pencil", shade:"Venom", price:"$24", hex:"#4A1818", shopUrl:"https://go.shopmy.us/p-51044537", productImageUrl:"https://static.shopmy.us/pins/zoom-51044537-1775439192472-26138584_fpx.tif" }],
    [S]: [{ brand:"MAC", product:"Lip Pencil", shade:"Nightmoth", price:"$24", hex:"#3A1010", shopUrl:"https://go.shopmy.us/p-51043993", productImageUrl:"https://static.shopmy.us/pins/zoom-51043993-1775438965318-17027964_fpx.tif" }],
  },
  blush: {
    [B]: [{ brand:"e.l.f.", product:"Putty Blush", shade:"Tahiti", price:"$6", hex:"#B07050", shopUrl:"https://www.amazon.com/s?k=Milani+Baked+Blush+Red+Vino&tag=anishkanawa00-20" }],
    [V]: [{ brand:"NARS", product:"Blush", shade:"Taj Mahal", price:"$36", hex:"#B8653A", shopUrl:"https://go.shopmy.us/p-51044298", productImageUrl:"https://static.shopmy.us/pins/zoom-51044298-1775439076368-variant_images-size-CatchMe-194251171661-1.jpg" }],
    [S]: [{ brand:"Patrick Ta", product:"Major Headlines Double-Take Crème & Powder Blush Duo", shade:"She's My Dream", price:"$42", hex:"#A06060", shopUrl:"https://www.amazon.com/s?k=NARS+Blush+Exhibit+A&tag=anishkanawa00-20" }],
  },
  eyes: {
    [B]: [{ brand:"e.l.f.", product:"Bite-Size Eyeshadow", shade:"Truffles", price:"$4", hex:"#6B4226", shopUrl:"https://www.amazon.com/s?k=ColourPop+Super+Shock+Mittens&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Urban Decay", product:"Naked Cherry Palette", shade:"Bing", price:"$35", hex:"#6A4050", shopUrl:"https://go.shopmy.us/p-51044537", productImageUrl:"https://static.shopmy.us/pins/zoom-51044537-1775439192472-26138584_fpx.tif" }],
    [S]: [{ brand:"Pat McGrath", product:"Mothership Eyeshadow Palette", shade:"Bronze Seduction", price:"$55", hex:"#8B7220", shopUrl:"https://www.amazon.com/s?k=Tom+Ford+Quad+Body+Heat&tag=anishkanawa00-20" }],
  },
  bronzer: {
    [B]: [{ brand:"Physicians Formula", product:"Butter Bronzer", shade:"Deep", price:"$15", hex:"#906838", shopUrl:"https://www.amazon.com/s?k=Wet+n+Wild+Color+Icon+What+Shady+Beaches&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Fenty Beauty", product:"Sun Stalk'r Instant Warmth Bronzer", shade:"Private Island", price:"$34", hex:"#805828", shopUrl:"https://www.amazon.com/s?k=Milk+Makeup+Matte+Bronzer+Toasted&tag=anishkanawa00-20" }],
    [S]: [{ brand:"NARS", product:"Laguna Bronzing Powder", shade:"Casino", price:"$42", hex:"#704820", shopUrl:"https://www.amazon.com/s?k=Charlotte+Tilbury+Filmstar+Bronze+Dark&tag=anishkanawa00-20" }],
  },
  nails: {
    [B]: [{ brand:"Sally Hansen", product:"Miracle Gel", shade:"Rhapsody Red", price:"$7", hex:"#800020", shopUrl:"https://www.amazon.com/s?k=e.l.f.+Nail+Polish+Dark+Plum&tag=anishkanawa00-20" }],
    [V]: [{ brand:"OPI", product:"Nail Lacquer", shade:"Malaga Wine", price:"$12", hex:"#5F1A27", shopUrl:"https://www.amazon.com/s?k=Glossier+Gel+Cream+Thorn&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Chanel", product:"Le Vernis", shade:"Rouge Noir", price:"$32", hex:"#4A0E1F", shopUrl:"https://www.amazon.com/s?k=Tom+Ford+Nail+Lacquer+Black+Cherry&tag=anishkanawa00-20" }],
  },
},
"Dark Winter": {
  foundation: {
    [B]: [{ brand:"Maybelline", product:"Fit Me Matte + Poreless Foundation", shade:"355 Coconut", price:"$9", hex:"#956848", shopUrl:"https://www.amazon.com/s?k=Maybelline+Fit+Me+Matte+355+Coconut&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Rare Beauty", product:"Liquid Touch Weightless Foundation", shade:"440C", price:"$30", hex:"#956848", shopUrl:"https://go.shopmy.us/p-51045302", productImageUrl:"https://static.shopmy.us/pins/zoom-51045302-1775439565443-Foundation-100W-SKU_dc8e5700-8cf9-4357-9ccb-57e0c580a3e1.jpg" }],
    [S]: [{ brand:"Armani Beauty", product:"Luminous Silk Foundation", shade:"11.5", price:"$69", hex:"#956848", shopUrl:"https://go.shopmy.us/p-51045412", productImageUrl:"https://static.shopmy.us/pins/zoom-51045412-1775439612788-nm_4321526_100244_m" }],
  },
  concealer: {
    [B]: [{ brand:"e.l.f.", product:"Hydrating Camo Concealer", shade:"Rich Chocolate", price:"$7", hex:"#A88060", shopUrl:"https://go.shopmy.us/p-51045503", productImageUrl:"https://static.shopmy.us/pins/zoom-51045503-1775439661049-10335076" }],
    [V]: [{ brand:"IT Cosmetics", product:"Bye Bye Under Eye Concealer", shade:"40.0 Deep", price:"$29", hex:"#A88060", shopUrl:"https://www.amazon.com/s?k=Too+Faced+Born+This+Way+Chai&tag=anishkanawa00-20" }],
    [S]: [{ brand:"NARS", product:"Radiant Creamy Concealer", shade:"Amande", price:"$32", hex:"#A88060", shopUrl:"https://go.shopmy.us/p-51045743", productImageUrl:"https://static.shopmy.us/pins/zoom-51045743-1775439761890-variant_images-size-CafeconLecheL26-607845012252-1.jpg" }],
  },
  lips: {
    [B]: [{ brand:"NYX", product:"Soft Matte Lip Cream", shade:"Stockholm", price:"$8", hex:"#9D5B58", shopUrl:"https://www.amazon.com/s?k=NYX+Lip+Lingerie+Exotic&tag=anishkanawa00-20" }],
    [V]: [{ brand:"MAC", product:"Matte Lipstick", shade:"Whirl", price:"$24", hex:"#A87574", shopUrl:"https://www.amazon.com/s?k=Rare+Beauty+Soft+Pinch+Liquid+Inspire&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Pat McGrath", product:"MatteTrance Lipstick", shade:"Divine Rose II", price:"$40", hex:"#B07A75", shopUrl:"https://www.amazon.com/s?k=Charlotte+Tilbury+Matte+Revolution+Scarlet+Spell&tag=anishkanawa00-20" }],
  },
  lipLiner: {
    [B]: [{ brand:"NYX", product:"Slim Lip Pencil", shade:"Cabaret", price:"$4", hex:"#5A1030", shopUrl:"https://www.amazon.com/s?k=NYX+Suede+Matte+Vintage&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Urban Decay", product:"24/7 Glide-On Lip Pencil", shade:"Blackmail", price:"$24", hex:"#4A0828", shopUrl:"https://www.amazon.com/s?k=Patrick+Ta+Precision+Liner+She%27s+Dangerous&tag=anishkanawa00-20" }],
    [S]: [{ brand:"MAC", product:"Lip Pencil", shade:"Burgundy", price:"$24", hex:"#400020", shopUrl:"https://go.shopmy.us/p-51046329", productImageUrl:"https://static.shopmy.us/pins/zoom-51046329-1775440003807-17027964_fpx.tif" }],
  },
  blush: {
    [B]: [{ brand:"Milani", product:"Baked Blush", shade:"Red Vino", price:"$9", hex:"#8B3A5A", shopUrl:"https://go.shopmy.us/p-51046434", productImageUrl:"https://static.shopmy.us/pins/zoom-51046434-1775440050663-77003916" }],
    [V]: [{ brand:"Milk Makeup", product:"Lip + Cheek", shade:"Rally", price:"$22", hex:"#7A2035", shopUrl:"https://www.amazon.com/s?k=Rare+Beauty+Soft+Pinch+Grateful&tag=anishkanawa00-20" }],
    [S]: [{ brand:"NARS", product:"Blush", shade:"Seduction", price:"$36", hex:"#6B3060", shopUrl:"https://go.shopmy.us/p-51046675", productImageUrl:"https://static.shopmy.us/pins/zoom-51046675-1775440152298-variant_images-size-CatchMe-194251171661-1.jpg" }],
  },
  eyes: {
    [B]: [{ brand:"e.l.f.", product:"Bite-Size Eyeshadow", shade:"Midnight Oil", price:"$4", hex:"#191970", shopUrl:"https://www.amazon.com/s?k=ColourPop+Super+Shock+Ritz&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Huda Beauty", product:"Smokey Obsessions Palette", shade:"Smoke", price:"$27", hex:"#3A3A4A", shopUrl:"https://www.amazon.com/s?k=Urban+Decay+24%2F7+Shadow+Ransom&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Pat McGrath", product:"Mothership Eyeshadow Palette", shade:"Subversive", price:"$55", hex:"#36454F", shopUrl:"https://www.amazon.com/s?k=Tom+Ford+Quad+Badass&tag=anishkanawa00-20" }],
  },
  bronzer: {
    [B]: [{ brand:"Physicians Formula", product:"Butter Bronzer", shade:"Deep", price:"$15", hex:"#886040", shopUrl:"https://www.amazon.com/s?k=Wet+n+Wild+Color+Icon+What+Shady+Beaches&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Fenty Beauty", product:"Sun Stalk'r Instant Warmth Bronzer", shade:"Mocha Mami", price:"$34", hex:"#785030", shopUrl:"https://www.amazon.com/s?k=Milk+Makeup+Matte+Bronzer+Toasted&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Airbrush Bronzer", shade:"4 Deep", price:"$50", hex:"#684028", shopUrl:"https://www.amazon.com/s?k=Charlotte+Tilbury+Filmstar+Bronze+Dark&tag=anishkanawa00-20" }],
  },
  nails: {
    [B]: [{ brand:"Sally Hansen", product:"Miracle Gel", shade:"Plum Luck", price:"$7", hex:"#400040", shopUrl:"https://www.amazon.com/s?k=e.l.f.+Nail+Polish+Dark+Berry&tag=anishkanawa00-20" }],
    [V]: [{ brand:"OPI", product:"Nail Lacquer", shade:"Lincoln Park After Dark", price:"$12", hex:"#2A1030", shopUrl:"https://www.amazon.com/s?k=Glossier+Gel+Cream+Thorn&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Chanel", product:"Le Vernis", shade:"Blue Satin", price:"$32", hex:"#191970", shopUrl:"https://www.amazon.com/s?k=Tom+Ford+Nail+Lacquer+Viper&tag=anishkanawa00-20" }],
  },
},
"True Winter": {
  foundation: {
    [B]: [{ brand:"L'Oréal", product:"True Match", shade:"C2 Natural Ivory", price:"$12", hex:"#E8CEC0", shopUrl:"https://go.shopmy.us/p-51047757", productImageUrl:"https://static.shopmy.us/uploads/img-product-1755502303641" }],
    [V]: [{ brand:"Rare Beauty", product:"Liquid Touch Weightless Foundation", shade:"150C", price:"$30", hex:"#E8CEC0", shopUrl:"https://go.shopmy.us/p-51047845", productImageUrl:"https://static.shopmy.us/pins/zoom-51047845-1775440718233-Foundation-100W-SKU_dc8e5700-8cf9-4357-9ccb-57e0c580a3e1.jpg" }],
    [S]: [{ brand:"Armani Beauty", product:"Luminous Silk Foundation", shade:"3", price:"$69", hex:"#E8CEC0", shopUrl:"https://go.shopmy.us/p-51047909", productImageUrl:"https://static.shopmy.us/pins/zoom-51047909-1775440743002-nm_4321526_100244_m" }],
  },
  concealer: {
    [B]: [{ brand:"Maybelline", product:"Instant Age Rewind Eraser", shade:"Light/Pale", price:"$10", hex:"#F0DAD0", shopUrl:"https://go.shopmy.us/p-51047997", productImageUrl:"https://static.shopmy.us/pins/zoom-51047997-1775440773049-2529471" }],
    [V]: [{ brand:"Kosas", product:"Revealer Concealer", shade:"Tone 3 C", price:"$28", hex:"#F0DAD0", shopUrl:"https://www.amazon.com/s?k=Too+Faced+Born+This+Way+Porcelain&tag=anishkanawa00-20" }],
    [S]: [{ brand:"NARS", product:"Radiant Creamy Concealer", shade:"Chantilly", price:"$32", hex:"#F0DAD0", shopUrl:"https://go.shopmy.us/p-51048184", productImageUrl:"https://static.shopmy.us/pins/zoom-51048184-1775440830249-variant_images-size-CafeconLecheL26-607845012252-1.jpg" }],
  },
  lips: {
    [B]: [{ brand:"NYX", product:"Soft Matte Lip Cream", shade:"Stockholm", price:"$8", hex:"#9D5B58", shopUrl:"https://www.amazon.com/s?k=NYX+Butter+Gloss+Red+Velvet&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Rare Beauty", product:"Soft Pinch Tinted Lip Oil", shade:"Believe", price:"$22", hex:"#A85066", shopUrl:"https://www.amazon.com/s?k=Rare+Beauty+Soft+Pinch+Liquid+Grateful&tag=anishkanawa00-20" }],
    [S]: [{ brand:"YSL", product:"Rouge Pur Couture", shade:"1 Le Rouge", price:"$45", hex:"#CC0000", shopUrl:"https://www.amazon.com/s?k=Charlotte+Tilbury+Matte+Revolution+Red+Carpet+Red&tag=anishkanawa00-20" }],
  },
  lipLiner: {
    [B]: [{ brand:"NYX", product:"Slim Lip Pencil", shade:"Cherry", price:"$4", hex:"#AA0000", shopUrl:"https://www.amazon.com/s?k=NYX+Suede+Matte+Cherry+Skies&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Anastasia Beverly Hills", product:"Lip Liner", shade:"Rich Berry", price:"$22", hex:"#990033", shopUrl:"https://www.amazon.com/s?k=Patrick+Ta+Precision+Liner+She%27s+Iconic&tag=anishkanawa00-20" }],
    [S]: [{ brand:"MAC", product:"Lip Pencil", shade:"Cherry", price:"$24", hex:"#880022", shopUrl:"https://go.shopmy.us/p-51048614", productImageUrl:"https://static.shopmy.us/pins/zoom-51048614-1775440985734-17027964_fpx.tif" }],
  },
  blush: {
    [B]: [{ brand:"Milani", product:"Baked Blush", shade:"Fantastico Mauve", price:"$9", hex:"#A05F75", shopUrl:"https://go.shopmy.us/p-51048704", productImageUrl:"https://static.shopmy.us/pins/zoom-51048704-1775441018934-77003916" }],
    [V]: [{ brand:"NARS", product:"Blush", shade:"Exhibit A", price:"$36", hex:"#C73A3A", shopUrl:"https://go.shopmy.us/p-51048903", productImageUrl:"https://static.shopmy.us/pins/zoom-51048903-1775441086659-variant_images-size-CatchMe-194251171661-1.jpg" }],
    [S]: [{ brand:"Dior", product:"Rosy Glow Blush", shade:"047 Charnelle", price:"$42", hex:"#C71585", shopUrl:"https://www.amazon.com/s?k=NARS+Blush+Desire&tag=anishkanawa00-20" }],
  },
  eyes: {
    [B]: [{ brand:"e.l.f.", product:"Bite-Size Eyeshadow", shade:"Midnight Metals", price:"$4", hex:"#C0C0C0", shopUrl:"https://www.amazon.com/s?k=ColourPop+Super+Shock+Amaze&tag=anishkanawa00-20" }],
    [V]: [{ brand:"ColourPop", product:"Yes, Please! Palette", shade:"French Kiss", price:"$16", hex:"#6B2820", shopUrl:"https://www.amazon.com/s?k=Urban+Decay+24%2F7+Shadow+Evidence&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Pat McGrath", product:"Mothership Eyeshadow Palette", shade:"Celestial Odyssey", price:"$55", hex:"#046307", shopUrl:"https://www.amazon.com/s?k=Tom+Ford+Quad+Starry+Night&tag=anishkanawa00-20" }],
  },
  bronzer: {
    [B]: [{ brand:"e.l.f.", product:"Putty Bronzer", shade:"Feelin' Shady", price:"$7", hex:"#B8A098", shopUrl:"https://go.shopmy.us/p-51049336", productImageUrl:"https://cdn-fsly.yottaa.net/5a0c9b7632f01c35d42101b2/www.elfcosmetics.com/v~4b.a3/dw/image/v2/BBXC_PRD/on/demandware.static/-/Sites-elf-master/default/dwc50b8e0c/2021/82782_FCBRZ_OpenA_R.jpg?sfrm=png&sw=425&q=90&yocs=1u_1y_1A_" }],
    [V]: [{ brand:"Tower 28", product:"BronzinoIlluminating Cream Bronzer", shade:"Capri", price:"$22", hex:"#A89088", shopUrl:"https://www.amazon.com/s?k=Milk+Makeup+Matte+Bronzer+Light&tag=anishkanawa00-20" }],
    [S]: [{ brand:"NARS", product:"Laguna Bronzing Powder", shade:"Laguna", price:"$42", hex:"#988078", shopUrl:"https://www.amazon.com/s?k=Charlotte+Tilbury+Filmstar+Bronze+Light%2FMedium&tag=anishkanawa00-20" }],
  },
  nails: {
    [B]: [{ brand:"Sally Hansen", product:"Miracle Gel", shade:"Off With Her Red", price:"$7", hex:"#FF0000", shopUrl:"https://www.amazon.com/s?k=e.l.f.+Nail+Polish+True+Red&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Chanel", product:"Le Vernis", shade:"Pirate", price:"$32", hex:"#C8001F", shopUrl:"https://www.amazon.com/s?k=Glossier+Gel+Cream+Fete&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Dior", product:"Vernis Nail Lacquer", shade:"Rouge 999", price:"$32", hex:"#B8001F", shopUrl:"https://www.amazon.com/s?k=Tom+Ford+Nail+Lacquer+Smoke+Red&tag=anishkanawa00-20" }],
  },
},
"Bright Winter": {
  foundation: {
    [B]: [{ brand:"Maybelline", product:"Fit Me Matte + Poreless Foundation", shade:"118 Light Beige", price:"$9", hex:"#E5CCB8", shopUrl:"https://www.amazon.com/s?k=Maybelline+Fit+Me+Matte+118+Light+Beige&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Rare Beauty", product:"Liquid Touch Weightless Foundation", shade:"160C", price:"$30", hex:"#E5CCB8", shopUrl:"https://go.shopmy.us/p-51050189", productImageUrl:"https://static.shopmy.us/pins/zoom-51050189-1775441591201-Foundation-100W-SKU_dc8e5700-8cf9-4357-9ccb-57e0c580a3e1.jpg" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Airbrush Flawless Foundation", shade:"3.5 Cool", price:"$48", hex:"#E5CCB8", shopUrl:"https://www.amazon.com/s?k=Armani+Beauty+Luminous+Silk+3.5&tag=anishkanawa00-20" }],
  },
  concealer: {
    [B]: [{ brand:"e.l.f.", product:"Hydrating Camo Concealer", shade:"Fair Beige", price:"$7", hex:"#F0DCC8", shopUrl:"https://go.shopmy.us/p-51050421", productImageUrl:"https://static.shopmy.us/pins/zoom-51050421-1775441671231-10335076" }],
    [V]: [{ brand:"NARS", product:"Radiant Creamy Concealer", shade:"Vanilla", price:"$32", hex:"#F0DCC8", shopUrl:"https://www.amazon.com/s?k=Milk+Makeup+Future+Fluid+6&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Fenty Beauty", product:"Pro Filt'r Instant Retouch Concealer", shade:"160", price:"$28", hex:"#F0DCC8", shopUrl:"https://www.amazon.com/s?k=Pat+McGrath+Sublime+Perfection+L4&tag=anishkanawa00-20" }],
  },
  lips: {
    [B]: [{ brand:"NYX", product:"Soft Matte Lip Cream", shade:"Antwerp", price:"$8", hex:"#A86870", shopUrl:"https://www.amazon.com/s?k=NYX+Butter+Gloss+Strawberry+Cheesecake&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Rare Beauty", product:"Soft Pinch Tinted Lip Oil", shade:"Worth", price:"$22", hex:"#B7626E", shopUrl:"https://www.amazon.com/s?k=Rare+Beauty+Soft+Pinch+Liquid+Happy&tag=anishkanawa00-20" }],
    [S]: [{ brand:"YSL", product:"Rouge Volupté Shine", shade:"86 Mauve Cuir", price:"$45", hex:"#A8516A", shopUrl:"https://www.amazon.com/s?k=Charlotte+Tilbury+Matte+Revolution+Lost+Cherry&tag=anishkanawa00-20" }],
  },
  lipLiner: {
    [B]: [{ brand:"NYX", product:"Slim Lip Pencil", shade:"Hot Red", price:"$4", hex:"#CC0066", shopUrl:"https://www.amazon.com/s?k=NYX+Suede+Matte+Girl%2C+Bye&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Urban Decay", product:"24/7 Glide-On Lip Pencil", shade:"Bad Blood", price:"$24", hex:"#BB0055", shopUrl:"https://go.shopmy.us/p-51051573", productImageUrl:"https://static.shopmy.us/pins/zoom-51051573-1775442207516-26138584_fpx.tif" }],
    [S]: [{ brand:"MAC", product:"Lip Pencil", shade:"Magenta", price:"$24", hex:"#AA0044", shopUrl:"https://go.shopmy.us/p-51051282", productImageUrl:"https://static.shopmy.us/pins/zoom-51051282-1775442059698-17027964_fpx.tif" }],
  },
  blush: {
    [B]: [{ brand:"Milani", product:"Baked Blush", shade:"Dolce Pink", price:"$9", hex:"#FF69B4", shopUrl:"https://go.shopmy.us/p-51051325", productImageUrl:"https://static.shopmy.us/pins/zoom-51051325-1775442091132-1_BakedBlush_01_PDP_PoductWithSwatch_1fd650a7-46ec-4dfe-9fe0-061252fe6056.png" }],
    [V]: [{ brand:"Rare Beauty", product:"Soft Pinch Liquid Blush", shade:"Bliss", price:"$23", hex:"#E06090", shopUrl:"https://go.shopmy.us/p-51050785", productImageUrl:"https://static.shopmy.us/pins/zoom-51050785-1775441852251-ECOMM-SP-LIQUID-BLUSH-DEWY-HOPE.jpg" }],
    [S]: [{ brand:"Dior", product:"Rosy Glow Blush", shade:"001 Pink", price:"$42", hex:"#DA1884", shopUrl:"https://www.amazon.com/s?k=NARS+Blush+Exhibit+A&tag=anishkanawa00-20" }],
  },
  eyes: {
    [B]: [{ brand:"e.l.f.", product:"Bite-Size Eyeshadow", shade:"Cobalt", price:"$4", hex:"#1E90FF", shopUrl:"https://www.amazon.com/s?k=ColourPop+Super+Shock+Liberty&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Huda Beauty", product:"Electric Obsessions Palette", shade:"Electric", price:"$27", hex:"#1E78CC", shopUrl:"https://www.amazon.com/s?k=Urban+Decay+24%2F7+Shadow+Freelove&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Natasha Denona", product:"Mini Retro Eyeshadow Palette", shade:"Aqua", price:"$35", hex:"#00CED1", shopUrl:"https://www.amazon.com/s?k=Tom+Ford+Quad+Electric+Blue&tag=anishkanawa00-20" }],
  },
  bronzer: {
    [B]: [{ brand:"Physicians Formula", product:"Butter Bronzer", shade:"Light", price:"$15", hex:"#B09888", shopUrl:"https://www.amazon.com/s?k=Wet+n+Wild+Color+Icon+Dulce+De+Leche&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Milk Makeup", product:"Matte Bronzer Stick", shade:"Baked", price:"$26", hex:"#A08878", shopUrl:"https://www.amazon.com/s?k=Milk+Makeup+Matte+Bronzer+Light&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Charlotte Tilbury", product:"Airbrush Bronzer", shade:"2 Medium", price:"$50", hex:"#907868", shopUrl:"https://www.amazon.com/s?k=Charlotte+Tilbury+Filmstar+Bronze+Light%2FMedium&tag=anishkanawa00-20" }],
  },
  nails: {
    [B]: [{ brand:"Sally Hansen", product:"Miracle Gel", shade:"Pink Up the Pace", price:"$7", hex:"#FF1493", shopUrl:"https://www.amazon.com/s?k=e.l.f.+Nail+Polish+Hot+Pink&tag=anishkanawa00-20" }],
    [V]: [{ brand:"Essie", product:"Nail Polish", shade:"Turquoise & Caicos", price:"$10", hex:"#30A8B8", shopUrl:"https://www.amazon.com/s?k=Glossier+Gel+Cream+Petal&tag=anishkanawa00-20" }],
    [S]: [{ brand:"Dior", product:"Vernis Nail Lacquer", shade:"Lucky", price:"$32", hex:"#C71585", shopUrl:"https://www.amazon.com/s?k=Tom+Ford+Nail+Lacquer+Azalea&tag=anishkanawa00-20" }],
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
