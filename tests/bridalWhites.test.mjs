import test from "node:test";
import assert from "node:assert/strict";
import { BRIDAL_WHITES, bridalWhiteFor } from "../lib/bridalWhites.js";
import { SEASONS } from "../lib/handoffSeasons.js";

test("every season family has bridal white guidance", () => {
  for (const s of Object.values(SEASONS)) {
    const w = bridalWhiteFor(s.family);
    assert.ok(w, `${s.name} (${s.family}) has guidance`);
    assert.ok(w.name && w.ask && w.metal && w.note);
    assert.equal(w.chips.length, 3);
  }
});

test("bridal copy stays a starting point, not a promise", () => {
  for (const w of Object.values(BRIDAL_WHITES)) {
    assert.doesNotMatch(w.note, /guarantee|always|perfect|scientif/i);
  }
});
