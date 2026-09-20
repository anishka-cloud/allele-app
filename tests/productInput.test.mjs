import test from "node:test";
import assert from "node:assert/strict";
import { parseProductEntry } from "../lib/productInput.mjs";

test("keeps a typed product name as the product name", () => {
  assert.deepEqual(parseProductEntry("  Soft Pinch Liquid Blush  "), {
    kind: "name",
    name: "Soft Pinch Liquid Blush",
    sourceUrl: "",
    sourceHost: "",
  });
});

test("drafts a readable name and records the source from a product link", () => {
  const parsed = parseProductEntry(
    "https://www.example.com/products/soft-pinch-liquid-blush-P97989778?color=rose",
  );

  assert.equal(parsed.kind, "url");
  assert.equal(parsed.name, "Soft Pinch Liquid Blush");
  assert.equal(parsed.sourceHost, "example.com");
  assert.match(parsed.sourceUrl, /^https:\/\/www\.example\.com\/products\//);
});

test("does not pretend an Amazon product ID is a product name", () => {
  const parsed = parseProductEntry("https://www.amazon.com/dp/B0ABC12345");

  assert.equal(parsed.kind, "url");
  assert.equal(parsed.name, "");
  assert.equal(parsed.sourceHost, "amazon.com");
});

test("rejects non-web protocols as product links", () => {
  const parsed = parseProductEntry("javascript:alert(1)");

  assert.equal(parsed.kind, "name");
  assert.equal(parsed.sourceUrl, "");
});
