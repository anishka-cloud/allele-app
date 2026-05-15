import ResultsContent from "./ResultsContent";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }) {
  const sp = await searchParams;
  const season = sp?.season || "True Spring";

  return {
    title: `I'm a ${season} · Shade DNA by Allele`,
    description: `Take the 2-minute quiz to find YOUR perfect makeup colors. Based on color science, not guesswork.`,
    openGraph: {
      title: `I'm a ${season} · Shade DNA`,
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
      title: `I'm a ${season} · Shade DNA`,
      description: `Find YOUR color season. Free 2-min quiz.`,
      images: [`https://www.allele.app/api/og?season=${encodeURIComponent(season)}`],
    },
    alternates: {
      canonical: `https://www.allele.app/results?season=${encodeURIComponent(season)}`,
    },
  };
}

export default function ResultsPage() {
  // Suspense is handled inside ResultsContent (wrapping just the useSearchParams reader).
  // This keeps the outer page clean and ensures the main component tree hydrates immediately.
  return <ResultsContent />;
}
