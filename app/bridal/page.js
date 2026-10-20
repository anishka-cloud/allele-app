import BridalLanding from "./BridalLanding";

export const metadata = {
  title: "Find Your Bridal White · Allele Shade DNA",
  description:
    "Ivory, champagne, soft white or crisp white? Twelve questions about how color behaves on your skin, and a starting point for the white to try first. Free, no sign-up.",
  alternates: { canonical: "https://www.allele.app/bridal" },
  openGraph: {
    title: "Find your bridal white.",
    description: "Ivory, champagne, soft white or crisp white? A free color quiz for choosing your wedding white.",
    type: "website",
    url: "https://www.allele.app/bridal",
    siteName: "Allele",
    images: [{ url: "/og/shade-dna-hero.png", width: 1200, height: 630, alt: "Find your bridal white · Allele" }],
  },
};

export default function Page() {
  return <BridalLanding />;
}
