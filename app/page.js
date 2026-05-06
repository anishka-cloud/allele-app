"use client";

import Link from "next/link";


const steps = [
  {
    number: "01",
    title: "Take the Quiz",
    description: "Answer 12 quick questions about your natural coloring",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 12C13 10.3431 14.3431 9 16 9C17.6569 9 19 10.3431 19 12C19 13.6569 17.6569 15 16 15V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="21" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Get Your Season",
    description: "Our algorithm maps your features to one of 12 color seasons",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4V8M16 24V28M4 16H8M24 16H28M7.51 7.51L10.34 10.34M21.66 21.66L24.49 24.49M7.51 24.49L10.34 21.66M21.66 10.34L24.49 7.51" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Shop Your Shades",
    description: "Get personalized makeup recommendations that actually work",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 10L10 26H22L24 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 10V8C12 5.79086 13.7909 4 16 4C18.2091 4 20 5.79086 20 8V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

// "Before" — dusty, muddy, undertone-fighting neutrals that most beauty brands push as "universal"
const WRONG_SHADES = [
  { hex: "#9B8579", name: "Muddy Taupe" },
  { hex: "#B8A296", name: "Ashy Beige" },
  { hex: "#8A7565", name: "Dull Brown" },
  { hex: "#7D6E5C", name: "Muted Olive" },
];

// "After" — a real Clear Spring palette: saturated, clear, flattering
const RIGHT_SHADES = [
  { hex: "#F47556", name: "Bright Coral" },
  { hex: "#E0332A", name: "Warm Poppy" },
  { hex: "#00B8C4", name: "Hot Turquoise" },
  { hex: "#F4C03A", name: "Golden Yellow" },
];

function SwatchGrid({ shades, label, muted = false }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "14px",
        }}
      >
        {shades.map((s, i) => (
          <div
            key={i}
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: s.hex,
              boxShadow: muted
                ? `0 2px 10px rgba(0,0,0,0.08)`
                : `0 4px 18px ${s.hex}50, inset 0 1px 2px rgba(255,255,255,0.2)`,
              border: "1px solid rgba(0,0,0,0.04)",
              opacity: muted ? 0.72 : 1,
              transition: "transform 0.6s ease",
            }}
            className="hover:scale-110"
          />
        ))}
      </div>
      <span
        style={{
          fontFamily: "var(--font-inter, 'Inter')",
          fontSize: "0.68rem",
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: muted ? "var(--text-muted)" : "var(--accent-gold)",
          fontWeight: 500,
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function Home() {


  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
        {/* Soft gradient orbs */}
        <div
          className="absolute top-[-10%] right-[-15%] w-[500px] h-[500px] rounded-full opacity-20 animate-morph"
          style={{ background: "radial-gradient(circle, #E8C4C4 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-5%] left-[-10%] w-[400px] h-[400px] rounded-full opacity-15 animate-morph"
          style={{
            background: "radial-gradient(circle, #C4A265 0%, transparent 70%)",
            animationDelay: "4s",
          }}
        />

        {/* Masthead */}
        <div className="text-center mb-4 animate-fade-in-down">
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--accent-gold)", fontFamily: "var(--font-inter, 'Inter')" }}
          >
            A Shade DNA Specimen
          </span>
        </div>

        <div className="editorial-divider animate-fade-in stagger-1" />

        {/* Headline — pain-point-first, pattern-interrupt */}
        <h1
          className="text-center max-w-3xl mb-5 animate-fade-in-up stagger-2"
          style={{
            fontFamily: "var(--font-playfair, 'Playfair Display')",
            fontSize: "clamp(2.1rem, 6vw, 3.75rem)",
            fontWeight: 500,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
          }}
        >
          Your makeup isn&apos;t working.
          <br />
          It&apos;s the
          <span
            style={{
              fontStyle: "italic",
              color: "var(--accent-gold)",
            }}
          >
            {" "}
            wrong season
            <span style={{ fontStyle: "normal", color: "var(--text-primary)" }}>.</span>
          </span>
        </h1>

        {/* Subhead */}
        <p
          className="text-center max-w-xl mb-12 animate-fade-in-up stagger-3"
          style={{
            fontFamily: "var(--font-inter, 'Inter')",
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
            lineHeight: 1.7,
            color: "var(--text-secondary)",
            fontWeight: 300,
          }}
        >
          Find the shades that actually make you glow.
          <br />
          Based on color science. Two minutes. No signup.
        </p>

        {/* Before / After swatch visual */}
        <div
          className="flex items-center justify-center gap-6 md:gap-10 mb-12 animate-fade-in-up stagger-4"
          style={{ flexWrap: "wrap" }}
        >
          <SwatchGrid shades={WRONG_SHADES} label="What you have" muted />

          {/* Arrow */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "0 4px",
            }}
          >
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
              <circle cx="22" cy="22" r="21" stroke="#C4A265" strokeOpacity="0.35" strokeWidth="1" fill="none" />
              <path
                d="M14 22H30M30 22L24 16M30 22L24 28"
                stroke="#C4A265"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-playfair, 'Playfair Display')",
                fontSize: "0.78rem",
                fontStyle: "italic",
                color: "var(--text-muted)",
                letterSpacing: "0.02em",
                whiteSpace: "nowrap",
              }}
            >
              your season
            </span>
          </div>

          <SwatchGrid shades={RIGHT_SHADES} label="What works for you" />
        </div>

        {/* CTA */}
        <Link href="/quiz?source=homepage-hero" className="animate-fade-in-up stagger-4">
          <button
            id="cta-take-quiz"
            className="btn-primary"
            style={{ borderRadius: "100px", padding: "18px 56px", fontSize: "14px" }}
          >
            Find My Season
            <svg
              className="ml-3"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Link>

        {/* Social proof */}
        <p
          className="mt-6 animate-fade-in-up stagger-5"
          style={{
            fontFamily: "var(--font-inter, 'Inter')",
            fontSize: "0.82rem",
            color: "var(--text-muted)",
            fontWeight: 400,
            letterSpacing: "0.02em",
          }}
        >
          Free &middot; 12 color seasons &middot; 2 minutes
        </p>
      </section>

      {/* How it Works */}
      <section
        className="px-6 py-20 md:py-28"
        style={{ background: "var(--bg-secondary)" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span
              className="text-xs tracking-[0.3em] uppercase mb-4 block"
              style={{ color: "var(--accent-gold)", fontFamily: "var(--font-inter, 'Inter')" }}
            >
              How It Works
            </span>
            <h2
              style={{
                fontFamily: "var(--font-playfair, 'Playfair Display')",
                fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                fontWeight: 500,
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
              }}
            >
              Three steps to your{" "}
              <span style={{ fontStyle: "italic" }}>perfect palette</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className="text-center group"
                style={{
                  animation: "fadeInUp 0.7s ease-out forwards",
                  animationDelay: `${0.2 + i * 0.15}s`,
                  opacity: 0,
                }}
              >
                <div
                  className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "white",
                    color: "var(--text-primary)",
                    boxShadow: "var(--shadow-soft)",
                  }}
                >
                  {step.icon}
                </div>
                <span
                  className="block mb-2"
                  style={{
                    fontFamily: "var(--font-inter, 'Inter')",
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    color: "var(--accent-gold)",
                    fontWeight: 500,
                  }}
                >
                  STEP {step.number}
                </span>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: "var(--font-playfair, 'Playfair Display')",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-inter, 'Inter')",
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    fontWeight: 300,
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-20 md:py-24 text-center">
        <h2
          className="mb-4"
          style={{
            fontFamily: "var(--font-playfair, 'Playfair Display')",
            fontSize: "clamp(1.4rem, 3.5vw, 2rem)",
            fontWeight: 500,
            color: "var(--text-primary)",
          }}
        >
          Ready to find <span style={{ fontStyle: "italic" }}>your</span> colors?
        </h2>
        <p
          className="mb-8"
          style={{
            fontFamily: "var(--font-inter, 'Inter')",
            fontSize: "0.95rem",
            color: "var(--text-muted)",
            fontWeight: 300,
          }}
        >
          It only takes 2 minutes. No email required.
        </p>
        <Link href="/quiz?source=homepage-footer">
          <button
            id="cta-take-quiz-bottom"
            className="btn-primary"
            style={{ borderRadius: "100px", padding: "16px 48px", fontSize: "14px" }}
          >
            Start the Quiz
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer
        className="px-6 py-8 text-center"
        style={{
          borderTop: "1px solid var(--border-light)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-inter, 'Inter')",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            letterSpacing: "0.05em",
          }}
        >
          © {new Date().getFullYear()} Allele · Shade DNA ·{" "}
          <Link href="/disclosure" style={{ color: "var(--text-muted)", textDecoration: "underline" }}>Affiliate Disclosure</Link>
          {" · "}
          <Link href="/privacy" style={{ color: "var(--text-muted)", textDecoration: "underline" }}>Privacy</Link>
        </p>
      </footer>
    </main>
  );
}
