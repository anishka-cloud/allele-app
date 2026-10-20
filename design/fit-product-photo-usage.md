# Fit DNA product-photo release check

Checked September 25, 2026.

## Published release — supersedes history below

All nine real product records now have intact, provider-issued ShopMy carousel embeds. Exact collection/pin/SKU mapping: `lib/fitProductEmbeds.mjs`. Only provider-supplied Site Options matching the named wash were selected; no Google Images or another creator's uploads. All new collections are hidden from the shop index, without changing existing collections.

The five quiz photo cards render in the HTTPS preview, including mobile. Four result-only cards also loaded on the public allele.app release. Published source commit: `472672a`. The local HTTP blank-frame problem does not reproduce in HTTPS; its exact local-only cause is not established. The temporary one-hour preview link was explicitly approved. See `FIT-DNA-PREVIEW-NOTES.md` for deployment details.

Use the complete ShopMy frame, shopping controls and affiliate disclosure. This does not confer standalone photo reuse permission: do not copy/rehost its images or crop away provider controls. Raw retailer photos are no longer rendered by the shared component. Keep the direct brand fallback and origin-only referrer. Do not rewrite provider attribution or mix ShopMy with Amazon Associates.

## Historical raw-photo and pre-HTTPS checkpoints (superseded)

## Current route: provider-supplied embeds (verification incomplete)

ShopMy’s official [embeddable-components guide](https://guide.shopmy.us/creating-and-sharing-links/3ViMaZXyQ3oy7Ai2FXgQY8/embeddable-components/3ViMaZXyQ33DU2WWSmYxDV) explicitly provides complete iframes for websites. The signed-in account supplied six single-product embeds; see `lib/fitProductEmbeds.mjs` for the exact collection, pin and SKU mapping. Only provider-offered matching wash images were selected. No Google Image search result or creator-uploaded alternative was used.

These are **not** standalone image permissions. The app renders ShopMy’s intact component and shopping controls, with affiliate disclosure, an origin-only referrer, and a direct product-source fallback. Raw retailer images are no longer rendered by the shared component, even if an old local preview flag exists.

Release is still on hold: provider previews render, but locally framed embeds are blank. The HTTPS preview builds successfully but needs authenticated access for browser QA. A requested one-hour access link was rejected pending explicit user approval; no protection changes or production deployment occurred. See the latest section of `FIT-DNA-PREVIEW-NOTES.md` before continuing.

The earlier photo-permission notes below remain background, not the current rendering strategy.

## Decision

Use real named products for silhouette selection. Keep the source image, exact wash/SKU, label, and retailer destination tied to the same catalog record. No prices, ratings, inventory claims, endorsements, or guaranteed fit are inferred from the image.

Public image access is not evidence of reuse permission. The current five examples are owner-preview references, not cleared public assets. Do not publish the local preview build.

## Sources checked

- [Levi’s terms](https://www.levi.com/US/en_US/legal/terms-of-use): site-content permission is limited; it does not establish a general right to reuse commercial product photography on Allele.
- [Madewell’s terms](https://www.madewell.com/c/terms-of-use/): public/commercial use requires specific permission.
- [ShopMy sharing guidance](https://guide.shopmy.us/building-your-shop/43V9gf7Co5VBrmboNBWQ1S/how-to-share-your-shop/43V9gf7Co7E6M44AA9fGi3) and [collection embeds](https://shopmy.us/blog/post/sharing-your-collections): authorized embeds are an available route to investigate. They are not permission to copy arbitrary retailer photos. No new collection or account change was made.

This is a release precaution, not a legal opinion or a claim that permission has been granted.

## Implemented safeguard

`canDisplayFitProductPhoto` defaults to false unless an approved record identifies the exact image URL and nonempty permission evidence. No approval records have been invented. Only the owner's loopback preview is built with `NEXT_PUBLIC_FIT_RETAILER_IMAGE_PREVIEW=1`; it carries a visible permission notice. Normal builds keep the product identity and source link without loading unapproved images. The same component handles examples and shopping-result photos.

Before public release: obtain permitted affiliate assets/embeds or written permission covering the intended use, record that evidence, remove the owner-preview flag, and recheck the rendered image and destination. Affiliate tracking alone is not an image license.

## Link and image check

All five example images returned HTTP 200 and rendered in the browser. The Madewell product page returned 200. Levi’s product pages returned 403 to automated checks; that is not proof of a dead link, but live stock and checkout were not verified. URLs retain the product IDs recorded during the September 24 product research.

The quiz’s example links go directly to brands and are labeled non-affiliate. Existing Amazon result searches remain separate, visibly disclosed, tagged `anishkanawa00-20`, and marked `sponsored noopener noreferrer`.
