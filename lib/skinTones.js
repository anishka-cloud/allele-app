/**
 * Skin tone backgrounds for contextual swatches.
 * 6 depth levels × 4 undertone variants = 24 skin base colors.
 */
export const skinToneMap = {
  porcelain: { warm: "#F7E0CE", cool: "#F2DBD8", olive: "#EDE0CC", neutral: "#F5DDD2" },
  fair:      { warm: "#F0D2B8", cool: "#EACDC8", olive: "#E5D3B5", neutral: "#EDD0BF" },
  lightMedium: { warm: "#DEB98E", cool: "#D4B5A8", olive: "#D0B890", neutral: "#D8B69A" },
  medium:    { warm: "#C49A6E", cool: "#B8957E", olive: "#BA9B72", neutral: "#BF9878" },
  mediumDeep:{ warm: "#A07A4E", cool: "#957562", olive: "#9A7D52", neutral: "#9B785A" },
  deep:      { warm: "#7B5832", cool: "#6E5040", olive: "#755C38", neutral: "#74553A" },
};

const skinDepthMap = {
  very_fair: "porcelain", fair: "fair", light: "fair",
  light_medium: "lightMedium", medium: "medium", medium_tan: "medium",
  medium_deep: "mediumDeep", deep: "deep", very_deep: "deep",
};

function undertoneKey(undertone, olive) {
  if (olive) return "olive";
  if (undertone === "Warm") return "warm";
  if (undertone === "Cool") return "cool";
  return "neutral";
}

export function getSkinTone(skinAnswer, undertone, olive = false) {
  const depth = skinDepthMap[skinAnswer] || "medium";
  const ut = undertoneKey(undertone, olive);
  return skinToneMap[depth]?.[ut] || skinToneMap.medium.neutral;
}

export function getSkinShadow(skinAnswer, undertone, olive = false) {
  const base = getSkinTone(skinAnswer, undertone, olive);
  return darkenHex(base, 0.15);
}

export const hairColorMap = {
  light_warm: { fill: "#D4A55A", shadow: "#B8894A", highlight: "#E8C87A" },
  light_cool: { fill: "#A89070", shadow: "#8A7558", highlight: "#C4AB8E" },
  deep_warm:  { fill: "#6B3A1A", shadow: "#4A2810", highlight: "#8B5A3A" },
  deep_cool:  { fill: "#1A1210", shadow: "#0A0808", highlight: "#3A2A20" },
};

export const eyeColorMap = {
  light:  { iris: "#7BA7BC", ring: "#5A8A9E", highlight: "#A8CBE0" },
  medium: { iris: "#8B7355", ring: "#6B5540", highlight: "#A89070" },
  dark:   { iris: "#3B2B1B", ring: "#2A1A0E", highlight: "#5A4A38" },
};

export function darkenHex(hex, factor) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const dr = Math.round(r * (1 - factor));
  const dg = Math.round(g * (1 - factor));
  const db = Math.round(b * (1 - factor));
  return "#" + dr.toString(16).padStart(2,"0") + dg.toString(16).padStart(2,"0") + db.toString(16).padStart(2,"0");
}

export function lightenHex(hex, factor) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const lr = Math.round(r + (255 - r) * factor);
  const lg = Math.round(g + (255 - g) * factor);
  const lb = Math.round(b + (255 - b) * factor);
  return "#" + lr.toString(16).padStart(2,"0") + lg.toString(16).padStart(2,"0") + lb.toString(16).padStart(2,"0");
}

export function mixHex(hex1, hex2, ratio = 0.5) {
  const r1 = parseInt(hex1.slice(1, 3), 16), g1 = parseInt(hex1.slice(3, 5), 16), b1 = parseInt(hex1.slice(5, 7), 16);
  const r2 = parseInt(hex2.slice(1, 3), 16), g2 = parseInt(hex2.slice(3, 5), 16), b2 = parseInt(hex2.slice(5, 7), 16);
  const r = Math.round(r1 + (r2 - r1) * ratio);
  const g = Math.round(g1 + (g2 - g1) * ratio);
  const b = Math.round(b1 + (b2 - b1) * ratio);
  return "#" + r.toString(16).padStart(2,"0") + g.toString(16).padStart(2,"0") + b.toString(16).padStart(2,"0");
}
