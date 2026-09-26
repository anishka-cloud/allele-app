import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fitProducts } from "../lib/fitProducts.mjs";
import { fitStyleExampleIds } from "../lib/fitStyleExamples.mjs";
import { fitProductEmbeds, getFitProductEmbed } from "../lib/fitProductEmbeds.mjs";

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
  assert.equal(getFitProductEmbed({ id: "levis-501", sourceUrl: "https://example.test/different-sku" }), null);
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
