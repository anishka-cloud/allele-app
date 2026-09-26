import Link from "next/link";
import { FitSilhouettePlayground } from "@/app/fit/FitVisuals";

export const metadata = {
  title: "Fit DNA: Denim Edition — Allele",
  description:
    "Nine questions about proportion, comfort, and real denim fit problems. Get a useful starting point for rise, leg, length, and fabric.",
  alternates: { canonical: "https://www.allele.app/fit" },
  openGraph: {
    title: "Fit DNA: Denim Edition — Allele",
    description: "The jeans are not the problem. The cut might be.",
    url: "https://www.allele.app/fit",
    siteName: "Allele",
    type: "website",
  },
};

const measures = [
  ["Rise", "Where the waistband meets you comfortably."],
  ["Leg", "The line you like and the room you actually need."],
  ["Length", "The inseam strategy that works with your shoes."],
  ["Denim feel", "Structure, movement, and the amount of give."],
];

export default function FitLanding() {
  return (
    <main className="fit-landing">
      <nav className="fit-nav" aria-label="Fit DNA navigation">
        <Link href="/" className="fit-wordmark" aria-label="Allele home">
          all<em>e</em>le
        </Link>
        <div className="fit-nav-center">Fit DNA · Denim Edition</div>
        <Link href="/quiz" className="fit-nav-link">Shade DNA</Link>
      </nav>

      <section className="fit-hero">
        <div className="fit-hero-copy">
          <p className="fit-volume">Allele · Fit DNA</p>
          <div className="fit-title-lockup">
            <h1>Fit DNA</h1>
            <p>Denim Edition</p>
          </div>
          <h2>Your next great pair starts here.</h2>
          <p className="fit-hero-support">
            Explore the shapes, find what feels right, and meet real jeans worth trying. Nine quick choices, built around how clothes actually fit you.
          </p>
          <div className="fit-hero-actions">
            <Link href="/fit/quiz" className="fit-primary-link">Find my denim fit <span aria-hidden="true">→</span></Link>
            <span>~2 min · free · no sign-up</span>
          </div>
        </div>

        <FitSilhouettePlayground />
      </section>

      <section className="fit-measures" aria-labelledby="fit-measures-title">
        <div className="fit-measures-intro">
          <p>What this measures</p>
          <h2 id="fit-measures-title">Start with the way jeans actually behave.</h2>
          <p>
            Fit DNA does not name your body shape or tell you what you are allowed to wear. It translates repeat fit problems and real preferences into a better place to begin.
          </p>
        </div>
        <div className="fit-measure-list">
          {measures.map(([name, description], index) => (
            <article key={name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{name}</h3>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="fit-principle">
        <p>Useful guidance, not a rulebook.</p>
        <blockquote>“Here’s the best starting point based on how clothes actually fit you.”</blockquote>
        <Link href="/fit/quiz" className="fit-text-link">Find my starting point <span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
}
