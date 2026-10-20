"use client";

import Link from "next/link";
import AlleleNav from "../components/AlleleNav";
import { BRIDAL_WHITES } from "@/lib/bridalWhites";
import "./bridal.css";

const QUIZ_HREF = "/quiz?source=bridal_landing&intent=bridal";
const ORDER = ["Winter", "Summer", "Spring", "Autumn"];

export default function BridalLanding() {
  return (
    <main className="br-page">
      <AlleleNav current="shade" />
      <section className="br-hero">
        <p className="br-kicker">Shade DNA · Bridal edition</p>
        <h1 className="br-title">Find your <em>bridal white.</em></h1>
        <p className="br-lede">
          Ivory, champagne, soft white or crisp white? The right white depends on your coloring, not the dress.
          Twelve questions about how color behaves on your skin, and you&rsquo;ll know which white to try first.
        </p>
        <Link className="br-cta" href={QUIZ_HREF}>Find my white <span aria-hidden="true">→</span></Link>
        <p className="br-meta">12 questions · free · no sign-up to see your result</p>
      </section>

      <section className="br-whites" aria-label="The four bridal whites">
        {ORDER.map(family => {
          const w = BRIDAL_WHITES[family];
          return (
            <div className="br-white" key={family}>
              <div className="br-chip" style={{ background: w.chips[1] }} aria-hidden="true" />
              <p className="br-white-name">{w.name}</p>
              <p className="br-white-family">{family} seasons</p>
            </div>
          );
        })}
      </section>

      <section className="br-how">
        <div><span className="br-num">01</span><p>Answer twelve quick questions about your skin, hair, eyes and the colors that flatter you.</p></div>
        <div><span className="br-num">02</span><p>See your bridal white first: what to ask for, and which metals to pair it with.</p></div>
        <div><span className="br-num">03</span><p>Keep your full season for the bridal party, the rest of the day and everything after.</p></div>
      </section>

      <p className="br-fine">
        A guided starting point, not a fitting. Always hold fabric swatches at your jaw in daylight before you decide.
      </p>
    </main>
  );
}
