import VibeQuizContent from "./VibeQuizContent";

export const metadata = {
  title: "Vibe DNA Quiz by Allele — Find Your Aesthetic Archetype",
  description:
    "Take the 90-second Vibe DNA quiz and decode your aesthetic archetype, from Clean Girl to Dark Academia to Tomboy Luxe.",
  alternates: {
    canonical: "https://www.allele.app/vibe/quiz",
  },
  openGraph: {
    title: "Vibe DNA Quiz by Allele",
    description: "Find your aesthetic archetype in 90 seconds.",
    url: "https://www.allele.app/vibe/quiz",
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
    title: "Vibe DNA Quiz by Allele",
    description: "Find your aesthetic archetype in 90 seconds.",
    images: ["/og/vibe-dna.png"],
  },
};

export default function VibeQuizPage() {
  return <VibeQuizContent />;
}
