import ClosetKit from "./ClosetKit";

export const metadata = {
  title: "No Universal Neutrals: The 12-Season Closet Color Swap Guide · Allele",
  description:
    "The 12-season guide to the black, white, denim, khaki, grey, navy, camel, and metal that actually belong in your closet. Translate color analysis into real closet decisions. $17.",
  keywords:
    "closet color reset, no universal neutrals, wardrobe color analysis, color season neutrals, capsule wardrobe colors, seasonal color analysis clothing, best neutrals for skin tone, closet audit",
  alternates: {
    canonical: "https://www.allele.app/no-universal-neutrals",
  },
  openGraph: {
    title: "Most closet advice treats neutrals as universal. They are not.",
    description:
      "The 12-season guide to the black, white, denim, khaki, grey, navy, camel, and metal that actually belong in your closet. $17.",
    type: "website",
    url: "https://www.allele.app/no-universal-neutrals",
    siteName: "Allele",
    images: [
      {
        url: "/og/shade-dna-hero.png",
        width: 1200,
        height: 630,
        alt: "No Universal Neutrals · Allele",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Most closet advice treats neutrals as universal. They are not.",
    description:
      "The 12-season guide to the black, white, denim, khaki, grey, navy, camel, and metal that actually belong in your closet. $17.",
    images: ["/og/shade-dna-hero.png"],
  },
};

export default function Page() {
  return <ClosetKit />;
}
