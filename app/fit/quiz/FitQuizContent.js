"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { track, trackEvent } from "@/lib/analytics";
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

  const question = fitQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / fitQuestions.length) * 100;

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
    setTransitioning(true);

    const isLast = currentQuestion === fitQuestions.length - 1;
    saveProgress(nextAnswers, isLast ? currentQuestion : currentQuestion + 1, measurements);

    window.setTimeout(() => {
      if (isLast) {
        const result = calculateFitDna(nextAnswers);
        completedRef.current = true;
        track.quizCompleted({
          quiz: "fit_dna",
          rise: result.rise,
          leg: result.leg,
          length: result.length,
          fabric: result.fabric,
          fit_issue: result.fitIssue,
        });
        router.push(`/fit/results?${answersToSearchParams(nextAnswers).toString()}`);
        return;
      }
      const nextQuestion = currentQuestion + 1;
      currentRef.current = nextQuestion;
      setCurrentQuestion(nextQuestion);
      setTransitioning(false);
    }, 260);
  }, [answers, currentQuestion, measurements, question.id, router, transitioning]);

  const goBack = useCallback(() => {
    if (currentQuestion === 0 || transitioning) return;
    const previous = currentQuestion - 1;
    currentRef.current = previous;
    setCurrentQuestion(previous);
    saveProgress(answers, previous, measurements);
    track.quizBackClicked(currentQuestion + 1);
  }, [answers, currentQuestion, measurements, transitioning]);

  const updateMeasurement = useCallback((field, value) => {
    const safeValue = field === "unit" ? value : value.replace(/[^0-9.]/g, "").slice(0, 6);
    const nextMeasurements = { ...measurements, [field]: safeValue };
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
        <span style={{ width: `${progress}%` }} />
      </div>

      <section className={`fit-question${transitioning ? " is-transitioning" : ""}`}>
        <div className="fit-question-rail" aria-hidden="true">
          <span>{String(currentQuestion + 1).padStart(2, "0")}</span>
          <i />
          <span>{String(fitQuestions.length).padStart(2, "0")}</span>
        </div>
        <div className="fit-question-main" key={question.id}>
          <p className="fit-question-instruction">Choose the closest answer. You can go back.</p>
          <h1>{question.question}</h1>
          <div className={`fit-options${question.options.length > 4 ? " fit-options-many" : ""}`} role="group" aria-label={question.question}>
            {question.options.map((option, index) => {
              const selected = answers[question.id] === option.value;
              return (
                <button
                  type="button"
                  key={option.value}
                  className={`fit-option${selected ? " is-selected" : ""}`}
                  aria-pressed={selected}
                  onClick={() => selectAnswer(option.value)}
                >
                  <span className="fit-option-index">{String(index + 1).padStart(2, "0")}</span>
                  <span>{option.label}</span>
                  <i aria-hidden="true" />
                </button>
              );
            })}
          </div>
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
                    <p>Saved only in this browser and added to your shopping note. It does not create a body-type label.</p>
                  </div>
                )}
              </div>
            </details>
          )}
        </div>
      </section>

      <footer className="fit-quiz-footer">
        <button type="button" onClick={goBack} disabled={currentQuestion === 0 || transitioning}>
          <span aria-hidden="true">←</span> Back
        </button>
        <p>No body-type labels. No rules. Just a better starting point.</p>
      </footer>
    </main>
  );
}
