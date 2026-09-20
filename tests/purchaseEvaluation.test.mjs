import test from "node:test";
import assert from "node:assert/strict";
import { evaluatePurchase } from "../lib/purchaseEvaluation.mjs";

const blush = {
  category: "makeup",
  brand: "Saved brand",
  name: "Cream blush",
  variant: "Muted rosewood",
  finishOrFit: "Creamy natural finish",
  works: "The muted color blends into my skin and never looks dry.",
  doesNotWork: "It fades by late afternoon.",
};

test("flags a close duplicate as a probable skip", () => {
  const result = evaluatePurchase([blush], {
    category: "makeup",
    name: "New cream blush",
    variant: "Muted rosewood",
    finishOrFit: "Creamy natural finish",
  });

  assert.equal(result.status, "skip");
  assert.equal(result.confidence, "medium");
  assert.match(result.headline, /already own/i);
});

test("supports a beginner without pretending to know their preferences", () => {
  const result = evaluatePurchase([], {
    category: "clothing",
    name: "Wide-leg trousers",
    finishOrFit: "Relaxed",
  });

  assert.equal(result.status, "learn-more");
  assert.match(result.summary, /not saved a comparable item/i);
});

test("marks a candidate with one known-good trait and adequate facts for consideration", () => {
  const result = evaluatePurchase([blush], {
    category: "makeup",
    name: "Powder blush",
    variant: "Warm coral",
    finishOrFit: "Creamy natural finish",
    facts: "Fragrance-free formula with a natural finish.",
    sourceUrl: "https://example.com/product",
  });

  assert.equal(result.status, "consider");
  assert.equal(result.confidence, "medium");
  assert.equal(result.missing.length, 0);
});

test("keeps a weakly described candidate in learn-more state", () => {
  const result = evaluatePurchase([blush], {
    category: "makeup",
    name: "Unknown blush",
  });

  assert.equal(result.status, "learn-more");
  assert.ok(result.missing.includes("a traceable product source"));
  assert.match(result.nextStep, /guesswork/i);
});

test("recognizes the exact same named product even when attributes are blank", () => {
  const result = evaluatePurchase([blush], {
    category: "makeup",
    brand: "Saved brand",
    name: "Cream blush",
    motivation: "Replace the same everyday color.",
  });

  assert.equal(result.status, "skip");
  assert.equal(result.confidence, "high");
  assert.match(result.signals[0], /replace the same everyday color/i);
  assert.match(result.signals[1], /same named product/i);
});

test("treats repeating a documented miss as a reason to skip", () => {
  const result = evaluatePurchase(
    [{ ...blush, outcome: "miss" }],
    {
      category: "makeup",
      name: "New cream blush",
      variant: "Muted rosewood",
      finishOrFit: "Creamy natural finish",
    },
  );

  assert.equal(result.status, "skip");
  assert.match(result.headline, /already missed/i);
  assert.match(result.ownedEvidence[0], /a miss/i);
});
