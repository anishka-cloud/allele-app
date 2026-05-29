"use client";

import Link from "next/link";
import Script from "next/script";
import { trackEvent } from "@/lib/analytics";
import "../landing.css";

// Placeholder Gumroad URL — Nish updates this after listing the product
// on Gumroad. The /l/SLUG is whatever slug Gumroad assigns at listing time.
const GUMROAD_URL =
  "https://alleleapp.gumroad.com/l/summer-travel-capsule-planner";

// All 12 seasons with their travel anchor colors from the PDF.
// Hex values are visual approximations of the PDF cover swatches.
const SEASONS = [
  {
    id: "01",
    family: "SPRING",
    name: "Clear Spring",
    pulse: "Warm, medium, bright",
    rule: "Keep the capsule clean, bright, and warm. Skip dusty neutrals.",
    leave: "black-navy, cool grey, faded denim",
    anchors: [
      { slot: "Black", value: "Espresso", hex: "#3D2818" },
      { slot: "White", value: "Warm cream", hex: "#F5EAD8" },
      { slot: "Denim", value: "Golden-wash", hex: "#6B8AA8" },
      { slot: "Layer", value: "Honey tan", hex: "#B89868" },
      { slot: "Metal", value: "Polished gold", hex: "#C89F4C" },
    ],
  },
  {
    id: "02",
    family: "SPRING",
    name: "True Spring",
    pulse: "Warm, medium, bright",
    rule: "Use warmth as the glue. Cream, camel, denim, and gold should all talk to each other.",
    leave: "pure black, optic white, silver, cool charcoal",
    anchors: [
      { slot: "Black", value: "Warm chocolate", hex: "#4A3020" },
      { slot: "White", value: "Warm ivory", hex: "#F2E6D0" },
      { slot: "Denim", value: "Golden mid-wash", hex: "#5878A0" },
      { slot: "Layer", value: "Classic camel", hex: "#B08858" },
      { slot: "Metal", value: "Bright gold", hex: "#D4AF37" },
    ],
  },
  {
    id: "03",
    family: "SPRING",
    name: "Light Spring",
    pulse: "Warm, light, soft-bright",
    rule: "Your capsule should feel lifted. Choose lightness before contrast.",
    leave: "true black, dark denim, heavy camel, platinum",
    anchors: [
      { slot: "Black", value: "Warm taupe", hex: "#B5A088" },
      { slot: "White", value: "Buttercream", hex: "#FAF0DC" },
      { slot: "Denim", value: "Pale warm wash", hex: "#98B0C8" },
      { slot: "Layer", value: "Pale honey tan", hex: "#D4BC9C" },
      { slot: "Metal", value: "Light gold", hex: "#D4B85C" },
    ],
  },
  {
    id: "04",
    family: "SUMMER",
    name: "Light Summer",
    pulse: "Cool, light, soft-muted",
    rule: "Keep everything cool, pale, and softened. Your contrast should whisper.",
    leave: "orange camel, brass, heavy black, saturated denim",
    anchors: [
      { slot: "Black", value: "Soft charcoal-blue", hex: "#5C6878" },
      { slot: "White", value: "Cool ivory", hex: "#F0F0E8" },
      { slot: "Denim", value: "Pale blue wash", hex: "#98ACBC" },
      { slot: "Layer", value: "Taupe-pink", hex: "#C8B4AC" },
      { slot: "Metal", value: "Cool silver", hex: "#C0C0C8" },
    ],
  },
  {
    id: "05",
    family: "SUMMER",
    name: "True Summer",
    pulse: "Cool, medium, muted",
    rule: "Build around cool navy and dove grey. Let camel become taupe.",
    leave: "warm olive, yellow gold, orange tan, optic white overload",
    anchors: [
      { slot: "Black", value: "Cool charcoal", hex: "#404858" },
      { slot: "White", value: "Cool off-white", hex: "#ECE8E0" },
      { slot: "Denim", value: "Medium cool wash", hex: "#6884A0" },
      { slot: "Layer", value: "Cool taupe", hex: "#A8988C" },
      { slot: "Metal", value: "Brushed silver", hex: "#B0B4B8" },
    ],
  },
  {
    id: "06",
    family: "SUMMER",
    name: "Soft Summer",
    pulse: "Cool-neutral, medium, very muted",
    rule: "The capsule works when every piece is softened. Avoid crisp contrast.",
    leave: "true black, optic white, shiny gold, saturated blue denim",
    anchors: [
      { slot: "Black", value: "Slate grey", hex: "#707880" },
      { slot: "White", value: "Mushroom white", hex: "#E0DCD4" },
      { slot: "Denim", value: "Grey-wash denim", hex: "#88909C" },
      { slot: "Layer", value: "Warm taupe", hex: "#B0A090" },
      { slot: "Metal", value: "Pewter", hex: "#989898" },
    ],
  },
  {
    id: "07",
    family: "AUTUMN",
    name: "Soft Autumn",
    pulse: "Warm, medium, muted",
    rule: "Use muted warmth. Your travel capsule should look sun-dried, not bright.",
    leave: "pure black, optic white, shiny silver, cool grey",
    anchors: [
      { slot: "Black", value: "Soft brown", hex: "#785A40" },
      { slot: "White", value: "Warm off-white", hex: "#EDE0CC" },
      { slot: "Denim", value: "Warm medium wash", hex: "#6878A0" },
      { slot: "Layer", value: "Honey camel", hex: "#B89868" },
      { slot: "Metal", value: "Antique gold", hex: "#B89858" },
    ],
  },
  {
    id: "08",
    family: "AUTUMN",
    name: "True Autumn",
    pulse: "Warm, rich, earthy",
    rule: "Let brown do the work black usually does. Warmth is the system.",
    leave: "optic white, cool grey, silver, black denim",
    anchors: [
      { slot: "Black", value: "Chocolate", hex: "#4A3020" },
      { slot: "White", value: "Bone", hex: "#E8D8C0" },
      { slot: "Denim", value: "Rust-wash", hex: "#88503C" },
      { slot: "Layer", value: "Cognac", hex: "#98683C" },
      { slot: "Metal", value: "Warm gold", hex: "#C49858" },
    ],
  },
  {
    id: "09",
    family: "AUTUMN",
    name: "Dark Autumn",
    pulse: "Warm, deep, muted",
    rule: "Pack depth, not blackness. Your darks need heat inside them.",
    leave: "pale denim, optic white, cool navy, polished silver",
    anchors: [
      { slot: "Black", value: "Deep espresso", hex: "#3D2818" },
      { slot: "White", value: "Warm ivory", hex: "#E8DCC4" },
      { slot: "Denim", value: "Deep rust-wash", hex: "#6C3828" },
      { slot: "Layer", value: "Deep cognac", hex: "#683C20" },
      { slot: "Metal", value: "Antique brass", hex: "#A8843C" },
    ],
  },
  {
    id: "10",
    family: "WINTER",
    name: "Dark Winter",
    pulse: "Cool, deep, dramatic",
    rule: "High contrast is efficient for you. Black and white can carry the suitcase.",
    leave: "warm camel, faded denim, brass, dusty taupe",
    anchors: [
      { slot: "Black", value: "True black", hex: "#000000" },
      { slot: "White", value: "Pure white", hex: "#FFFFFF" },
      { slot: "Denim", value: "Deep indigo", hex: "#1A2848" },
      { slot: "Layer", value: "Ink navy", hex: "#182040" },
      { slot: "Metal", value: "Silver", hex: "#B8B8C0" },
    ],
  },
  {
    id: "11",
    family: "WINTER",
    name: "True Winter",
    pulse: "Cool, medium-deep, bright",
    rule: "Pack crispness. Your easiest capsule is structured, cool, and high contrast.",
    leave: "cream, camel, brass, warm olive",
    anchors: [
      { slot: "Black", value: "True black", hex: "#000000" },
      { slot: "White", value: "Optic white", hex: "#F8F8F8" },
      { slot: "Denim", value: "Cool indigo", hex: "#2A3868" },
      { slot: "Layer", value: "Classic navy", hex: "#1A2858" },
      { slot: "Metal", value: "Polished silver", hex: "#C0C0C8" },
    ],
  },
  {
    id: "12",
    family: "WINTER",
    name: "Bright Winter",
    pulse: "Cool, medium, bright",
    rule: "Your capsule needs clarity. If it looks dusty, leave it home.",
    leave: "muted camel, mushroom, antique finishes, faded denim",
    anchors: [
      { slot: "Black", value: "True black", hex: "#000000" },
      { slot: "White", value: "Icy white", hex: "#F0F4F8" },
      { slot: "Denim", value: "Clear mid-indigo", hex: "#2848A0" },
      { slot: "Layer", value: "Bright navy", hex: "#1A4880" },
      { slot: "Metal", value: "Chrome silver", hex: "#C8C8D0" },
    ],
  },
];

// The 12-piece formula from PDF page 2 — the structural promise.
const FORMULA = [
  { count: 3, name: "Tops", note: "One white, one color, one print or texture." },
  { count: 2, name: "Bottoms", note: "One denim, one non-denim neutral." },
  { count: 2, name: "Layers", note: "One light layer, one warmer evening layer." },
  { count: 2, name: "Shoes", note: "One walkable, one polished." },
  { count: 1, name: "One-piece", note: "Dress, set, jumpsuit, or repeated outfit." },
  { count: 1, name: "Metal", note: "One jewelry finish. Do not split the capsule." },
  { count: 1, name: "Bag", note: "Match your black, camel, or metal." },
  { count: 0, name: "Orphans", note: "No piece that only works with one outfit." },
];

// What you actually get when you buy.
const INSIDE = [
  {
    label: "Page One",
    title: "Cover · the twelve cores at a glance",
    items: ["The full 12-season palette grid", "Who this is for, in one line"],
  },
  {
    label: "Page Two",
    title: "Start Here",
    items: [
      "The 12-piece capsule formula",
      "Use this for · do not use this for",
      "The anchor-first principle",
    ],
  },
  {
    label: "Pages Three to Six",
    title: "The twelve travel cores",
    items: [
      "One card per season · twelve in total",
      "Travel core · five anchor colors named",
      "Pack rule · the one-line system for your season",
      "Leave home · what undoes the capsule",
      "Your-version slot table · black, white, denim, layer, metal",
    ],
  },
  {
    label: "Page Seven",
    title: "Worksheet · Build the suitcase before you pack it",
    items: [
      "Twelve numbered piece rows",
      "Color-check column · does it match your anchors",
      "Outfits-it-serves column · two-outfit minimum rule",
      "Pack? column · the kill-or-keep decision",
    ],
  },
  {
    label: "Page Eight",
    title: "Worksheet · Seven-day outfit grid",
    items: [
      "One row per day · day outfit, evening swap, repeat piece",
      "Anchor-fix fast rule at the foot of the page",
    ],
  },
];

function handleCapsuleClick(source) {
  trackEvent("kit_clicked", {
    kit: "summer-travel-capsule-planner",
    source,
    price_usd: 12,
  });
}

export default function TravelCapsule() {
  return (
    <main className="landing">
      {/* Gumroad overlay script — attaches modal checkout to any .gumroad-button */}
      <Script src="https://gumroad.com/js/gumroad.js" strategy="afterInteractive" />

      {/* ============ Nav ============ */}
      <nav className="l-nav">
        <div className="l-nav-inner">
          <Link href="/" className="l-nav-wordmark" style={{ textDecoration: "none" }}>
            all<em>e</em>le
          </Link>
          <div className="l-nav-links">
            <a href="#problem">The Problem</a>
            <a href="#formula">The Formula</a>
            <a href="#cores">Sample Cores</a>
            <a href="#inside">What&rsquo;s Inside</a>
            <Link href="/quiz?source=capsule_nav">Take the Quiz</Link>
          </div>
          <a
            className="l-nav-cta gumroad-button"
            href={GUMROAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-gumroad-single-product="true"
            onClick={() => handleCapsuleClick("nav")}
          >
            Pack the capsule · $12 →
          </a>
        </div>
      </nav>

      {/* ============ Hero ============ */}
      <section className="l-hero">
        <div className="l-hero-eyebrow">
          <span>Allele · Vol. II · Shade DNA · Mini Planner</span>
          <span className="hairline"></span>
          <span>Summer 2026</span>
          <div className="l-swatch-row">
            {SEASONS.slice(0, 6).map((s) => (
              <span
                key={s.id}
                className="swatch"
                style={{ background: s.anchors[3].hex }}
                title={`${s.name} · ${s.anchors[3].value}`}
              ></span>
            ))}
          </div>
        </div>

        <div className="l-hero-grid">
          <div>
            <h1 className="l-hero-headline">
              Half your<br />
              suitcase doesn&rsquo;t<br />
              <em>work on you</em>.
            </h1>
            <p className="l-hero-sub">
              Most packing lists assume everyone can build around the same neutrals &mdash; black, white, denim, camel, navy, gold. That is why the suitcase looks sensible at home and strangely disconnected on the trip. Your capsule starts working when the anchor colors match your season. <em>One PDF, twelve season-specific capsules, the math already done.</em>
            </p>
            <div className="l-hero-cta-row">
              <a
                className="l-cta-primary gumroad-button"
                href={GUMROAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-gumroad-single-product="true"
                onClick={() => handleCapsuleClick("hero")}
              >
                <span>Pack the capsule · $12</span>
                <span className="arrow">→</span>
              </a>
              <span className="l-cta-meta">PDF · Instant download · One-time purchase</span>
            </div>
            <div className="l-hero-meta">
              <div className="l-hero-meta-item"><strong>12</strong><span>Seasons</span></div>
              <div className="l-hero-meta-item"><strong>60</strong><span>Anchor colors</span></div>
              <div className="l-hero-meta-item"><strong>8</strong><span>Pages</span></div>
              <div className="l-hero-meta-item"><strong>2</strong><span>Worksheets</span></div>
            </div>
          </div>

          <div className="l-hero-card">
            <div className="l-hero-card-tag">Mini Planner · Summer Travel</div>
            <div className="l-hero-card-name">The Capsule Planner</div>
            <div className="l-hero-card-attrs">
              <span>12 Seasons</span>
              <span>12 Cores</span>
              <span>2 Worksheets</span>
            </div>
            <div
              className="l-hero-card-palette"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(10, 1fr)",
                gap: "4px",
              }}
            >
              {SEASONS.map((s) =>
                s.anchors.slice(0, 5).map((a, i) => (
                  <div
                    key={`${s.id}-${i}`}
                    className="chip"
                    style={{ background: a.hex }}
                    title={`${s.name} · ${a.value}`}
                  ></div>
                ))
              )}
            </div>
            <div className="l-hero-card-whisper">
              &ldquo;For the person who packs black, white, denim, and gold because they are <em>basics</em>{" "}&mdash; and still arrives with nothing that works together.&rdquo;
            </div>
            <div className="l-hero-card-twins">
              <span className="l-hero-card-twins-label">For readers who</span>
              <span className="l-hero-card-twins-names">
                <em>overpack and underuse</em>
                <em>hate the vacation photos</em>
                <em>rebuy &ldquo;basics&rdquo; every trip</em>
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
              The problem is not<br />the <em>number of pieces</em>.
            </h2>
            <div className="l-section-head-meta">Three structural reasons your capsule fails</div>
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
                One &middot; Universal &ldquo;basics&rdquo; are not universal.
              </div>
              Black, white, denim, camel, navy, gold. Most packing lists assume the same five neutrals work on everyone. They do not. The grey-blue linen that anchors a Soft Summer dissolves on a Bright Winter. The terracotta that grounds a True Autumn flattens a Light Spring. You have packed it before. The photos came back flat.
            </li>
            <li>
              <div style={{ fontFamily: "var(--font-display, 'Lora'), Georgia, serif", fontStyle: "italic", fontSize: "1.15rem", color: "#5C3F10", marginBottom: "8px" }}>
                Two &middot; You pack pieces, not <em>systems</em>.
              </div>
              An eight-piece capsule that does not share temperature, depth, and softness across the anchors is just eight orphans in a suitcase. The capsule starts mixing the moment your black, white, denim, layer, and metal belong to the same season family. The pieces do not need to be fancy. They need to <em>match each other</em>.
            </li>
            <li>
              <div style={{ fontFamily: "var(--font-display, 'Lora'), Georgia, serif", fontStyle: "italic", fontSize: "1.15rem", color: "#5C3F10", marginBottom: "8px" }}>
                Three &middot; Vacation photographs <em>forever</em>.
              </div>
              Your suitcase is built for the few days that produce most of the photos you keep. Harsh beach sun, golden hour on a balcony, a stranger&rsquo;s iPhone at dinner. The colors that flatten you in that light are not the colors that flatten you under your bathroom vanity. The capsule has to hold in real light, not display light.
            </li>
          </ol>
        </div>
      </section>

      {/* ============ § 02 The Formula ============ */}
      <section
        id="formula"
        style={{
          padding: "80px 24px",
          background: "var(--cream, #FFFBF7)",
        }}
      >
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <div className="l-section-head" style={{ marginBottom: "48px" }}>
            <div className="l-section-head-num">§ 02</div>
            <h2 className="l-section-head-title">
              The twelve-piece<br /><em>capsule formula</em>.
            </h2>
            <div className="l-section-head-meta">The structural promise · same for every season</div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            {FORMULA.map((f) => (
              <article
                key={f.name}
                style={{
                  background: "var(--cream-2, #F8F2E9)",
                  border: "1px solid rgba(196,162,101,0.22)",
                  borderRadius: "6px",
                  padding: "28px 22px",
                  fontFamily: "var(--font-inter, system-ui, sans-serif)",
                  color: "var(--ink, #1A1613)",
                  lineHeight: 1.55,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display, 'Lora'), Georgia, serif",
                    fontSize: "2.6rem",
                    fontWeight: 500,
                    color: "#C4A265",
                    lineHeight: 1,
                    marginBottom: "10px",
                  }}
                >
                  {f.count}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace",
                    fontSize: "0.72rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--ink, #1A1613)",
                    marginBottom: "10px",
                  }}
                >
                  {f.name}
                </div>
                <p style={{ fontSize: "0.92rem", margin: 0, color: "rgba(26,22,19,0.78)" }}>
                  {f.note}
                </p>
              </article>
            ))}
          </div>

          <div
            style={{
              marginTop: "40px",
              padding: "20px 24px",
              borderLeft: "3px solid #C4A265",
              background: "var(--cream-2, #F8F2E9)",
              fontFamily: "var(--font-display, 'Lora'), Georgia, serif",
              fontStyle: "italic",
              fontSize: "1.05rem",
              color: "var(--ink, #1A1613)",
              lineHeight: 1.6,
            }}
          >
            Start with the anchors. Then pack the outfits.
          </div>
        </div>
      </section>

      {/* ============ § 03 Sample Cores ============ */}
      <section
        id="cores"
        style={{
          padding: "80px 24px",
          background: "var(--cream-2, #F8F2E9)",
          borderTop: "1px solid rgba(196,162,101,0.18)",
          borderBottom: "1px solid rgba(196,162,101,0.18)",
        }}
      >
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <div className="l-section-head" style={{ marginBottom: "48px" }}>
            <div className="l-section-head-num">§ 03</div>
            <h2 className="l-section-head-title">
              Four sample<br /><em>travel cores</em>.
            </h2>
            <div className="l-section-head-meta">All twelve are in the PDF · this is what one card looks like</div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {[SEASONS[1], SEASONS[4], SEASONS[7], SEASONS[10]].map((s) => (
              <article
                key={s.id}
                style={{
                  background: "var(--cream, #FFFBF7)",
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
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace",
                      fontSize: "0.7rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#C4A265",
                    }}
                  >
                    {s.family}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "4px",
                    }}
                  >
                    {s.anchors.map((a, i) => (
                      <span
                        key={i}
                        style={{
                          width: "14px",
                          height: "14px",
                          borderRadius: "50%",
                          background: a.hex,
                          border: "1px solid rgba(0,0,0,0.08)",
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display, 'Lora'), Georgia, serif",
                    fontSize: "1.4rem",
                    fontWeight: 500,
                    marginBottom: "4px",
                  }}
                >
                  {s.name}
                </div>
                <div
                  style={{
                    fontSize: "0.82rem",
                    color: "rgba(26,22,19,0.6)",
                    marginBottom: "20px",
                  }}
                >
                  {s.pulse}
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace",
                    fontSize: "0.66rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#C4A265",
                    marginBottom: "8px",
                  }}
                >
                  Pack rule
                </div>
                <p style={{ margin: "0 0 18px", fontSize: "0.92rem", fontStyle: "italic", fontFamily: "var(--font-display, 'Lora'), Georgia, serif" }}>
                  {s.rule}
                </p>

                <div
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace",
                    fontSize: "0.66rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#C4A265",
                    marginBottom: "8px",
                  }}
                >
                  Your version
                </div>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "0.86rem",
                  }}
                >
                  <tbody>
                    {s.anchors.map((a, i) => (
                      <tr
                        key={i}
                        style={{
                          borderBottom: i < s.anchors.length - 1 ? "1px solid rgba(196,162,101,0.16)" : "none",
                        }}
                      >
                        <td style={{ padding: "8px 0", color: "rgba(26,22,19,0.55)", width: "32%" }}>{a.slot}</td>
                        <td style={{ padding: "8px 0" }}>
                          <span
                            style={{
                              display: "inline-block",
                              width: "12px",
                              height: "12px",
                              borderRadius: "50%",
                              background: a.hex,
                              border: "1px solid rgba(0,0,0,0.08)",
                              marginRight: "8px",
                              verticalAlign: "middle",
                            }}
                          />
                          {a.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div
                  style={{
                    marginTop: "18px",
                    paddingTop: "14px",
                    borderTop: "1px solid rgba(196,162,101,0.18)",
                    fontSize: "0.82rem",
                    color: "rgba(26,22,19,0.65)",
                  }}
                >
                  <strong style={{ color: "var(--ink, #1A1613)" }}>Leave home: </strong>
                  {s.leave}.
                </div>
              </article>
            ))}
          </div>

          <div
            style={{
              marginTop: "32px",
              textAlign: "center",
              fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(26,22,19,0.55)",
            }}
          >
            + Eight more season cards inside the PDF
          </div>
        </div>
      </section>

      {/* ============ § 04 What's Inside ============ */}
      <section
        id="inside"
        style={{
          padding: "80px 24px",
          background: "var(--cream, #FFFBF7)",
        }}
      >
        <div style={{ maxWidth: "920px", margin: "0 auto" }}>
          <div className="l-section-head" style={{ marginBottom: "48px" }}>
            <div className="l-section-head-num">§ 04</div>
            <h2 className="l-section-head-title">
              What&rsquo;s<br /><em>inside</em>.
            </h2>
            <div className="l-section-head-meta">Eight pages · twelve season cards · two worksheets</div>
          </div>

          <div style={{ display: "grid", gap: "20px" }}>
            {INSIDE.map((part, idx) => (
              <div
                key={part.label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(140px, 200px) 1fr",
                  gap: "32px",
                  alignItems: "baseline",
                  padding: "20px 0",
                  borderBottom: idx < INSIDE.length - 1 ? "1px solid rgba(196,162,101,0.18)" : "none",
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

      {/* ============ § 05 Final CTA ============ */}
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
            § 05 &middot; The planner
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
            Start with the anchors.<br />
            Then pack the <em>outfits</em>.
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
            One-time purchase. PDF download. Yours forever. No subscription, no app, no membership &mdash; just the planner you wish someone had handed you the first time you came home from vacation with a hundred photos and nothing that works together.
          </p>
          <a
            className="gumroad-button"
            href={GUMROAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-gumroad-single-product="true"
            onClick={() => handleCapsuleClick("footer")}
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
            <span>Pack the capsule &middot; $12</span>
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
            Not sure which season you are?{" "}
            <Link
              href="/quiz?source=capsule_footer"
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
