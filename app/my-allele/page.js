import MyAllele from "./MyAllele";
import "./my-allele.css";

export const metadata = {
  title: "My Allele · Make a Better Buying Decision",
  description: "Use what you already own to make a clearer, more personal buying decision.",
  alternates: {
    canonical: "https://www.allele.app/my-allele",
  },
};

export default function MyAllelePage() {
  return <MyAllele />;
}
