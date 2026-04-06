import { Playfair_Display, Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { AnalyticsProvider } from "./AnalyticsProvider";

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
        url: "/api/og?season=True%20Spring",
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
    images: ["/api/og?season=True%20Spring"],
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
        {children}
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
