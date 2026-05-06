import Link from "next/link";

export const metadata = {
  title: "Privacy Policy · Allele",
  description: "How Allele collects, uses, and protects your data.",
};

export default function PrivacyPage() {
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
            fontFamily: "var(--font-playfair, 'Playfair Display')",
            fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          Privacy Policy
        </h1>

        <p
          className="mb-10"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            letterSpacing: "0.05em",
          }}
        >
          Last updated: April 14, 2026
        </p>

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
          <h2
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display')",
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            Who we are
          </h2>
          <p>
            Allele (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;Allele&rdquo;) runs allele.app, a suite of
            quiz-based personalization tools including Shade DNA (color season analysis) and
            Vibe DNA (aesthetic archetype analysis). We&rsquo;re a small independent publisher. Our
            contact email is listed at the bottom of this page.
          </p>

          <h2
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display')",
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            What we collect
          </h2>
          <p>
            When you take a quiz, we collect the answers you provide. These are used to generate
            your result and, if you choose, to personalize the welcome email we send you.
          </p>
          <p>
            If you submit your email address, we store it along with your quiz result and send it
            to our email provider (Beehiiv) so we can deliver the welcome guide and occasional
            updates.
          </p>
          <p>
            We use two analytics services to understand how the site is performing:
          </p>
          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong>Google Analytics 4:</strong> measures page visits, quiz completions, and
              product clicks. Uses cookies.
            </li>
            <li style={{ marginBottom: "0.5rem" }}>
              <strong>PostHog:</strong> tracks user journeys through the quiz funnel to improve
              the experience. Uses cookies.
            </li>
          </ul>
          <p>
            Both tools anonymize IP addresses where possible and do not receive your email or
            quiz answers. They only see aggregate behavior patterns.
          </p>

          <h2
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display')",
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            Cookies
          </h2>
          <p>
            We use cookies for three purposes: running the analytics tools mentioned above,
            remembering your quiz progress if you navigate away, and tracking affiliate referrals
            to Amazon and ShopMy. You can opt out of non-essential cookies using the banner at
            the bottom of your first visit, or by clearing cookies in your browser settings.
          </p>

          <h2
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display')",
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            Affiliate links
          </h2>
          <p>
            Allele earns commissions when you purchase products through links on our site or in
            our emails. We participate in the Amazon Associates Program and ShopMy. Clicking an
            affiliate link may leave a cookie from that retailer that credits us for a sale within
            a certain window (usually 24 hours to 90 days depending on the program). For full
            details, see our{" "}
            <Link href="/disclosure" style={{ color: "var(--accent-gold)", textDecoration: "underline" }}>
              Affiliate Disclosure
            </Link>
            .
          </p>

          <h2
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display')",
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            How we use your email
          </h2>
          <p>
            If you provide your email, we use it to:
          </p>
          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
            <li style={{ marginBottom: "0.5rem" }}>Send your personalized welcome guide for your color season</li>
            <li style={{ marginBottom: "0.5rem" }}>Send occasional updates when we launch new quizzes or seasonal product refreshes</li>
            <li style={{ marginBottom: "0.5rem" }}>Send educational content about color analysis and personal style</li>
          </ul>
          <p>
            You can unsubscribe at any time using the link at the bottom of every email. We do
            not sell, rent, or share your email address with any third party other than Beehiiv
            (our email provider) for the sole purpose of delivering these emails.
          </p>

          <h2
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display')",
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            Your rights
          </h2>
          <p>
            You have the right to request a copy of the data we hold about you, request
            correction or deletion of your data, opt out of analytics tracking, and unsubscribe
            from all emails. To exercise any of these rights, email us at the address below. We
            respond within 7 days.
          </p>
          <p>
            If you&rsquo;re in the EU or UK, you have additional rights under the GDPR including
            the right to data portability and the right to lodge a complaint with your local
            data protection authority.
          </p>

          <h2
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display')",
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            Data retention
          </h2>
          <p>
            We keep quiz results and email addresses for as long as you remain subscribed. If you
            unsubscribe, we remove your email from our active list within 48 hours. Aggregated
            analytics data may be retained for up to 2 years for trend analysis.
          </p>

          <h2
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display')",
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            Children
          </h2>
          <p>
            Allele is not directed to children under 13. We do not knowingly collect data from
            children. If you believe we have collected data from a child, please contact us and
            we will delete it.
          </p>

          <h2
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display')",
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            Changes to this policy
          </h2>
          <p>
            We&rsquo;ll update this page when our practices change. The &ldquo;Last updated&rdquo;
            date at the top of this page reflects the most recent revision.
          </p>

          <h2
            style={{
              fontFamily: "var(--font-playfair, 'Playfair Display')",
              fontSize: "1.25rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              marginTop: "2rem",
              marginBottom: "0.75rem",
            }}
          >
            Contact
          </h2>
          <p>
            Questions? Email us at{" "}
            <a
              href="mailto:hello@allele.app"
              style={{ color: "var(--accent-gold)", textDecoration: "underline" }}
            >
              hello@allele.app
            </a>
            .
          </p>
        </div>

        <div className="editorial-divider mt-12 mb-8" />

        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            textAlign: "center",
          }}
        >
          &copy; {new Date().getFullYear()} Allele &middot;{" "}
          <Link href="/disclosure" style={{ color: "var(--text-muted)", textDecoration: "underline" }}>
            Affiliate Disclosure
          </Link>
        </p>
      </div>
    </main>
  );
}
