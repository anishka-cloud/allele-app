// Bridal white guidance by season family. Season-family color guidance only:
// a starting point for trying dress fabrics, not a fitting or a guarantee.
export const BRIDAL_WHITES = {
  Spring: {
    name: "Soft ivory",
    ask: "ivory, soft cream or warm white",
    metal: "yellow or rose gold",
    note: "Your coloring is warm and clear. Soft ivory keeps your glow; stark optical white can look harsh beside it.",
    chips: ["#F7F0E0", "#F3E7CF", "#EEDFC2"],
  },
  Summer: {
    name: "Soft white",
    ask: "soft white or diamond white",
    metal: "platinum, white gold or silver",
    note: "Your coloring is cool and soft. A gentle off-white flatters you; heavy ivory can read yellow and bright optical white can read stark.",
    chips: ["#F7F7F4", "#F2F1EE", "#ECEBEA"],
  },
  Autumn: {
    name: "Warm ivory",
    ask: "ivory, champagne or cream",
    metal: "yellow gold or antique brass",
    note: "Your coloring is warm and rich. Ivory and champagne look intentional on you; bright optical white tends to look harsh in photos.",
    chips: ["#F3E9D6", "#EFE2C8", "#E6D3B0"],
  },
  Winter: {
    name: "Crisp white",
    ask: "bright white or diamond white",
    metal: "platinum or silver",
    note: "Your coloring is cool with high contrast. You are one of the few seasons that can wear bright optical white well; creamy ivory can look dull on you.",
    chips: ["#FFFFFF", "#F6F7FA", "#EEF0F5"],
  },
};

export function bridalWhiteFor(family) {
  return BRIDAL_WHITES[family] || null;
}
