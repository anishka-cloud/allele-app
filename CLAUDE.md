# CLAUDE.md — allele-app (live repo)

> **Last updated:** May 28, 2026
> **Canonical context:** `~/Documents/Allele - DNA /AGENTS.md` (full file — read this for tech stack, ship log, standing rules, key files, brand spec, analytics events, ShopMy IDs, architecture notes)
> **Session handoff (current state):** `~/Documents/Allele - DNA /allele/HANDOFF.md` (read this FIRST when resuming)

---

## You Are Inside the Live Code Repo

This directory is a clone of `github.com/anishka-cloud/allele-app`. Pushes to `main` auto-deploy to **https://allele.app** via Vercel.

Do NOT confuse this directory with `~/Documents/allele-app/` (deleted, do not recreate) or other working trees. This is the only canonical working copy of the live code.

---

## What's Live (May 28, 2026)

- **Shade DNA quiz + results** — 12 seasons, 12/12 with real ShopMy product photos, 288 direct affiliate links backfilled in results grid (May 27 CRO update)
- **Olive Undertone Survival Kit landing page** at `/olive-undertone-survival-kit` — $24 PDF sold via Gumroad
- **OliveAmbiguity cross-link** on results page (fires only for 6 olive-prone seasons: Soft/True/Dark Autumn, Soft/True Summer, Dark Winter)
- **Vibe DNA** routes exist at `/vibe/*` but are unaudited
- **AI model portraits REMOVED** from results page (PR #24, May 28) — they broke the anti-AI Chromatic Cartography register. Do not reintroduce without explicit redesign brief.

---

## Critical Recent Decisions

| Decision | Where to read more |
|---|---|
| Quiz V2 substance is parked on branch `quiz-v2-evidence-weighted`, NOT merged | `HANDOFF.md` → "Closed Without Merging" |
| AI model portraits reverted as a brand violation | `HANDOFF.md` → May 28 ship log + agent audit memo at `~/.claude/agent-memory/designer/project_allele_ia_architecture.md` |
| Olive Kit landing page is the first "sub-product" under Shade DNA — future kits follow same pattern at `/[kit-slug]` for now, will migrate to `/shade/kits/[slug]` when umbrella IA refactor lands | `AGENTS.md` → "Active Queue" |
| FTC disclosure required on every affiliate module | `AGENTS.md` → "Standing Rules" |
| No pre-reveal email gate — post-reveal capture stays | `AGENTS.md` → "Standing Rules" |

---

## File Map (high-traffic files only)

| File | Purpose |
|---|---|
| `app/page.js` | Homepage / landing |
| `app/quiz/page.js` | Shade DNA quiz flow |
| `app/results/ResultsContent.js` | Results page — 2700+ lines, `OliveAmbiguity` section at line ~2785 |
| `app/olive-undertone-survival-kit/page.js` + `OliveKit.js` | Olive Kit landing page (server metadata + client JSX) |
| `app/vibe/*` | Vibe DNA routes (live but unaudited — don't touch without QA pass) |
| `lib/handoffQuiz.js` | Production quiz logic |
| `lib/handoffSeasons.js` | 12 season definitions |
| `lib/shopLinks.js` | ShopMy URLs + `withUTM()` |
| `lib/analytics.js` | GA4 + PostHog event helpers |
| `lib/productData.js` | 288 backfilled product records |

---

## Lessons Learned (May 2026)

1. **PR #20 → reverted by #21** — "rogue affiliate URL bypass" was based on a wrong assumption. All 7 tracker domains contain `user-267437` and pay Nish. Always read `HANDOFF.md` before touching affiliate routing.
2. **AI model portraits (May 27 CRO) → reverted May 28** — looked editorial in isolation, broke the anti-AI register at site scale. Designer audit caught it. Don't re-ship lifestyle/AI imagery without an explicit redesign brief.
3. **Quiz V2 vs CRO update overlap** — Quiz V2 was built without realizing main was about to ship a 1700-line CRO rewrite of the same file. Always pull latest main and check open PRs before starting any substantive feature work.

---

## When Resuming

1. Read `~/Documents/Allele - DNA /allele/HANDOFF.md` first (full session-by-session log)
2. Then read `~/Documents/Allele - DNA /AGENTS.md` for canonical reference (tech stack, standing rules, ship log, analytics)
3. Then `git pull` to make sure local main is current
4. Then check open PRs: `gh pr list --state open`
5. Then start work
