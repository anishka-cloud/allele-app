import OliveKit from "./OliveKit";

export const metadata = {
  title: "The Olive Undertone Survival Kit · Allele Shade DNA",
  description:
    "A field guide for the in-between undertone — the one foundation lines forget, color seasons gloss over, and Pinterest tries to flatten into 'warm or cool.' Five olive presentations, four worksheets, the foundation oxidation diagnostic. $24.",
  keywords:
    "olive undertone, olive skin color season, foundation for olive skin, olive undertone test, color analysis olive, olive skin makeup, neutral olive, cool olive, warm olive, deep olive",
  alternates: {
    canonical: "https://www.allele.app/olive-undertone-survival-kit",
  },
  openGraph: {
    title: "For the undertone the industry refuses to commit to.",
    description:
      "Five olive presentations. Four worksheets. The foundation oxidation diagnostic. A field guide to olive skin and the seasons that actually fit it. $24.",
    type: "website",
    url: "https://www.allele.app/olive-undertone-survival-kit",
    siteName: "Allele",
    images: [
      {
        url: "/og/shade-dna-hero.png",
        width: 1200,
        height: 630,
        alt: "The Olive Undertone Survival Kit · Allele Shade DNA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "For the undertone the industry refuses to commit to.",
    description:
      "A field guide for olive skin — the one foundation lines forget. $24.",
    images: ["/og/shade-dna-hero.png"],
  },
};

export default function Page() {
  return <OliveKit />;
}
