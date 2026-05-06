/**
 * Welcome email HTML generator for Vibe DNA.
 *
 * Reads archetype data from vibeArchetypes.js and product recommendations
 * from vibeProducts.js, generates a fully populated email body.
 *
 * NOTE: Vibe affiliate URLs are not yet wired in vibeProducts.js. Until each
 * product has a buy_url field, every "Shop" link falls back to the default
 * ShopMy URL below.
 */
import { archetypes } from "./vibeArchetypes";
import { vibeProducts, VIBE_CATEGORIES, VIBE_TIER_META } from "./vibeProducts";

const FALLBACK_VIBE_URL = "https://shopmy.us/shop/nish";

/**
 * Generate the welcome email HTML for a given Vibe DNA archetype.
 * @param {string} archetypeCode - e.g. "CG", "COG", "OM"
 * @param {object|null} kvProducts - Reserved for future KV hydration; currently unused.
 * @returns {object} { subject, previewText, html }
 */
export function generateVibeWelcomeEmail(archetypeCode, kvProducts = null) {
  const archetype = archetypes[archetypeCode];
  const products = vibeProducts[archetypeCode];

  if (!archetype) {
    return { subject: "", previewText: "", html: "<p>Archetype not found.</p>" };
  }
  if (!products) {
    return { subject: "", previewText: "", html: "<p>Products not configured for this archetype.</p>" };
  }

  const subject = `Your ${archetype.name} style guide`;
  const previewText = `${archetype.pills.join(", ")}. 24 product matches across 8 categories.`;

  const moodboardHtml = archetype.moodboard
    .map((m) => `<span style="display:inline-block;font-family:'Inter',Helvetica,sans-serif;font-size:13px;color:#444;margin:4px 0;">${m}</span>`)
    .join('<span style="color:#C4A265;margin:0 8px;">·</span>');

  let productHtml = "";
  for (const cat of VIBE_CATEGORIES) {
    const catProducts = products[cat.key];
    if (!catProducts) continue;

    productHtml += `<h3 style="font-family:'Playfair Display',Georgia,serif;font-size:17px;margin:28px 0 4px;color:#1a1a1a;">${cat.label}</h3>\n`;
    productHtml += `<p style="font-family:'Inter',Helvetica,sans-serif;font-size:12px;color:#888;margin:0 0 12px;font-style:italic;">${cat.subtitle}</p>\n`;

    for (const tier of ["budget", "value", "splurge"]) {
      const product = catProducts[tier];
      if (!product) continue;

      const url = product.buy_url || FALLBACK_VIBE_URL;
      const meta = VIBE_TIER_META[tier];
      const tierLabel = meta.label;
      const tierColor = meta.accent;

      productHtml += `<p style="font-family:'Inter',Helvetica,sans-serif;font-size:13px;line-height:1.6;color:#444;margin:6px 0;"><span style="display:inline-block;font-size:9px;letter-spacing:0.15em;color:${tierColor};font-weight:600;min-width:75px;">${tierLabel}</span> <strong>${product.brand} ${product.product}</strong> · "${product.shade}" · $${product.price} → <a href="${url}" style="color:#C4A265;text-decoration:underline;">Shop</a></p>\n`;
    }
  }

  let tipsHtml = "";
  for (const cat of VIBE_CATEGORIES) {
    const tip = archetype.proTips?.[cat.key];
    if (!tip) continue;
    tipsHtml += `<li style="font-family:'Inter',Helvetica,sans-serif;font-size:13px;line-height:1.6;color:#444;margin:8px 0;"><strong style="color:#1a1a1a;">${cat.label}.</strong> ${tip}</li>\n`;
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FFFBF7;font-family:'Inter',Helvetica,Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:32px 24px;">

<p style="font-family:'Inter',Helvetica,sans-serif;font-size:14px;color:#444;line-height:1.7;">Hi there,</p>

<p style="font-family:'Playfair Display',Georgia,serif;font-size:24px;font-weight:700;color:#1a1a1a;margin:16px 0 8px;">You're <span style="color:${archetype.accentColor};font-style:italic;">${archetype.name}</span>.</p>

<p style="font-family:'Inter',Helvetica,sans-serif;font-size:14px;color:#444;line-height:1.7;">${archetype.description}</p>

<p style="font-family:'Inter',Helvetica,sans-serif;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:${archetype.accentColor};font-weight:600;margin-top:16px;">${archetype.pills.join(" · ")}</p>

<hr style="border:none;border-top:1px solid #eee;margin:24px 0;">

<h2 style="font-family:'Playfair Display',Georgia,serif;font-size:20px;color:#1a1a1a;margin:0 0 12px;">Your moodboard</h2>
<p style="font-family:'Inter',Helvetica,sans-serif;font-size:13px;color:#444;line-height:1.9;">${moodboardHtml}</p>

<hr style="border:none;border-top:1px solid #eee;margin:24px 0;">

<h2 style="font-family:'Playfair Display',Georgia,serif;font-size:20px;color:#1a1a1a;margin:0 0 8px;">Style twins</h2>
<p style="font-family:'Inter',Helvetica,sans-serif;font-size:14px;color:#444;">${archetype.celebrities.join(", ")}</p>
<p style="font-family:'Inter',Helvetica,sans-serif;font-size:12px;color:#888;">Same archetype, same instinct.</p>

<hr style="border:none;border-top:1px solid #eee;margin:24px 0;">

<h2 style="font-family:'Playfair Display',Georgia,serif;font-size:20px;color:#1a1a1a;margin:0 0 8px;">Your 24 matches</h2>
<p style="font-family:'Inter',Helvetica,sans-serif;font-size:13px;color:#888;margin:0 0 16px;">Budget picks for experimenting, best value for staples, splurge for signature pieces.</p>

${productHtml}

<hr style="border:none;border-top:1px solid #eee;margin:24px 0;">

<h2 style="font-family:'Playfair Display',Georgia,serif;font-size:20px;color:#1a1a1a;margin:0 0 12px;">Pro tips for ${archetype.name}</h2>
<ol style="padding-left:20px;margin:0;">${tipsHtml}</ol>

<hr style="border:none;border-top:1px solid #eee;margin:24px 0;">

<h2 style="font-family:'Playfair Display',Georgia,serif;font-size:20px;color:#1a1a1a;margin:0 0 8px;">Share your vibe</h2>
<p style="font-family:'Inter',Helvetica,sans-serif;font-size:14px;color:#444;">I'm ${archetype.name}. Found my vibe at <a href="https://allele.app/vibe" style="color:#C4A265;">allele.app/vibe</a>.</p>

<hr style="border:none;border-top:1px solid #eee;margin:24px 0;">

<h2 style="font-family:'Playfair Display',Georgia,serif;font-size:20px;color:#1a1a1a;margin:0 0 8px;">What's next from Allele</h2>
<p style="font-family:'Inter',Helvetica,sans-serif;font-size:14px;color:#444;line-height:1.7;">You've unlocked your Vibe DNA. Want to know your color season too?</p>
<p style="font-family:'Inter',Helvetica,sans-serif;font-size:14px;color:#444;line-height:1.7;"><strong>Shade DNA.</strong> Find your color season in 12 questions. Free, 2 minutes.</p>
<p><a href="https://allele.app" style="display:inline-block;padding:12px 28px;background:#1a1a1a;color:white;text-decoration:none;border-radius:24px;font-family:'Inter',Helvetica,sans-serif;font-size:13px;font-weight:500;letter-spacing:0.05em;">Take Shade DNA →</a></p>

<hr style="border:none;border-top:1px solid #eee;margin:24px 0;">

<p style="font-family:'Inter',Helvetica,sans-serif;font-size:11px;color:#aaa;line-height:1.6;">This guide includes affiliate links. When you shop through them, we may earn a small commission at no extra cost to you. Every product is chosen because it actually works for your archetype.</p>
<p style="font-family:'Inter',Helvetica,sans-serif;font-size:11px;color:#aaa;">Allele · <a href="https://allele.app" style="color:#aaa;">allele.app</a></p>

</div>
</body>
</html>`;

  return { subject, previewText, html };
}
