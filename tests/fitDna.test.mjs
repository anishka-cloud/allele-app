import test from "node:test";
import assert from "node:assert/strict";
import {
  answersFromSearchParams,
  answersToSearchParams,
  buildFitNotes,
  calculateFitDna,
  scoreLeg,
  scoreRise,
} from "../lib/fitDna.mjs";

test("defined waist, waist gap, high-rise and straight preferences produce High + Straight", () => {
  const result = calculateFitDna({
    length: "standard",
    torso: "balanced",
    waist_hip: "defined",
    fit_issue: "waist_gap",
    rise: "high",
    silhouette: "straight",
    goal: "define_waist",
    shoes: "sneakers",
    fabric: "structured",
  });

  assert.equal(result.rise, "high");
  assert.equal(result.leg, "straight");
});

test("hip and thigh pulling plus wide preference and room goal produce Wide", () => {
  assert.equal(
    scoreLeg({
      waist_hip: "balanced",
      fit_issue: "hip_thigh_pull",
      silhouette: "wide",
      goal: "hip_room",
    }),
    "wide"
  );
});

test("no silhouette preference still returns a deterministic recommendation", () => {
  const answers = { silhouette: "choose", waist_hip: "unsure", goal: "fit", fit_issue: "predictable" };
  assert.equal(scoreLeg(answers), "straight");
  assert.equal(scoreLeg(answers), scoreLeg(answers));
});

test("explicit preference outweighs weaker proportion signals", () => {
  assert.equal(
    scoreRise({ rise: "low", torso: "short", goal: "fit", fit_issue: "predictable" }),
    "low"
  );
});

test("rise and leg ties consistently use Mid and Straight", () => {
  assert.equal(scoreRise({ rise: "unsure", torso: "balanced", fit_issue: "waist_gap" }), "mid");
  assert.equal(scoreLeg({ silhouette: "choose", waist_hip: "defined", goal: "fit" }), "straight");
});

test("answer query parameters round-trip without inventing values", () => {
  const original = {
    length: "petite",
    torso: "short",
    waist_hip: "defined",
    fit_issue: "length",
    rise: "mid",
    silhouette: "bootcut",
    goal: "longer_legs",
    shoes: "flats",
    fabric: "rigid",
  };
  const params = answersToSearchParams(original);
  params.set("unknown", "ignored");
  assert.deepEqual(answersFromSearchParams(params), original);
});

test("optional measurements appear in the private shopping note", () => {
  const result = calculateFitDna({
    length: "standard",
    fit_issue: "predictable",
    rise: "mid",
    silhouette: "straight",
    goal: "fit",
    shoes: "sneakers",
    fabric: "structured",
  });
  const note = buildFitNotes(result, { unit: "in", waist: "28", hip: "40", inseam: "29" });
  assert.match(note, /Natural waist: 28 in/);
  assert.match(note, /Full hip \/ seat: 40 in/);
  assert.match(note, /Best-fitting inseam: 29 in/);
  assert.doesNotMatch(note, /body type/i);
});
