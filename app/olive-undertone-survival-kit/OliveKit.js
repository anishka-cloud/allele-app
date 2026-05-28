"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import "../landing.css";

const GUMROAD_URL =
  "https://alleleapp.gumroad.com/l/olive-undertone-survival-kit";

const OLIVES = [
  {
    id: "01",
    name: "Cool Olive",
    swatch: "#A8956F",
    pulse: "Gray-green",
    seasons: "Soft Summer · True Summer",
    note: "Veins read more blue than green. Silver looks correct; gold reads brassy. Often confused for True Summer.",
  },
  {
    id: "02",
    name: "Warm Olive",
    swatch: "#B89868",
    pulse: "Gold-green",
    seasons: "Soft Autumn · True Autumn",
    note: "Skin reads sun-kissed even indoors. Gold looks gorgeous; silver looks cold. Often confused for True Autumn.",
  },
  {
    id: "03",
    name: "Neutral Olive",
    swatch: "#B09775",
    pulse: "Quiet middle",
    seasons: "Soft Autumn / Soft Summer overlap",
    note: "Both gold and silver work; neither sings. The hardest type to shade-match at counters.",
  },
  {
    id: "04",
    name: "Muted Olive",
    swatch: "#9D8E72",
    pulse: "Low-chroma green",
    seasons: "Soft Summer · Soft Autumn",
    note: "Cool colors wash you out; warm colors look loud; in-between dusty shades sing. Almost always overdiagnosed as the wrong soft season.",
  },
  {
    id: "05",
    name: "Deep Olive",
    swatch: "#6D5A42",
    pulse: "Concentrated green",
    seasons: "Dark Autumn · Dark Winter",
    note: "Concentrated melanin layered over the olive base. Light shades chalk; dusty shades go flat; deep saturated shades come alive.",
  },
];

const TOC_PARTS = [
  {
    label: "Part One",
    title: "Why olive is its own thing",
    items: ["Welcome", "The Olive Problem (why nothing looks right)", "The five presentations at a glance"],
  },
  {
    label: "Part Two",
    title: "The five olives",
    items: ["Cool Olive", "Warm Olive", "Neutral Olive", "Muted Olive", "Deep Olive"],
  },
  {
    label: "Part Three",
    title: "The test battery",
    items: ["How to set up your light", "Vein, jewelry, and white tee trio", "The foundation oxidation diagnostic", "The 'greenest hour' observation"],
  },
  {
    label: "Part Four",
    title: "Season shortlists",
    items: ["The olive-to-season map", "Per-olive season shortlists × 5"],
  },
  {
    label: "Part Five",
    title: "The makeup shade map",
    items: ["Foundation starting-point library", "Concealer, blush, bronzer", "Lip and eye"],
  },
  {
    label: "Part Six",
    title: "Wardrobe",
    items: ["The olive-safe neutral core", "Colors to audit (and what to swap in)"],
  },
  {
    label: "Part Seven",
    title: "The worksheets",
    items: [
      "Worksheet · The olive audit",
      "Worksheet · The oxidation diary",
      "Worksheet · Your capsule color map",
      "Worksheet · The shopping filter card",
    ],
  },
];

function handleKitClick(source) {
  trackEvent("kit_clicked", {
    kit: "olive-undertone-survival-kit",
    source,
    price_usd: 24,
  });
}

export default function OliveKit() {
  return (
    <main className="landing">
      {/* ============ Nav ============ */}
      <nav className="l-nav">
        <div className="l-nav-inner">
          <Link href="/" className="l-nav-wordmark" style={{ textDecoration: "none" }}>
            all<em>e</em>le
          </Link>
          <div className="l-nav-links">
            <a href="#problem">The Problem</a>
            <a href="#five">The Five</a>
            <a href="#inside">What&rsquo;s Inside</a>
            <Link href="/quiz?source=olive_nav">Take the Quiz</Link>
          </div>
          <a
            className="l-nav-cta"
            href={GUMROAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleKitClick("nav")}
          >
            Get the kit · $24 →
          </a>
        </div>
      </nav>

      {/* ============ Hero ============ */}
      <section className="l-hero">
        <div className="l-hero-eyebrow">
          <span>Allele · Vol. I · Shade DNA · Field Guide</span>
          <span className="hairline"></span>
          <span>First edition · 2026</span>
          <div className="l-swatch-row">
            {OLIVES.map((o) => (
              <span key={o.id} className="swatch" style={{ background: o.swatch }}></span>
            ))}
          </div>
        </div>

        <div className="l-hero-grid">
          <div>
            <h1 className="l-hero-headline">
              For the<br />
              undertone the<br />
              industry refuses<br />
              to <em>commit to</em>.
            </h1>
            <p className="l-hero-sub">
              A field guide for the in-between undertone &mdash; the one foundation lines forget, color seasons gloss over, and Pinterest tries to flatten into <em>&ldquo;warm or cool.&rdquo;</em> Twenty-eight sections. Five olive presentations. The foundation oxidation diagnostic. Four worksheets. Yours forever.
            </p>
            <div className="l-hero-cta-row">
              <a
                className="l-cta-primary"
                href={GUMROAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleKitClick("hero")}
              >
                <span>Get the survival kit · $24</span>
                <span className="arrow">→</span>
              </a>
              <span className="l-cta-meta">PDF · Instant download · One-time purchase</span>
            </div>
            <div className="l-hero-meta">
              <div className="l-hero-meta-item"><strong>28</strong><span>Sections</span></div>
              <div className="l-hero-meta-item"><strong>5</strong><span>Olive Types</span></div>
              <div className="l-hero-meta-item"><strong>4</strong><span>Worksheets</span></div>
              <div className="l-hero-meta-item"><strong>1</strong><span>Field Guide</span></div>
            </div>
          </div>

          <div className="l-hero-card">
            <div className="l-hero-card-tag">Field Guide &middot; Olive Undertone</div>
            <div className="l-hero-card-name">The Survival Kit</div>
            <div className="l-hero-card-attrs">
              <span>Olive</span>
              <span>5 Types</span>
              <span>Worksheets</span>
            </div>
            <div className="l-hero-card-palette">
              {OLIVES.map((o) => (
                <div key={o.id} className="chip" style={{ background: o.swatch }}></div>
              ))}
            </div>
            <div className="l-hero-card-whisper">
              &ldquo;Olive is not warm. Not cool. Not <em>neutral</em>{" "}in the way most shade ranges mean neutral. It is its own quality.&rdquo;
            </div>
            <div className="l-hero-card-twins">
              <span className="l-hero-card-twins-label">For readers who</span>
              <span className="l-hero-card-twins-names">
                <em>oxidize foundation</em>
                <em>read khaki by 3pm</em>
                <em>doubt their season</em>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ § 01 The Problem ============ */}
      <section
        id="problem"
        style={{
          padding: "80px 24px",
          background: "var(--cream-2, #F8F2E9)",
          borderTop: "1px solid rgba(196,162,101,0.18)",
          borderBottom: "1px solid rgba(196,162,101,0.18)",
        }}
      >
        <div style={{ maxWidth: "920px", margin: "0 auto" }}>
          <div className="l-section-head" style={{ marginBottom: "48px" }}>
            <div className="l-section-head-num">§ 01</div>
            <h2 className="l-section-head-title">
              Why nothing<br />looks right.
            </h2>
            <div className="l-section-head-meta">Three structural reasons</div>
          </div>

          <ol
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gap: "36px",
              fontFamily: "var(--font-inter, system-ui, sans-serif)",
              color: "var(--ink, #1A1613)",
              lineHeight: 1.7,
              fontSize: "1.05rem",
            }}
          >
            <li>
              <div style={{ fontFamily: "var(--font-display, 'Lora'), Georgia, serif", fontStyle: "italic", fontSize: "1.15rem", color: "#5C3F10", marginBottom: "8px" }}>
                One &middot; Foundation lines optimize for the middle of the market.
              </div>
              Most shade ranges are built on a warm-to-cool axis with maybe a &ldquo;neutral&rdquo; column wedged between. Olive sits on a separate axis &mdash; green-yellow against pink-blue &mdash; and most shade ranges don&rsquo;t have a dedicated column for it. So olive skin gets sorted into &ldquo;warm&rdquo; (and turns orange) or &ldquo;cool&rdquo; (and turns gray).
            </li>
            <li>
              <div style={{ fontFamily: "var(--font-display, 'Lora'), Georgia, serif", fontStyle: "italic", fontSize: "1.15rem", color: "#5C3F10", marginBottom: "8px" }}>
                Two &middot; Olive skin oxidizes foundation differently.
              </div>
              The same chemistry that gives olive skin its quiet green cast can interact with pigments and oils in foundation and shift the finish over the course of the day. A shade that looked right at 11am can read pumpkin by 3pm. This is not your imagination. It is a real, observable pattern &mdash; and the kit gives you a test for it.
            </li>
            <li>
              <div style={{ fontFamily: "var(--font-display, 'Lora'), Georgia, serif", fontStyle: "italic", fontSize: "1.15rem", color: "#5C3F10", marginBottom: "8px" }}>
                Three &middot; Most color season frameworks are built on warm-vs-cool first.
              </div>
              The classic 12-season system was designed in an era and a market that treated olive as an edge case. Olive types get pushed toward seasons that <em>almost</em> fit &mdash; usually a Soft Autumn that&rsquo;s slightly too warm, or a True Summer that&rsquo;s slightly too cool &mdash; and spend years wondering why their &ldquo;season palette&rdquo; feels a little off.
            </li>
          </ol>
        </div>
      </section>

      {/* ============ § 02 The Five Olives ============ */}
      <section
        id="five"
        style={{
          padding: "80px 24px",
          background: "var(--cream, #FFFBF7)",
        }}
      >
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <div className="l-section-head" style={{ marginBottom: "48px" }}>
            <div className="l-section-head-num">§ 02</div>
            <h2 className="l-section-head-title">
              The five<br /><em>olives</em>.
            </h2>
            <div className="l-section-head-meta">Most readers see themselves in two</div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {OLIVES.map((o) => (
              <article
                key={o.id}
                style={{
                  background: "var(--cream-2, #F8F2E9)",
                  border: "1px solid rgba(196,162,101,0.22)",
                  borderRadius: "6px",
                  padding: "28px 24px",
                  fontFamily: "var(--font-inter, system-ui, sans-serif)",
                  color: "var(--ink, #1A1613)",
                  lineHeight: 1.6,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace",
                    fontSize: "0.7rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "#C4A265",
                    marginBottom: "12px",
                  }}
                >
                  N° {o.id} / 05
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "4px",
                      background: o.swatch,
                      border: "1px solid rgba(0,0,0,0.08)",
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div style={{ fontFamily: "var(--font-display, 'Lora'), Georgia, serif", fontSize: "1.3rem", fontWeight: 500 }}>
                      {o.name}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "rgba(26,22,19,0.6)", marginTop: "2px" }}>
                      {o.pulse} &middot; {o.swatch.toUpperCase()}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace",
                    fontSize: "0.7rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(26,22,19,0.55)",
                    marginBottom: "10px",
                  }}
                >
                  Closest seasons
                </div>
                <div style={{ fontStyle: "italic", marginBottom: "16px", fontFamily: "var(--font-display, 'Lora'), Georgia, serif" }}>
                  {o.seasons}
                </div>
                <p style={{ fontSize: "0.93rem", margin: 0 }}>{o.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ § 03 What's Inside ============ */}
      <section
        id="inside"
        style={{
          padding: "80px 24px",
          background: "var(--cream-2, #F8F2E9)",
          borderTop: "1px solid rgba(196,162,101,0.18)",
          borderBottom: "1px solid rgba(196,162,101,0.18)",
        }}
      >
        <div style={{ maxWidth: "920px", margin: "0 auto" }}>
          <div className="l-section-head" style={{ marginBottom: "48px" }}>
            <div className="l-section-head-num">§ 03</div>
            <h2 className="l-section-head-title">
              What&rsquo;s<br /><em>inside</em>.
            </h2>
            <div className="l-section-head-meta">Twenty-eight sections, seven parts</div>
          </div>

          <div style={{ display: "grid", gap: "20px" }}>
            {TOC_PARTS.map((part, idx) => (
              <div
                key={part.label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(120px, 180px) 1fr",
                  gap: "32px",
                  alignItems: "baseline",
                  padding: "20px 0",
                  borderBottom: idx < TOC_PARTS.length - 1 ? "1px solid rgba(196,162,101,0.18)" : "none",
                  fontFamily: "var(--font-inter, system-ui, sans-serif)",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace",
                      fontSize: "0.68rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#C4A265",
                      marginBottom: "4px",
                    }}
                  >
                    {part.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display, 'Lora'), Georgia, serif",
                      fontSize: "1.15rem",
                      fontStyle: "italic",
                      color: "var(--ink, #1A1613)",
                    }}
                  >
                    {part.title}
                  </div>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "rgba(26,22,19,0.78)", fontSize: "0.92rem", lineHeight: 1.85 }}>
                  {part.items.map((item) => (
                    <li key={item}>&middot; {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ § 04 Final CTA ============ */}
      <section
        style={{
          padding: "100px 24px",
          background: "var(--ink, #1A1613)",
          color: "var(--cream, #FFFBF7)",
        }}
      >
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#C4A265",
              marginBottom: "20px",
            }}
          >
            § 04 &middot; The kit
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display, 'Lora'), Georgia, serif",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 500,
              lineHeight: 1.1,
              margin: "0 0 24px",
            }}
          >
            Bring a mirror.<br />
            Bring patience.<br />
            <em>Stop guessing.</em>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-inter, system-ui, sans-serif)",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "rgba(255,251,247,0.78)",
              maxWidth: "560px",
              margin: "0 auto 40px",
            }}
          >
            One-time purchase. PDF download. Yours forever. No subscription, no app, no membership &mdash; just the field guide you wish someone had handed you the first time a foundation turned khaki on your jaw.
          </p>
          <a
            href={GUMROAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleKitClick("footer")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "18px 32px",
              background: "var(--cream, #FFFBF7)",
              color: "var(--ink, #1A1613)",
              fontFamily: "var(--font-inter, system-ui, sans-serif)",
              fontSize: "0.95rem",
              fontWeight: 500,
              letterSpacing: "0.04em",
              textDecoration: "none",
              border: "1px solid #C4A265",
              borderRadius: "2px",
            }}
          >
            <span>Get the survival kit &middot; $24</span>
            <span>→</span>
          </a>
          <div
            style={{
              marginTop: "24px",
              fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(255,251,247,0.5)",
            }}
          >
            PDF &middot; Instant download &middot; via Gumroad
          </div>
          <div
            style={{
              marginTop: "56px",
              paddingTop: "32px",
              borderTop: "1px solid rgba(196,162,101,0.28)",
              fontFamily: "var(--font-inter, system-ui, sans-serif)",
              fontSize: "0.9rem",
              color: "rgba(255,251,247,0.65)",
            }}
          >
            Not sure if you&rsquo;re olive?{" "}
            <Link
              href="/quiz?source=olive_kit_footer"
              style={{ color: "var(--cream, #FFFBF7)", textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              Take the free Shade DNA quiz first &rarr;
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
