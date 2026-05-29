"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import "../landing.css";

const GUMROAD_URL =
  "https://alleleapp.gumroad.com/l/closet-color-reset-bundle";

const ANCHORS = [
  {
    id: "01",
    name: "Black",
    swatch: "#1A1A1A",
    wear: "Your functional dark",
    note: "True black is only universal for Winters. For other seasons, espresso, chocolate, slate grey, or deep navy ground you without draining your face.",
  },
  {
    id: "02",
    name: "White",
    swatch: "#F8EFDC",
    wear: "Your clean light",
    note: "Stark optic white can wash out warm and soft seasons. Bone, ivory, buttercream, or soft grey-mushroom whites harmonize with your undertone.",
  },
  {
    id: "03",
    name: "Denim",
    swatch: "#4F739B",
    wear: "Your daily wash",
    note: "Saturated dark washes, pale warm washes, or grey-wash denim. The wash that works with your contrast level and temperature.",
  },
  {
    id: "04",
    name: "Khaki",
    swatch: "#8A8058",
    wear: "Your utility neutral",
    note: "Your version of army green, sand, stone, sage, or taupe. The earthy baseline for trousers, coats, and utility layers.",
  },
  {
    id: "05",
    name: "Grey",
    swatch: "#A3A8AF",
    wear: "Your quiet middle",
    note: "Grey can make warm skin look sallow or tired. Find out if you need cool dove grey, warm greige, honey-greige, or slate grey.",
  },
  {
    id: "06",
    name: "Navy",
    swatch: "#1E4875",
    wear: "Your grounding dark",
    note: "A universal alternative to black, but Skewed correctly. Ink navy, nautical navy, mid warm-navy, or deep forest-navy.",
  },
  {
    id: "07",
    name: "Camel",
    swatch: "#C9985A",
    wear: "Your tan family",
    note: "Cognac, saddle, espresso, or honey tan. The classic coat, shoe, and belt neutral translated into your season's warmth and depth.",
  },
  {
    id: "08",
    name: "Metal",
    swatch: "#C4A265",
    wear: "Your metallic sheen",
    note: "Polished gold, rose gold, brushed pewter, chrome, or antique brass. The jewelry finish that repeats your undertone instead of fighting it.",
  },
];

const TOC_PARTS = [
  {
    label: "Part One",
    title: "Why neutrals aren't universal",
    items: ["Welcome", "The Neutral Trap (why classic basics wash you out)", "The physics of neutral temperature and chroma"],
  },
  {
    label: "Part Two",
    title: "The eight anchor slots",
    items: ["Black", "White", "Denim", "Khaki", "Grey", "Navy", "Camel", "Metal"],
  },
  {
    label: "Part Three",
    title: "The 12-season maps",
    items: [
      "Spring Family · Clear, True, and Light Spring maps",
      "Summer Family · Light, True, and Soft Summer maps",
      "Autumn Family · Soft, True, and Dark Autumn maps",
      "Winter Family · Dark, True, and Bright Winter maps",
    ],
  },
  {
    label: "Part Four",
    title: "Fast reference chart",
    items: ["The 12-season cheat sheet grid for shopping on the go"],
  },
  {
    label: "Part Five",
    title: "The worksheets",
    items: [
      "Worksheet · The 5-minute closet audit",
      "Worksheet · The neutral wardrobe builder chart",
    ],
  },
];

function handleKitClick(source) {
  trackEvent("kit_clicked", {
    kit: "no-universal-neutrals",
    source,
    price_usd: 17,
  });
}

export default function ClosetKit() {
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
            <a href="#anchors">The Eight</a>
            <a href="#inside">What&rsquo;s Inside</a>
            <Link href="/quiz?source=neutral_nav">Take the Quiz</Link>
          </div>
          <a
            className="l-nav-cta"
            href={GUMROAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleKitClick("nav")}
          >
            Get the guide · $17 →
          </a>
        </div>
      </nav>

      {/* ============ Hero ============ */}
      <section className="l-hero">
        <div className="l-hero-eyebrow">
          <span>Allele · Vol. II · Wardrobe Guide</span>
          <span className="hairline"></span>
          <span>First edition · 2026</span>
          <div className="l-swatch-row">
            {ANCHORS.slice(0, 4).map((a) => (
              <span key={a.id} className="swatch" style={{ background: a.swatch }}></span>
            ))}
          </div>
        </div>

        <div className="l-hero-grid">
          <div>
            <h1 className="l-hero-headline">
              Find your<br />
              real closet<br />
              <em>neutrals</em>.
            </h1>
            <p className="l-hero-sub">
              A visual 12-season guide to the black, white, denim, khaki, grey, navy, camel, and metal that actually belong in your closet. Translate seasonal color analysis into real wardrobe decisions. Sixteen pages. Twelve season maps. The 5-minute closet audit. Yours forever.
            </p>
            <div className="l-hero-cta-row">
              <a
                className="l-cta-primary"
                href={GUMROAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleKitClick("hero")}
              >
                <span>Get the guide · $17</span>
                <span className="arrow">→</span>
              </a>
              <span className="l-cta-meta">PDF · Instant download · One-time purchase</span>
            </div>
            <div className="l-hero-meta">
              <div className="l-hero-meta-item"><strong>12</strong><span>Seasons</span></div>
              <div className="l-hero-meta-item"><strong>8</strong><span>Neutral Anchors</span></div>
              <div className="l-hero-meta-item"><strong>5-min</strong><span>Closet Audit</span></div>
              <div className="l-hero-meta-item"><strong>1</strong><span>Visual Guide</span></div>
            </div>
          </div>

          <div className="l-hero-card">
            <div className="l-hero-card-tag">Wardrobe Guide &middot; Neutrals</div>
            <div className="l-hero-card-name">No Universal Neutrals</div>
            <div className="l-hero-card-attrs">
              <span>12 Seasons</span>
              <span>8 Anchors</span>
              <span>Worksheets</span>
            </div>
            <div className="l-hero-card-palette">
              {ANCHORS.slice(0, 6).map((a) => (
                <div key={a.id} className="chip" style={{ background: a.swatch }}></div>
              ))}
            </div>
            <div className="l-hero-card-whisper">
              &ldquo;Classic neutrals are treated as universal. But true black drains a Summer, optic white fights an Autumn, and camel washes out a Winter. Your version of basics is waiting.&rdquo;
            </div>
            <div className="l-hero-card-twins">
              <span className="l-hero-card-twins-label">For readers who</span>
              <span className="l-hero-card-twins-names">
                <em>feel flat in black</em>
                <em>find camel turns orange</em>
                <em>want a capsule closet</em>
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
              Why classic basics<br />wash you out.
            </h2>
            <div className="l-section-head-meta">Three structural disconnects</div>
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
                One &middot; Standard fashion rules optimize for the Winter family.
              </div>
              Stark true black and crisp optic white are treated as universal basics. In color science, they are cool and fully saturated. On a Winter, they look structural and clean. On a Spring, Summer, or Autumn, they pull all the life from your face, highlighting shadow and making your coloring read flat.
            </li>
            <li>
              <div style={{ fontFamily: "var(--font-display, 'Lora'), Georgia, serif", fontStyle: "italic", fontSize: "1.15rem", color: "#5C3F10", marginBottom: "8px" }}>
                Two &middot; Neutrals have temperature and chroma.
              </div>
              Camel isn't just "tan." It can skew warm honey (Spring), greyed warm-taupe (Summer), rich cognac (Autumn), or deep espresso (Winter). If your basics fight the undertone and contrast of your skin, the capsule wardrobe you spent hundreds on will never feel quite right.
            </li>
            <li>
              <div style={{ fontFamily: "var(--font-display, 'Lora'), Georgia, serif", fontStyle: "italic", fontSize: "1.15rem", color: "#5C3F10", marginBottom: "8px" }}>
                Three &middot; The wrong metals fight your undertone.
              </div>
              Metal is a neutral. A polished gold necklace next to a cool Summer face reads brassy; a sterling silver chain next to a warm Autumn skin tone reads icy and separate. Matching your metal finish to your coordinate axis is the fastest shortcut to looking pulled together.
            </li>
          </ol>
        </div>
      </section>

      {/* ============ § 02 The Eight Anchor Slots ============ */}
      <section
        id="anchors"
        style={{
          padding: "80px 24px",
          background: "var(--cream, #FFFBF7)",
        }}
      >
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <div className="l-section-head" style={{ marginBottom: "48px" }}>
            <div className="l-section-head-num">§ 02</div>
            <h2 className="l-section-head-title">
              The eight<br /><em>anchors</em>.
            </h2>
            <div className="l-section-head-meta">The foundation categories most closets are built from</div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {ANCHORS.map((a) => (
              <article
                key={a.id}
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
                  Anchor {a.id} / 08
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: a.swatch,
                      border: "1px solid rgba(0,0,0,0.08)",
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div style={{ fontFamily: "var(--font-display, 'Lora'), Georgia, serif", fontSize: "1.3rem", fontWeight: 500 }}>
                      {a.name}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "rgba(26,22,19,0.6)", marginTop: "2px" }}>
                      {a.wear}
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: "0.93rem", margin: 0 }}>{a.note}</p>
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
            <div className="l-section-head-meta">Sixteen pages, five parts</div>
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
            § 04 &middot; The Guide
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
            Find your real<br />
            closet anchors.<br />
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
            One-time purchase. PDF download. Yours forever. A practical reference you can pull up on your phone when shopping, doing a closet edit, or picking daily outfits.
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
            <span>Get the guide &middot; $17</span>
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
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              alignItems: "center"
            }}
          >
            <div>
              Not sure of your color season?{" "}
              <Link
                href="/quiz?source=neutral_kit_footer"
                style={{ color: "var(--cream, #FFFBF7)", textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                Take the free Shade DNA quiz first &rarr;
              </Link>
            </div>
            <div>
              Ready to find your style vibe?{" "}
              <Link
                href="/vibe?source=neutral_kit_footer"
                style={{ color: "var(--cream, #FFFBF7)", textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                Take the free Vibe DNA quiz next &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
