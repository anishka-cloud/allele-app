import { Suspense } from "react";
import FitResultsContent from "./FitResultsContent";

export const metadata = {
  title: "Your Denim Starting Point — Fit DNA by Allele",
  description: "Your Fit DNA starting point for rise, leg shape, length, and denim feel.",
  alternates: { canonical: "https://www.allele.app/fit/results" },
};

export default function FitResultsPage() {
  return (
    <Suspense fallback={<main className="fit-results"><div className="fit-loading">Drafting your fit notes…</div></main>}>
      <FitResultsContent />
    </Suspense>
  );
}
