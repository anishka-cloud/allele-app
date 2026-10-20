import Link from "next/link";

export default function DnaPortfolio({ onShadeStart }) {
  return <section className="l-portfolio" id="portfolio" aria-labelledby="dna-portfolio-title">
    <div className="l-section-head">
      <div className="l-section-head-num">§ I</div>
      <h2 className="l-section-head-title" id="dna-portfolio-title">Two ways to find <em>yours.</em></h2>
      <div className="l-section-head-meta">Start wherever you’re curious</div>
    </div>
    <div className="l-portfolio-grid">
      <Link href="/quiz?source=portfolio_strip" className="l-dna-entry" onClick={onShadeStart}>
        <span className="l-dna-volume">Vol. I · Color & makeup</span>
        <div className="l-dna-specimens" aria-hidden="true">
          {["#B5500B", "#D2A477", "#B88E8D", "#8DA9C4", "#4B3859", "#556B2F"].map(color => <span key={color} style={{ background: color }} />)}
        </div>
        <h3>Shade DNA</h3>
        <p>Explore your color season, discover a palette, and find makeup shades to try. A starting point for your own experiments.</p>
        <span className="l-dna-facts">12 questions · Your palette + makeup edit</span>
        <span className="l-dna-action">Find my colors <span aria-hidden="true">→</span></span>
      </Link>
      <Link href="/fit" className="l-dna-entry">
        <span className="l-dna-volume">Vol. II · The denim edition</span>
        <div className="l-dna-specimens l-dna-denim" aria-hidden="true">
          {["#CAD7DF", "#9CAFBE", "#69839B", "#415E79", "#253F59", "#192C40"].map(color => <span key={color} style={{ background: color }} />)}
        </div>
        <h3>Fit DNA</h3>
        <p>Make sense of rise, leg shape, length and denim feel. Turn the way jeans actually fit you into a shortlist worth considering.</p>
        <span className="l-dna-facts">9 questions · Your fit guide + jeans to try</span>
        <span className="l-dna-action">Find my denim fit <span aria-hidden="true">→</span></span>
      </Link>
    </div>
    <p className="l-portfolio-note">Both free. No sign-up to see your result. Suggestions to explore—not rules to live by.</p>
  </section>;
}
