/**
 * Vibe DNA Quiz — 10 questions, multi-archetype scoring.
 * Codes: CG=Clean Girl, COG=Coastal Grandmother, OM=Old Money,
 *        DA=Dark Academia, CT=Cottagecore, CQ=Coquette,
 *        Y2K=Y2K Revival, BC=Balletcore, SM=Scandi Minimalist
 */

export const vibeQuestions = [
  {
    id: 1,
    question: "Your ideal Saturday morning starts with:",
    options: [
      { label: "Oat milk matcha and a 6AM Pilates class", scores: { CG: 3, BC: 2, SM: 1 } },
      { label: "Black coffee, linen robe, reading in the garden", scores: { COG: 3, OM: 1, DA: 1 } },
      { label: "Stopping at the farmer's market for flowers and sourdough", scores: { COG: 2, CT: 3, SM: 1 } },
      { label: "Espresso and a vintage bookshop", scores: { DA: 3, OM: 2, CQ: 1 } },
      { label: "Strawberry milk and scrolling Pinterest in bed", scores: { CQ: 2, Y2K: 3, BC: 1 } },
      { label: "A long walk, then architectural coffee shop", scores: { SM: 3, CG: 1, OM: 1 } },
      { label: "Rolling out of bed, black coffee, thrift store or record shop", scores: { IS: 3, DA: 1 } },
      { label: "Morning run, then getting dressed in your partner\u2019s oversized shirt", scores: { TL: 3, CG: 1 } },
    ],
  },
  {
    id: 2,
    question: "Your closet color palette:",
    options: [
      { label: "White, cream, sand, soft black", scores: { CG: 3, SM: 3, OM: 1 } },
      { label: "Navy, cream, camel, olive", scores: { COG: 3, OM: 3, DA: 1 } },
      { label: "Burgundy, forest, burnt orange, brown", scores: { DA: 3, CT: 2, OM: 1 } },
      { label: "Sage, dusty rose, butter, ivory", scores: { CT: 3, COG: 2, CQ: 1 } },
      { label: "Baby pink, cream, ballet slipper, bow-red", scores: { CQ: 3, BC: 3 } },
      { label: "Silver, denim, hot pink, baby blue", scores: { Y2K: 3, CQ: 1 } },
      { label: "Black, distressed denim, burgundy, olive", scores: { IS: 3, DA: 1 } },
      { label: "Charcoal, navy, white, camel \u2014 all from the men\u2019s section", scores: { TL: 3, SM: 1, OM: 1 } },
    ],
  },
  {
    id: 3,
    question: "Your go-to everyday shoe:",
    options: [
      { label: "Adidas Sambas or white sneakers", scores: { CG: 3, SM: 2, Y2K: 1 } },
      { label: "Espadrilles or leather loafers", scores: { COG: 3, OM: 2 } },
      { label: "Riding boots or vintage Mary Janes", scores: { DA: 3, CT: 2, CQ: 1 } },
      { label: "Ballet flats with ribbon ties", scores: { BC: 3, CQ: 3 } },
      { label: "Gallery flats, pointed toe in black", scores: { SM: 2, OM: 2, CG: 1 } },
      { label: "Platform sandals or chunky sneakers", scores: { Y2K: 3, CQ: 1 } },
      { label: "Doc Martens or beat-up Converse", scores: { IS: 3, DA: 1 } },
      { label: "Oxford lace-ups or polished loafers from the men\u2019s floor", scores: { TL: 3, OM: 1 } },
    ],
  },
  {
    id: 4,
    question: "Your ideal vacation:",
    options: [
      { label: "Nantucket, Martha's Vineyard, or the Hamptons in August", scores: { COG: 3, OM: 2 } },
      { label: "Paris in October — museums, cafés, long walks", scores: { DA: 2, OM: 2, CQ: 2 } },
      { label: "Lake Como or Positano, hotel with a view", scores: { OM: 3, COG: 1, CG: 1 } },
      { label: "Cotswolds, English countryside cottage", scores: { CT: 3, DA: 2, COG: 1 } },
      { label: "Copenhagen or Stockholm, design hotels", scores: { SM: 3, CG: 1 } },
      { label: "Miami or Ibiza, pool and going out", scores: { Y2K: 3, CG: 1 } },
      { label: "A small ballet performance in a walkable European city", scores: { BC: 3, CQ: 2 } },
      { label: "Berlin or Brooklyn \u2014 dive bars, galleries, live music", scores: { IS: 3, Y2K: 1 } },
      { label: "Tokyo \u2014 architecture, tailoring shops, quiet perfection", scores: { TL: 3, SM: 2 } },
    ],
  },
  {
    id: 5,
    question: "Your jewelry signature:",
    options: [
      { label: "Small gold hoops, dainty chain, never removed", scores: { CG: 3, SM: 2, OM: 2 } },
      { label: "Pearls — real or otherwise, always", scores: { OM: 2, CQ: 3, COG: 1 } },
      { label: "Signet ring, vintage watch, nothing new", scores: { DA: 3, OM: 2 } },
      { label: "Charm bracelet, locket, something with meaning", scores: { CT: 3, CQ: 2 } },
      { label: "Statement rings, layered necklaces, silver", scores: { Y2K: 2, DA: 1 } },
      { label: "One perfect ribbon choker, pink enamel bow", scores: { BC: 3, CQ: 3 } },
      { label: "Stacked silver rings, a chain you never take off, maybe a safety pin", scores: { IS: 3, Y2K: 1 } },
      { label: "One clean watch face and nothing else", scores: { TL: 3, SM: 2 } },
    ],
  },
  {
    id: 6,
    question: "Your fragrance:",
    options: [
      { label: "Clean musk, laundry-fresh, skin scent", scores: { CG: 3, SM: 2, BC: 1 } },
      { label: "Sea salt, bergamot, garden herbs", scores: { COG: 3, OM: 1 } },
      { label: "Tobacco, amber, old books, leather", scores: { DA: 3, OM: 2 } },
      { label: "Rose, peony, gardenia, something grandmother-coded", scores: { CT: 2, CQ: 3, OM: 1 } },
      { label: "Vanilla, pink pepper, something candy-adjacent", scores: { Y2K: 2, BC: 2, CQ: 2 } },
      { label: "Fig, sandalwood, architectural and warm", scores: { SM: 3, OM: 1 } },
      { label: "Patchouli, smoke, black coffee, something a little dangerous", scores: { IS: 3, DA: 1 } },
      { label: "Vetiver, cedar, clean musk \u2014 unisex, borrowed-from-him energy", scores: { TL: 3, CG: 1 } },
    ],
  },
  {
    id: 7,
    question: "Your home style:",
    options: [
      { label: "Bouclé couch, warm woods, one perfect plant", scores: { SM: 3, CG: 2, OM: 1 } },
      { label: "Blue-and-white ceramics, linen slipcovers, fresh hydrangeas", scores: { COG: 3, OM: 2 } },
      { label: "Dark green walls, leather armchair, stacks of books", scores: { DA: 3, OM: 2 } },
      { label: "Gingham, pressed flowers, vintage wallpaper", scores: { CT: 3, COG: 1, CQ: 1 } },
      { label: "Velvet, gold mirrors, pink everything", scores: { CQ: 3, BC: 2, Y2K: 1 } },
      { label: "Y2K bedroom revival — LED strips, heart mirrors, butterfly decor", scores: { Y2K: 3 } },
      { label: "Marble, brass, monogram, heirloom rugs", scores: { OM: 3, COG: 1 } },
      { label: "Exposed brick, record player, thrifted art, string lights", scores: { IS: 3, CT: 1 } },
      { label: "Clean desk, one plant, monochrome everything, zero clutter", scores: { TL: 3, SM: 2 } },
    ],
  },
  {
    id: 8,
    question: "Your guilty-pleasure watch or read:",
    options: [
      { label: "Nancy Meyers movies", scores: { COG: 3, OM: 2 } },
      { label: "Sofia Coppola films", scores: { CQ: 2, BC: 2, DA: 1 } },
      { label: "Dead Poets Society, Atonement, Little Women", scores: { DA: 3, CT: 2 } },
      { label: "Gossip Girl or 2000s rom-coms", scores: { Y2K: 3, CQ: 1 } },
      { label: "Bake-off shows, cottage renovation videos", scores: { CT: 3, COG: 2 } },
      { label: "Documentaries on design and architecture", scores: { SM: 3, OM: 1, CG: 1 } },
      { label: "Ballet documentaries or Black Swan", scores: { BC: 3, DA: 1 } },
      { label: "Euphoria, Skins, or anything with a killer soundtrack", scores: { IS: 3, Y2K: 1 } },
      { label: "Suits, Killing Eve, or anything with a powerful woman in tailoring", scores: { TL: 3, OM: 1 } },
    ],
  },
  {
    id: 9,
    question: "Your most-repeated outfit formula:",
    options: [
      { label: "White tee, straight jeans, gold hoops, sneakers", scores: { CG: 3, SM: 2 } },
      { label: "Linen button-down, wide-leg trouser, woven bag", scores: { COG: 3, OM: 2, SM: 1 } },
      { label: "Cashmere sweater, trouser, loafer, trench", scores: { OM: 3, COG: 1, DA: 1 } },
      { label: "Tweed blazer, pleated skirt, tights, Mary Janes", scores: { DA: 3, CQ: 1 } },
      { label: "Prairie dress, cardigan, basket bag", scores: { CT: 3, COG: 1 } },
      { label: "Tulle skirt, wrap top, ribbon in hair", scores: { BC: 3, CQ: 3 } },
      { label: "Going-out top, low-rise denim, platform", scores: { Y2K: 3 } },
      { label: "Band tee, leather jacket, boots, messy hair, done", scores: { IS: 3, DA: 1 } },
      { label: "Oversized suit, crisp shirt, loafers \u2014 no accessories needed", scores: { TL: 3, OM: 1 } },
    ],
  },
  {
    id: 10,
    question: "Your signature finishing touch:",
    subtitle: "This one carries extra weight — it says the most about you",
    weight: 1.5,
    options: [
      { label: "Slicked bun, clear lip gloss, gold hoops", scores: { CG: 3 } },
      { label: "Linen scarf, straw hat, no makeup", scores: { COG: 3 } },
      { label: "Monogrammed something, perfectly shined loafers", scores: { OM: 3 } },
      { label: "Reading glasses, a book in hand, cable cardigan", scores: { DA: 3 } },
      { label: "Fresh flowers, an apron, flour on your hands", scores: { CT: 3 } },
      { label: "Pearl earrings, pink blush, bow in hair", scores: { CQ: 3 } },
      { label: "Body glitter, lip gloss, rhinestone everything", scores: { Y2K: 3 } },
      { label: "Ribbon in hair, pink cheeks, ballet bun", scores: { BC: 3 } },
      { label: "One perfect black turtleneck, architectural earring", scores: { SM: 3 } },
      { label: "Smudged liner, messy waves, a vintage leather jacket over everything", scores: { IS: 3 } },
      { label: "A sharp blazer, slicked hair, one bold lip \u2014 nothing else", scores: { TL: 3 } },
    ],
  },
];

/**
 * Calculate the vibe archetype from quiz answers.
 * answers = { 1: optionIndex, 2: optionIndex, ... }
 */
export function calculateVibe(answers) {
  const scores = { CG: 0, COG: 0, OM: 0, DA: 0, CT: 0, CQ: 0, Y2K: 0, BC: 0, SM: 0, IS: 0, TL: 0 };

  vibeQuestions.forEach((q) => {
    const selectedIndex = answers[q.id];
    if (selectedIndex === undefined || selectedIndex === null) return;
    const option = q.options[selectedIndex];
    if (!option) return;
    const weight = q.weight || 1;
    Object.entries(option.scores).forEach(([archetype, points]) => {
      scores[archetype] += points * weight;
    });
  });

  // Sort by score descending
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primary = sorted[0][0];
  const primaryScore = sorted[0][1];
  const secondary = sorted[1][0];
  const secondaryScore = sorted[1][1];

  // Blended subtitle if gap < 3
  const isBlended = (primaryScore - secondaryScore) < 3;

  return {
    primary,
    secondary: isBlended ? secondary : null,
    scores,
    isBlended,
  };
}
