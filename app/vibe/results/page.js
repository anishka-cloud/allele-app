import { Suspense } from "react";
import VibeResultsContent from "./VibeResultsContent";

export const metadata = {
  title: "Your Vibe DNA Results — Allele",
  description: "Your aesthetic archetype revealed. Discover your style, shop your vibe, and share your DNA.",
};

export default function VibeResultsPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: "var(--bg-primary)" }}
        >
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mb-4" style={{ borderColor: "var(--accent-gold)", borderTopColor: "transparent" }} />
            <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Decoding your vibe...
            </p>
          </div>
        </div>
      }
    >
      <VibeResultsContent />
    </Suspense>
  );
}
