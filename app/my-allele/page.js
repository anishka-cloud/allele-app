import MyAllele from "./MyAllele";
import "./my-allele.css";

export const metadata = {
  title: "My Allele · Make a Better Buying Decision",
  description:
    "Use what already works for you to evaluate a potential makeup, clothing, or everyday purchase.",
  alternates: {
    canonical: "https://www.allele.app/my-allele",
  },
};

export default function MyAllelePage() {
  return <MyAllele />;
}

