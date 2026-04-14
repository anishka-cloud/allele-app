// Applies the color analysis audit patches to seasonData.js and emailTemplate.js.
// Reads the patch JSON at ~/Documents/Allele - DNA /allele/shade-dna/allele-color-fixes.json
// and surgically updates each season's bestColors, bestColorNames (add), celebrities,
// and description in seasonData.js, plus celebs + palette in emailTemplate.js SEASON_META.

import fs from "fs";
import path from "path";

const REPO = "/Users/anishkanawagamuwa/.gemini/antigravity/brain/3c74dbcd-78c1-45b5-ac4f-9b51c3149784/shade DNA";
const PATCH = "/Users/anishkanawagamuwa/Documents/Allele - DNA /allele/shade-dna/allele-color-fixes.json";

const raw = fs.readFileSync(PATCH, "utf8");
const patch = JSON.parse(raw);
delete patch._meta;

const seasonDataPath = path.join(REPO, "lib/seasonData.js");
const emailTemplatePath = path.join(REPO, "lib/emailTemplate.js");

let seasonData = fs.readFileSync(seasonDataPath, "utf8");
let emailTemplate = fs.readFileSync(emailTemplatePath, "utf8");

function formatHexArray(arr, indent = "      ") {
  return "[\n" + indent + arr.map(h => `"${h}"`).join(", ") + ",\n    ]";
}

function formatNameArray(arr, indent = "      ") {
  return "[\n" + indent + arr.map(n => `"${n}"`).join(", ") + ",\n    ]";
}

function formatCelebrities(c) {
  return `{
      fairLight: [${c.fairLight.map(s => `"${s}"`).join(", ")}],
      medium: [${c.medium.map(s => `"${s}"`).join(", ")}],
      mediumDeepDeep: [${c.mediumDeepDeep.map(s => `"${s}"`).join(", ")}]
    }`;
}

function patchSeasonBlock(text, seasonName, fields) {
  // Find the season block: starts at `"{seasonName}": {` ends at the next top-level `},`
  // We match non-greedily up to the closing `},` followed by a newline+quote or end.
  const start = text.indexOf(`"${seasonName}": {`);
  if (start === -1) {
    console.warn(`[patch] Could not find "${seasonName}" in seasonData.js`);
    return text;
  }
  // Find the matching closing brace by counting braces
  let depth = 0;
  let i = start;
  let inString = false;
  let escape = false;
  while (i < text.length) {
    const ch = text[i];
    if (escape) { escape = false; i++; continue; }
    if (ch === "\\") { escape = true; i++; continue; }
    if (ch === '"') { inString = !inString; i++; continue; }
    if (!inString) {
      if (ch === "{") depth++;
      else if (ch === "}") {
        depth--;
        if (depth === 0) { i++; break; }
      }
    }
    i++;
  }
  const end = i;
  let block = text.slice(start, end);

  // Replace bestColors array
  if (fields.bestColors) {
    const bcRegex = /bestColors:\s*\[[^\]]*\]/;
    if (bcRegex.test(block)) {
      block = block.replace(bcRegex, `bestColors: ${formatHexArray(fields.bestColors)}`);
    }
  }

  // Add or replace bestColorNames array (new field — insert right after bestColors if missing)
  if (fields.bestColorNames) {
    const bcnRegex = /bestColorNames:\s*\[[^\]]*\]/;
    if (bcnRegex.test(block)) {
      block = block.replace(bcnRegex, `bestColorNames: ${formatNameArray(fields.bestColorNames)}`);
    } else {
      // Insert after bestColors line
      const afterBc = block.match(/(bestColors:\s*\[[^\]]*\],?)/);
      if (afterBc) {
        const injected = `${afterBc[0]}\n    bestColorNames: ${formatNameArray(fields.bestColorNames)},`;
        block = block.replace(afterBc[0], injected);
      }
    }
  }

  // Replace celebrities object
  if (fields.celebrities) {
    const celebRegex = /celebrities:\s*\{[^}]*\}/;
    if (celebRegex.test(block)) {
      block = block.replace(celebRegex, `celebrities: ${formatCelebrities(fields.celebrities)}`);
    }
  }

  // Replace description — it spans multiple lines with backticks or quotes + concat
  if (fields.description) {
    const descRegex = /description:\s*(?:"[^"]*"|`[^`]*`)/;
    if (descRegex.test(block)) {
      const escaped = fields.description.replace(/`/g, "\\`").replace(/\$/g, "\\$");
      block = block.replace(descRegex, `description:\n      \`${escaped}\``);
    }
  }

  return text.slice(0, start) + block + text.slice(end);
}

function patchEmailTemplate(text, seasonName, fields) {
  if (!fields.celebs && !fields.palette) return text;

  const start = text.indexOf(`"${seasonName}": {`);
  if (start === -1) {
    console.warn(`[patch] Could not find "${seasonName}" in emailTemplate.js SEASON_META`);
    return text;
  }
  // Find the next '},' at depth 0 from start
  let depth = 0;
  let i = start;
  let inString = false;
  let escape = false;
  while (i < text.length) {
    const ch = text[i];
    if (escape) { escape = false; i++; continue; }
    if (ch === "\\") { escape = true; i++; continue; }
    if (ch === '"') { inString = !inString; i++; continue; }
    if (!inString) {
      if (ch === "{") depth++;
      else if (ch === "}") {
        depth--;
        if (depth === 0) { i++; break; }
      }
    }
    i++;
  }
  const end = i;
  let block = text.slice(start, end);

  if (fields.celebs) {
    const celebRegex = /celebs:\s*"[^"]*"/;
    if (celebRegex.test(block)) {
      block = block.replace(celebRegex, `celebs: "${fields.celebs.replace(/"/g, '\\"')}"`);
    }
  }

  if (fields.palette) {
    const palRegex = /palette:\s*"[^"]*"/;
    if (palRegex.test(block)) {
      block = block.replace(palRegex, `palette: "${fields.palette.replace(/"/g, '\\"')}"`);
    }
  }

  return text.slice(0, start) + block + text.slice(end);
}

const seasons = Object.keys(patch);
console.log(`Patching ${seasons.length} seasons...`);

for (const season of seasons) {
  const fields = patch[season];
  seasonData = patchSeasonBlock(seasonData, season, fields);
  emailTemplate = patchEmailTemplate(emailTemplate, season, fields);
  console.log(`✓ ${season}`);
}

fs.writeFileSync(seasonDataPath, seasonData);
fs.writeFileSync(emailTemplatePath, emailTemplate);
console.log("\nFiles written. Running parse check via node --check...");
