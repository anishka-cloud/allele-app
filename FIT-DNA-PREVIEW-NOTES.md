# Fit DNA release notes — September 25, 2026

## Published release (supersedes all history below)

- Nish authorized a one-hour preview-access link. It was created without disabling protection permanently; no access token is stored in source.
- HTTPS testing resolves the photo blocker: all five quiz examples load, including mobile. Local HTTP frames remain blank for an unconfirmed local-only reason.
- All nine catalog products now have provider-issued ShopMy embeds tied to their exact SKU/wash. All nine new collections are Hidden from the shop index (not private-access collections); the final Abercrombie collection was hidden after explicit approval. Existing collections are untouched.
- Complete nine-question journey reaches the expected low-rise wide-leg result with clear fabric/hip-room tradeoffs. Saved answers resume; a 30-inch inseam converts to 76.2 cm and survives result refresh. No measurements enter result URLs or analytics.
- 39 automated tests and targeted ESLint pass. Desktop and 390px mobile results/quiz checked without horizontal overflow; full provider image and shopping controls render.
- Exact product destinations and creator ID 267437 checked in ShopMy. Ribcage uses the observed new `wide-leg` category URL, same A60810009 SKU. Amazon attribution remains separate and unchanged.
- Published commit `472672a6284ea68c2766ae4d807d0b782fa879e2` by fast-forward push to main. Both existing Vercel integrations completed successfully. Production build and public page verified September 25, 2026, around 19:48 PDT.
- **Domain mapping verified:** `allele.app` and `www.allele.app` belong to the existing **shade-dna** Vercel project, not the locally linked allele-app project. Live deployment: `dpl_9GiGU1W9vLDE3rsoAZCNFcXniDnL` (`shade-82ubcqm9v-anishka-clouds-projects.vercel.app`). The same Git push also deployed allele-app as `dpl_5aMoR7QPpAidAD9xeNU7ZvDwTKK1`. Do not manually alias one over the other.
- Live `/fit` and result variants render the new provider cards. Four result-only photos (314, 315, Ribcage, Curve Love) loaded on allele.app. Live Amazon URLs and rel attributes verified. A bounded error-log check returned no entries; this is not full analytics/email/checkout verification.
- No new paid service, user-data deletion, or email integration. Live stock, checkout, email delivery and production analytics ingestion are not claimed by these tests.

## Historical notes — superseded; not current release instructions

### Earlier ShopMy integration checkpoint

Latest user authorized the ShopMy embed adaptation and previously requested publication. Production has **not** been updated in this pass.

- Six exact-product ShopMy collections were created using the signed-in Nish account. They were set Hidden from the shop index (not private-access collections); existing collections were not changed. Collection IDs and product IDs are recorded in `lib/fitProductEmbeds.mjs`.
- All five quiz examples plus Levi’s 314 have complete provider-issued carousel embeds. Exact product/wash destinations and provider image options were checked. Levi’s 315, Ribcage Wide Leg, and Abercrombie Curve Love have no embed yet and retain a text/source fallback.
- Replaced raw photo rendering with intact ShopMy iframes. No copying/rehosting retailer photos or treating attribution as a raw-image license. Interactive embeds sit outside answer buttons. FTC copy now includes ShopMy; Amazon attribution is unchanged.
- Referrer policy is origin-only: no quiz answers or measurements in the URL sent to ShopMy. Provider clicks are measured by ShopMy, not claimed as first-party `shop_click` events.
- 38 automated tests and targeted ESLint pass in `/private/tmp/allele-fit-review.FNhyIx`. Existing source backups and user data are untouched.
- **Unresolved integration issue:** products render in ShopMy’s own embed preview and as direct embed pages, but both official carousel and full-collection formats are blank when framed by the local app. Cause not established; do not claim the image integration works yet.
- An HTTPS test deployment built successfully (Next.js 16.2.2, 24 seconds): `https://allele-6js8eogiw-anishka-clouds-projects.vercel.app`. It is a protected preview, not production. Deployment ID: `dpl_4kJzLqamk5qviLSxMZwFPe3WCEQz`; verified project `prj_xvOdWTxuxbSN07hRE3eNdl2hDnTY`, team `team_WhaNmXGkxrRGOsX8dscEC9WE`.
- Browser reaches Vercel authentication. Vercel connector also needs authentication; existing CLI is authenticated. A request to create a one-hour preview share link was rejected by the safety reviewer because explicit approval to broaden preview access is required. **No bypass link was created, protection was not disabled.** User has been asked for that specific approval.
- Next action: with user approval, use Vercel’s temporary preview share-link workflow to test the HTTPS embed. Otherwise ask the user to sign into Vercel in the in-app browser. Do not silently work around the access rejection. Do not publish a broken or unverified image experience.
- Local integration check used `http://127.0.0.1:3130/fit`; that temporary development process is now stopped. User’s prior `localhost:3128` preview was left alone. The alternate full-collection test was reverted in the temp copy to the recorded carousel URLs. First three question screens were checked; a new complete browser journey is not claimed while the photo integration remains unresolved.

Earlier notes below describe the superseded raw-photo local design preview.

## Real-product style cards (latest, still local)

- Replaced generated silhouette examples on the landing page, quiz leg-shape choices, and live style preview with five named catalog products: Levi’s 724, 501, Low Loose, 725, and Madewell’s Barrel-Leg Jean.
- Each example has its brand, exact style, and a separate direct retailer link. Inspecting a pair does not select an answer or advance the quiz. These are style examples, not personalized fit predictions.
- Product image, wash, name, and destination share one catalog record. Broken images show a useful retailer-link fallback, never a generated stand-in for a real product.
- Public builds default to hiding unapproved retailer photos. Local design preview enables `NEXT_PUBLIC_FIT_RETAILER_IMAGE_PREVIEW=1` and displays a permission notice. Do not set that flag on a public deployment. Permission evidence or authorized affiliate image assets remain required; see `design/fit-product-photo-usage.md`.
- Verified 35 tests, targeted ESLint, production build, all five loaded example photos, desktop layout, 390px mobile layout without horizontal overflow, preserved answers, continuation to results, loaded recommendation photos, and Amazon attribution/`rel` values.
- Madewell’s product page returned 200. Levi’s product pages returned 403 to automated requests; their recorded destinations are unchanged, but a successful retailer checkout/stock check is not claimed. All five example image URLs returned 200.
- No deployment, push, merge, new service, or saved-data deletion.

## Earlier image refresh — September 24

- Generated eleven optimized style-reference assets in `public/fit/visuals/` with built-in image generation. Exact prompts, output origins, art direction and trend sources: `design/fit-visual-assets.json`.
- Replaced the hand-drawn jeans, shoe icons and synthetic textile swatches; larger image-led cards retain visible generated-illustration disclosures. Real retailer photos in shopping results stay separate.
- Added explicit barrel-leg choice (never inferred from popularity/body proportions) and a sourced Madewell barrel jean in Rinse Wash, OA868 / DM9455. Low-slung wearing position is distinguished from the listed 11¼-inch rise.
- 31 tests, targeted ESLint and production build pass in the clean preview copy. Source iCloud dataless files still prevent a reliable full test run in the source folder; the Fit tests themselves pass there.
- This generated-image pass is superseded for product examples by the real-product cards above. Generated images remain labeled as illustrations for fit, measurement, footwear, and fabric guidance.
- Local preview restart may need sandbox approval. Use `npm run start -- --hostname 127.0.0.1 --port 3128` from the temporary preview directory. No deployment, push, merge, or paid service.

## Current change

On branch `feat/fit-dna-denim`; this pass is saved locally but not committed, pushed, merged, or published.

- Removed the Kibbe section and external book link.
- Added interactive jean silhouettes, illustrated answer cards, explicit Continue, and a live desktop preview.
- Added nine sourced jean styles with up to three matching recommendations, product photos, transparent tradeoffs, retailer source links, and clearly labeled Amazon affiliate searches.
- Optional measurements convert between inches/cm and remain local; analytics and result URLs exclude measurements.
- Brand links are direct, non-affiliate links. Amazon searches preserve `tag=anishkanawa00-20`. No invented ShopMy trackers, prices, reviews, inventory, or fit guarantees.

## Preview runtime

Source lives in this project. iCloud has evicted some dependencies and git files (`dataless`), causing reads to hang. To avoid changing user files, a clean temporary checkout with locked dependencies serves the preview:

`/private/tmp/allele-fit-review.FNhyIx`

Preview: `http://127.0.0.1:3128/fit`

The temporary checkout contains copies of the current Fit files and locked dependencies. It was built with `NEXT_PUBLIC_FIT_RETAILER_IMAGE_PREVIEW=1 npm run build`. Restart the preview from that directory with `npm run start -- --hostname 127.0.0.1 --port 3128`. It is running as of this session’s completion. Temporary directories are not durable source storage; the earlier temporary preview was cleaned up outside this task.

## Verification

- 35 tests passed, including recommendation/source/affiliate/measurement and new photo-permission/example-identity tests.
- Targeted ESLint passed for Fit routes, scoring, product matching, and Fit tests.
- Production build passed.
- Full nine-question journey checked in the browser, including inch/cm conversion, progress resume, persisted measurement in results, loaded product photos, and source details.
- Desktop and 390px mobile checked; no horizontal overflow.
- Brand product pages researched; availability is not a live integration. Amazon attribution/search destinations checked, not seller stock or checkout.

## Files changed in this pass

`app/fit/FitVisuals.js`, `app/fit/FitProductReference.js`, `app/fit/layout.js`, `app/fit/page.js`, `app/fit/fit.css`, `app/fit/quiz/FitQuizContent.js`, `app/fit/results/FitResultsContent.js`, `app/fit/results/FitProductEdit.js`, `lib/fitDna.mjs`, `lib/fitProducts.mjs`, `lib/fitStyleExamples.mjs`, `tests/fitProducts.test.mjs`, `tests/fitStyleExamples.test.mjs`.

Keep existing unrelated backup files and saved user data. Do not publish without approval.
