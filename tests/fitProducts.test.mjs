import test from "node:test";
import assert from "node:assert/strict";
import { calculateFitDna } from "../lib/fitDna.mjs";
import { fitProducts, getFitAmazonUrl, recommendFitProducts } from "../lib/fitProducts.mjs";

const answers = { length: "standard", torso: "balanced", waist_hip: "defined", fit_issue: "waist_gap", rise: "high", silhouette: "straight", goal: "define_waist", shoes: "sneakers", fabric: "structured" };

test("waist gaping prioritizes the sourced curvy pattern over a standard straight jean", () => {
  const products = recommendFitProducts(calculateFitDna(answers));
  assert.equal(products[0].id, "af-curve-love-90s");
  assert.match(products[0].reasons[0], /waist gap/);
  for (const product of products.filter(p => !p.curvy)) assert.match(product.tradeoffs.join(" "), /not listed as a curvy cut/);
});

test("different rises and fabrics remain explicit tradeoffs across every supported result", () => {
  for (const rise of ["low", "mid", "high"]) for (const silhouette of ["slim", "straight", "wide", "bootcut", "barrel"]) for (const fabric of ["rigid", "structured", "stretch"]) {
    const result = calculateFitDna({ ...answers, rise, silhouette, fabric, fit_issue: "predictable", goal: "fit" });
    const picks = recommendFitProducts(result);
    assert.ok(picks.length > 0 && picks.length <= 3);
    assert.equal(new Set(picks.map(p=>p.id)).size, picks.length);
    for (const pick of picks) {
      assert.ok(pick.legs.includes(result.leg));
      if (pick.rise !== result.rise) assert.ok(pick.tradeoffs.some(t => t.includes(`This is a ${pick.rise} rise`)));
      if (pick.fabric !== result.fabric) assert.ok(pick.tradeoffs.some(t => t.startsWith("This version uses")));
    }
  }
});

test("a wide hem is never presented as evidence of extra thigh room", () => {
  const result = calculateFitDna({ ...answers, fit_issue: "hip_thigh_pull", silhouette: "wide", fabric: "rigid", goal: "hip_room" });
  const pick = recommendFitProducts(result).find(p => p.id === "levis-ribcage-wide");
  assert.match(pick.tradeoffs.join(" "), /may repeat the hip or thigh pulling/);
  assert.notEqual(pick.matchLabel, "Cut, rise & fabric align");
});

test("measurement comparisons are consistent in inches and centimeters", () => {
  const result = calculateFitDna(answers);
  const inch = recommendFitProducts(result, { unit: "in", inseam: "29.5", frontRise: "8" });
  const cm = recommendFitProducts(result, { unit: "cm", inseam: "74.93", frontRise: "20.32" });
  assert.deepEqual(inch.map(p => [p.id,p.score]), cm.map(p => [p.id,p.score]));
  assert.match(cm[0].lengthNote, /74.93 cm/);
  assert.ok(cm[0].tradeoffs.some(t => t.includes("20.32 cm")));
});

test("each product keeps traceable facts and Amazon search attribution without fabricated trackers", () => {
  for (const product of fitProducts) {
    assert.ok(["www.levi.com", "www.abercrombie.com", "www.madewell.com"].includes(new URL(product.sourceUrl).hostname));
    assert.ok(!product.imageUrl.startsWith("/fit/visuals/"), "generated illustrations are never retailer photos");
    assert.ok(product.checkedOn && product.wash && product.facts.length);
    assert.ok(!("price" in product) && !("rating" in product));
    const url = getFitAmazonUrl(product);
    if (!product.amazonQuery) { assert.equal(url, null); continue; }
    const parsed = new URL(url);
    assert.equal(parsed.hostname, "www.amazon.com");
    assert.equal(parsed.pathname, "/s");
    assert.equal(parsed.searchParams.get("tag"), "anishkanawa00-20");
    assert.equal(parsed.searchParams.get("k"), product.amazonQuery);
    assert.ok(product.amazonQuery.includes(product.name.split(" ")[0]));
  }
});
