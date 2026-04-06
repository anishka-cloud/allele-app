import { Suspense } from "react";
import ResultsContent from "./ResultsContent";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }) {
  const sp = await searchParams;
  const season = sp?.season || "True Spring";

  return {
    title: `I'm a ${season} ✨ Shade DNA by Allele`,
    description: `Take the 2-minute quiz to find YOUR perfect makeup colors. Based on color science, not guesswork.`,
    openGraph: {
      title: `I'm a ${season} ✨ Shade DNA`,
      description: `Take the quiz to find your color season and perfect makeup shades.`,
      url: `https://www.allele.app/results?season=${encodeURIComponent(season)}`,
      images: [
        {
          url: `https://www.allele.app/api/og?season=${encodeURIComponent(season)}`,
          width: 1200,
          height: 630,
          alt: `${season} Color Season - Shade DNA by Allele`,
        },
      ],
      type: "website",
      siteName: "Allele",
    },
    twitter: {
      card: "summary_large_image",
      title: `I'm a ${season} ✨ Shade DNA`,
      description: `Find YOUR color season. Free 2-min quiz.`,
      images: [`https://www.allele.app/api/og?season=${encodeURIComponent(season)}`],
    },
    alternates: {
      canonical: `https://www.allele.app/results?season=${encodeURIComponent(season)}`,
    },
  };
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
          <div className="animate-pulse-soft" style={{ fontFamily: "var(--font-playfair, 'Playfair Display')", fontSize: "1.2rem", color: "var(--text-muted)" }}>
            Loading your results...
          </div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
