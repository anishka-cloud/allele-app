"use client";

import Image from "next/image";
import { useState } from "react";
import { getFitStyleExample } from "@/lib/fitStyleExamples.mjs";
import { FitProductEmbed, FitProductReference, FitAffiliateDisclosure } from "./FitProductReference";

const visualPath = "/fit/visuals/";
const legAssets = { slim: "slim", slim_straight: "slim", straight: "straight", wide: "wide", bootcut: "bootcut", barrel: "barrel" };
const shapeNames = { slim_straight: "Slim", straight: "Straight", wide: "Wide leg", bootcut: "Bootcut", barrel: "Barrel" };

// Generated, unbranded style references, never retailer photos or fit predictions.
export function JeanIllustration({ leg = "straight", rise = "high", length, issue, measure = false }) {
  const shape = legAssets[leg] || "straight";
  const asset = shape === "straight" && ["low", "mid"].includes(rise) ? `${rise}-rise` : shape;
  const point = { waist_gap: [51, 11], hip_thigh_pull: [72, 31], front_tight: [51, 15], seat_rise: [51, 29], length: [71, 90] }[issue];
  return <span className="fit-jean-art fit-jean-photo" aria-hidden="true">
    <Image src={`${visualPath}${asset}-v1.webp`} width={640} height={960} alt="" unoptimized />
    {point && <span className="fit-photo-marker" style={{ left: `${point[0]}%`, top: `${point[1]}%` }} />}
    {measure && <span className="fit-photo-inseam" />}
    {length && <span className={`fit-photo-hem fit-photo-hem-${length}`} />}
  </span>;
}

export const choiceHints = {
  length: { petite: "Shorter inseams", standard: "Regular inseams", tall: "Extra length", alter: "Cuffs or a tailored hem" },
  torso: { short: "High rises can sit close to my ribs", balanced: "Usually room above the waistband", long: "High rises can still sit below my waist", unsure: "That’s okay. Your fit experience helps." },
  waist_hip: { defined: "More difference from waist to hip", balanced: "A moderate difference", straight: "Less difference from waist to hip", unsure: "You don’t need measurements to continue" },
  fit_issue: { waist_gap: "Extra space at the back waistband", hip_thigh_pull: "Pulling across the hip or upper leg", front_tight: "Pressure when I sit or bend", seat_rise: "Pulling or excess fabric at the crotch", length: "Too much or too little at the hem", predictable: "Let’s focus on the style you enjoy" },
  rise: { low: "Sits lower on the hips", mid: "Between the hips and natural waist", high: "Sits closer to the natural waist", unsure: "Use my other answers" },
  silhouette: { slim: "Narrow, skimming, clean at the ankle", straight: "An even line from knee to hem", wide: "Volume through the leg and hem", bootcut: "A little flare below the knee", barrel: "Curved through the leg, tapered at the ankle", choose: "Use my fit needs and preferences" },
  goal: { define_waist: "A clear waistband", longer_legs: "An uninterrupted line to the hem", balance: "A shape that feels in proportion", hip_room: "More space to move", column: "An easy, looser line", fit: "Comfort is enough of a goal" },
  shoes: { flats: "Low profile, little added height", sneakers: "A little more volume under the hem", heels: "More height to account for", mixed: "Start with the shoes I wear most" },
  fabric: { rigid: "Firm, holds its own shape", structured: "Denim feel with a little movement", stretch: "Softness and easy movement", unsure: "Keep my options open" },
};

function FabricVisual({ value }) {
  return <span className={`fit-textile-photo fit-textile-${value}`} aria-hidden="true">
    <Image src={`${visualPath}denim-detail-v1.webp`} width={640} height={640} alt="" unoptimized />
    <span>{({ rigid: "Holds its shape", structured: "A little give", stretch: "Moves with you" })[value]}</span>
  </span>;
}

export function FitChoiceVisual({ questionId, value }) {
  if (["unsure", "choose", "predictable", "fit", "mixed"].includes(value)) return <span className="fit-open-choice" aria-hidden="true">{value === "predictable" || value === "fit" ? "✓" : "?"}</span>;
  if (questionId === "silhouette") return null; // Interactive product embeds sit outside answer buttons.
  if (questionId === "waist_hip") return <span className="fit-comparison" aria-hidden="true">
    <span>Waist<span style={{ width: `${({ defined: 51, balanced: 70, straight: 88 })[value]}%` }} /></span>
    <span>Hip<span style={{ width: "100%" }} /></span>
    <small>Compare the difference</small>
  </span>;
  if (questionId === "fabric") return <FabricVisual value={value} />;
  if (questionId === "shoes") return <Image className="fit-shoe-photo" src={`${visualPath}${value === "flats" ? "loafers" : value}-v1.webp`} width={640} height={640} alt="" unoptimized aria-hidden="true" />;
  const leg = questionId === "silhouette" ? value : questionId === "goal" && ["hip_room", "column"].includes(value) ? "wide" : questionId === "goal" && value === "balance" ? "bootcut" : "straight";
  const rise = questionId === "rise" ? value : questionId === "torso" ? ({ short: "low", balanced: "mid", long: "high" }[value]) : "high";
  return <JeanIllustration leg={leg} rise={rise} length={questionId === "length" ? value : undefined} issue={questionId === "fit_issue" ? value : undefined} />;
}

export function FitLivePreview({ answers, questionId, selected }) {
  const leg = { slim: "slim_straight", straight: "straight", wide: "wide", bootcut: "bootcut", barrel: "barrel" }[answers.silhouette] || "straight";
  const example = getFitStyleExample(leg);
  const isIllustration = questionId === "fabric" || (questionId === "shoes" && selected && selected !== "mixed");
  return <aside className="fit-live-preview">
    <div className="fit-preview-title">{questionId === "fabric" ? "A closer look at denim" : questionId === "shoes" ? "The finishing detail" : `${shapeNames[leg]} in real life`}</div>
    {questionId === "shoes" && selected && selected !== "mixed" ? <FitChoiceVisual questionId="shoes" value={selected} /> : questionId === "fabric" ? <FabricVisual value={selected === "unsure" || !selected ? "structured" : selected} /> : <><FitAffiliateDisclosure /><FitProductEmbed product={example} /><FitProductReference product={example} source="quiz_sidebar_example" /></>}
    <div className="fit-preview-note" aria-live="polite"><strong>{selected ? "A useful clue" : "Start with what you know"}</strong><p>{selected ? choiceHints[questionId]?.[selected] : "Tap a card. You can compare your options before moving on."}</p></div>
    <small>{isIllustration ? "Generated illustration for guidance, not a product photo." : "A style example, not your personalized match. Photo and shopping card supplied by ShopMy."}</small>
  </aside>;
}

export function DenimResultMap({ result }) {
  return <div className="fit-denim-map">
    <JeanIllustration leg={result.leg} />
    <div><span>Generated cut illustration · not an exact garment</span><strong>{result.labels.leg}</strong></div>
  </div>;
}

export function FitTrendNote() {
  return <details className="fit-trend-note">
    <summary>Why these shapes?</summary>
    <p>A mix of lasting favorites and current style directions—not a popularity ranking. Trends do not add points to your fit result.</p>
    <p>Style references checked September 24, 2026: <a href="https://www.vogue.com/article/fall-denim-trends-experts" target="_blank" rel="noopener noreferrer">Vogue’s denim edit</a>, <a href="https://www.vogue.com/article/fall-runway-denim-styles" target="_blank" rel="noopener noreferrer">runway shapes</a>, and <a href="https://www.madewell.com/womens/jeans/baggy-jeans/darted-barrel-leg/" target="_blank" rel="noopener noreferrer">Madewell’s barrel collection</a>. Retailer best-seller labels are not independent sales data.</p>
  </details>;
}

export function FitSilhouettePlayground() {
  const [leg, setLeg] = useState("straight");
  const example = getFitStyleExample(leg);
  return <div className="fit-playground">
    <p>Find a line you love.</p>
    <FitAffiliateDisclosure />
    <FitProductEmbed product={example} priority />
    <div className="fit-shape-controls" role="group" aria-label="Explore jean shapes">{Object.entries(shapeNames).map(([value, label]) => <button key={value} type="button" aria-pressed={leg === value} onClick={() => setLeg(value)}>{label}</button>)}</div>
    <FitProductReference product={example} source="fit_landing_example" />
    <span>Real product examples. Choose a shape, not a body type.</span>
    <small className="fit-example-disclosure">Photos and shopping cards supplied by ShopMy. Stock and fit need checking.</small>
    <FitTrendNote />
  </div>;
}
