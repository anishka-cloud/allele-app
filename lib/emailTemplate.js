/**
 * Welcome email HTML generator for Shade DNA.
 * Reads product data (from KV or static) and generates a fully populated email body.
 */
import { seasons } from "./seasonData";
import { getProductRecommendations, TIER_META } from "./productData";
import { getShopUrl } from "./shopLinks";

const SEASON_META = {
  "Clear Spring": {
    descriptor: "warm, bright, light",
    celebs: "Emma Stone, Gina Rodriguez, Kerry Washington",
    palette: "Bright Coral · Warm Red · Bright Turquoise · Golden Yellow · Warm Ivory · Warm Cream · Soft Camel · Clear Navy · Warm Khaki · Light Gold",
    tips: [
      "Go bright, not muted. When in doubt, pick the clearer, more saturated version of any color.",
      "Gold over silver. Your warm undertone makes gold jewelry and warm-toned metallics your best friends.",
      "Skip anything \"dusty.\" Dusty rose, dusty blue, dusty lavender — they'll flatten your natural glow.",
      "Coral is your red. A true warm coral or tomato red will look better on you than a cool cherry or berry.",
    ],
  },
  "True Spring": {
    descriptor: "pure-warm, fresh, medium",
    celebs: "Nicole Kidman, Blake Lively, Beyoncé",
    palette: "Coral Peach · Warm Coral · Golden Apricot · Warm Grass Green · Warm Ivory · Warm Cream · Warm Camel · Warm Beige · Tangerine · Cream Yellow",
    tips: [
      "Saturated beats muted, always. Your coloring holds up to bold, pure color.",
      "Warm golden jewelry. Rose gold works too. Avoid cool silver and platinum.",
      "Ivory > white. Pure cool white fights your undertone. Ivory, cream, and warm white are yours.",
      "Skip black. A rich warm brown or deep navy is your \"black.\"",
    ],
  },
  "Light Spring": {
    descriptor: "delicate, warm, soft-bright",
    celebs: "Taylor Swift, Sadie Sink, Zoë Kravitz",
    palette: "Soft Peach · Warm Coral · Warm Apricot · Light Aqua · Cream · Warm Ivory · Soft Sand · Warm Beige · Champagne · Warm Oatmeal",
    tips: [
      "Soft, not heavy. Avoid matte black liners and full-coverage everything — it ages you.",
      "Warm pastels are your signature. Peach, butter yellow, soft coral.",
      "Tinted lip balms > opaque lipsticks. Sheer wins.",
      "Gold jewelry, always delicate. Thin chains over chunky.",
    ],
  },
  "Light Summer": {
    descriptor: "soft, cool, delicate",
    celebs: "Cate Blanchett, Kristen Bell, Vanessa Williams",
    palette: "Dusty Pink · Powder Blue · Soft Lavender · Cool Mint · Cool Ivory · Soft Pearl · Cool Dove Grey · Warm Pebble · Cool Stone · Soft Denim",
    tips: [
      "Soft and cool is your lane. Think of watercolors, not oil paints.",
      "Silver over gold. Platinum, white gold, and cool-toned metals elevate your look.",
      "Muted pastels > bright pastels. You want whisper, not shout.",
      "Cool pinks and dusty roses are your power lip shades.",
    ],
  },
  "True Summer": {
    descriptor: "pure cool, muted, medium",
    celebs: "Kate Middleton, Courteney Cox, Constance Wu",
    palette: "Rose Mauve · Dusty Raspberry · Soft Periwinkle · Cool Teal · Cool Ivory · Cool Dove · Soft Greige · Cool Navy · Soft Denim · Rosy Taupe",
    tips: [
      "Cool and medium is your sweet spot. Not too dark, not too light.",
      "Rose and mauve tones are always right for lips and cheeks.",
      "Silver and white gold jewelry. Cool-toned metallics only.",
      "Avoid anything orange-based — it will clash with your cool undertone.",
    ],
  },
  "Soft Summer": {
    descriptor: "cool, muted, soft",
    celebs: "Jennifer Aniston, Dakota Johnson, Bella Hadid",
    palette: "Dusty Rose · Soft Plum · Dusty Berry · Cool Sage · Soft Ivory · Cool Dove · Cool Taupe · Soft Greige · Cool Cocoa · Soft Charcoal",
    tips: [
      "Muted is your magic word. If it's dusty, grayed, or soft — it's probably yours.",
      "Cool neutrals over warm neutrals. Grey-based taupes over yellow-based tans.",
      "Rose gold is your metal. Cool enough for your undertone, soft enough for your chroma.",
      "Avoid high contrast. No stark black/white combos — opt for charcoal and cream instead.",
    ],
  },
  "Soft Autumn": {
    descriptor: "warm, muted, soft",
    celebs: "Drew Barrymore, Scarlett Johansson, Hailey Bieber",
    palette: "Dusty Terracotta · Warm Sage · Muted Coral · Warm Rust · Warm Cream · Oatmeal · Warm Camel · Warm Taupe · Mushroom · Warm Chocolate",
    tips: [
      "Warm but muted — think of desert at sunset, not tropical noon.",
      "Dusty warm tones are your signature. Terracotta, warm taupe, muted coral.",
      "Gold jewelry in brushed or matte finishes. Avoid shiny polished gold.",
      "Layer warm neutrals. Camel + olive + cream = your perfect outfit formula.",
    ],
  },
  "True Autumn": {
    descriptor: "pure warm, rich, medium-deep",
    celebs: "Julianne Moore, Bryce Dallas Howard, Sofia Vergara",
    palette: "Pumpkin · Brick Red · Forest Green · Warm Gold · Warm Cream · Warm Oatmeal · Warm Camel · Cinnamon · Warm Brown · Deep Olive",
    tips: [
      "Rich and warm is your lane. The deeper and warmer, the better you look.",
      "Gold jewelry, always. Yellow gold, not rose gold.",
      "Earth tones are your superpower. Olive, rust, chocolate, forest green.",
      "Orange-based reds over blue-based reds. Tomato > cherry.",
    ],
  },
  "Dark Autumn": {
    descriptor: "warm, deep, rich",
    celebs: "Julia Roberts, Olivia Munn, Zendaya",
    palette: "Deep Burgundy · Rust · Dark Forest · Dark Gold · Warm Cream · Warm Stone · Warm Camel · Chocolate Brown · Espresso · Warm Charcoal",
    tips: [
      "Go deep and warm. You can handle intensity that would overwhelm lighter seasons.",
      "Burgundy and oxblood are your power colors.",
      "Gold and bronze jewelry. Rich, warm metals in substantial pieces.",
      "Skip pastels entirely. They'll wash you out.",
    ],
  },
  "Dark Winter": {
    descriptor: "cool, deep, dramatic",
    celebs: "Anne Hathaway, Vanessa Hudgens, Priyanka Chopra",
    palette: "Deep Berry · Icy Pink · Royal Purple · Emerald · Black · Pure White · Cool Charcoal · Cool Dove · Deep Navy · Silver Grey",
    tips: [
      "High contrast is your friend. Dark + bright pops = your formula.",
      "Deep jewel tones are your signature. Emerald, sapphire, amethyst.",
      "Silver or white gold jewelry. Cool-toned metals in bold pieces.",
      "Deep berry lips are your everyday power shade.",
    ],
  },
  "True Winter": {
    descriptor: "pure cool, clear, high-contrast",
    celebs: "Jennifer Connelly, Gemma Chan, Naomi Campbell",
    palette: "True Red · Royal Blue · Emerald · Cool Fuchsia · Pure White · Black · Icy Grey · Cool Navy · Silver · Icy Blue",
    tips: [
      "Bold and clear. No muddiness, no in-between — go for pure, saturated color.",
      "Black is literally your color. Wear it confidently.",
      "True red lipstick with blue undertones — your ultimate power shade.",
      "Silver and platinum jewelry. Nothing warm, nothing muted.",
    ],
  },
  "Bright Winter": {
    descriptor: "cool, vivid, electric",
    celebs: "Megan Fox, Jenna Ortega, Lupita Nyong'o",
    palette: "Hot Pink · Electric Blue · Vivid Magenta · Lime · Pure White · Black · Icy Silver · Cool Charcoal · Icy Pink · Cool Navy",
    tips: [
      "The brighter the better. You can handle neon-adjacent colors other seasons can't.",
      "Fuchsia and electric blue are your signature shades.",
      "Silver and white gold. Cool, bright metallics in modern designs.",
      "Contrast is everything. Dark + bright = your formula.",
    ],
  },
};

const CATEGORY_LABELS = {
  foundation: "Foundation",
  concealer: "Concealer",
  lips: "Lipstick & Gloss",
  lipLiner: "Lip Liner",
  blush: "Blush",
  eyes: "Eyeshadow",
  bronzer: "Bronzer",
  nails: "Nails",
};

const TIER_EMOJIS = { budget: "💰", value: "✨", splurge: "👑" };

/**
 * Generate the welcome email HTML for a given season.
 * @param {string} seasonName - e.g. "Clear Spring"
 * @param {object|null} kvProducts - Products from KV (optional, falls back to static)
 * @returns {object} { subject, previewText, html }
 */
export function generateWelcomeEmail(seasonName, kvProducts = null) {
  const seasonData = seasons[seasonName];
  const meta = SEASON_META[seasonName];
  const shopUrl = getShopUrl(seasonName);
  const { categories } = getProductRecommendations(seasonName);

  if (!seasonData || !meta) {
    return { subject: "", previewText: "", html: "<p>Season not found.</p>" };
  }

  const subject = `Your ${seasonName} shade guide ✨`;
  const previewText = `50+ makeup matches for ${meta.descriptor} coloring.`;

  // Build product sections
  let productHtml = "";
  const categoryOrder = ["foundation", "concealer", "lips", "lipLiner", "blush", "eyes", "bronzer", "nails"];
  const sectionGroups = [
    { heading: "Foundation & Concealer", keys: ["foundation", "concealer"] },
    { heading: "Lips", keys: ["lips", "lipLiner"] },
    { heading: "Cheeks", keys: ["blush"] },
    { heading: "Eyes", keys: ["eyes"] },
    { heading: "Glow", keys: ["bronzer"] },
    { heading: "Nails", keys: ["nails"] },
  ];

  for (const group of sectionGroups) {
    productHtml += `<h3 style="font-family:'Playfair Display',Georgia,serif;font-size:18px;margin:28px 0 12px;color:#1a1a1a;">${group.heading}</h3>\n`;

    for (const catKey of group.keys) {
      const label = CATEGORY_LABELS[catKey] || catKey;
      const staticCat = categories.find((c) => c.key === catKey);
      const kvCat = kvProducts?.[catKey];

      productHtml += `<p style="font-weight:600;margin:16px 0 8px;font-family:'Inter',Helvetica,sans-serif;font-size:14px;color:#1a1a1a;">${label}</p>\n`;

      for (const tier of ["budget", "value", "splurge"]) {
        const emoji = TIER_EMOJIS[tier];
        let product = null;

        // Prefer KV product
        if (kvCat?.[tier]?.[0]) {
          product = kvCat[tier][0];
        } else if (staticCat?.tiers?.[tier]) {
          const p = Array.isArray(staticCat.tiers[tier]) ? staticCat.tiers[tier][0] : staticCat.tiers[tier];
          product = p;
        }

        if (product) {
          const url = product.buy_url || shopUrl;
          productHtml += `<p style="font-family:'Inter',Helvetica,sans-serif;font-size:13px;line-height:1.6;color:#444;margin:4px 0;">${emoji} <strong>${product.brand} ${product.product}</strong> — "${product.shade}" · ${product.price} → <a href="${url}" style="color:#C4A265;text-decoration:underline;">Shop</a></p>\n`;
        }
      }
    }
  }

  // Build avoid colors
  const avoidHtml = seasonData.avoidColorNames
    .map((name, i) => {
      const hex = seasonData.avoidColors[i];
      return `<span style="display:inline-block;margin:4px 8px 4px 0;"><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${hex};vertical-align:middle;margin-right:4px;"></span>${name}</span>`;
    })
    .join(" · ");

  // Build tips
  const tipsHtml = meta.tips
    .map((tip, i) => `<li style="font-family:'Inter',Helvetica,sans-serif;font-size:13px;line-height:1.6;color:#444;margin:6px 0;">${tip}</li>`)
    .join("\n");

  // Palette swatches
  const swatchesHtml = seasonData.bestColors
    .slice(0, 12)
    .map((hex) => `<span style="display:inline-block;width:28px;height:28px;border-radius:50%;background:${hex};margin:3px;box-shadow:0 1px 3px ${hex}30;"></span>`)
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FFFBF7;font-family:'Inter',Helvetica,Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:32px 24px;">

<p style="font-family:'Inter',Helvetica,sans-serif;font-size:14px;color:#444;line-height:1.7;">Hi there —</p>

<p style="font-family:'Playfair Display',Georgia,serif;font-size:24px;font-weight:700;color:#1a1a1a;margin:16px 0 8px;">You're a <span style="color:${seasonData.bestColors[0]};font-style:italic;">${seasonName}</span> ✨</p>

<p style="font-family:'Inter',Helvetica,sans-serif;font-size:14px;color:#444;line-height:1.7;">${seasonData.description}</p>

<hr style="border:none;border-top:1px solid #eee;margin:24px 0;">

<h2 style="font-family:'Playfair Display',Georgia,serif;font-size:20px;color:#1a1a1a;margin:0 0 12px;">Your palette</h2>
<div style="margin:12px 0 8px;">${swatchesHtml}</div>
<p style="font-family:'Inter',Helvetica,sans-serif;font-size:12px;color:#888;">${meta.palette}</p>

<hr style="border:none;border-top:1px solid #eee;margin:24px 0;">

<h2 style="font-family:'Playfair Display',Georgia,serif;font-size:20px;color:#1a1a1a;margin:0 0 8px;">Celebrity style twins</h2>
<p style="font-family:'Inter',Helvetica,sans-serif;font-size:14px;color:#444;">${meta.celebs}</p>
<p style="font-family:'Inter',Helvetica,sans-serif;font-size:12px;color:#888;">Same season = same magic shades.</p>

<hr style="border:none;border-top:1px solid #eee;margin:24px 0;">

<h2 style="font-family:'Playfair Display',Georgia,serif;font-size:20px;color:#1a1a1a;margin:0 0 8px;">Your 50+ matches</h2>
<p style="font-family:'Inter',Helvetica,sans-serif;font-size:13px;color:#888;margin:0 0 16px;">Budget picks for experimenting, best value for staples, splurge for signature pieces.</p>

${productHtml}

<hr style="border:none;border-top:1px solid #eee;margin:24px 0;">

<h2 style="font-family:'Playfair Display',Georgia,serif;font-size:20px;color:#1a1a1a;margin:0 0 8px;">Colors to avoid</h2>
<p style="font-family:'Inter',Helvetica,sans-serif;font-size:13px;color:#444;line-height:2;">${avoidHtml}</p>

<hr style="border:none;border-top:1px solid #eee;margin:24px 0;">

<h2 style="font-family:'Playfair Display',Georgia,serif;font-size:20px;color:#1a1a1a;margin:0 0 12px;">Pro tips for ${seasonName}s</h2>
<ol style="padding-left:20px;margin:0;">${tipsHtml}</ol>

<hr style="border:none;border-top:1px solid #eee;margin:24px 0;">

<h2 style="font-family:'Playfair Display',Georgia,serif;font-size:20px;color:#1a1a1a;margin:0 0 8px;">Share your shade</h2>
<p style="font-family:'Inter',Helvetica,sans-serif;font-size:14px;color:#444;">I'm a ${seasonName} ✨ What's your Shade DNA? → <a href="https://allele.app" style="color:#C4A265;">allele.app</a></p>

<hr style="border:none;border-top:1px solid #eee;margin:24px 0;">

<h2 style="font-family:'Playfair Display',Georgia,serif;font-size:20px;color:#1a1a1a;margin:0 0 8px;">What's next from Allele</h2>
<p style="font-family:'Inter',Helvetica,sans-serif;font-size:14px;color:#444;line-height:1.7;">You've unlocked your Shade DNA. Ready to discover the rest of you?</p>
<p style="font-family:'Inter',Helvetica,sans-serif;font-size:14px;color:#444;line-height:1.7;"><strong>Vibe DNA</strong> — Find your aesthetic archetype in 8 questions. Free, 2 minutes.</p>
<p><a href="https://allele.app/vibe" style="display:inline-block;padding:12px 28px;background:#1a1a1a;color:white;text-decoration:none;border-radius:24px;font-family:'Inter',Helvetica,sans-serif;font-size:13px;font-weight:500;letter-spacing:0.05em;">Take Vibe DNA →</a></p>

<hr style="border:none;border-top:1px solid #eee;margin:24px 0;">

<p style="font-family:'Inter',Helvetica,sans-serif;font-size:11px;color:#aaa;line-height:1.6;">This guide includes affiliate links. When you shop through them, we may earn a small commission at no extra cost to you. We only recommend products we'd actually wear.</p>
<p style="font-family:'Inter',Helvetica,sans-serif;font-size:11px;color:#aaa;">Allele · <a href="https://allele.app" style="color:#aaa;">allele.app</a></p>

</div>
</body>
</html>`;

  return { subject, previewText, html };
}
