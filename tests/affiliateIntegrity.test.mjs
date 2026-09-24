import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { getProductRecommendations } from "../lib/productData.js";

const SEASONS = [
  "Clear Spring",
  "True Spring",
  "Light Spring",
  "Light Summer",
  "True Summer",
  "Soft Summer",
  "Soft Autumn",
  "True Autumn",
  "Dark Autumn",
  "Dark Winter",
  "True Winter",
  "Bright Winter",
];

function inventory() {
  const rows = [];
  for (const season of SEASONS) {
    const { categories } = getProductRecommendations(season);
    for (const category of categories) {
      for (const [tier, products] of Object.entries(category.tiers)) {
        for (const product of products) {
          rows.push({ season, category: category.key, tier, ...product });
        }
      }
    }
  }
  return rows;
}

function normalizedTokens(value) {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

test("affiliate inventory remains complete and attributable", () => {
  const rows = inventory();
  assert.equal(rows.length, 288);

  for (const row of rows) {
    assert.ok(row.brand && row.product && row.shade && row.price && row.shopUrl, `${row.season} ${row.category} ${row.tier} is incomplete`);
    const url = new URL(row.shopUrl);
    assert.ok(["go.shopmy.us", "www.amazon.com"].includes(url.hostname), `${row.shopUrl} uses an unexpected affiliate host`);

    if (url.hostname === "go.shopmy.us") {
      assert.match(url.pathname, /^\/p-\d+$/, `${row.shopUrl} is not a product-level ShopMy link`);
    } else {
      assert.equal(url.searchParams.get("tag"), "anishkanawa00-20", `${row.shopUrl} is missing Amazon attribution`);
    }
  }
});

test("Amazon searches describe the product Allele displays", () => {
  const generic = new Set(["beauty", "makeup", "mini", "palette", "lipstick", "pencil", "foundation", "concealer", "blush", "bronzer", "eyeshadow", "nail", "polish"]);

  for (const row of inventory()) {
    const url = new URL(row.shopUrl);
    if (url.hostname !== "www.amazon.com" || url.pathname !== "/s") continue;

    const queryTokens = new Set(normalizedTokens(url.searchParams.get("k")));
    const brandTokens = normalizedTokens(row.brand);
    const distinctiveProductTokens = normalizedTokens(row.product).filter((token) => !generic.has(token));

    assert.ok(brandTokens.every((token) => queryTokens.has(token)), `${row.shopUrl} does not match brand ${row.brand}`);
    if (distinctiveProductTokens.length) {
      assert.ok(distinctiveProductTokens.some((token) => queryTokens.has(token)), `${row.shopUrl} does not match product ${row.product}`);
    }
  }
});

test("one Amazon product ID never represents two different products", () => {
  const productsByAsin = new Map();

  for (const row of inventory()) {
    const match = row.shopUrl.match(/\/dp\/([A-Z0-9]+)/);
    if (!match) continue;
    const productName = `${row.brand} ${row.product}`;
    if (!productsByAsin.has(match[1])) productsByAsin.set(match[1], new Set());
    productsByAsin.get(match[1]).add(productName);
  }

  const conflicts = [...productsByAsin]
    .filter(([, productNames]) => productNames.size > 1)
    .map(([asin, productNames]) => `${asin}: ${[...productNames].join(" / ")}`);

  assert.deepEqual(conflicts, []);
});

test("foundation and concealer affiliate routes keep their network attribution", async () => {
  const source = await readFile(new URL("../app/results/ResultsContent.js", import.meta.url), "utf8");
  const urls = [...source.matchAll(/shopUrl:\s*"(https:[^"]+)"/g)].map((match) => match[1]);
  assert.equal(urls.length, 42);

  const isAttributed = {
    "www.awin1.com": (url) => url.searchParams.get("id") === "740219",
    "apiv3.shopmy.us": (url) => url.searchParams.get("cid")?.startsWith("user-267437"),
    "click.linksynergy.com": (url) => url.searchParams.get("id") === "8yaPBDQV8ls" && url.searchParams.get("u1")?.startsWith("user-267437"),
    "prf.hn": (url) => url.pathname.includes("camref:") && url.pathname.includes("pubref:user-267437"),
    "www.anrdoezrs.net": (url) => url.pathname.startsWith("/click-100149615-") && url.searchParams.get("sid")?.startsWith("user-267437"),
    "ulta.ztk5.net": (url) => url.pathname.startsWith("/c/2340682/"),
    "goto.target.com": (url) => url.pathname.startsWith("/c/2340682/"),
  };

  for (const value of urls) {
    const url = new URL(value);
    assert.ok(isAttributed[url.hostname], `${value} uses an unknown affiliate network`);
    assert.ok(isAttributed[url.hostname](url), `${value} is missing Allele's affiliate attribution`);
  }
});
