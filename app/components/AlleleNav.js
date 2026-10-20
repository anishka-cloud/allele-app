import Link from "next/link";
import "./allele-nav.css";

export default function AlleleNav({ current, onShadeStart }) {
  return <nav className="allele-nav" aria-label="Allele navigation">
    <div className="allele-nav-inner">
      <Link className="allele-wordmark" href="/" aria-label="Allele home">all<em>e</em>le</Link>
      <div className="allele-nav-links">
        <Link href="/quiz?source=allele_nav" onClick={onShadeStart} aria-current={current === "shade" ? "page" : undefined}>Shade DNA</Link>
        <Link href="/fit" aria-current={current === "fit" ? "page" : undefined}>Fit DNA</Link>
        <Link className="allele-nav-saved" href="/my-allele">My Allele</Link>
      </div>
      <Link className="allele-nav-action" href="/#portfolio">Find your DNA <span aria-hidden="true">→</span></Link>
    </div>
  </nav>;
}
