#!/usr/bin/env node
/**
 * Seed Vercel KV by calling refresh-products one season/archetype at a time.
 * This avoids the 60-second Vercel Hobby plan timeout.
 *
 * Usage:
 *   CRON_SECRET=xxx SEED_URL=https://allele.app node scripts/seed-products.js
 *   CRON_SECRET=xxx SEED_URL=https://allele.app node scripts/seed-products.js shade
 *   CRON_SECRET=xxx SEED_URL=https://allele.app node scripts/seed-products.js vibe
 */

const baseUrl = process.env.SEED_URL || "https://www.allele.app";
const cronSecret = process.env.CRON_SECRET || "";

const SHADE_SEASONS = [
  "clear-spring", "true-spring", "light-spring",
  "light-summer", "true-summer", "soft-summer",
  "soft-autumn", "true-autumn", "dark-autumn",
  "dark-winter", "true-winter", "bright-winter",
];

const VIBE_ARCHETYPES = [
  "clean-girl", "coastal-grandmother", "quiet-luxury",
  "dark-academia", "cottagecore", "coquette",
  "y2k-revival", "balletcore", "scandi-minimalist",
  "indie-sleaze", "tomboy-luxe",
];

async function refreshOne(type, id) {
  const param = type === "shade" ? `season=${id}` : `archetype=${id}`;
  const url = `${baseUrl}/api/refresh-products?type=${type}&${param}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${cronSecret}` },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
  }

  return res.json();
}

async function main() {
  const filter = process.argv[2]; // "shade", "vibe", or undefined (both)
  let totalSuccess = 0;
  let totalFailed = 0;

  if (!filter || filter === "shade") {
    console.log(`\nSeeding Shade DNA (${SHADE_SEASONS.length} seasons, 24 products each)...\n`);
    for (const season of SHADE_SEASONS) {
      try {
        const result = await refreshOne("shade", season);
        totalSuccess += result.success;
        totalFailed += result.failed;
        console.log(`  ${season}: ${result.success} OK, ${result.failed} failed (${(result.duration_ms / 1000).toFixed(1)}s)`);
      } catch (err) {
        console.error(`  ${season}: ERROR — ${err.message}`);
        totalFailed += 24;
      }
    }
  }

  if (!filter || filter === "vibe") {
    console.log(`\nSeeding Vibe DNA (${VIBE_ARCHETYPES.length} archetypes, 24 products each)...\n`);
    for (const archetype of VIBE_ARCHETYPES) {
      try {
        const result = await refreshOne("vibe", archetype);
        totalSuccess += result.success;
        totalFailed += result.failed;
        console.log(`  ${archetype}: ${result.success} OK, ${result.failed} failed (${(result.duration_ms / 1000).toFixed(1)}s)`);
      } catch (err) {
        console.error(`  ${archetype}: ERROR — ${err.message}`);
        totalFailed += 24;
      }
    }
  }

  console.log(`\nDone! Success: ${totalSuccess}, Failed: ${totalFailed}, Total: ${totalSuccess + totalFailed}`);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
