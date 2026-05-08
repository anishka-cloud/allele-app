"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "./landing.css";

const SEASONS = [
  { family: "Spring", items: [
    { id: "01", name: "Clear Spring",  tagline: "Bright · Warm · Clear",   whisper: "Coral, peach, and sun-warmed yellow.",                                  attrs: ["Warm","Medium","Bright"],         twins: ["Emma Stone","Emmy Rossum","Kerry Washington"],   palette: ["#F26A4B","#F4A460","#F5D547","#3EB489","#2F8FB0","#1F5FA8","#E83F6F","#6D2E5B"] },
    { id: "02", name: "True Spring",   tagline: "Warm · Bright · Golden",  whisper: "Honey, apricot, and fresh leaf. Gold is your neutral.",                attrs: ["Warm","Medium","Bright"],         twins: ["Amy Adams","Isla Fisher","Nicole Scherzinger"],  palette: ["#F4A460","#FFB74D","#FFD54F","#8BC34A","#26A69A","#FF7043","#E91E63","#A0522D"] },
    { id: "03", name: "Light Spring",  tagline: "Light · Warm · Fresh",    whisper: "Blush, buttercream, warm ivory.",                                       attrs: ["Warm","Light","Soft-Bright"],     twins: ["Taylor Swift","Margot Robbie","Saoirse Ronan"],  palette: ["#FDE4C4","#F5D5AE","#FFD76B","#C6E2B5","#A8D8EA","#D4A5C7","#FFA6A6","#E8B28C"] },
  ]},
  { family: "Summer", items: [
    { id: "04", name: "Light Summer",  tagline: "Light · Cool · Soft",     whisper: "Dusty rose, periwinkle, pale cool morning.",                            attrs: ["Cool","Light","Soft-Muted"],      twins: ["Elle Fanning","Cate Blanchett","Gemma Chan"],    palette: ["#E8D5E4","#C9B8D8","#B8D4E8","#A9C4D4","#F2D4D4","#D4C4B8","#B8B8B8","#8FA9B8"] },
    { id: "05", name: "True Summer",   tagline: "Cool · Soft · Rosy",      whisper: "Mauve, raspberry, a quiet ocean at dusk.",                              attrs: ["Cool","Medium","Muted"],          twins: ["Emily Blunt","Sarah Jessica Parker","Zoe Saldana"], palette: ["#8DA9C4","#A89BC4","#C4A9B8","#E8B5A8","#7A8FA8","#5D7A8C","#B89BA8","#6B8CAD"] },
    { id: "06", name: "Soft Summer",   tagline: "Soft · Cool · Grayed",    whisper: "Grayed plum, fog, taupe rose. Everything whispers.",                    attrs: ["Cool-N","Medium","Very Muted"],   twins: ["Cara Delevingne","Jennifer Aniston","Kate Middleton"], palette: ["#B8A9C9","#C4B5B8","#A89B8C","#8C9B8A","#7A6B7A","#9B8B7A","#6B5D6B","#A89B9B"] },
  ]},
  { family: "Autumn", items: [
    { id: "07", name: "Soft Autumn",   tagline: "Soft · Warm · Earthy",    whisper: "Dried herbs, terracotta, honey on linen.",                              attrs: ["Warm","Medium","Muted"],          twins: ["Gigi Hadid","Jennifer Lopez","Jessica Biel"],    palette: ["#C67C52","#B08968","#9B7F5C","#7A8C5C","#A89268","#8B6F47","#6B5D3F","#C4A574"] },
    { id: "08", name: "True Autumn",   tagline: "Warm · Rich · Earthy",    whisper: "Burnt orange, rust, forest, deep gold. The cathedral in October.",     attrs: ["Warm","Medium-Deep","Muted"],     twins: ["Julia Roberts","Beyoncé","Eva Mendes"],          palette: ["#B5500B","#C4611E","#8B4513","#556B2F","#6B8E23","#B8860B","#8B3A1A","#4A5D23"] },
    { id: "09", name: "Dark Autumn",   tagline: "Deep · Warm · Rich",      whisper: "Chocolate, garnet, forest floor after rain.",                           attrs: ["Warm","Deep","Muted"],            twins: ["Keira Knightley","Penélope Cruz","Mindy Kaling"], palette: ["#8B3A1A","#5C2E1F","#4A1F0F","#2D4A2D","#6B1F1F","#8B4513","#3A2817","#722F37"] },
  ]},
  { family: "Winter", items: [
    { id: "10", name: "Dark Winter",   tagline: "Deep · Cool · Dramatic",  whisper: "Midnight, plum, charcoal, deep wine.",                                  attrs: ["Cool","Deep","Muted"],            twins: ["Lily Collins","Lucy Liu","Viola Davis"],         palette: ["#1F1F3D","#4B0082","#3D1F3D","#1F3D3D","#722F37","#2D2D2D","#3D1F1F","#4D4D5C"] },
    { id: "11", name: "True Winter",   tagline: "Cool · Clear · Icy",      whisper: "Ice, emerald, true red. High contrast, high drama.",                    attrs: ["Cool","Medium-Deep","Bright"],    twins: ["Anne Hathaway","Fan Bingbing","Lupita Nyong'o"], palette: ["#1F3D7A","#003366","#7A1F3D","#C41E3A","#E8E8E8","#1F7A3D","#4B0082","#2D2D2D"] },
    { id: "12", name: "Bright Winter", tagline: "Bright · Cool · Vivid",   whisper: "Fuchsia, electric blue, icy white. Nothing pastel.",                    attrs: ["Cool","Medium","Bright"],         twins: ["Megan Fox","Dita Von Teese","Naomi Campbell"],   palette: ["#E91E63","#1E88E5","#00E676","#FFEB3B","#9C27B0","#F44336","#00BCD4","#212121"] },
  ]},
];

const ALL_SEASONS = SEASONS.flatMap((f) => f.items);
const HERO_INDICES = [7, 4, 0, 11]; // True Autumn, True Summer, Clear Spring, Bright Winter

export default function Home() {
  const [heroIdx, setHeroIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setHeroIdx((i) => (i + 1) % HERO_INDICES.length);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  const hero = ALL_SEASONS[HERO_INDICES[heroIdx]];

  return (
    <main className="landing">
      {/* ============ Nav ============ */}
      <nav className="l-nav">
        <div className="l-nav-inner">
          <div className="l-nav-wordmark">all<em>e</em>le</div>
          <div className="l-nav-links">
            <a href="#twelve">The Twelve</a>
            <a href="#method">Method</a>
            <a href="#axes">The Axes</a>
            <a href="#showcase">Results</a>
            <a href="#science">Philosophy</a>
          </div>
          <Link className="l-nav-cta" href="/quiz">Begin the analysis →</Link>
        </div>
      </nav>

      {/* ============ Hero ============ */}
      <section className="l-hero">
        <div className="l-hero-eyebrow">
          <span>Allele · Vol. I · Shade DNA</span>
          <span className="hairline"></span>
          <span>Est. 2026</span>
          <div className="l-swatch-row">
            <span className="swatch" style={{ background: "#B5500B" }}></span>
            <span className="swatch" style={{ background: "#6B8CAD" }}></span>
            <span className="swatch" style={{ background: "#F26A4B" }}></span>
            <span className="swatch" style={{ background: "#1F1F3D" }}></span>
          </div>
        </div>

        <div className="l-hero-grid">
          <div>
            <h1 className="l-hero-headline">
              Find the<br />
              <em>one</em> season<br />
              you were<br />
              drawn in.
            </h1>
            <p className="l-hero-sub">
              Twelve questions. One archetype. A palette matched to your skin, your eyes, and the <em>light you live in</em>. Free to take. Free to retake. Yours forever.
            </p>
            <div className="l-hero-cta-row">
              <Link className="l-cta-primary" href="/quiz">
                <span>Begin the analysis</span>
                <span className="arrow">→</span>
              </Link>
              <span className="l-cta-meta">2:30 min · No app · No subscription</span>
            </div>
            <div className="l-hero-meta">
              <div className="l-hero-meta-item"><strong>12</strong><span>Archetypes</span></div>
              <div className="l-hero-meta-item"><strong>96</strong><span>Curated Shades</span></div>
              <div className="l-hero-meta-item"><strong>3</strong><span>Price Tiers</span></div>
              <div className="l-hero-meta-item"><strong>0</strong><span>Guesswork</span></div>
            </div>
          </div>

          <div className="l-hero-card">
            <div className="l-hero-card-tag">Specimen · {hero.name}</div>
            <div className="l-hero-card-name">{hero.name}</div>
            <div className="l-hero-card-attrs">
              {hero.attrs.map((a) => <span key={a}>{a}</span>)}
            </div>
            <div className="l-hero-card-palette">
              {hero.palette.map((c, i) => (
                <div key={i} className="chip" style={{ background: c }}></div>
              ))}
            </div>
            <div className="l-hero-card-whisper">&ldquo;{hero.whisper}&rdquo;</div>
            <div className="l-hero-card-twins">
              <span className="l-hero-card-twins-label">Style twins</span>
              <span className="l-hero-card-twins-names">
                {hero.twins.map((t) => <em key={t}>{t}</em>)}
              </span>
            </div>
            <div className="l-hero-card-rotator">
              {HERO_INDICES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`l-hero-card-dot${i === heroIdx ? " active" : ""}`}
                  aria-label={`Show specimen ${i + 1}`}
                  onClick={() => setHeroIdx(i)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ Twelve ============ */}
      <section className="l-twelve" id="twelve">
        <div className="l-section-head">
          <div className="l-section-head-num">§ 01</div>
          <h2 className="l-section-head-title">The twelve.</h2>
          <div className="l-section-head-meta">Four families · Three variants each</div>
        </div>
        {SEASONS.map((fam) => (
          <div key={fam.family} className="l-family-row">
            <div>
              <div className="l-family-label">{fam.family}</div>
              <div className="l-family-label-sub">Family · Three variants</div>
            </div>
            <div className="l-family-specimens">
              {fam.items.map((s) => (
                <div key={s.id} className="l-specimen-card" data-id={s.id}>
                  <div className="l-specimen-card-head">
                    <div className="l-specimen-card-name">{s.name}</div>
                    <div className="l-specimen-card-num">{s.id} / 12</div>
                  </div>
                  <div className="l-specimen-chips">
                    {s.palette.map((c, i) => (
                      <div key={i} className="chip" style={{ background: c }}></div>
                    ))}
                  </div>
                  <div className="l-specimen-card-tagline">{s.tagline}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ============ Method ============ */}
      <section className="l-method" id="method">
        <div className="l-method-inner">
          <div className="l-section-head" style={{ borderColor: "var(--ink)" }}>
            <div className="l-section-head-num">§ 02</div>
            <h2 className="l-section-head-title">The method.</h2>
            <div className="l-section-head-meta">Answer · Analyze · Arrive</div>
          </div>
          <div className="l-method-grid">
            <div className="l-method-step">
              <div className="l-method-step-num">01</div>
              <div className="l-method-step-label">Twelve questions</div>
              <h3 className="l-method-step-title">You <em>answer.</em></h3>
              <p className="l-method-step-body">Undertone, depth, contrast — drawn out in twelve precise questions. No guesswork, no jargon. Sixty seconds.</p>
            </div>
            <div className="l-method-step">
              <div className="l-method-step-num">02</div>
              <div className="l-method-step-label">One archetype</div>
              <h3 className="l-method-step-title">We <em>find you.</em></h3>
              <p className="l-method-step-body">One of twelve seasons. Your palette emerges like a constellation — eight colors that will always work, and a whisper of who you are in color.</p>
            </div>
            <div className="l-method-step">
              <div className="l-method-step-num">03</div>
              <div className="l-method-step-label">Ninety-six shades</div>
              <h3 className="l-method-step-title">You <em>shop what fits.</em></h3>
              <p className="l-method-step-body">Foundation, blush, lip, eye — four categories, three price tiers. Every shade matched to your coloring. Links out; no storefront to defend.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Axes ============ */}
      <section className="l-axes" id="axes">
        <div className="l-axes-inner">
          <div className="l-section-head" style={{ borderColor: "var(--ink)" }}>
            <div className="l-section-head-num">§ 03</div>
            <h2 className="l-section-head-title">Three axes. <em>One you.</em></h2>
            <div className="l-section-head-meta">Why twelve seasons — not four</div>
          </div>

          <div className="l-axes-intro">
            <p>The twelve-season method isn&rsquo;t aesthetic. It&rsquo;s a coordinate system. Three measurable properties of human coloring — <em>undertone</em>, <em>depth</em>, and <em>chroma</em> — and where you land on each one tells us which palette belongs to you.</p>
            <p className="l-axes-intro-callout">A trained colorist with a stack of physical drapes will find the same answer. We just don&rsquo;t charge $500 to do it.</p>
          </div>

          <div className="l-axes-grid">
            <div className="l-axis">
              <div className="l-axis-num">§ I</div>
              <div className="l-axis-label">Axis One</div>
              <h3 className="l-axis-title">Undertone.</h3>
              <p className="l-axis-def">The temperature beneath your skin. Warm leans yellow-gold-peach. Cool leans pink-rose-blue. Most people are not 50/50 — they have a real bias, even when they swear they don&rsquo;t.</p>
              <div className="l-axis-vis">
                <div className="l-axis-bar">
                  <div className="l-axis-bar-fill" style={{ background: "linear-gradient(90deg, #F2D5A8 0%, #F4EBD8 50%, #E8D5DC 100%)" }}></div>
                  <div className="l-axis-bar-marker" style={{ left: "22%" }}></div>
                </div>
                <div className="l-axis-bar-labels">
                  <span>Warm</span><span>Neutral</span><span>Cool</span>
                </div>
              </div>
              <div className="l-axis-tells">
                <div className="l-axis-tell"><span className="l-axis-tell-key">Tell —</span> Veins inside the wrist read green (warm) or blue-purple (cool).</div>
                <div className="l-axis-tell"><span className="l-axis-tell-key">Tell —</span> Gold jewelry warms your face; silver flatters; one wins.</div>
              </div>
            </div>

            <div className="l-axis">
              <div className="l-axis-num">§ II</div>
              <div className="l-axis-label">Axis Two</div>
              <h3 className="l-axis-title">Depth.</h3>
              <p className="l-axis-def">The light value of your overall coloring — skin, hair, and eyes averaged together. Light depth blooms next to pastels and washes against black. Dark depth holds its own beside true black and gets erased by pale.</p>
              <div className="l-axis-vis">
                <div className="l-axis-stack">
                  <div className="l-axis-stack-row" style={{ background: "#F4EBD8" }}><span>Light</span></div>
                  <div className="l-axis-stack-row" style={{ background: "#C8A77A" }}><span>Medium</span></div>
                  <div className="l-axis-stack-row" style={{ background: "#6B4A2D" }}><span>Deep</span></div>
                  <div className="l-axis-stack-row" style={{ background: "#2A1A0F" }}><span>Dark</span></div>
                </div>
              </div>
              <div className="l-axis-tells">
                <div className="l-axis-tell"><span className="l-axis-tell-key">Tell —</span> A black turtleneck either frames your face or eats it.</div>
                <div className="l-axis-tell"><span className="l-axis-tell-key">Tell —</span> Your hair, eye, and skin contrast — close together, or stark?</div>
              </div>
            </div>

            <div className="l-axis l-axis-feature">
              <div className="l-axis-num">§ III</div>
              <div className="l-axis-label">Axis Three · The hidden one</div>
              <h3 className="l-axis-title">Chroma.</h3>
              <p className="l-axis-def">The intensity of pigment your face can carry without being overwhelmed. <em>Bright chroma</em> faces hold true reds and emeralds. <em>Muted chroma</em> faces glow in dusty mauves and sages — and look strange in saturated color, no matter how flattering the undertone.</p>
              <div className="l-axis-vis">
                <div className="l-axis-chroma-row">
                  <div className="l-axis-chroma-cell" style={{ background: "#DC143C" }}></div>
                  <div className="l-axis-chroma-cell" style={{ background: "#C2415A" }}></div>
                  <div className="l-axis-chroma-cell" style={{ background: "#A65968" }}></div>
                  <div className="l-axis-chroma-cell" style={{ background: "#8B6770" }}></div>
                </div>
                <div className="l-axis-chroma-row">
                  <div className="l-axis-chroma-cell" style={{ background: "#1F7A3D" }}></div>
                  <div className="l-axis-chroma-cell" style={{ background: "#4A8859" }}></div>
                  <div className="l-axis-chroma-cell" style={{ background: "#6B8E6E" }}></div>
                  <div className="l-axis-chroma-cell" style={{ background: "#7A8C7D" }}></div>
                </div>
                <div className="l-axis-chroma-labels">
                  <span>Bright</span>
                  <span className="l-axis-chroma-arrow">→</span>
                  <span>Muted</span>
                </div>
              </div>
              <div className="l-axis-tells">
                <div className="l-axis-tell"><span className="l-axis-tell-key">Tell —</span> A pure-red lipstick: striking on you, or somehow garish?</div>
                <div className="l-axis-tell"><span className="l-axis-tell-key">Tell —</span> The &ldquo;you look great today&rdquo; colors are usually right at your chroma.</div>
              </div>
              <div className="l-axis-feature-note">Most online tests skip this axis. It&rsquo;s why they get you wrong.</div>
            </div>
          </div>

          <div className="l-axes-foot">
            <div className="l-axes-foot-rule"></div>
            <p className="l-axes-foot-line">Three axes × four positions = <em>twelve seasons</em>. Not four. Not sixteen. The number that fits human coloring without forcing it.</p>
          </div>
        </div>
      </section>

      {/* ============ Showcase ============ */}
      <section className="l-showcase" id="showcase">
        <div className="l-section-head">
          <div className="l-section-head-num">§ 04</div>
          <h2 className="l-section-head-title">What you receive.</h2>
          <div className="l-section-head-meta">A living document · Yours forever</div>
        </div>

        <div className="l-showcase-grid">
          <div className="l-showcase-copy">
            <div className="l-showcase-copy-eyebrow">The Result</div>
            <h2>A book of <em>one.</em></h2>
            <p>Your archetype arrives as a single editorial page — part certificate, part shopping list, part <em>letter to yourself.</em></p>
            <p>Bookmark it. Print it. Open it in the fitting room when the light is bad and the lipsticks all look the same.</p>
            <ul className="l-showcase-bullets">
              <li><strong>01 Palette</strong><span>Your eight signature shades, with names and hexes.</span></li>
              <li><strong>02 Products</strong><span>Twenty-four matched picks across four categories.</span></li>
              <li><strong>03 Tiers</strong><span>Budget, best value, splurge. You decide the spend.</span></li>
              <li><strong>04 Archetype</strong><span>A one-line identity for your coloring, plus what washes you out.</span></li>
              <li><strong>05 Share card</strong><span>An Instagram-ready specimen card for the post.</span></li>
            </ul>
          </div>

          <div className="l-showcase-preview">
            <div className="l-showcase-preview-tag">Specimen Card · Preview</div>
            <div className="l-showcase-preview-no">N° 08 / 12</div>
            <div className="l-showcase-preview-name">True<br /><em>Autumn</em></div>
            <div className="l-showcase-preview-attrs">
              <span>Warm</span><span>Medium-Deep</span><span>Muted</span>
            </div>
            <div className="l-showcase-preview-palette">
              {["#B5500B","#C4611E","#8B4513","#556B2F","#6B8E23","#B8860B","#8B3A1A","#4A5D23"].map((c, i) => (
                <div key={i} className="chip" style={{ background: c }}></div>
              ))}
            </div>
            <div className="l-showcase-preview-quote">
              &ldquo;Caramel, rust, olive, deep gold. Your nude has gold in it. Cool taupes wash you out.&rdquo;
            </div>
          </div>
        </div>
      </section>

      {/* ============ Science / Philosophy ============ */}
      <section className="l-science" id="science">
        <div className="l-science-inner">
          <div>
            <h2>A field guide to <em>yourself</em>.</h2>
            <div className="l-science-body">
              <p>You are reading Shade DNA, Volume I in an open series. This volume maps the physics of your coloring into one of twelve seasons. The next volumes (Vibe, Signature, Carry-On, and the ones still in the lab) use different lenses on the same person.</p>
              <p>Shade DNA began with a question: <em>why do some colors make you, and others un-make you?</em> The answer is not taste or trend. It is coloring: the interference pattern of your skin, eyes, and hair against light. Physics. Yours. This is where we start.</p>
              <p>Twelve families. Three variants each. <em>One of them is yours.</em></p>
            </div>
          </div>

          <div className="l-science-pillars">
            <div className="l-science-pillar">
              <div className="l-science-pillar-num">§ I</div>
              <div className="l-science-pillar-title">Classical.</div>
              <div className="l-science-pillar-body">Rooted in the twelve-season method used by color consultants since the 1980s.</div>
            </div>
            <div className="l-science-pillar">
              <div className="l-science-pillar-num">§ II</div>
              <div className="l-science-pillar-title">Curated.</div>
              <div className="l-science-pillar-body">Ninety-six shades hand-matched to each archetype by our beauty editors.</div>
            </div>
            <div className="l-science-pillar">
              <div className="l-science-pillar-num">§ III</div>
              <div className="l-science-pillar-title">Candid.</div>
              <div className="l-science-pillar-body">No subscriptions. No house brand. Affiliate links disclosed on every card.</div>
            </div>
            <div className="l-science-pillar">
              <div className="l-science-pillar-num">§ IV</div>
              <div className="l-science-pillar-title">Considered.</div>
              <div className="l-science-pillar-body">Your archetype is yours forever. Re-take it; change your mind. The palette stays.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Voices / Process ============ */}
      <section className="l-voices">
        <div className="l-section-head">
          <div className="l-section-head-num">§ 05</div>
          <h2 className="l-section-head-title">Be among the <em>first.</em></h2>
          <div className="l-section-head-meta">Allele opens in waves · Each cohort hand-reviewed</div>
        </div>
        <div className="l-voices-grid">
          <div className="l-voice">
            <div className="l-voice-quote-mark">I</div>
            <p className="l-voice-body">Take the analysis. <em>Twelve questions, one minute.</em> Your archetype is named, your palette is rendered, your wardrobe anchors are pulled.</p>
            <div className="l-voice-attr">
              <div className="l-voice-avatar" style={{ background: "linear-gradient(135deg,#FDE4C4,#D9A47C)" }}></div>
              <div>
                <div className="l-voice-name">The reveal</div>
                <div className="l-voice-season">Free · Yours forever</div>
              </div>
              <div className="l-voice-badge">§ 03</div>
            </div>
          </div>

          <div className="l-voice">
            <div className="l-voice-quote-mark">II</div>
            <p className="l-voice-body">Receive the dossier. <em>A long-form letter</em> — your science, your shade, your edit. Written in plain English. No jargon.</p>
            <div className="l-voice-attr">
              <div className="l-voice-avatar" style={{ background: "linear-gradient(135deg,#8DA9C4,#6B8CAD)" }}></div>
              <div>
                <div className="l-voice-name">The dossier</div>
                <div className="l-voice-season">Email · Within minutes</div>
              </div>
              <div className="l-voice-badge">§ 05</div>
            </div>
          </div>

          <div className="l-voice">
            <div className="l-voice-quote-mark">III</div>
            <p className="l-voice-body">Shop the edit. <em>Every product hand-matched</em> across 8 categories × 3 tiers. Cult, splurge, best-value. Your palette, ready to wear.</p>
            <div className="l-voice-attr">
              <div className="l-voice-avatar" style={{ background: "linear-gradient(135deg,#B5500B,#8B3A1A)" }}></div>
              <div>
                <div className="l-voice-name">The edit</div>
                <div className="l-voice-season">24 picks · Linked &amp; ranked</div>
              </div>
              <div className="l-voice-badge">§ 08</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Final ============ */}
      <section className="l-final">
        <div className="l-final-eyebrow">§ Begin</div>
        <h2>Your <em>shade,</em><br />your <em>science.</em></h2>
        <p>Sixty seconds. One season. <em>Yours forever.</em></p>
        <Link className="l-cta-primary" href="/quiz">
          <span>Begin the analysis</span>
          <span className="arrow">→</span>
        </Link>
        <div className="l-final-meta">Free · No sign-up required · Works on mobile</div>
      </section>

      {/* ============ Footer ============ */}
      <footer className="l-footer">
        <div className="l-footer-inner">
          <div>
            <div className="l-footer-wordmark">allele</div>
            <p className="l-footer-tagline">A chromatic cartography for the ninety-six shades you were meant to wear.</p>
          </div>
          <div className="l-footer-col">
            <div className="l-footer-col-title">Product</div>
            <Link href="/quiz">The quiz</Link>
            <a href="#twelve">The twelve</a>
            <a href="#showcase">Sample result</a>
            <Link href="/vibe">Vibe DNA (soon)</Link>
          </div>
          <div className="l-footer-col">
            <div className="l-footer-col-title">Company</div>
            <a href="#science">Philosophy</a>
            <a href="#showcase">Sample</a>
            <a href="mailto:hi@allele.app">Contact</a>
          </div>
          <div className="l-footer-col">
            <div className="l-footer-col-title">Fine print</div>
            <Link href="/privacy">Privacy</Link>
            <Link href="/disclosure">Affiliate policy</Link>
          </div>
        </div>
        <div className="l-footer-legal">
          <div>© Allele · MMXXVI</div>
          <div>Your shade, your science.</div>
        </div>
      </footer>
    </main>
  );
}
