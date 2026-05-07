import Link from "next/link";

export const metadata = {
  title: "Affiliate Disclosure · Allele",
  description: "Allele's affiliate disclosure and transparency statement.",
};

export default function DisclosurePage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-12 transition-opacity hover:opacity-70"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            textDecoration: "none",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Allele
        </Link>

        <h1
          className="mb-4"
          style={{
            fontFamily: "var(--font-display, 'Lora'), 'GT Sectra', Georgia, serif",
            fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          Affiliate Disclosure
        </h1>

        <div className="editorial-divider mb-8" />

        <div
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.95rem",
            color: "var(--text-secondary)",
            lineHeight: 1.9,
            fontWeight: 300,
          }}
        >
          <p className="mb-6">
            <strong style={{ fontWeight: 500, color: "var(--text-primary)" }}>Last updated:</strong> April 2026
          </p>

          <p className="mb-6">
            Allele (allele.app) participates in affiliate marketing programs. This means that when you click on product links on our site and make a purchase, we may receive a small commission from the retailer at <strong style={{ fontWeight: 500 }}>no additional cost to you</strong>.
          </p>

          <h2
            className="mb-3 mt-10"
            style={{
              fontFamily: "var(--font-display, 'Lora')",
              fontSize: "1.3rem",
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            How it works
          </h2>
          <p className="mb-6">
            Our product recommendations (in Shade DNA, Vibe DNA, and related quizzes) include affiliate links through ShopMy. When you purchase a product through one of these links, we earn a small percentage of the sale. This helps us keep Allele free and ad-free.
          </p>

          <h2
            className="mb-3 mt-10"
            style={{
              fontFamily: "var(--font-display, 'Lora')",
              fontSize: "1.3rem",
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            Our commitment
          </h2>
          <ul className="mb-6 space-y-3" style={{ paddingLeft: "1.5rem", listStyleType: "disc" }}>
            <li>We only recommend products we genuinely believe in and would use ourselves.</li>
            <li>Affiliate relationships never influence which products appear in your results. Your quiz results are based entirely on your answers.</li>
            <li>We recommend products across all price points (budget, value, and splurge) so you can find options that work for your budget.</li>
            <li>We are not paid by any brand to feature specific products in our quizzes.</li>
          </ul>

          <h2
            className="mb-3 mt-10"
            style={{
              fontFamily: "var(--font-display, 'Lora')",
              fontSize: "1.3rem",
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            FTC compliance
          </h2>
          <p className="mb-6">
            In accordance with the Federal Trade Commission (FTC) guidelines, we disclose that Allele may receive compensation for products purchased through affiliate links on this website. This disclosure is provided in compliance with the FTC&rsquo;s 16 CFR Part 255: &quot;Guides Concerning the Use of Endorsements and Testimonials in Advertising.&quot;
          </p>

          <h2
            className="mb-3 mt-10"
            style={{
              fontFamily: "var(--font-display, 'Lora')",
              fontSize: "1.3rem",
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            Questions?
          </h2>
          <p className="mb-6">
            If you have any questions about our affiliate relationships or this disclosure, you can reach us at{" "}
            <a href="mailto:anishka.content@gmail.com" style={{ color: "var(--accent-gold)", textDecoration: "underline" }}>
              anishka.content@gmail.com
            </a>.
          </p>
        </div>
      </div>

      <footer className="px-6 py-8 text-center" style={{ borderTop: "1px solid var(--border-light)" }}>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.05em" }}>
          &copy; {new Date().getFullYear()} Allele
        </p>
      </footer>
    </main>
  );
}
