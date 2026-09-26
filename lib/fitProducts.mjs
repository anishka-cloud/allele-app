// Brand product pages checked 2026-09-24. Facts apply to the named wash/SKU.
// No live inventory, pricing, review scores, size predictions or fit guarantees.
// ShopMy trackers must be issued by ShopMy; never synthesize one for a retailer.
const levis = "https://www.levi.com/US/en_US/clothing/women/jeans/";
const photo = (asset) => `https://lscoglobal.scene7.com/is/image/lscoglobal/${asset}?fit=crop%2C1&fmt=jpeg&hei=800&qlt=80&wid=640`;
const checkedOn = "2026-09-24";

export const fitProducts = [
  {
    id: "madewell-barrel", brand: "Madewell", name: "The Barrel-Leg Jean", wash: "Rinse wash · OA868 / DM9455",
    rise: "low", legs: ["barrel"], fabric: "rigid", thigh: "relaxed", riseIn: 11.25, referenceSize: "27 waist", inseams: [26.5],
    facts: ["Designed to sit low on the hips · curved leg", "Roomy through seat, thigh and rise", "100% cotton · no stretch · button fly"],
    caution: "Low-slung describes how it is worn, not a short front-rise measurement: the listed rise is 11¼″. Compare both waistband position and the ankle-length inseam before buying.",
    sourceUrl: "https://www.madewell.com/p/womens/clothing/jeans/the-barrel-leg-jean/OA868/?ccode=DM9455",
    imageUrl: "https://www.madewell.com/images/OA868_DM9455_m_a?fit=crop&fmt=jpeg&hei=1000&qlt=75&wid=800",
    checkedOn,
  },
  {
    id: "af-curve-love-90s", brand: "Abercrombie & Fitch", name: "Curve Love High Rise 90s Straight", wash: "Light · 63108892 / 08",
    rise: "high", legs: ["straight"], fabric: "structured", curvy: true, thigh: "eased", riseIn: 10.5, inseams: [27.5, 29.5, 31.5],
    facts: ["High rise · straight leg", "99% cotton, 1% elastane", "Extra 2″ through hip and thigh vs. Classic"],
    caution: "The waist and hips are still fitted. Added hip room is a reason to try this cut, not a promise that the waist will fit.",
    sourceUrl: "https://www.abercrombie.com/shop/us/p/curve-love-high-rise-90s-straight-jean-63108892?categoryId=12261&faceout=model&gridProductPosition=86&pagefm=navigation-swatch&prodvm=navigation-swatch&seq=08",
    imageUrl: "https://img.abercrombie.com/is/image/anf/KIC_155-7086-01958-280_model1?policy=product-medium",
    checkedOn,
  },
  {
    id: "levis-501", brand: "Levi’s", name: "501 Original Fit", wash: "Time Take · 125010681",
    rise: "high", legs: ["straight"], fabric: "structured", thigh: "regular", riseIn: 10.75, referenceSize: "27 waist", inseams: [],
    facts: ["High rise · straight leg", "99% cotton, 1% elastane", "Regular through the thigh · button fly"],
    caution: "This wash has a little stretch. Other 501 washes use different blends, so check the exact pair before buying.",
    sourceUrl: `${levis}straight/501-original-fit-womens-jeans/p/125010681`,
    imageUrl: photo("WB_12501-0681_GLO_CM_DA"), amazonQuery: "Levis womens 501 Original Fit jeans Time Take", checkedOn,
  },
  {
    id: "levis-314", brand: "Levi’s", name: "314 Shaping Straight", wash: "River Rock · 196310187",
    rise: "mid", legs: ["straight"], fabric: "comfort_stretch", thigh: "fitted", frontPanel: true, riseIn: 9.25, referenceSize: "27 waist", inseams: [28, 30, 32, 34],
    facts: ["Mid rise · straight leg", "Stretch denim with 2% elastane", "Front support panel"],
    caution: "The built-in front panel may feel restrictive if pressure at the waistband is your main concern.",
    sourceUrl: `${levis}straight/314-shaping-straight-womens-jeans/p/196310187`,
    imageUrl: photo("WB_19631-0187_GLO_CM_FV"), amazonQuery: "Levis womens 314 Shaping Straight jeans River Rock", checkedOn,
  },
  {
    id: "levis-724", brand: "Levi’s", name: "724 High Rise Straight", wash: "Kick Start · 188830385",
    rise: "high", legs: ["slim_straight", "straight"], fabric: "structured", thigh: "slim", riseIn: 10.25, referenceSize: "27 waist", inseams: [],
    facts: ["High rise · slim through hip and thigh", "Straight leg with a narrower opening", "98% cotton, 2% LYCRA · lower stretch"],
    caution: "A closer fit through the upper leg. It may not supply the extra hip or thigh room you need.",
    sourceUrl: `${levis}straight/724-high-rise-straight-womens-jeans/p/188830385`,
    imageUrl: photo("WB_18883-0385_LSE_CM_DA"),
    amazonQuery: "Levis womens 724 High Rise Straight jeans Kick Start", checkedOn,
  },
  {
    id: "levis-725", brand: "Levi’s", name: "725 High Rise Bootcut", wash: "Eternal Indigo · 187590196",
    rise: "high", legs: ["bootcut"], fabric: "comfort_stretch", thigh: "slim", riseIn: 10.25, referenceSize: "27 waist", inseams: [],
    facts: ["High rise · bootcut hem", "Slim through hip and thigh", "80% cotton, 19% polyester, 1% elastane"],
    caution: "The opening is below the knee; a bootcut does not automatically add room through the hips or thighs.",
    sourceUrl: `${levis}bootcut/725-high-rise-bootcut-womens-jeans/p/187590196`,
    imageUrl: photo("WB_18759-0196_GLO_CM_DA"), amazonQuery: "Levis womens 725 High Rise Bootcut jeans Eternal Indigo", checkedOn,
  },
  {
    id: "levis-315", brand: "Levi’s", name: "315 Shaping Bootcut", wash: "Eternal Indigo · 196320162",
    rise: "mid", legs: ["bootcut"], fabric: "comfort_stretch", thigh: "fitted", frontPanel: true, riseIn: 9.25, referenceSize: "27 waist", inseams: [30, 32, 34],
    facts: ["Mid rise · bootcut hem", "80% cotton, 19% polyester, 1% elastane", "Front support panel"],
    caution: "Fitted above the knee with a front panel. Try sitting and bending before deciding whether that support feels comfortable.",
    sourceUrl: `${levis}bootcut/315-shaping-bootcut-womens-jeans/p/196320162`,
    imageUrl: photo("WB_19632-0162_GLO_CM_DA"), amazonQuery: "Levis womens 315 Shaping Bootcut jeans Eternal Indigo", checkedOn,
  },
  {
    id: "levis-ribcage-wide", brand: "Levi’s", name: "Ribcage Wide Leg", wash: "Barely Freezing · A60810009",
    rise: "high", legs: ["wide"], fabric: "rigid", thigh: "slim", riseIn: 12, referenceSize: "27 waist", inseams: [30, 32, 34],
    facts: ["Super-high rise · wide leg", "100% cotton · no stretch", "Fitted through hip and thigh"],
    caution: "The 12″ reference rise is especially high. The wide hem does not mean a relaxed seat or upper thigh.",
    sourceUrl: `${levis}wide-leg/ribcage-wide-leg-womens-jeans/p/A60810009`,
    imageUrl: photo("WB_A6081-0009_GLO_CM_DA"), amazonQuery: "Levis womens Ribcage Wide Leg jeans Barely Freezing", checkedOn,
  },
  {
    id: "levis-low-loose", brand: "Levi’s", name: "Low Loose", wash: "Dream Nice Dreams · A55660002",
    rise: "low", legs: ["wide"], fabric: "rigid", thigh: "relaxed", riseIn: 9.125, referenceSize: "27 waist", inseams: [],
    facts: ["Low rise · wide, straight leg", "Relaxed through hip and thigh", "100% cotton · no stretch"],
    caution: "Levi’s flags this wash as running small. Compare the current size guide and try-on feel rather than assuming your usual size.",
    sourceUrl: `${levis}loose/low-loose-womens-jeans/p/A55660002`,
    imageUrl: photo("WB_A5566-0002_GLO_CM_DA"), amazonQuery: "Levis womens Low Loose jeans Dream Nice Dreams", checkedOn,
  },
];

export function getFitAmazonUrl(product) {
  if (!product.amazonQuery) return null;
  const url = new URL("https://www.amazon.com/s");
  url.searchParams.set("k", product.amazonQuery);
  url.searchParams.set("tag", "anishkanawa00-20");
  return url.toString();
}

const fabricNames = { rigid: "rigid denim", structured: "denim with a little give", comfort_stretch: "soft stretch denim" };

export function recommendFitProducts(result, measurements = {}) {
  if (!result) return [];
  const needsRoom = result.fitIssue === "hip_thigh_pull";
  return fitProducts.filter(product => product.legs.includes(result.leg)).map(product => {
    let score = 4;
    const reasons = [`The ${result.labels.leg.toLowerCase()} cut follows your recommended leg shape.`];
    const tradeoffs = [];
    if (product.rise === result.rise) { score += 4; reasons.push(`Its ${product.rise} rise agrees with your result.`); }
    else { score -= 3; tradeoffs.push(`This is a ${product.rise} rise; your result points toward ${result.rise}.`); }
    if (product.fabric === result.fabric) { score += 3; reasons.push(`The listed fabric fits your preference for ${fabricNames[result.fabric]}.`); }
    else { score -= 1; tradeoffs.push(`This version uses ${fabricNames[product.fabric]}; you were looking for ${fabricNames[result.fabric]}.`); }
    if (result.fitIssue === "waist_gap") {
      if (product.curvy) { score += 7; reasons.unshift("Extra room through the hip and thigh makes this worth trying for the waist gap you described."); }
      else tradeoffs.push("This is not listed as a curvy cut; a back-waist gap may still need a different pattern or tailoring.");
    }
    if (needsRoom) {
      if (product.curvy || product.thigh === "relaxed") { score += 5; reasons.unshift("The extra hip/thigh room responds to the pulling you reported."); }
      else if (product.thigh === "slim" || product.thigh === "fitted") { score -= 6; tradeoffs.push("The upper leg is fitted, so it may repeat the hip or thigh pulling you described."); }
    }
    if (result.fitIssue === "front_tight" && product.frontPanel) { score -= 5; tradeoffs.push("The front support panel may work against your need for less waistband pressure."); }
    const targetInseam = Number(measurements.inseam) / (measurements.unit === "cm" ? 2.54 : 1);
    const targetRise = Number(measurements.frontRise) / (measurements.unit === "cm" ? 2.54 : 1);
    let lengthNote = "Check the inseam offered in your size and chosen wash; the named style alone does not establish your length.";
    if (Number.isFinite(targetInseam) && targetInseam > 0 && product.inseams.length) {
      const nearest = product.inseams.reduce((a, b) => Math.abs(a - targetInseam) <= Math.abs(b - targetInseam) ? a : b);
      lengthNote = `Your saved inseam is ${measurements.inseam} ${measurements.unit === "cm" ? "cm" : "in"}. The listed lengths include ${nearest}″; compare with your shoes and intended hem. Availability needs checking.`;
      if (Math.abs(nearest - targetInseam) < 0.6) score += 2;
    } else if (result.length === "petite") lengthNote = "Check for a short inseam in this wash. A shorter hem is not the same as petite rise and knee placement.";
    else if (result.length === "tall") lengthNote = "Confirm a long enough inseam before buying; a standard length may not preserve this shape on you.";
    if (Number.isFinite(targetRise) && targetRise > 0 && Math.abs(targetRise - product.riseIn) > 1) {
      tradeoffs.push(`Its listed ${product.riseIn}″ rise differs from your saved ${measurements.frontRise} ${measurements.unit === "cm" ? "cm" : "in"}${product.referenceSize ? ` (brand reference: size ${product.referenceSize})` : ""}.`);
    }
    const aligned = product.rise === result.rise && product.fabric === result.fabric && !(needsRoom && ["slim", "fitted"].includes(product.thigh)) && !(result.fitIssue === "front_tight" && product.frontPanel);
    return { ...product, score, reasons, tradeoffs, lengthNote, matchLabel: aligned ? "Cut, rise & fabric align" : "A nearby option · compare the details" };
  }).sort((a,b) => b.score - a.score || a.id.localeCompare(b.id)).slice(0, 3);
}
