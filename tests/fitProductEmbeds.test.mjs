import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fitProducts } from "../lib/fitProducts.mjs";
import { fitStyleExampleIds } from "../lib/fitStyleExamples.mjs";
import { fitProductEmbeds, getFitProductEmbed, getFitAffiliateUrl } from "../lib/fitProductEmbeds.mjs";

test("every recommendation has a matching provider-issued product card", () => {
  assert.equal(fitProducts.length, 9);
  for (const product of fitProducts) assert.ok(getFitProductEmbed(product), product.id);
});

test("all five quiz silhouettes have provider-issued embeds tied to the sourced SKU", () => {
  for (const id of Object.values(fitStyleExampleIds)) {
    const product = fitProducts.find(item => item.id === id);
    assert.ok(getFitProductEmbed(product), id);
  }
  const ids = new Set();
  for (const [id, embed] of Object.entries(fitProductEmbeds)) {
    const product = fitProducts.find(item => item.id === id);
    const url = new URL(embed.embedUrl);
    assert.ok(product.sourceUrl.includes(embed.sku), id);
    assert.equal(url.origin, "https://shopmy.us");
    assert.equal(url.pathname, `/collections/embed/${embed.collectionId}`);
    assert.equal(url.search, "");
    assert.match(embed.pinId, /^\d+$/);
    assert.equal(ids.has(embed.collectionId), false);
    ids.add(embed.collectionId);
  }
});

test("missing or mismatched embed records never show another product", () => {
  assert.equal(getFitProductEmbed(null), null);
  assert.equal(getFitProductEmbed({ id: "not-in-catalog" }), null);
  assert.equal(getFitProductEmbed({ id: "levis-501" }), null);
  assert.equal(getFitProductEmbed({ id: "levis-501", sourceUrl: "https://example.test/different-sku" }), null);
});

test("all nine primary Fit links retain issued attribution and the sourced destination", () => {
  for (const product of fitProducts) {
    const embed = getFitProductEmbed(product);
    const link = new URL(getFitAffiliateUrl(product));
    const attribution = link.searchParams.get("u1") || link.searchParams.get("sid") || link.searchParams.get("subId1");
    assert.ok(attribution.startsWith(`user-267437-pin-${embed.pinId}-`), product.id);
    const destination = link.searchParams.get("murl") || link.searchParams.get("url") || link.searchParams.get("u");
    const target = new URL(destination);
    const source = new URL(product.sourceUrl);
    if (product.id === "madewell-barrel") {
      assert.equal(target.searchParams.get("size"), "23");
      assert.ok(embed.selectionNote.includes("size 23"));
      target.searchParams.delete("size");
    }
    // The issued Abercrombie link drops navigation-only context, not its wash.
    if (product.id === "af-curve-love-90s") {
      for (const key of ["categoryId", "faceout", "gridProductPosition", "pagefm", "prodvm"]) source.searchParams.delete(key);
    }
    assert.equal(target.href, source.href, product.id);
    assert.equal(embed.affiliateCheckedOn, "2026-09-25");
    if (link.hostname === "click.linksynergy.com") assert.equal(link.searchParams.get("id"), "8yaPBDQV8ls");
    else if (link.hostname === "www.anrdoezrs.net") assert.equal(link.pathname, "/click-100149615-14488151");
    else if (link.hostname === "imp.i254217.net") assert.equal(link.pathname, "/c/2340682/804613/11415");
    else assert.fail(`Unexpected tracker: ${link.hostname}`);
  }
  assert.equal(getFitAffiliateUrl(null), null);
});

test("Fit primary buttons use the registry with sponsored markup and a source fallback", () => {
  const component = readFileSync(new URL("../app/fit/results/FitProductEdit.js", import.meta.url), "utf8");
  assert.ok(component.includes("getFitAffiliateUrl(product) || product.sourceUrl"));
  assert.ok(component.includes('"sponsored noopener noreferrer"'));
  assert.ok(component.includes('referrerPolicy="origin"'));
});

test("public product visuals have no raw retailer-image or preview-flag path", () => {
  const component = readFileSync(new URL("../app/fit/FitProductReference.js", import.meta.url), "utf8");
  assert.ok(component.includes("<iframe"));
  assert.ok(component.includes('referrerPolicy="origin"'));
  assert.ok(component.includes("minHeight: 340"));
  assert.doesNotMatch(component, /product\.imageUrl|NEXT_PUBLIC_FIT_RETAILER_IMAGE_PREVIEW|dangerouslySetInnerHTML/);
  const choiceVisuals = readFileSync(new URL("../app/fit/FitVisuals.js", import.meta.url), "utf8");
  assert.ok(choiceVisuals.includes('if (questionId === "silhouette") return null'));
});
