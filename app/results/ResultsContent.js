"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { seasons } from "@/lib/seasonData";
import { getProductRecommendations } from "@/lib/productData";
import { getSkinTone } from "@/lib/skinTones";
import { getShopUrl } from "@/lib/shopLinks";
import { track } from "@/lib/analytics";

// KV hydration is disabled — see useEffect below for context.
const KV_HYDRATION = false;

/* --- Processing / Loading Animation --- */
function ProcessingScreen({ onComplete }) {
  const [phase, setPhase] = useState(0);
  const phrases = [
    "Analyzing your coloring...",
    "Mapping your undertones...",
    "Finding your season...",
    "Curating your palette...",
  ];

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),
      setTimeout(() => setPhase(2), 2000),
      setTimeout(() => setPhase(3), 3000),
      setTimeout(() => onComplete(), 4200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: "var(--bg-primary)" }}>
      <div className="relative w-48 h-48 mb-12">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute animate-morph"
            style={{
              width: `${60 + i * 15}px`, height: `${60 + i * 15}px`,
              left: `${20 + i * 12}px`, top: `${20 + i * 10}px`,
              background: ["rgba(201,146,157,0.4)","rgba(196,162,101,0.3)","rgba(232,196,196,0.35)","rgba(180,170,200,0.3)","rgba(168,200,168,0.25)"][i],
              animationDelay: `${i * 0.8}s`, animationDuration: `${6 + i}s`, filter: "blur(2px)",
            }}
          />
        ))}
      </div>
      <p className="animate-fade-in" key={phase} style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "1.15rem", fontStyle: "italic", color: "var(--text-secondary)", fontWeight: 400 }}>
        {phrases[phase]}
      </p>
      <div className="flex gap-2 mt-8">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full transition-all duration-500"
            style={{ background: i <= phase ? "var(--text-primary)" : "var(--border-light)", transform: i === phase ? "scale(1.5)" : "scale(1)" }} />
        ))}
      </div>
    </div>
  );
}

/* --- Category Icon SVGs --- */
const CategoryIcons = {
  foundation: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="8" y="2" width="8" height="20" rx="3" stroke="currentColor" strokeWidth="1.5"/><path d="M8 16h8" stroke="currentColor" strokeWidth="1"/></svg>),
  concealer: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M10 3L14 3L16 10L14 21H10L8 10L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  lips: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 19C12 19 3 15 3 10C3 8 5 6 7 7C9 8 12 11 12 11C12 11 15 8 17 7C19 6 21 8 21 10C21 15 12 19 12 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  lipLiner: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 20L18 6L20 4L18 6L4 20ZM4 20L6 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  blush: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="11" r="2" fill="currentColor" opacity="0.2"/><circle cx="16" cy="11" r="2" fill="currentColor" opacity="0.2"/></svg>),
  eyes: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M2 12C2 12 5 6 12 6C19 6 22 12 22 12C22 12 19 18 12 18C5 18 2 12 2 12Z" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/></svg>),
  bronzer: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M8 16C10 12 14 12 16 16" stroke="currentColor" strokeWidth="1" opacity="0.4"/></svg>),
  nails: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M8 20V10C8 6 10 3 12 3C14 3 16 6 16 10V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M8 13h8" stroke="currentColor" strokeWidth="1" opacity="0.4"/></svg>),
};

/* --- Skin Tone Swatch --- */
function SkinToneSwatch({ hex, skinToneBg, size = 48 }) {
  return (
    <div className="skin-swatch-container" style={{ width: size + 12, height: size + 12 }}>
      <div style={{
        width: size + 12, height: size + 12, borderRadius: "12px",
        background: skinToneBg, display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "inset 0 1px 3px rgba(0,0,0,0.08)",
      }}>
        <div style={{
          width: size - 4, height: size - 4, borderRadius: "50%",
          background: hex,
          boxShadow: `0 2px 8px ${hex}50, inset 0 1px 2px rgba(255,255,255,0.25)`,
          border: "2px solid rgba(255,255,255,0.4)",
        }} />
      </div>
      <span style={{ fontSize: "0.6rem", color: "var(--text-muted)", marginTop: 4, display: "block", textAlign: "center", fontWeight: 400, letterSpacing: "0.03em" }}>
        On your skin
      </span>
    </div>
  );
}

/* --- Tier Product Card --- */
function TierCard({ tier, product, tierMeta, skinToneBg, delay = 0, shopUrl, season, category }) {
  const meta = tierMeta[tier];
  const isValue = tier === "value";
  const amazonSearchUrl = `https://www.amazon.com/s?k=${encodeURIComponent(`${product.brand} ${product.product} ${product.shade}`)}&tag=anishkanawa00-20`;
  const displayHex = product.hex && product.hex !== "#999999" ? product.hex : null;
  const handleShopClick = () => {
    track.shopClick({
      season,
      category,
      tier,
      brand: product.brand,
      productName: product.product,
      price: product.price,
    });
  };

  return (
    <div
      className={`tier-card ${isValue ? "tier-value" : ""}`}
      style={{ animation: "fadeInUp 0.6s ease-out forwards", animationDelay: `${delay}s`, opacity: 0 }}
    >
      <div className="tier-badge" data-tier={tier}>
        <span>{meta.emoji}</span>
        <span>{meta.label}</span>
      </div>

      {isValue && <div className="most-popular-tag">Most Popular</div>}

      {displayHex && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", margin: "16px 0 12px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: displayHex, boxShadow: `0 2px 8px ${displayHex}40, inset 0 1px 2px rgba(255,255,255,0.2)`, margin: "0 auto" }} />
            <span style={{ fontSize: "0.55rem", color: "var(--text-muted)", marginTop: 3, display: "block" }}>Pure</span>
          </div>
          <SkinToneSwatch hex={displayHex} skinToneBg={skinToneBg} size={38} />
        </div>
      )}

      <div style={{ textAlign: "center", padding: displayHex ? "0 8px" : "16px 8px 0" }}>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: 2 }}>{product.brand}</p>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 300, marginBottom: 2 }}>{product.product}</p>
        <p style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "0.8rem", fontStyle: "italic", color: "var(--text-primary)", marginBottom: 4 }}>&ldquo;{product.shade}&rdquo;</p>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", fontWeight: 600, color: "var(--accent-gold)", marginBottom: 12 }}>{product.price}</p>
      </div>

      <a href={amazonSearchUrl} onClick={handleShopClick} target="_blank" rel="sponsored noopener noreferrer" className="tier-cta" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>
        Shop This Shade &rarr;
      </a>
    </div>
  );
}

/* --- Product Category Section --- */
function ProductCategory({ category, tierMeta, skinToneBg, index, footerNote, shopUrl, season }) {
  const icon = CategoryIcons[category.icon] || CategoryIcons.lips;
  return (
    <div className="product-category" style={{ animationDelay: `${index * 0.08}s` }}>
      <div className="flex items-center gap-3 mb-5">
        <span style={{ color: "var(--accent-gold)" }}>{icon}</span>
        <h3 style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "1.25rem", fontWeight: 600, color: "var(--text-primary)" }}>{category.label}</h3>
      </div>
      <div className="tier-row">
        {["budget", "value", "splurge"].map((tier, i) => (
          category.tiers[tier] && (
            <TierCard key={tier} tier={tier} product={Array.isArray(category.tiers[tier]) ? category.tiers[tier][0] : category.tiers[tier]} tierMeta={tierMeta} skinToneBg={skinToneBg} delay={0.1 + i * 0.08 + index * 0.03} shopUrl={shopUrl} season={season} category={category.key} />
          )
        ))}
      </div>
      {footerNote && (
        <div className="pro-tip-footer">
          <p>{footerNote}</p>
        </div>
      )}
    </div>
  );
}

/* --- Foundation Guidance Alert --- */
function FoundationGuidance({ undertone, olive }) {
  const isWarm = undertone === "Warm";
  const isCool = undertone === "Cool";

  const guidanceText = isWarm
    ? "Look for foundations labeled \"warm,\" \"golden,\" or \"yellow\" undertone. Avoid anything with pink or blue bases. They'll look ashy on your skin."
    : isCool
    ? "Look for foundations labeled \"cool,\" \"pink,\" or \"neutral-cool\" undertone. Avoid yellow or golden bases. They'll look sallow."
    : "You have a neutral undertone. You can flex between warm and cool foundations. Look for shades labeled \"neutral\" or \"N\" for the closest match.";

  const oliveText = "Olive undertones are tricky. Most brands run too pink or too yellow. Try Fenty Beauty (flexible range), Armani Luminous Silk (built for olive), or Lisa Eldridge (created by an olive-skinned makeup artist). Look for shades with a slight green/grey cast.";

  return (
    <div className="foundation-guidance animate-fade-in-up">
      <div className="guidance-header">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 7v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="12" cy="16.5" r="1" fill="currentColor"/>
        </svg>
        <span>Foundation Undertone Guide</span>
      </div>
      <p className="guidance-text">{guidanceText}</p>
      {olive && (
        <div className="olive-callout">
          <div className="olive-callout-header">
            <span>🫒</span>
            <span>Olive Skin? Read this.</span>
          </div>
          <p>{oliveText}</p>
        </div>
      )}
    </div>
  );
}

/* --- Celebrity Style Twins (Depth-aware) --- */
function CelebrityTwins({ seasonData, skinAnswer }) {
  const celebrities = seasonData.celebrities;
  if (!celebrities) return null;

  let depthTier = "medium";
  if (["very_fair", "fair"].includes(skinAnswer)) {
    depthTier = "fairLight";
  } else if (["light_medium", "medium"].includes(skinAnswer)) {
    depthTier = "medium";
  } else if (["medium_deep", "deep"].includes(skinAnswer)) {
    depthTier = "mediumDeepDeep";
  }

  let names = [];
  if (Array.isArray(celebrities)) {
    names = celebrities;
  } else if (typeof celebrities === "object") {
    names = celebrities[depthTier] || [];
    if (names.length === 0) {
      names = celebrities.medium || celebrities.fairLight || celebrities.mediumDeepDeep || [];
    }
  }

  if (names.length === 0) return null;

  return (
    <div className="animate-fade-in-up stagger-6">
      <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.15em", display: "block", marginBottom: "8px" }}>
        Celebrity Style Twins
      </span>
      <p style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "1.1rem", fontStyle: "italic", color: "var(--text-primary)" }}>
        {names.join(", ")}
      </p>
    </div>
  );
}

/* --- Main Results Content --- */
export default function ResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailSubmitting, setEmailSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [copied, setCopied] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [kvProducts, setKvProducts] = useState(null);
  const shareCardRef = useRef(null);

  const seasonName = searchParams.get("season") || "True Spring";
  const undertone = searchParams.get("undertone") || "Warm";
  const olive = searchParams.get("olive") === "1";
  const contrast = searchParams.get("contrast") || "medium";
  const skinAnswer = searchParams.get("skin") || "medium";
  const valueParam = searchParams.get("value") || "Medium";

  const seasonData = seasons[seasonName];
  const staticRecs = getProductRecommendations(seasonName);
  const skinToneBg = getSkinTone(skinAnswer, undertone, olive);
  const shopUrl = getShopUrl(seasonName);

  // KV hydration is disabled at the module level — Perplexity refresh job is
  // returning placeholder hex colors (#999999), miscategorized products
  // (highlighters as concealers, eyeshadows as nail polish), and hallucinated
  // product names. Until the refresh job is rebuilt with validation, ship the
  // hand-curated static recommendations from productData.js. The merge code
  // below is preserved and stays a no-op while kvProducts is null; flip
  // KV_HYDRATION back on once the upstream pipeline is fixed.
  useEffect(() => {
    if (!KV_HYDRATION || !seasonName) return;
    fetch(`/api/products?season=${encodeURIComponent(seasonName)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.source === "kv" && data.products) {
          setKvProducts(data.products);
        }
      })
      .catch(() => {});
  }, [seasonName]);

  // Merge KV products into static categories (KV wins per-slot).
  // KV products from Perplexity often lack hex colors, which makes the swatch
  // circles disappear and the card layout look broken. When KV doesn't supply
  // a hex, fall back to the static product's hex at the same season/category/
  // tier slot so every card renders a swatch.
  const { categories, tierMeta } = (() => {
    if (!kvProducts) return staticRecs;
    const merged = staticRecs.categories.map((cat) => {
      const kvCat = kvProducts[cat.key];
      if (!kvCat) return cat;
      const mergedTiers = { ...cat.tiers };
      for (const tier of ["budget", "value", "splurge"]) {
        if (!kvCat[tier]?.length) continue;
        const staticTier = cat.tiers?.[tier];
        const staticArr = Array.isArray(staticTier) ? staticTier : staticTier ? [staticTier] : [];
        mergedTiers[tier] = kvCat[tier].map((kvProd, i) => {
          const fallbackHex = staticArr[i]?.hex || staticArr[0]?.hex;
          return {
            ...kvProd,
            hex: kvProd.hex && kvProd.hex !== "#999999" ? kvProd.hex : fallbackHex,
          };
        });
      }
      return { ...cat, tiers: mergedTiers };
    });
    return { categories: merged, tierMeta: staticRecs.tierMeta };
  })();

  useEffect(() => {
    if (!seasonData) router.push("/quiz");
  }, [seasonData, router]);

  if (!seasonData) return null;

  const shareText = `I'm a ${seasonName}. Found my season at allele.app.`;
  const resultsUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(resultsUrl);
    setCopied(true);
    track.shareClicked(seasonName, "copy_link");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform) => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(resultsUrl);
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}`,
      threads: `https://www.threads.net/intent/post?text=${encodedText}%20${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    };
    if (urls[platform]) {
      track.shareClicked(seasonName, platform);
      window.open(urls[platform], "_blank");
    }
  };

  const handleNativeShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      track.shareClicked(seasonName, "native");
      navigator.share({ title: `I'm a ${seasonName}.`, text: shareText, url: resultsUrl }).catch(() => {});
    } else {
      setShareOpen(!shareOpen);
    }
  };

  const handleDownloadCard = () => {
    setDownloading(true);
    track.downloadCard(seasonName);
    if (shareCardRef.current) {
      import("html-to-image").then(({ toPng }) => {
        toPng(shareCardRef.current, { quality: 0.95, pixelRatio: 2, backgroundColor: "#FFFBF7" })
          .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = `shade-dna-${seasonName.toLowerCase().replace(/\s+/g, "-")}.png`;
            link.href = dataUrl;
            link.click();
            setDownloading(false);
          })
          .catch(() => {
            setDownloading(false);
            alert("Take a screenshot of your Shade DNA card to save it!");
          });
      }).catch(() => {
        setDownloading(false);
        alert("Take a screenshot of your Shade DNA card to save it!");
      });
    } else {
      setDownloading(false);
    }
  };

  const handleRetakeQuiz = () => {
    if (typeof window !== "undefined") {
      try { localStorage.removeItem("shade-dna-answers"); } catch(e) {}
      try { sessionStorage.removeItem("shade-dna-answers"); } catch(e) {}
    }
    router.push("/quiz");
  };

  const accentColor = seasonData.bestColors[0];
  const contrastLabel = contrast === "high" ? "High contrast" : contrast === "low" ? "Low contrast" : "Medium contrast";
  const depthLabel = valueParam === "Deep" ? "Deep" : valueParam === "Light" ? "Light" : "Medium";
  const summaryLine = `${undertone} undertone \u00b7 ${depthLabel} \u00b7 ${contrastLabel}${olive ? " \u00b7 Olive" : ""}`;

  const foundationCat = categories.find(c => c.key === "foundation");
  const concealerCat = categories.find(c => c.key === "concealer");
  const lipsCat = categories.find(c => c.key === "lips");
  const lipLinerCat = categories.find(c => c.key === "lipLiner");
  const blushCat = categories.find(c => c.key === "blush");
  const eyesCat = categories.find(c => c.key === "eyes");
  const bronzerCat = categories.find(c => c.key === "bronzer");
  const nailsCat = categories.find(c => c.key === "nails");

  const concealerProTip = "Pro tip: For brightening, go 1\u20132 shades lighter than your foundation. For spot concealing, match your foundation shade exactly. Set with a translucent powder to prevent creasing.";

  if (!showResults) {
    return <ProcessingScreen onComplete={() => setShowResults(true)} />;
  }

  return (
    <main className="min-h-screen" style={{ background: "var(--bg-primary)" }}>

      {/* === SECTION 1: Season Reveal + Palette === */}
      <section className="px-6 pt-16 pb-8 md:pt-24 md:pb-12 text-center max-w-3xl mx-auto">
        <span className="block mb-4 animate-fade-in-down" style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent-gold)", fontWeight: 500 }}>
          Your Color Season
        </span>
        <h1 className="mb-2 animate-fade-in-up stagger-1" style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "clamp(2.2rem, 8vw, 4rem)", fontWeight: 700, lineHeight: 1.05, color: "var(--text-primary)" }}>
          You&apos;re a
        </h1>
        <h1 className="mb-8 animate-fade-in-up stagger-2" style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "clamp(2.2rem, 8vw, 4rem)", fontWeight: 700, lineHeight: 1.05, fontStyle: "italic", color: accentColor }}>
          {seasonName}
        </h1>

        <div className="flex justify-center gap-2 md:gap-3 mb-8 animate-fade-in-up stagger-3">
          {seasonData.bestColors.map((color, i) => (
            <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full transition-transform duration-300 hover:scale-125"
              style={{ background: color, boxShadow: `0 2px 8px ${color}40` }} />
          ))}
        </div>

        <p className="max-w-xl mx-auto mb-8 animate-fade-in-up stagger-4" style={{ fontFamily: "var(--font-inter)", fontSize: "0.95rem", lineHeight: 1.75, color: "var(--text-secondary)", fontWeight: 300 }}>
          {seasonData.description}
        </p>

        <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up stagger-5">
          <span className="px-4 py-2 rounded-full" style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.05em", background: "rgba(26,26,26,0.05)", color: "var(--text-secondary)" }}>
            {undertone} Undertone
          </span>
          <span className="px-4 py-2 rounded-full" style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.05em", background: "rgba(26,26,26,0.05)", color: "var(--text-secondary)" }}>
            {contrastLabel}
          </span>
          {olive && (
            <span className="px-4 py-2 rounded-full" style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.05em", background: "rgba(128,128,0,0.08)", color: "#6B6B2A" }}>
              Possible Olive Undertone
            </span>
          )}
        </div>
      </section>

      {/* === SECTION 1.5: The 2026 Edit === */}
      {seasonData.trendEdit && seasonData.trendEdit.length > 0 && (
        <section className="px-6 pb-10 text-center max-w-2xl mx-auto animate-fade-in-up">
          <div className="rounded-2xl px-6 py-8" style={{ background: "rgba(196,162,101,0.05)", border: "1px solid rgba(196,162,101,0.12)" }}>
            <span className="block mb-2" style={{ fontFamily: "var(--font-inter)", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent-gold)", fontWeight: 600 }}>
              The 2026 Edit
            </span>
            <h2 className="mb-2" style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "clamp(1.4rem, 4vw, 1.8rem)", fontWeight: 600, color: "var(--text-primary)" }}>
              Trending colors that work for you
            </h2>
            <p className="mb-6 max-w-md mx-auto" style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 300, lineHeight: 1.6 }}>
              This year&rsquo;s colors, filtered through your season. Shop these with confidence.
            </p>
            <div className="flex flex-wrap justify-center gap-5 md:gap-7">
              {seasonData.trendEdit.map((c, i) => (
                <div key={i} className="flex flex-col items-center" style={{ minWidth: 72 }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: c.hex, boxShadow: `0 3px 12px ${c.hex}50, inset 0 1px 2px rgba(255,255,255,0.25)`, border: "2px solid rgba(255,255,255,0.5)", transition: "transform 0.3s ease" }} className="hover:scale-110" />
                  <span className="mt-2" style={{ fontFamily: "var(--font-inter)", fontSize: "0.72rem", color: "var(--text-secondary)", fontWeight: 500, letterSpacing: "0.02em", textAlign: "center", lineHeight: 1.3 }}>
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FTC Affiliate Disclosure */}
      <section className="px-6 py-4 max-w-2xl mx-auto animate-fade-in-up">
        <div className="rounded-2xl px-5 py-4" style={{ background: "rgba(196,162,101,0.08)", border: "1px solid rgba(196,162,101,0.15)" }}>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.6, textAlign: "center", fontWeight: 300 }}>
            This guide includes affiliate links. When you shop through them, we may earn a small commission at no extra cost to you. Every product is chosen because it actually works for your season.
          </p>
        </div>
      </section>

      {/* Share Card */}
      <section className="px-6 py-10 max-w-2xl mx-auto animate-fade-in-up stagger-6">
        <div ref={shareCardRef} className="shade-dna-card" style={{ background: `linear-gradient(145deg, var(--bg-primary) 0%, ${accentColor}10 40%, ${accentColor}18 100%)`, padding: "40px 32px" }}>
          <span style={{ display: "block", textAlign: "center", marginBottom: 6, fontFamily: "var(--font-inter)", fontSize: "0.6rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--accent-gold)", fontWeight: 600 }}>
            Shade DNA by Allele
          </span>
          <p style={{ textAlign: "center", fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "clamp(1.1rem, 3vw, 1.4rem)", fontWeight: 400, color: "var(--text-secondary)", marginBottom: 4, letterSpacing: "0.02em" }}>
            You&rsquo;re a
          </p>
          <h2 style={{ textAlign: "center", fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "clamp(2.4rem, 7vw, 3.4rem)", fontWeight: 700, fontStyle: "italic", color: "var(--text-primary)", lineHeight: 1.05, marginBottom: 8 }}>
            {seasonName}
          </h2>
          <div style={{ width: 40, height: 3, background: accentColor, borderRadius: 2, margin: "0 auto 20px" }} />
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: 20, flexWrap: "wrap" }}>
            {seasonData.bestColors.map((color, i) => (
              <div key={i} style={{ width: 36, height: 36, borderRadius: "50%", background: color, boxShadow: `0 2px 10px ${color}40, inset 0 1px 2px rgba(255,255,255,0.2)`, transition: "transform 0.3s ease" }} className="hover:scale-110" />
            ))}
          </div>
          <p style={{ textAlign: "center", fontFamily: "var(--font-inter)", fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 400, letterSpacing: "0.04em", marginBottom: 20 }}>
            {summaryLine}
          </p>
          <p style={{ textAlign: "center", fontFamily: "var(--font-inter)", fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 300, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            allele &middot; shade dna
          </p>
        </div>

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            <button id="share-shade-dna" onClick={handleNativeShare} className="shade-dna-share-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="3" r="2" stroke="currentColor" strokeWidth="1.3"/>
                <circle cx="4" cy="8" r="2" stroke="currentColor" strokeWidth="1.3"/>
                <circle cx="12" cy="13" r="2" stroke="currentColor" strokeWidth="1.3"/>
                <line x1="5.8" y1="7" x2="10.2" y2="4" stroke="currentColor" strokeWidth="1.3"/>
                <line x1="5.8" y1="9" x2="10.2" y2="12" stroke="currentColor" strokeWidth="1.3"/>
              </svg>
              Share Your Shade DNA
            </button>
            <button id="download-share-card" onClick={handleDownloadCard} className="shade-dna-download-btn" disabled={downloading}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v9M5 8l3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {downloading ? "Saving..." : "Download Card"}
            </button>
          </div>
        </div>

        {shareOpen && (
          <div className="shade-dna-share-options animate-fade-in-up" style={{ marginTop: 16, justifyContent: "center" }}>
            <button id="share-copy-link" onClick={handleCopyLink} className="shade-dna-share-option">{copied ? "\u2713 Copied!" : "Copy Link"}</button>
            <button id="share-twitter" onClick={() => handleShare("twitter")} className="shade-dna-share-option">Twitter / X</button>
            <button id="share-threads" onClick={() => handleShare("threads")} className="shade-dna-share-option">Threads</button>
            <button id="share-pinterest" onClick={() => handleShare("pinterest")} className="shade-dna-share-option">Pinterest</button>
            <button id="share-whatsapp" onClick={() => handleShare("whatsapp")} className="shade-dna-share-option">WhatsApp</button>
            <button id="share-facebook" onClick={() => handleShare("facebook")} className="shade-dna-share-option">Facebook</button>
          </div>
        )}
      </section>

      <div className="editorial-divider" />

      {/* === SECTION 2: Celebrity Style Twins === */}
      <section className="px-6 py-8 max-w-3xl mx-auto text-center">
        <CelebrityTwins seasonData={seasonData} skinAnswer={skinAnswer} />
      </section>

      <div className="editorial-divider" />

      {/* === SECTION 3: Foundation & Concealer === */}
      <section className="px-4 sm:px-6 py-12 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="block mb-3" style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent-gold)", fontWeight: 500 }}>
            Your Base
          </span>
          <h2 style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 600, color: "var(--text-primary)" }}>
            Foundation & <span style={{ fontStyle: "italic" }}>Concealer</span>
          </h2>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 300, marginTop: 8 }}>
            Your perfect base match with undertone guidance
          </p>
        </div>
        <FoundationGuidance undertone={undertone} olive={olive} />
        {foundationCat && <ProductCategory category={foundationCat} tierMeta={tierMeta} skinToneBg={skinToneBg} shopUrl={shopUrl} season={seasonName} index={0} />}
        {concealerCat && <ProductCategory category={concealerCat} tierMeta={tierMeta} skinToneBg={skinToneBg} shopUrl={shopUrl} season={seasonName} index={1} footerNote={concealerProTip} />}
      </section>

      <div className="editorial-divider" />

      {/* === SECTION 4: Lips + Lip Liner === */}
      <section className="px-4 sm:px-6 py-12 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="block mb-3" style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent-gold)", fontWeight: 500 }}>Your Lips</span>
          <h2 style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 600, color: "var(--text-primary)" }}>
            Lip Color & <span style={{ fontStyle: "italic" }}>Liner</span>
          </h2>
        </div>
        {lipsCat && <ProductCategory category={lipsCat} tierMeta={tierMeta} skinToneBg={skinToneBg} shopUrl={shopUrl} season={seasonName} index={2} />}
        {lipLinerCat && <ProductCategory category={lipLinerCat} tierMeta={tierMeta} skinToneBg={skinToneBg} shopUrl={shopUrl} season={seasonName} index={3} />}
      </section>

      <div className="editorial-divider" />

      {/* === SECTION 5: Blush === */}
      <section className="px-4 sm:px-6 py-12 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="block mb-3" style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent-gold)", fontWeight: 500 }}>Your Cheeks</span>
          <h2 style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 600, color: "var(--text-primary)" }}>
            Blush <span style={{ fontStyle: "italic" }}>Shades</span>
          </h2>
        </div>
        {blushCat && <ProductCategory category={blushCat} tierMeta={tierMeta} skinToneBg={skinToneBg} shopUrl={shopUrl} season={seasonName} index={4} />}
      </section>

      <div className="editorial-divider" />

      {/* === SECTION 6: Eyes === */}
      <section className="px-4 sm:px-6 py-12 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="block mb-3" style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent-gold)", fontWeight: 500 }}>Your Eyes</span>
          <h2 style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 600, color: "var(--text-primary)" }}>
            Eye <span style={{ fontStyle: "italic" }}>Shadow</span>
          </h2>
        </div>
        {eyesCat && <ProductCategory category={eyesCat} tierMeta={tierMeta} skinToneBg={skinToneBg} shopUrl={shopUrl} season={seasonName} index={5} />}
      </section>

      <div className="editorial-divider" />

      {/* === SECTION 7: Bronzer === */}
      <section className="px-4 sm:px-6 py-12 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="block mb-3" style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent-gold)", fontWeight: 500 }}>Your Glow</span>
          <h2 style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 600, color: "var(--text-primary)" }}>
            Bronzer <span style={{ fontStyle: "italic" }}>Shades</span>
          </h2>
        </div>
        {bronzerCat && <ProductCategory category={bronzerCat} tierMeta={tierMeta} skinToneBg={skinToneBg} shopUrl={shopUrl} season={seasonName} index={6} />}
      </section>

      <div className="editorial-divider" />

      {/* === SECTION 8: Nails === */}
      <section className="px-4 sm:px-6 py-12 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="block mb-3" style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--accent-gold)", fontWeight: 500 }}>Your Nails</span>
          <h2 style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "clamp(1.5rem, 4vw, 2.25rem)", fontWeight: 600, color: "var(--text-primary)" }}>
            Nail <span style={{ fontStyle: "italic" }}>Colors</span>
          </h2>
        </div>
        {nailsCat && <ProductCategory category={nailsCat} tierMeta={tierMeta} skinToneBg={skinToneBg} shopUrl={shopUrl} season={seasonName} index={7} />}
      </section>

      <div className="editorial-divider" />

      {/* === SECTION 9: Colors to Avoid === */}
      <section className="px-6 py-12 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "clamp(1.3rem, 3vw, 1.75rem)", fontWeight: 600, color: "var(--text-primary)" }}>
            Colors to <span style={{ fontStyle: "italic" }}>Avoid</span>
          </h2>
          <p className="mt-2" style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 300 }}>
            These shades may wash you out or clash with your natural coloring
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {seasonData.avoidColors.map((color, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="relative">
                <div className="w-12 h-12 rounded-full" style={{ background: color, boxShadow: `0 2px 8px ${color}30`, opacity: 0.7 }} />
                <div className="absolute inset-0 flex items-center justify-center" style={{ color: "rgba(200,50,50,0.6)" }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
              </div>
              <span style={{ fontFamily: "var(--font-inter)", fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 400, textAlign: "center", maxWidth: "70px" }}>
                {seasonData.avoidColorNames[i]}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="editorial-divider" />

      {/* === SECTION 10: Email Capture === */}
      <section className="px-6 py-16 mx-auto max-w-2xl">
        <div className="rounded-3xl p-8 md:p-12 text-center" style={{ background: "var(--bg-secondary)", border: "1px solid var(--border-light)" }}>
          {!emailSubmitted ? (
            <>
              <h3 className="mb-3" style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "clamp(1.2rem, 3vw, 1.5rem)", fontWeight: 600, color: "var(--text-primary)" }}>
                Stay in the loop<br /><span style={{ fontStyle: "italic" }}>with Allele</span>
              </h3>
              <p className="mb-6" style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 300 }}>
                New quizzes, seasonal shade updates, and exclusive product drops &mdash; straight to your inbox.
              </p>
              <form onSubmit={async (e) => {
                e.preventDefault();
                setEmailSubmitting(true);
                setEmailError("");
                try {
                  const res = await fetch("/api/subscribe", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, season: seasonName, undertone, contrast, skin: skinAnswer, value: valueParam, olive: olive ? "1" : "0" }),
                  });
                  if (res.ok) {
                    setEmailSubmitted(true);
                    track.emailSubmitted(seasonName);
                  } else {
                    const data = await res.json().catch(() => ({}));
                    setEmailError(data.error || "Something went wrong. Try again.");
                    track.emailFailed(seasonName, res.status);
                  }
                } catch (err) {
                  setEmailError("Something went wrong. Try again.");
                  track.emailFailed(seasonName, "network_error");
                } finally {
                  setEmailSubmitting(false);
                }
              }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input id="email-input" type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="flex-1 px-5 py-3.5 rounded-full outline-none transition-all duration-200 focus:ring-2"
                  style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", border: "1.5px solid var(--border-light)", background: "white", color: "var(--text-primary)" }} />
                <button id="email-submit" type="submit" className="px-7 py-3.5 rounded-full transition-all duration-200 hover:opacity-90"
                  disabled={emailSubmitting}
                  style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", fontWeight: 500, letterSpacing: "0.03em", background: "var(--text-primary)", color: "white", border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>
                  {emailSubmitting ? "Sending..." : "Sign Me Up"}
                </button>
              </form>
              {emailError && <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.8rem", color: "#C25A38", marginTop: 8, textAlign: "center" }}>{emailError}</p>}
            </>
          ) : (
            <div className="animate-fade-in-up">
              <div className="text-3xl mb-3" style={{ color: "var(--accent-gold)" }}>{"\u2713"}</div>
              <h3 className="mb-2" style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "1.3rem", fontWeight: 600, color: "var(--text-primary)" }}>You&apos;re in!</h3>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 300 }}>
                We&apos;ll keep you posted on new quizzes and shade updates.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Cross-sell to Vibe DNA */}
      <section className="px-6 py-16 text-center" style={{ background: "rgba(255,255,255,0.5)" }}>
        <span className="text-xs tracking-[0.3em] uppercase mb-4 block" style={{ color: "var(--accent-gold)", fontFamily: "var(--font-inter)", fontWeight: 600 }}>
          Also from Allele
        </span>
        <h2 className="mb-4" style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(1.4rem, 3.5vw, 2rem)", fontWeight: 500, color: "var(--text-primary)" }}>
          Know your <span style={{ fontStyle: "italic" }}>aesthetic archetype</span>?
        </h2>
        <p className="mb-8" style={{ fontFamily: "var(--font-inter)", fontSize: "0.95rem", color: "var(--text-muted)", fontWeight: 300 }}>
          Take the Vibe DNA quiz to discover your style identity.
        </p>
        <a href="/vibe">
          <button className="btn-primary" style={{ borderRadius: "100px", padding: "16px 48px", fontSize: "14px" }}>
            Take Vibe DNA Quiz
          </button>
        </a>
      </section>

      {/* === Retake Quiz Button === */}
      <div className="text-center pb-16">
        <button
          id="retake-quiz-btn"
          onClick={handleRetakeQuiz}
          className="retake-quiz-btn"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 8C2 4.686 4.686 2 8 2C11.314 2 14 4.686 14 8C14 11.314 11.314 14 8 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M2 4V8H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Retake the Quiz
        </button>
      </div>

      <footer className="px-6 py-8 text-center" style={{ borderTop: "1px solid var(--border-light)" }}>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.05em" }}>
          &copy; {new Date().getFullYear()} Allele &middot; Shade DNA &middot;{" "}
          <a href="/disclosure" style={{ color: "var(--text-muted)", textDecoration: "underline" }}>Affiliate Disclosure</a>
          {" "}&middot;{" "}
          <a href="/privacy" style={{ color: "var(--text-muted)", textDecoration: "underline" }}>Privacy</a>
        </p>
      </footer>
    </main>
  );
}
