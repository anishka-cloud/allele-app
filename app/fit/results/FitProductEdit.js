"use client";

import { trackEvent } from "@/lib/analytics";
import { getFitAmazonUrl, recommendFitProducts } from "@/lib/fitProducts.mjs";
import { getFitAffiliateUrl, getFitProductEmbed } from "@/lib/fitProductEmbeds.mjs";
import { FitProductEmbed } from "@/app/fit/FitProductReference";

function ProductPhoto({ product }) {
  return <FitProductEmbed product={product}/>;
}

export default function FitProductEdit({ result, measurements }) {
  const products = recommendFitProducts(result, measurements);
  const recordClick = (product, destination) => trackEvent("shop_click", { quiz: "fit_dna", category: "jeans", product_id: product.id, brand: product.brand, product_name: product.name, destination, rise: result.rise, leg: result.leg });
  return <section className="fit-product-edit" id="jeans" aria-labelledby="fit-jeans-title">
    <div className="fit-edit-heading"><div><p>Your denim shortlist</p><h2 id="fit-jeans-title">Real jeans. A reason for each.</h2></div><p>A small edit based on your answers and the brands’ product details. Compare the tradeoffs, then try the pair on your terms.</p></div>
    <p className="fit-edit-disclosure">ShopMy cards, “View at” buttons and Amazon searches contain affiliate links: Allele may earn a commission at no extra cost to you. As an Amazon Associate, Allele earns from qualifying purchases. Source links in the details are non-affiliate. <a href="/disclosure">How links work</a></p>
    {products.length ? <div className="fit-product-grid">{products.map((product) => <article className="fit-product-card" key={product.id}>
      <ProductPhoto product={product}/>
      <div className="fit-product-body">
        <p className="fit-product-brand">{product.brand}</p><h3>{product.name}</h3><p className="fit-product-wash">{product.wash.split(" · ")[0]}</p>
        <p className="fit-product-match">{product.matchLabel}</p>
        <div className="fit-product-reason"><h4>Why try it</h4><p>{product.reasons.slice(0, 2).join(" ")}</p></div>
        <div className="fit-product-tradeoff"><h4>Check this first</h4><p>{product.tradeoffs.length ? product.tradeoffs.join(" ") : product.caution}</p></div>
        <details className="fit-product-evidence"><summary>Fabric, measurements & source <span aria-hidden="true">+</span></summary>
          <ul>{product.facts.map(fact => <li key={fact}>{fact}</li>)}</ul>
          <p>Brand reference rise: {product.riseIn}″{product.referenceSize ? ` in size ${product.referenceSize}` : ""}. Measurements vary by size.</p>
          <p>{product.lengthNote}</p><p>{product.caution}</p>
          <p>Facts checked September 24, 2026 for {product.wash}. Prices, stock and other washes can change.</p>
          <a href={product.sourceUrl} target="_blank" rel="noopener noreferrer" onClick={() => recordClick(product, "brand_source")}>Read the brand’s product details</a>
        </details>
        <div className="fit-product-links">
          <a className="fit-product-primary" href={getFitAffiliateUrl(product) || product.sourceUrl} target="_blank" rel={getFitAffiliateUrl(product) ? "sponsored noopener noreferrer" : "noopener noreferrer"} referrerPolicy="origin" onClick={() => recordClick(product, getFitAffiliateUrl(product) ? "shopmy" : "brand")}>View at {product.brand} <span aria-hidden="true">↗</span></a>
          <small className="fit-link-selection">{getFitProductEmbed(product)?.selectionNote || "Choose your size and wash at the retailer."}</small>
          {getFitAmazonUrl(product) && <a className="fit-product-amazon" href={getFitAmazonUrl(product)} target="_blank" rel="sponsored noopener noreferrer" onClick={() => recordClick(product, "amazon_search")}>Search this style on Amazon ↗ <small>Affiliate search · compare the wash and seller</small></a>}
        </div>
      </div>
    </article>)}</div> : <p>We don’t have a sourced jean in this cut yet. Use your fit notes to compare a pair you already own or a retailer’s size chart.</p>}
    <p className="fit-edit-footnote">No fit guarantee or size prediction. Check price, available sizes, fabric and returns at the retailer. Already own a pair with these details? Try it against your fit notes first.</p>
  </section>;
}
