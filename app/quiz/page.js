"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SEASONS } from "@/lib/handoffSeasons";
import {
  QUIZ,
  scoreFromAnswers,
  topSeasons,
  confidence,
  narrowingState,
  SEASON_IDS,
} from "@/lib/handoffQuiz";
import { track } from "@/lib/analytics";
import "./quiz.css";

function Nav() {
  return (
    <nav className="qz-nav">
      <div className="qz-nav-inner">
        <Link href="/" className="qz-nav-brand">allele</Link>
        <div className="qz-nav-meta">
          <span>Shade DNA</span>
          <span className="qz-dot" />
          <span>Chapter 01 / 02</span>
        </div>
        <Link href="/results?season=True+Autumn" className="qz-nav-skip">
          Skip to a sample result →
        </Link>
      </div>
    </nav>
  );
}

function TopBar({ step, total, narrow }) {
  return (
    <div className="qz-topbar">
      <div className="qz-topbar-inner">
        <div className="qz-topbar-left">
          <span className="qz-topbar-label">Question</span>
          <span className="qz-topbar-num">
            <strong>{String(step + 1).padStart(2, "0")}</strong> / {total}
          </span>
        </div>
        <div className="qz-topbar-track">
          <div className="qz-topbar-fill" style={{ width: `${(step / total) * 100}%` }} />
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`qz-tick${i < step ? " done" : ""}${i === step ? " active" : ""}`}
              style={{ left: `${(i / (total - 1)) * 100}%` }}
            />
          ))}
        </div>
        <div className="qz-topbar-right">
          <span className="qz-topbar-label">Status</span>
          <div className={`qz-narrow qz-narrow-${narrow.phase}`}>
            <span className={`qz-narrow-dot qz-narrow-dot-${narrow.phase}`} />
            <span className="qz-narrow-label">{narrow.label}</span>
          </div>
        </div>
      </div>
      {narrow.subSeasonPair && (
        <div className="qz-topbar-subrow">
          <span className="qz-topbar-sublabel">Between</span>
          <span className="qz-topbar-pair">
            <em>{narrow.subSeasonPair.a}</em>
            <span className="qz-topbar-pair-vs">vs</span>
            <em>{narrow.subSeasonPair.b}</em>
          </span>
        </div>
      )}
    </div>
  );
}

function AxisMeter({ label, leftLabel, rightLabel, value, color, answered }) {
  const pct = ((Math.max(-1, Math.min(1, value)) + 1) / 2) * 100;
  const filled = answered > 0;
  return (
    <div className={`qz-meter${filled ? " filled" : " empty"}`}>
      <div className="qz-meter-head">
        <span className="qz-meter-label">{label}</span>
        <span className="qz-meter-val">
          {!filled ? (
            "·"
          ) : value > 0.15 ? (
            rightLabel
          ) : value < -0.15 ? (
            leftLabel
          ) : (
            <em>Neutral</em>
          )}
        </span>
      </div>
      <div className="qz-meter-scale">
        <span className="qz-meter-endL">{leftLabel}</span>
        <div className="qz-meter-track">
          <div className="qz-meter-axis" />
          <div
            className="qz-meter-dot"
            style={{
              left: `${pct}%`,
              background: color,
              opacity: filled ? 1 : 0,
              transform: `translate(-50%, -50%) scale(${filled ? 1 : 0.6})`,
            }}
          />
        </div>
        <span className="qz-meter-endR">{rightLabel}</span>
      </div>
    </div>
  );
}

function SeasonsRail({ ranked, answered }) {
  const rankedIds = new Set(ranked.slice(0, 4).map((r) => r.id));
  return (
    <div className="qz-rail">
      <div className="qz-rail-head">
        <span className="qz-rail-label">Narrowing</span>
        <span className="qz-rail-count">
          {answered === 0
            ? "All 12 possible"
            : `${ranked.filter((r) => r.distance < 1.1).length || 1} still likely`}
        </span>
      </div>
      <div className="qz-rail-cells">
        {SEASON_IDS.map((id) => {
          const s = SEASONS[id];
          const isTop = rankedIds.has(id);
          const isLead = ranked[0]?.id === id && answered >= 3;
          // Round 3 fix #3: with zero answers, every season is identically possible.
          const neutral = answered === 0;
          const cls = neutral
            ? "neutral"
            : isTop
            ? "alive"
            : "faded";
          return (
            <div
              key={id}
              className={`qz-rail-cell ${cls}${!neutral && isLead ? " lead" : ""}`}
              title={s.name}
            >
              <div className="qz-rail-swatches">
                {s.palette.slice(0, 3).map((c, i) => (
                  <div key={i} style={{ background: c }} />
                ))}
              </div>
              <span className="qz-rail-name">{s.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Question({ q, step, onAnswer }) {
  return (
    <div className="qz-q" key={step}>
      <div className="qz-q-meta">
        <span className="qz-q-num">N° {String(step + 1).padStart(2, "0")}</span>
        <span className="qz-q-hair" />
        <span className="qz-q-sub-meta">{q.sub}</span>
      </div>
      <h2 className="qz-q-headline">{q.q}</h2>
      <div className="qz-options">
        {q.options.map((o) => (
          <button
            key={o.key + o.label}
            className="qz-option"
            onClick={() => onAnswer(o)}
          >
            {o.swatches && o.swatches.length > 1 ? (
              <span className="qz-option-swatches">
                {o.swatches.map((sw, si) => (
                  <span key={si} className="qz-option-swatch-mini" style={{ background: sw }} />
                ))}
              </span>
            ) : (
              <span
                className="qz-option-swatch"
                style={{ background: o.swatch || (o.swatches && o.swatches[0]) }}
              />
            )}
            <span className="qz-option-text">{o.label}</span>
            <span className="qz-option-arrow">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}

const AXIS_FLASH_THRESHOLDS = {
  u: { high: "Warmer undertone", low: "Cooler undertone" },
  d: { high: "Deeper", low: "Lighter" },
  c: { high: "Brighter", low: "Softer" },
};

const AXIS_WEIGHT_LOOKUP = {
  warm:  { u: 0.7 },
  cool:  { u: -0.7 },
  deep:  { d: 0.7 },
  fair:  { d: -0.8 },
  light: { d: -0.5 },
  "warm-deep":   { u: 0.5, d: 0.4 },
  "warm-bright": { u: 0.3, c: 0.5 },
  "warm-soft":   { u: 0.3, c: -0.3 },
  "warm-light":  { u: 0.4, d: -0.4 },
  "warm-red":    { u: 0.6, c: 0.3 },
  "cool-bright": { u: -0.4, c: 0.5 },
  "cool-deep":   { u: -0.4, d: 0.3 },
  "cool-soft":   { u: -0.3, c: -0.4 },
  "cool-light":  { u: -0.4, d: -0.4 },
  "high-contrast": { c: 0.4, d: 0.3 },
  dramatic: { c: 0.5, d: 0.4 },
  "low-contrast": { c: -0.4 },
  muted: { c: -0.5 },
  spring: { family: "spring" },
  summer: { family: "summer" },
  autumn: { family: "autumn" },
  winter: { family: "winter" },
};

function flashLabelForAnswer(key) {
  const w = AXIS_WEIGHT_LOOKUP[key] || {};
  if (w.u != null && Math.abs(w.u) > 0.3) return AXIS_FLASH_THRESHOLDS.u[w.u > 0 ? "high" : "low"];
  if (w.d != null && Math.abs(w.d) > 0.3) return AXIS_FLASH_THRESHOLDS.d[w.d > 0 ? "high" : "low"];
  if (w.c != null && Math.abs(w.c) > 0.3) return AXIS_FLASH_THRESHOLDS.c[w.c > 0 ? "high" : "low"];
  if (w.family) return `${w.family} season`;
  return "Noted";
}

export default function QuizPage() {
  const router = useRouter();
  const startedRef = useRef(false);
  const startTimeRef = useRef(null);
  const completedRef = useRef(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [flash, setFlash] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const score = useMemo(() => scoreFromAnswers(answers), [answers]);
  const ranked = useMemo(() => topSeasons(score, 12), [score]);
  const conf = Math.round(confidence(score, ranked) * 100);
  const narrow = useMemo(() => narrowingState(score, ranked), [score, ranked]);

  // Lifecycle: quizStarted, quizAbandoned
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    startTimeRef.current = Date.now();
    const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    track.quizStarted(params?.get("source") || "homepage");

    const handleBeforeUnload = () => {
      if (completedRef.current) return;
      const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
      track.quizAbandoned(step + 1, elapsed);
    };
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      }
      if (!completedRef.current && startTimeRef.current) {
        const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
        if (elapsed > 3) track.quizAbandoned(step + 1, elapsed);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const q = QUIZ[step];
  const lead = ranked[0];
  const complete = answers.length === QUIZ.length;

  const handleAnswer = (opt) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const newAnswers = [
      ...answers,
      {
        step,
        key: opt.key,
        label: opt.label,
        swatch: opt.swatch || (opt.swatches && opt.swatches[0]),
        swatches: opt.swatches,
      },
    ];
    setAnswers(newAnswers);
    track.questionAnswered(step + 1, q.q.slice(0, 60), opt.key);

    setFlash({ key: Date.now(), label: flashLabelForAnswer(opt.key) });

    setTimeout(() => {
      setFlash(null);
      if (step < QUIZ.length - 1) {
        setStep(step + 1);
      }
      setIsAnimating(false);
    }, 650);
  };

  const back = () => {
    if (step === 0) return;
    setStep(step - 1);
    setAnswers(answers.slice(0, -1));
  };

  const goToResult = () => {
    if (!lead) return;
    completedRef.current = true;
    const seasonName = SEASONS[lead.id]?.name || "True Autumn";
    track.quizCompleted({
      season: seasonName,
      undertone: SEASONS[lead.id]?.undertone,
      contrast: SEASONS[lead.id]?.chroma,
      value: SEASONS[lead.id]?.depth,
      chroma: SEASONS[lead.id]?.chroma,
    });
    router.push(`/results?season=${encodeURIComponent(seasonName)}`);
  };

  if (!q && !complete) return null;

  return (
    <main className="qz-shell">
      <Nav />
      <TopBar step={complete ? QUIZ.length : step} total={QUIZ.length} narrow={narrow} />

      <div className="qz-main">
        <div className="qz-stage">
          {!complete ? (
            <Question q={q} step={step} onAnswer={handleAnswer} />
          ) : (
            <div className="qz-complete">
              <div className="qz-q-meta">
                <span className="qz-q-num">Result</span>
                <span className="qz-q-hair" />
                <span className="qz-q-sub-meta">12 of 12</span>
              </div>
              <h2 className="qz-q-headline">Your shade is ready.</h2>
              <p className="qz-complete-body">
                Based on your answers, you&rsquo;re a <em>{lead?.name}</em>. We narrowed from 12 to 1 with <strong>{conf}% confidence</strong>.
                <br />
                <span className="qz-complete-hint">
                  Retake with natural daylight on bare skin for the sharpest read.
                </span>
              </p>
              <button className="qz-complete-cta" onClick={goToResult}>
                Reveal your Shade DNA <span>→</span>
              </button>
            </div>
          )}

          <div className="qz-back-row">
            {step > 0 && !complete && (
              <button className="qz-back" onClick={back}>← Back</button>
            )}
            {flash && (
              <div className="qz-flash-wrap">
                <div className="qz-flash" key={flash.key}>
                  <span className="qz-flash-label">+</span>
                  <span className="qz-flash-text">{flash.label}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <aside className="qz-aside">
          <div className="qz-aside-head">
            <span className="qz-aside-eyebrow">Live analysis</span>
            <span className="qz-aside-title">
              <em>
                {answers.length === 0
                  ? "Waiting"
                  : answers.length < 4
                  ? "Gathering"
                  : answers.length < 9
                  ? "Narrowing"
                  : "Converging"}
              </em>
            </span>
          </div>

          <div className="qz-meters">
            <AxisMeter
              label="Undertone"
              leftLabel="Cool"
              rightLabel="Warm"
              value={score.undertone}
              color={score.undertone > 0 ? "#C4A265" : "#8FA9C4"}
              answered={answers.length}
            />
            <AxisMeter
              label="Depth"
              leftLabel="Light"
              rightLabel="Deep"
              value={score.depth}
              color="#3A2817"
              answered={answers.length}
            />
            <AxisMeter
              label="Chroma"
              leftLabel="Soft"
              rightLabel="Bright"
              value={score.chroma}
              color={score.chroma > 0 ? "#E83F6F" : "#A8A89A"}
              answered={answers.length}
            />
          </div>

          <SeasonsRail ranked={ranked} answered={answers.length} />

          {answers.length >= 3 && !complete && lead && (
            <div className="qz-lead">
              <div className="qz-lead-head">
                <span className="qz-lead-label">Current frontrunner</span>
                <span className="qz-lead-conf">{conf}%</span>
              </div>
              <div className="qz-lead-card" style={{ "--accent": lead.accent }}>
                <div className="qz-lead-swatches">
                  {lead.palette.slice(0, 6).map((c, i) => (
                    <div key={i} className="qz-lead-swatch" style={{ background: c }} />
                  ))}
                </div>
                <div className="qz-lead-body">
                  <div className="qz-lead-family">· {lead.family} ·</div>
                  <div className="qz-lead-name">{lead.name}</div>
                </div>
              </div>
              {ranked[1] && (
                <div className="qz-lead-note">
                  Still distinguishing from <em>{ranked[1].name}</em>.
                </div>
              )}
            </div>
          )}

          {answers.length === 0 && (
            <div className="qz-empty-note">
              As you answer, we&rsquo;ll show how your coloring maps across three axes, and which of the twelve shades are still in play.
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
