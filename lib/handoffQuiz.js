// 12-question quiz from the Round 3 design handoff (quiz-meters.html).
// Drives the live undertone/depth/chroma meters and the 12-season narrowing rail.
import { SEASONS } from "./handoffSeasons";

export const QUIZ = [
  {
    q: "White paper. Cream paper.",
    sub: "Hold both up to your face in natural daylight. Which makes your skin look more alive?",
    options: [
      { label: "The white",              key: "cool",    swatch: "#FAFAFA" },
      { label: "The cream",              key: "warm",    swatch: "#F8EDD5" },
      { label: "They look similar",      key: "neutral", swatch: "#F0EDE8" },
      { label: "Honestly, hard to tell", key: "olive",   swatch: "#D8D2C8" },
    ],
  },
  {
    q: "Your veins in natural light.",
    sub: "Turn your wrist toward the window.",
    options: [
      { label: "Greenish",                  key: "warm",    swatch: "#8A9A5B" },
      { label: "Bluish / Purple",           key: "cool",    swatch: "#6B8CAD" },
      { label: "A mix of both",             key: "neutral", swatch: "linear-gradient(90deg,#8A9A5B 50%,#6B8CAD 50%)" },
      { label: "Honestly, hard to tell",    key: "olive",   swatch: "#A8A89A" },
    ],
  },
  {
    q: "Sun. You. Twenty minutes, no SPF.",
    sub: "Your skin does what?",
    options: [
      { label: "Tans easily, rarely burns",      key: "deep",   swatch: "#8B6F47" },
      { label: "Tans a little, burns at first",  key: "medium", swatch: "#D4A574" },
      { label: "Burns, then tans",                key: "light",  swatch: "#F4D5AE" },
      { label: "Always burns, never tans",       key: "fair",   swatch: "#FDE4C4" },
    ],
  },
  {
    q: "Your natural hair, pre-anything.",
    sub: "Before color, before heat, before the sun.",
    options: [
      { label: "Cool blonde to ash brown",     key: "cool-light", swatch: "#A89B8A" },
      { label: "Warm blonde to golden brown",  key: "warm-light", swatch: "#C4A574" },
      { label: "Rich brunette to black",        key: "deep",       swatch: "#3A2817" },
      { label: "Red, auburn, or strawberry",   key: "warm-red",   swatch: "#8B3A1A" },
    ],
  },
  {
    q: "Your eyes, in honest light.",
    sub: "Look closely. Flecks count.",
    options: [
      { label: "Clear cool. Blue, icy grey, bright green",    key: "cool-bright", swatches: ["#4A90C4", "#B8C4D0", "#3FA679"] },
      { label: "Warm. Brown, hazel, amber, olive-green",      key: "warm",        swatches: ["#8B6F47", "#B8860B", "#6B8E23"] },
      { label: "Soft. Muted blue-grey, sage, soft hazel",     key: "cool-soft",   swatches: ["#8FA9B8", "#7A9B7A", "#8B7D5C"] },
      { label: "Deep. Dark brown, near-black, deep forest",   key: "deep",        swatches: ["#2D1F0F", "#0F1F1A", "#1F3D2D"] },
    ],
  },
  {
    q: "Which color story feels most like you?",
    sub: "Pick the palette you'd actually reach for, or the one you get the most compliments in.",
    options: [
      { label: "Burnt orange, olive, rust",   key: "autumn", swatches: ["#B5500B", "#6B8E23", "#8B4513"] },
      { label: "True red, emerald, navy",     key: "winter", swatches: ["#DC143C", "#1F7A3D", "#003366"] },
      { label: "Coral, peach, buttercup",     key: "spring", swatches: ["#F26A4B", "#F4A460", "#F5D547"] },
      { label: "Dusty rose, lavender, sage",  key: "summer", swatches: ["#A596B8", "#C4B5D8", "#9BB89B"] },
    ],
  },
  {
    q: "Black turtleneck, white backdrop.",
    sub: "Look at your face, not the shirt. What do you notice?",
    options: [
      { label: "Crisp. My features come forward",           key: "high-contrast", swatch: "#0F0F0F" },
      { label: "Heavy. The black overpowers me",            key: "low-contrast",  swatch: "#A89B8A" },
      { label: "Even. I look like myself, nothing dramatic", key: "medium",       swatch: "#6B6B6B" },
      { label: "Theatrical. Strong, maybe too strong",      key: "dramatic",      swatch: "#1A1A1A" },
    ],
  },
  {
    q: "The metallic that makes your skin glow.",
    sub: "Drape it at your collarbone.",
    options: [
      { label: "Warm antique gold",      key: "warm",        swatch: "linear-gradient(135deg,#E8CE8B 0%,#B68830 45%,#5C3F10 100%)" },
      { label: "Bright polished gold",   key: "warm-bright", swatch: "linear-gradient(135deg,#FFEBA6 0%,#E6B820 45%,#6E4A0C 100%)" },
      { label: "Soft rose gold",         key: "warm-soft",   swatch: "linear-gradient(135deg,#F3D0C4 0%,#C8867A 45%,#6E3A34 100%)" },
      { label: "Platinum / cool silver", key: "cool",        swatch: "linear-gradient(135deg,#F0F1F5 0%,#AEB3BE 45%,#3E4250 100%)" },
    ],
  },
  {
    q: "Your white t-shirt drawer.",
    sub: "What's actually in there?",
    options: [
      { label: "Mostly cream and ivory",                      key: "warm",    swatch: "#F4EBD8" },
      { label: "Mostly pure white",                           key: "cool",    swatch: "#FFFFFF" },
      { label: "A mix of both, depending on the day",         key: "neutral", swatches: ["#F4EBD8", "#FFFFFF"] },
      { label: "Mostly off-whites with a slight tint",        key: "soft",    swatches: ["#F0EAE0", "#EDEEF0"] },
    ],
  },
  {
    q: "Your bare skin, honest.",
    sub: "No makeup, natural light. What describes your undertone?",
    options: [
      { label: "Peachy, golden, warm",              key: "warm",  swatch: "#F2C89A" },
      { label: "Rosy, pink, cool",                  key: "cool",  swatch: "#F4C8C4" },
      { label: "Olive, neutral, hard to call",      key: "olive", swatch: "#C8B89A" },
      { label: "Rich, deep, even tone throughout",  key: "deep",  swatch: "#8B5A3C" },
    ],
  },
  {
    q: "A pure red, right on your lips.",
    sub: "Four variants. Which one makes your smile pop?",
    options: [
      { label: "Warm red. Tomato, brick",         key: "warm-deep",   swatch: "#D2452E" },
      { label: "Cool red. Cherry, siren",         key: "cool-bright", swatch: "#C91D3C" },
      { label: "Deep red. Wine, oxblood",         key: "cool-deep",   swatch: "#722F37" },
      { label: "Bright red. Raspberry, magenta", key: "cool-bright", swatch: "#E83F6F" },
    ],
  },
  {
    q: "One last check.",
    sub: "Based on everything you've answered, which family feels most true to you?",
    options: [
      { label: "Warm + bright (Spring)", key: "spring", swatch: "#F26A4B" },
      { label: "Cool + soft (Summer)",   key: "summer", swatch: "#A596B8" },
      { label: "Warm + muted (Autumn)",  key: "autumn", swatch: "#B5500B" },
      { label: "Cool + bright (Winter)", key: "winter", swatch: "#1A2C4E" },
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

  autumn:         { u: +0.5, c: -0.2, family: { autumn: 0.6 } },
  winter:         { u: -0.5, c: +0.5, d: +0.2, family: { winter: 0.6 } },
  spring:         { u: +0.4, c: +0.5, d: -0.2, family: { spring: 0.6 } },
  summer:         { u: -0.4, c: -0.4, d: -0.1, family: { summer: 0.6 } },

  "high-contrast":{ c: +0.4, d: +0.3 },
  dramatic:       { c: +0.5, d: +0.4, family: { winter: 0.2 } },
  "low-contrast": { c: -0.4, family: { summer: 0.2 } },

  clear:          { c: +0.4 },
  muted:          { c: -0.5, family: { autumn: 0.2, summer: 0.2 } },
  smooth:         { c: +0.1 },
  soft:           { c: -0.3 },
  avoid:          {},
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
  const family = { spring: 0, summer: 0, autumn: 0, winter: 0 };
  for (const a of answers) {
    const w = AXIS_WEIGHTS[a.key] || {};
    if (w.u != null) u += w.u;
    if (w.d != null) d += w.d;
    if (w.c != null) c += w.c;
    if (w.family) for (const k in w.family) family[k] += w.family[k];
  }
  const answered = answers.length || 1;
  const norm = Math.max(answered * 0.5, 1);
  return {
    undertone: u / norm,
    depth:     d / norm,
    chroma:    c / norm,
    family,
    answered,
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
