#!/usr/bin/env node
/**
 * Seed Vercel KV with product data by calling the refresh-products API.
 *
 * Usage:
 *   # Against local dev server (start `npm run dev` first):
 *   node scripts/seed-products.js
 *
 *   # Against production:
 *   SEED_URL=https://allele.app node scripts/seed-products.js
 *
 * Environment variables needed:
 *   CRON_SECRET — must match the one in Vercel dashboard
 *   SEED_URL — defaults to http://localhost:3000
 */

const baseUrl = process.env.SEED_URL || "http://localhost:3000";
const cronSecret = process.env.CRON_SECRET || "";

async function main() {
  console.log(`Seeding products via ${baseUrl}/api/refresh-products ...`);
  console.log("This will make 288 Perplexity API calls. Estimated time: ~2 minutes.");
  console.log("");

  const res = await fetch(`${baseUrl}/api/refresh-products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cronSecret}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    console.error(`HTTP ${res.status}: ${await res.text()}`);
    process.exit(1);
  }

  const data = await res.json();
  console.log("Results:");
  console.log(`  Success: ${data.success}`);
  console.log(`  Failed:  ${data.failed}`);
  console.log(`  Total:   ${data.total}`);
  console.log(`  Duration: ${(data.duration_ms / 1000).toFixed(1)}s`);

  if (data.errors?.length) {
    console.log(`\nFirst ${data.errors.length} errors:`);
    data.errors.forEach((e) => console.log(`  - ${e}`));
  }
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
