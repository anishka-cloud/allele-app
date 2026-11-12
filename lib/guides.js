// Season wardrobe guides at /guides/[slug].
//
// These pages sit between a Pinterest pin and the ShopMy season edit, so the
// visit lands on allele.app first (traffic we own, email capture, Google
// search) before the click out to ShopMy. Started Nov 2026 as a 3-week test:
// half of new Allele pins point here, half point straight to ShopMy.
//
// Colors and swaps come from lib/handoffSeasons.js so the guides never drift
// from the quiz results. Copy rules: color inspiration only, no genetic,
// medical or "science-proven" claims, no Montessori references.

import { SEASONS, NEUTRALS } from "./handoffSeasons.js";

// ShopMy season edits (clothing + accessories). Same URLs as SEASON_EDIT_URLS
// in app/results/ResultsContent.js.
export const GUIDE_EDIT_URLS = {
  "soft-autumn": "https://shopmy.us/collections/8793236",
  "dark-winter": "https://shopmy.us/collections/8793294",
};

const GUIDE_COPY = {
  "soft-autumn": {
    title: "What to Wear If You're a Soft Autumn",
    seoTitle: "What to Wear If You're a Soft Autumn: Colors, Basics + Outfit Ideas · Allele",
    description:
      "A Soft Autumn wardrobe guide: the colors to wear, the basics to swap (your black, white, denim and metal), outfit formulas, and a shoppable season edit.",
    keywords:
      "soft autumn, soft autumn outfits, soft autumn color palette, soft autumn wardrobe, what to wear soft autumn, soft autumn black, soft autumn capsule wardrobe",
    dek: "Warm, medium and muted. You don't need a new closet. You need the right version of the basics you already buy.",
    intro:
      "Soft Autumn coloring is warm but low-contrast, so anything too bright, too icy or too stark sits on top of you instead of with you. The fix is mostly about swapping the basics: the black, the white, the denim and the metal you wear every day.",
    formulas: [
      {
        name: "The everyday",
        pieces: ["Warm mid-wash jeans", "Oatmeal knit", "Honey camel coat", "Antique gold hoops"],
      },
      {
        name: "The work week",
        pieces: ["Warm mushroom trousers", "Warm off-white button-down", "Walnut leather belt", "Brown loafers"],
      },
      {
        name: "The winter wedding guest",
        pieces: ["Terracotta or chai midi dress", "Antique gold jewelry", "Walnut heels", "Camel wrap coat"],
      },
      {
        name: "The weekend",
        pieces: ["Olive cargo or utility pant", "Soft brown tee", "Wheat-colored cardigan", "Brushed bronze pendant"],
      },
    ],
    faq: [
      {
        q: "Can Soft Autumns wear black?",
        a: "Pure black is usually too sharp for Soft Autumn coloring and can make the face look shadowed. Soft muted brown or a dusty navy does the same job as black in an outfit while staying in your range. If you love black, keep it away from your face, like black trousers or shoes.",
      },
      {
        q: "Is gold or silver better for a Soft Autumn?",
        a: "Gold, especially antique gold and brushed bronze. Shiny silver tends to look cold and separate on warm, muted coloring.",
      },
      {
        q: "What colors should a Soft Autumn avoid?",
        a: "Black, optic white, fuchsia and electric blue. Anything highly saturated or high-contrast tends to overpower Soft Autumn coloring.",
      },
      {
        q: "What's the best white for a Soft Autumn?",
        a: "A warm off-white, like bone or oat. Optic white is usually too bright next to the face.",
      },
    ],
  },
  "dark-winter": {
    title: "What to Wear If You're a Dark Winter",
    seoTitle: "What to Wear If You're a Dark Winter: Colors, Basics + Outfit Ideas · Allele",
    description:
      "A Dark Winter wardrobe guide: the colors to wear, the basics to swap (your camel, khaki, denim and metal), outfit formulas, and a shoppable season edit.",
    keywords:
      "dark winter, dark winter outfits, dark winter color palette, dark winter wardrobe, what to wear dark winter, dark winter camel, dark winter capsule wardrobe",
    dek: "Deep, cool and dramatic. Black and white are already yours. The swaps are in the warm neutrals everyone else calls basic.",
    intro:
      "Dark Winter coloring is deep and cool, so it can carry contrast and depth that would overwhelm most people. Where Dark Winters go wrong is the warm, earthy neutrals sold as universal: camel, beige, khaki and gold. Swap those, and the rest of your closet starts working.",
    formulas: [
      {
        name: "The everyday",
        pieces: ["Deep indigo jeans", "Charcoal knit", "Black wool coat", "Silver hoops"],
      },
      {
        name: "The work week",
        pieces: ["Ink navy trousers", "Crisp white shirt", "Espresso leather belt", "Black loafers"],
      },
      {
        name: "The holiday party",
        pieces: ["Plum velvet or teal satin dress", "Silver jewelry", "Black heels", "Oxblood lip"],
      },
      {
        name: "The weekend",
        pieces: ["Cool deep olive pant", "Black tee", "Slate grey cardigan", "Silver chain"],
      },
    ],
    faq: [
      {
        q: "Can Dark Winters wear camel or beige?",
        a: "Warm camel and beige tend to make Dark Winter coloring look ashen. Deep espresso brown does the job camel does in an outfit, and charcoal works where you'd reach for beige.",
      },
      {
        q: "Is gold or silver better for a Dark Winter?",
        a: "Silver, platinum and white gold. Yellow gold reads warm against cool coloring.",
      },
      {
        q: "What colors should a Dark Winter avoid?",
        a: "Orange, mustard, beige and terracotta. Earthy, warm tones tend to drain Dark Winter coloring.",
      },
      {
        q: "Can Dark Winters wear black and white together?",
        a: "Yes. True black with pure white is one of the strongest combinations for Dark Winter coloring.",
      },
    ],
  },
};

export const GUIDE_SLUGS = Object.keys(GUIDE_COPY);

export function getGuide(slug) {
  const copy = GUIDE_COPY[slug];
  const season = SEASONS[slug];
  const wardrobe = NEUTRALS[slug];
  if (!copy || !season) return null;

  const avoid = (season.washesYouOut || "")
    .replace(/^Avoid:\s*/i, "")
    .split(".")[0]
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return {
    slug,
    seasonName: season.name,
    tagline: season.tagline,
    undertone: season.undertone,
    depth: season.depth,
    chroma: season.chroma,
    palette: season.palette.map((hex, i) => ({ hex, name: season.paletteLabels?.[i] || hex })),
    avoid,
    basics: wardrobe?.basics || [],
    editUrl: GUIDE_EDIT_URLS[slug],
    ogImage: `/og/${slug}.png`,
    ...copy,
  };
}
