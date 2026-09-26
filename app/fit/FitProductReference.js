"use client";

import { trackEvent } from "@/lib/analytics";
import { getFitProductEmbed } from "@/lib/fitProductEmbeds.mjs";

// Display the provider's complete component, not a copied retailer image.
// This is interactive content: never place it inside a quiz-answer button.
export function FitProductEmbed({ product, priority = false }) {
  if (!product) return null;
  const embed = getFitProductEmbed(product);
  return <div className="fit-product-embed">
    {embed ? <iframe key={embed.embedUrl}
      title={`${product.brand} ${product.name} — ${product.wash.split(" · ")[0]} · ShopMy affiliate product`}
      src={embed.embedUrl} loading={priority ? "eager" : "lazy"} referrerPolicy="origin"
      style={{ width: "100%", minHeight: 340, border: "none" }}
    /> : <div className="fit-retailer-photo-fallback">
      <strong>{product.brand}</strong><span>{product.name}</span>
      <small>See the product photo at the retailer.</small>
    </div>}
  </div>;
}

export function FitAffiliateDisclosure() {
  return <p className="fit-example-disclosure">ShopMy product cards contain affiliate links. Allele may earn a commission if you buy, at no extra cost to you. <a href="/disclosure">How links work</a></p>;
}

export function FitProductReference({ product, source = "quiz_example" }) {
  if (!product) return null;
  return <div className="fit-example-reference">
    <p><span>{product.brand} · {product.wash.split(" · ")[0]}</span><strong>{product.name}</strong></p>
    <a href={product.sourceUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("shop_click", { quiz: "fit_dna", category: "jeans", product_id: product.id, brand: product.brand, product_name: product.name, destination: source })}>Product details <span aria-hidden="true">↗</span><span className="fit-sr-only"> at {product.brand}: {product.name} (opens a new tab)</span></a>
    <small className="fit-source-caption">Direct brand source · useful if the ShopMy card cannot load.</small>
  </div>;
}
