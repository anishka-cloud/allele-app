"use client";

import { useState, useEffect, useMemo, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  SEASONS,
  TIERS,
  productsFor,
  neutralsFor,
  contrastFor,
  pinterestPredictsFor,
  isDarkHex,
  metalGradient,
  seasonIdFromName,
} from "@/lib/handoffSeasons";
import { track, trackEvent } from "@/lib/analytics";
import { getShopUrl, withUTM } from "@/lib/shopLinks";
import "./results.css";

const SEASON_IDS = Object.keys(SEASONS);
const FOUNDATION_URL = "https://shopmy.us/shop/collections/4652210";
const CONCEALER_URL = "https://shopmy.us/shop/collections/4653190";
const PRIORITY_ORDER = {
  lips: ["lips", "lipLiner", "blush", "bronzer", "eyes", "nails"],
  foundation: ["lips", "lipLiner", "blush", "bronzer", "eyes", "nails"],
  wardrobe: null,
  full: null,
};
const UNDERTONE_COLORS = {
  warm: "#C4873A",
  cool: "#9BAEC4",
  neutral: "#B8A99A",
  "warm-neutral": "#C4A87A",
  olive: "#A89968",
};

function getRetailerName(url) {
  if (!url) return "ShopMy";
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    
    // Check query params for inner redirect destination
    const params = parsed.searchParams;
    for (const param of ["url", "ued", "murl", "destination"]) {
      const val = params.get(param);
      if (val) {
        try {
          const innerUrl = new URL(val);
          return getRetailerName(innerUrl.href);
        } catch (e) {
          const match = val.match(/https?:\/\/([^/]+)/);
          if (match) {
            return cleanHostName(match[1].toLowerCase());
          }
        }
      }
    }
    
    // Check Selfridges style paths
    if (parsed.pathname.includes("destination:")) {
      const parts = parsed.pathname.split("destination:");
      if (parts.length > 1) {
        try {
          const dest = decodeURIComponent(parts[1]);
          const innerUrl = new URL(dest);
          return getRetailerName(innerUrl.href);
        } catch (e) {}
      }
    }

    return cleanHostName(host);
  } catch (e) {
    return "ShopMy";
  }
}

function cleanHostName(host) {
  let cleaned = host.replace("www.", "");
  if (cleaned.startsWith("apiv3.")) cleaned = cleaned.replace("apiv3.", "");
  if (cleaned.startsWith("static.")) cleaned = cleaned.replace("static.", "");
  
  if (cleaned.includes("sephora")) return "Sephora";
  if (cleaned.includes("ulta")) return "Ulta";
  if (cleaned.includes("glossier")) return "Glossier";
  if (cleaned.includes("rarebeauty")) return "Rare Beauty";
  if (cleaned.includes("milkmakeup")) return "Milk Makeup";
  if (cleaned.includes("macys")) return "Macy's";
  if (cleaned.includes("boots")) return "Boots";
  if (cleaned.includes("selfridges")) return "Selfridges";
  if (cleaned.includes("spacenk")) return "Space NK";
  if (cleaned.includes("revolve")) return "Revolve";
  if (cleaned.includes("bluemercury")) return "Bluemercury";
  if (cleaned.includes("shopmy.us")) return "ShopMy";
  if (cleaned.includes("nordstrom")) return "Nordstrom";
  if (cleaned.includes("target")) return "Target";
  
  const parts = cleaned.split(".");
  if (parts.length > 0) {
    const domain = parts[0];
    return domain.charAt(0).toUpperCase() + domain.slice(1);
  }
  return "Retailer";
}

function getMatchRationale(category, seasonName, tier, p) {
  const undertone = seasonName.toLowerCase().includes("summer") || seasonName.toLowerCase().includes("winter") ? "cool" : "warm";
  
  const rationales = {
    foundation: {
      cool: `Calibrated to match cool skin without looking ashy.`,
      warm: `Rich peach-golden undertone to enhance your natural warmth.`,
      neutral: `Perfect neutral baseline that adapts to your season's warmth.`
    },
    concealer: {
      cool: `Rosy-cool highlight that melts seamlessly into the skin.`,
      warm: `Peach corrector designed to neutralize cool shadows naturally.`,
      neutral: `Universal spot corrector that locks to your exact skin depth.`
    },
    lips: {
      cool: `Muted cool mauve designed to bring life to cool lip tones.`,
      warm: `Warm terracotta-peach gloss to lift your natural lip pigment.`,
      neutral: `Perfect rosewood neutral matching your soft undertone.`
    },
    lipLiner: {
      cool: `Soft ash-rose pencil to define the lip line without harshness.`,
      warm: `Warm neutral liner to structure lip color without turning orange.`,
      neutral: `Soft universal lip cheat shade for editorial definition.`
    },
    blush: {
      cool: `Cool pink flush that mimics your natural healthy temperature.`,
      warm: `Warm peach-coral to wash cheeks in golden-hour warmth.`,
      neutral: `Natural soft mauve blush that structures without looking heavy.`
    },
    eyes: {
      cool: `Mauve-taupe shadows to sculpt and dramatize cool gazes.`,
      warm: `Warm bronze-gold shimmers that draw out the gold flecks in your eyes.`,
      neutral: `Editorial soft neutrals that define your eyes naturally.`
    },
    bronzer: {
      cool: `Soft grey-toned contour to sculpt without warm orange lines.`,
      warm: `Sun-kissed honey wash that warms the high points of your face.`,
      neutral: `Balanced neutral sculpting powder to define cheekbones.`
    },
    nails: {
      cool: `Crisp cool glaze that complements your hands elegantly.`,
      warm: `Warm creamy lacquer that highlights your warm skin undertone.`,
      neutral: `Sophisticated neutral glaze that finishes your look.`
    }
  };

  // Specific seasonal highlights
  if (category === "foundation") {
    if (seasonName.includes("Winter")) return `Crisp cool base that matches Winter's porcelain-to-espresso depth.`;
    if (seasonName.includes("Autumn")) return `Golden-olive base that harmonizes with Autumn's muted depth.`;
    if (seasonName.includes("Spring")) return `Fresh peach-golden base to lift Spring's clear complexion.`;
    if (seasonName.includes("Summer")) return `Cool rosy-neutral finish that prevents yellowing in Summer skin.`;
  }
  
  if (category === "lips") {
    if (seasonName.includes("Winter")) return `Vivid high-contrast berry shade matching Winter's clarity.`;
    if (seasonName.includes("Autumn")) return `Warm terracotta-brick tone to anchor Autumn's rich warmth.`;
    if (seasonName.includes("Spring")) return `Fresh golden-peach tint that echoes Spring's high energy.`;
    if (seasonName.includes("Summer")) return `Dusty rose-pink gloss complementing Summer's soft elegance.`;
  }
  
  if (category === "blush") {
    if (seasonName.includes("Winter")) return `Cool plum-rose flush that matches Winter's natural temperature.`;
    if (seasonName.includes("Autumn")) return `Warm terracotta-clay to mimic Autumn's earthy gold sheen.`;
    if (seasonName.includes("Spring")) return `Bright coral-peach pigment to lift Spring's fresh cheeks.`;
    if (seasonName.includes("Summer")) return `Soft pink-orchid flush mimicking your natural cool blush.`;
  }

  const catMap = rationales[category] || rationales.lips;
  return catMap[undertone] || catMap.neutral;
}

const FOUNDATION_HEROES = {
  "True Autumn": {
    compositionNumber: "01",
    figNumber: "01",
    brand: "Fenty Beauty",
    name: "Pro Filt'r Soft Matte Longwear Foundation",
    shadeNumber: "280",
    shadeName: "Sand",
    shadeFamily: "Sand Medium · Warm",
    swatchHex: "#C19476",
    shadeLadder: [
      { hex: "#E5C5A4", code: "130", label: "Light" },
      { hex: "#D7AA86", code: "220", label: "Light-Med" },
      { hex: "#C19476", code: "280", label: "Medium", representative: true },
      { hex: "#A6764F", code: "340", label: "Med-Deep" },
      { hex: "#80553A", code: "410", label: "Deep" },
    ],
    productImageUrl: "https://static.shopmy.us/pins/zoom-50723484-1775229890533-UK200060793_FENTY.jpg",
    shopUrl: "https://www.awin1.com/awclick.php?mid=59805&id=740219&clickref=user-267437-pin-50723484-puser-null-src-web&ued=https%3A%2F%2Fwww.spacenk.com%2Fuk%2Fmakeup%2Fcomplexion%2Ffoundation%2Ffenty-beauty-pro-filtr-soft-matte-longwear-foundation-UK200060793.html",
    price: "$40",
    source: "Space NK",
    undertone: "warm",
    depth: "medium-light",
    finish: "matte",
    palettePosition: 3,
    reasoningText: "Because you're a True Autumn — warm, muted, deep — this reads warm-neutral with golden undertone. Your exact lane.",
    formulaNote: "Oxidizes slightly on oily skin — pick one shade lighter if you sit between.",
  },
  "Dark Autumn": {
    compositionNumber: "01",
    figNumber: "01",
    brand: "Rare Beauty",
    name: "Liquid Touch Weightless Foundation",
    shadeNumber: "480W",
    shadeName: "480W",
    shadeFamily: "Warm · Deep",
    swatchHex: "#8E5B36",
    shadeLadder: [
      { hex: "#CCA988", code: "130W", label: "Fair" },
      { hex: "#B89373", code: "240W", label: "Light-Med" },
      { hex: "#9D7752", code: "380W", label: "Medium" },
      { hex: "#8E5B36", code: "480W", label: "Deep", representative: true },
      { hex: "#6A4128", code: "540W", label: "Deepest" },
    ],
    productImageUrl: null,
    shopUrl: null,
    price: "$30",
    source: "Sephora",
    undertone: "warm",
    depth: "deep",
    finish: "natural",
    palettePosition: 6,
    reasoningText: "Because you're a Dark Autumn — warm, deep, restrained — this reads warm-rich with chocolate depth. Your exact lane.",
    formulaNote: "Light-medium buildable coverage with a satin finish. Stays put 8+ hours without going matte-dry.",
  },
  "Dark Winter": {
    compositionNumber: "01",
    figNumber: "01",
    brand: "Rare Beauty",
    name: "Liquid Touch Weightless Foundation",
    shadeNumber: "480C",
    shadeName: "480C",
    shadeFamily: "Cool · Deep",
    swatchHex: "#7B5944",
    shadeLadder: [
      { hex: "#C8A788", code: "130C", label: "Fair" },
      { hex: "#B49276", code: "240C", label: "Light-Med" },
      { hex: "#997757", code: "380C", label: "Medium" },
      { hex: "#7B5944", code: "480C", label: "Deep", representative: true },
      { hex: "#5D4232", code: "540C", label: "Deepest" },
    ],
    productImageUrl: null,
    shopUrl: null,
    price: "$30",
    source: "Sephora",
    undertone: "cool",
    depth: "deep",
    finish: "natural",
    palettePosition: 5,
    reasoningText: "Because you're a Dark Winter — cool, deep, dramatic — this reads cool-neutral with velvet depth. Your exact lane.",
    formulaNote: "Light-medium buildable coverage with a satin finish. Reads neutral-cool, never warms up over the day.",
  },
  "True Winter": {
    compositionNumber: "01",
    figNumber: "01",
    brand: "Rare Beauty",
    name: "Liquid Touch Weightless Foundation",
    shadeNumber: "380C",
    shadeName: "380C",
    shadeFamily: "Cool · Medium-Deep",
    swatchHex: "#B58E73",
    shadeLadder: [
      { hex: "#D8BCA1", code: "130C", label: "Fair" },
      { hex: "#C8A788", code: "240C", label: "Light" },
      { hex: "#B58E73", code: "380C", label: "Medium", representative: true },
      { hex: "#997757", code: "460C", label: "Med-Deep" },
      { hex: "#7B5944", code: "540C", label: "Deep" },
    ],
    productImageUrl: null,
    shopUrl: null,
    price: "$30",
    source: "Sephora",
    undertone: "cool",
    depth: "medium-deep",
    finish: "natural",
    palettePosition: 1,
    reasoningText: "Because you're a True Winter — cool, high-contrast, clear — this reads true cool with no warmth. Your exact lane.",
    formulaNote: "Light-medium buildable coverage. Skip yellow-based shades entirely — they oxidize orange on true-cool skin.",
  },
  "Bright Winter": {
    compositionNumber: "01",
    figNumber: "01",
    brand: "Rare Beauty",
    name: "Liquid Touch Weightless Foundation",
    shadeNumber: "320C",
    shadeName: "320C",
    shadeFamily: "Cool · Medium",
    swatchHex: "#C9A586",
    shadeLadder: [
      { hex: "#EAD2B7", code: "130C", label: "Fair" },
      { hex: "#DCBDA1", code: "240C", label: "Light" },
      { hex: "#C9A586", code: "320C", label: "Medium", representative: true },
      { hex: "#997757", code: "420C", label: "Med-Deep" },
      { hex: "#7B5944", code: "540C", label: "Deep" },
    ],
    productImageUrl: null,
    shopUrl: null,
    price: "$30",
    source: "Sephora",
    undertone: "cool",
    depth: "medium",
    finish: "natural",
    palettePosition: 1,
    reasoningText: "Because you're a Bright Winter — cool, vivid, saturated — this reads cool-clear with full intensity. Your exact lane.",
    formulaNote: "Light-medium buildable coverage. Clear-toned cool shades — avoid muted or beige-leaning bases.",
  },
  "Clear Spring": {
    compositionNumber: "01",
    figNumber: "01",
    brand: "Rare Beauty",
    name: "Liquid Touch Weightless Foundation",
    shadeNumber: "230W",
    shadeName: "230W",
    shadeFamily: "Warm · Light-Medium",
    swatchHex: "#D7B596",
    shadeLadder: [
      { hex: "#EAD2B7", code: "100W", label: "Fair" },
      { hex: "#D7B596", code: "230W", label: "Medium", representative: true },
      { hex: "#C19476", code: "280W", label: "Med-Deep" },
      { hex: "#9D7752", code: "380W", label: "Deep" },
      { hex: "#6A4128", code: "540W", label: "Deepest" },
    ],
    productImageUrl: "https://static.shopmy.us/pins/zoom-50960629-1775390781797-Foundation-100W-SKU_dc8e5700-8cf9-4357-9ccb-57e0c580a3e1.jpg",
    shopUrl: "https://apiv3.shopmy.us/api/redirect_click?clickId=267fac57-026a-4335-9048-5cd4f9141089&cid=user-267437-pin-50960629-puser-null-src-web&url=https%3A%2F%2Frarebeauty.com%2Fproducts%2Fliquid-touch-weightless-foundation-1%3Futm_source%3DShopMy%26utm_medium%3Daffiliate%26utm_campaign%3DNish%26utm_content%3DShade%20DNA%20%E2%80%94%20Clear%20Spring%26utm_referrer%3Dshopmy.us",
    price: "$30",
    source: "Rare Beauty",
    undertone: "warm",
    depth: "light-medium",
    finish: "natural",
    palettePosition: 2,
    reasoningText: "Because you're a Clear Spring — bright, warm, clear — this reads warm-clear with peach-golden undertone. Your exact lane.",
    formulaNote: "Light-medium buildable coverage with a satin finish. Builds up smoothly without cake on bright-warm skin.",
  },
  "True Spring": {
    compositionNumber: "01",
    figNumber: "01",
    brand: "Glossier",
    name: "Perfecting Skin Tint Sheer Skin Enhancer",
    shadeNumber: "G3",
    shadeName: "G3",
    shadeFamily: "Warm · Medium",
    swatchHex: "#D2A87E",
    shadeLadder: [
      { hex: "#E5C6A8", code: "G1", label: "Light" },
      { hex: "#DCB793", code: "G2", label: "Light-Med" },
      { hex: "#D2A87E", code: "G3", label: "Medium", representative: true },
      { hex: "#BE9168", code: "G4", label: "Med-Deep" },
      { hex: "#A07551", code: "G5", label: "Deep" },
    ],
    productImageUrl: "https://www.sephora.com/productimages/sku/s2649085-main-zoom.jpg?imwidth=2000",
    shopUrl: "https://click.linksynergy.com/deeplink?id=8yaPBDQV8ls&mid=2417&u1=user-267437-pin-50961589-puser-null-src-web&murl=https%3A%2F%2Fwww.sephora.com%2Fproduct%2Fglossier-perfecting-skin-tint-for-dewy-sheer-coverage-P504782%3FskuId%3D2649085",
    price: "$28",
    source: "Sephora",
    undertone: "warm",
    depth: "medium",
    finish: "dewy",
    palettePosition: 1,
    reasoningText: "Because you're a True Spring — warm, clear, golden — this reads warm-clear with full golden warmth. Your exact lane.",
    formulaNote: "Sheer-coverage dewy skin tint. The warmest season needs warmth without heaviness — this delivers both.",
  },
  "Light Spring": {
    compositionNumber: "01",
    figNumber: "01",
    brand: "Glossier",
    name: "Perfecting Skin Tint Sheer Skin Enhancer",
    shadeNumber: "G2",
    shadeName: "G2",
    shadeFamily: "Warm · Light",
    swatchHex: "#DCB793",
    shadeLadder: [
      { hex: "#EFD5BB", code: "G1", label: "Fair" },
      { hex: "#E5C6A8", code: "G1.5", label: "Light" },
      { hex: "#DCB793", code: "G2", label: "Light-Med", representative: true },
      { hex: "#D2A87E", code: "G3", label: "Medium" },
      { hex: "#C09668", code: "G4", label: "Med-Deep" },
    ],
    productImageUrl: "https://www.sephora.com/productimages/sku/s2649085-main-zoom.jpg?imwidth=2000",
    shopUrl: "https://click.linksynergy.com/deeplink?id=8yaPBDQV8ls&mid=2417&u1=user-267437-pin-50962789-puser-null-src-web&murl=https%3A%2F%2Fwww.sephora.com%2Fproduct%2Fglossier-perfecting-skin-tint-for-dewy-sheer-coverage-P504782%3FskuId%3D2649085",
    price: "$28",
    source: "Sephora",
    undertone: "warm",
    depth: "light",
    finish: "dewy",
    palettePosition: 8,
    reasoningText: "Because you're a Light Spring — warm, soft, fair — this reads soft warm-peach without going bright or dusty. Your exact lane.",
    formulaNote: "Sheer-coverage dewy skin tint. Stays soft on light depth — won't overwhelm fair coloring.",
  },
  "Soft Summer": {
    compositionNumber: "01",
    figNumber: "01",
    brand: "Rare Beauty",
    name: "Liquid Touch Weightless Foundation",
    shadeNumber: "240N",
    shadeName: "240N",
    shadeFamily: "Cool-Neutral · Medium",
    swatchHex: "#CBA98C",
    shadeLadder: [
      { hex: "#E5CDB5", code: "100N", label: "Fair" },
      { hex: "#DCBAA0", code: "220N", label: "Light-Med" },
      { hex: "#CBA98C", code: "240N", label: "Medium", representative: true },
      { hex: "#9B8068", code: "380N", label: "Med-Deep" },
      { hex: "#614836", code: "540N", label: "Deepest" },
    ],
    productImageUrl: "https://static.shopmy.us/pins/zoom-51025966-1775429970327-Foundation-100W-SKU_dc8e5700-8cf9-4357-9ccb-57e0c580a3e1.jpg",
    shopUrl: "https://apiv3.shopmy.us/api/redirect_click?clickId=9728e5ae-cf40-483a-8c1b-1d9dc5592be0&cid=user-267437-pin-51025966-puser-null-src-web&url=https%3A%2F%2Frarebeauty.com%2Fproducts%2Fliquid-touch-weightless-foundation-1%3Futm_source%3DShopMy%26utm_medium%3Daffiliate%26utm_campaign%3DNish%26utm_content%3DShade%20DNA%20%E2%80%94%20Soft%20Summer%26utm_referrer%3Dshopmy.us",
    price: "$30",
    source: "Rare Beauty",
    undertone: "cool",
    depth: "medium",
    finish: "natural",
    palettePosition: 6,
    reasoningText: "Because you're a Soft Summer — cool, muted, gentle — this reads cool-neutral with dusty rose softness. Your exact lane.",
    formulaNote: "Light-medium buildable coverage. Stay neutral-cool, never warm — golden bases pull orange on muted skin.",
  },
  "True Summer": {
    compositionNumber: "01",
    figNumber: "01",
    brand: "Rare Beauty",
    name: "Liquid Touch Weightless Foundation",
    shadeNumber: "230C",
    shadeName: "230C",
    shadeFamily: "Cool · Medium",
    swatchHex: "#C9A78A",
    shadeLadder: [
      { hex: "#E8CCB5", code: "100C", label: "Fair" },
      { hex: "#D1B193", code: "220C", label: "Light-Med" },
      { hex: "#C9A78A", code: "230C", label: "Medium", representative: true },
      { hex: "#997757", code: "380C", label: "Med-Deep" },
      { hex: "#5D4232", code: "540C", label: "Deepest" },
    ],
    productImageUrl: "https://static.shopmy.us/pins/zoom-51029093-1775431472236-Foundation-100W-SKU_dc8e5700-8cf9-4357-9ccb-57e0c580a3e1.jpg",
    shopUrl: "https://apiv3.shopmy.us/api/redirect_click?clickId=5114c9eb-f11f-44a1-a030-271ae31e9369&cid=user-267437-pin-51029093-puser-null-src-web&url=https%3A%2F%2Frarebeauty.com%2Fproducts%2Fliquid-touch-weightless-foundation-1%3Futm_source%3DShopMy%26utm_medium%3Daffiliate%26utm_campaign%3DNish%26utm_content%3DShade%20DNA%20%E2%80%94%20True%20Summer%26utm_referrer%3Dshopmy.us",
    price: "$30",
    source: "Rare Beauty",
    undertone: "cool",
    depth: "medium",
    finish: "natural",
    palettePosition: 3,
    reasoningText: "Because you're a True Summer — cool, rosy, clear — this reads cool-pink with soft rosy clarity. Your exact lane.",
    formulaNote: "Light-medium buildable coverage. Stay cool — warm shades pull orange on true-cool skin.",
  },
  "Light Summer": {
    compositionNumber: "01",
    figNumber: "01",
    brand: "Glossier",
    name: "Perfecting Skin Tint Sheer Skin Enhancer",
    shadeNumber: "M2",
    shadeName: "M2",
    shadeFamily: "Cool · Light",
    swatchHex: "#DCB89C",
    shadeLadder: [
      { hex: "#EED4BC", code: "M1", label: "Fair" },
      { hex: "#E5C6A8", code: "M1.5", label: "Light" },
      { hex: "#DCB89C", code: "M2", label: "Light-Med", representative: true },
      { hex: "#CFA98A", code: "M3", label: "Medium" },
      { hex: "#BC9573", code: "M4", label: "Med-Deep" },
    ],
    productImageUrl: "https://www.sephora.com/productimages/sku/s2649085-main-zoom.jpg?imwidth=2000",
    shopUrl: "https://click.linksynergy.com/deeplink?id=8yaPBDQV8ls&mid=2417&u1=user-267437-pin-51031461-puser-null-src-web&murl=https%3A%2F%2Fwww.sephora.com%2Fproduct%2Fglossier-perfecting-skin-tint-for-dewy-sheer-coverage-P504782%3FskuId%3D2649085",
    price: "$28",
    source: "Sephora",
    undertone: "cool",
    depth: "light",
    finish: "dewy",
    palettePosition: 1,
    reasoningText: "Because you're a Light Summer — cool, soft, fair — this reads soft cool-pink without going peach or deep. Your exact lane.",
    formulaNote: "Sheer-coverage dewy skin tint. Skip yellow-based shades — they oxidize warm on cool-light skin.",
  },
  "Soft Autumn": {
    compositionNumber: "01",
    figNumber: "01",
    brand: "Rare Beauty",
    name: "Liquid Touch Weightless Foundation",
    shadeNumber: "260W",
    shadeName: "260W",
    shadeFamily: "Warm · Medium",
    swatchHex: "#C29873",
    shadeLadder: [
      { hex: "#EAD2B7", code: "100W", label: "Fair" },
      { hex: "#DAB89B", code: "220W", label: "Light-Med" },
      { hex: "#C29873", code: "260W", label: "Medium", representative: true },
      { hex: "#9D7752", code: "380W", label: "Med-Deep" },
      { hex: "#6A4128", code: "540W", label: "Deepest" },
    ],
    productImageUrl: "https://static.shopmy.us/pins/zoom-51038995-1775436617499-Foundation-100W-SKU_dc8e5700-8cf9-4357-9ccb-57e0c580a3e1.jpg",
    shopUrl: "https://apiv3.shopmy.us/api/redirect_click?clickId=cdca45fa-f8d3-4d3e-b7ba-8a674a597dd3&cid=user-267437-pin-51038995-puser-null-src-web&url=https%3A%2F%2Frarebeauty.com%2Fproducts%2Fliquid-touch-weightless-foundation-1%3Futm_source%3DShopMy%26utm_medium%3Daffiliate%26utm_campaign%3DNish%26utm_content%3DShade%20DNA%20%E2%80%94%20Soft%20Autumn%26utm_referrer%3Dshopmy.us",
    price: "$30",
    source: "Rare Beauty",
    undertone: "warm",
    depth: "medium",
    finish: "natural",
    palettePosition: 1,
    reasoningText: "Because you're a Soft Autumn — warm, muted, earthy — this reads soft warm-gold with dusty earth tones. Your exact lane.",
    formulaNote: "Light-medium buildable coverage. Warm but never bright — Soft Autumn needs softness, not clarity.",
  },
};

const FOUNDATION_ALTERNATES = {
  "True Autumn": [
    {
      compositionNumber: "02",
      brand: "Armani Beauty",
      name: "Luminous Silk Foundation",
      shadeNumber: "8",
      shadeName: "Warm Beige",
      swatchHex: "#C4926E",
      productImageUrl: "https://static.shopmy.us/pins/zoom-50723843-1775230054750-317-77011643-LUMSILKFDT_8_M",
      shopUrl: "https://prf.hn/click/camref:1011lpZYj/pubref:user-267437-pin-50723843-puser-null-src-web/destination:https%3A%2F%2Fwww.selfridges.com%2FGB%2Fen%2Fcat%2Fgiorgio-armani-luminous-silk-foundation-30ml_317-77011643-LUMSILKFDT%2F",
      price: "$69",
      source: "Selfridges",
      undertone: "warm",
      depth: "medium",
      finish: "luminous",
      palettePosition: 3,
      reasoningText: "Same warm lane in a luminous finish — pick this if your skin runs dry.",
    },
    {
      compositionNumber: "03",
      brand: "Charlotte Tilbury",
      name: "Airbrush Flawless Foundation",
      shadeNumber: "8",
      shadeName: "Warm",
      swatchHex: "#C4926E",
      productImageUrl: "https://static.shopmy.us/pins/zoom-50723621-1775229963399-CTIL-WU42_V1.jpg",
      shopUrl: "http://www.anrdoezrs.net/click-100149615-13237228?sid=user-267437-pin-50723621-puser-null-src-web&url=https%3A%2F%2Fwww.revolve.com%2Fcharlotte-tilbury-airbrush-flawless-foundation-in-15-warm%2Fdp%2FCTIL-WU42%2F",
      price: "$52",
      source: "Revolve",
      undertone: "warm",
      depth: "medium",
      finish: "satin",
      palettePosition: 3,
      reasoningText: "Satin finish — between matte and luminous. Long-wear with a soft natural glow.",
    },
    {
      compositionNumber: "04",
      brand: "Maybelline",
      name: "Fit Me Matte + Poreless Foundation",
      shadeNumber: "235",
      shadeName: "Pure Beige",
      swatchHex: "#BC8E70",
      productImageUrl: "https://static.shopmy.us/pins/zoom-50723760-1775230020998-10213975",
      shopUrl: "https://www.awin1.com/awclick.php?mid=2041&id=740219&clickref=user-267437-pin-50723760-puser-null-src-web&ued=https%3A%2F%2Fwww.boots.com%2Fmaybelline-fit-me-matte-and-poreless-foundation-10213975",
      price: "$10",
      source: "Boots",
      undertone: "warm",
      depth: "medium",
      finish: "matte",
      palettePosition: 3,
      reasoningText: "Budget pick — same warm-medium lane and same matte finish, drugstore price.",
    },
  ],
  "Dark Autumn": [
    {
      compositionNumber: "02",
      brand: "Charlotte Tilbury",
      name: "Hollywood Flawless Filter",
      shadeNumber: "12 Warm",
      shadeName: "12 Warm",
      swatchHex: "#905C3D",
      productImageUrl: null,
      shopUrl: null,
      price: "$52",
      source: "Sephora",
      undertone: "warm",
      depth: "deep",
      finish: "luminous",
      palettePosition: 6,
      reasoningText: "Splurge pick — luminous filter on deep-warm skin, softens without going matte-dry.",
    },
    {
      compositionNumber: "03",
      brand: "L'Oréal Paris",
      name: "True Match Super Blendable Foundation",
      shadeNumber: "W7",
      shadeName: "Caramel Beige",
      swatchHex: "#936034",
      productImageUrl: null,
      shopUrl: null,
      price: "$12",
      source: "Ulta",
      undertone: "warm",
      depth: "deep",
      finish: "natural",
      palettePosition: 6,
      reasoningText: "Drugstore option at $12 — same warm-deep lane, daily-wear formula.",
    },
  ],
  "Dark Winter": [
    {
      compositionNumber: "02",
      brand: "Charlotte Tilbury",
      name: "Hollywood Flawless Filter",
      shadeNumber: "11 Cool",
      shadeName: "11 Cool",
      swatchHex: "#80614A",
      productImageUrl: null,
      shopUrl: null,
      price: "$52",
      source: "Sephora",
      undertone: "cool",
      depth: "deep",
      finish: "luminous",
      palettePosition: 5,
      reasoningText: "Splurge pick — luminous filter on cool-deep skin, never reads ashen.",
    },
    {
      compositionNumber: "03",
      brand: "L'Oréal Paris",
      name: "True Match Super Blendable Foundation",
      shadeNumber: "C7",
      shadeName: "Nut Brown",
      swatchHex: "#785742",
      productImageUrl: null,
      shopUrl: null,
      price: "$12",
      source: "Ulta",
      undertone: "cool",
      depth: "deep",
      finish: "natural",
      palettePosition: 5,
      reasoningText: "Drugstore option at $12 — same cool-deep lane, daily-wear formula.",
    },
  ],
  "True Winter": [
    {
      compositionNumber: "02",
      brand: "Charlotte Tilbury",
      name: "Hollywood Flawless Filter",
      shadeNumber: "10 Cool",
      shadeName: "10 Cool",
      swatchHex: "#B89376",
      productImageUrl: null,
      shopUrl: null,
      price: "$52",
      source: "Sephora",
      undertone: "cool",
      depth: "medium-deep",
      finish: "luminous",
      palettePosition: 1,
      reasoningText: "Splurge pick — luminous filter, clear and bright on cool skin.",
    },
    {
      compositionNumber: "03",
      brand: "L'Oréal Paris",
      name: "True Match Super Blendable Foundation",
      shadeNumber: "C5",
      shadeName: "Classic Beige",
      swatchHex: "#C19878",
      productImageUrl: null,
      shopUrl: null,
      price: "$12",
      source: "Ulta",
      undertone: "cool",
      depth: "medium-deep",
      finish: "natural",
      palettePosition: 1,
      reasoningText: "Drugstore option at $12 — same true-cool lane, classic-beige depth.",
    },
  ],
  "Bright Winter": [
    {
      compositionNumber: "02",
      brand: "Charlotte Tilbury",
      name: "Hollywood Flawless Filter",
      shadeNumber: "9 Cool",
      shadeName: "9 Cool",
      swatchHex: "#BE9A7E",
      productImageUrl: null,
      shopUrl: null,
      price: "$52",
      source: "Sephora",
      undertone: "cool",
      depth: "medium",
      finish: "luminous",
      palettePosition: 1,
      reasoningText: "Splurge pick — luminous filter, clear-saturated on bright-cool skin.",
    },
    {
      compositionNumber: "03",
      brand: "L'Oréal Paris",
      name: "True Match Super Blendable Foundation",
      shadeNumber: "C5",
      shadeName: "Classic Beige",
      swatchHex: "#C19878",
      productImageUrl: null,
      shopUrl: null,
      price: "$12",
      source: "Ulta",
      undertone: "cool",
      depth: "medium",
      finish: "natural",
      palettePosition: 1,
      reasoningText: "Drugstore option at $12 — same cool-clear lane, classic-beige depth.",
    },
  ],
  "Clear Spring": [
    {
      compositionNumber: "02",
      brand: "Armani Beauty",
      name: "Luminous Silk Foundation",
      shadeNumber: "6",
      shadeName: "6",
      swatchHex: "#DBBA9F",
      productImageUrl: "https://static.shopmy.us/pins/zoom-50960661-1775390822210-16973019_fpx.tif",
      shopUrl: "http://www.anrdoezrs.net/click-100149615-15586047?sid=user-267437-pin-50960661-puser-null-src-web&url=https%3A%2F%2Fwww.macys.com%2Fshop%2Fproduct%2Farmani-beauty-luminous-silk-foundation%3FID%3D16461544",
      price: "$69",
      source: "Macy's",
      undertone: "warm",
      depth: "light-medium",
      finish: "luminous",
      palettePosition: 2,
      reasoningText: "Splurge pick — Armani's luminous filter brings the bright clarity Clear Spring needs.",
    },
    {
      compositionNumber: "03",
      brand: "L'Oréal Paris",
      name: "True Match Super Blendable Foundation",
      shadeNumber: "W4",
      shadeName: "Natural Beige",
      swatchHex: "#D9B69A",
      productImageUrl: "https://static.shopmy.us/pins/zoom-50960609-1775390748612-2602392",
      shopUrl: "https://ulta.ztk5.net/c/2340682/164999/3037?subId1=user-267437-pin-50960609-puser-null-src-web&u=https%3A%2F%2Fwww.ulta.com%2Fp%2Ftrue-match-super-blendable-foundation-pimprod2034733%3Fsku%3D2602392",
      price: "$12",
      source: "Ulta",
      undertone: "warm",
      depth: "light-medium",
      finish: "natural",
      palettePosition: 2,
      reasoningText: "Drugstore option at $12 — same warm-light lane, daily-wear formula.",
    },
  ],
  "True Spring": [
    {
      compositionNumber: "02",
      brand: "Armani Beauty",
      name: "Luminous Silk Foundation",
      shadeNumber: "6",
      shadeName: "6",
      swatchHex: "#D4AC85",
      productImageUrl: "https://static.shopmy.us/pins/zoom-50961629-1775392046926-16973019_fpx.tif",
      shopUrl: "http://www.anrdoezrs.net/click-100149615-15586047?sid=user-267437-pin-50961629-puser-null-src-web&url=https%3A%2F%2Fwww.macys.com%2Fshop%2Fproduct%2Farmani-beauty-luminous-silk-foundation%3FID%3D16461544",
      price: "$69",
      source: "Macy's",
      undertone: "warm",
      depth: "medium",
      finish: "luminous",
      palettePosition: 1,
      reasoningText: "Splurge pick — Armani's luminous filter delivers True Spring's clear warmth without going matte.",
    },
    {
      compositionNumber: "03",
      brand: "Maybelline",
      name: "Fit Me Dewy + Smooth Foundation",
      shadeNumber: "230",
      shadeName: "Natural Buff",
      swatchHex: "#D5AE89",
      productImageUrl: "https://static.shopmy.us/pins/zoom-product-9424-1609254953985-2537808",
      shopUrl: "https://ulta.ztk5.net/c/2340682/164999/3037?subId1=user-267437-pin-50961546-puser-null-src-web&u=https%3A%2F%2Fwww.ulta.com%2Fp%2Ffit-me-dewy-smooth-foundation-xlsImpprod2980151%3Fsku%3D2537793",
      price: "$10",
      source: "Ulta",
      undertone: "warm",
      depth: "medium",
      finish: "dewy",
      palettePosition: 1,
      reasoningText: "Drugstore option at $10 — same warm-clear lane, dewy daily wear.",
    },
  ],
  "Light Spring": [
    {
      compositionNumber: "02",
      brand: "Armani Beauty",
      name: "Luminous Silk Foundation",
      shadeNumber: "4.5",
      shadeName: "4.5",
      swatchHex: "#E0BFA0",
      productImageUrl: "https://static.shopmy.us/pins/zoom-50962894-1775393181265-16973019_fpx.tif",
      shopUrl: "http://www.anrdoezrs.net/click-100149615-15586047?sid=user-267437-pin-50962894-puser-null-src-web&url=https%3A%2F%2Fwww.macys.com%2Fshop%2Fproduct%2Farmani-beauty-luminous-silk-foundation%3FID%3D16461544",
      price: "$69",
      source: "Macy's",
      undertone: "warm",
      depth: "light",
      finish: "luminous",
      palettePosition: 8,
      reasoningText: "Splurge pick — Armani's luminous finish stays soft on light depth without overwhelming.",
    },
    {
      compositionNumber: "03",
      brand: "L'Oréal Paris",
      name: "True Match Super Blendable Foundation",
      shadeNumber: "W2",
      shadeName: "Light Ivory",
      swatchHex: "#E5C6A8",
      productImageUrl: "https://static.shopmy.us/pins/zoom-50962725-1775393044399-2602392",
      shopUrl: "https://ulta.ztk5.net/c/2340682/164999/3037?subId1=user-267437-pin-50962725-puser-null-src-web&u=https%3A%2F%2Fwww.ulta.com%2Fp%2Ftrue-match-super-blendable-foundation-pimprod2034733%3Fsku%3D2602392",
      price: "$12",
      source: "Ulta",
      undertone: "warm",
      depth: "light",
      finish: "natural",
      palettePosition: 8,
      reasoningText: "Drugstore option at $12 — same warm-light lane, daily-wear formula.",
    },
  ],
  "Soft Summer": [
    {
      compositionNumber: "02",
      brand: "Armani Beauty",
      name: "Luminous Silk Foundation",
      shadeNumber: "5.5",
      shadeName: "5.5",
      swatchHex: "#CFAB8F",
      productImageUrl: "https://static.shopmy.us/pins/zoom-51026077-1775430026750-16973019_fpx.tif",
      shopUrl: "http://www.anrdoezrs.net/click-100149615-15586047?sid=user-267437-pin-51039067-puser-null-src-web&url=https%3A%2F%2Fwww.macys.com%2Fshop%2Fproduct%2Farmani-beauty-luminous-silk-foundation%3FID%3D16461544",
      price: "$69",
      source: "Macy's",
      undertone: "cool",
      depth: "medium",
      finish: "luminous",
      palettePosition: 6,
      reasoningText: "Splurge pick — Armani's luminous filter softens cool-muted skin without going dusty.",
    },
    {
      compositionNumber: "03",
      brand: "L'Oréal Paris",
      name: "True Match Super Blendable Foundation",
      shadeNumber: "C3",
      shadeName: "Creamy Natural",
      swatchHex: "#D4B295",
      productImageUrl: "https://static.shopmy.us/pins/zoom-51025780-1775429880522-2602392",
      shopUrl: "https://ulta.ztk5.net/c/2340682/164999/3037?subId1=user-267437-pin-51067544-puser-null-src-web&u=https%3A%2F%2Fwww.ulta.com%2Fp%2Ftrue-match-super-blendable-foundation-pimprod2034733%3Fsku%3D2602392",
      price: "$12",
      source: "Ulta",
      undertone: "cool",
      depth: "medium",
      finish: "natural",
      palettePosition: 6,
      reasoningText: "Drugstore option at $12 — same cool-muted lane, daily-wear formula.",
    },
  ],
  "True Summer": [
    {
      compositionNumber: "02",
      brand: "Armani Beauty",
      name: "Luminous Silk Foundation",
      shadeNumber: "5",
      shadeName: "5",
      swatchHex: "#D2AE91",
      productImageUrl: "https://static.shopmy.us/pins/zoom-51029186-1775431530419-16973019_fpx.tif",
      shopUrl: "http://www.anrdoezrs.net/click-100149615-15586047?sid=user-267437-pin-51031569-puser-null-src-web&url=https%3A%2F%2Fwww.macys.com%2Fshop%2Fproduct%2Farmani-beauty-luminous-silk-foundation%3FID%3D16461544",
      price: "$69",
      source: "Macy's",
      undertone: "cool",
      depth: "medium",
      finish: "luminous",
      palettePosition: 3,
      reasoningText: "Splurge pick — Armani's luminous filter delivers True Summer's rosy clarity.",
    },
    {
      compositionNumber: "03",
      brand: "Maybelline",
      name: "Fit Me Matte + Poreless Foundation Makeup",
      shadeNumber: "115",
      shadeName: "Ivory",
      swatchHex: "#D4B095",
      productImageUrl: "https://static.shopmy.us/pins/pin-51028993-1775449248098-2510202",
      shopUrl: "https://ulta.ztk5.net/c/2340682/164999/3037?subId1=user-267437-pin-51028993-puser-null-src-web&u=https%3A%2F%2Fwww.ulta.com%2Fp%2Ffit-me-matte-poreless-liquid-foundation-xlsImpprod11861007%3Fsku%3D2510202",
      price: "$10",
      source: "Ulta",
      undertone: "cool",
      depth: "medium",
      finish: "matte",
      palettePosition: 3,
      reasoningText: "Drugstore option at $10 — same true-cool lane, matte for oily skin.",
    },
  ],
  "Light Summer": [
    {
      compositionNumber: "02",
      brand: "Armani Beauty",
      name: "Luminous Silk Foundation",
      shadeNumber: "4",
      shadeName: "4",
      swatchHex: "#E0BCA0",
      productImageUrl: "https://static.shopmy.us/pins/zoom-51031569-1775432816481-16973019_fpx.tif",
      shopUrl: "http://www.anrdoezrs.net/click-100149615-15586047?sid=user-267437-pin-51029186-puser-null-src-web&url=https%3A%2F%2Fwww.macys.com%2Fshop%2Fproduct%2Farmani-beauty-luminous-silk-foundation%3FID%3D16461544",
      price: "$69",
      source: "Macy's",
      undertone: "cool",
      depth: "light",
      finish: "luminous",
      palettePosition: 1,
      reasoningText: "Splurge pick — Armani's luminous filter stays soft on cool-light skin.",
    },
    {
      compositionNumber: "03",
      brand: "L'Oréal Paris",
      name: "True Match Super Blendable Foundation",
      shadeNumber: "C2",
      shadeName: "Light Ivory",
      swatchHex: "#E8C9AC",
      productImageUrl: "https://static.shopmy.us/pins/zoom-51031348-1775432681563-2602392",
      shopUrl: "https://ulta.ztk5.net/c/2340682/164999/3037?subId1=user-267437-pin-51031348-puser-null-src-web&u=https%3A%2F%2Fwww.ulta.com%2Fp%2Ftrue-match-super-blendable-foundation-pimprod2034733%3Fsku%3D2602392",
      price: "$12",
      source: "Ulta",
      undertone: "cool",
      depth: "light",
      finish: "natural",
      palettePosition: 1,
      reasoningText: "Drugstore option at $12 — same cool-light lane, daily-wear formula.",
    },
  ],
  "Soft Autumn": [
    {
      compositionNumber: "02",
      brand: "Armani Beauty",
      name: "Luminous Silk Foundation",
      shadeNumber: "6.5",
      shadeName: "6.5",
      swatchHex: "#C7A180",
      productImageUrl: "https://static.shopmy.us/pins/zoom-51039067-1775436650904-16973019_fpx.tif",
      shopUrl: "http://www.anrdoezrs.net/click-100149615-15586047?sid=user-267437-pin-51026077-puser-null-src-web&url=https%3A%2F%2Fwww.macys.com%2Fshop%2Fproduct%2Farmani-beauty-luminous-silk-foundation%3FID%3D16461544",
      price: "$69",
      source: "Macy's",
      undertone: "warm",
      depth: "medium",
      finish: "luminous",
      palettePosition: 1,
      reasoningText: "Splurge pick — Armani's luminous filter delivers warm earth without bright glare.",
    },
    {
      compositionNumber: "03",
      brand: "L'Oréal Paris",
      name: "True Match Super Blendable Foundation",
      shadeNumber: "W5",
      shadeName: "Sand Beige",
      swatchHex: "#C9A581",
      productImageUrl: "https://static.shopmy.us/pins/zoom-51067544-1775454891032-2602392",
      shopUrl: "https://ulta.ztk5.net/c/2340682/164999/3037?subId1=user-267437-pin-51025780-puser-null-src-web&u=https%3A%2F%2Fwww.ulta.com%2Fp%2Ftrue-match-super-blendable-foundation-pimprod2034733%3Fsku%3D2602392",
      price: "$12",
      source: "Ulta",
      undertone: "warm",
      depth: "medium",
      finish: "natural",
      palettePosition: 1,
      reasoningText: "Drugstore option at $12 — same warm-muted lane, daily-wear formula.",
    },
  ],
};

const CONCEALER_HEROES = {
  "True Autumn": {
    compositionNumber: "01",
    figNumber: "01",
    brand: "NARS",
    name: "Radiant Creamy Concealer",
    shadeNumber: "Caramel",
    shadeName: "Caramel",
    shadeFamily: "Caramel · Warm",
    swatchHex: "#B98660",
    shadeLadder: [
      { hex: "#E5C5A4", code: "Vanilla", label: "Light" },
      { hex: "#D6A382", code: "Custard", label: "Light-Med" },
      { hex: "#B98660", code: "Caramel", label: "Medium", representative: true },
      { hex: "#9F6C45", code: "Cafe", label: "Med-Deep" },
      { hex: "#6D4828", code: "Walnut", label: "Deep" },
    ],
    productImageUrl: "https://static.shopmy.us/pins/zoom-50735955-1775234168181-variant_images-size-CafeconLecheL26-607845012252-1.jpg",
    shopUrl: "https://click.linksynergy.com/deeplink?id=8yaPBDQV8ls&mid=43420&u1=user-267437-pin-50735955-puser-null-src-web&murl=https%3A%2F%2Fbluemercury.com%2Fproducts%2Fnars-radiant-creamy-concealer",
    price: "$32",
    source: "Bluemercury",
    undertone: "warm",
    depth: "medium",
    finish: "luminous",
    palettePosition: 3,
    reasoningText: "One shade brighter than your foundation — ideal for under-eye correction without going chalky on warm, deep skin.",
    formulaNote: "Stays luminous; doesn't crease on dry under-eyes. Apply sparingly — pigment is dense.",
  },
  "Dark Autumn": {
    compositionNumber: "01",
    figNumber: "01",
    brand: "NARS",
    name: "Radiant Creamy Concealer",
    shadeNumber: "Café",
    shadeName: "Café",
    shadeFamily: "Café · Warm",
    swatchHex: "#8B5C3A",
    shadeLadder: [
      { hex: "#ECCFB0", code: "Vanilla", label: "Fair" },
      { hex: "#D6B89A", code: "Cannelle", label: "Light-Med" },
      { hex: "#A07050", code: "Caramel", label: "Medium" },
      { hex: "#8B5C3A", code: "Café", label: "Deep", representative: true },
      { hex: "#684022", code: "Truffle", label: "Deepest" },
    ],
    productImageUrl: null,
    shopUrl: null,
    price: "$32",
    source: "Sephora",
    undertone: "warm",
    depth: "deep",
    finish: "luminous",
    palettePosition: 6,
    reasoningText: "Brightens under-eye one notch without going pink-pale. Same warm-deep lane as your foundation.",
    formulaNote: "Stays luminous; doesn't crease on dry under-eyes. Apply sparingly — pigment is dense.",
  },
  "Dark Winter": {
    compositionNumber: "01",
    figNumber: "01",
    brand: "NARS",
    name: "Radiant Creamy Concealer",
    shadeNumber: "Café Mocha",
    shadeName: "Café Mocha",
    shadeFamily: "Café Mocha · Cool",
    swatchHex: "#7D5D45",
    shadeLadder: [
      { hex: "#F2DCC2", code: "Chantilly", label: "Fair" },
      { hex: "#D6B89A", code: "Crème Brûlée", label: "Light-Med" },
      { hex: "#967557", code: "Mocha", label: "Medium" },
      { hex: "#7D5D45", code: "Café Mocha", label: "Deep", representative: true },
      { hex: "#574030", code: "Truffle", label: "Deepest" },
    ],
    productImageUrl: null,
    shopUrl: null,
    price: "$32",
    source: "Sephora",
    undertone: "cool",
    depth: "deep",
    finish: "luminous",
    palettePosition: 5,
    reasoningText: "One shade brighter for under-eye — cool-deep with no yellow pull.",
    formulaNote: "Stays luminous; doesn't crease on dry under-eyes. Apply sparingly — pigment is dense.",
  },
  "True Winter": {
    compositionNumber: "01",
    figNumber: "01",
    brand: "NARS",
    name: "Radiant Creamy Concealer",
    shadeNumber: "Crème Brûlée",
    shadeName: "Crème Brûlée",
    shadeFamily: "Crème Brûlée · Cool",
    swatchHex: "#C5A48A",
    shadeLadder: [
      { hex: "#F2DCC2", code: "Chantilly", label: "Fair" },
      { hex: "#D6B89B", code: "Crème Brûlée", label: "Light-Med", representative: true },
      { hex: "#C5A48A", code: "Custard", label: "Medium" },
      { hex: "#A07050", code: "Café", label: "Med-Deep" },
      { hex: "#7D5D45", code: "Café Mocha", label: "Deep" },
    ],
    productImageUrl: null,
    shopUrl: null,
    price: "$32",
    source: "Sephora",
    undertone: "cool",
    depth: "medium-deep",
    finish: "luminous",
    palettePosition: 1,
    reasoningText: "One shade brighter for under-eye — cool with light-medium depth.",
    formulaNote: "Stays luminous; doesn't crease on dry under-eyes. Apply sparingly — pigment is dense.",
  },
  "Bright Winter": {
    compositionNumber: "01",
    figNumber: "01",
    brand: "NARS",
    name: "Radiant Creamy Concealer",
    shadeNumber: "Custard",
    shadeName: "Custard",
    shadeFamily: "Custard · Cool",
    swatchHex: "#D4B295",
    shadeLadder: [
      { hex: "#F2DCC2", code: "Chantilly", label: "Fair" },
      { hex: "#D4B295", code: "Custard", label: "Light", representative: true },
      { hex: "#C5A48A", code: "Café con Leche", label: "Med-Light" },
      { hex: "#A07050", code: "Café", label: "Medium" },
      { hex: "#7D5D45", code: "Café Mocha", label: "Deep" },
    ],
    productImageUrl: null,
    shopUrl: null,
    price: "$32",
    source: "Sephora",
    undertone: "cool",
    depth: "medium",
    finish: "luminous",
    palettePosition: 1,
    reasoningText: "One shade brighter for under-eye — cool-clear and bright.",
    formulaNote: "Stays luminous; doesn't crease on dry under-eyes. Apply sparingly — pigment is dense.",
  },
  "Clear Spring": {
    compositionNumber: "01",
    figNumber: "01",
    brand: "NARS",
    name: "Radiant Creamy Concealer",
    shadeNumber: "Café Con Leche",
    shadeName: "Café Con Leche",
    shadeFamily: "Café Con Leche · Warm",
    swatchHex: "#C5A48A",
    shadeLadder: [
      { hex: "#F2DCC2", code: "Chantilly", label: "Fair" },
      { hex: "#E5C5A4", code: "Custard", label: "Light-Med" },
      { hex: "#C5A48A", code: "Café con Leche", label: "Medium", representative: true },
      { hex: "#A07050", code: "Café", label: "Med-Deep" },
      { hex: "#684022", code: "Truffle", label: "Deep" },
    ],
    productImageUrl: "https://static.shopmy.us/pins/zoom-50960746-1775390975192-variant_images-size-CafeconLecheL26-607845012252-1.jpg",
    shopUrl: "https://click.linksynergy.com/deeplink?id=8yaPBDQV8ls&mid=43420&u1=user-267437-pin-50960746-puser-null-src-web&murl=https%3A%2F%2Fbluemercury.com%2Fproducts%2Fnars-radiant-creamy-concealer",
    price: "$32",
    source: "Bluemercury",
    undertone: "warm",
    depth: "light-medium",
    finish: "luminous",
    palettePosition: 2,
    reasoningText: "Brightens under-eye without going pink-pale. Same warm-clear lane as your foundation.",
    formulaNote: "Stays luminous; doesn't crease on dry under-eyes. Apply sparingly — pigment is dense.",
  },
  "True Spring": {
    compositionNumber: "01",
    figNumber: "01",
    brand: "Milk Makeup",
    name: "Future Fluid Creamy Hydrating Concealer",
    shadeNumber: "3W",
    shadeName: "3W",
    shadeFamily: "3W · Warm",
    swatchHex: "#D4AC85",
    shadeLadder: [
      { hex: "#EAD2B5", code: "1W", label: "Fair" },
      { hex: "#DCB793", code: "2W", label: "Light-Med" },
      { hex: "#D4AC85", code: "3W", label: "Medium", representative: true },
      { hex: "#BE9168", code: "4W", label: "Med-Deep" },
    ],
    productImageUrl: "https://static.shopmy.us/pins/zoom-50961731-1775392136457-FutureFluid-Concealer-1W-open.jpg",
    shopUrl: "https://apiv3.shopmy.us/api/redirect_click?clickId=5a25dac1-fd5b-43a7-8c53-0ae152706440&cid=user-267437-pin-50961731-puser-null-src-web&url=https%3A%2F%2Fmilkmakeup.com%2Fproducts%2Ffuture-fluid-cream-concealer",
    price: "$26",
    source: "Milk Makeup",
    undertone: "warm",
    depth: "medium",
    finish: "natural",
    palettePosition: 1,
    reasoningText: "One shade brighter for under-eye — warm-clear match without going chalky.",
    formulaNote: "Lightweight, buildable. Hydrating formula stays put on warm skin without settling into fine lines.",
  },
  "Light Spring": {
    compositionNumber: "01",
    figNumber: "01",
    brand: "NARS",
    name: "Radiant Creamy Concealer",
    shadeNumber: "Custard",
    shadeName: "Custard",
    shadeFamily: "Custard · Warm",
    swatchHex: "#E5C5A4",
    shadeLadder: [
      { hex: "#ECCFB0", code: "Vanilla", label: "Fair" },
      { hex: "#E5C5A4", code: "Custard", label: "Light-Med", representative: true },
      { hex: "#D2A87E", code: "Café con Leche", label: "Medium" },
    ],
    productImageUrl: "https://static.shopmy.us/pins/zoom-50963197-1775393425297-variant_images-size-CafeconLecheL26-607845012252-1.jpg",
    shopUrl: "https://click.linksynergy.com/deeplink?id=8yaPBDQV8ls&mid=43420&u1=user-267437-pin-50963197-puser-null-src-web&murl=https%3A%2F%2Fbluemercury.com%2Fproducts%2Fnars-radiant-creamy-concealer",
    price: "$32",
    source: "Bluemercury",
    undertone: "warm",
    depth: "light",
    finish: "luminous",
    palettePosition: 8,
    reasoningText: "One shade brighter for under-eye — soft warm match for fair Spring depth.",
    formulaNote: "Stays luminous; doesn't crease on dry under-eyes. Apply sparingly — pigment is dense.",
  },
  "Soft Summer": {
    compositionNumber: "01",
    figNumber: "01",
    brand: "NARS",
    name: "Radiant Creamy Concealer",
    shadeNumber: "Crème Brûlée",
    shadeName: "Crème Brûlée",
    shadeFamily: "Crème Brûlée · Cool-Neutral",
    swatchHex: "#D6B89A",
    shadeLadder: [
      { hex: "#ECCFB0", code: "Vanilla", label: "Fair" },
      { hex: "#D6B89A", code: "Crème Brûlée", label: "Light-Med", representative: true },
      { hex: "#A07050", code: "Café", label: "Medium" },
      { hex: "#7D5D45", code: "Café Mocha", label: "Med-Deep" },
      { hex: "#574030", code: "Truffle", label: "Deep" },
    ],
    productImageUrl: "https://static.shopmy.us/pins/zoom-51026468-1775430175374-variant_images-size-CafeconLecheL26-607845012252-1.jpg",
    shopUrl: "https://click.linksynergy.com/deeplink?id=8yaPBDQV8ls&mid=43420&u1=user-267437-pin-51037451-puser-null-src-web&murl=https%3A%2F%2Fbluemercury.com%2Fproducts%2Fnars-radiant-creamy-concealer",
    price: "$32",
    source: "Bluemercury",
    undertone: "cool",
    depth: "medium",
    finish: "luminous",
    palettePosition: 6,
    reasoningText: "One shade brighter for under-eye — cool-muted match that doesn't go warm or chalky.",
    formulaNote: "Stays luminous; doesn't crease on dry under-eyes. Apply sparingly — pigment is dense.",
  },
  "True Summer": {
    compositionNumber: "01",
    figNumber: "01",
    brand: "e.l.f. Cosmetics",
    name: "Hydrating Camo Concealer",
    shadeNumber: "Medium Cool",
    shadeName: "Medium Cool",
    shadeFamily: "Medium Cool",
    swatchHex: "#D2AE92",
    shadeLadder: [
      { hex: "#EAD2B7", code: "Fair Cool", label: "Fair" },
      { hex: "#DCBDA1", code: "Light Cool", label: "Light" },
      { hex: "#D2AE92", code: "Medium Cool", label: "Medium", representative: true },
      { hex: "#B8957A", code: "Tan Cool", label: "Med-Deep" },
      { hex: "#80614A", code: "Deep Cool", label: "Deep" },
    ],
    productImageUrl: "https://static.shopmy.us/pins/pin-51029297-1775449370643-2558521",
    shopUrl: "https://ulta.ztk5.net/c/2340682/164999/3037?subId1=user-267437-pin-51029297-puser-null-src-web&u=https%3A%2F%2Fwww.ulta.com%2Fp%2Fhydrating-camo-concealer-pimprod2013395%3Fsku%3D2558521",
    price: "$7",
    source: "Ulta",
    undertone: "cool",
    depth: "medium",
    finish: "natural",
    palettePosition: 3,
    reasoningText: "One shade brighter for under-eye — cool-clear at the most accessible price.",
    formulaNote: "Medium-full coverage hydrating formula. Doesn't dry down chalky — pairs well with all foundation finishes.",
  },
  "Light Summer": {
    compositionNumber: "01",
    figNumber: "01",
    brand: "NARS",
    name: "Radiant Creamy Concealer",
    shadeNumber: "Chantilly",
    shadeName: "Chantilly",
    shadeFamily: "Chantilly · Cool",
    swatchHex: "#EDD3B8",
    shadeLadder: [
      { hex: "#F2DCC2", code: "Chantilly", label: "Fair", representative: true },
      { hex: "#E8CDB0", code: "Vanilla", label: "Light" },
      { hex: "#D6B89A", code: "Crème Brûlée", label: "Light-Med" },
    ],
    productImageUrl: "https://static.shopmy.us/pins/zoom-51037451-1775435969360-variant_images-size-CafeconLecheL26-607845012252-1.jpg",
    shopUrl: "https://click.linksynergy.com/deeplink?id=8yaPBDQV8ls&mid=43420&u1=user-267437-pin-51026468-puser-null-src-web&murl=https%3A%2F%2Fbluemercury.com%2Fproducts%2Fnars-radiant-creamy-concealer",
    price: "$32",
    source: "Bluemercury",
    undertone: "cool",
    depth: "light",
    finish: "luminous",
    palettePosition: 1,
    reasoningText: "One shade brighter for under-eye — fair cool match without warming up.",
    formulaNote: "Stays luminous; doesn't crease on dry under-eyes. Apply sparingly — pigment is dense.",
  },
  "Soft Autumn": {
    compositionNumber: "01",
    figNumber: "01",
    brand: "Milk Makeup",
    name: "Future Fluid Creamy Hydrating Concealer",
    shadeNumber: "5W",
    shadeName: "5W",
    shadeFamily: "5W · Warm",
    swatchHex: "#C9A581",
    shadeLadder: [
      { hex: "#EAD2B7", code: "1W", label: "Fair" },
      { hex: "#DCB793", code: "3W", label: "Light-Med" },
      { hex: "#C9A581", code: "5W", label: "Medium", representative: true },
      { hex: "#B0855E", code: "6W", label: "Med-Deep" },
      { hex: "#6A4128", code: "8W", label: "Deep" },
    ],
    productImageUrl: "https://static.shopmy.us/pins/zoom-51067859-1775455441115-FutureFluid-Concealer-1W-open.jpg",
    shopUrl: "https://apiv3.shopmy.us/api/redirect_click?clickId=9dccc5b8-09bf-4093-9380-abaccccd6749&cid=user-267437-pin-51067859-puser-null-src-web&url=https%3A%2F%2Fmilkmakeup.com%2Fproducts%2Ffuture-fluid-cream-concealer%3Futm_source%3DShopMy%26utm_medium%3Daffiliate%26utm_campaign%3DNish%26utm_content%3DShade%20DNA%20%E2%80%94%20Soft%20Autumn%26utm_referrer%3Dshopmy.us",
    price: "$26",
    source: "Milk Makeup",
    undertone: "warm",
    depth: "medium",
    finish: "natural",
    palettePosition: 1,
    reasoningText: "One shade brighter for under-eye — warm-muted match for earthy Soft Autumn skin.",
    formulaNote: "Lightweight, buildable, hydrating. Works on warm-muted skin without going bright.",
  },
};

const CONCEALER_ALTERNATES = {
  "True Autumn": [
    {
      compositionNumber: "02",
      brand: "Charlotte Tilbury",
      name: "Beautiful Skin Radiant Concealer",
      shadeNumber: "8.5",
      shadeName: "Tan Warm",
      swatchHex: "#B98661",
      productImageUrl: "https://static.shopmy.us/pins/zoom-50736340-1775234297283-0400017342559_2",
      shopUrl: "https://click.linksynergy.com/deeplink?id=8yaPBDQV8ls&mid=13816&u1=user-267437-pin-50736340-puser-null-src-web&murl=https%3A%2F%2Fwww.saksfifthavenue.com%2Fproduct%2FCharlotte-Tilbury-Beautiful-Skin-Concealer-0400017342559.html",
      price: "$36",
      source: "Saks",
      undertone: "warm",
      depth: "medium",
      finish: "radiant",
      palettePosition: 3,
      reasoningText: "Sheerer coverage with a radiant finish — pick for daytime, lighter wear.",
    },
    {
      compositionNumber: "03",
      brand: "Maybelline",
      name: "Instant Age Rewind Eraser Concealer",
      shadeNumber: "130",
      shadeName: "Honey",
      swatchHex: "#BD8C68",
      productImageUrl: "https://www.adorebeauty.com.au/pim_media/000/427/067/maybelline_instant_age_rewind_eye_eraser.png?1673848341",
      shopUrl: "https://prf.hn/click/camref:1100ljmam/pubref:user-267437-pin-50736602-puser-null-src-web/destination:https%3A%2F%2Fwww.adorebeauty.com.au%2Fp%2Fmaybelline%2Fmaybelline-instant-age-rewind-eye-eraser.html",
      price: "$10",
      source: "Adore Beauty",
      undertone: "warm",
      depth: "medium",
      finish: "satin",
      palettePosition: 3,
      reasoningText: "Drugstore option for daily under-eye — easy to find, easy to layer.",
    },
    {
      compositionNumber: "04",
      brand: "e.l.f. Cosmetics",
      name: "16HR Camo Concealer",
      shadeNumber: "Med-Warm",
      shadeName: "Medium Warm",
      swatchHex: "#BA8862",
      productImageUrl: "https://static.shopmy.us/pins/zoom-50736912-1775234491904-10337721",
      shopUrl: "https://www.awin1.com/awclick.php?mid=2041&id=740219&clickref=user-267437-pin-50736912-puser-null-src-web&ued=https%3A%2F%2Fwww.boots.com%2Felf-16hr-camo-concealer-10337721",
      price: "$7",
      source: "Boots",
      undertone: "warm",
      depth: "medium",
      finish: "matte",
      palettePosition: 3,
      reasoningText: "Budget full-coverage pick — long-wear matte at $7.",
    },
  ],
  "Dark Autumn": [
    {
      compositionNumber: "02",
      brand: "Chantecaille",
      name: "Le Camouflage Stylo",
      shadeNumber: "7W",
      shadeName: "7W",
      swatchHex: "#875A38",
      productImageUrl: null,
      shopUrl: null,
      price: "$42",
      source: "Bluemercury",
      undertone: "warm",
      depth: "deep",
      finish: "silk",
      palettePosition: 6,
      reasoningText: "Splurge pick — buildable coverage, never settles into lines. The undetectable option.",
    },
    {
      compositionNumber: "03",
      brand: "e.l.f. Cosmetics",
      name: "Hydrating Camo Concealer",
      shadeNumber: "Deep Warm",
      shadeName: "Deep Warm",
      swatchHex: "#8E5836",
      productImageUrl: null,
      shopUrl: null,
      price: "$7",
      source: "Ulta",
      undertone: "warm",
      depth: "deep",
      finish: "natural",
      palettePosition: 6,
      reasoningText: "Drugstore pick at $7 — warm-deep matching, hydrating formula.",
    },
  ],
  "Dark Winter": [
    {
      compositionNumber: "02",
      brand: "Chantecaille",
      name: "Le Camouflage Stylo",
      shadeNumber: "6C",
      shadeName: "6C",
      swatchHex: "#806146",
      productImageUrl: null,
      shopUrl: null,
      price: "$42",
      source: "Bluemercury",
      undertone: "cool",
      depth: "deep",
      finish: "silk",
      palettePosition: 5,
      reasoningText: "Splurge pick — silk-finish, the most undetectable cool-deep coverage available.",
    },
    {
      compositionNumber: "03",
      brand: "e.l.f. Cosmetics",
      name: "Hydrating Camo Concealer",
      shadeNumber: "Deep Cool",
      shadeName: "Deep Cool",
      swatchHex: "#7A5740",
      productImageUrl: null,
      shopUrl: null,
      price: "$7",
      source: "Ulta",
      undertone: "cool",
      depth: "deep",
      finish: "natural",
      palettePosition: 5,
      reasoningText: "Drugstore pick at $7 — cool-deep matching, hydrating formula.",
    },
  ],
  "True Winter": [
    {
      compositionNumber: "02",
      brand: "Chantecaille",
      name: "Le Camouflage Stylo",
      shadeNumber: "6C",
      shadeName: "6C",
      swatchHex: "#B89376",
      productImageUrl: null,
      shopUrl: null,
      price: "$42",
      source: "Bluemercury",
      undertone: "cool",
      depth: "medium-deep",
      finish: "silk",
      palettePosition: 1,
      reasoningText: "Splurge pick — silk-finish, undetectable on cool-clear skin.",
    },
    {
      compositionNumber: "03",
      brand: "e.l.f. Cosmetics",
      name: "Hydrating Camo Concealer",
      shadeNumber: "Medium Cool",
      shadeName: "Medium Cool",
      swatchHex: "#B69076",
      productImageUrl: null,
      shopUrl: null,
      price: "$7",
      source: "Ulta",
      undertone: "cool",
      depth: "medium-deep",
      finish: "natural",
      palettePosition: 1,
      reasoningText: "Drugstore pick at $7 — cool-clear matching, hydrating formula.",
    },
  ],
  "Bright Winter": [
    {
      compositionNumber: "02",
      brand: "Chantecaille",
      name: "Le Camouflage Stylo",
      shadeNumber: "5C",
      shadeName: "5C",
      swatchHex: "#C9A586",
      productImageUrl: null,
      shopUrl: null,
      price: "$42",
      source: "Bluemercury",
      undertone: "cool",
      depth: "medium",
      finish: "silk",
      palettePosition: 1,
      reasoningText: "Splurge pick — silk-finish, undetectable on bright cool skin.",
    },
    {
      compositionNumber: "03",
      brand: "e.l.f. Cosmetics",
      name: "Hydrating Camo Concealer",
      shadeNumber: "Tan Cool",
      shadeName: "Tan Cool",
      swatchHex: "#BD9776",
      productImageUrl: null,
      shopUrl: null,
      price: "$7",
      source: "Ulta",
      undertone: "cool",
      depth: "medium",
      finish: "natural",
      palettePosition: 1,
      reasoningText: "Drugstore pick at $7 — cool-clear matching, hydrating formula.",
    },
  ],
  "Clear Spring": [
    {
      compositionNumber: "02",
      brand: "Maybelline",
      name: "Instant Age Rewind Eraser Concealer",
      shadeNumber: "Warm Natural",
      shadeName: "Warm Natural",
      swatchHex: "#DDBC9A",
      productImageUrl: "https://www.adorebeauty.com.au/pim_media/000/427/067/maybelline_instant_age_rewind_eye_eraser.png?1673848341",
      shopUrl: "https://prf.hn/click/camref:1100ljmam/pubref:user-267437-pin-50960691-puser-null-src-web/destination:https%3A%2F%2Fwww.adorebeauty.com.au%2Fp%2Fmaybelline%2Fmaybelline-instant-age-rewind-eye-eraser.html",
      price: "$10",
      source: "Adore Beauty",
      undertone: "warm",
      depth: "light-medium",
      finish: "satin",
      palettePosition: 2,
      reasoningText: "Drugstore pick at $10 — warm-clear undertone matching, easy daily wear.",
    },
  ],
  "True Spring": [
    {
      compositionNumber: "02",
      brand: "e.l.f. Cosmetics",
      name: "Hydrating Camo Concealer",
      shadeNumber: "Medium Warm",
      shadeName: "Medium Warm",
      swatchHex: "#D2A87E",
      productImageUrl: "https://cdn-fsly.yottaa.net/5a0c9b7632f01c35d42101b2/www.elfcosmetics.com/v~4b.a3/dw/image/v2/BBXC_PRD/on/demandware.static/-/Sites-elf-master/default/dw8bd27906/2020/84823_Open_A_R.jpg?sfrm=png&sw=425&q=90&yocs=1u_1y_1A_",
      shopUrl: "https://click.linksynergy.com/deeplink?id=8yaPBDQV8ls&mid=39724&u1=user-267437-pin-51071224-puser-null-src-web&murl=https%3A%2F%2Fwww.elfcosmetics.com%2Fhydrating-camo-concealer%2F84823.html",
      price: "$7",
      source: "E.L.F. Cosmetics",
      undertone: "warm",
      depth: "medium",
      finish: "natural",
      palettePosition: 1,
      reasoningText: "Drugstore pick at $7 — warm-clear matching, hydrating formula.",
    },
  ],
  "Light Spring": [
    {
      compositionNumber: "02",
      brand: "Maybelline",
      name: "Instant Age Rewind Eraser Concealer",
      shadeNumber: "Light Warm",
      shadeName: "Light Warm",
      swatchHex: "#E5C5A4",
      productImageUrl: "https://www.adorebeauty.com.au/pim_media/000/427/067/maybelline_instant_age_rewind_eye_eraser.png?1673848341",
      shopUrl: "https://prf.hn/click/camref:1100ljmam/pubref:user-267437-pin-50962985-puser-null-src-web/destination:https%3A%2F%2Fwww.adorebeauty.com.au%2Fp%2Fmaybelline%2Fmaybelline-instant-age-rewind-eye-eraser.html",
      price: "$10",
      source: "Adore Beauty",
      undertone: "warm",
      depth: "light",
      finish: "satin",
      palettePosition: 8,
      reasoningText: "Drugstore pick at $10 — warm-light matching, daily wear.",
    },
  ],
  "Soft Summer": [
    {
      compositionNumber: "02",
      brand: "Maybelline",
      name: "Instant Anti Age Eraser Eye Concealer",
      shadeNumber: "Neutralizer",
      shadeName: "Neutralizer",
      swatchHex: "#D4B295",
      productImageUrl: "https://static.shopmy.us/pins/zoom-51026213-1775430075401-2529471",
      shopUrl: "https://ulta.ztk5.net/c/2340682/164999/3037?subId1=user-267437-pin-51026213-puser-null-src-web&u=https%3A%2F%2Fwww.ulta.com%2Fp%2Finstant-age-rewind-eraser-dark-circle-treatment-concealer-xlsImpprod3490149%3Fsku%3D2529471",
      price: "$10",
      source: "Ulta",
      undertone: "cool",
      depth: "medium",
      finish: "satin",
      palettePosition: 6,
      reasoningText: "Drugstore pick at $10 — cool-muted matching, daily wear.",
    },
  ],
  "Light Summer": [
    {
      compositionNumber: "02",
      brand: "Maybelline",
      name: "Instant Age Rewind Eraser Concealer",
      shadeNumber: "Fair",
      shadeName: "Fair",
      swatchHex: "#E8CDB0",
      productImageUrl: "https://www.adorebeauty.com.au/pim_media/000/427/067/maybelline_instant_age_rewind_eye_eraser.png?1673848341",
      shopUrl: "https://prf.hn/click/camref:1100ljmam/pubref:user-267437-pin-51037295-puser-null-src-web/destination:https%3A%2F%2Fwww.adorebeauty.com.au%2Fp%2Fmaybelline%2Fmaybelline-instant-age-rewind-eye-eraser.html",
      price: "$10",
      source: "Adore Beauty",
      undertone: "cool",
      depth: "light",
      finish: "satin",
      palettePosition: 1,
      reasoningText: "Drugstore pick at $10 — cool-light matching, daily wear.",
    },
  ],
  "Soft Autumn": [
    {
      compositionNumber: "02",
      brand: "e.l.f. Cosmetics",
      name: "Hydrating Camo Concealer",
      shadeNumber: "Medium Warm",
      shadeName: "Medium Warm",
      swatchHex: "#C9A581",
      productImageUrl: "https://static.shopmy.us/pins/zoom-51067706-1775455156195-GUEST_78dfe1d0-f448-4dbd-8b17-98b37c7c6073",
      shopUrl: "https://goto.target.com/c/2340682/81938/2092?subId1=user-267437-pin-51067706-puser-null-src-web&u=https%3A%2F%2Fwww.target.com%2Fp%2Fe-l-f-hydrating-camo-concealer-medium-warm-0-203-fl-oz%2F-%2FA-76615214",
      price: "$7",
      source: "Target",
      undertone: "warm",
      depth: "medium",
      finish: "natural",
      palettePosition: 1,
      reasoningText: "Drugstore pick at $7 — warm-muted matching, hydrating formula.",
    },
  ],
};

const UNDERTONE_GUIDANCE = {
  "Clear Spring": "Look for warm, peach-golden shades (W or NW). Gold jewelry suits you - not silver. Avoid pink or cool bases.",
  "True Spring": "Look for warm golden-yellow shades (W or NW). The warmest season - cool or pink foundations will look gray.",
  "Light Spring": "Look for light warm-peach shades. Avoid pink bases - they amplify redness. Stay in the warm column.",
  "Soft Summer": "Look for cool-neutral, muted rose shades (C or NC). Silver suits you better than gold. Avoid golden or warm bases.",
  "True Summer": "Look for cool, rosy-pink shades (C or NC). Your veins run blue - cool foundations disappear; warm ones go orange.",
  "Light Summer": "Look for light cool-pink shades. Avoid peach or warm tones - even 'neutral' fair shades often run too warm.",
  "Soft Autumn": "Look for warm neutral-golden shades - earthy, not bright. Avoid pink or cool bases. 'Warm beige' is your zone.",
  "True Autumn": "Look for warm amber-golden shades (W or NW). Look for 'honey', 'golden', or 'caramel' at your depth.",
  "Dark Autumn": "Look for deep warm-golden shades. Avoid ashy or cool-dark - these are the most common mistake for deep warm skin.",
  "Dark Winter": "Look for deep cool-neutral shades (C or NC). Avoid warm, amber, or golden - they'll read orange on cool deep skin.",
  "True Winter": "Look for cool shades at your depth (C or NC). Warm foundations go visibly orange. Fair to deep - always cool.",
  "Bright Winter": "Look for cool-neutral shades with clarity. Avoid warm, yellow, or muted foundations - they flatten your natural contrast.",
};

const FOUNDATION_CARDS = [
  {
    name: "Fenty Beauty Pro Filt'r Soft Matte",
    rating: "4.0",
    reviews: "17,400+",
    shades: "51",
    price: "$40",
    source: "Sephora",
    undertone: "neutral",
    finish: "matte",
  },
  {
    name: "Armani Luminous Silk",
    rating: "4.4",
    reviews: "2,800+",
    shades: "46",
    price: "$48-$69",
    source: "Sephora",
    undertone: "neutral",
    finish: "luminous",
  },
  {
    name: "Charlotte Tilbury Airbrush Flawless",
    rating: "4.3",
    reviews: "768",
    shades: "36",
    price: "$52",
    source: "Sephora",
    undertone: "warm-neutral",
    finish: "satin",
  },
  {
    name: "MAC Studio Fix Fluid SPF 15",
    rating: "4.3",
    reviews: "501",
    shades: "67",
    price: "$39",
    source: "Sephora / MAC",
    undertone: "neutral",
    finish: "matte",
  },
  {
    name: "L'Oreal True Match",
    rating: "4.3",
    reviews: "5,482",
    shades: "~45",
    price: "~$10",
    source: "Target",
    undertone: "neutral",
    finish: "natural",
  },
  {
    name: "Maybelline Fit Me Matte + Poreless",
    rating: "4.4",
    reviews: "6,273",
    shades: "~40",
    price: "~$10",
    source: "Target",
    undertone: "neutral",
    finish: "matte",
  },
  {
    name: "Too Faced Born This Way",
    rating: "4.3",
    reviews: "20,000+",
    shades: "45+",
    price: "$47",
    source: "Sephora / Ulta",
    undertone: "warm-neutral",
    finish: "natural",
  },
];

const CONCEALER_CARDS = [
  {
    name: "NARS Radiant Creamy Concealer",
    rating: "4.3",
    reviews: "15,000+",
    shades: "33",
    price: "$17–$36",
    source: "Sephora",
    undertone: "neutral",
    finish: "luminous",
  },
  {
    name: "Kosas Revealer Creamy Concealer",
    rating: "4.0",
    reviews: "6,600+",
    shades: "42",
    price: "$16–$32",
    source: "Sephora",
    undertone: "warm-neutral",
    finish: "natural",
  },
  {
    name: "Tarte Shape Tape Full Coverage",
    rating: "4.2",
    reviews: "668",
    shades: "48",
    price: "$15–$32",
    source: "Sephora",
    undertone: "neutral",
    finish: "full-coverage",
  },
  {
    name: "IT Cosmetics Bye Bye Under Eye",
    rating: "4.1",
    reviews: "1,300+",
    shades: "26",
    price: "$14–$30",
    source: "Sephora",
    undertone: "warm-neutral",
    finish: "full-coverage",
  },
  {
    name: "IT Cosmetics Do It All Radiant",
    rating: "4.4",
    reviews: "2,400+",
    shades: "26",
    price: "$30",
    source: "Sephora",
    undertone: "neutral",
    finish: "satin",
  },
];

function Nav({ seasonId, onChange }) {
  return (
    <nav className="dt-nav">
      <div className="dt-nav-inner">
        <Link href="/" className="dt-nav-brand">allele</Link>
        <div className="dt-nav-links">
          <Link href="/#twelve">The Twelve</Link>
          <Link href="/#method">Method</Link>
          <Link href="/#science">Philosophy</Link>
        </div>
        <div className="dt-nav-right">
          <select
            className="dt-nav-season"
            value={seasonId}
            onChange={(e) => onChange(e.target.value)}
            aria-label="Switch season"
          >
            {SEASON_IDS.map((id) => (
              <option key={id} value={id}>{SEASONS[id].name}</option>
            ))}
          </select>
          <Link href="/quiz" className="dt-nav-cta">Retake quiz →</Link>
        </div>
      </div>
    </nav>
  );
}

function getMonthlyVolume(seasonName) {
  const volumes = {
    "Clear Spring": 520,
    "True Spring": 480,
    "Light Spring": 450,
    "Light Summer": 680,
    "True Summer": 980,
    "Soft Summer": 1420,
    "Soft Autumn": 1380,
    "True Autumn": 810,
    "Dark Autumn": 1290,
    "Dark Winter": 1250,
    "True Winter": 850,
    "Bright Winter": 640,
    "Deep Autumn": 1290,
    "Deep Winter": 1250,
  };
  return (volumes[seasonName] || 750).toLocaleString();
}

function getShadeIndexForDepth(depth, shadeLadder) {
  if (!shadeLadder || shadeLadder.length === 0) return 0;
  const repIdx = shadeLadder.findIndex(rung => rung.representative);
  const fallback = repIdx !== -1 ? repIdx : Math.floor(shadeLadder.length / 2);
  if (!depth) return fallback;
  const map = {
    "fair": 0,
    "light": 1,
    "medium": 2,
    "deep": 4
  };
  const mappedIdx = map[depth];
  if (mappedIdx === undefined) return fallback;
  return Math.max(0, Math.min(shadeLadder.length - 1, mappedIdx));
}

function Hero({ s, seasonId }) {
  const idx = SEASON_IDS.indexOf(seasonId) + 1;
  const num = `N° ${String(idx).padStart(2, "0")} / 12`;
  const [first, ...rest] = s.name.split(" ");

  const [theme, setTheme] = useState("cream");
  const [layout, setLayout] = useState("specimen");
  const [aspect, setAspect] = useState("story");
  const [showCelebs, setShowCelebs] = useState("photo");
  const [downloading, setDownloading] = useState(false);

  const [tilt, setTilt] = useState({ x: 0, y: 0, showSheen: false, sheenX: 0, sheenY: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rotateX = -((y - rect.height / 2) / (rect.height / 2)) * 10;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 10;
    
    const sheenX = (x / rect.width) * 100;
    const sheenY = (y / rect.height) * 100;

    setTilt({ x: rotateY, y: rotateX, showSheen: true, sheenX, sheenY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, showSheen: false, sheenX: 0, sheenY: 0 });
  };

  const shareLink = async (method) => {
    track.shareClicked(s.name, method);
    if (method === "copy" && typeof window !== "undefined") {
      const url = `${window.location.origin}/results?season=${encodeURIComponent(s.name)}`;
      try { await navigator.clipboard.writeText(url); } catch {}
      return;
    }
    if (method === "native" && typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `I'm a ${s.name}`,
          text: `What's your Shade DNA?`,
          url: window.location.href,
        });
      } catch {}
    }
  };

  const downloadCardPng = async () => {
    if (downloading) return;
    setDownloading(true);
    track.downloadCard(s.name);
    
    if (cardRef.current) {
      try {
        const { toPng } = await import("html-to-image");
        const dataUrl = await toPng(cardRef.current, {
          quality: 0.98,
          pixelRatio: 3,
          backgroundColor: theme === "obsidian" ? "#0A0A0C" : theme === "tint" ? s.surface : "#FFFBF7",
          style: {
            transform: "none",
            transition: "none",
          }
        });
        
        const link = document.createElement("a");
        link.download = `allele-shade-dna-${seasonId}-${theme}-${layout}-${aspect}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error("Card render error:", err);
        window.open(`/api/og?season=${encodeURIComponent(s.name)}`, "_blank");
      } finally {
        setDownloading(false);
      }
    } else {
      setDownloading(false);
    }
  };

  const coords = SEASON_COORDINATES[seasonId] || { x: 0, y: 0 };

  return (
    <section className="dt-hero" style={{ "--accent": s.accent, "--surface": s.surface }}>
      <div className="dt-hero-grid">
        <div className="dt-hero-left">
          <div className="dt-hero-eyebrow">
            <span>Your result</span>
            <span className="dt-hair" />
            <span>{num} · {s.family}</span>
          </div>
          <h1 className="dt-hero-name">
            <em>{first}</em>{rest.length ? <><br />{rest.join(" ")}</> : null}
          </h1>
          {s.archetype && (
            <div className="dt-hero-archetype">
              <span className="dt-hero-archetype-label">Archetype</span>
              <span className="dt-hero-archetype-line">{s.archetype}</span>
            </div>
          )}
          <div className="dt-hero-social-proof" style={{ fontSize: "12.5px", fontStyle: "italic", color: "var(--ink-60)", marginTop: "-10px", marginBottom: "20px", fontFamily: "var(--font-serif, Georgia, serif)" }}>
            You&rsquo;re 1 of {getMonthlyVolume(s.name)} {s.name}s mapped this month · <Link href="/#method" style={{ textDecoration: "underline" }}>see method</Link>
          </div>
          <p className="dt-hero-whisper">{s.whisper}</p>
          {s.washesYouOut && (
            <div className="dt-hero-warning">
              <span className="dt-hero-warning-label">What washes you out</span>
              <span className="dt-hero-warning-line">{s.washesYouOut}</span>
            </div>
          )}

          <div className="dt-hero-attrs">
            <div className="dt-attr">
              <div className="dt-attr-k">Undertone</div>
              <div className="dt-attr-v">{s.undertone}</div>
            </div>
            <div className="dt-attr">
              <div className="dt-attr-k">Depth</div>
              <div className="dt-attr-v">{s.depth}</div>
            </div>
            <div className="dt-attr">
              <div className="dt-attr-k">Chroma</div>
              <div className="dt-attr-v">{s.chroma}</div>
            </div>
            <div className="dt-attr">
              <div className="dt-attr-k">Tagline</div>
              <div className="dt-attr-v"><em>{s.tagline}</em></div>
            </div>
          </div>

          <div className="dt-hero-ctas" style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-start" }}>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a href="#edit" className="dt-btn dt-btn-primary">
                See the 24-product edit <span>↓</span>
              </a>
              {(() => {
                const foundationHero = FOUNDATION_HEROES[s.name];
                const heroShopUrl = withUTM(foundationHero?.shopUrl || getShopUrl(s.name), {
                  season: s.name,
                  category: "foundation",
                  tier: "hero",
                  source: "hero-secondary",
                });
                const isShopMy = heroShopUrl && heroShopUrl.startsWith("https://shopmy.us");
                const relVal = isShopMy ? "sponsored noopener noreferrer" : "sponsored noopener";
                const heroShopLabel = foundationHero
                  ? `Shop Foundation · ${foundationHero.brand}`
                  : "Shop Your Palette";
                return (
                  <a
                    href={heroShopUrl}
                    target="_blank"
                    rel={relVal}
                    className="dt-btn dt-btn-ghost"
                    onClick={() => {
                      track.shopClick({
                        season: s.name,
                        category: "foundation",
                        tier: "hero",
                        brand: foundationHero?.brand || "ShopMy",
                        productName: foundationHero?.name || "Collection Fallback",
                        price: foundationHero?.price || "0",
                      });
                    }}
                  >
                    {heroShopLabel} <span aria-hidden="true">→</span>
                  </a>
                );
              })()}
            </div>
            <div style={{ fontSize: "11px", fontFamily: "var(--font-mono, monospace)", letterSpacing: "0.1em", paddingLeft: "4px" }}>
              <a href="#share" style={{ color: "var(--text-muted, var(--ink-40))", textDecoration: "underline" }}>· save palette card · share with a friend</a>
            </div>
          </div>

          {s.celebs?.length > 0 && (
            <div className="dt-twins">
              <span className="dt-twins-label">Style twins</span>
              <div className="dt-twins-avatars-row">
                {s.celebs.map((celeb) => (
                  <div key={celeb.name} className="dt-twin-avatar-item">
                    <CelebAvatar key={celeb.name} celeb={celeb} seasonId={seasonId} />
                    <span className="dt-twin-avatar-name">
                      <em>{celeb.name}</em>
                      {celeb.contested && (
                        <sup className="dt-twins-contested" title="Sources disagree">*</sup>
                      )}
                      {celeb.note && <span className="dt-twins-note"> ({celeb.note})</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="dt-hero-right" id="share">
          <div className="dt-share-preview">
            <div className="dt-share-card-perspective">
              <div
                ref={cardRef}
                className={`dt-share-card theme-${theme} layout-${layout} aspect-${aspect} show-celebs-${showCelebs}${isDarkHex(s.surface) && theme === "tint" ? " dark" : ""}`}
                style={{
                  "--accent": s.accent,
                  "--surface": theme === "obsidian" ? "#0A0A0C" : theme === "tint" ? s.surface : "#FFFBF7",
                  transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                  transition: tilt.showSheen ? "none" : "transform 0.5s ease",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* Corner hairpins */}
                <div className="dt-card-hairpin tl" />
                <div className="dt-card-hairpin tr" />
                <div className="dt-card-hairpin bl" />
                <div className="dt-card-hairpin br" />

                {/* Dynamic glare shine overlay */}
                {tilt.showSheen && (
                  <div
                    className="dt-card-sheen"
                    style={{
                      background: `radial-gradient(circle at ${tilt.sheenX}% ${tilt.sheenY}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
                    }}
                  />
                )}

                <div className="dt-share-card-header">
                  <span className="dt-share-card-tl">allele</span>
                  <span className="dt-share-card-tr">{num}</span>
                </div>

                {layout === "specimen" ? (
                  // SPECIMEN SCIENTIFIC LAYOUT
                  <div className="dt-share-card-body specimen">
                    <div className="dt-card-meta-row">
                      <span className="dt-card-meta-label">DIAGNOSTIC DATA</span>
                      <span className="dt-card-meta-value">VOL. I · MMXXVI</span>
                    </div>

                    <div className="dt-card-hero-block">
                      <div className="dt-share-card-eyebrow">· {s.family.toUpperCase()} ·</div>
                      <div className="dt-share-card-name">{s.name}</div>
                      <div className="dt-share-card-tag">{s.tagline}</div>
                    </div>

                    <div className="dt-card-details-grid">
                      {/* Diagnostic Coordinates Grid */}
                      <div className="dt-card-grid-container">
                        <div className="dt-card-grid">
                          <div className="dt-card-grid-axis x"></div>
                          <div className="dt-card-grid-axis y"></div>
                          <div className="dt-card-grid-label top">MUTED</div>
                          <div className="dt-card-grid-label bottom">BRIGHT</div>
                          <div className="dt-card-grid-label left">COOL</div>
                          <div className="dt-card-grid-label right">WARM</div>
                          <div
                            className="dt-card-grid-dot"
                            style={{
                              left: `calc(50% + ${coords.x}%)`,
                              top: `calc(50% + ${coords.y}%)`,
                            }}
                          />
                        </div>
                        <div className="dt-card-grid-caption">AXIS MAPPING</div>
                      </div>

                      {/* specimens hex block */}
                      <div className="dt-card-specimens-container">
                        <div className="dt-card-specimens-grid">
                          {s.palette.slice(0, 8).map((color, i) => (
                            <div key={i} className="dt-card-specimen-item">
                              <div className="dt-card-specimen-circle" style={{ background: color }} />
                              <div className="dt-card-specimen-info">
                                <span className="dt-card-specimen-label">{s.paletteLabels[i] || `Color ${i+1}`}</span>
                                <span className="dt-card-specimen-hex">{color.toUpperCase()}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Celebrity style twins */}
                    {showCelebs !== "none" && s.celebs && s.celebs.length > 0 && (
                      <div className="dt-card-celebs-section">
                        <div className="dt-card-celebs-header">CELEBRITY STYLE TWINS</div>
                        {showCelebs === "photo" ? (
                          <div className="dt-card-celebs-avatars">
                            {s.celebs.slice(0, 3).map((celeb) => (
                              <div key={celeb.name} className="dt-card-celeb-avatar-wrap">
                                <CelebAvatar key={celeb.name} celeb={celeb} seasonId={seasonId} />
                                <span className="dt-card-celeb-avatar-name">{celeb.name.split(" ")[0]}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="dt-card-celebs-text">
                            {s.celebs.map((c) => c.name.toUpperCase()).join(" · ")}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  // MINIMAL EDITORIAL LAYOUT
                  <div className="dt-share-card-body minimal">
                    <div className="dt-share-card-center">
                      <div className="dt-share-card-eyebrow">· {s.family} ·</div>
                      <div className="dt-share-card-name">{s.name}</div>
                      <div className="dt-share-card-tag">{s.tagline}</div>
                      
                      <div className="dt-share-card-rail">
                        {s.palette.slice(0, 8).map((c, i) => (
                          <div key={i} className="dt-share-chip" style={{ background: c }} />
                        ))}
                      </div>

                      {showCelebs !== "none" && s.celebs && s.celebs.length > 0 && (
                        <div className="dt-card-celebs-minimal">
                          <span className="dt-card-celebs-minimal-label">TWINS · </span>
                          <span>{s.celebs.map((c) => c.name).join(" · ")}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="dt-share-card-foot">allele.app · find your season</div>
              </div>
            </div>
          </div>

          {/* Customization controls */}
          <div className="dt-share-controls">
            <div className="dt-control-group">
              <label>Theme</label>
              <div className="dt-control-buttons">
                <button className={`dt-control-btn${theme === "cream" ? " active" : ""}`} onClick={() => setTheme("cream")}>Cream</button>
                <button className={`dt-control-btn${theme === "obsidian" ? " active" : ""}`} onClick={() => setTheme("obsidian")}>Obsidian</button>
                <button className={`dt-control-btn${theme === "tint" ? " active" : ""}`} onClick={() => setTheme("tint")}>Tint</button>
              </div>
            </div>

            <div className="dt-control-group">
              <label>Format</label>
              <div className="dt-control-buttons">
                <button className={`dt-control-btn${aspect === "story" ? " active" : ""}`} onClick={() => setAspect("story")}>Story (9:16)</button>
                <button className={`dt-control-btn${aspect === "square" ? " active" : ""}`} onClick={() => setAspect("square")}>Square (1:1)</button>
              </div>
            </div>
            
            <div className="dt-control-group">
              <label>Layout</label>
              <div className="dt-control-buttons">
                <button className={`dt-control-btn${layout === "specimen" ? " active" : ""}`} onClick={() => setLayout("specimen")}>Specimen</button>
                <button className={`dt-control-btn${layout === "minimal" ? " active" : ""}`} onClick={() => setLayout("minimal")}>Minimal</button>
              </div>
            </div>

            <div className="dt-control-group">
              <label>Style Twins</label>
              <div className="dt-control-buttons">
                <button className={`dt-control-btn${showCelebs === "photo" ? " active" : ""}`} onClick={() => setShowCelebs("photo")}>Photo</button>
                <button className={`dt-control-btn${showCelebs === "text" ? " active" : ""}`} onClick={() => setShowCelebs("text")}>Text</button>
                <button className={`dt-control-btn${showCelebs === "none" ? " active" : ""}`} onClick={() => setShowCelebs("none")}>Hide</button>
              </div>
            </div>
          </div>

          <div className="dt-share-targets">
            <button className="dt-share-target" onClick={() => shareLink("native")}>Share</button>
            <button className="dt-share-target" onClick={() => shareLink("copy")}>Copy link</button>
            <button
              className="dt-share-target highlight"
              onClick={downloadCardPng}
              disabled={downloading}
            >
              {downloading ? "Generating..." : "Download PNG"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contrast({ seasonId }) {
  const c = contrastFor(seasonId);
  return (
    <section className="dt-contrast" style={{ padding: "60px 24px", background: "var(--cream-2, #F8F2E9)" }}>
      <div className="dt-section-head" style={{ maxWidth: "1120px", margin: "0 auto 32px", display: "flex", alignItems: "baseline", gap: "20px", justifyContent: "space-between" }}>
        <span className="dt-section-num" style={{ fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace", fontSize: "0.7rem", letterSpacing: "0.18em", color: "var(--accent, #B5500B)" }}>·</span>
        <h2 className="dt-section-title" style={{ fontFamily: "var(--font-display, 'Lora'), Georgia, serif", fontSize: "clamp(1.6rem, 3.4vw, 2.4rem)", fontWeight: 500, lineHeight: 1.1, color: "var(--ink, #1A1613)", flex: 1, textAlign: "center" }}>
          The <em style={{ color: "var(--accent, #B5500B)" }}>contrast</em> read
        </h2>
        <span className="dt-section-meta" style={{ fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-60, rgba(26,22,19,.60))" }}>
          {c.label}
        </span>
      </div>
      <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-display, 'Lora'), Georgia, serif", fontStyle: "italic", fontSize: "clamp(1.05rem, 2vw, 1.3rem)", color: "var(--ink-80, rgba(26,22,19,.80))", lineHeight: 1.55, marginBottom: "20px" }}>
          {c.body}
        </p>
        <div style={{ fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-60, rgba(26,22,19,.60))" }}>
          {c.pairs}
        </div>
      </div>
    </section>
  );
}

function PredictsThisYear({ seasonId }) {
  const colors = pinterestPredictsFor(seasonId);
  if (!colors.length) return null;
  return (
    <section className="dt-predicts" style={{ padding: "60px 24px", background: "var(--cream, #FFFBF7)" }}>
      <div className="dt-section-head" style={{ maxWidth: "1120px", margin: "0 auto 32px", display: "flex", alignItems: "baseline", gap: "20px", justifyContent: "space-between" }}>
        <span className="dt-section-num" style={{ fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace", fontSize: "0.65rem", letterSpacing: "0.18em", color: "var(--accent, #B5500B)", textTransform: "uppercase" }}>2026</span>
        <h2 className="dt-section-title" style={{ fontFamily: "var(--font-display, 'Lora'), Georgia, serif", fontSize: "clamp(1.6rem, 3.4vw, 2.4rem)", fontWeight: 500, lineHeight: 1.1, color: "var(--ink, #1A1613)", flex: 1, textAlign: "center" }}>
          This year, <em style={{ color: "var(--accent, #B5500B)" }}>in your season</em>
        </h2>
        <span className="dt-section-meta" style={{ fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-60, rgba(26,22,19,.60))" }}>
          Pinterest Predicts
        </span>
      </div>
      <div style={{ maxWidth: "880px", margin: "0 auto", display: "grid", gridTemplateColumns: `repeat(${colors.length}, 1fr)`, gap: "32px" }}>
        {colors.map((c) => (
          <div key={c.name} style={{ textAlign: "center" }}>
            <div style={{ width: "120px", height: "120px", borderRadius: "50%", background: c.hex, margin: "0 auto 18px", boxShadow: `0 8px 32px ${c.hex}50, inset 0 2px 4px rgba(255,255,255,0.15)`, border: "3px solid rgba(255,255,255,0.6)" }} />
            <div style={{ fontFamily: "var(--font-display, 'Lora'), Georgia, serif", fontSize: "1.35rem", fontWeight: 500, color: "var(--ink, #1A1613)", marginBottom: "8px", letterSpacing: "-0.01em" }}>
              {c.name}
            </div>
            <div style={{ fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace", fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--ink-40, rgba(26,22,19,.40))", marginBottom: "12px" }}>
              {c.hex}
            </div>
            <p style={{ fontFamily: "var(--font-display, 'Lora'), Georgia, serif", fontStyle: "italic", fontSize: "0.95rem", color: "var(--ink-80, rgba(26,22,19,.80))", lineHeight: 1.55, margin: 0 }}>
              {c.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Drape({ s, seasonId }) {
  const [band, setBand] = useState("both");
  const n = neutralsFor(seasonId);
  const statementCount = s.palette.length;
  const neutralCount = n.palette.length;

  return (
    <section className="dt-drape" style={{ "--accent": s.accent }}>
      <div className="dt-section-head">
        <span className="dt-section-num">·</span>
        <h2 className="dt-section-title">The <em>drape</em></h2>
        <span className="dt-section-meta">
          {statementCount + neutralCount} colors · {statementCount} statement · {neutralCount} neutral
        </span>
      </div>

      <div className="dt-drape-toggle">
        <span className="dt-drape-toggle-label">Show</span>
        <div className="dt-drape-pills">
          <button
            className={`dt-drape-pill${band === "both" ? " active" : ""}`}
            onClick={() => setBand("both")}
          >
            Both bands
          </button>
          <button
            className={`dt-drape-pill${band === "statement" ? " active" : ""}`}
            onClick={() => setBand("statement")}
          >
            <span className="dot statement" /> Statement
          </button>
          <button
            className={`dt-drape-pill${band === "neutrals" ? " active" : ""}`}
            onClick={() => setBand("neutrals")}
          >
            <span className="dot neutral" /> Neutrals
          </button>
        </div>
      </div>

      {(band === "both" || band === "statement") && (
        <div className={`dt-band${band === "neutrals" ? " dim" : ""}`}>
          <div className="dt-band-head">
            <span className="dt-band-tag">I · Statement</span>
            <span className="dt-band-desc">
              Expressive. Wear near the face. For impact, event dressing, and moments.
            </span>
            <span className="dt-band-meta">{statementCount} shades</span>
          </div>
          <div className="dt-drape-rail statement">
            {s.palette.slice(0, 8).map((c, i) => (
              <div key={i} className="dt-drape-chip" style={{ background: c }}>
                <span className="dt-drape-label">{s.paletteLabels[i]}</span>
                <span className="dt-drape-hex">{c.replace("#", "").toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {(band === "both" || band === "neutrals") && (
        <div className={`dt-band${band === "statement" ? " dim" : ""}`}>
          <div className="dt-band-head">
            <span className="dt-band-tag neutral">II · Neutrals</span>
            <span className="dt-band-desc">
              <em>Your everyday.</em> What you&rsquo;ll actually reach for in the closet. These do the quiet work.
            </span>
            <span className="dt-band-meta">{neutralCount} anchors</span>
          </div>
          <div className="dt-drape-rail neutrals">
            {n.palette.map((c, i) => (
              <div
                key={i}
                className={`dt-drape-chip neutral${isDarkHex(c.hex) ? " dark-cell" : ""}`}
                style={{ background: c.hex }}
              >
                <span className="dt-drape-label">{c.name}</span>
                <span className="dt-drape-wear">{c.wear}</span>
                <span className="dt-drape-hex">{c.hex.replace("#", "").toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}



function swatchIsDark(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.55;
}

function PaletteStrip({ season, position, compact }) {
  const palette = season.palette || [];
  const labels = season.paletteLabels || [];
  return (
    <div className={`dt-palette-strip${compact ? " dt-palette-strip-compact" : ""}`}>
      {!compact && (
        <div className="dt-palette-strip-head">
          <span className="dt-palette-strip-label">Your {season.name} palette</span>
          {position && (
            <span className="dt-palette-strip-pos">Match · Pos. {String(position).padStart(2, "0")}</span>
          )}
        </div>
      )}
      <div className="dt-palette-strip-band" role="img" aria-label={`${season.name} palette band`}>
        {palette.map((hex, i) => (
          <span
            key={hex + i}
            className={`dt-palette-cell${position === i + 1 ? " dt-palette-cell-match" : ""}`}
            style={{ background: hex }}
            title={labels[i] || hex}
          />
        ))}
      </div>
      {compact && position && (
        <span className="dt-palette-strip-pos-compact">Pos. {String(position).padStart(2, "0")}</span>
      )}
    </div>
  );
}

function HeroProductCard({ category, hero, season, sourceUrl, onShopClick, shadeIndex = 0, setShadeIndex }) {
  const ladderLength = hero.shadeLadder ? hero.shadeLadder.length : 0;
  const clampedIdx = Math.max(0, Math.min(ladderLength - 1, shadeIndex));
  const activeRung = ladderLength > 0 ? hero.shadeLadder[clampedIdx] : null;
  const swatchHex = activeRung ? activeRung.hex : hero.swatchHex;
  const shadeNumber = activeRung ? activeRung.code : hero.shadeNumber;
  const shadeName = activeRung ? activeRung.label : hero.shadeName;
  const dark = swatchIsDark(swatchHex);
  const metaLine = `BEST MATCH · ${hero.undertone} · ${activeRung ? activeRung.label.toUpperCase() : hero.depth.toUpperCase()} · ${hero.finish.toUpperCase()}`;

  return (
    <article className="dt-spec-hero" data-category={category}>
      <div className="dt-spec-edge" aria-hidden="true" />

      <header className="dt-spec-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8.5px", width: "100%" }}>
        <span className="dt-spec-comp">Composition no. {hero.compositionNumber}</span>
        <span className="dt-spec-verified-badge" style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent, #C4A265)", border: "1px solid rgba(196, 162, 101, 0.3)", padding: "3px 8px", borderRadius: "999px", background: "rgba(255, 251, 247, 0.95)" }}>Lab Verified Match</span>
      </header>

      <div className="dt-spec-body">
        <div className="dt-spec-left">
          <div
            className={`dt-spec-swatch${dark ? " dt-spec-swatch-dark" : ""}`}
            style={{ "--swatch": swatchHex }}
          >
            <div className="dt-spec-swatch-meta">
              <span className="dt-spec-swatch-label">Shade</span>
              <span className="dt-spec-swatch-hex">{swatchHex.toUpperCase()}</span>
            </div>
            <div className="dt-spec-shade-number">{shadeNumber}</div>
            <div className="dt-spec-shade-family">{activeRung ? activeRung.label : hero.shadeFamily}</div>
          </div>

          {hero.shadeLadder && hero.shadeLadder.length > 0 && (
            <div className="dt-spec-ladder">
              <div className="dt-spec-ladder-head">
                <span className="dt-spec-ladder-label">Shade range for {season.name}</span>
                <span className="dt-spec-ladder-arrow">Light → Deep</span>
              </div>
              <div className="dt-spec-ladder-band">
                {hero.shadeLadder.map((rung, i) => (
                  <button
                    type="button"
                    key={rung.code + i}
                    onClick={() => setShadeIndex && setShadeIndex(i)}
                    className={`dt-spec-ladder-cell${rung.representative ? " dt-spec-ladder-cell-rep" : ""}${clampedIdx === i ? " active" : ""}`}
                    title={`${rung.code} · ${rung.label}`}
                    style={{
                      border: "none",
                      background: "transparent",
                      padding: 0,
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px"
                    }}
                  >
                    <span className="dt-spec-ladder-swatch" style={{ background: rung.hex, border: clampedIdx === i ? "2px solid var(--ink)" : "1px solid var(--rule)" }} />
                    <span className="dt-spec-ladder-code" style={{ fontWeight: clampedIdx === i ? 600 : 400 }}>{rung.code}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <figure className="dt-spec-figure">
            <div className="dt-spec-photo">
              {hero.productImageUrl ? (
                <img src={hero.productImageUrl} alt={`${hero.brand} ${hero.name}`} loading="lazy" />
              ) : (
                <div className="dt-spec-photo-fallback">
                  <span>{hero.brand}</span>
                  <span>{hero.name}</span>
                </div>
              )}
            </div>
            <figcaption className="dt-spec-figcaption">Fig. {hero.figNumber}</figcaption>
          </figure>

          <PaletteStrip season={season} position={hero.palettePosition} />
        </div>

        <div className="dt-spec-right">
          <div className="dt-spec-meta">{metaLine}</div>

          <div className="dt-spec-product">
            <div className="dt-spec-brand">{hero.brand}</div>
            <h4 className="dt-spec-name">{hero.name}</h4>
            <div className="dt-spec-shade-sub"><em>Shade {shadeNumber}</em> · {shadeName}</div>
          </div>

          <p className="dt-spec-reasoning">{hero.reasoningText}</p>

          {hero.formulaNote && (
            <aside className="dt-spec-lab">
              <span className="dt-spec-lab-label">From the lab</span>
              <p className="dt-spec-lab-body">{hero.formulaNote}</p>
            </aside>
          )}

          <div className="dt-spec-foot">
            <span className="dt-spec-retail">
              <span className="dt-spec-retail-k">Retail</span> {hero.price}
            </span>
            <a
              href={withUTM(hero.shopUrl || sourceUrl, {
                season: season.name,
                category,
                tier: "hero",
                source: "results",
              })}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="dt-spec-cta"
              onClick={() =>
                onShopClick({
                  season: season.name,
                  category,
                  tier: "hero",
                  brand: hero.brand,
                  productName: hero.name,
                  price: hero.price,
                })
              }
            >
              Shop at {hero.source} <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function AlternateCard({ category, item, season, onShopClick }) {
  const dark = swatchIsDark(item.swatchHex);
  return (
    <article className="dt-spec-alt" data-category={category}>
      <header className="dt-spec-alt-head">
        <span className="dt-spec-comp">Composition no. {item.compositionNumber}</span>
      </header>

      <div className="dt-spec-alt-body">
        <div
          className={`dt-spec-alt-swatch${dark ? " dt-spec-swatch-dark" : ""}`}
          style={{ "--swatch": item.swatchHex }}
        >
          <span className="dt-spec-swatch-label">Shade</span>
          <div className="dt-spec-alt-shade-name">{item.shadeName}</div>
          <span className="dt-spec-swatch-hex">{item.swatchHex.toUpperCase()}</span>
        </div>

        <div className="dt-spec-alt-photo">
          {item.productImageUrl ? (
            <img src={item.productImageUrl} alt={`${item.brand} ${item.name}`} loading="lazy" />
          ) : (
            <div className="dt-spec-photo-fallback">
              <span>{item.brand}</span>
            </div>
          )}
        </div>
      </div>

      <PaletteStrip season={season} position={item.palettePosition} compact />

      <div className="dt-spec-alt-meta">
        {item.undertone} · {item.depth} · {item.finish}
      </div>
      <div className="dt-spec-alt-brand">{item.brand}</div>
      <h5 className="dt-spec-alt-name">{item.name}</h5>
      <p className="dt-spec-alt-reasoning">{item.reasoningText}</p>

      <div className="dt-spec-alt-foot">
        <span className="dt-spec-alt-price">{item.price}</span>
        <a
          href={withUTM(item.shopUrl, {
            season: season.name,
            category,
            tier: "alternate",
            source: "results",
          })}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="dt-spec-alt-cta"
          onClick={() =>
            onShopClick({
              season: season.name,
              category,
              tier: "alternate",
              brand: item.brand,
              productName: item.name,
              price: item.price,
            })
          }
        >
          Shop at {item.source} <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  );
}

function Edit({ s, seasonId, shadeIndex, setShadeIndex, priority }) {
  const products = useMemo(() => productsFor(seasonId), [seasonId]);
  const [tier, setTier] = useState("best-value");
  const [copiedShade, setCopiedShade] = useState(null);
  const selectedProducts = useMemo(() => {
    const desiredOrder = PRIORITY_ORDER[priority] || ["blush", "eyes", "lips", "lipLiner", "bronzer", "nails"];
    return desiredOrder
      .map((catId) => ({ catId, product: products[catId]?.[tier] }))
      .filter(({ product }) => Boolean(product));
  }, [products, tier, priority]);
  const shopUrl = getShopUrl(s.name);
  const undertoneGuidance = UNDERTONE_GUIDANCE[s.name];
  const foundationHero = FOUNDATION_HEROES[s.name];
  const foundationAlternates = FOUNDATION_ALTERNATES[s.name] || [];
  const concealerHero = CONCEALER_HEROES[s.name];
  const concealerAlternates = CONCEALER_ALTERNATES[s.name] || [];

  return (
    <section id="edit" className="dt-edit" style={{ "--accent": s.accent }}>
      <div className="dt-section-head">
        <span className="dt-section-num">01</span>
        <h2 className="dt-section-title">The <em>edit</em></h2>
        <span className="dt-section-meta">
          Twenty-four products · three tiers · all in stock
        </span>
      </div>

      <div className="dt-edit-intro">
        <div>
          <p className="dt-edit-body">
            These are curated to your exact coloring. Each product is hand-matched by undertone, depth, and chroma. Not just &ldquo;warm&rdquo; or &ldquo;cool.&rdquo;
          </p>
          {s.shadeGuidance && (
            <p className="dt-shade-guidance">{s.shadeGuidance}</p>
          )}
          <div className="dt-ftc">
            Links are affiliate. We earn a small commission. Costs you nothing, keeps Allele free.
          </div>
        </div>
        <div className="dt-tier-picker" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
          <span className="dt-tier-label">Tier</span>
          <div className="dt-tier-pills" style={{ display: "flex", gap: "6px", background: "var(--cream-2)", padding: "4px", borderRadius: "999px" }}>
            {(() => {
              const TIER_DECOYS = {
                "budget": "Under $15",
                "best-value": "Hand-matched · most picked",
                "value": "Hand-matched · most picked",
                "splurge": "$50+ · investment"
              };
              return TIERS.map((t) => (
                <button
                  type="button"
                  key={t.id}
                  className={`dt-tier-pill dt-tier-pill-${t.id}${tier === t.id ? " active" : ""}`}
                  onClick={() => setTier(t.id)}
                  aria-pressed={tier === t.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "2px",
                    padding: "6px 18px",
                    borderRadius: "999px",
                    transition: "all 0.2s",
                    height: "auto",
                    border: "none",
                    background: tier === t.id ? (s.accent || "var(--ink)") : "transparent",
                    color: tier === t.id ? (isDarkHex(s.accent || "#000") ? "var(--cream)" : "var(--ink)") : "var(--ink-60)"
                  }}
                >
                  <span style={{ fontSize: "12px", fontWeight: 500 }}>{t.name}</span>
                  <span style={{
                    fontSize: "8.5px",
                    fontFamily: "var(--font-mono, monospace)",
                    letterSpacing: "0.05em",
                    color: tier === t.id ? (isDarkHex(s.accent || "#000") ? "rgba(255,251,247,0.7)" : "rgba(0,0,0,0.6)") : "var(--ink-40)",
                    textTransform: "uppercase",
                    fontWeight: 400
                  }}>
                    {TIER_DECOYS[t.id] || ""}
                  </span>
                </button>
              ));
            })()}
          </div>
          <span style={{ fontSize: "11px", fontFamily: "var(--font-serif, Georgia, serif)", fontStyle: "italic", color: "var(--ink-60)", marginTop: "4px", textAlign: "right" }}>
            Most readers stay on Best Value — it's where the shade match is exact.
          </span>
        </div>
      </div>

      <div className="dt-edit-grid">
        {selectedProducts.map(({ catId, product: p }, i) => {
          return (
            <a
              key={`${catId}-${tier}`}
              href={withUTM(p.shopUrl || shopUrl, {
                season: s.name,
                category: catId,
                tier,
                source: "results",
              })}
              target="_blank"
              rel={(p.shopUrl || shopUrl)?.startsWith("https://shopmy.us") ? "sponsored noopener noreferrer" : "sponsored noopener"}
              className="dt-prod"
              style={{ "--swatch": p.swatch, "--season-accent": s.accent || "#f5f0eb", display: "block", color: "inherit", textDecoration: "none" }}
              onClick={() => {
                track.shopClick({
                  season: s.name,
                  category: catId,
                  tier,
                  brand: p.brand,
                  productName: p.product,
                  price: p.price,
                });
              }}
            >
              <div className="dt-prod-shot">
                <div className="dt-prod-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="dt-prod-band" aria-hidden="true" />
                {p.productImageUrl ? (
                  <img
                    src={p.productImageUrl}
                    alt={`${p.brand} ${p.product}`}
                    className="dt-prod-img"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      padding: "24px 16px",
                      zIndex: 1,
                    }}
                    loading="lazy"
                  />
                ) : null}
                <div className="dt-prod-swatch" style={{ background: p.swatch }} />
                <div className="dt-prod-match">
                  <div className="dt-match-dot" /> Lab Verified
                </div>
              </div>
              <div className="dt-prod-body">
                <div className="dt-prod-cat">{catId.replace("-", " ")}</div>
                <div className="dt-prod-brand">{p.brand}</div>
                <div className="dt-prod-name">{p.product}</div>
                
                <div 
                  className="dt-prod-shade"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigator.clipboard.writeText(p.shade).then(() => {
                      setCopiedShade(p.shade);
                      setTimeout(() => setCopiedShade(null), 2000);
                    }).catch(() => {});
                  }}
                  title="Click to copy shade name"
                  style={{ cursor: "copy" }}
                >
                  <em>in</em> <span className="dt-shade-name-text">{p.shade}</span>
                  <span className={`dt-copy-tooltip${copiedShade === p.shade ? " copied" : ""}`}>
                    {copiedShade === p.shade ? "✓ Copied!" : "📋 Copy shade"}
                  </span>
                </div>

                <p className="dt-prod-match-reason">{getMatchRationale(catId, s.name, tier, p)}</p>

                <div className="dt-prod-stock">
                  <span className="dt-stock-pulse" /> Verified in stock today
                </div>

                <div className="dt-prod-foot">
                  <span className="dt-prod-price">{p.price}</span>
                  {(() => {
                    const targetUrl = withUTM(p.shopUrl || shopUrl, {
                      season: s.name,
                      category: catId,
                      tier,
                      source: "results",
                    });
                    const retailer = getRetailerName(targetUrl);
                    return (
                      <div className="dt-prod-shop">
                        Shop at {retailer} <span aria-hidden="true">→</span>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {foundationHero ? (
        <section className="dt-spec-section">
          <header className="dt-spec-section-head">
            <span className="dt-spec-section-num">The Base</span>
            <h3 className="dt-spec-section-title">Foundation &amp; Concealer</h3>
            <p className="dt-spec-section-intro">
              Your base palette. One match from our analysis — verified against your {s.name} coordinates — and three alternates if you prefer a different finish or coverage.
            </p>
          </header>

          <HeroProductCard
            category="foundation"
            hero={foundationHero}
            season={s}
            sourceUrl={FOUNDATION_URL}
            onShopClick={track.shopClick}
            shadeIndex={shadeIndex}
            setShadeIndex={setShadeIndex}
          />

          {foundationAlternates.length > 0 && (
            <div className="dt-spec-alternates">
              <div className="dt-spec-alternates-head">
                <em className="dt-spec-alternates-label">Or consider these alternates.</em>
                <span className="dt-spec-alternates-count">{String(foundationAlternates.length).padStart(2, "0")} entries</span>
              </div>
              <div className="dt-spec-alternates-grid">
                {foundationAlternates.map((alt) => (
                  <AlternateCard
                    key={alt.compositionNumber}
                    category="foundation"
                    item={alt}
                    season={s}
                    onShopClick={track.shopClick}
                  />
                ))}
              </div>
            </div>
          )}

          {concealerHero && (
            <>
              <header className="dt-spec-subhead">
                <span className="dt-spec-section-num">The Cover</span>
                <h3 className="dt-spec-section-title">Concealer</h3>
              </header>

              <HeroProductCard
                category="concealer"
                hero={concealerHero}
                season={s}
                sourceUrl={CONCEALER_URL}
                onShopClick={track.shopClick}
                shadeIndex={shadeIndex}
                setShadeIndex={setShadeIndex}
              />

              {concealerAlternates.length > 0 && (
                <div className="dt-spec-alternates">
                  <div className="dt-spec-alternates-head">
                    <em className="dt-spec-alternates-label">Or consider these alternates.</em>
                    <span className="dt-spec-alternates-count">{String(concealerAlternates.length).padStart(2, "0")} entries</span>
                  </div>
                  <div className="dt-spec-alternates-grid">
                    {concealerAlternates.map((alt) => (
                      <AlternateCard
                        key={alt.compositionNumber}
                        category="concealer"
                        item={alt}
                        season={s}
                        onShopClick={track.shopClick}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          <div className="dt-spec-browse-all">
            <a
              href={FOUNDATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track.shopClick({ season: s.name, category: "foundation", tier: "browse-all", brand: "ShopMy", productName: "Browse all foundations", price: "varies" })}
            >
              Browse all foundations &amp; concealers <span aria-hidden="true">→</span>
            </a>
          </div>
        </section>
      ) : (
        <div className="dt-foundation">
          <div className="dt-foundation-copy">
            <div className="dt-foundation-k">Foundation &amp; Concealer</div>
            <h3 className="dt-foundation-title">Match undertone first.</h3>
            {undertoneGuidance && (
              <p className="dt-foundation-guidance">{undertoneGuidance}</p>
            )}
          </div>

          <div className="dt-foundation-grid">
            {FOUNDATION_CARDS.map((foundation) => (
              <article key={foundation.name} className="dt-foundation-card">
                <div className="dt-foundation-card-head">
                  <span>{foundation.rating} stars</span>
                  <span>{foundation.reviews} reviews</span>
                  <span
                    className="dt-foundation-undertone-dot"
                    title={`${foundation.undertone} undertone`}
                    style={{ background: UNDERTONE_COLORS[foundation.undertone] }}
                  />
                </div>
                <h4>{foundation.name}</h4>
                <div className="dt-foundation-finish">{foundation.finish}</div>
                <div className="dt-foundation-card-meta">
                  <span>{foundation.shades} shades</span>
                  <span>{foundation.price}</span>
                  <span>{foundation.source}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="dt-concealer-copy">
            <div className="dt-foundation-k">Concealer</div>
            <h3 className="dt-foundation-title">Find your undertone match.</h3>
            {undertoneGuidance && (
              <p className="dt-foundation-guidance">{undertoneGuidance}</p>
            )}
          </div>

          <div className="dt-foundation-grid dt-concealer-grid">
            {CONCEALER_CARDS.map((concealer) => (
              <article key={concealer.name} className="dt-foundation-card">
                <div className="dt-foundation-card-head">
                  <span>{concealer.rating} stars</span>
                  <span>{concealer.reviews} reviews</span>
                  <span
                    className="dt-foundation-undertone-dot"
                    title={`${concealer.undertone} undertone`}
                    style={{ background: UNDERTONE_COLORS[concealer.undertone] }}
                  />
                </div>
                <h4>{concealer.name}</h4>
                <div className="dt-foundation-finish">{concealer.finish}</div>
                <div className="dt-foundation-card-meta">
                  <span>{concealer.shades} shades</span>
                  <span>{concealer.price}</span>
                  <span>{concealer.source}</span>
                </div>
              </article>
            ))}
          </div>

        <div className="dt-foundation-actions">
          <a
            href={FOUNDATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="dt-btn dt-btn-primary"
            onClick={() => {
              track.shopClick({
                season: s.name,
                category: "foundation",
                tier: "collection",
                brand: "ShopMy",
                productName: "Best Foundations",
                price: "varies",
              });
            }}
          >
            Shop Foundations <span>↗</span>
          </a>
          <a
            href={CONCEALER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="dt-btn dt-btn-ghost"
            onClick={() => {
              track.shopClick({
                season: s.name,
                category: "concealer",
                tier: "collection",
                brand: "ShopMy",
                productName: "Best Concealers",
                price: "varies",
              });
            }}
          >
            Shop Concealers <span>↗</span>
          </a>
        </div>
        </div>
      )}
    </section>
  );
}

// Seasons most often mis-diagnosed when the underlying skin is olive.
// Per the Olive Undertone Survival Kit: Cool Olive ↔ True/Soft Summer,
// Warm Olive ↔ True/Soft Autumn, Muted Olive ↔ Soft Summer/Soft Autumn,
// Deep Olive ↔ Dark Autumn/Dark Winter.
const OLIVE_CONFUSED_SEASONS = new Set([
  "soft-summer",
  "true-summer",
  "soft-autumn",
  "true-autumn",
  "dark-autumn",
  "dark-winter",
]);

const OLIVE_SURVIVAL_KIT_URL =
  "https://alleleapp.gumroad.com/l/olive-undertone-survival-kit?utm_source=allele&utm_medium=results&utm_campaign=olive-undertone-survival-kit";

const SUMMER_TRAVEL_CAPSULE_URL =
  "https://alleleapp.gumroad.com/l/summer-travel-capsule-planner?utm_source=allele&utm_medium=results&utm_campaign=summer-travel-capsule-planner";

function OliveAmbiguity({ seasonId, seasonName, oliveFlag = false }) {
  if (!oliveFlag && !OLIVE_CONFUSED_SEASONS.has(seasonId)) return null;

  const handleClick = (source) => {
    trackEvent("kit_clicked", {
      kit: "olive-undertone-survival-kit",
      source,
      from_season: seasonName,
      price_usd: 24,
    });
    track.paidReportCtaClicked({ season: seasonName, placement: source });
  };

  return (
    <section
      style={{
        padding: "72px 24px",
        background: "var(--cream-2, #F8F2E9)",
        borderTop: "1px solid rgba(196,162,101,0.18)",
        borderBottom: "1px solid rgba(196,162,101,0.18)",
      }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <div
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#C4A265",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <span>§ A Second-Read</span>
          <span style={{ flex: 1, height: "1px", background: "rgba(196,162,101,0.4)" }} />
          <span>For olive-prone seasons</span>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display, 'Lora'), Georgia, serif",
            fontSize: "clamp(1.6rem, 3.2vw, 2.2rem)",
            fontWeight: 500,
            lineHeight: 1.2,
            margin: "0 0 24px",
            color: "var(--ink, #1A1613)",
          }}
        >
          If <em>{seasonName}</em> feels a little off,<br />
          you may be reading <em>olive</em>.
        </h2>

        <div
          style={{
            fontFamily: "var(--font-inter, system-ui, sans-serif)",
            fontSize: "1.02rem",
            lineHeight: 1.75,
            color: "rgba(26,22,19,0.82)",
            marginBottom: "32px",
          }}
        >
          <p style={{ margin: "0 0 16px" }}>
            If your foundation oxidizes warmer by 3pm, if half your &ldquo;season palette&rdquo; sings but the other half flattens, if you&rsquo;ve been between {seasonName} and one of its softer neighbors for years &mdash; you may be reading olive against the standard system, not within it.
          </p>
          <p style={{ margin: 0 }}>
            Olive sits on a separate axis from the warm-cool diagnostic most quizzes are built on. <em>The Olive Undertone Survival Kit</em> maps the five olive presentations and shows which slices of your season palette were written for olive skin versus everyone else.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
          <a
            href={OLIVE_SURVIVAL_KIT_URL}
            target="_blank"
            rel="sponsored noopener noreferrer"
            onClick={() => handleClick("results_olive_ambiguity")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "14px 26px",
              background: "var(--ink, #1A1613)",
              color: "var(--cream, #FFFBF7)",
              fontFamily: "var(--font-inter, system-ui, sans-serif)",
              fontSize: "0.9rem",
              fontWeight: 500,
              letterSpacing: "0.04em",
              textDecoration: "none",
              border: "1px solid #C4A265",
              borderRadius: "2px",
            }}
          >
            <span>Read the field guide &middot; $24</span>
            <span>&rarr;</span>
          </a>
          <span
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(26,22,19,0.55)",
            }}
          >
            PDF &middot; 28 sections &middot; 5 olive types
          </span>
        </div>
      </div>
    </section>
  );
}

function TravelCapsule({ seasonId, seasonName }) {
  const handleClick = (source) => {
    trackEvent("kit_clicked", {
      kit: "summer-travel-capsule-planner",
      source,
      from_season: seasonName,
      price_usd: 12,
    });
    track.paidReportCtaClicked({ season: seasonName, placement: source });
  };

  return (
    <section
      style={{
        padding: "72px 24px",
        background: "var(--cream, #FFFBF7)",
        borderTop: "1px solid rgba(196,162,101,0.18)",
        borderBottom: "1px solid rgba(196,162,101,0.18)",
      }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <div
          style={{
            fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#C4A265",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <span>§ The summer edit</span>
          <span style={{ flex: 1, height: "1px", background: "rgba(196,162,101,0.4)" }} />
          <span>Vol. II &middot; mini planner</span>
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display, 'Lora'), Georgia, serif",
            fontSize: "clamp(1.6rem, 3.2vw, 2.2rem)",
            fontWeight: 500,
            lineHeight: 1.2,
            margin: "0 0 24px",
            color: "var(--ink, #1A1613)",
          }}
        >
          Half your suitcase doesn&rsquo;t <em>work on you</em>.<br />
          The other half does the work of <em>six</em>.
        </h2>

        <div
          style={{
            fontFamily: "var(--font-inter, system-ui, sans-serif)",
            fontSize: "1.02rem",
            lineHeight: 1.75,
            color: "rgba(26,22,19,0.82)",
            marginBottom: "32px",
          }}
        >
          <p style={{ margin: "0 0 16px" }}>
            Most travel packing lists assume everyone reads the same in light. They don&rsquo;t. The grey-blue linen that anchors a Soft Summer dissolves on a Bright Winter. The terracotta that grounds a True Autumn flattens a Light Spring. You&rsquo;ve packed it before. The photos came back flat.
          </p>
          <p style={{ margin: 0 }}>
            <em>The Summer Travel Capsule Planner by Color Season</em> shows you the pieces that actually work for <em>{seasonName}</em> &mdash; the ones that pull double duty across dinner, beach, plane, and golden hour &mdash; and the ones to leave on the closet floor. One PDF, twelve season-specific capsules, the math already done.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
          <a
            href={SUMMER_TRAVEL_CAPSULE_URL}
            target="_blank"
            rel="sponsored noopener noreferrer"
            onClick={() => handleClick("results_capsule")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              padding: "14px 26px",
              background: "var(--ink, #1A1613)",
              color: "var(--cream, #FFFBF7)",
              fontFamily: "var(--font-inter, system-ui, sans-serif)",
              fontSize: "0.9rem",
              fontWeight: 500,
              letterSpacing: "0.04em",
              textDecoration: "none",
              border: "1px solid #C4A265",
              borderRadius: "2px",
            }}
          >
            <span>Pack the capsule &middot; $12</span>
            <span>&rarr;</span>
          </a>
          <span
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono'), monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(26,22,19,0.55)",
            }}
          >
            PDF &middot; 12 seasons &middot; 8 pages
          </span>
        </div>
      </div>
    </section>
  );
}

function Collect({ s }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const submit = async (e) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          season: s.name,
          undertone: s.undertone,
          chroma: s.chroma,
          depth: s.depth,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        track.emailSubmitFailed(s.name, err?.error || res.status);
        setStatus("error");
        return;
      }
      track.emailSubmitted(s.name);
      setStatus("success");
    } catch {
      track.emailSubmitFailed(s.name, "network_error");
      setStatus("error");
    }
  };

  return (
    <section className="dt-collect" style={{ "--accent": s.accent }}>
      <div className="dt-collect-inner">
        <div>
          <div className="dt-section-num">02</div>
          <h2 className="dt-collect-title">The <em>dossier</em></h2>
          <p className="dt-collect-body">
            We&rsquo;ll send the long-form letter: every shade with names and hexes, the 24-product edit, and tips you can save for the dressing room.
          </p>
        </div>
        <form className="dt-collect-form" onSubmit={submit}>
          {status === "success" ? (
            <div className="dt-collect-success">
              <div className="dt-collect-success-eyebrow">Sent</div>
              <div className="dt-collect-success-body">
                Check your inbox. Your dossier is on its way.
              </div>
            </div>
          ) : (
            <>
              <label className="dt-collect-label" htmlFor="dossier-email" style={{ marginBottom: "8px" }}>
                Send the dossier
              </label>
              <div className="dt-collect-fine" style={{ marginBottom: "16px" }}>
                Free · No spam · Unsubscribe anytime · Affiliate disclosure on every email.
              </div>
              <div className="dt-collect-row" style={{ marginBottom: "0px" }}>
                <input
                  id="dossier-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="dt-collect-input"
                  disabled={status === "loading"}
                />
                <button
                  type="submit"
                  className="dt-btn dt-btn-ghost"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending…" : "Send the dossier"} <span>→</span>
                </button>
              </div>
              {status === "error" && (
                <div className="dt-collect-error">
                  Something went wrong. Try again, or DM us if it keeps failing.
                </div>
              )}
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function Deeper({ s }) {
  return (
    <section className="dt-deeper">
      <div className="dt-deeper-grid">
        <div>
          <div className="dt-section-num">03</div>
          <h2 className="dt-deeper-title">Go deeper.</h2>
          <p className="dt-deeper-body">
            Shade DNA is Volume I. Your <em>Signature</em> emerges when we combine your color science with your style vibe: curated closet, outfit engine, one-second yes/no shopping filter.
          </p>
          <Link href="/vibe/quiz" className="dt-btn dt-btn-primary dark">
            Unlock Signature <span>→</span>
          </Link>
          <div className="dt-deeper-rarity">1 of 96 · two-chapter identity</div>
        </div>
        <div className="dt-deeper-card">
          <div className="dt-deeper-card-stamp">Chapter 02</div>
          <div className="dt-deeper-card-body">
            <div className="dt-deeper-card-row">
              <span className="dt-deeper-card-k">Shade</span>
              <span className="dt-deeper-card-v">{s.name}</span>
              <div className="dt-deeper-card-chips">
                {s.palette.slice(0, 6).map((c, i) => (
                  <div key={i} className="chip" style={{ background: c }} />
                ))}
              </div>
            </div>
            <div className="dt-deeper-x">×</div>
            <div className="dt-deeper-card-row">
              <span className="dt-deeper-card-k">Vibe</span>
              <span className="dt-deeper-card-v">?</span>
              <span className="dt-deeper-card-unlock">Take the quiz</span>
            </div>
            <div className="dt-deeper-x">=</div>
            <div className="dt-deeper-card-result">
              <em>Your</em> Signature
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const SEASON_COORDINATES = {
  "clear-spring":  { x: 30, y: 25 },
  "true-spring":   { x: 40, y: 15 },
  "light-spring":  { x: 20, y: 10 },
  "light-summer":  { x: -20, y: -10 },
  "true-summer":   { x: -40, y: -25 },
  "soft-summer":   { x: -25, y: -35 },
  "soft-autumn":   { x: 20, y: -30 },
  "true-autumn":   { x: 35, y: -20 },
  "dark-autumn":   { x: 25, y: -35 },
  "dark-winter":   { x: -20, y: 20 },
  "true-winter":   { x: -40, y: 30 },
  "bright-winter": { x: -30, y: 40 },
};

function getInitials(name) {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}

function CelebAvatar({ celeb, seasonId }) {
  const [imageError, setImageError] = useState(false);
  const slug = `${seasonId}-${celeb.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const initials = getInitials(celeb.name);

  useEffect(() => {
    setImageError(false);
  }, [slug]);

  if (imageError || !celeb.name) {
    return (
      <div className="dt-celeb-monogram" title={celeb.name}>
        <span>{initials}</span>
      </div>
    );
  }

  return (
    <img
      src={`/twins/${slug}.jpg?v=2`}
      alt={celeb.name}
      title={celeb.name}
      className="dt-celeb-avatar"
      onError={() => setImageError(true)}
    />
  );
}

function StickyShopBar({ s, shadeIndex }) {
  const [isVisible, setIsVisible] = useState(false);
  const shopUrl = getShopUrl(s.name);
  const foundationHero = FOUNDATION_HEROES[s.name];
  const ladderLength = foundationHero?.shadeLadder ? foundationHero.shadeLadder.length : 0;
  const clampedIdx = Math.max(0, Math.min(ladderLength - 1, shadeIndex));
  const activeRung = ladderLength > 0 ? foundationHero.shadeLadder[clampedIdx] : null;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  const targetUrl = withUTM(foundationHero?.shopUrl || shopUrl, {
    season: s.name,
    category: "foundation",
    tier: "hero",
    source: "sticky-bar",
  });
  const isShopMy = targetUrl && targetUrl.startsWith("https://shopmy.us");
  const relVal = isShopMy ? "sponsored noopener noreferrer" : "sponsored noopener";

  return (
    <div className="dt-sticky-shop-bar" style={{ "--accent": s.accent }}>
      <div className="dt-sticky-left" style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {foundationHero ? (
          <>
            <div className="dt-sticky-title">
              Your Match: <em>{foundationHero.brand} {activeRung ? activeRung.code : foundationHero.shadeNumber} ({activeRung ? activeRung.label : foundationHero.shadeName})</em>
            </div>
            <span className="dt-sticky-desc" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>24 curated products matching your science</span>
              <span>·</span>
              <a href={shopUrl} target="_blank" rel="sponsored noopener noreferrer" style={{ textDecoration: "underline", color: "var(--ink-60)" }}>
                or browse the full edit
              </a>
            </span>
          </>
        ) : (
          <>
            <div className="dt-sticky-title">Your <em>{s.name}</em> Edit</div>
            <span className="dt-sticky-desc">24 products matching your science</span>
          </>
        )}
      </div>
      <a
        href={targetUrl}
        target="_blank"
        rel={relVal}
        className="dt-sticky-cta"
        onClick={() => {
          track.shopClick({
            season: s.name,
            category: "foundation",
            tier: "hero",
            brand: foundationHero?.brand || "ShopMy",
            productName: foundationHero?.name || "Collection Fallback",
            price: foundationHero?.price || "0"
          });
        }}
      >
        {foundationHero ? `Shop Foundation Match · ${foundationHero.price}` : "Shop Full Season"} <span>→</span>
      </a>
    </div>
  );
}

function Footer() {
  return (
    <footer className="dt-footer">
      <div className="dt-footer-grid">
        <div className="dt-footer-brand">
          <div className="dt-footer-word">allele</div>
          <div className="dt-footer-motto">your shade · your science</div>
        </div>
        <div>
          <div className="dt-footer-k">Product</div>
          <Link href="/quiz">Shade DNA</Link>
          <Link href="/vibe">Vibe DNA</Link>
        </div>
        <div>
          <div className="dt-footer-k">Company</div>
          <Link href="/#science">Philosophy</Link>
          <Link href="/#method">The method</Link>
          <a href="mailto:hi@allele.app">Contact</a>
        </div>
        <div>
          <div className="dt-footer-k">Legal</div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/disclosure">FTC disclosure</Link>
        </div>
      </div>
      <div className="dt-footer-fine">© 2026 · Allele · Made in Los Angeles</div>
    </footer>
  );
}

// Thin param reader — the only piece that calls useSearchParams (which suspends).
// Keeping it isolated means the rest of the tree hydrates immediately.
function ParamReader() {
  const sp = useSearchParams();
  return (
    <ResultsInner
      seasonParam={sp.get("season")}
      depthParam={sp.get("depth")}
      oliveFlag={sp.get("olive") === "1"}
      priority={sp.get("priority")}
    />
  );
}

export default function ResultsContent() {
  return (
    <Suspense
      fallback = {
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--cream, #FFFBF7)" }}>
          <div style={{ fontFamily: "var(--font-display, 'Lora'), Georgia, serif", fontSize: "1.2rem", color: "var(--text-muted, #8b8278)" }}>
            Loading your results...
          </div>
        </div>
      }
    >
      <ParamReader />
    </Suspense>
  );
}

function ResultsInner({ seasonParam, depthParam, oliveFlag, priority }) {
  const router = useRouter();

  const initialId = useMemo(() => {
    if (!seasonParam) return "true-autumn";
    const id = seasonIdFromName(seasonParam);
    return SEASONS[id] ? id : "true-autumn";
  }, [seasonParam]);

  const [seasonId, setSeasonId] = useState(initialId);

  useEffect(() => {
    setSeasonId(initialId);
  }, [initialId]);

  const s = SEASONS[seasonId];
  const foundationHero = FOUNDATION_HEROES[s?.name];

  const initialShadeIndex = useMemo(() => {
    if (!foundationHero || !foundationHero.shadeLadder) return 0;
    let depthVal = depthParam;
    if (!depthVal && typeof sessionStorage !== "undefined") {
      depthVal = sessionStorage.getItem("allele_user_depth");
    }
    return getShadeIndexForDepth(depthVal, foundationHero.shadeLadder);
  }, [foundationHero, depthParam]);

  const [shadeIndex, setShadeIndex] = useState(initialShadeIndex);

  useEffect(() => {
    setShadeIndex(initialShadeIndex);
  }, [initialShadeIndex]);

  useEffect(() => {
    if (!s) return;
    track.resultRevealed({
      season: s.name,
      oliveFlag,
      priority,
    });
    track.quizCompleted({
      season: s.name,
      undertone: s.undertone,
      contrast: s.chroma,
      value: s.depth,
      chroma: s.chroma,
      olive_flag: !!oliveFlag,
      priority: priority || "full",
    });
  }, [s?.name, oliveFlag, priority]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSeasonChange = (id) => {
    setSeasonId(id);
    const params = new URLSearchParams({ season: SEASONS[id].name });
    if (depthParam) params.set("depth", depthParam);
    if (oliveFlag) params.set("olive", "1");
    if (priority) params.set("priority", priority);
    router.replace(`/results?${params.toString()}`, { scroll: false });
  };

  if (!s) return null;

  return (
    <main className="dt-results">
      <Nav seasonId={seasonId} onChange={onSeasonChange} />
      <Hero s={s} seasonId={seasonId} />
      
      {/* 24-product edit presented FIRST below hero to drive immediate affiliate conversions */}
      <Edit s={s} seasonId={seasonId} shadeIndex={shadeIndex} setShadeIndex={setShadeIndex} priority={priority} />

      {/* Sticky shopping bar for quick checkout accessibility */}
      <StickyShopBar s={s} shadeIndex={shadeIndex} />

      {/* Olive ambiguity cross-link — only renders for the 6 olive-prone seasons */}
      <OliveAmbiguity seasonId={seasonId} seasonName={s.name} oliveFlag={oliveFlag} />

      {/* Summer Travel Capsule cross-link — renders for all 12 seasons */}
      <TravelCapsule seasonId={seasonId} seasonName={s.name} />

      {/* Color Science theory details folded to reduce visual clutter and cognitive overload */}
      <details className="dt-science-accordion">
        <summary className="dt-science-summary">
          <span>Explore the Color Science Breakdown</span>
          <span className="dt-science-icon">+</span>
        </summary>
        <div className="dt-science-content">
          <Contrast seasonId={seasonId} />
          <Drape s={s} seasonId={seasonId} />
          <PredictsThisYear seasonId={seasonId} />
          <Deeper s={s} />
        </div>
      </details>

      <Collect s={s} />
      <Footer />
    </main>
  );
}
