const CATEGORY_FIELDS = {
  makeup: [
    ["variant", "shade or color"],
    ["finishOrFit", "finish or texture"],
    ["facts", "formula or ingredient information"],
  ],
  clothing: [
    ["variant", "color"],
    ["finishOrFit", "fit or cut"],
    ["size", "size information"],
    ["facts", "fabric or care information"],
  ],
  other: [
    ["variant", "variant or model"],
    ["finishOrFit", "how it is meant to perform"],
    ["facts", "product details"],
  ],
};

const COMPARISON_FIELDS = [
  ["variant", "shade, color, or variant"],
  ["finishOrFit", "finish, texture, or fit"],
  ["size", "size"],
];

function clean(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalize(value) {
  return clean(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function sameValue(left, right) {
  const a = normalize(left);
  const b = normalize(right);
  return Boolean(a && b && (a === b || a.includes(b) || b.includes(a)));
}

function exactValue(left, right) {
  const a = normalize(left);
  const b = normalize(right);
  return Boolean(a && b && a === b);
}

function displayName(item) {
  return [clean(item.brand), clean(item.name)].filter(Boolean).join(" ") || "your saved item";
}

function findClosest(items, candidate) {
  return items
    .map((item) => {
      const matches = COMPARISON_FIELDS
        .filter(([key]) => sameValue(item[key], candidate[key]))
        .map(([, label]) => label);
      const exactProduct =
        exactValue(item.name, candidate.name) &&
        (!clean(candidate.brand) || exactValue(item.brand, candidate.brand));

      return {
        item,
        matches,
        score: matches.length + (exactProduct ? 3 : 0),
        exactProduct,
      };
    })
    .sort((a, b) => b.score - a.score)[0];
}

export function evaluatePurchase(ownedItems = [], candidate = {}) {
  const category = CATEGORY_FIELDS[candidate.category] ? candidate.category : "other";
  const sameCategoryItems = ownedItems.filter((item) => item.category === category);
  const missing = CATEGORY_FIELDS[category]
    .filter(([key]) => !clean(candidate[key]))
    .map(([, label]) => label);

  if (!clean(candidate.sourceUrl)) {
    missing.push("a traceable product source");
  }

  const base = {
    candidateName: displayName(candidate),
    category,
    confidence: "low",
    closestItem: null,
    signals: [],
    tradeoffs: [],
    missing,
    ownedEvidence: [],
    candidateEvidence: [],
  };

  if (clean(candidate.facts)) {
    base.candidateEvidence.push(clean(candidate.facts));
  }
  if (clean(candidate.sourceUrl)) {
    base.candidateEvidence.push(`Source supplied: ${clean(candidate.sourceUrl)}`);
  }
  if (clean(candidate.price)) {
    base.tradeoffs.push(
      `You entered a price of ${clean(candidate.price)}. Allele cannot judge whether that price is fair without current retailer data.`,
    );
  }
  if (clean(candidate.hesitations)) {
    base.tradeoffs.push(`Your open concern: ${clean(candidate.hesitations)}`);
  }

  if (sameCategoryItems.length === 0) {
    return {
      ...base,
      status: "learn-more",
      label: "Learn more first",
      headline: "There is not enough personal evidence yet.",
      summary:
        "You have not saved a comparable item in this category. Allele can organize the decision, but it should not pretend to know your preferences yet.",
      nextStep:
        "Add one item in this category that worked or failed, or verify the missing product details before deciding.",
    };
  }

  const closest = findClosest(sameCategoryItems, candidate);
  const closestName = displayName(closest.item);
  const ownedEvidence = [
    `${closestName}: ${clean(closest.item.works)}`,
  ];
  if (clean(closest.item.doesNotWork)) {
    ownedEvidence.push(`${closestName}, limitation: ${clean(closest.item.doesNotWork)}`);
  }

  const comparableSummary = closest.matches.length
    ? `${displayName(candidate)} overlaps with ${closestName} on ${closest.matches.join(", ")}.`
    : `${displayName(candidate)} does not yet show a clear attribute overlap with ${closestName}.`;

  if (closest.exactProduct || closest.matches.length >= 2) {
    return {
      ...base,
      status: "skip",
      label: "Probably skip",
      headline: "You may already own something that does this.",
      confidence: closest.exactProduct ? "high" : "medium",
      closestItem: closest.item,
      signals: [comparableSummary],
      ownedEvidence,
      summary:
        "The candidate is close to an item you already know. Unless it solves a documented limitation or replaces something used up, the difference is not clear enough to justify another purchase.",
      nextStep:
        "Name the specific new job this purchase would do. If you cannot, keep the item you already trust.",
    };
  }

  if (closest.matches.length === 1 && missing.length <= 2) {
    return {
      ...base,
      status: "consider",
      label: "Worth a closer look",
      headline: "This carries one trait you already know works.",
      confidence: "medium",
      closestItem: closest.item,
      signals: [comparableSummary],
      ownedEvidence,
      summary:
        "There is a useful connection to your experience, but not enough overlap to call this a duplicate. The remaining tradeoffs still matter.",
      nextStep:
        "Check the missing information, then compare the candidate against the limitation you want it to solve.",
    };
  }

  return {
    ...base,
    status: "learn-more",
    label: "Learn more first",
    headline: "The purchase case is still unclear.",
    confidence: "low",
    closestItem: closest.item,
    signals: [comparableSummary],
    ownedEvidence,
    summary:
      "The information supplied does not establish that this will repeat what works for you, avoid what does not, or fill a genuinely different role.",
    nextStep:
      "Verify the missing details or try the product in person. A recommendation would be guesswork right now.",
  };
}
