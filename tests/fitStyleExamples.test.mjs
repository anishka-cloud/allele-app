import test from "node:test";
import assert from "node:assert/strict";
import { fitQuestions } from "../lib/fitDna.mjs";
import { fitProducts } from "../lib/fitProducts.mjs";
import { canDisplayFitProductPhoto, fitStyleExampleIds, getFitStyleExample } from "../lib/fitStyleExamples.mjs";

test("every named silhouette has a real, correctly linked product example", () => {
  const shapes = fitQuestions.find(question => question.id === "silhouette").options.filter(option => option.value !== "choose");
  assert.equal(shapes.length, 5);
  for (const { value } of shapes) {
    const example = getFitStyleExample(value);
    assert.ok(example);
    assert.strictEqual(example, fitProducts.find(product => product.id === fitStyleExampleIds[value]));
    assert.ok(example.legs.includes(value === "slim" ? "slim_straight" : value));
    assert.ok(example.imageUrl.startsWith("https://"));
    assert.ok(example.sourceUrl.startsWith("https://"));
    assert.ok(example.brand && example.name && example.wash && example.checkedOn);
  }
});

test("unknown answers do not silently display a different product", () => {
  assert.equal(getFitStyleExample("choose"), null);
  assert.equal(getFitStyleExample("unknown"), null);
  assert.equal(getFitStyleExample("slim_straight"), getFitStyleExample("slim"));
});

test("public builds do not treat retailer photo URLs as reuse permission", () => {
  for (const product of fitProducts) {
    assert.equal(canDisplayFitProductPhoto(product), false);
    assert.equal(canDisplayFitProductPhoto(product, { localPreview: true }), true);
    assert.equal(canDisplayFitProductPhoto(product, { localPreview: "false" }), false);
  }
});

test("photo approval must include evidence for the exact image", () => {
  const product = getFitStyleExample("straight");
  assert.equal(canDisplayFitProductPhoto({ ...product, imagePermission: { status: "approved" } }), false);
  assert.equal(canDisplayFitProductPhoto({ ...product, imagePermission: { status: "approved", imageUrl: product.imageUrl, evidence: " " } }), false);
  assert.equal(canDisplayFitProductPhoto({ ...product, imagePermission: { status: "approved", imageUrl: "https://example.test/a-different-photo.jpg", evidence: "test fixture permission" } }), false);
  assert.equal(canDisplayFitProductPhoto({ ...product, imagePermission: { status: "approved", imageUrl: product.imageUrl, evidence: "test fixture permission" } }), true);
});
