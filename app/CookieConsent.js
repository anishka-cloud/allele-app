"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "allele-cookie-consent";

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setShow(true);
    } catch {
      // If localStorage is blocked, just don't show the banner.
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: true, date: new Date().toISOString() }));
    } catch {}
    setShow(false);
  };

  const decline = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: false, date: new Date().toISOString() }));
    } catch {}
    setShow(false);
    // Best-effort opt out: disable GA4 via window.gtag + PostHog opt-out.
    if (typeof window !== "undefined") {
      if (window.gtag) {
        window.gtag("consent", "update", {
          analytics_storage: "denied",
          ad_storage: "denied",
        });
      }
      if (window.posthog && typeof window.posthog.opt_out_capturing === "function") {
        window.posthog.opt_out_capturing();
      }
    }
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      style={{
        position: "fixed",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 200,
        width: "calc(100% - 32px)",
        maxWidth: 640,
        background: "#FFFBF7",
        border: "1px solid rgba(196,162,101,0.3)",
        borderRadius: 14,
        boxShadow: "0 12px 36px rgba(30,20,10,0.15), 0 2px 8px rgba(30,20,10,0.08)",
        padding: "18px 20px",
        fontFamily: "var(--font-inter, system-ui, sans-serif)",
      }}
    >
      <p
        style={{
          fontSize: "0.82rem",
          color: "#1a1a1a",
          lineHeight: 1.55,
          margin: 0,
          marginBottom: 14,
          fontWeight: 400,
        }}
      >
        Allele uses cookies to measure how the quiz is performing and to credit us when you shop
        through an affiliate link. You can accept all or decline analytics. See our{" "}
        <Link href="/privacy" style={{ color: "#C4A265", textDecoration: "underline" }}>
          privacy policy
        </Link>
        .
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          type="button"
          onClick={accept}
          style={{
            flex: "1 1 140px",
            padding: "10px 20px",
            borderRadius: 999,
            background: "#1a1a1a",
            color: "white",
            fontSize: "0.78rem",
            fontWeight: 500,
            letterSpacing: "0.04em",
            border: "none",
            cursor: "pointer",
          }}
        >
          Accept all
        </button>
        <button
          type="button"
          onClick={decline}
          style={{
            flex: "1 1 140px",
            padding: "10px 20px",
            borderRadius: 999,
            background: "transparent",
            color: "#1a1a1a",
            fontSize: "0.78rem",
            fontWeight: 500,
            letterSpacing: "0.04em",
            border: "1px solid rgba(26,26,26,0.3)",
            cursor: "pointer",
          }}
        >
          Decline analytics
        </button>
      </div>
    </div>
  );
}
