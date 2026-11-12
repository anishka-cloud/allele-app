import { notFound } from "next/navigation";
import { getGuide, GUIDE_SLUGS } from "@/lib/guides";
import GuideContent from "./GuideContent";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  const url = `https://www.allele.app/guides/${slug}`;
  return {
    title: g.seoTitle,
    description: g.description,
    keywords: g.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: g.title,
      description: g.description,
      type: "article",
      url,
      siteName: "Allele",
      images: [{ url: g.ogImage, width: 1200, height: 630, alt: `${g.seasonName} palette · Allele` }],
    },
    twitter: {
      card: "summary_large_image",
      title: g.title,
      description: g.description,
      images: [g.ogImage],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: g.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <GuideContent guide={g} />
    </>
  );
}
