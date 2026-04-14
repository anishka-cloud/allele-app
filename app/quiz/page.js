"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/lib/questions";
import { calculateSeason } from "@/lib/quizLogic";
import { track } from "@/lib/analytics";

function ContrastVisual({ type }) {
  const visuals = {
    low_contrast: (
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-full" style={{ background: "#E8D5B7" }} />
        <div className="w-5 h-5 rounded-full" style={{ background: "#D4B896" }} />
        <div className="w-5 h-5 rounded-full" style={{ background: "#C4AA82" }} />
      </div>
    ),
    medium_contrast: (
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-full" style={{ background: "#F0D5B7" }} />
        <div className="w-5 h-5 rounded-full" style={{ background: "#8B6B4A" }} />
        <div className="w-5 h-5 rounded-full" style={{ background: "#7B8B55" }} />
      </div>
    ),
    high_contrast: (
      <div className="flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-full" style={{ background: "#F5E6D3" }} />
        <div className="w-5 h-5 rounded-full" style={{ background: "#2B1D0E" }} />
        <div className="w-5 h-5 rounded-full" style={{ background: "#3B2B1B" }} />
      </div>
    ),
  };
  return visuals[type] || null;
}

function ColorSwatches({ swatches }) {
  return (
    <div className="flex items-center gap-1.5 mt-2">
      {swatches.map((color, i) => (
        <div
          key={i}
          className="w-5 h-5 rounded-full flex-shrink-0"
          style={{
            background: color,
            boxShadow: "0 1px 4px rgba(0,0,0,0.12), inset 0 1px 1px rgba(255,255,255,0.2)",
          }}
        />
      ))}
    </div>
  );
}

export default function QuizPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState("forward");
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();
  const containerRef = useRef(null);
  const startTimeRef = useRef(null);
  const completedRef = useRef(false);

  const question = questions[currentQ];
  const progress = ((currentQ) / questions.length) * 100;
  const progressAfter = ((currentQ + 1) / questions.length) * 100;

  useEffect(() => {
    startTimeRef.current = Date.now();
    const params = new URLSearchParams(window.location.search);
    track.quizStarted(params.get("source") || "homepage");

    const handleBeforeUnload = () => {
      if (completedRef.current) return;
      const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
      track.quizAbandoned(currentQ + 1, elapsed);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (!completedRef.current && startTimeRef.current) {
        const elapsed = Math.round((Date.now() - startTimeRef.current) / 1000);
        if (elapsed > 3) track.quizAbandoned(currentQ + 1, elapsed);
      }
    };
  }, []);

  const handleSelect = useCallback(
    (value) => {
      if (isAnimating) return;

      const newAnswers = { ...answers, [question.id]: value };
      setAnswers(newAnswers);

      track.questionAnswered(currentQ + 1, question.id, value);

      // Animate out and go to next
      setIsAnimating(true);
      setDirection("forward");

      setTimeout(() => {
        if (currentQ < questions.length - 1) {
          setCurrentQ((prev) => prev + 1);
        } else {
          // Calculate result and navigate
          const result = calculateSeason(newAnswers);
          completedRef.current = true;
          track.quizCompleted({
            season: result.season,
            undertone: result.undertone,
            contrast: result.contrast,
            value: result.value,
            chroma: result.chroma,
            olive: result.oliveFlag ? "1" : "0",
          });
          const params = new URLSearchParams({
            season: result.season,
            undertone: result.undertone,
            olive: result.oliveFlag ? "1" : "0",
            contrast: result.contrast,
            skin: newAnswers[7] || "medium",
            hair: newAnswers[5] || "deep_cool",
            hairDepth: newAnswers[6] || "medium",
            eyes: newAnswers[8] || "medium",
            value: result.value,
            chroma: result.chroma,
          });
          router.push(`/results?${params.toString()}`);
        }
        setIsAnimating(false);
      }, 400);
    },
    [answers, currentQ, isAnimating, question, router]
  );

  const handleBack = useCallback(() => {
    if (currentQ === 0 || isAnimating) return;
    setIsAnimating(true);
    setDirection("backward");

    setTimeout(() => {
      setCurrentQ((prev) => prev - 1);
      setIsAnimating(false);
    }, 300);
  }, [currentQ, isAnimating]);

  return (
    <main className="min-h-screen flex flex-col" style={{ background: "var(--bg-primary)" }}>
      {/* Top bar */}
      <header className="px-6 pt-6 pb-4 flex items-center justify-between">
        <button
          id="quiz-back-btn"
          onClick={handleBack}
          className="flex items-center gap-2 transition-opacity duration-200"
          style={{
            opacity: currentQ === 0 ? 0.3 : 1,
            pointerEvents: currentQ === 0 ? "none" : "auto",
            fontFamily: "var(--font-inter, 'Inter')",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <span
          style={{
            fontFamily: "var(--font-inter, 'Inter')",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            letterSpacing: "0.1em",
          }}
        >
          {currentQ + 1} / {questions.length}
        </span>
      </header>

      {/* Progress bar */}
      <div className="px-6 mb-8">
        <div
          className="w-full h-[3px] rounded-full overflow-hidden"
          style={{ background: "var(--border-light)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${isAnimating && direction === "forward" ? progressAfter : progress}%`,
              background: "linear-gradient(90deg, var(--accent-rose), var(--accent-gold))",
            }}
          />
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 px-6 pb-12 max-w-2xl mx-auto w-full" ref={containerRef}>
        <div
          key={currentQ}
          className={
            isAnimating
              ? direction === "forward"
                ? "animate-slide-out-left"
                : "animate-slide-out-left"
              : "animate-slide-in-right"
          }
        >
          {/* Question text */}
          <div className="mb-8">
            <h2
              className="mb-3"
              style={{
                fontFamily: "var(--font-playfair, 'Playfair Display')",
                fontSize: "clamp(1.3rem, 4vw, 1.75rem)",
                fontWeight: 500,
                lineHeight: 1.3,
                color: "var(--text-primary)",
              }}
            >
              {question.question}
            </h2>
            {question.subtitle && (
              <p
                style={{
                  fontFamily: "var(--font-inter, 'Inter')",
                  fontSize: "0.9rem",
                  color: "var(--text-muted)",
                  fontWeight: 300,
                  lineHeight: 1.5,
                }}
              >
                {question.subtitle}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {question.options.map((option, i) => {
              const isSelected = answers[question.id] === option.value;
              return (
                <button
                  key={option.value}
                  id={`quiz-option-${question.id}-${option.value}`}
                  className="quiz-option text-left w-full"
                  onClick={() => handleSelect(option.value)}
                  style={{
                    padding: "16px 20px",
                    borderRadius: "14px",
                    border: isSelected
                      ? "2px solid var(--text-primary)"
                      : "1.5px solid var(--border-light)",
                    background: isSelected ? "rgba(26, 26, 26, 0.03)" : "white",
                    boxShadow: isSelected ? "0 0 0 1px var(--text-primary)" : "var(--shadow-soft)",
                    animation: "fadeInUp 0.5s ease-out forwards",
                    animationDelay: `${0.05 + i * 0.07}s`,
                    opacity: 0,
                    cursor: "pointer",
                  }}
                >
                  <div className="flex items-center gap-4">
                    {/* Color indicator */}
                    {option.color && (
                      <div
                        className="w-10 h-10 rounded-full flex-shrink-0"
                        style={{
                          background: option.color,
                          boxShadow:
                            "0 2px 6px rgba(0,0,0,0.1), inset 0 1px 2px rgba(255,255,255,0.2)",
                          border: option.border ? "1.5px solid #E0E0E0" : "none",
                        }}
                      />
                    )}

                    <div className="flex-1">
                      <span
                        style={{
                          fontFamily: "var(--font-inter, 'Inter')",
                          fontSize: "0.95rem",
                          fontWeight: isSelected ? 500 : 400,
                          color: "var(--text-primary)",
                          lineHeight: 1.4,
                        }}
                      >
                        {option.label}
                      </span>
                      {option.description && (
                        <span
                          className="block mt-0.5"
                          style={{
                            fontFamily: "var(--font-inter, 'Inter')",
                            fontSize: "0.8rem",
                            color: "var(--text-muted)",
                            fontWeight: 300,
                          }}
                        >
                          {option.description}
                        </span>
                      )}
                      {/* Contrast visuals */}
                      {option.visual && (
                        <div className="mt-2">
                          <ContrastVisual type={option.visual} />
                        </div>
                      )}
                      {/* Color swatches for Q11 */}
                      {option.swatches && <ColorSwatches swatches={option.swatches} />}
                    </div>

                    {/* Selection indicator */}
                    <div
                      className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-200"
                      style={{
                        border: isSelected
                          ? "none"
                          : "1.5px solid var(--text-muted)",
                        background: isSelected ? "var(--text-primary)" : "transparent",
                      }}
                    >
                      {isSelected && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M2.5 6L5 8.5L9.5 4"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
