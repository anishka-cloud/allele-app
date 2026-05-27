"use client";

import { useState, useEffect, useMemo, useRef } from "react";
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
import "./results.css";

const SEASON_IDS = Object.keys(SEASONS);

// Priority → category order. Categories not listed keep default tail order.
const PRIORITY_ORDER = {
  foundation: ["foundation", "concealer", "lips", "blush", "bronzer", "eye", "lip-liner", "nails"],
  lips:       ["lips", "lip-liner", "blush", "bronzer", "foundation", "concealer", "eye", "nails"],
  wardrobe:   null, // wardrobe section (Basics) already renders above Edit; keep makeup default
  full:       null,
};

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

const SHAPE_BY_CAT = {
  foundation: "shape-bottle",
  concealer: "shape-bottle thin",
  blush: "shape-compact",
  bronzer: "shape-compact",
  eye: "shape-palette",
  "lip-liner": "shape-pencil",
  lips: "shape-bullet",
  nails: "shape-bottle short",
};

function Edit({ s, seasonId, priority }) {
  const products = useMemo(() => productsFor(seasonId), [seasonId]);
  const [tier, setTier] = useState("best-value");

  // Reorder by user's Q11 priority so foundation-first or lips-first users see their category first
  const entries = useMemo(() => {
    const all = Object.entries(products);
    const order = PRIORITY_ORDER[priority];
    if (!order) return all;
    const byCat = Object.fromEntries(all);
    const sorted = order.filter((cat) => byCat[cat]).map((cat) => [cat, byCat[cat]]);
    const remaining = all.filter(([cat]) => !order.includes(cat));
    return [...sorted, ...remaining];
  }, [products, priority]);

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
                key={t.id}
                className={`dt-tier-pill${tier === t.id ? " active" : ""}`}
                onClick={() => setTier(t.id)}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="dt-edit-grid">
        {entries.slice(0, 8).map(([catId, tiers], i) => {
          const p = tiers[tier];
          if (!p) return null;
          const shape = SHAPE_BY_CAT[catId] || "shape-compact";
          return (
            <article key={catId} className="dt-prod" style={{ "--swatch": p.swatch }}>
              <div className="dt-prod-shot">
                <div className="dt-prod-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="dt-prod-product">
                  <div className={shape} style={{ background: p.swatch }} />
                </div>
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
                  <button
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
                  </button>
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
  const sectionRef = useRef(null);
  const viewedRef = useRef(false);

  // Fire email_capture_viewed when the section first scrolls into view
  useEffect(() => {
    if (!sectionRef.current || viewedRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !viewedRef.current) {
          viewedRef.current = true;
          track.emailCaptureViewed(s.name);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [s.name]);

  const submit = async (e) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    track.dossierCtaClicked(s.name);
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

  const skip = () => {
    track.emailSkipped(s.name);
    const next = document.querySelector(".dt-paid") || document.querySelector(".dt-deeper");
    if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="dt-collect" style={{ "--accent": s.accent }} ref={sectionRef}>
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
              <button
                type="button"
                onClick={skip}
                style={{ background: "transparent", border: 0, padding: "12px 0 0", fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-60, rgba(26,22,19,.60))", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "4px" }}
              >
                Skip · I&rsquo;ll just view my results
              </button>
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

function WashesYouOut({ s }) {
  if (!s.washesYouOut && !s.worstWhites && !s.worstLips && !s.worstFoundation) return null;
  const items = [
    s.worstWhites    && { k: "Worst whites + neutrals",  v: s.worstWhites },
    s.worstLips      && { k: "Worst lip + blush family", v: s.worstLips },
    s.worstFoundation && { k: "Foundation that goes wrong", v: s.worstFoundation },
  ].filter(Boolean);

  // Fallback to the single washesYouOut line if granular fields aren't filled yet
  const fallback = !items.length && s.washesYouOut;

  return (
    <section className="dt-washes" style={{ padding: "60px 24px", background: "var(--cream-2, #F8F2E9)", "--accent": s.accent }}>
      <div className="dt-section-head" style={{ maxWidth: "1120px", margin: "0 auto 32px" }}>
        <span className="dt-section-num">·</span>
        <h2 className="dt-section-title">What <em>washes you out</em></h2>
        <span className="dt-section-meta">The shades to skip in your season</span>
      </div>
      <div style={{ maxWidth: "880px", margin: "0 auto" }}>
        {fallback ? (
          <p style={{ fontFamily: "var(--font-display, 'Lora'), Georgia, serif", fontStyle: "italic", fontSize: "clamp(1.05rem, 2vw, 1.3rem)", color: "var(--ink-80, rgba(26,22,19,.80))", lineHeight: 1.55, textAlign: "center" }}>
            {s.washesYouOut}
          </p>
        ) : (
          <ul style={{ display: "grid", gap: "20px", listStyle: "none", padding: 0, margin: 0 }}>
            {items.map((it) => (
              <li key={it.k} style={{ display: "grid", gridTemplateColumns: "minmax(180px, 220px) 1fr", gap: "24px", alignItems: "baseline", borderTop: "1px solid rgba(26,22,19,.10)", paddingTop: "16px" }}>
                <div style={{ fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-60, rgba(26,22,19,.60))" }}>{it.k}</div>
                <div style={{ fontFamily: "var(--font-display, 'Lora'), Georgia, serif", fontSize: "1.05rem", lineHeight: 1.5, color: "var(--ink, #1A1613)" }}>{it.v}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function OliveAmbiguity({ s, oliveFlag }) {
  if (!oliveFlag) return null;
  return (
    <section className="dt-olive" style={{ padding: "72px 24px", background: "var(--cream, #FFFBF7)", "--accent": s.accent }}>
      <div style={{ maxWidth: "880px", margin: "0 auto", borderTop: "2px solid var(--accent, #B5500B)", borderBottom: "2px solid var(--accent, #B5500B)", padding: "40px 32px", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent, #B5500B)", marginBottom: "16px" }}>
          Olive · Undertone Flag
        </div>
        <h2 style={{ fontFamily: "var(--font-display, 'Lora'), Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2.1rem)", fontWeight: 500, lineHeight: 1.15, color: "var(--ink, #1A1613)", marginBottom: "20px" }}>
          Your skin doesn&rsquo;t read cleanly <em>warm or cool</em>.
        </h2>
        <p style={{ fontFamily: "var(--font-display, 'Lora'), Georgia, serif", fontStyle: "italic", fontSize: "1.05rem", lineHeight: 1.6, color: "var(--ink-80, rgba(26,22,19,.80))", maxWidth: "640px", margin: "0 auto 24px" }}>
          You picked enough &ldquo;mixed veins,&rdquo; &ldquo;hard to tell,&rdquo; or foundation-goes-orange answers that you&rsquo;re likely <strong>olive or neutral-olive</strong>. Standard warm/cool advice will feel half-right on you — because it is.
        </p>
        <p style={{ fontFamily: "var(--font-display, 'Lora'), Georgia, serif", fontSize: "0.98rem", lineHeight: 1.6, color: "var(--ink-70, rgba(26,22,19,.70))", maxWidth: "640px", margin: "0 auto 28px" }}>
          Your closest season is <em>{s.name}</em>, but treat it as a starting point. Test foundations in two undertones side-by-side. Favor neutralized greens and muted earth tones over pure pastels.
        </p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-60, rgba(26,22,19,.60))" }}>
          <span>Coming soon</span>
          <span>·</span>
          <span>Olive Undertone Survival Kit</span>
        </div>
      </div>
    </section>
  );
}

function PaidReport({ s }) {
  const onCta = () => {
    track.paidReportCtaClicked({ season: s.name, placement: "post-edit" });
    // TODO: replace with Stan / Gumroad checkout URL once live
    window.open(`https://allele.app/report?season=${encodeURIComponent(s.name)}`, "_blank");
  };
  const includes = [
    "Your season card + palette",
    "Undertone, depth, chroma breakdown",
    "Best whites, neutrals, metals, denim",
    "Foundation + concealer undertone logic",
    "Lip, blush, bronzer, highlighter map",
    "Wardrobe color anchors",
    "Your &ldquo;avoid this&rdquo; shade list",
    "Shopping checklist + saveable palette card",
  ];
  return (
    <section className="dt-paid" style={{ padding: "80px 24px", background: "var(--ink, #1A1613)", color: "#F8F2E9", "--accent": s.accent }}>
      <div style={{ maxWidth: "1040px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent, #B5500B)", marginBottom: "16px" }}>
            Volume I · The Full Report
          </div>
          <h2 style={{ fontFamily: "var(--font-display, 'Lora'), Georgia, serif", fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)", fontWeight: 500, lineHeight: 1.1, color: "#F8F2E9", marginBottom: "20px" }}>
            Your <em style={{ color: "var(--accent, #B5500B)" }}>Shade DNA</em> Report
          </h2>
          <p style={{ fontFamily: "var(--font-display, 'Lora'), Georgia, serif", fontStyle: "italic", fontSize: "1.1rem", lineHeight: 1.6, color: "rgba(248,242,233,.85)", marginBottom: "28px" }}>
            Everything we know about <em>{s.name}</em>, in one downloadable PDF you can take into the dressing room or the foundation aisle.
          </p>
          <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "28px" }}>
            <span style={{ fontFamily: "var(--font-display, 'Lora'), Georgia, serif", fontSize: "2.4rem", fontWeight: 500, color: "#F8F2E9" }}>$14</span>
            <span style={{ fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(248,242,233,.55)" }}>One-time · Instant download</span>
          </div>
          <button
            onClick={onCta}
            style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 28px", background: "var(--accent, #B5500B)", color: "#F8F2E9", border: 0, fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace", fontSize: "0.78rem", letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer", borderRadius: 0 }}
          >
            Get the report <span>→</span>
          </button>
          <div style={{ fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(248,242,233,.45)", marginTop: "16px" }}>
            Includes affiliate disclosure · Refund within 7 days
          </div>
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "12px" }}>
          {includes.map((line, i) => (
            <li key={i} style={{ display: "grid", gridTemplateColumns: "32px 1fr", alignItems: "baseline", gap: "12px", padding: "10px 0", borderTop: i === 0 ? "1px solid rgba(248,242,233,.15)" : "none", borderBottom: "1px solid rgba(248,242,233,.15)" }}>
              <span style={{ fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace", fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--accent, #B5500B)" }}>{String(i + 1).padStart(2, "0")}</span>
              <span style={{ fontFamily: "var(--font-display, 'Lora'), Georgia, serif", fontSize: "0.98rem", color: "rgba(248,242,233,.92)" }} dangerouslySetInnerHTML={{ __html: line }} />
            </li>
          ))}
        </ul>
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

  const oliveFlag = sp.get("olive") === "1";
  const priority = sp.get("priority"); // "foundation" | "lips" | "wardrobe" | "full" | null

  const [seasonId, setSeasonId] = useState(initialId);

  useEffect(() => {
    setSeasonId(initialId);
  }, [initialId]);

  const s = SEASONS[seasonId];

  useEffect(() => {
    if (!s) return;
    track.resultRevealed({ season: s.name, oliveFlag, priority });
  }, [s?.name, oliveFlag, priority]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSeasonChange = (id) => {
    setSeasonId(id);
    const params = new URLSearchParams(sp.toString());
    params.set("season", SEASONS[id].name);
    router.replace(`/results?${params.toString()}`, { scroll: false });
  };

  if (!s) return null;

  // If priority is "wardrobe", show Basics before Edit (already default). For others, keep default.
  // Edit reorders its own category list based on priority.

  return (
    <main className="dt-results">
      <Nav seasonId={seasonId} onChange={onSeasonChange} />
      <Hero s={s} seasonId={seasonId} />
      <Contrast seasonId={seasonId} />
      <Drape s={s} seasonId={seasonId} />
      <PredictsThisYear seasonId={seasonId} />
      <Basics seasonId={seasonId} />
      <Edit s={s} seasonId={seasonId} priority={priority} />
      <WashesYouOut s={s} />
      <OliveAmbiguity s={s} oliveFlag={oliveFlag} />
      <Collect s={s} />
      <PaidReport s={s} />
      <Deeper s={s} />
      <Share s={s} seasonId={seasonId} />
      <Footer />
    </main>
  );
}
