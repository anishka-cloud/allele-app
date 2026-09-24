import test from "node:test";
import assert from "node:assert/strict";
import { narrowingState, resultCertainty, scoreFromAnswers } from "../lib/handoffQuiz.js";

test("an unanswered quiz starts at zero rather than pretending it has evidence", () => {
  const score = scoreFromAnswers([]);
  assert.equal(score.answered, 0);
  assert.equal(narrowingState(score, []).label, "Ready when you are");
});

test("shopping priority routes the result without changing color axes", () => {
  const score = scoreFromAnswers([{ key: "priority", priority: "foundation", evidence: 0 }]);
  assert.equal(score.priority, "foundation");
  assert.equal(score.undertone, 0);
  assert.equal(score.depth, 0);
  assert.equal(score.chroma, 0);
});

test("result certainty uses honest qualitative language", () => {
  const close = resultCertainty([
    { name: "Soft Autumn", distance: 0.3 },
    { name: "Soft Summer", distance: 0.34 },
  ]);
  const strong = resultCertainty([
    { name: "True Autumn", distance: 0.2 },
    { name: "True Spring", distance: 0.7 },
  ]);

  assert.equal(close.label, "close call");
  assert.match(close.detail, /Soft Summer/);
  assert.equal(strong.label, "strongest fit");
});
