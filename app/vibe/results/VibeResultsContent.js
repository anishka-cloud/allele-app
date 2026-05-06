"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { archetypes, archetypeNames } from "@/lib/vibeArchetypes";
import { vibeProducts, VIBE_TIER_META, VIBE_CATEGORIES } from "@/lib/vibeProducts";

function VibeTierCard({ product, tierKey, tierMeta, archetype }) {
  const isValue = tierKey === "value";
  return (
    <div
      className="relative rounded-2xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: "white",
        border: isValue ? `2px solid ${archetype.accentColor}` : "1.5px solid var(--border-light)",
        boxShadow: isValue ? `0 8px 25px ${archetype.accentColor}20` : "var(--shadow-soft)",
      }}
    >
      <span
        className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
        style={{
          background: isValue ? `${archetype.accentColor}15` : "var(--bg-secondary)",
          color: isValue ? archetype.accentColor : "var(--text-secondary)",
          fontFamily: "var(--font-inter)",
          letterSpacing: "0.08em",
        }}
      >
        {tierMeta.label}
      </span>
      {isValue && (
        <span
          className="block text-xs mb-3 font-semibold tracking-wider"
          style={{ color: archetype.accentColor, fontFamily: "var(--font-inter)" }}
        >
          MOST POPULAR
        </span>
      )}

      {/* Product swatches */}
      <div className="flex items-center gap-3 mb-3">
        <div className="text-center">
          <div className="w-10 h-10 rounded-full mx-auto mb-1" style={{ background: product.swatch, boxShadow: `0 2px 8px ${product.swatch}40` }} />
          <span style={{ fontSize: "0.6rem", color: "var(--text-muted)", fontFamily: "var(--font-inter)" }}>Pure</span>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 rounded-full mx-auto mb-1" style={{ background: product.onSkinSwatch, boxShadow: `0 2px 8px ${product.onSkinSwatch}40` }} />
          <span style={{ fontSize: "0.6rem", color: "var(--text-muted)", fontFamily: "var(--font-inter)" }}>Styled</span>
        </div>
      </div>

      <h4 className="font-bold text-sm" style={{ fontFamily: "var(--font-inter)", color: "var(--text-primary)" }}>{product.brand}</h4>
      <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)", fontFamily: "var(--font-inter)" }}>{product.product}</p>
      <p className="text-xs italic mt-0.5" style={{ color: "var(--text-muted)", fontFamily: "var(--font-playfair)" }}>&ldquo;{product.shade}&rdquo;</p>
      <p className="text-sm font-semibold mt-2" style={{ color: archetype.accentColor, fontFamily: "var(--font-inter)" }}>${product.price}</p>

      <a
        href="https://shopmy.us/shop/nish"
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="w-full mt-3 py-2.5 px-4 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 hover:opacity-90 block text-center"
        style={{
          background: "var(--text-primary)",
          color: "white",
          fontFamily: "var(--font-inter)",
          textDecoration: "none",
        }}
      >
        SHOP THIS VIBE →
      </a>
    </div>
  );
}

function VibeProductCategory({ categoryData, products, archetype, proTip }) {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{categoryData.icon}</span>
        <div>
          <h3
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display')",
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            {categoryData.label}
          </h3>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "var(--text-muted)" }}>
            {categoryData.subtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["budget", "value", "splurge"].map((tier) => (
          <VibeTierCard
            key={tier}
            product={products[tier]}
            tierKey={tier}
            tierMeta={VIBE_TIER_META[tier]}
            archetype={archetype}
          />
        ))}
      </div>

      {proTip && (
        <div
          className="mt-4 p-4 rounded-xl"
          style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-light)" }}
        >
          <p style={{ fontFamily: "var(--font-playfair)", fontSize: "0.85rem", color: "var(--text-secondary)", fontStyle: "italic", lineHeight: 1.6 }}>
            Pro tip: {proTip}
          </p>
        </div>
      )}
    </div>
  );
}

export default function VibeResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const shareCardRef = useRef(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [kvProducts, setKvProducts] = useState(null);

  const archetypeCode = searchParams.get("archetype") || "CG";
  const secondaryCode = searchParams.get("secondary") || null;

  const archetype = archetypes[archetypeCode];
  const secondaryArchetype = secondaryCode ? archetypes[secondaryCode] : null;
  const staticProducts = vibeProducts[archetypeCode] || vibeProducts.CG;

  // Hydrate with KV products if available (non-blocking)
  useEffect(() => {
    if (!archetypeCode) return;
    fetch(`/api/vibe-products?archetype=${encodeURIComponent(archetypeCode)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.source === "kv" && data.products) {
          setKvProducts(data.products);
        }
      })
      .catch(() => {});
  }, [archetypeCode]);

  // Merge KV products over static (KV wins per-slot)
  const products = (() => {
    if (!kvProducts) return staticProducts;
    const merged = { ...staticProducts };
    for (const [catKey, kvCat] of Object.entries(kvProducts)) {
      if (!merged[catKey]) merged[catKey] = {};
      for (const tier of ["budget", "value", "splurge"]) {
        if (kvCat[tier]) {
          merged[catKey] = { ...merged[catKey], [tier]: { ...merged[catKey][tier], ...kvCat[tier] } };
        }
      }
    }
    return merged;
  })();

  const proTipMap = {
    top: "top", bottom: "bottom", layer: "layer", shoes: "shoes",
    bag: "bag", jewelry: "jewelry", fragrance: "fragrance", finishing: "finishing",
  };

  useEffect(() => {
    if (!archetype) router.push("/vibe/quiz");
    const timer = setTimeout(() => setShowContent(true), 3000);
    return () => clearTimeout(timer);
  }, [archetype, router]);

  if (!archetype) return null;

  const shareText = `I'm ${archetype.name}${secondaryArchetype ? ` with ${secondaryArchetype.name} energy` : ""}. Found my vibe at allele.app/vibe.`;
  const shareUrl = typeof window !== "undefined" ? window.location.origin + "/vibe" : "";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${shareUrl}/quiz`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform) => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(`${shareUrl}/quiz`);
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      threads: `https://www.threads.net/intent/post?text=${encodedText}%20${encodedUrl}`,
    };
    if (urls[platform]) window.open(urls[platform], "_blank");
  };

  const handleDownload = () => {
    if (downloading) return;
    setDownloading(true);
    if (shareCardRef.current) {
      import("html-to-image").then(({ toPng }) => {
        toPng(shareCardRef.current, { quality: 0.95, pixelRatio: 2, backgroundColor: "#FFFBF7" })
          .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = `vibe-dna-${archetype.name.toLowerCase().replace(/[\s\/]+/g, "-")}.png`;
            link.href = dataUrl;
            link.click();
            setDownloading(false);
          })
          .catch(() => { setDownloading(false); alert("Take a screenshot to save your Vibe DNA card!"); });
      }).catch(() => { setDownloading(false); });
    } else { setDownloading(false); }
  };

  const handleRetakeQuiz = () => {
    if (typeof window !== "undefined") {
      try { localStorage.removeItem("vibe-dna-answers"); } catch(e) {}
    }
    router.push("/vibe/quiz");
  };

  // Loading state
  if (!showContent) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: archetype.bgGradient }}>
        <div className="text-center animate-fade-in">
          <div className="inline-block w-10 h-10 border-2 border-t-transparent rounded-full animate-spin mb-6" style={{ borderColor: archetype.accentColor, borderTopColor: "transparent" }} />
          <p style={{ fontFamily: "var(--font-playfair)", fontSize: "1.2rem", fontStyle: "italic", color: "var(--text-secondary)" }}>
            Decoding your aesthetic DNA...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{ background: archetype.bgGradient }}>
      {/* Archetype Reveal */}
      <section className="px-6 pt-16 pb-10 text-center max-w-2xl mx-auto animate-fade-in-up">
        <span
          className="text-xs tracking-[0.3em] uppercase mb-4 block"
          style={{ color: archetype.accentColor, fontFamily: "var(--font-inter)", fontWeight: 600 }}
        >
          Your Aesthetic Archetype
        </span>
        <h1
          style={{
            fontFamily: "var(--font-playfair, 'Playfair Display')",
            fontSize: "clamp(2.5rem, 8vw, 4rem)",
            fontWeight: 700,
            fontStyle: "italic",
            color: "var(--text-primary)",
            lineHeight: 1.05,
            marginBottom: secondaryArchetype ? 8 : 24,
          }}
        >
          {archetype.name}
        </h1>
        {secondaryArchetype && (
          <p
            className="mb-6"
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(1rem, 3vw, 1.3rem)",
              fontStyle: "italic",
              color: "var(--text-secondary)",
            }}
          >
            with {secondaryArchetype.name} energy
          </p>
        )}

        {/* Moodboard Row */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 animate-fade-in-up stagger-2">
          {archetype.moodboard.map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
              style={{
                background: `${archetype.accentColor}10`,
                color: "var(--text-secondary)",
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
                border: `1px solid ${archetype.accentColor}20`,
                animation: "fadeInUp 0.5s ease-out forwards",
                animationDelay: `${0.3 + i * 0.06}s`,
                opacity: 0,
              }}
            >
              <span>{archetype.moodboardEmojis[i]}</span> {item}
            </span>
          ))}
        </div>

        {/* Description */}
        <p
          className="max-w-xl mx-auto mb-8 animate-fade-in-up stagger-3"
          style={{
            fontFamily: "var(--font-inter, 'Inter')",
            fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
            lineHeight: 1.8,
            color: "var(--text-secondary)",
            fontWeight: 300,
          }}
        >
          {archetype.description}
        </p>

        {/* Pills */}
        <div className="flex gap-3 justify-center animate-fade-in-up stagger-4">
          {archetype.pills.map((pill) => (
            <span
              key={pill}
              className="px-4 py-2 rounded-full text-sm"
              style={{
                background: "var(--bg-primary)",
                color: "var(--text-secondary)",
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
                boxShadow: "var(--shadow-soft)",
              }}
            >
              {pill}
            </span>
          ))}
        </div>
      </section>

      {/* Share Card */}
      <section className="px-6 py-10 max-w-2xl mx-auto animate-fade-in-up stagger-5">
        <div ref={shareCardRef} className="shade-dna-card" style={{ background: archetype.bgGradient, padding: "40px 32px" }}>
          <span style={{ display: "block", textAlign: "center", marginBottom: 6, fontFamily: "var(--font-inter)", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: archetype.accentColor, fontWeight: 600 }}>
            Vibe DNA by Allele
          </span>
          <p style={{ textAlign: "center", fontFamily: "var(--font-playfair)", fontSize: "clamp(1rem, 3vw, 1.3rem)", fontWeight: 400, color: "var(--text-secondary)", marginBottom: 4 }}>
            I&rsquo;m a
          </p>
          <h2 style={{ textAlign: "center", fontFamily: "var(--font-playfair)", fontSize: "clamp(2.2rem, 7vw, 3.2rem)", fontWeight: 700, fontStyle: "italic", color: "var(--text-primary)", lineHeight: 1.05, marginBottom: secondaryArchetype ? 4 : 8 }}>
            {archetype.name}
          </h2>
          {secondaryArchetype && (
            <p style={{ textAlign: "center", fontFamily: "var(--font-playfair)", fontSize: "0.95rem", fontStyle: "italic", color: "var(--text-secondary)", marginBottom: 8 }}>
              with {secondaryArchetype.name} energy
            </p>
          )}
          <div style={{ width: 40, height: 3, background: archetype.accentColor, borderRadius: 2, margin: "0 auto 16px" }} />
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: 16, flexWrap: "wrap" }}>
            {archetype.moodboard.slice(0, 6).map((item, i) => (
              <span key={i} style={{ fontSize: "1.2rem" }}>{archetype.moodboardEmojis[i]}</span>
            ))}
          </div>
          <p style={{ textAlign: "center", fontFamily: "var(--font-playfair)", fontSize: "0.85rem", fontStyle: "italic", color: "var(--text-secondary)", marginBottom: 16 }}>
            &ldquo;{archetype.shareTagline}&rdquo;
          </p>
          <p style={{ textAlign: "center", fontFamily: "var(--font-inter)", fontSize: "0.65rem", color: "var(--text-muted)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            allele &middot; vibe dna
          </p>
        </div>

        {/* Share/Download buttons */}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <button id="share-vibe-dna" onClick={() => setShareOpen(!shareOpen)} className="shade-dna-share-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="3" r="2" stroke="currentColor" strokeWidth="1.3"/>
                <circle cx="4" cy="8" r="2" stroke="currentColor" strokeWidth="1.3"/>
                <circle cx="12" cy="13" r="2" stroke="currentColor" strokeWidth="1.3"/>
                <line x1="5.8" y1="7" x2="10.2" y2="4" stroke="currentColor" strokeWidth="1.3"/>
                <line x1="5.8" y1="9" x2="10.2" y2="12" stroke="currentColor" strokeWidth="1.3"/>
              </svg>
              Share Your Vibe DNA
            </button>
            <button id="download-vibe-card" onClick={handleDownload} className="shade-dna-download-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                <path d="M8 2V10M8 10L5 7M8 10L11 7M3 13H13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {downloading ? "Saving..." : "Download Card"}
            </button>
          </div>

          {shareOpen && (
            <div style={{ marginTop: 12, display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", animation: "fadeInUp 0.3s ease-out" }}>
              <button onClick={() => handleShare("twitter")} className="share-platform-btn">𝕏 Twitter</button>
              <button onClick={() => handleShare("threads")} className="share-platform-btn">🧵 Threads</button>
              <button onClick={handleCopyLink} className="share-platform-btn">{copied ? "✓ Copied!" : "🔗 Copy Link"}</button>
            </div>
          )}
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center my-4"><div style={{ width: 50, height: 2, background: archetype.accentColor, borderRadius: 1, opacity: 0.3 }} /></div>

      {/* Celebrity Style Twins */}
      <section className="px-6 py-10 text-center max-w-2xl mx-auto animate-fade-in-up stagger-6">
        <span className="text-xs tracking-[0.3em] uppercase mb-4 block" style={{ color: archetype.accentColor, fontFamily: "var(--font-inter)", fontWeight: 600 }}>
          Celebrity Style Twins
        </span>
        <p style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.2rem, 3vw, 1.6rem)", fontWeight: 500, fontStyle: "italic", color: "var(--text-primary)" }}>
          {archetype.celebrities.join(", ")}
        </p>
      </section>

      {/* Divider */}
      <div className="flex justify-center my-4"><div style={{ width: 50, height: 2, background: archetype.accentColor, borderRadius: 1, opacity: 0.3 }} /></div>

      {/* FTC Affiliate Disclosure */}
      <section className="px-6 py-4 max-w-2xl mx-auto animate-fade-in-up">
        <div className="rounded-2xl px-5 py-4" style={{ background: "rgba(196,162,101,0.08)", border: "1px solid rgba(196,162,101,0.15)" }}>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.6, textAlign: "center", fontWeight: 300 }}>
            This guide includes affiliate links. When you shop through them, we may earn a small commission at no extra cost to you. Every product is chosen because it actually works for your archetype.
          </p>
        </div>
      </section>

      {/* Product Recommendations */}
      <section className="px-6 py-10 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs tracking-[0.3em] uppercase mb-4 block" style={{ color: archetype.accentColor, fontFamily: "var(--font-inter)", fontWeight: 600 }}>
            Your {archetype.name} Essentials
          </span>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 500, color: "var(--text-primary)" }}>
            Shop Your <span style={{ fontStyle: "italic" }}>Vibe</span>
          </h2>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 300, marginTop: 8 }}>
            Curated picks across 3 price points — because good taste comes at every budget
          </p>
        </div>

        {VIBE_CATEGORIES.map((cat) => (
          <VibeProductCategory
            key={cat.key}
            categoryData={cat}
            products={products[cat.key]}
            archetype={archetype}
            proTip={archetype.proTips[proTipMap[cat.key]]}
          />
        ))}
      </section>

      {/* Cross-sell CTA */}
      <section className="px-6 py-16 text-center" style={{ background: "rgba(255,255,255,0.5)" }}>
        <span className="text-xs tracking-[0.3em] uppercase mb-4 block" style={{ color: "var(--accent-gold)", fontFamily: "var(--font-inter)", fontWeight: 600 }}>
          Also from Allele
        </span>
        <h2 className="mb-4" style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.4rem, 3.5vw, 2rem)", fontWeight: 500, color: "var(--text-primary)" }}>
          Know your <span style={{ fontStyle: "italic" }}>color season</span>?
        </h2>
        <p className="mb-8" style={{ fontFamily: "var(--font-inter)", fontSize: "0.95rem", color: "var(--text-muted)", fontWeight: 300 }}>
          Take the Shade DNA quiz to find your perfect makeup colors.
        </p>
        <Link href="/quiz">
          <button className="btn-primary" style={{ borderRadius: "100px", padding: "16px 48px", fontSize: "14px" }}>
            Take Shade DNA Quiz →
          </button>
        </Link>
      </section>

      {/* Retake + Footer */}
      <section className="px-6 py-12 text-center">
        <button
          onClick={handleRetakeQuiz}
          className="mb-8 px-6 py-3 rounded-full text-sm transition-all duration-200 hover:scale-105"
          style={{
            background: "transparent",
            color: "var(--text-muted)",
            border: "1.5px solid var(--border-light)",
            fontFamily: "var(--font-inter)",
            cursor: "pointer",
          }}
        >
          ↻ Retake the Quiz
        </button>
      </section>

      <footer className="px-6 py-8 text-center" style={{ borderTop: "1px solid var(--border-light)" }}>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.05em" }}>
          &copy; {new Date().getFullYear()} Allele &middot; Vibe DNA &middot;{" "}
          <a href="/disclosure" style={{ color: "var(--text-muted)", textDecoration: "underline" }}>Affiliate Disclosure</a>
          {" "}&middot;{" "}
          <a href="/privacy" style={{ color: "var(--text-muted)", textDecoration: "underline" }}>Privacy</a>
        </p>
      </footer>
    </main>
  );
}
