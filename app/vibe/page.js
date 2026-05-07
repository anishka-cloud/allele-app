import Link from "next/link";

export const metadata = {
  title: "Vibe DNA by Allele — Find Your Aesthetic Archetype",
  description: "Discover your aesthetic archetype in 90 seconds. Are you Clean Girl, Dark Academia, Cottagecore, or something else entirely? Take the quiz and get personalized style recommendations.",
};

const archetypePreviews = [
  { name: "Clean Girl", emoji: "💫", color: "#C4A265" },
  { name: "Coastal Grandmother", emoji: "🌊", color: "#7B8E6B" },
  { name: "Quiet Luxury", emoji: "💎", color: "#8B7355" },
  { name: "Dark Academia", emoji: "📚", color: "#6B4E3D" },
  { name: "Cottagecore", emoji: "🌸", color: "#9B7B5E" },
  { name: "Coquette", emoji: "🎀", color: "#D4869C" },
  { name: "Y2K Revival", emoji: "🦋", color: "#C96BBE" },
  { name: "Balletcore", emoji: "🩰", color: "#C9929B" },
  { name: "Scandi Minimalist", emoji: "🖤", color: "#7A7A7A" },
  { name: "Indie Sleaze", emoji: "🎸", color: "#8B4A4A" },
  { name: "Tomboy Luxe", emoji: "🤵‍♀️", color: "#5A6B5A" },
];

export default function VibeLanding() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="relative flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
        <div
          className="absolute top-[-10%] left-[-15%] w-[500px] h-[500px] rounded-full opacity-15 animate-morph"
          style={{ background: "radial-gradient(circle, #D4869C 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[-5%] right-[-10%] w-[400px] h-[400px] rounded-full opacity-15 animate-morph"
          style={{ background: "radial-gradient(circle, #C96BBE 0%, transparent 70%)", animationDelay: "4s" }}
        />

        <div className="text-center mb-4 animate-fade-in-down">
          <span
            className="text-xs tracking-[0.3em] uppercase"
            style={{ color: "var(--accent-gold)", fontFamily: "var(--font-inter, 'Inter')" }}
          >
            Vibe DNA by Allele
          </span>
        </div>

        <div className="editorial-divider animate-fade-in stagger-1" />

        <h1
          className="text-center max-w-3xl mb-6 animate-fade-in-up stagger-2"
          style={{
            fontFamily: "var(--font-display, 'Lora'), 'GT Sectra', Georgia, serif",
            fontSize: "clamp(2rem, 6vw, 3.75rem)",
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
          }}
        >
          What&rsquo;s Your
          <br />
          Aesthetic
          <span style={{ fontStyle: "italic", color: "#D4869C" }}> Archetype</span>?
        </h1>

        <p
          className="text-center max-w-lg mb-10 animate-fade-in-up stagger-3"
          style={{
            fontFamily: "var(--font-inter, 'Inter')",
            fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
            lineHeight: 1.7,
            color: "var(--text-secondary)",
            fontWeight: 300,
          }}
        >
          10 questions. 11 archetypes. 110+ possible results.
          <br />
          Discover the aesthetic that&rsquo;s been yours all along.
        </p>

        <Link href="/vibe/quiz" className="animate-fade-in-up stagger-4">
          <button
            id="cta-vibe-quiz"
            className="btn-primary"
            style={{ borderRadius: "100px", padding: "18px 56px", fontSize: "14px" }}
          >
            Find My Vibe
            <svg className="ml-3" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </Link>

        <p
          className="mt-8 animate-fade-in-up stagger-5"
          style={{
            fontFamily: "var(--font-inter, 'Inter')",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            fontWeight: 400,
            letterSpacing: "0.02em",
          }}
        >
          Free &middot; No signup required &middot; Takes 90 seconds
        </p>
      </section>

      {/* Archetype Preview Grid */}
      <section className="px-6 py-20 md:py-28" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span
              className="text-xs tracking-[0.3em] uppercase mb-4 block"
              style={{ color: "var(--accent-gold)", fontFamily: "var(--font-inter, 'Inter')" }}
            >
              11 Archetypes
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display, 'Lora'), 'GT Sectra', Georgia, serif",
                fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                fontWeight: 500,
                color: "var(--text-primary)",
                letterSpacing: "-0.01em",
              }}
            >
              Which one is <span style={{ fontStyle: "italic" }}>yours</span>?
            </h2>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-6">
            {archetypePreviews.map((a, i) => (
              <div
                key={a.name}
                className="text-center group cursor-pointer"
                style={{
                  animation: "fadeInUp 0.7s ease-out forwards",
                  animationDelay: `${0.1 + i * 0.08}s`,
                  opacity: 0,
                }}
              >
                <div
                  className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${a.color}15`,
                    boxShadow: "var(--shadow-soft)",
                    fontSize: "1.5rem",
                  }}
                >
                  {a.emoji}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-inter, 'Inter')",
                    fontSize: "clamp(0.7rem, 1.5vw, 0.85rem)",
                    color: "var(--text-secondary)",
                    fontWeight: 500,
                  }}
                >
                  {a.name}
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
            fontFamily: "var(--font-display, 'Lora'), 'GT Sectra', Georgia, serif",
            fontSize: "clamp(1.4rem, 3.5vw, 2rem)",
            fontWeight: 500,
            color: "var(--text-primary)",
          }}
        >
          Ready to find <span style={{ fontStyle: "italic" }}>your</span> archetype?
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
          10 questions. 90 seconds. No email required.
        </p>
        <Link href="/vibe/quiz">
          <button
            id="cta-vibe-quiz-bottom"
            className="btn-primary"
            style={{ borderRadius: "100px", padding: "16px 48px", fontSize: "14px" }}
          >
            Find My Vibe
          </button>
        </Link>
      </section>

      {/* Cross-sell */}
      <section className="px-6 py-12 text-center" style={{ background: "var(--bg-secondary)" }}>
        <p
          style={{
            fontFamily: "var(--font-inter, 'Inter')",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            fontWeight: 400,
          }}
        >
          Also from Allele:{" "}
          <Link href="/quiz" style={{ color: "var(--accent-gold)", textDecoration: "underline", fontWeight: 500 }}>
            Take the Shade DNA Quiz →
          </Link>
        </p>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 text-center" style={{ borderTop: "1px solid var(--border-light)" }}>
        <p
          style={{
            fontFamily: "var(--font-inter, 'Inter')",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            letterSpacing: "0.05em",
          }}
        >
          &copy; {new Date().getFullYear()} Allele &middot; Vibe DNA
        </p>
      </footer>
    </main>
  );
}
