export const FIT_STORAGE_KEY = "allele_fit_dna_v1";

export const fitQuestions = [
  {
    id: "length",
    question: "When you shop for jeans, which length usually works best?",
    help: {
      title: "Measure a pair you already like",
      body: "Lay the jeans flat and measure from the crotch seam to the bottom of the hem. That inseam is more useful than a generic petite, regular, or tall label.",
      note: "Compare this number with each retailer’s garment measurements; inseam labels are not standardized.",
      fields: [{ id: "inseam", label: "Best-fitting inseam" }],
    },
    options: [
      { label: "Petite / short", value: "petite" },
      { label: "Standard", value: "standard" },
      { label: "Tall / long", value: "tall" },
      { label: "I usually cuff or alter them depending on the jean", value: "alter" },
    ],
  },
  {
    id: "torso",
    question: "How would you describe your torso?",
    help: {
      title: "Use the waistband, not a body label",
      body: "A rough visual cue is to stack your hands between your underbust and navel: clearly less or more than about two hand-widths may suggest a shorter or longer midsection. Treat this only as a prompt—hand size, bust position, and navel position vary.",
      note: "The more useful denim check: note where a known front rise lands. If a typical high rise crowds your ribs, you may prefer a shorter rise; if it still sits below your natural waist, you may prefer more rise depth.",
      fields: [{ id: "frontRise", label: "Front rise that feels good" }],
    },
    options: [
      { label: "Shorter torso / higher natural waist", value: "short" },
      { label: "Pretty balanced", value: "balanced" },
      { label: "Longer torso / lower natural waist", value: "long" },
      { label: "Honestly, I’m not sure", value: "unsure" },
    ],
  },
  {
    id: "waist_hip",
    question: "How does your waist compare with your hips and seat?",
    help: {
      title: "Compare two measurements",
      body: "Measure your natural waist where you bend, then your fullest hip and seat. Keep the tape level and comfortably close—do not pull it tight.",
      note: "The difference is a shopping clue, not a body type. If your waist and hip land in different sizes on a brand chart, shop for the fuller measurement first and assess its contour-waist or curvy-fit options.",
      fields: [
        { id: "waist", label: "Natural waist" },
        { id: "hip", label: "Full hip / seat" },
      ],
    },
    options: [
      { label: "My waist is noticeably smaller", value: "defined" },
      { label: "Fairly balanced", value: "balanced" },
      { label: "I’m straighter through the waist and hips", value: "straight" },
      { label: "Not sure", value: "unsure" },
    ],
  },
  {
    id: "fit_issue",
    question: "What usually goes wrong when you try on jeans?",
    help: {
      title: "Look at where the strain appears",
      body: "Try the size that fits your fullest point, then check the waistband, front rise, seat, upper thigh, and hem separately. Pulling, gaping, and excess fabric point to different pattern problems.",
      note: "If sizing up fixes one area but creates a new problem elsewhere, the cut may be wrong even when the size chart is technically correct.",
    },
    options: [
      { label: "The waist gaps at the back", value: "waist_gap" },
      { label: "They fit my waist but pull at my hips or thighs", value: "hip_thigh_pull" },
      { label: "The waistband feels restrictive in the front", value: "front_tight" },
      { label: "The seat or crotch fit just feels wrong", value: "seat_rise" },
      { label: "The length is always wrong", value: "length" },
      { label: "Jeans usually fit me pretty predictably", value: "predictable" },
    ],
  },
  {
    id: "rise",
    question: "Which rise do you actually feel best in?",
    help: {
      title: "Measure the jean, not your torso",
      body: "Lay a comfortable pair flat and measure from the crotch seam to the top of the front waistband. Record that front rise, then compare it with retailer garment measurements.",
      note: "Rise names vary by brand. The number from a pair you like is the reliable reference.",
      fields: [{ id: "frontRise", label: "Front rise that feels good" }],
    },
    options: [
      { label: "Low", value: "low" },
      { label: "Mid", value: "mid" },
      { label: "High", value: "high" },
      { label: "I genuinely do not know", value: "unsure" },
    ],
  },
  {
    id: "silhouette",
    question: "Which denim silhouette do you naturally reach for?",
    help: {
      title: "Start with the pair you actually wear",
      body: "Ignore what is supposed to suit you. Think about the jeans you reach for without negotiating with them: narrow and skimming, straight from hip to hem, relaxed and wide, or opening below the knee.",
      note: "Preference is evidence. Fit DNA gives it more weight than a generic proportion rule.",
    },
    options: [
      { label: "Slim / cigarette", value: "slim" },
      { label: "Straight", value: "straight" },
      { label: "Wide / relaxed", value: "wide" },
      { label: "Bootcut / subtle flare", value: "bootcut" },
      { label: "I want Allele to choose", value: "choose" },
    ],
  },
  {
    id: "goal",
    question: "What do you most want your jeans to do visually?",
    help: {
      title: "Choose the line you want to see",
      body: "This question is about styling intent, not correcting your body. Imagine the outline of the jeans from waistband to hem and choose the effect you want that garment to create.",
      note: "Nothing specific is a complete answer. Fit and comfort can be the whole goal.",
    },
    options: [
      { label: "Define my waist", value: "define_waist" },
      { label: "Create a longer leg line", value: "longer_legs" },
      { label: "Balance my proportions", value: "balance" },
      { label: "Give my hips and thighs more room", value: "hip_room" },
      { label: "Create a relaxed, straighter column", value: "column" },
      { label: "Nothing specific. I just want them to fit well.", value: "fit" },
    ],
  },
  {
    id: "shoes",
    question: "What shoes are you most likely to wear with them?",
    help: {
      title: "Measure length with the real shoe",
      body: "Bring or wear the shoe you expect to pair with the jeans. A hem that works with a loafer may sit very differently over a sneaker or heeled boot.",
      note: "For mixed shoes, fit the hem to the pair you wear most and decide whether cuffing is acceptable for the others.",
    },
    options: [
      { label: "Flats / loafers", value: "flats" },
      { label: "Sneakers", value: "sneakers" },
      { label: "Heels or boots with height", value: "heels" },
      { label: "All of the above", value: "mixed" },
    ],
  },
  {
    id: "fabric",
    question: "How do you like your denim to feel?",
    help: {
      title: "Read the fiber label",
      body: "Rigid denim is usually all or nearly all cotton. Even a small amount of elastane adds give; softer stretch blends move more but may hold less structure over repeated wear.",
      note: "Fiber content does not guarantee feel, so use the label as a clue and the fitting room as the final test.",
    },
    options: [
      { label: "Rigid, vintage denim", value: "rigid" },
      { label: "Mostly structured with a little give", value: "structured" },
      { label: "Soft / stretchy / comfort first", value: "stretch" },
      { label: "No preference", value: "unsure" },
    ],
  },
];

const LABELS = {
  rise: { low: "Low", mid: "Mid", high: "High" },
  leg: {
    slim_straight: "Slim-straight",
    straight: "Straight",
    wide: "Wide leg",
    bootcut: "Bootcut",
  },
  fabric: {
    rigid: "Rigid",
    structured: "Structured with give",
    comfort_stretch: "Comfort stretch",
  },
  length: {
    petite: "Petite / ankle-first",
    standard: "Standard full length",
    tall: "Tall / long inseam",
    alter: "Fit first, then alter",
  },
};

export const fitWatchouts = {
  waist_gap:
    "Look for contour waistbands or curvy-fit patterning. Buy for your hips and seat first, then tailor the waist if needed instead of sizing down until the hips pull.",
  hip_thigh_pull:
    "Shop to your fullest point first. A roomier thigh and seat pattern matters more than the number on the size tag.",
  front_tight:
    "Try a slightly lower rise or denim with more give. The right size should not require you to brace your entire midsection.",
  seat_rise:
    "Pay attention to rise depth and back rise, not just waist size. If pulling or whiskering persists, the pattern itself may be wrong even when the size technically fits.",
  length:
    "Choose the shoe-and-hem relationship you want first, then use petite, short, tall, long, or tailoring to get there.",
  predictable:
    "Use silhouette and fabric as your deciding variables rather than chasing a different size.",
};

const lengthBase = {
  petite: "Petite or ankle-first. Check where the designer intended the hem to hit before tailoring.",
  standard: "Standard full length. Let your most-worn shoe determine the final hem.",
  tall: "Prioritize tall or long inseams so the silhouette keeps its intended proportions.",
  alter: "Shop for the rise, seat, and leg shape first. Hem length can be altered after the hard part fits.",
};

const shoeNotes = {
  flats: "Check the hem in flats so it reads clean rather than pooling at the floor.",
  sneakers: "Use your most-worn sneaker to judge whether the hem breaks where you want it.",
  heels: "Keep enough full length or break for the heel height you wear most.",
  mixed: "Evaluate the hem with the shoes you wear most before committing to a length.",
};

function add(scores, key, amount) {
  scores[key] += amount;
}

function winner(scores, fallback) {
  const max = Math.max(...Object.values(scores));
  const leaders = Object.keys(scores).filter((key) => scores[key] === max);
  return leaders.length === 1 ? leaders[0] : fallback;
}

export function scoreRise(answers = {}) {
  const scores = { low: 0, mid: 0, high: 0 };
  if (["low", "mid", "high"].includes(answers.rise)) add(scores, answers.rise, 4);

  if (answers.torso === "short") {
    add(scores, "mid", 2);
    add(scores, "low", 1);
  } else if (answers.torso === "long") {
    add(scores, "high", 2);
    add(scores, "mid", 1);
  }

  if (answers.goal === "define_waist") add(scores, "high", 2);
  if (answers.goal === "longer_legs") {
    add(scores, "high", 2);
    add(scores, "mid", 1);
  }

  if (answers.fit_issue === "front_tight") {
    add(scores, "mid", 2);
    add(scores, "low", 1);
  } else if (answers.fit_issue === "waist_gap") {
    add(scores, "high", 1);
    add(scores, "mid", 1);
  }

  return winner(scores, "mid");
}

export function scoreLeg(answers = {}) {
  const scores = { slim_straight: 0, straight: 0, wide: 0, bootcut: 0 };
  const preferenceMap = {
    slim: "slim_straight",
    straight: "straight",
    wide: "wide",
    bootcut: "bootcut",
  };
  if (preferenceMap[answers.silhouette]) add(scores, preferenceMap[answers.silhouette], 4);

  if (answers.fit_issue === "hip_thigh_pull") {
    add(scores, "wide", 3);
    add(scores, "straight", 2);
    add(scores, "bootcut", 1);
  }

  if (answers.goal === "hip_room") {
    add(scores, "wide", 3);
    add(scores, "straight", 1);
  } else if (answers.goal === "balance") {
    add(scores, "bootcut", 3);
    add(scores, "straight", 1);
  } else if (answers.goal === "longer_legs") {
    add(scores, "slim_straight", 2);
    add(scores, "straight", 2);
    add(scores, "bootcut", 1);
  } else if (answers.goal === "column") {
    add(scores, "wide", 3);
    add(scores, "straight", 1);
  }

  if (answers.waist_hip === "defined") {
    add(scores, "straight", 1);
    add(scores, "bootcut", 1);
    add(scores, "wide", 1);
  } else if (answers.waist_hip === "straight") {
    add(scores, "slim_straight", 1);
    add(scores, "straight", 1);
    add(scores, "wide", 1);
  }

  return winner(scores, "straight");
}

export function scoreFabric(answers = {}) {
  if (answers.fabric === "rigid") return "rigid";
  if (answers.fabric === "structured") return "structured";
  if (answers.fabric === "stretch") return "comfort_stretch";
  if (answers.fit_issue === "front_tight") return "comfort_stretch";
  if (["hip_thigh_pull", "seat_rise"].includes(answers.fit_issue)) return "structured";
  return "structured";
}

function buildReasons(answers, result) {
  const reasons = [];
  const issueReasons = {
    waist_gap: "You told us the waist often gaps even when the rest of the jean is closer to fitting.",
    hip_thigh_pull: "You need more room through the hips or thighs, so the leg pattern has to make space there first.",
    front_tight: "A restrictive front waistband makes rise and fabric give more important than the size on the tag.",
    seat_rise: "Because the seat or crotch often feels wrong, rise depth and back-rise shape deserve extra attention.",
    length: "Length is the repeat problem, so the intended hem and available inseam come before trend details.",
    predictable: "Your fit is usually predictable, which makes silhouette and denim feel the useful deciding variables.",
  };
  if (issueReasons[answers.fit_issue]) reasons.push(issueReasons[answers.fit_issue]);

  if (["low", "mid", "high"].includes(answers.rise)) {
    reasons.push(`You already feel best in a ${LABELS.rise[answers.rise].toLowerCase()} rise, so that preference carried the most weight.`);
  } else if (answers.torso === "short") {
    reasons.push("A mid-rise starting point leaves more room through a shorter torso without forcing the waistband too high.");
  } else if (answers.torso === "long") {
    reasons.push("A higher rise can meet a longer torso more naturally and support the proportions you described.");
  }

  const silhouetteReasons = {
    slim: "You naturally reach for a slimmer line, so the result keeps that instinct without making the leg skin-tight.",
    straight: "You naturally reach for straight jeans, and your other answers did not outweigh that preference.",
    wide: "You naturally reach for a wider, more relaxed leg, so that preference remained the anchor.",
    bootcut: "You naturally reach for bootcut or a subtle flare, so the recommendation keeps that familiar line.",
    choose: `You asked Allele to choose; your fit and proportion answers pointed most consistently to ${LABELS.leg[result.leg].toLowerCase()}.`,
  };
  if (silhouetteReasons[answers.silhouette]) reasons.push(silhouetteReasons[answers.silhouette]);

  const goalReasons = {
    define_waist: "You want more waist definition, so the rise needs to meet your waist rather than float below it.",
    longer_legs: "You want a longer leg line, so rise, hem, and an uninterrupted leg shape work together here.",
    balance: "You asked for visual balance, so the leg opening carries some shape below the knee.",
    hip_room: "You asked for more hip and thigh room, so ease through the upper leg is part of the recommendation.",
    column: "You want a relaxed column, so the leg falls with less interruption from hip to hem.",
    fit: "You prioritized fit over a visual effect, so comfort and repeat fit problems drove the result.",
  };
  if (goalReasons[answers.goal]) reasons.push(goalReasons[answers.goal]);

  if (answers.length === "alter") {
    reasons.push("Because you already cuff or alter jeans, rise and seat fit should come before inseam.");
  }

  return reasons.slice(0, 4);
}

function buildSummary(result) {
  const legCopy = {
    slim_straight: "a clean, narrow line that still skims",
    straight: "a clean line with usable room through the leg",
    wide: "an easier line through the hip and thigh",
    bootcut: "a controlled opening below the knee",
  };
  const fabricCopy = {
    rigid: "structured vintage denim",
    structured: "denim that holds its shape with a little give",
    comfort_stretch: "soft stretch that moves without fighting the waistband",
  };
  return `${LABELS.rise[result.rise]} rise, ${legCopy[result.leg]}, and ${fabricCopy[result.fabric]}.`;
}

export function calculateFitDna(answers = {}) {
  const rise = scoreRise(answers);
  const leg = scoreLeg(answers);
  const fabric = scoreFabric(answers);
  const length = ["petite", "standard", "tall", "alter"].includes(answers.length)
    ? answers.length
    : "standard";
  const fitIssue = fitWatchouts[answers.fit_issue] ? answers.fit_issue : "predictable";
  const result = { rise, leg, length, fabric, fitIssue };

  return {
    ...result,
    headline: `${LABELS.rise[rise]}-rise ${LABELS.leg[leg].toLowerCase()}`,
    summary: buildSummary(result),
    labels: {
      rise: LABELS.rise[rise],
      leg: LABELS.leg[leg],
      length: LABELS.length[length],
      fabric: LABELS.fabric[fabric],
    },
    lengthGuidance: `${lengthBase[length]} ${shoeNotes[answers.shoes] || shoeNotes.mixed}`,
    watchout: fitWatchouts[fitIssue],
    reasons: buildReasons(answers, result),
  };
}

export function answersToSearchParams(answers = {}) {
  const params = new URLSearchParams();
  for (const question of fitQuestions) {
    if (answers[question.id]) params.set(question.id, answers[question.id]);
  }
  return params;
}

export function answersFromSearchParams(searchParams) {
  const answers = {};
  for (const question of fitQuestions) {
    const value = searchParams.get(question.id);
    if (question.options.some((option) => option.value === value)) answers[question.id] = value;
  }
  return answers;
}

export function hasCompleteFitAnswers(answers = {}) {
  return fitQuestions.every((question) => Boolean(answers[question.id]));
}

export function buildFitNotes(result, measurements = {}) {
  const measurementLines = [];
  const unit = measurements.unit === "cm" ? "cm" : "in";
  if (measurements.waist) measurementLines.push(`Natural waist: ${measurements.waist} ${unit}`);
  if (measurements.hip) measurementLines.push(`Full hip / seat: ${measurements.hip} ${unit}`);
  if (measurements.inseam) measurementLines.push(`Best-fitting inseam: ${measurements.inseam} ${unit}`);
  if (measurements.frontRise) measurementLines.push(`Comfortable front rise: ${measurements.frontRise} ${unit}`);

  return [
    "My Fit DNA — Denim Edition",
    `Rise: ${result.labels.rise}`,
    `Leg: ${result.labels.leg}`,
    `Length: ${result.labels.length}`,
    `Fabric: ${result.labels.fabric}`,
    `Fit note: ${result.watchout}`,
    ...(measurementLines.length ? ["", "My measurements", ...measurementLines] : []),
    "",
    "Fit DNA is a starting point, not a rulebook. The jean that feels best on your body wins.",
  ].join("\n");
}
