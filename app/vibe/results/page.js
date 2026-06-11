import { Suspense } from "react";
import VibeResultsContent from "./VibeResultsContent";

export const metadata = {
  title: "Your Vibe DNA Results — Allele",
  description: "Your aesthetic archetype revealed. Discover your style, shop your vibe, and share your DNA.",
  alternates: {
    canonical: "https://www.allele.app/vibe/results",
  },
  openGraph: {
    title: "Your Vibe DNA Results — Allele",
    description: "Your aesthetic archetype revealed. Discover your style, shop your vibe, and share your DNA.",
    url: "https://www.allele.app/vibe/results",
    siteName: "Allele",
    type: "website",
    images: [
      {
        url: "/og/vibe-dna.png",
        width: 1200,
        height: 630,
        alt: "Vibe DNA by Allele",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Vibe DNA Results — Allele",
    description: "Your aesthetic archetype revealed. Discover your style, shop your vibe, and share your DNA.",
    images: ["/og/vibe-dna.png"],
  },
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
