import { getProductRecommendations } from "../lib/productData.js";
import { seasons } from "../lib/seasonData.js";
import fs from "fs";

const SEASONS = [
  "Clear Spring", "True Spring", "Light Spring",
  "Light Summer", "True Summer", "Soft Summer",
  "Soft Autumn", "True Autumn", "Dark Autumn",
  "Dark Winter", "True Winter", "Bright Winter",
];

const out = {};
for (const s of SEASONS) {
  const recs = getProductRecommendations(s);
  const sd = seasons[s];
  out[s] = {
    bestColors: sd?.bestColors || [],
    bestColorNames: sd?.bestColorNames || [],
    description: sd?.description || "",
    categories: recs.categories,
  };
}
fs.writeFileSync("/tmp/allele-products.json", JSON.stringify(out, null, 2));
console.log("seasons:", Object.keys(out).length);
console.log("Light Spring categories:", out["Light Spring"].categories.length);
console.log("Light Spring foundation budget sample:", JSON.stringify(out["Light Spring"].categories.find(c=>c.key==="foundation").tiers.budget?.[0] || out["Light Spring"].categories.find(c=>c.key==="foundation").tiers.budget));
