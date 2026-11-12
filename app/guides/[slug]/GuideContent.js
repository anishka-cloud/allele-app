"use client";

import { useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { withUTM } from "@/lib/shopLinks";
import "../../landing.css";

const INK = "var(--ink, #1A1613)";
const GOLD = "#C4A265";
const SANS = "var(--font-inter, system-ui, sans-serif)";
const SERIF = "var(--font-display, 'Lora'), Georgia, serif";
const MONO = "var(--font-mono, 'JetBrains Mono'), monospace";

const eyebrow = {
  fontFamily: MONO,
  fontSize: "0.7rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: GOLD,
  marginBottom: "16px",
};

const h2 = {
  fontFamily: SERIF,
  fontSize: "clamp(1.6rem, 3.2vw, 2.2rem)",
  fontWeight: 500,
  lineHeight: 1.2,
  margin: "0 0 20px",
  color: INK,
};

const body = { fontFamily: SANS, fontSize: "1.02rem", lineHeight: 1.7, color: INK, margin: 0 };

const section = (alt) => ({
  padding: "56px 24px",
  background: alt ? "var(--cream-2, #F8F2E9)" : "var(--cream, #FFFBF7)",
  borderTop: "1px solid rgba(196,162,101,0.18)",
});

const wrap = { maxWidth: "760px", margin: "0 auto" };

function ShopButton({ guide, placement, dark }) {
  const href = withUTM(guide.editUrl, { season: guide.seasonName, source: "guide", category: placement });
  return (
    <a
      href={href}
      target="_blank"
      rel="sponsored noopener noreferrer"
      onClick={() =>
        trackEvent("shop_click", {
          source: `guide_${placement}`,
          destination: "shopmy_collection",
          season: guide.seasonName,
          guide: guide.slug,
        })
      }
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "12px",
        padding: "16px 28px",
        background: dark ? "var(--cream, #FFFBF7)" : INK,
        color: dark ? INK : "var(--cream, #FFFBF7)",
        fontFamily: SANS,
        fontSize: "0.95rem",
        fontWeight: 500,
        letterSpacing: "0.03em",
        textDecoration: "none",
        border: `1px solid ${GOLD}`,
        borderRadius: "2px",
      }}
    >
      <span>Shop the {guide.seasonName} edit</span>
      <span aria-hidden="true">→</span>
    </a>
  );
}

function Disclosure({ dark }) {
  return (
    <p
      style={{
        fontFamily: SANS,
        fontSize: "0.82rem",
        lineHeight: 1.5,
        color: dark ? "rgba(255,251,247,0.6)" : "rgba(26,22,19,0.6)",
        margin: "14px 0 0",
      }}
    >
      Shop links are affiliate links: Allele may earn a commission if you buy through them. Color inspiration, not a
      foundation shade match.
    </p>
  );
}

function EmailCapture({ guide }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");

  async function onSubmit(e) {
    e.preventDefault();
    if (!email.includes("@")) return;
    setState("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, season: guide.seasonName, source: "season-guide" }),
      });
      if (!res.ok) throw new Error("subscribe failed");
      setState("done");
      trackEvent("email_signup", { source: "season_guide", season: guide.seasonName, guide: guide.slug });
    } catch {
      setState("error");
    }
  }

  return (
    <section style={section(true)}>
      <div style={wrap}>
        <div style={eyebrow}>§ Stay in your colors</div>
        <h2 style={h2}>New {guide.seasonName} finds, by email.</h2>
        <p style={{ ...body, marginBottom: "20px" }}>
          When the {guide.seasonName} edit gets new pieces, you&rsquo;ll hear about it first. No spam, unsubscribe any time.
        </p>
        {state === "done" ? (
          <p style={{ ...body, fontFamily: SERIF, fontStyle: "italic" }}>You&rsquo;re on the list.</p>
        ) : (
          <form onSubmit={onSubmit} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <label htmlFor="guide-email" style={{ position: "absolute", left: "-9999px" }}>
              Email address
            </label>
            <input
              id="guide-email"
              type="email"
              required
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: "1 1 240px",
                padding: "14px 16px",
                fontFamily: SANS,
                fontSize: "1rem",
                border: "1px solid rgba(26,22,19,0.25)",
                borderRadius: "2px",
                background: "#fff",
                color: INK,
              }}
            />
            <button
              type="submit"
              disabled={state === "sending"}
              style={{
                padding: "14px 24px",
                fontFamily: SANS,
                fontSize: "0.95rem",
                fontWeight: 500,
                background: INK,
                color: "var(--cream, #FFFBF7)",
                border: `1px solid ${GOLD}`,
                borderRadius: "2px",
                cursor: "pointer",
              }}
            >
              {state === "sending" ? "Adding…" : "Sign me up"}
            </button>
          </form>
        )}
        {state === "error" && (
          <p style={{ ...body, fontSize: "0.9rem", marginTop: "10px", color: "#8E1B2C" }}>
            That didn&rsquo;t go through. Try again in a moment.
          </p>
        )}
      </div>
    </section>
  );
}

export default function GuideContent({ guide }) {
  return (
    <main className="landing">
      <nav className="l-nav">
        <div className="l-nav-inner">
          <Link href="/" className="l-nav-wordmark" style={{ textDecoration: "none" }}>
            all<em>e</em>le
          </Link>
          <div className="l-nav-links">
            <a href="#swaps">The Swaps</a>
            <a href="#colors">Colors</a>
            <a href="#outfits">Outfits</a>
            <Link href={`/quiz?source=guide_${guide.slug}_nav`}>Take the Quiz</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header style={{ padding: "64px 24px 48px", background: "var(--cream, #FFFBF7)" }}>
        <div style={wrap}>
          <div style={eyebrow}>
            Season guide · {guide.tagline}
          </div>
          <h1
            style={{
              fontFamily: SERIF,
              fontSize: "clamp(2.2rem, 6vw, 3.6rem)",
              fontWeight: 500,
              lineHeight: 1.08,
              margin: "0 0 20px",
              color: INK,
            }}
          >
            {guide.title}
          </h1>
          <p style={{ ...body, fontSize: "1.15rem", marginBottom: "28px" }}>{guide.dek}</p>
          <div style={{ display: "flex", height: "44px", borderRadius: "2px", overflow: "hidden", marginBottom: "28px" }}>
            {guide.palette.map((c) => (
              <span key={c.hex} title={c.name} style={{ flex: 1, background: c.hex }} />
            ))}
          </div>
          {guide.editUrl && <ShopButton guide={guide} placement="hero" />}
          <Disclosure />
        </div>
      </header>

      {/* Quick read */}
      <section style={section(true)}>
        <div style={wrap}>
          <div style={eyebrow}>§ 01 · The quick read</div>
          <h2 style={h2}>{guide.seasonName}, in one line.</h2>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginBottom: "20px", fontFamily: MONO, fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(26,22,19,0.7)" }}>
            <span>Undertone · {guide.undertone}</span>
            <span>Depth · {guide.depth}</span>
            <span>Chroma · {guide.chroma}</span>
          </div>
          <p style={body}>{guide.intro}</p>
        </div>
      </section>

      {/* Basics swaps */}
      {guide.basics.length > 0 && (
        <section id="swaps" style={section(false)}>
          <div style={wrap}>
            <div style={eyebrow}>§ 02 · Swap your basics</div>
            <h2 style={h2}>Your version of the basics.</h2>
            <div style={{ display: "grid", gap: "0" }}>
              {guide.basics.map((b) => (
                <div
                  key={b.piece}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "44px 1fr",
                    gap: "16px",
                    padding: "18px 0",
                    borderBottom: "1px solid rgba(196,162,101,0.25)",
                    alignItems: "start",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{ width: "44px", height: "44px", background: b.hex, border: "1px solid rgba(26,22,19,0.12)", borderRadius: "2px" }}
                  />
                  <div>
                    <div style={{ fontFamily: SERIF, fontSize: "1.15rem", color: INK, marginBottom: "4px" }}>
                      {b.piece}: <em>{b.answer.toLowerCase()}</em>
                    </div>
                    <p style={{ ...body, fontSize: "0.95rem", color: "rgba(26,22,19,0.78)" }}>{b.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Colors */}
      <section id="colors" style={section(true)}>
        <div style={wrap}>
          <div style={eyebrow}>§ 03 · Colors</div>
          <h2 style={h2}>Wear these. Skip those.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "14px", marginBottom: "28px" }}>
            {guide.palette.map((c) => (
              <div key={c.hex} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ width: "32px", height: "32px", background: c.hex, borderRadius: "2px", flexShrink: 0 }} />
                <span style={{ fontFamily: SANS, fontSize: "0.95rem", color: INK }}>{c.name}</span>
              </div>
            ))}
          </div>
          <p style={body}>
            <strong style={{ fontWeight: 600 }}>Skip:</strong> {guide.avoid.join(", ").toLowerCase()}.
          </p>
        </div>
      </section>

      {/* Outfit formulas */}
      <section id="outfits" style={section(false)}>
        <div style={wrap}>
          <div style={eyebrow}>§ 04 · Outfit formulas</div>
          <h2 style={h2}>Four outfits to start with.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px", marginBottom: "32px" }}>
            {guide.formulas.map((f) => (
              <div key={f.name} style={{ padding: "20px", border: "1px solid rgba(196,162,101,0.35)", borderRadius: "2px", background: "#fff" }}>
                <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "1.1rem", color: INK, marginBottom: "10px" }}>{f.name}</div>
                <ul style={{ margin: 0, paddingLeft: "18px", fontFamily: SANS, fontSize: "0.95rem", lineHeight: 1.8, color: INK }}>
                  {f.pieces.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {guide.editUrl && (
            <>
              <p style={{ ...body, marginBottom: "18px" }}>
                Pieces in these colors are collected in the {guide.seasonName} edit.
              </p>
              <ShopButton guide={guide} placement="outfits" />
              <Disclosure />
            </>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section style={section(true)}>
        <div style={wrap}>
          <div style={eyebrow}>§ 05 · Questions</div>
          <h2 style={h2}>{guide.seasonName} FAQ</h2>
          {guide.faq.map((f) => (
            <div key={f.q} style={{ padding: "16px 0", borderBottom: "1px solid rgba(196,162,101,0.25)" }}>
              <h3 style={{ fontFamily: SERIF, fontSize: "1.1rem", fontWeight: 500, margin: "0 0 8px", color: INK }}>{f.q}</h3>
              <p style={{ ...body, fontSize: "0.98rem" }}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <EmailCapture guide={guide} />

      {/* Final */}
      <section style={{ padding: "64px 24px", background: INK, textAlign: "center" }}>
        <div style={wrap}>
          <h2 style={{ ...h2, color: "var(--cream, #FFFBF7)" }}>Not sure you&rsquo;re a {guide.seasonName}?</h2>
          <p style={{ ...body, color: "rgba(255,251,247,0.75)", marginBottom: "28px" }}>
            The free Shade DNA quiz takes a few minutes and gives you your season, palette and basics.
          </p>
          <Link
            href={`/quiz?source=guide_${guide.slug}_footer`}
            onClick={() => trackEvent("quiz_cta_click", { source: "season_guide", guide: guide.slug })}
            style={{
              display: "inline-flex",
              gap: "12px",
              padding: "16px 28px",
              background: "var(--cream, #FFFBF7)",
              color: INK,
              fontFamily: SANS,
              fontSize: "0.95rem",
              fontWeight: 500,
              textDecoration: "none",
              border: `1px solid ${GOLD}`,
              borderRadius: "2px",
            }}
          >
            Take the free quiz <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
