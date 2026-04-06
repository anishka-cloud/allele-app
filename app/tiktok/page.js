"use client";

import { useState } from "react";
import { seasons } from "@/lib/seasonData";

/* ───────────────────────── data ───────────────────────── */

const pickOnePairs = [
  { a: "Clear Spring", b: "Soft Summer", hook: "Which palette makes you feel something?" },
  { a: "True Autumn", b: "True Winter", hook: "Warm & earthy or cool & bold?" },
  { a: "Dark Autumn", b: "Bright Winter", hook: "Deep & rich or vivid & electric?" },
  { a: "Light Spring", b: "Light Summer", hook: "Warm pastels or cool pastels?" },
  { a: "True Spring", b: "True Summer", hook: "Golden warmth or cool elegance?" },
  { a: "Soft Autumn", b: "Dark Winter", hook: "Muted earth or jewel-toned drama?" },
];

const todayYearsOld = [
  {
    fact: "There are 12 color seasons, not 4.",
    sub: "Spring, Summer, Autumn & Winter each have 3 sub-seasons based on your undertone, depth & clarity.",
    emoji: "🤯",
  },
  {
    fact: "Your vein color reveals your undertone.",
    sub: "Green veins = warm. Blue/purple veins = cool. Both = neutral. This changes which makeup shades actually work on you.",
    emoji: "💡",
  },
  {
    fact: "Gold vs silver jewelry isn't a preference — it's science.",
    sub: "If gold flatters you more, you're likely warm-toned. Silver? Cool-toned. Both? You're neutral and lucky.",
    emoji: "✨",
  },
  {
    fact: "Wearing the wrong blush can make you look tired.",
    sub: "A cool-toned person in warm peachy blush looks washed out. A warm-toned person in cool pink looks grey. Your season fixes this.",
    emoji: "😳",
  },
  {
    fact: "Your 'best colors' are based on 4 things.",
    sub: "Undertone (warm/cool), depth (light/dark), chroma (bright/muted), and contrast between your features.",
    emoji: "🎨",
  },
  {
    fact: "The 'wear black with everything' advice doesn't work for everyone.",
    sub: "True black only flatters Winter seasons. Springs & Autumns look better in charcoal, espresso, or navy.",
    emoji: "🖤",
  },
];

const threeSignsData = [
  {
    season: "Dark Autumn",
    color: "#8B4513",
    signs: [
      "Gold jewelry always wins over silver",
      "You reach for burgundy, olive & chocolate",
      "Pastels and neons wash you out completely",
    ],
  },
  {
    season: "Bright Winter",
    color: "#FF1493",
    signs: [
      "You can pull off bold colors most people can't",
      "Silver and platinum are your metals",
      "Muted & earthy tones make you look tired",
    ],
  },
  {
    season: "Soft Summer",
    color: "#C9929D",
    signs: [
      "Bright colors overwhelm your features",
      "You look amazing in dusty rose & sage",
      "High-contrast outfits feel 'off' on you",
    ],
  },
  {
    season: "True Spring",
    color: "#FFD700",
    signs: [
      "Warm corals make your skin glow",
      "You tan easily and look golden in summer",
      "Cool-toned makeup always looks wrong",
    ],
  },
  {
    season: "True Winter",
    color: "#CC0000",
    signs: [
      "You look incredible in pure black & white",
      "Red lipstick is your superpower",
      "Earthy or muted tones drain your face",
    ],
  },
  {
    season: "Light Spring",
    color: "#FFB6C1",
    signs: [
      "Pastels light you up from within",
      "Heavy dark makeup looks costume-y on you",
      "Peach blush is your holy grail",
    ],
  },
];

const captions = {
  pickOne: [
    "Which set are you? 👀 Your gut answer = your season. Link in bio to find out for real\n\n#colorseason #coloranalysis #makeupquiz #seasonalcoloranalysis #colortheory #beautytok #makeuptok #personalcolor #undertone #shadedna",
    "Be honest — left or right? 💫 Comment your pick. Quiz link in bio\n\n#colorseason #coloranalysis #makeupquiz #seasonalcoloranalysis #beautyhack #beautytok #whichone #colorpalette #shadedna",
    "One of these is YOUR palette. Which one pulls you in? Link in bio → 2 min quiz\n\n#colorseason #coloranalysis #makeupquiz #colorpalette #beautytok #personalcolor #shadedna #glowup",
  ],
  todayYearsOld: [
    "I was today years old when I learned this 🤯 Did you know?? Link in bio to find your season\n\n#todayyearsold #colorscience #beautyhack #beautytok #makeuptips #coloranalysis #seasonalcolor #shadedna #themoreyouknow",
    "Why did nobody teach us this in school 😭 Link in bio for the 2-min quiz\n\n#todayyearsold #beautyscience #colortheory #beautytok #makeuptok #coloranalysis #shadedna #beautyhacks",
  ],
  threeSigns: [
    "Are you a {season}? 👀 3 signs you might be. Take the quiz → link in bio\n\n#colorseason #{seasonTag} #coloranalysis #seasonalcoloranalysis #beautytok #makeuptok #personalcolor #shadedna",
    "POV: you just realized you've been a {season} this whole time 😳 Link in bio\n\n#colorseason #{seasonTag} #coloranalysis #beautytok #makeuptok #shadedna #colorpalette #glowup",
  ],
};

/* ───────────────────────── components ───────────────────────── */

function SlideWrapper({ children, bg = "#FFFBF7" }) {
  return (
    <div
      style={{
        width: 375,
        height: 667,
        background: bg,
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
        flexShrink: 0,
        boxShadow: "0 4px 30px rgba(0,0,0,0.10)",
      }}
    >
      {children}
    </div>
  );
}

function PaletteColumn({ seasonName, colors }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, flex: 1 }}>
      <p
        style={{
          fontFamily: "var(--font-playfair)",
          fontStyle: "italic",
          fontSize: 16,
          fontWeight: 600,
          color: "#1A1A1A",
          textAlign: "center",
          margin: 0,
        }}
      >
        {seasonName}
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {colors.map((c, i) => (
          <div
            key={i}
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: c,
              boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function PickOneSlide({ pair, index }) {
  const sA = seasons[pair.a];
  const sB = seasons[pair.b];

  return (
    <SlideWrapper bg="linear-gradient(180deg, #FFFBF7 0%, #F5EDE3 100%)">
      <div style={{ padding: "40px 24px 24px", display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Hook */}
        <p
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: 26,
            fontWeight: 700,
            fontStyle: "italic",
            color: "#1A1A1A",
            textAlign: "center",
            lineHeight: 1.25,
            margin: "0 0 8px",
          }}
        >
          {pair.hook}
        </p>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 13,
            color: "#8A8A8A",
            textAlign: "center",
            margin: "0 0 28px",
            letterSpacing: "0.02em",
          }}
        >
          your gut answer = your color season
        </p>

        {/* VS layout */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flex: 1, alignItems: "flex-start" }}>
          <PaletteColumn seasonName={pair.a} colors={sA.bestColors} />
          <div
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 13,
              fontWeight: 700,
              color: "#C4A265",
              alignSelf: "center",
              letterSpacing: "0.1em",
            }}
          >
            VS
          </div>
          <PaletteColumn seasonName={pair.b} colors={sB.bestColors} />
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", paddingTop: 16, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 11,
              color: "#8A8A8A",
              margin: 0,
              letterSpacing: "0.05em",
            }}
          >
            ALLELE · SHADE DNA
          </p>
        </div>
      </div>
    </SlideWrapper>
  );
}

function TodayYearsOldSlide({ item }) {
  return (
    <SlideWrapper bg="linear-gradient(180deg, #1A1A1A 0%, #2A2A2A 100%)">
      <div
        style={{
          padding: "48px 28px 24px",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
        }}
      >
        {/* Emoji */}
        <p style={{ fontSize: 48, textAlign: "center", margin: "0 0 20px" }}>{item.emoji}</p>

        {/* Label */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 12,
            fontWeight: 600,
            color: "#C4A265",
            textAlign: "center",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            margin: "0 0 16px",
          }}
        >
          I was today years old
        </p>

        {/* Main fact */}
        <p
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: 30,
            fontWeight: 700,
            fontStyle: "italic",
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.3,
            margin: "0 0 20px",
          }}
        >
          {item.fact}
        </p>

        {/* Sub text */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 14,
            color: "rgba(255,255,255,0.65)",
            textAlign: "center",
            lineHeight: 1.6,
            margin: "0 0 auto",
          }}
        >
          {item.sub}
        </p>

        {/* Footer */}
        <div style={{ textAlign: "center", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 11,
              color: "rgba(255,255,255,0.35)",
              margin: 0,
              letterSpacing: "0.05em",
            }}
          >
            ALLELE · SHADE DNA
          </p>
        </div>
      </div>
    </SlideWrapper>
  );
}

function ThreeSignsSlide({ item }) {
  return (
    <SlideWrapper bg={`linear-gradient(180deg, #FFFBF7 0%, ${item.color}18 100%)`}>
      <div style={{ padding: "40px 28px 24px", display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Label */}
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 12,
            fontWeight: 600,
            color: item.color,
            textAlign: "center",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            margin: "0 0 12px",
          }}
        >
          3 signs you&apos;re a
        </p>

        {/* Season name */}
        <p
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: 34,
            fontWeight: 700,
            fontStyle: "italic",
            color: "#1A1A1A",
            textAlign: "center",
            margin: "0 0 12px",
          }}
        >
          {item.season}
        </p>

        {/* Palette strip */}
        <div
          style={{
            display: "flex",
            gap: 4,
            justifyContent: "center",
            margin: "0 0 32px",
          }}
        >
          {seasons[item.season].bestColors.slice(0, 6).map((c, i) => (
            <div
              key={i}
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                background: c,
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              }}
            />
          ))}
        </div>

        {/* The 3 signs */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
          {item.signs.map((sign, i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: item.color,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-playfair)",
                  fontWeight: 700,
                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 17,
                  color: "#1A1A1A",
                  lineHeight: 1.5,
                  margin: 0,
                  paddingTop: 6,
                }}
              >
                {sign}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            textAlign: "center",
            padding: "16px 0 0",
            borderTop: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 13,
              fontWeight: 500,
              color: item.color,
              margin: "0 0 4px",
            }}
          >
            Find out for sure → 2 min quiz
          </p>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 11,
              color: "#8A8A8A",
              margin: 0,
              letterSpacing: "0.05em",
            }}
          >
            ALLELE · SHADE DNA
          </p>
        </div>
      </div>
    </SlideWrapper>
  );
}

function CaptionBox({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <div
      style={{
        background: "#F8F6F3",
        borderRadius: 10,
        padding: "12px 14px",
        fontSize: 13,
        fontFamily: "var(--font-inter)",
        color: "#4A4A4A",
        lineHeight: 1.6,
        whiteSpace: "pre-wrap",
        position: "relative",
        cursor: "pointer",
        border: copied ? "1.5px solid #C4A265" : "1.5px solid transparent",
        transition: "border 0.2s",
      }}
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
    >
      {text}
      <span
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          fontSize: 11,
          color: copied ? "#C4A265" : "#8A8A8A",
          fontWeight: 600,
        }}
      >
        {copied ? "Copied!" : "Tap to copy"}
      </span>
    </div>
  );
}

/* ───────────────────────── page ───────────────────────── */

const tabs = ["Pick One", "Facts", "3 Signs"];

export default function TikTokPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-primary)",
        paddingBottom: 60,
      }}
    >
      {/* Header */}
      <div style={{ padding: "40px 20px 20px", textAlign: "center" }}>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 11,
            fontWeight: 600,
            color: "#C4A265",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            margin: "0 0 8px",
          }}
        >
          TikTok Content Kit
        </p>
        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: 28,
            fontWeight: 700,
            fontStyle: "italic",
            color: "#1A1A1A",
            margin: "0 0 6px",
          }}
        >
          Screenshot &amp; Post
        </h1>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 14,
            color: "#8A8A8A",
            margin: 0,
          }}
        >
          Open on your phone · screenshot each slide · drop into CapCut
        </p>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 8,
          padding: "0 20px 24px",
        }}
      >
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 13,
              fontWeight: activeTab === i ? 600 : 400,
              color: activeTab === i ? "#FFFBF7" : "#4A4A4A",
              background: activeTab === i ? "#1A1A1A" : "#F0ECE6",
              border: "none",
              borderRadius: 20,
              padding: "8px 18px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ─── Pick One Tab ─── */}
      {activeTab === 0 && (
        <div style={{ padding: "0 20px" }}>
          <div style={{ maxWidth: 500, margin: "0 auto" }}>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 13,
                color: "#8A8A8A",
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              {pickOnePairs.length} slides · Screenshot each, add trending sound in CapCut
            </p>

            {/* Captions */}
            <div style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 10 }}>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#1A1A1A",
                  margin: "0 0 4px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Captions (tap to copy)
              </p>
              {captions.pickOne.map((c, i) => (
                <CaptionBox key={i} text={c} />
              ))}
            </div>

            {/* Slides */}
            <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "center" }}>
              {pickOnePairs.map((pair, i) => (
                <PickOneSlide key={i} pair={pair} index={i} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── Facts Tab ─── */}
      {activeTab === 1 && (
        <div style={{ padding: "0 20px" }}>
          <div style={{ maxWidth: 500, margin: "0 auto" }}>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 13,
                color: "#8A8A8A",
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              {todayYearsOld.length} slides · Dark background = high contrast on feed
            </p>

            {/* Captions */}
            <div style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 10 }}>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#1A1A1A",
                  margin: "0 0 4px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Captions (tap to copy)
              </p>
              {captions.todayYearsOld.map((c, i) => (
                <CaptionBox key={i} text={c} />
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "center" }}>
              {todayYearsOld.map((item, i) => (
                <TodayYearsOldSlide key={i} item={item} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── 3 Signs Tab ─── */}
      {activeTab === 2 && (
        <div style={{ padding: "0 20px" }}>
          <div style={{ maxWidth: 500, margin: "0 auto" }}>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 13,
                color: "#8A8A8A",
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              {threeSignsData.length} slides · One per season, rotate through over time
            </p>

            {/* Captions */}
            <div style={{ marginBottom: 24, display: "flex", flexDirection: "column", gap: 10 }}>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#1A1A1A",
                  margin: "0 0 4px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Captions (tap to copy)
              </p>
              {captions.threeSigns.map((c, i) => (
                <CaptionBox key={i} text={c.replace(/\{season\}/g, "[Season Name]").replace(/\{seasonTag\}/g, "seasonname")} />
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "center" }}>
              {threeSignsData.map((item, i) => (
                <ThreeSignsSlide key={i} item={item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
