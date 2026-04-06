"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { vibeQuestions, calculateVibe } from "@/lib/vibeQuestions";

export default function VibeQuizPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState("forward");
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();
  const containerRef = useRef(null);

  const question = vibeQuestions[currentQ];
  const progress = (currentQ / vibeQuestions.length) * 100;
  const progressAfter = ((currentQ + 1) / vibeQuestions.length) * 100;

  const handleSelect = useCallback(
    (optionIndex) => {
      if (isAnimating) return;

      const newAnswers = { ...answers, [question.id]: optionIndex };
      setAnswers(newAnswers);

      setIsAnimating(true);
      setDirection("forward");

      setTimeout(() => {
        if (currentQ < vibeQuestions.length - 1) {
          setCurrentQ((prev) => prev + 1);
        } else {
          // Calculate result and navigate
          const result = calculateVibe(newAnswers);
          const searchParams = new URLSearchParams({
            archetype: result.primary,
            ...(result.secondary ? { secondary: result.secondary } : {}),
          });
          router.push(`/vibe/results?${searchParams.toString()}`);
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
          id="vibe-quiz-back-btn"
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
            fontSize: "0.7rem",
            color: "var(--accent-gold)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          Vibe DNA
        </span>
        <span
          style={{
            fontFamily: "var(--font-inter, 'Inter')",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            letterSpacing: "0.1em",
          }}
        >
          {currentQ + 1} / {vibeQuestions.length}
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
              background: "linear-gradient(90deg, #D4869C, #C96BBE)",
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
              ? "animate-slide-out-left"
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
                  fontStyle: "italic",
                }}
              >
                {question.subtitle}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {question.options.map((option, i) => {
              const isSelected = answers[question.id] === i;
              return (
                <button
                  key={i}
                  id={`vibe-option-${question.id}-${i}`}
                  className="quiz-option text-left w-full"
                  onClick={() => handleSelect(i)}
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
                    </div>

                    {/* Selection indicator */}
                    <div
                      className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-200"
                      style={{
                        border: isSelected ? "none" : "1.5px solid var(--text-muted)",
                        background: isSelected ? "var(--text-primary)" : "transparent",
                      }}
                    >
                      {isSelected && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6L5 8.5L9.5 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
