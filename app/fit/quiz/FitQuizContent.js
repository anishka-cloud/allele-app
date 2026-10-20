"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { track, trackEvent } from "@/lib/analytics";
import HelixProgress from "@/app/components/HelixProgress";
import "@/app/components/allele-nav.css";
import { FitChoiceVisual, FitLivePreview, FitTrendNote, choiceHints } from "@/app/fit/FitVisuals";
import { FitProductEmbed, FitProductReference, FitAffiliateDisclosure } from "@/app/fit/FitProductReference";
import { getFitStyleExample } from "@/lib/fitStyleExamples.mjs";
import {
  FIT_STORAGE_KEY,
  answersToSearchParams,
  calculateFitDna,
  fitQuestions,
} from "@/lib/fitDna.mjs";

const EMPTY_MEASUREMENTS = { unit: "in", inseam: "", frontRise: "", waist: "", hip: "" };

function saveProgress(answers, currentQuestion, measurements) {
  try {
    localStorage.setItem(FIT_STORAGE_KEY, JSON.stringify({ answers, currentQuestion, measurements }));
  } catch {
    // Query parameters still preserve the completed result if storage is unavailable.
  }
}

export default function FitQuizContent() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [measurements, setMeasurements] = useState(EMPTY_MEASUREMENTS);
  const [hydrated, setHydrated] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const currentRef = useRef(0);
  const completedRef = useRef(false);
  const startTimeRef = useRef(null);
  const headingRef = useRef(null);

  const question = fitQuestions[currentQuestion];

  useEffect(() => {
    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem(FIT_STORAGE_KEY) || "null");
    } catch {
      // Start clean if old browser data cannot be read.
    }
    const hydrationTimer = window.setTimeout(() => {
      if (saved?.answers && typeof saved.answers === "object") setAnswers(saved.answers);
      if (saved?.measurements && typeof saved.measurements === "object") {
        setMeasurements({ ...EMPTY_MEASUREMENTS, ...saved.measurements });
      }
      if (Number.isInteger(saved?.currentQuestion)) {
        const safeQuestion = Math.min(Math.max(saved.currentQuestion, 0), fitQuestions.length - 1);
        setCurrentQuestion(safeQuestion);
        currentRef.current = safeQuestion;
      }
      setHydrated(true);
    }, 0);
    startTimeRef.current = Date.now();
    track.quizStarted("fit_dna");

    return () => {
      window.clearTimeout(hydrationTimer);
      if (completedRef.current || !startTimeRef.current) return;
      const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
      if (elapsed > 3) {
        trackEvent("quiz_abandoned", {
          quiz: "fit_dna",
          last_question: currentRef.current + 1,
          time_on_quiz_sec: elapsed,
        });
      }
    };
  }, []);

  const selectAnswer = useCallback((value) => {
    if (transitioning) return;
    const nextAnswers = { ...answers, [question.id]: value };
    setAnswers(nextAnswers);
    track.questionAnswered(currentQuestion + 1, `fit_${question.id}`, value);
    saveProgress(nextAnswers, currentQuestion, measurements);
  }, [answers, currentQuestion, measurements, question.id, transitioning]);

  const continueQuiz = useCallback(() => {
    if (transitioning || !answers[question.id]) return;
    setTransitioning(true);

    const isLast = currentQuestion === fitQuestions.length - 1;
    saveProgress(answers, isLast ? currentQuestion : currentQuestion + 1, measurements);

    window.setTimeout(() => {
      if (isLast) {
        const result = calculateFitDna(answers);
        completedRef.current = true;
        track.quizCompleted({
          quiz: "fit_dna",
          rise: result.rise,
          leg: result.leg,
          length: result.length,
          fabric: result.fabric,
          fit_issue: result.fitIssue,
        });
        router.push(`/fit/results?${answersToSearchParams(answers).toString()}`);
        return;
      }
      const nextQuestion = currentQuestion + 1;
      currentRef.current = nextQuestion;
      setCurrentQuestion(nextQuestion);
      setTransitioning(false);
      window.requestAnimationFrame(() => {
        headingRef.current?.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: "instant" });
      });
    }, 260);
  }, [answers, currentQuestion, measurements, question.id, router, transitioning]);

  const goBack = useCallback(() => {
    if (currentQuestion === 0 || transitioning) return;
    const previous = currentQuestion - 1;
    currentRef.current = previous;
    setCurrentQuestion(previous);
    saveProgress(answers, previous, measurements);
    track.quizBackClicked(currentQuestion + 1);
    window.requestAnimationFrame(() => headingRef.current?.focus({ preventScroll: true }));
  }, [answers, currentQuestion, measurements, transitioning]);

  const updateMeasurement = useCallback((field, value) => {
    let nextMeasurements;
    if (field === "unit") {
      const factor = value === measurements.unit ? 1 : value === "cm" ? 2.54 : 1 / 2.54;
      nextMeasurements = { ...measurements, unit: value };
      for (const key of ["inseam", "frontRise", "waist", "hip"]) {
        if (measurements[key] && Number.isFinite(Number(measurements[key]))) {
          nextMeasurements[key] = String(Math.round(Number(measurements[key]) * factor * 100) / 100);
        }
      }
    } else {
      const parts = value.replace(/[^0-9.]/g, "").split(".");
      const safeValue = (parts.length > 1 ? `${parts[0]}.${parts.slice(1).join("")}` : parts[0]).slice(0, 6);
      nextMeasurements = { ...measurements, [field]: safeValue };
    }
    setMeasurements(nextMeasurements);
    saveProgress(answers, currentQuestion, nextMeasurements);
  }, [answers, currentQuestion, measurements]);

  if (!hydrated) {
    return <main className="fit-quiz-shell"><div className="fit-loading">Preparing your fit questions…</div></main>;
  }

  return (
    <main className="fit-quiz-shell">
      <header className="fit-quiz-header">
        <Link href="/fit" className="fit-wordmark" aria-label="Fit DNA home">all<em>e</em>le</Link>
        <span>Fit DNA · Denim Edition</span>
        <span>{String(currentQuestion + 1).padStart(2, "0")} / {String(fitQuestions.length).padStart(2, "0")}</span>
      </header>

      <div className="fit-progress" aria-label={`Question ${currentQuestion + 1} of ${fitQuestions.length}`}>
        <HelixProgress total={fitQuestions.length} done={currentQuestion} active={currentQuestion} accent="#263b50" />
      </div>

      <section className={`fit-question fit-question-${question.id}${transitioning ? " is-transitioning" : ""}`}>
        <div className="fit-question-main" key={question.id}>
          <p className="fit-question-instruction">{currentQuestion < 4 ? "Getting to know your fit" : "Finding your favorite details"} · {currentQuestion + 1} of {fitQuestions.length}</p>
          <h1 ref={headingRef} tabIndex={-1}>{question.question}</h1>
          <p className="fit-question-prompt">{question.id === "silhouette" ? "Pick the shape you like. These are real jeans you can inspect—not personalized matches yet." : "Choose what feels closest. Tap another card to compare."}</p>
          {question.id === "silhouette" && <FitAffiliateDisclosure />}
          <div className={`fit-options${question.options.length > 5 ? " fit-options-many" : ""}`} role="group" aria-label={question.question}>
            {question.options.map((option) => {
              const selected = answers[question.id] === option.value;
              const openChoice = ["unsure", "choose", "predictable", "fit", "mixed"].includes(option.value);
              const example = question.id === "silhouette" ? getFitStyleExample(option.value) : null;
              return (
                <div key={option.value} className={`fit-answer-card${openChoice ? " fit-answer-card-open" : ""}${selected ? " is-selected" : ""}`}>
                {example && <FitProductEmbed product={example} />}
                <button
                  type="button"
                  className={`fit-option${selected ? " is-selected" : ""}${openChoice ? " fit-option-open" : ""}`}
                  aria-pressed={selected}
                  disabled={transitioning}
                  onClick={() => selectAnswer(option.value)}
                >
                  {!example && <span className="fit-choice-art"><FitChoiceVisual questionId={question.id} value={option.value}/></span>}
                  <span className="fit-choice-copy"><strong>{option.label}</strong><small>{choiceHints[question.id]?.[option.value]}</small></span>
                  <i aria-hidden="true">{selected ? "✓" : ""}</i>
                </button>
                {example && <FitProductReference product={example} />}
                </div>
              );
            })}
          </div>
          <p className="fit-visual-caption">{question.id === "silhouette" ? "Use the shape button below each shopping card to choose your answer. The photographed model’s fit does not predict yours." : question.id === "waist_hip" ? "Illustrative comparisons, not measured proportions." : "Answer-card illustrations are generated guidance—not product photos or exact fit predictions."}</p>
          {question.id === "silhouette" && <FitTrendNote />}
          {question.help && (
            <details className="fit-question-help">
              <summary>Not sure? Use a quick fit check <span aria-hidden="true">+</span></summary>
              <div className="fit-help-body">
                <h2>{question.help.title}</h2>
                <p>{question.help.body}</p>
                <p className="fit-help-note">{question.help.note}</p>
                {question.help.fields && (
                  <div className="fit-measure-fields">
                    <div className="fit-unit-toggle" role="group" aria-label="Measurement unit">
                      <button type="button" className={measurements.unit === "in" ? "is-active" : ""} onClick={() => updateMeasurement("unit", "in")}>in</button>
                      <button type="button" className={measurements.unit === "cm" ? "is-active" : ""} onClick={() => updateMeasurement("unit", "cm")}>cm</button>
                    </div>
                    {question.help.fields.map((field) => (
                      <label key={field.id}>
                        <span>{field.label} <em>optional</em></span>
                        <div>
                          <input
                            type="text"
                            inputMode="decimal"
                            value={measurements[field.id] || ""}
                            onChange={(event) => updateMeasurement(field.id, event.target.value)}
                            placeholder="—"
                            aria-label={`${field.label} in ${measurements.unit === "cm" ? "centimeters" : "inches"}`}
                          />
                          <b>{measurements.unit}</b>
                        </div>
                      </label>
                    ))}
                    <p>Saved in this browser and included in your shopping note. Optional at every step.</p>
                  </div>
                )}
              </div>
            </details>
          )}
        </div>
        {question.id !== "silhouette" && <FitLivePreview answers={answers} questionId={question.id} selected={answers[question.id]} />}
      </section>

      <footer className="fit-quiz-footer">
        <button type="button" onClick={goBack} disabled={currentQuestion === 0 || transitioning}>
          <span aria-hidden="true">←</span> Back
        </button>
        <p>{answers[question.id] ? "Happy with this choice?" : "Choose a card to continue"}</p>
        <button className="fit-continue" type="button" onClick={continueQuiz} disabled={!answers[question.id] || transitioning}>{currentQuestion === fitQuestions.length - 1 ? "See my fit & jeans" : "Continue"}<span aria-hidden="true">→</span></button>
      </footer>
    </main>
  );
}
