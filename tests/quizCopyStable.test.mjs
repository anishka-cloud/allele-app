import test from "node:test";
import assert from "node:assert/strict";
import { QUIZ, scoreFromAnswers, topSeasons } from "../lib/handoffQuiz.js";

// Question wording can change for clarity; the answer keys, their order and
// the evidence weights are what drive scoring, so they must not.
const LOCKED = [{"evidence":2,"keys":["cool","warm","neutral","olive"]},{"evidence":2,"keys":["cool","warm","olive","olive"]},{"evidence":2,"keys":["fdn-cool","fdn-warm","fdn-depth-off","fdn-skip"]},{"evidence":2,"keys":["deep","medium","light","fair"]},{"evidence":2,"keys":["cool-light","warm-light","deep","neutral"]},{"evidence":2,"keys":["cool-bright","warm","cool-soft","deep"]},{"evidence":2,"keys":["high-contrast","low-contrast","medium","dramatic"]},{"evidence":2,"keys":["cool","warm-bright","warm","neutral"]},{"evidence":2,"keys":["warm-light","cool","warm-deep","cool-deep"]},{"evidence":2,"keys":["cool-bright","cool-soft","warm-deep","muted"]},{"evidence":0,"keys":["priority","priority","priority","priority"]},{"evidence":0.5,"keys":["spring","summer","autumn","winter"]}];

test("question rewrites keep every answer key, its order and evidence weight", () => {
  assert.equal(QUIZ.length, LOCKED.length);
  QUIZ.forEach((q, i) => {
    assert.equal(q.evidence, LOCKED[i].evidence, `question ${i + 1} evidence`);
    assert.deepEqual(q.options.map(o => o.key), LOCKED[i].keys, `question ${i + 1} keys`);
  });
});

test("a warm, deep, muted answer set still lands Dark Autumn", () => {
  const picks = [1, 2, 1, 0, 2, 3, 3, 2, 2, 2, 3, 2];
  const answers = QUIZ.map((q, i) => ({ ...q.options[picks[i]], evidence: q.evidence }));
  assert.equal(topSeasons(scoreFromAnswers(answers))[0].name, "Dark Autumn");
});

test("the depth question no longer claims it has no effect on the season", () => {
  assert.doesNotMatch(QUIZ[3].sub, /does not affect your colou?r season/i);
});
