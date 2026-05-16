"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  SEASONS,
  TIERS,
  productsFor,
  neutralsFor,
  contrastFor,
  pinterestPredictsFor,
  isDarkHex,
  metalGradient,
  seasonIdFromName,
} from "@/lib/handoffSeasons";
import { track } from "@/lib/analytics";
import { getShopUrl } from "@/lib/shopLinks";
import "./results.css";

const SEASON_IDS = Object.keys(SEASONS);
const FOUNDATION_URL = "https://shopmy.us/shop/collections/4652210";
const CONCEALER_URL = "https://shopmy.us/shop/collections/4653190";
const SOFT_AUTUMN_SHOP_URL = "https://shopmy.us/shop/collections/4680251";

const UNDERTONE_COLORS = {
  warm: "#B5500B",
  "warm-neutral": "#C4A265",
  neutral: "#9B7F5C",
  "cool-neutral": "#8DA9C4",
  cool: "#6F7FA8",
};

const UNDERTONE_GUIDANCE = {
  "Clear Spring": "Look for warm, peach-golden shades (W or NW). Gold jewelry suits you - not silver. Avoid pink or cool bases.",
  "True Spring": "Look for warm golden-yellow shades (W or NW). The warmest season - cool or pink foundations will look gray.",
  "Light Spring": "Look for light warm-peach shades. Avoid pink bases - they amplify redness. Stay in the warm column.",
  "Soft Summer": "Look for cool-neutral, muted rose shades (C or NC). Silver suits you better than gold. Avoid golden or warm bases.",
  "True Summer": "Look for cool, rosy-pink shades (C or NC). Your veins run blue - cool foundations disappear; warm ones go orange.",
  "Light Summer": "Look for light cool-pink shades. Avoid peach or warm tones - even 'neutral' fair shades often run too warm.",
  "Soft Autumn": "Look for warm neutral-golden shades - earthy, not bright. Avoid pink or cool bases. 'Warm beige' is your zone.",
  "True Autumn": "Look for warm amber-golden shades (W or NW). Look for 'honey', 'golden', or 'caramel' at your depth.",
  "Dark Autumn": "Look for deep warm-golden shades. Avoid ashy or cool-dark - these are the most common mistake for deep warm skin.",
  "Dark Winter": "Look for deep cool-neutral shades (C or NC). Avoid warm, amber, or golden - they'll read orange on cool deep skin.",
  "True Winter": "Look for cool shades at your depth (C or NC). Warm foundations go visibly orange. Fair to deep - always cool.",
  "Bright Winter": "Look for cool-neutral shades with clarity. Avoid warm, yellow, or muted foundations - they flatten your natural contrast.",
};

const FOUNDATION_CARDS = [
  // TODO: Populate season-scoped card fields for the other 11 seasons before full rollout.
  {
    season_name: "Soft Autumn",
    brand: "FENTY BEAUTY",
    name: "Pro Filt'r Soft Matte Longwear Foundation",
    rating: "4.0",
    reviews: "17,400+",
    shades: "51",
    price: "$40",
    source: "Sephora",
    undertone: "warm",
    finish: "matte",
    affiliate_url: SOFT_AUTUMN_SHOP_URL,
    retailer_country: "US",
    swatch_hex: "#C49A6C",
    shade_name: "240 Sand Medium",
    why_text: "Because you're a Soft Autumn - warm, muted, gentle - this reads warm-neutral with golden undertone, your exact lane.",
    formula_note: "Oxidizes slightly on oily skin - pick one shade lighter if you sit between.",
    image_url: null,
    is_hero: true,
  },
  {
    season_name: "Soft Autumn",
    brand: "ARMANI BEAUTY",
    name: "Luminous Silk Foundation",
    rating: "4.4",
    reviews: "2,800+",
    shades: "46",
    price: "$48-$69",
    source: "Sephora",
    undertone: "warm-neutral",
    finish: "natural",
    affiliate_url: SOFT_AUTUMN_SHOP_URL,
    retailer_country: "US",
    swatch_hex: "#CCAA88",
    shade_name: "6.5",
    why_text: "Soft Autumn needs warmth without glare; this warm-neutral shade keeps the skin soft instead of bright or peach-heavy.",
    formula_note: "Luminous finish - powder the center if you prefer a quieter satin set.",
    image_url: null,
    is_hero: false,
  },
  {
    season_name: "Soft Autumn",
    brand: "CHARLOTTE TILBURY",
    name: "Airbrush Flawless Foundation",
    rating: "4.3",
    reviews: "768",
    shades: "36",
    price: "$52",
    source: "Sephora",
    undertone: "warm",
    finish: "matte",
    affiliate_url: SOFT_AUTUMN_SHOP_URL,
    retailer_country: "US",
    swatch_hex: "#B9855E",
    shade_name: "6 Warm",
    why_text: "The warm base supports Soft Autumn's muted golden cast without pulling pink or icy.",
    formula_note: "Full coverage - start with half a pump so the finish stays skinlike.",
    image_url: null,
    is_hero: false,
  },
  {
    season_name: "Soft Autumn",
    brand: "MAC",
    name: "Studio Fix Fluid SPF 15",
    rating: "4.3",
    reviews: "501",
    shades: "67",
    price: "$39",
    source: "Sephora / MAC",
    undertone: "warm-neutral",
    finish: "matte",
    affiliate_url: SOFT_AUTUMN_SHOP_URL,
    retailer_country: "US",
    swatch_hex: "#C0926D",
    shade_name: "NC30",
    why_text: "A warm-neutral NC shade keeps Soft Autumn skin earthy and balanced, not rosy.",
    formula_note: "Sets quickly - blend in sections for the smoothest edge.",
    image_url: null,
    is_hero: false,
  },
  {
    season_name: "Soft Autumn",
    brand: "L'OREAL",
    name: "True Match Super-Blendable Foundation",
    rating: "4.3",
    reviews: "5,482",
    shades: "~45",
    price: "~$10",
    source: "Ulta",
    undertone: "warm",
    finish: "natural",
    affiliate_url: SOFT_AUTUMN_SHOP_URL,
    retailer_country: "US",
    swatch_hex: "#CCAA88",
    shade_name: "W4.5 Fresh Beige",
    why_text: "The W family gives Soft Autumn the quiet golden warmth that disappears into muted coloring.",
    formula_note: null,
    image_url: null,
    is_hero: false,
  },
  {
    season_name: "Soft Autumn",
    brand: "MAYBELLINE",
    name: "Fit Me Matte + Poreless Foundation",
    rating: "4.4",
    reviews: "6,273",
    shades: "~40",
    price: "~$10",
    source: "Ulta",
    undertone: "warm",
    finish: "matte",
    affiliate_url: SOFT_AUTUMN_SHOP_URL,
    retailer_country: "US",
    swatch_hex: "#C28F67",
    shade_name: "220 Natural Beige",
    why_text: "This sits in Soft Autumn's warm beige lane, with enough softness to avoid a bright yellow cast.",
    formula_note: "Can dry down deeper - test in daylight before committing.",
    image_url: null,
    is_hero: false,
  },
  {
    season_name: "Soft Autumn",
    brand: "TOO FACED",
    name: "Born This Way Foundation",
    rating: "4.3",
    reviews: "20,000+",
    shades: "45+",
    price: "$47",
    source: "Sephora / Ulta",
    undertone: "warm-neutral",
    finish: "natural",
    affiliate_url: SOFT_AUTUMN_SHOP_URL,
    retailer_country: "US",
    swatch_hex: "#C79B74",
    shade_name: "Warm Nude",
    why_text: "Warm-neutral depth keeps Soft Autumn's face cohesive with terracotta, olive, and camel.",
    formula_note: null,
    image_url: null,
    is_hero: false,
  },
];

const CONCEALER_CARDS = [
  // TODO: Populate season-scoped card fields for the other 11 seasons before full rollout.
  {
    season_name: "Soft Autumn",
    brand: "NARS",
    name: "NARS Radiant Creamy Concealer",
    rating: "4.3",
    reviews: "15,000+",
    shades: "33",
    price: "$17–$36",
    source: "Sephora",
    undertone: "warm",
    finish: "radiant",
    affiliate_url: SOFT_AUTUMN_SHOP_URL,
    retailer_country: "US",
    swatch_hex: "#DABB9A",
    shade_name: "Caramel",
    why_text: "For Soft Autumn, Caramel gives warm golden correction without the pink cast that can make muted skin look tired.",
    formula_note: "Radiant finish - set lightly under the eye if you crease.",
    image_url: null,
    is_hero: true,
  },
  {
    season_name: "Soft Autumn",
    brand: "KOSAS",
    name: "Kosas Revealer Creamy Concealer",
    rating: "4.0",
    reviews: "6,600+",
    shades: "42",
    price: "$16–$32",
    source: "Sephora",
    undertone: "warm",
    finish: "radiant",
    affiliate_url: SOFT_AUTUMN_SHOP_URL,
    retailer_country: "US",
    swatch_hex: "#D7B08B",
    shade_name: "Tone 6 W",
    why_text: "The warm undertone keeps Soft Autumn's eye area brightened in an earthy way, not icy.",
    formula_note: "Very creamy - use a thin layer first.",
    image_url: null,
    is_hero: false,
  },
  {
    season_name: "Soft Autumn",
    brand: "TARTE",
    name: "Tarte Shape Tape Full Coverage",
    rating: "4.2",
    reviews: "668",
    shades: "48",
    price: "$15–$32",
    source: "Sephora",
    undertone: "warm-neutral",
    finish: "matte",
    affiliate_url: SOFT_AUTUMN_SHOP_URL,
    retailer_country: "US",
    swatch_hex: "#D2A57D",
    shade_name: "35N Medium",
    why_text: "A warm-neutral medium shade supports Soft Autumn's muted warmth without turning orange.",
    formula_note: "High coverage - dot, wait, then blend with a small brush.",
    image_url: null,
    is_hero: false,
  },
  {
    season_name: "Soft Autumn",
    brand: "IT COSMETICS",
    name: "IT Cosmetics Bye Bye Under Eye",
    rating: "4.1",
    reviews: "1,300+",
    shades: "26",
    price: "$14–$30",
    source: "Sephora",
    undertone: "warm",
    finish: "natural",
    affiliate_url: SOFT_AUTUMN_SHOP_URL,
    retailer_country: "US",
    swatch_hex: "#D0A176",
    shade_name: "24.5 Medium Beige",
    why_text: "Soft Autumn reads best when concealer warms gently into the face instead of sitting pale and pink.",
    formula_note: "Thick texture - warm it between fingers before applying.",
    image_url: null,
    is_hero: false,
  },
  {
    season_name: "Soft Autumn",
    brand: "IT COSMETICS",
    name: "IT Cosmetics Do It All Radiant",
    rating: "4.4",
    reviews: "2,400+",
    shades: "26",
    price: "$30",
    source: "Sephora",
    undertone: "warm-neutral",
    finish: "radiant",
    affiliate_url: SOFT_AUTUMN_SHOP_URL,
    retailer_country: "US",
    swatch_hex: "#D8B08D",
    shade_name: "Medium Warm",
    why_text: "The warm-neutral cast gives Soft Autumn soft lift without breaking into bright peach.",
    formula_note: null,
    image_url: null,
    is_hero: false,
  },
];

function hexToRgb(hex) {
  if (!hex || !/^#[0-9A-F]{6}$/i.test(hex)) return null;
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function luminance(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 1;
  return (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
}

function swatchFor(card) {
  if (card.swatch_hex) return card.swatch_hex;
  if (process.env.NODE_ENV === "development") {
    console.warn("[Allele] Missing swatch_hex; falling back to undertone color.", card);
  }
  return UNDERTONE_COLORS[card.undertone] || UNDERTONE_COLORS.neutral;
}

function whyWithUndertoneColor(text, undertone) {
  if (!text) return null;
  const phrase = undertone || text.match(/\b(warm-neutral|cool-neutral|warm|cool|neutral)\b/i)?.[0];
  if (!phrase) return text;
  const escapedPhrase = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = text.match(new RegExp(`\\b${escapedPhrase}\\b`, "i"));
  if (!match || typeof match.index !== "number") return text;
  const color = UNDERTONE_COLORS[phrase.toLowerCase()] || UNDERTONE_COLORS.neutral;
  const index = match.index;
  const before = text.slice(0, index);
  const highlighted = text.slice(index, index + match[0].length);
  const after = text.slice(index + match[0].length);
  return (
    <>
      {before}
      <span className="dt-card-undertone" style={{ color }}>{highlighted}</span>
      {after}
    </>
  );
}

function productCardsForSeason(cards, seasonName, category) {
  const scoped = cards.filter((card) => card.season_name === seasonName);
  const valid = scoped.filter((card) => card.retailer_country === "US");
  if (process.env.NODE_ENV === "development") {
    const dropped = scoped.filter((card) => card.retailer_country !== "US");
    if (dropped.length) {
      console.warn(`[Allele] Dropped non-US ${category} cards.`, dropped);
    }
  }
  return valid;
}

function ProductMatchCard({ card, category, variant = "alternate" }) {
  const isHero = variant === "hero";
  const swatch = swatchFor(card);
  const shadeTextColor = luminance(swatch) > 0.6 ? "var(--ink)" : "var(--cream)";
  const meta = [
    card.is_hero ? "Best match" : null,
    card.undertone,
    card.shade_name ? card.shade_name.split(" ").slice(-1)[0] : null,
    card.finish,
  ].filter(Boolean).join(" · ");
  const shopLabel = `Shop at ${card.source.split("/")[0].trim()}`;

  return (
    <article className={`dt-foundation-card ${isHero ? "dt-foundation-card-hero" : "dt-foundation-card-alt"}`}>
      <div className="dt-foundation-card-strip">
        <span>{meta}</span>
        <span aria-hidden="true">★</span>
      </div>
      <div className="dt-foundation-card-visual">
        <div
          className="dt-foundation-swatch"
          style={{ background: swatch, color: shadeTextColor }}
        >
          <span>{card.shade_name || "Shade pending"}</span>
        </div>
        <div
          className="dt-foundation-photo"
          role={card.image_url ? "img" : undefined}
          aria-label={card.image_url ? `${card.brand} ${card.name}` : `${card.brand} ${card.name} product photo coming`}
          style={card.image_url ? { backgroundImage: `url(${card.image_url})` } : undefined}
        >
          {!card.image_url && (
            <span>Photo coming</span>
          )}
        </div>
      </div>
      <div className="dt-foundation-card-body">
        <div className="dt-foundation-brand">{card.brand}</div>
        <h4>{card.name}</h4>
        {card.why_text && (
          <p className="dt-foundation-why">{whyWithUndertoneColor(card.why_text, card.undertone)}</p>
        )}
        {card.formula_note && (
          <p className="dt-foundation-formula">{card.formula_note}</p>
        )}
        <div className="dt-foundation-card-foot">
          <span className="dt-foundation-price">{card.price}</span>
          <a
            href={card.affiliate_url}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="dt-foundation-shop"
            onClick={() => {
              track.shopClick({
                season: card.season_name,
                category,
                tier: card.is_hero ? "best-match" : "alternate",
                brand: card.brand,
                productName: card.name,
                price: card.price,
              });
            }}
          >
            {shopLabel} <span>→</span>
          </a>
        </div>
      </div>
    </article>
  );
}

function ProductMatchSection({ title, eyebrow, guidance, cards, category }) {
  const hero = cards.find((card) => card.is_hero) || cards[0];
  const alternates = cards.filter((card) => card !== hero);

  if (!hero) return null;

  return (
    <div className="dt-foundation-product-section">
      <div className="dt-foundation-copy">
        <div className="dt-foundation-k">{eyebrow}</div>
        <h3 className="dt-foundation-title">{title}</h3>
        {guidance && (
          <p className="dt-foundation-guidance">{guidance}</p>
        )}
      </div>
      <ProductMatchCard card={hero} category={category} variant="hero" />
      {alternates.length > 0 && (
        <div className="dt-foundation-grid" aria-label={`${eyebrow} alternates`}>
          {alternates.map((card) => (
            <ProductMatchCard key={`${card.brand}-${card.name}-${card.shade_name}`} card={card} category={category} />
          ))}
        </div>
      )}
    </div>
  );
}

function Nav({ seasonId, onChange }) {
  return (
    <nav className="dt-nav">
      <div className="dt-nav-inner">
        <Link href="/" className="dt-nav-brand">allele</Link>
        <div className="dt-nav-links">
          <Link href="/#twelve">The Twelve</Link>
          <Link href="/#method">Method</Link>
          <Link href="/#science">Philosophy</Link>
        </div>
        <div className="dt-nav-right">
          <select
            className="dt-nav-season"
            value={seasonId}
            onChange={(e) => onChange(e.target.value)}
            aria-label="Switch season"
          >
            {SEASON_IDS.map((id) => (
              <option key={id} value={id}>{SEASONS[id].name}</option>
            ))}
          </select>
          <Link href="/quiz" className="dt-nav-cta">Retake quiz →</Link>
        </div>
      </div>
    </nav>
  );
}

function Hero({ s, seasonId }) {
  const idx = SEASON_IDS.indexOf(seasonId) + 1;
  const num = `N° ${String(idx).padStart(2, "0")} / 12`;
  const [first, ...rest] = s.name.split(" ");
  return (
    <section className="dt-hero" style={{ "--accent": s.accent, "--surface": s.surface }}>
      <div className="dt-hero-grid">
        <div className="dt-hero-left">
          <div className="dt-hero-eyebrow">
            <span>Your result</span>
            <span className="dt-hair" />
            <span>{num} · {s.family}</span>
          </div>
          <h1 className="dt-hero-name">
            <em>{first}</em>{rest.length ? <><br />{rest.join(" ")}</> : null}
          </h1>
          {s.archetype && (
            <div className="dt-hero-archetype">
              <span className="dt-hero-archetype-label">Archetype</span>
              <span className="dt-hero-archetype-line">{s.archetype}</span>
            </div>
          )}
          <p className="dt-hero-whisper">{s.whisper}</p>
          {s.washesYouOut && (
            <div className="dt-hero-warning">
              <span className="dt-hero-warning-label">What washes you out</span>
              <span className="dt-hero-warning-line">{s.washesYouOut}</span>
            </div>
          )}

          <div className="dt-hero-attrs">
            <div className="dt-attr">
              <div className="dt-attr-k">Undertone</div>
              <div className="dt-attr-v">{s.undertone}</div>
            </div>
            <div className="dt-attr">
              <div className="dt-attr-k">Depth</div>
              <div className="dt-attr-v">{s.depth}</div>
            </div>
            <div className="dt-attr">
              <div className="dt-attr-k">Chroma</div>
              <div className="dt-attr-v">{s.chroma}</div>
            </div>
            <div className="dt-attr">
              <div className="dt-attr-k">Tagline</div>
              <div className="dt-attr-v"><em>{s.tagline}</em></div>
            </div>
          </div>

          <div className="dt-hero-ctas">
            <a href="#edit" className="dt-btn dt-btn-primary">
              See the 24-product edit <span>↓</span>
            </a>
            <a href="#share" className="dt-btn dt-btn-ghost">Save palette card</a>
          </div>

          {s.celebs?.length > 0 && (
            <div className="dt-twins">
              <span className="dt-twins-label">Style twins</span>
              <span className="dt-twins-names">
                {s.celebs.map((c, i) => (
                  <span key={i}>
                    <em>{c.name}</em>
                    {c.signatureColor && (
                      <span
                        className="dt-twins-swatch"
                        style={{ background: c.signatureColor }}
                        aria-hidden="true"
                      />
                    )}
                    {c.contested && (
                      <sup className="dt-twins-contested" title="Sources disagree">*</sup>
                    )}
                    {c.note && <span className="dt-twins-note"> ({c.note})</span>}
                    {i < s.celebs.length - 1 && <span className="dt-sep"> · </span>}
                  </span>
                ))}
              </span>
            </div>
          )}
        </div>

        <div className="dt-hero-right">
          <div className={`dt-specimen${isDarkHex(s.surface) ? " dark" : ""}`}>
            <div className="dt-specimen-tl">allele</div>
            <div className="dt-specimen-tr">{num}</div>
            <div className="dt-specimen-body">
              <div className="dt-specimen-family">· {s.family} ·</div>
              <div className="dt-specimen-name">{s.name}</div>
              <div className="dt-specimen-tag">{s.tagline}</div>
            </div>
            <div className="dt-specimen-palette">
              {s.palette.slice(0, 8).map((c, i) => (
                <div
                  key={i}
                  className={`dt-specimen-cell${isDarkHex(c) ? " dark-cell" : ""}`}
                  style={{ background: c }}
                >
                  <span className="label">{s.paletteLabels?.[i] || ""}</span>
                  <span className="hex">{c.replace("#", "").toUpperCase()}</span>
                </div>
              ))}
            </div>
            {s.celebs?.length > 0 && (
              <div className="dt-specimen-twins">
                <div className="dt-specimen-twins-label">Style twins</div>
                <div className="dt-specimen-twins-names">
                  {s.celebs.slice(0, 3).map((c, i) => (
                    <span key={i}>
                      <em>{c.name}</em>
                      {i < Math.min(s.celebs.length, 3) - 1 && (
                        <span className="dt-specimen-twins-sep"> · </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="dt-specimen-foot">allele.app · your shade, your science</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contrast({ seasonId }) {
  const c = contrastFor(seasonId);
  return (
    <section className="dt-contrast" style={{ padding: "60px 24px", background: "var(--cream-2, #F8F2E9)" }}>
      <div className="dt-section-head" style={{ maxWidth: "1120px", margin: "0 auto 32px", display: "flex", alignItems: "baseline", gap: "20px", justifyContent: "space-between" }}>
        <span className="dt-section-num" style={{ fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace", fontSize: "0.7rem", letterSpacing: "0.18em", color: "var(--accent, #B5500B)" }}>·</span>
        <h2 className="dt-section-title" style={{ fontFamily: "var(--font-display, 'Lora'), Georgia, serif", fontSize: "clamp(1.6rem, 3.4vw, 2.4rem)", fontWeight: 500, lineHeight: 1.1, color: "var(--ink, #1A1613)", flex: 1, textAlign: "center" }}>
          The <em style={{ color: "var(--accent, #B5500B)" }}>contrast</em> read
        </h2>
        <span className="dt-section-meta" style={{ fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-60, rgba(26,22,19,.60))" }}>
          {c.label}
        </span>
      </div>
      <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-display, 'Lora'), Georgia, serif", fontStyle: "italic", fontSize: "clamp(1.05rem, 2vw, 1.3rem)", color: "var(--ink-80, rgba(26,22,19,.80))", lineHeight: 1.55, marginBottom: "20px" }}>
          {c.body}
        </p>
        <div style={{ fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-60, rgba(26,22,19,.60))" }}>
          {c.pairs}
        </div>
      </div>
    </section>
  );
}

function PredictsThisYear({ seasonId }) {
  const colors = pinterestPredictsFor(seasonId);
  if (!colors.length) return null;
  return (
    <section className="dt-predicts" style={{ padding: "60px 24px", background: "var(--cream, #FFFBF7)" }}>
      <div className="dt-section-head" style={{ maxWidth: "1120px", margin: "0 auto 32px", display: "flex", alignItems: "baseline", gap: "20px", justifyContent: "space-between" }}>
        <span className="dt-section-num" style={{ fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace", fontSize: "0.65rem", letterSpacing: "0.18em", color: "var(--accent, #B5500B)", textTransform: "uppercase" }}>2026</span>
        <h2 className="dt-section-title" style={{ fontFamily: "var(--font-display, 'Lora'), Georgia, serif", fontSize: "clamp(1.6rem, 3.4vw, 2.4rem)", fontWeight: 500, lineHeight: 1.1, color: "var(--ink, #1A1613)", flex: 1, textAlign: "center" }}>
          This year, <em style={{ color: "var(--accent, #B5500B)" }}>in your season</em>
        </h2>
        <span className="dt-section-meta" style={{ fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-60, rgba(26,22,19,.60))" }}>
          Pinterest Predicts
        </span>
      </div>
      <div style={{ maxWidth: "880px", margin: "0 auto", display: "grid", gridTemplateColumns: `repeat(${colors.length}, 1fr)`, gap: "32px" }}>
        {colors.map((c) => (
          <div key={c.name} style={{ textAlign: "center" }}>
            <div style={{ width: "120px", height: "120px", borderRadius: "50%", background: c.hex, margin: "0 auto 18px", boxShadow: `0 8px 32px ${c.hex}50, inset 0 2px 4px rgba(255,255,255,0.15)`, border: "3px solid rgba(255,255,255,0.6)" }} />
            <div style={{ fontFamily: "var(--font-display, 'Lora'), Georgia, serif", fontSize: "1.35rem", fontWeight: 500, color: "var(--ink, #1A1613)", marginBottom: "8px", letterSpacing: "-0.01em" }}>
              {c.name}
            </div>
            <div style={{ fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace", fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--ink-40, rgba(26,22,19,.40))", marginBottom: "12px" }}>
              {c.hex}
            </div>
            <p style={{ fontFamily: "var(--font-display, 'Lora'), Georgia, serif", fontStyle: "italic", fontSize: "0.95rem", color: "var(--ink-80, rgba(26,22,19,.80))", lineHeight: 1.55, margin: 0 }}>
              {c.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Drape({ s, seasonId }) {
  const [band, setBand] = useState("both");
  const n = neutralsFor(seasonId);
  const statementCount = s.palette.length;
  const neutralCount = n.palette.length;

  return (
    <section className="dt-drape" style={{ "--accent": s.accent }}>
      <div className="dt-section-head">
        <span className="dt-section-num">01</span>
        <h2 className="dt-section-title">The <em>drape</em></h2>
        <span className="dt-section-meta">
          {statementCount + neutralCount} colors · {statementCount} statement · {neutralCount} neutral
        </span>
      </div>

      <div className="dt-drape-toggle">
        <span className="dt-drape-toggle-label">Show</span>
        <div className="dt-drape-pills">
          <button
            className={`dt-drape-pill${band === "both" ? " active" : ""}`}
            onClick={() => setBand("both")}
          >
            Both bands
          </button>
          <button
            className={`dt-drape-pill${band === "statement" ? " active" : ""}`}
            onClick={() => setBand("statement")}
          >
            <span className="dot statement" /> Statement
          </button>
          <button
            className={`dt-drape-pill${band === "neutrals" ? " active" : ""}`}
            onClick={() => setBand("neutrals")}
          >
            <span className="dot neutral" /> Neutrals
          </button>
        </div>
      </div>

      {(band === "both" || band === "statement") && (
        <div className={`dt-band${band === "neutrals" ? " dim" : ""}`}>
          <div className="dt-band-head">
            <span className="dt-band-tag">I · Statement</span>
            <span className="dt-band-desc">
              Expressive. Wear near the face. For impact, event dressing, and moments.
            </span>
            <span className="dt-band-meta">{statementCount} shades</span>
          </div>
          <div className="dt-drape-rail statement">
            {s.palette.slice(0, 8).map((c, i) => (
              <div key={i} className="dt-drape-chip" style={{ background: c }}>
                <span className="dt-drape-label">{s.paletteLabels[i]}</span>
                <span className="dt-drape-hex">{c.replace("#", "").toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {(band === "both" || band === "neutrals") && (
        <div className={`dt-band${band === "statement" ? " dim" : ""}`}>
          <div className="dt-band-head">
            <span className="dt-band-tag neutral">II · Neutrals</span>
            <span className="dt-band-desc">
              <em>Your everyday.</em> What you&rsquo;ll actually reach for in the closet. These do the quiet work.
            </span>
            <span className="dt-band-meta">{neutralCount} anchors</span>
          </div>
          <div className="dt-drape-rail neutrals">
            {n.palette.map((c, i) => (
              <div
                key={i}
                className={`dt-drape-chip neutral${isDarkHex(c.hex) ? " dark-cell" : ""}`}
                style={{ background: c.hex }}
              >
                <span className="dt-drape-label">{c.name}</span>
                <span className="dt-drape-wear">{c.wear}</span>
                <span className="dt-drape-hex">{c.hex.replace("#", "").toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function Basics({ seasonId }) {
  const n = neutralsFor(seasonId);
  return (
    <section className="dt-basics">
      <div className="dt-section-head">
        <span className="dt-section-num">02</span>
        <h2 className="dt-section-title">Your <em>wardrobe anchors</em></h2>
        <span className="dt-section-meta">
          The eight pieces every closet is built around. In your exact shade.
        </span>
      </div>
      <p className="dt-basics-intro">
        If you don&rsquo;t gravitate to the statement colors, that&rsquo;s fine. Most of what you wear is <em>neutral</em>. Here&rsquo;s what every basic should be, translated into your season.
      </p>
      <div className="dt-basics-grid">
        {n.basics.map((b, i) => {
          const isMetal = /metal/i.test(b.piece);
          const swatchBg = isMetal ? metalGradient(b.hex) : b.hex;
          return (
            <article
              key={i}
              className={`dt-basic${isMetal ? " dt-basic-metal" : ""}`}
              style={{ "--swatch": b.hex }}
            >
              <div className="dt-basic-swatch" style={{ background: swatchBg }}>
                <span className="dt-basic-num">{String(i + 1).padStart(2, "0")}</span>
                {isMetal && <span className="dt-basic-metal-sheen" aria-hidden="true" />}
              </div>
              <div className="dt-basic-body">
                <div className="dt-basic-k">{b.piece}</div>
                <div className="dt-basic-v">
                  <span className="dt-basic-arrow">→</span> {b.answer}
                </div>
                <div className="dt-basic-hex">{b.hex.replace("#", "").toUpperCase()}</div>
                <div className="dt-basic-note">{b.note}</div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Edit({ s, seasonId }) {
  const products = useMemo(() => productsFor(seasonId), [seasonId]);
  const [tier, setTier] = useState("best-value");
  const selectedProducts = useMemo(() => (
    Object.entries(products)
      .map(([catId, tiers]) => ({ catId, product: tiers[tier] }))
      .filter(({ product }) => Boolean(product))
      .slice(0, 8)
  ), [products, tier]);
  const shopUrl = getShopUrl(s.name);
  const undertoneGuidance = UNDERTONE_GUIDANCE[s.name];
  const foundationCards = useMemo(
    () => productCardsForSeason(FOUNDATION_CARDS, s.name, "foundation"),
    [s.name]
  );
  const concealerCards = useMemo(
    () => productCardsForSeason(CONCEALER_CARDS, s.name, "concealer"),
    [s.name]
  );

  return (
    <section id="edit" className="dt-edit" style={{ "--accent": s.accent }}>
      <div className="dt-section-head">
        <span className="dt-section-num">03</span>
        <h2 className="dt-section-title">The <em>edit</em></h2>
        <span className="dt-section-meta">
          Twenty-four products · three tiers · all in stock
        </span>
      </div>

      <div className="dt-edit-intro">
        <div>
          <p className="dt-edit-body">
            These are curated to your exact coloring. Each product is hand-matched by undertone, depth, and chroma. Not just &ldquo;warm&rdquo; or &ldquo;cool.&rdquo;
          </p>
          {s.shadeGuidance && (
            <p className="dt-shade-guidance">{s.shadeGuidance}</p>
          )}
          <div className="dt-ftc">
            Links are affiliate. We earn a small commission. Costs you nothing, keeps Allele free.
          </div>
        </div>
        <div className="dt-tier-picker">
          <span className="dt-tier-label">Tier</span>
          <div className="dt-tier-pills">
            {TIERS.map((t) => (
              <button
                type="button"
                key={t.id}
                className={`dt-tier-pill${tier === t.id ? " active" : ""}`}
                onClick={() => setTier(t.id)}
                aria-pressed={tier === t.id}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="dt-foundation">
        <ProductMatchSection
          eyebrow="Foundation"
          title="Match undertone first."
          guidance={undertoneGuidance}
          cards={foundationCards}
          category="foundation"
        />

        <ProductMatchSection
          eyebrow="Concealer"
          title="Find your undertone match."
          guidance={undertoneGuidance}
          cards={concealerCards}
          category="concealer"
        />

        <div className="dt-foundation-actions">
          <a
            href={FOUNDATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="dt-btn dt-btn-primary"
            onClick={() => {
              track.shopClick({
                season: s.name,
                category: "foundation",
                tier: "collection",
                brand: "ShopMy",
                productName: "Best Foundations",
                price: "varies",
              });
            }}
          >
            Shop Foundations <span>↗</span>
          </a>
          <a
            href={CONCEALER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="dt-btn dt-btn-ghost"
            onClick={() => {
              track.shopClick({
                season: s.name,
                category: "concealer",
                tier: "collection",
                brand: "ShopMy",
                productName: "Best Concealers",
                price: "varies",
              });
            }}
          >
            Shop Concealers <span>↗</span>
          </a>
        </div>
      </div>

      <div className="dt-edit-grid">
        {selectedProducts.map(({ catId, product: p }, i) => {
          return (
            <article
              key={`${catId}-${tier}`}
              className="dt-prod"
              style={{ "--swatch": p.swatch, "--season-accent": s.accent || "#f5f0eb" }}
            >
              <div className="dt-prod-shot">
                <div className="dt-prod-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="dt-prod-band" aria-hidden="true" />
                <div className="dt-prod-swatch" style={{ background: p.swatch }} />
                <div className="dt-prod-match">
                  <div className="dt-match-dot" /> Match
                </div>
              </div>
              <div className="dt-prod-body">
                <div className="dt-prod-cat">{catId.replace("-", " ")}</div>
                <div className="dt-prod-brand">{p.brand}</div>
                <div className="dt-prod-name">{p.product}</div>
                <div className="dt-prod-shade"><em>in</em> {p.shade}</div>
                <div className="dt-prod-foot">
                  <span className="dt-prod-price">{p.price}</span>
                  <a
                    href={shopUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dt-prod-shop"
                    onClick={() => {
                      track.shopClick({
                        season: s.name,
                        category: catId,
                        tier,
                        brand: p.brand,
                        productName: p.product,
                        price: p.price,
                      });
                    }}
                  >
                    Shop <span>↗</span>
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Collect({ s }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const submit = async (e) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          season: s.name,
          undertone: s.undertone,
          chroma: s.chroma,
          depth: s.depth,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        track.emailSubmitFailed(s.name, err?.error || res.status);
        setStatus("error");
        return;
      }
      track.emailSubmitted(s.name);
      setStatus("success");
    } catch {
      track.emailSubmitFailed(s.name, "network_error");
      setStatus("error");
    }
  };

  return (
    <section className="dt-collect" style={{ "--accent": s.accent }}>
      <div className="dt-collect-inner">
        <div>
          <div className="dt-section-num">04</div>
          <h2 className="dt-collect-title">The <em>dossier</em></h2>
          <p className="dt-collect-body">
            We&rsquo;ll send the long-form letter: every shade with names and hexes, your wardrobe anchors, the 24-product edit, and tips you can save for the dressing room.
          </p>
        </div>
        <form className="dt-collect-form" onSubmit={submit}>
          {status === "success" ? (
            <div className="dt-collect-success">
              <div className="dt-collect-success-eyebrow">Sent</div>
              <div className="dt-collect-success-body">
                Check your inbox. Your dossier is on its way.
              </div>
            </div>
          ) : (
            <>
              <label className="dt-collect-label" htmlFor="dossier-email">
                Send the dossier
              </label>
              <div className="dt-collect-row">
                <input
                  id="dossier-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="dt-collect-input"
                  disabled={status === "loading"}
                />
                <button
                  type="submit"
                  className="dt-btn dt-btn-primary"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending…" : "Send the dossier"} <span>→</span>
                </button>
              </div>
              {status === "error" && (
                <div className="dt-collect-error">
                  Something went wrong. Try again, or DM us if it keeps failing.
                </div>
              )}
              <div className="dt-collect-fine">
                Free · No spam · Unsubscribe anytime · Affiliate disclosure on every email.
              </div>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function Deeper({ s }) {
  return (
    <section className="dt-deeper">
      <div className="dt-deeper-grid">
        <div>
          <div className="dt-section-num">05</div>
          <h2 className="dt-deeper-title">Go deeper.</h2>
          <p className="dt-deeper-body">
            Shade DNA is Volume I. Your <em>Signature</em> emerges when we combine your color science with your style vibe: curated closet, outfit engine, one-second yes/no shopping filter.
          </p>
          <Link href="/vibe/quiz" className="dt-btn dt-btn-primary dark">
            Unlock Signature <span>→</span>
          </Link>
          <div className="dt-deeper-rarity">1 of 96 · two-chapter identity</div>
        </div>
        <div className="dt-deeper-card">
          <div className="dt-deeper-card-stamp">Chapter 02</div>
          <div className="dt-deeper-card-body">
            <div className="dt-deeper-card-row">
              <span className="dt-deeper-card-k">Shade</span>
              <span className="dt-deeper-card-v">{s.name}</span>
              <div className="dt-deeper-card-chips">
                {s.palette.slice(0, 6).map((c, i) => (
                  <div key={i} className="chip" style={{ background: c }} />
                ))}
              </div>
            </div>
            <div className="dt-deeper-x">×</div>
            <div className="dt-deeper-card-row">
              <span className="dt-deeper-card-k">Vibe</span>
              <span className="dt-deeper-card-v">?</span>
              <span className="dt-deeper-card-unlock">Take the quiz</span>
            </div>
            <div className="dt-deeper-x">=</div>
            <div className="dt-deeper-card-result">
              <em>Your</em> Signature
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Share({ s, seasonId }) {
  const idx = SEASON_IDS.indexOf(seasonId) + 1;
  const num = `N° ${String(idx).padStart(2, "0")} / 12`;

  const shareLink = async (method) => {
    track.shareClicked(s.name, method);
    if (method === "copy" && typeof window !== "undefined") {
      const url = `${window.location.origin}/results?season=${encodeURIComponent(s.name)}`;
      try { await navigator.clipboard.writeText(url); } catch {}
      return;
    }
    if (method === "native" && typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `I'm a ${s.name}`,
          text: `What's your Shade DNA?`,
          url: window.location.href,
        });
      } catch {}
    }
  };

  return (
    <section id="share" className="dt-share" style={{ "--accent": s.accent }}>
      <div className="dt-share-inner">
        <div>
          <div className="dt-share-eyebrow">Share</div>
          <h2 className="dt-share-title">Shareable as a <em>specimen card</em></h2>
          <p className="dt-share-body">
            A 1:1 identity card ready for Instagram, TikTok, or iMessage. Designed so your friends actually want to click.
          </p>
          <div className="dt-share-targets">
            <button className="dt-share-target" onClick={() => shareLink("native")}>Share</button>
            <button className="dt-share-target" onClick={() => shareLink("copy")}>Copy link</button>
            <button
              className="dt-share-target"
              onClick={() => {
                track.downloadCard(s.name);
                window.open(`/api/og?season=${encodeURIComponent(s.name)}`, "_blank");
              }}
            >
              Download PNG
            </button>
          </div>
        </div>
        <div className="dt-share-preview">
          <div
            className={`dt-share-card${isDarkHex(s.surface) ? " dark" : ""}`}
            style={{ "--accent": s.accent, "--surface": s.surface }}
          >
            <div className="dt-share-card-tl">allele</div>
            <div className="dt-share-card-tr">{num}</div>
            <div className="dt-share-card-center">
              <div className="dt-share-card-eyebrow">· {s.family} ·</div>
              <div className="dt-share-card-name">{s.name}</div>
              <div className="dt-share-card-tag">{s.tagline}</div>
              <div className="dt-share-card-rail">
                {s.palette.slice(0, 8).map((c, i) => (
                  <div key={i} className="dt-share-chip" style={{ background: c }} />
                ))}
              </div>
            </div>
            <div className="dt-share-card-foot">allele.app · find your season</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="dt-footer">
      <div className="dt-footer-grid">
        <div className="dt-footer-brand">
          <div className="dt-footer-word">allele</div>
          <div className="dt-footer-motto">your shade · your science</div>
        </div>
        <div>
          <div className="dt-footer-k">Product</div>
          <Link href="/quiz">Shade DNA</Link>
          <Link href="/vibe">Vibe DNA</Link>
        </div>
        <div>
          <div className="dt-footer-k">Company</div>
          <Link href="/#science">Philosophy</Link>
          <Link href="/#method">The method</Link>
          <a href="mailto:hi@allele.app">Contact</a>
        </div>
        <div>
          <div className="dt-footer-k">Legal</div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/disclosure">FTC disclosure</Link>
        </div>
      </div>
      <div className="dt-footer-fine">© 2026 · Allele · Made in Los Angeles</div>
    </footer>
  );
}

export default function ResultsContent() {
  const sp = useSearchParams();
  const router = useRouter();

  const initialId = useMemo(() => {
    const raw = sp.get("season");
    if (!raw) return "true-autumn";
    const id = seasonIdFromName(raw);
    return SEASONS[id] ? id : "true-autumn";
  }, [sp]);

  const [seasonId, setSeasonId] = useState(initialId);

  useEffect(() => {
    setSeasonId(initialId);
  }, [initialId]);

  const s = SEASONS[seasonId];

  useEffect(() => {
    if (!s) return;
    track.quizCompleted({
      season: s.name,
      undertone: s.undertone,
      contrast: s.chroma,
      value: s.depth,
      chroma: s.chroma,
    });
  }, [s?.name]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSeasonChange = (id) => {
    setSeasonId(id);
    const url = `/results?season=${encodeURIComponent(SEASONS[id].name)}`;
    router.replace(url, { scroll: false });
  };

  if (!s) return null;

  return (
    <main className="dt-results">
      <Nav seasonId={seasonId} onChange={onSeasonChange} />
      <Hero s={s} seasonId={seasonId} />
      <Contrast seasonId={seasonId} />
      <Drape s={s} seasonId={seasonId} />
      <PredictsThisYear seasonId={seasonId} />
      <Basics seasonId={seasonId} />
      <Edit s={s} seasonId={seasonId} />
      <Collect s={s} />
      <Deeper s={s} />
      <Share s={s} seasonId={seasonId} />
      <Footer />
    </main>
  );
}
