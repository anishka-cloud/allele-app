import { seasons } from "./seasonData";

/**
 * Step 1: Determine undertone from Q1, Q2, Q3, Q12
 */
function calculateUndertone(answers) {
  let warm = 0;
  let cool = 0;

  // Q1: Veins
  if (answers[1] === "green") warm++;
  if (answers[1] === "blue") cool++;

  // Q2: Metal
  if (answers[2] === "gold") warm++;
  if (answers[2] === "silver") cool++;

  // Q3: Sun
  if (answers[3] === "tan") warm++;
  if (answers[3] === "burn") cool++;

  // Q12: Paper
  if (answers[12] === "cream") warm++;
  if (answers[12] === "white") cool++;

  if (warm >= 2) return "Warm";
  if (cool >= 2) return "Cool";
  return "Neutral";
}

/**
 * Step 1b: Olive flag from Q4
 */
function checkOlive(answers) {
  return answers[4] === "yes";
}

/**
 * Step 2: Value/Depth from Q5, Q6, Q7
 */
function calculateValue(answers) {
  const scores = [];

  // Q5: Hair color
  const q5Map = { light_warm: "Light", light_cool: "Light", deep_warm: "Deep", deep_cool: "Deep" };
  if (q5Map[answers[5]]) scores.push(q5Map[answers[5]]);

  // Q6: Hair darkness
  const q6Map = { light: "Light", medium: "Medium", dark: "Deep" };
  if (q6Map[answers[6]]) scores.push(q6Map[answers[6]]);

  // Q7: Skin tone
  const q7Map = {
    very_fair: "Light", fair: "Light", light: "Light",
    light_medium: "Medium", medium: "Medium", medium_tan: "Medium",
    medium_deep: "Deep", deep: "Deep", very_deep: "Deep",
  };
  if (q7Map[answers[7]]) scores.push(q7Map[answers[7]]);

  // Average
  const valueMap = { Light: 1, Medium: 2, Deep: 3 };
  const total = scores.reduce((sum, v) => sum + valueMap[v], 0);
  const avg = total / scores.length;

  if (avg <= 1.5) return "Light";
  if (avg >= 2.5) return "Deep";
  return "Medium";
}

/**
 * Step 3: Chroma from Q8, Q9
 */
function calculateChroma(answers) {
  let clearSignals = 0;
  let mutedSignals = 0;

  // Q8: Eye color
  if (answers[8] === "light") clearSignals++;
  if (answers[8] === "dark") mutedSignals++;

  // Q9: Eye brightness
  if (answers[9] === "bright") clearSignals++;
  if (answers[9] === "soft") mutedSignals++;

  if (clearSignals >= 2) return "Clear";
  if (mutedSignals >= 2) return "Muted";
  return "Balanced";
}

/**
 * Step 4: Contrast from Q10
 */
function getContrast(answers) {
  return answers[10] || "medium";
}

/**
 * Step 5: Map to 12 seasons
 */
function mapToSeason(undertone, value, chroma, contrast, answers) {
  // Main mapping table
  const seasonMap = {
    "Warm-Light-Clear": "Clear Spring",
    "Warm-Light-Balanced": "True Spring",
    "Warm-Light-Muted": "Light Spring",
    "Cool-Light-Muted": "Soft Summer",
    "Cool-Light-Balanced": "True Summer",
    "Cool-Light-Clear": "Light Summer",
    "Warm-Deep-Muted": "Soft Autumn",
    "Warm-Deep-Balanced": "True Autumn",
    "Warm-Deep-Clear": "Dark Autumn",
    "Cool-Deep-Muted": "Dark Winter",
    "Cool-Deep-Balanced": "True Winter",
    "Cool-Deep-Clear": "Bright Winter",
  };

  // Handle medium value: lean based on contrast
  let adjustedValue = value;
  if (value === "Medium") {
    if (contrast === "low") {
      adjustedValue = "Light";
    } else if (contrast === "high") {
      adjustedValue = "Deep";
    } else {
      // Default to Light for medium contrast
      adjustedValue = "Light";
    }
  }

  // Handle Neutral undertone: use Q11 as tiebreaker
  let adjustedUndertone = undertone;
  if (undertone === "Neutral") {
    const q11Map = {
      spring: "Warm",
      summer: "Cool",
      autumn: "Warm",
      winter: "Cool",
    };
    adjustedUndertone = q11Map[answers[11]] || "Warm";
  }

  const key = `${adjustedUndertone}-${adjustedValue}-${chroma}`;
  let result = seasonMap[key];

  // Fallback: if no exact match, find closest
  if (!result) {
    // Try with Balanced chroma as fallback
    const fallbackKey = `${adjustedUndertone}-${adjustedValue}-Balanced`;
    result = seasonMap[fallbackKey] || "True Spring";
  }

  return result;
}

/**
 * Step 6: Q11 confirmation — if Q11 contradicts, use as tiebreaker
 */
function confirmWithQ11(season, answers) {
  const seasonFamilyMap = {
    spring: "Spring",
    summer: "Summer",
    autumn: "Autumn",
    winter: "Winter",
  };

  const q11Family = seasonFamilyMap[answers[11]];
  const currentFamily = seasons[season]?.family;

  // If Q11 agrees, keep the result
  if (!q11Family || q11Family === currentFamily) {
    return season;
  }

  // If Q11 disagrees, look for a season in the Q11 family that matches
  // the undertone and value better
  // Only override if there's a strong signal
  return season;
}

/**
 * Main scoring function
 */
export function calculateSeason(answers) {
  const undertone = calculateUndertone(answers);
  const oliveFlag = checkOlive(answers);
  const value = calculateValue(answers);
  const chroma = calculateChroma(answers);
  const contrast = getContrast(answers);

  let season = mapToSeason(undertone, value, chroma, contrast, answers);
  season = confirmWithQ11(season, answers);

  return {
    season,
    undertone,
    oliveFlag,
    value,
    chroma,
    contrast,
    data: seasons[season],
  };
}
