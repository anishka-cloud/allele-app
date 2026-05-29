import TravelCapsule from "./TravelCapsule";

export const metadata = {
  title: "Summer Travel Capsule Planner by Color Season · Allele Shade DNA",
  description:
    "A fast packing guide for building a carry-on capsule that mixes because the colors belong together. Twelve seasons, twelve travel cores, two worksheets. For the person who packs black, white, denim, and gold because they are basics and still arrives with nothing that works together. $12.",
  keywords:
    "summer travel capsule, color season packing, capsule wardrobe summer, travel outfit planner, color analysis travel, summer carry-on capsule, what colors to pack vacation, color season wardrobe, 12 season capsule",
  alternates: {
    canonical: "https://www.allele.app/travel-capsule",
  },
  openGraph: {
    title: "Half your suitcase doesn't work on you.",
    description:
      "A summer travel capsule planner by color season. Twelve seasons, twelve travel cores, two worksheets. One PDF, the math already done. $12.",
    type: "website",
    url: "https://www.allele.app/travel-capsule",
    siteName: "Allele",
    images: [
      {
        url: "/og/shade-dna-hero.png",
        width: 1200,
        height: 630,
        alt: "Summer Travel Capsule Planner by Color Season · Allele Shade DNA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Half your suitcase doesn't work on you.",
    description:
      "A summer travel capsule planner by color season. One PDF, the math already done. $12.",
    images: ["/og/shade-dna-hero.png"],
  },
};

export default function Page() {
  return <TravelCapsule />;
}
