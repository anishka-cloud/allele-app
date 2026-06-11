// 12-question Shade DNA V2 — evidence-weighted (Q1–10), preference (Q12), routing (Q11).
// evidence: per-question multiplier applied in scoreFromAnswers.
//   2.0 = behavior/biology signal (Q1–10)
//   0.5 = preference / self-report (Q12)
//   0   = routing only, no season effect (Q11)
import { SEASONS } from "./handoffSeasons";

export const QUIZ = [
  // Q1 — White vs cream
  {
    q: "Hold a pure white T-shirt to your face, then a cream one.",
    sub: "Which makes your skin look more luminous and awake? If you can't test now, pick what usually happens in photos or dressing rooms.",
    evidence: 2,
    options: [
      { label: "Pure white. My skin looks clearer and more defined", key: "cool",    swatch: "#FFFFFF" },
      { label: "Warm cream. My skin looks healthier and softer",      key: "warm",    swatch: "#F8EDD5" },
      { label: "Both are fine, neither is magic",                     key: "neutral", swatch: "#F0EDE8" },
      { label: "I genuinely can't tell",                              key: "olive",   swatch: "#D8D2C8" },
    ],
  },

  // Q2 — Veins + olive flag
  {
    q: "In natural light, your wrist veins mostly look like:",
    sub: "Not a perfect test. Just one signal. Turn your wrist toward the window.",
    evidence: 2,
    options: [
      { label: "More blue or purple",                       key: "cool",  swatch: "#6B8CAD" },
      { label: "More green",                                key: "warm",  swatch: "#8A9A5B" },
      { label: "A mix of blue, green, and purple",          key: "olive", swatch: "linear-gradient(90deg,#8A9A5B 33%,#6B8CAD 66%,#7B5C8E 100%)" },
      { label: "Hard to tell, or shifts with the light",    key: "olive", swatch: "#A8A89A" },
    ],
  },

  // Q3 — Foundation behavior (NEW)
  {
    q: "When foundation is wrong on you, what usually happens?",
    sub: "Think about the shade 20–30 minutes after applying, not when first on.",
    evidence: 2,
    options: [
      { label: "Turns orange, yellow, or too warm",          key: "fdn-cool",      swatch: "#D29A5A" },
      { label: "Looks pink, ashy, or grey",                   key: "fdn-warm",      swatch: "#C9A5A8" },
      { label: "Undertone is okay, depth is always off",      key: "fdn-depth-off", swatch: "#A89B8A" },
      { label: "I don't wear foundation or haven't noticed",  key: "fdn-skip",      swatch: "#E8E2D5" },
    ],
  },

  // Q4 — Sun reaction
  {
    q: "In strong sun, your skin usually:",
    sub: "Imagine unprotected exposure, even if you wear SPF every day.",
    evidence: 2,
    options: [
      { label: "Tans easily and rarely burns",      key: "deep",   swatch: "#8B6F47" },
      { label: "Tans gradually, may burn first",    key: "medium", swatch: "#D4A574" },
      { label: "Burns first, then may tan",         key: "light",  swatch: "#F4D5AE" },
      { label: "Burns quickly and rarely tans",     key: "fair",   swatch: "#FDE4C4" },
    ],
  },

  // Q5 — Natural hair depth + temperature
  {
    q: "Your natural hair — before dye, bleach, heat, or sun.",
    sub: "If your hair has changed, answer for your natural childhood or root color.",
    evidence: 2,
    options: [
      { label: "Ash blonde, cool brown, soft cool brunette",        key: "cool-light", swatch: "#A89B8A" },
      { label: "Golden blonde, honey, copper, auburn, warm brown",  key: "warm-light", swatch: "#C4A574" },
      { label: "Rich brunette, espresso, black-brown, or black",    key: "deep",       swatch: "#3A2817" },
      { label: "Hard to tell, or my current color is not natural",  key: "neutral",    swatch: "#7A6A55" },
    ],
  },

  // Q6 — Eye clarity + depth
  {
    q: "In honest daylight, your eyes read mostly as:",
    sub: "Flecks count, but choose the overall impression from a few feet away.",
    evidence: 2,
    options: [
      { label: "Clear and bright: blue, icy grey, emerald, crisp",         key: "cool-bright", swatches: ["#4A90C4", "#B8C4D0", "#3FA679"] },
      { label: "Warm and golden: brown, hazel, amber, olive-green",        key: "warm",        swatches: ["#8B6F47", "#B8860B", "#6B8E23"] },
      { label: "Soft and muted: blue-grey, sage, soft hazel, muted brown", key: "cool-soft",   swatches: ["#8FA9B8", "#7A9B7A", "#8B7D5C"] },
      { label: "Deep and intense: dark brown, near-black, deep forest",    key: "deep",        swatches: ["#2D1F0F", "#0F1F1A", "#1F3D2D"] },
    ],
  },

  // Q7 — Black-and-white contrast
  {
    q: "In a black-and-white photo with no makeup, what happens?",
    sub: "Think hair, brows, eyes, and skin together.",
    evidence: 2,
    options: [
      { label: "High contrast. My features pop sharply",          key: "high-contrast", swatch: "#0F0F0F" },
      { label: "Low contrast. Everything looks soft and blended", key: "low-contrast",  swatch: "#A89B8A" },
      { label: "Medium contrast. Balanced, not dramatic",         key: "medium",        swatch: "#6B6B6B" },
      { label: "Strong depth. Features look dark, rich, intense", key: "dramatic",      swatch: "#1A1A1A" },
    ],
  },

  // Q8 — Metals (skin effect)
  {
    q: "Which metal makes your skin look more expensive, rested, and even?",
    sub: "Imagine the metal at your collarbone — not which jewelry you prefer.",
    evidence: 2,
    options: [
      { label: "Platinum or cool silver",     key: "cool",        swatch: "linear-gradient(135deg,#F0F1F5 0%,#AEB3BE 45%,#3E4250 100%)" },
      { label: "Bright polished gold",        key: "warm-bright", swatch: "linear-gradient(135deg,#FFEBA6 0%,#E6B820 45%,#6E4A0C 100%)" },
      { label: "Warm antique gold or bronze", key: "warm",        swatch: "linear-gradient(135deg,#E8CE8B 0%,#B68830 45%,#5C3F10 100%)" },
      { label: "Soft rose gold",              key: "warm-soft",   swatch: "linear-gradient(135deg,#F3D0C4 0%,#C8867A 45%,#6E3A34 100%)" },
    ],
  },

  // Q9 — Lip + blush behavior
  {
    q: "Which shade family makes you look naturally flushed instead of 'made up'?",
    sub: "Choose what looks good on your face, not what looks prettiest in the tube.",
    evidence: 2,
    options: [
      { label: "Peach, coral, apricot, warm rose",        key: "warm-light", swatch: "#F5B9A2" },
      { label: "Berry, mauve, rose, cool pink",           key: "cool",       swatch: "#C49AB0" },
      { label: "Terracotta, brick, cinnamon, warm red",   key: "warm-deep",  swatch: "#C46A3A" },
      { label: "Wine, plum, oxblood, deep berry",         key: "cool-deep",  swatch: "#722F37" },
    ],
  },

  // Q10 — Bright color tolerance
  {
    q: "Imagine electric magenta or vivid emerald near your face.",
    sub: "Not whether you like the color. Whether it supports your face.",
    evidence: 2,
    options: [
      { label: "It wakes me up. I can handle it",                    key: "cool-bright", swatch: "#E83F6F" },
      { label: "Beautiful, but slightly louder than I am",            key: "cool-soft",   swatch: "#A596B8" },
      { label: "I look better in richer, earthier, deeper versions",  key: "warm-deep",   swatch: "#722F37" },
      { label: "It overwhelms me. I need softer color",               key: "muted",       swatch: "#C8B89A" },
    ],
  },

  // Q11 — Product priority (NEW — routing only)
  {
    q: "What are you trying to solve first?",
    sub: "Your result will lead with this section.",
    evidence: 0,
    options: [
      { label: "Foundation and concealer shades",     key: "priority", priority: "foundation", swatch: "#D6AD89" },
      { label: "Lipstick, blush, and bronzer colors", key: "priority", priority: "lips",       swatch: "#C46A3A" },
      { label: "Wardrobe colors and neutrals",        key: "priority", priority: "wardrobe",   swatch: "#8A7A66" },
      { label: "The full palette and product edit",   key: "priority", priority: "full",       swatch: "#1A1613" },
    ],
  },

  // Q12 — Final family check (preference tie-breaker, low weight)
  {
    q: "One last instinct check: which color world has historically worked best on you?",
    sub: "Tie-breaker only. We weight this lower than the rest.",
    evidence: 0.5,
    options: [
      { label: "Spring — peach, butter yellow, fresh green, warm clear", key: "spring", swatch: "#E2725B" },
      { label: "Summer — cool blue, soft rose, lavender, muted cool",     key: "summer", swatch: "#7B9BC2" },
      { label: "Autumn — olive, cognac, rust, bronze, earthy rich",       key: "autumn", swatch: "#8B6F3F" },
      { label: "Winter — black, white, true red, plum, icy or jewel",     key: "winter", swatch: "#4B1A2F" },
    ],
  },
];

// Each answer key nudges three axes (u: undertone, d: depth, c: chroma) on -1..+1
// and family weights. Mirrors the handoff scoring exactly.
const AXIS_WEIGHTS = {
  warm:           { u: +0.7, family: { spring: 0.3, autumn: 0.3 } },
  cool:           { u: -0.7, family: { summer: 0.3, winter: 0.3 } },
  neutral:        { u:  0.0 },
  olive:          { u: -0.1, family: { autumn: 0.2, summer: 0.15 } },

  deep:           { d: +0.7, family: { autumn: 0.2, winter: 0.2 } },
  medium:         { d: +0.15 },
  light:          { d: -0.5, family: { spring: 0.2, summer: 0.2 } },
  fair:           { d: -0.8, family: { summer: 0.25, spring: 0.2 } },

  "cool-light":   { u: -0.4, d: -0.4, family: { summer: 0.3 } },
  "warm-light":   { u: +0.4, d: -0.4, family: { spring: 0.3 } },
  "warm-red":     { u: +0.6, c: +0.3, family: { autumn: 0.35, spring: 0.15 } },
  "cool-bright":  { u: -0.4, c: +0.5, family: { winter: 0.3, summer: 0.15 } },
  "cool-soft":    { u: -0.3, c: -0.4, family: { summer: 0.3 } },
  "cool-deep":    { u: -0.4, d: +0.3, family: { winter: 0.3 } },
  "warm-bright":  { u: +0.3, c: +0.5, family: { spring: 0.3 } },
  "warm-soft":    { u: +0.3, c: -0.3, family: { autumn: 0.2, spring: 0.15 } },
  "warm-deep":    { u: +0.5, d: +0.4, family: { autumn: 0.35 } },

  // Q12 family answers — lowered from 0.6 → 0.4 (then halved again by evidence: 0.5)
  autumn:         { u: +0.5, c: -0.2, family: { autumn: 0.4 } },
  winter:         { u: -0.5, c: +0.5, d: +0.2, family: { winter: 0.4 } },
  spring:         { u: +0.4, c: +0.5, d: -0.2, family: { spring: 0.4 } },
  summer:         { u: -0.4, c: -0.4, d: -0.1, family: { summer: 0.4 } },

  "high-contrast":{ c: +0.4, d: +0.3 },
  dramatic:       { c: +0.5, d: +0.4, family: { winter: 0.2 } },
  "low-contrast": { c: -0.4, family: { summer: 0.2 } },

  clear:          { c: +0.4 },
  muted:          { c: -0.5, family: { autumn: 0.2, summer: 0.2 } },
  smooth:         { c: +0.1 },
  soft:           { c: -0.3 },
  avoid:          {},

  // Q3 foundation behavior (NEW evidence keys)
  "fdn-cool":      { u: -0.6, family: { winter: 0.15, summer: 0.15 } }, // foundation oxidizes orange → skin is cool/olive
  "fdn-warm":      { u: +0.6, family: { spring: 0.15, autumn: 0.15 } }, // foundation goes pink/ashy → skin is warm
  "fdn-depth-off": {}, // depth-uncertainty flag only, no axis signal
  "fdn-skip":      {}, // no signal

  // Q11 product priority — routing only, zero axis impact
  priority:        {},
};

const SEASON_PROFILES = {
  "clear-spring":  { u: +0.6, d:  0.0, c: +0.6, family: "spring" },
  "true-spring":   { u: +0.6, d:  0.0, c: +0.4, family: "spring" },
  "light-spring":  { u: +0.4, d: -0.5, c: +0.2, family: "spring" },
  "light-summer":  { u: -0.4, d: -0.5, c: -0.3, family: "summer" },
  "true-summer":   { u: -0.6, d:  0.0, c: -0.4, family: "summer" },
  "soft-summer":   { u: -0.3, d:  0.0, c: -0.6, family: "summer" },
  "soft-autumn":   { u: +0.3, d:  0.0, c: -0.6, family: "autumn" },
  "true-autumn":   { u: +0.6, d: +0.2, c: -0.4, family: "autumn" },
  "dark-autumn":   { u: +0.4, d: +0.6, c: -0.2, family: "autumn" },
  "dark-winter":   { u: -0.3, d: +0.6, c: +0.3, family: "winter" },
  "true-winter":   { u: -0.6, d: +0.3, c: +0.6, family: "winter" },
  "bright-winter": { u: -0.3, d: +0.2, c: +0.7, family: "winter" },
};

export function scoreFromAnswers(answers) {
  let u = 0, d = 0, c = 0;
  let olive = 0;
  let priority = null;
  const family = { spring: 0, summer: 0, autumn: 0, winter: 0 };

  for (const a of answers) {
    const w = AXIS_WEIGHTS[a.key] || {};
    const m = a.evidence ?? 1; // per-question weight multiplier (2 = evidence, 0.5 = preference, 0 = routing)

    if (w.u != null) u += w.u * m;
    if (w.d != null) d += w.d * m;
    if (w.c != null) c += w.c * m;
    if (w.family) for (const k in w.family) family[k] += w.family[k] * m;

    if (a.key === "olive") olive += 1;
    if (a.key === "fdn-cool") olive += 0.5; // oxidation-orange is a strong olive co-signal
    if (a.priority) priority = a.priority;
  }

  const answered = answers.length || 1;
  const norm = Math.max(answered * 0.5, 1);
  return {
    undertone: u / norm,
    depth:     d / norm,
    chroma:    c / norm,
    family,
    answered,
    oliveFlag: olive >= 2,
    priority,
  };
}

export function topSeasons(score, k = 12) {
  return Object.entries(SEASON_PROFILES)
    .map(([id, p]) => {
      const du = p.u - score.undertone;
      const dd = p.d - score.depth;
      const dc = p.c - score.chroma;
      const dist = Math.sqrt(du * du + dd * dd + dc * dc);
      const familyBoost = (score.family[p.family] || 0) * 0.4;
      return {
        id,
        name: SEASONS[id].name,
        family: SEASONS[id].family,
        accent: SEASONS[id].accent,
        palette: SEASONS[id].palette,
        distance: dist - familyBoost,
      };
    })
    .sort((a, b) => a.distance - b.distance)
    .slice(0, k);
}

export function confidence(score, ranked) {
  if (ranked.length < 2) return 0;
  const gap = ranked[1].distance - ranked[0].distance;
  const progress = Math.min(score.answered / 8, 1);
  return Math.min(1, (gap * 1.2 + 0.2) * progress);
}

export function narrowingState(score, ranked) {
  if (!ranked || ranked.length === 0) {
    return { phase: "start", label: "Ready when you are", family: null, familyLocked: false, subSeasonPair: null };
  }
  const answered = score.answered || 0;
  const lead = ranked[0];
  const family = lead.family;
  const top3 = ranked.slice(0, 3);
  const familyAgreement = top3.filter((r) => r.family === family).length;
  const familyLocked = answered >= 3 && familyAgreement >= 2;
  const gap = ranked.length > 1 ? ranked[1].distance - ranked[0].distance : 0;
  const locked = answered >= 6 && gap > 0.35;

  let phase, label;
  if (answered === 0)               { phase = "start";          label = "Ready when you are"; }
  else if (answered < 3)            { phase = "narrow-family";  label = "Narrowing your family"; }
  else if (!familyLocked)           { phase = "narrow-family";  label = "Still narrowing family"; }
  else if (!locked)                 { phase = "narrow-sub";     label = `${family} confirmed · narrowing sub-seasons`; }
  else                              { phase = "locked";         label = `Locked in · ${lead.name}`; }

  let subSeasonPair = null;
  if (familyLocked && !locked && ranked.length > 1) {
    const sameFamTop2 = ranked.filter((r) => r.family === family).slice(0, 2);
    if (sameFamTop2.length === 2) {
      const total = sameFamTop2[0].distance + sameFamTop2[1].distance;
      const aShare = total > 0 ? Math.round((sameFamTop2[1].distance / total) * 100) : 50;
      const bShare = 100 - aShare;
      subSeasonPair = {
        a: sameFamTop2[0].name, aPct: aShare,
        b: sameFamTop2[1].name, bPct: bShare,
      };
    }
  }
  return { phase, label, family, familyLocked, subSeasonPair, locked };
}

export const SEASON_IDS = Object.keys(SEASON_PROFILES);
