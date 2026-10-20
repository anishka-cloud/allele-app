"use client";

import Link from "next/link";
import AlleleNav from "@/app/components/AlleleNav";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import { DenimResultMap } from "@/app/fit/FitVisuals";
import FitProductEdit from "./FitProductEdit";
import {
  FIT_STORAGE_KEY,
  answersFromSearchParams,
  buildFitNotes,
  calculateFitDna,
  hasCompleteFitAnswers,
} from "@/lib/fitDna.mjs";

export default function FitResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const revealedRef = useRef(false);
  const queryAnswers = useMemo(() => answersFromSearchParams(searchParams), [searchParams]);
  const [answers, setAnswers] = useState(() => hasCompleteFitAnswers(queryAnswers) ? queryAnswers : null);
  const [measurements, setMeasurements] = useState({ unit: "in" });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem(FIT_STORAGE_KEY) || "null");
    } catch {
      // The empty-state below provides a clear recovery path.
    }
    const storageTimer = window.setTimeout(() => {
      if (!answers && hasCompleteFitAnswers(saved?.answers)) setAnswers(saved.answers);
      if (saved?.measurements && typeof saved.measurements === "object") setMeasurements(saved.measurements);
    }, 0);
    return () => window.clearTimeout(storageTimer);
  }, [answers]);

  const result = useMemo(() => answers ? calculateFitDna(answers) : null, [answers]);

  useEffect(() => {
    if (!result || revealedRef.current) return;
    revealedRef.current = true;
    trackEvent("result_revealed", {
      quiz: "fit_dna",
      rise: result.rise,
      leg: result.leg,
      length: result.length,
      fabric: result.fabric,
      fit_issue: result.fitIssue,
    });
  }, [result]);

  const copyNotes = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(buildFitNotes(result, measurements));
      setCopied(true);
      trackEvent("fit_notes_copied", {
        quiz: "fit_dna",
        rise: result.rise,
        leg: result.leg,
      });
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const retake = () => {
    try { localStorage.setItem(FIT_STORAGE_KEY, JSON.stringify({ answers: {}, currentQuestion: 0, measurements })); } catch {}
    router.push("/fit/quiz");
  };

  if (!result) {
    return (
      <main className="fit-results fit-results-empty">
        <p>Fit DNA needs your nine answers to make a starting point.</p>
        <Link href="/fit/quiz" className="fit-primary-link">Take Fit DNA <span aria-hidden="true">→</span></Link>
      </main>
    );
  }

  const axes = [
    ["Rise", result.labels.rise],
    ["Leg", result.labels.leg],
    ["Length", result.labels.length],
    ["Denim feel", result.labels.fabric],
  ];
  const measurementRows = [
    ["Natural waist", measurements.waist],
    ["Full hip / seat", measurements.hip],
    ["Best-fitting inseam", measurements.inseam],
    ["Comfortable front rise", measurements.frontRise],
  ].filter(([, value]) => Boolean(value));
  const measurementUnit = measurements.unit === "cm" ? "cm" : "in";

  return (
    <main className="fit-results">
      <AlleleNav current="fit" />

      <section className="fit-result-hero">
        <div className="fit-result-heading">
          <p>Fit DNA · Your denim starting point</p>
          <h1>{result.headline}</h1>
          <p className="fit-result-summary">{result.summary}</p>
          <a href="#jeans" className="fit-primary-link fit-jeans-jump">See jeans to try <span aria-hidden="true">↓</span></a>
        </div>
        <aside className="fit-result-ticket" aria-label="Your Fit DNA reference card">
          <div className="fit-ticket-head">
            <span>Your fit, at a glance</span>
            <span>Vol. II</span>
          </div>
          <dl>
            {axes.map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
          <p>Bring this logic—not a body-type rule—into the fitting room.</p>
        </aside>
      </section>

      <FitProductEdit result={result} measurements={measurements} />

      <section className="fit-proportion-map" aria-labelledby="fit-map-title">
        <div className="fit-map-copy">
          <p>Your proportion map</p>
          <h2 id="fit-map-title">What to look for in the fitting room.</h2>
          <p>Your answers describe how clothes meet you. Use these clues to compare waistbands, leg room and fabric when you try a pair.</p>
        </div>
        <DenimResultMap result={result} />
        <div className="fit-signal-list">
          {result.signals.map((signal) => (
            <article key={signal.id}>
              <div className="fit-signal-heading"><span>{signal.label}</span><strong>{signal.value}</strong></div>
              <div className="fit-signal-track" aria-label={`${signal.label}: ${signal.value}`}>
                <i style={{ left: `${signal.position}%` }} />
              </div>
              <div className="fit-signal-ends"><span>{signal.low}</span><span>{signal.high}</span></div>
              <p>{signal.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="fit-axis-grid" aria-label="Your four Fit DNA recommendations">
        {axes.map(([label, value], index) => (
          <article key={label}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{label}</p>
            <h2>{value}</h2>
          </article>
        ))}
      </section>

      <section className="fit-result-detail">
        <article className="fit-why">
          <p>Why Allele chose this</p>
          <h2>Your answers, translated into a starting point.</h2>
          <ul>
            {result.reasons.map((reason) => <li key={reason}>{reason}</li>)}
          </ul>
        </article>

        <aside className="fit-watchout">
          <p>Watch for this in the fitting room</p>
          <h2>Fit note</h2>
          <p>{result.watchout}</p>
          <div>
            <strong>Length strategy</strong>
            <span>{result.lengthGuidance}</span>
          </div>
        </aside>
      </section>

      <section className="fit-shopping-summary">
        <div>
          <p>Take this shopping</p>
          <h2>Save the fit logic before you open another tab.</h2>
        </div>
        <div className="fit-shopping-note">
          {axes.map(([label, value]) => (
            <p key={label}><span>{label}</span><strong>{value}</strong></p>
          ))}
          <p className="fit-note-row"><span>Fit note</span><strong>{result.watchout}</strong></p>
          {measurementRows.length > 0 && (
            <div className="fit-saved-measurements">
              <h3>My measurements</h3>
              {measurementRows.map(([label, value]) => (
                <p key={label}><span>{label}</span><strong>{value} {measurementUnit}</strong></p>
              ))}
            </div>
          )}
        </div>
        <div className="fit-result-actions">
          <button type="button" className="fit-copy-button" onClick={copyNotes}>{copied ? "Copied" : "Copy my fit notes"}</button>
          <button type="button" className="fit-retake-button" onClick={retake}>Retake Fit DNA</button>
        </div>
      </section>

      <footer className="fit-disclaimer">
        <p>Fit DNA is a starting point, not a rulebook. The jean that feels best on your body wins.</p>
      </footer>
    </main>
  );
}
