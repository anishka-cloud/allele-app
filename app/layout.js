import { Playfair_Display, Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { AnalyticsProvider } from "./AnalyticsProvider";
import { CookieConsent } from "./CookieConsent";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Shade DNA by Allele — Find Your Perfect Makeup Colors",
  description:
    "Discover your color season and find the exact makeup shades that make you glow. Based on color science, not guesswork. Take the 2-minute quiz now.",
  keywords: "shade dna, color analysis, color season, makeup shades, seasonal color analysis, beauty quiz",
  metadataBase: new URL("https://www.allele.app"),
  openGraph: {
    title: "Find Your Perfect Makeup Colors in 2 Minutes",
    description:
      "Based on color science, not guesswork. Discover which shades actually make you glow.",
    type: "website",
    url: "https://www.allele.app",
    siteName: "Allele",
    images: [
      {
        url: "/og/shade-dna-hero.png",
        width: 1200,
        height: 630,
        alt: "Shade DNA by Allele — Find Your Perfect Makeup Colors",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Your Perfect Makeup Colors in 2 Minutes",
    description: "Based on color science, not guesswork. Free 2-min quiz.",
    images: ["/og/shade-dna-hero.png"],
  },
  alternates: {
    canonical: "https://www.allele.app",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#FFFBF7" />
      </head>
      <body className="min-h-screen antialiased">
        <AnalyticsProvider />
        <div
          role="note"
          aria-label="Affiliate disclosure"
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: "rgba(196,162,101,0.12)",
            borderBottom: "1px solid rgba(196,162,101,0.22)",
            padding: "8px 16px",
            textAlign: "center",
            fontFamily: "var(--font-inter, system-ui, sans-serif)",
            fontSize: "0.72rem",
            color: "#5a4a2a",
            fontWeight: 400,
            letterSpacing: "0.01em",
            lineHeight: 1.45,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          This site contains affiliate links. We may earn a small commission when you shop through them, at no extra cost to you. <a href="/disclosure" style={{ color: "#5a4a2a", textDecoration: "underline" }}>Full disclosure</a>.
        </div>
        {children}
        <CookieConsent />
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
