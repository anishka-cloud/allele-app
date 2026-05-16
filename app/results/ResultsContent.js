"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
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
import { track } from "@/lib/analytics";
import { getShopUrl } from "@/lib/shopLinks";
import "./results.css";

const SEASON_IDS = Object.keys(SEASONS);
const FOUNDATION_URL = "https://shopmy.us/shop/collections/4652210";
const CONCEALER_URL = "https://shopmy.us/shop/collections/4653190";
const UNDERTONE_COLORS = {
  warm: "#C4873A",
  cool: "#9BAEC4",
  neutral: "#B8A99A",
  "warm-neutral": "#C4A87A",
  olive: "#A89968",
};

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
      { hex: "#B07F50", code: "440W", label: "Med-Deep" },
      { hex: "#9E6E45", code: "460W", label: "Deep" },
      { hex: "#8E5B36", code: "480W", label: "Deeper", representative: true },
      { hex: "#7C4E2E", code: "510W", label: "Deepest" },
      { hex: "#6A4128", code: "540W", label: "Espresso" },
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
      { hex: "#A78664", code: "420C", label: "Med-Deep" },
      { hex: "#8C6D52", code: "460C", label: "Deep" },
      { hex: "#7B5944", code: "480C", label: "Deeper", representative: true },
      { hex: "#6C4E3B", code: "510C", label: "Deepest" },
      { hex: "#5D4232", code: "540C", label: "Espresso" },
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
      { hex: "#D2B095", code: "320C", label: "Medium" },
      { hex: "#C5A084", code: "360C", label: "Med-Deep" },
      { hex: "#B58E73", code: "380C", label: "Deeper", representative: true },
      { hex: "#A78664", code: "420C", label: "Deep" },
      { hex: "#8C6D52", code: "460C", label: "Deepest" },
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
      { hex: "#DCBDA1", code: "280C", label: "Light-Med" },
      { hex: "#C9A586", code: "320C", label: "Medium", representative: true },
      { hex: "#C5A084", code: "360C", label: "Med-Deep" },
      { hex: "#B58E73", code: "380C", label: "Deeper" },
      { hex: "#A78664", code: "420C", label: "Deep" },
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
      { hex: "#DDC2A4", code: "210W", label: "Light" },
      { hex: "#DAB89B", code: "220W", label: "Light-Med" },
      { hex: "#D7B596", code: "230W", label: "Medium", representative: true },
      { hex: "#C9A685", code: "250W", label: "Med-Deep" },
      { hex: "#B89571", code: "280W", label: "Deep" },
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
      { hex: "#A07050", code: "Caramel", label: "Med-Deep" },
      { hex: "#8B5C3A", code: "Café", label: "Deep", representative: true },
      { hex: "#7A4F30", code: "Cacao", label: "Deeper" },
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
      { hex: "#967557", code: "Mocha", label: "Med-Deep" },
      { hex: "#7D5D45", code: "Café Mocha", label: "Deep", representative: true },
      { hex: "#6B4D38", code: "Cacao", label: "Deeper" },
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
      { hex: "#D6B89B", code: "Crème Brûlée", label: "Light-Med", representative: true },
      { hex: "#C5A48A", code: "Custard", label: "Medium" },
      { hex: "#A07050", code: "Café", label: "Med-Deep" },
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
      { hex: "#D4B295", code: "Custard", label: "Light", representative: true },
      { hex: "#C5A48A", code: "Café con Leche", label: "Med-Light" },
      { hex: "#A07050", code: "Café", label: "Medium" },
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
      { hex: "#ECCFB0", code: "Vanilla", label: "Light" },
      { hex: "#E5C5A4", code: "Custard", label: "Light-Med" },
      { hex: "#C5A48A", code: "Café con Leche", label: "Medium", representative: true },
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

function Hero({ s, seasonId }) {
  const idx = SEASON_IDS.indexOf(seasonId) + 1;
  const num = `N° ${String(idx).padStart(2, "0")} / 12`;
  const [first, ...rest] = s.name.split(" ");
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

          <div className="dt-hero-ctas">
            <a href="#edit" className="dt-btn dt-btn-primary">
              See the 24-product edit <span>↓</span>
            </a>
            <a href="#share" className="dt-btn dt-btn-ghost">Save palette card</a>
          </div>

          {s.celebs?.length > 0 && (
            <div className="dt-twins">
              <span className="dt-twins-label">Style twins</span>
              <span className="dt-twins-names">
                {s.celebs.map((c, i) => (
                  <span key={i}>
                    <em>{c.name}</em>
                    {c.signatureColor && (
                      <span
                        className="dt-twins-swatch"
                        style={{ background: c.signatureColor }}
                        aria-hidden="true"
                      />
                    )}
                    {c.contested && (
                      <sup className="dt-twins-contested" title="Sources disagree">*</sup>
                    )}
                    {c.note && <span className="dt-twins-note"> ({c.note})</span>}
                    {i < s.celebs.length - 1 && <span className="dt-sep"> · </span>}
                  </span>
                ))}
              </span>
            </div>
          )}
        </div>

        <div className="dt-hero-right">
          <div className={`dt-specimen${isDarkHex(s.surface) ? " dark" : ""}`}>
            <div className="dt-specimen-tl">allele</div>
            <div className="dt-specimen-tr">{num}</div>
            <div className="dt-specimen-body">
              <div className="dt-specimen-family">· {s.family} ·</div>
              <div className="dt-specimen-name">{s.name}</div>
              <div className="dt-specimen-tag">{s.tagline}</div>
            </div>
            <div className="dt-specimen-palette">
              {s.palette.slice(0, 8).map((c, i) => (
                <div
                  key={i}
                  className={`dt-specimen-cell${isDarkHex(c) ? " dark-cell" : ""}`}
                  style={{ background: c }}
                >
                  <span className="label">{s.paletteLabels?.[i] || ""}</span>
                  <span className="hex">{c.replace("#", "").toUpperCase()}</span>
                </div>
              ))}
            </div>
            {s.celebs?.length > 0 && (
              <div className="dt-specimen-twins">
                <div className="dt-specimen-twins-label">Style twins</div>
                <div className="dt-specimen-twins-names">
                  {s.celebs.slice(0, 3).map((c, i) => (
                    <span key={i}>
                      <em>{c.name}</em>
                      {i < Math.min(s.celebs.length, 3) - 1 && (
                        <span className="dt-specimen-twins-sep"> · </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="dt-specimen-foot">allele.app · your shade, your science</div>
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
        <span className="dt-section-num">01</span>
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

function Basics({ seasonId }) {
  const n = neutralsFor(seasonId);
  return (
    <section className="dt-basics">
      <div className="dt-section-head">
        <span className="dt-section-num">02</span>
        <h2 className="dt-section-title">Your <em>wardrobe anchors</em></h2>
        <span className="dt-section-meta">
          The eight pieces every closet is built around. In your exact shade.
        </span>
      </div>
      <p className="dt-basics-intro">
        If you don&rsquo;t gravitate to the statement colors, that&rsquo;s fine. Most of what you wear is <em>neutral</em>. Here&rsquo;s what every basic should be, translated into your season.
      </p>
      <div className="dt-basics-grid">
        {n.basics.map((b, i) => {
          const isMetal = /metal/i.test(b.piece);
          const swatchBg = isMetal ? metalGradient(b.hex) : b.hex;
          return (
            <article
              key={i}
              className={`dt-basic${isMetal ? " dt-basic-metal" : ""}`}
              style={{ "--swatch": b.hex }}
            >
              <div className="dt-basic-swatch" style={{ background: swatchBg }}>
                <span className="dt-basic-num">{String(i + 1).padStart(2, "0")}</span>
                {isMetal && <span className="dt-basic-metal-sheen" aria-hidden="true" />}
              </div>
              <div className="dt-basic-body">
                <div className="dt-basic-k">{b.piece}</div>
                <div className="dt-basic-v">
                  <span className="dt-basic-arrow">→</span> {b.answer}
                </div>
                <div className="dt-basic-hex">{b.hex.replace("#", "").toUpperCase()}</div>
                <div className="dt-basic-note">{b.note}</div>
              </div>
            </article>
          );
        })}
      </div>
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

function HeroProductCard({ category, hero, season, sourceUrl, onShopClick }) {
  const dark = swatchIsDark(hero.swatchHex);
  const metaLine = `BEST MATCH · ${hero.undertone} · ${hero.depth} · ${hero.finish}`;

  return (
    <article className="dt-spec-hero" data-category={category}>
      <div className="dt-spec-edge" aria-hidden="true" />

      <header className="dt-spec-head">
        <span className="dt-spec-comp">Composition no. {hero.compositionNumber}</span>
      </header>

      <div className="dt-spec-body">
        <div className="dt-spec-left">
          <div
            className={`dt-spec-swatch${dark ? " dt-spec-swatch-dark" : ""}`}
            style={{ "--swatch": hero.swatchHex }}
          >
            <div className="dt-spec-swatch-meta">
              <span className="dt-spec-swatch-label">Shade</span>
              <span className="dt-spec-swatch-hex">{hero.swatchHex.toUpperCase()}</span>
            </div>
            <div className="dt-spec-shade-number">{hero.shadeNumber}</div>
            <div className="dt-spec-shade-family">{hero.shadeFamily}</div>
          </div>

          {hero.shadeLadder && hero.shadeLadder.length > 0 && (
            <div className="dt-spec-ladder">
              <div className="dt-spec-ladder-head">
                <span className="dt-spec-ladder-label">Shade range for {season.name}</span>
                <span className="dt-spec-ladder-arrow">Light → Deep</span>
              </div>
              <div className="dt-spec-ladder-band">
                {hero.shadeLadder.map((rung, i) => (
                  <div
                    key={rung.code + i}
                    className={`dt-spec-ladder-cell${rung.representative ? " dt-spec-ladder-cell-rep" : ""}`}
                    title={`${rung.code} · ${rung.label}`}
                  >
                    <span className="dt-spec-ladder-swatch" style={{ background: rung.hex }} />
                    <span className="dt-spec-ladder-code">{rung.code}</span>
                  </div>
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
            <div className="dt-spec-shade-sub"><em>Shade {hero.shadeNumber}</em> · {hero.shadeFamily}</div>
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
              href={hero.shopUrl || sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
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
          href={item.shopUrl}
          target="_blank"
          rel="noopener noreferrer"
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

function Edit({ s, seasonId }) {
  const products = useMemo(() => productsFor(seasonId), [seasonId]);
  const [tier, setTier] = useState("best-value");
  const selectedProducts = useMemo(() => (
    Object.entries(products)
      .map(([catId, tiers]) => ({ catId, product: tiers[tier] }))
      .filter(({ product }) => Boolean(product))
      .slice(0, 8)
  ), [products, tier]);
  const shopUrl = getShopUrl(s.name);
  const undertoneGuidance = UNDERTONE_GUIDANCE[s.name];
  const foundationHero = FOUNDATION_HEROES[s.name];
  const foundationAlternates = FOUNDATION_ALTERNATES[s.name] || [];
  const concealerHero = CONCEALER_HEROES[s.name];
  const concealerAlternates = CONCEALER_ALTERNATES[s.name] || [];

  return (
    <section id="edit" className="dt-edit" style={{ "--accent": s.accent }}>
      <div className="dt-section-head">
        <span className="dt-section-num">03</span>
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
        <div className="dt-tier-picker">
          <span className="dt-tier-label">Tier</span>
          <div className="dt-tier-pills">
            {TIERS.map((t) => (
              <button
                type="button"
                key={t.id}
                className={`dt-tier-pill${tier === t.id ? " active" : ""}`}
                onClick={() => setTier(t.id)}
                aria-pressed={tier === t.id}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>
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

      <div className="dt-edit-grid">
        {selectedProducts.map(({ catId, product: p }, i) => {
          return (
            <article
              key={`${catId}-${tier}`}
              className="dt-prod"
              style={{ "--swatch": p.swatch, "--season-accent": s.accent || "#f5f0eb" }}
            >
              <div className="dt-prod-shot">
                <div className="dt-prod-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="dt-prod-band" aria-hidden="true" />
                <div className="dt-prod-swatch" style={{ background: p.swatch }} />
                <div className="dt-prod-match">
                  <div className="dt-match-dot" /> Match
                </div>
              </div>
              <div className="dt-prod-body">
                <div className="dt-prod-cat">{catId.replace("-", " ")}</div>
                <div className="dt-prod-brand">{p.brand}</div>
                <div className="dt-prod-name">{p.product}</div>
                <div className="dt-prod-shade"><em>in</em> {p.shade}</div>
                <div className="dt-prod-foot">
                  <span className="dt-prod-price">{p.price}</span>
                  <a
                    href={shopUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dt-prod-shop"
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
                    Shop <span>↗</span>
                  </a>
                </div>
              </div>
            </article>
          );
        })}
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
          <div className="dt-section-num">04</div>
          <h2 className="dt-collect-title">The <em>dossier</em></h2>
          <p className="dt-collect-body">
            We&rsquo;ll send the long-form letter: every shade with names and hexes, your wardrobe anchors, the 24-product edit, and tips you can save for the dressing room.
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
              <label className="dt-collect-label" htmlFor="dossier-email">
                Send the dossier
              </label>
              <div className="dt-collect-row">
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
                  className="dt-btn dt-btn-primary"
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
              <div className="dt-collect-fine">
                Free · No spam · Unsubscribe anytime · Affiliate disclosure on every email.
              </div>
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
          <div className="dt-section-num">05</div>
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

function Share({ s, seasonId }) {
  const idx = SEASON_IDS.indexOf(seasonId) + 1;
  const num = `N° ${String(idx).padStart(2, "0")} / 12`;

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

  return (
    <section id="share" className="dt-share" style={{ "--accent": s.accent }}>
      <div className="dt-share-inner">
        <div>
          <div className="dt-share-eyebrow">Share</div>
          <h2 className="dt-share-title">Shareable as a <em>specimen card</em></h2>
          <p className="dt-share-body">
            A 1:1 identity card ready for Instagram, TikTok, or iMessage. Designed so your friends actually want to click.
          </p>
          <div className="dt-share-targets">
            <button className="dt-share-target" onClick={() => shareLink("native")}>Share</button>
            <button className="dt-share-target" onClick={() => shareLink("copy")}>Copy link</button>
            <button
              className="dt-share-target"
              onClick={() => {
                track.downloadCard(s.name);
                window.open(`/api/og?season=${encodeURIComponent(s.name)}`, "_blank");
              }}
            >
              Download PNG
            </button>
          </div>
        </div>
        <div className="dt-share-preview">
          <div
            className={`dt-share-card${isDarkHex(s.surface) ? " dark" : ""}`}
            style={{ "--accent": s.accent, "--surface": s.surface }}
          >
            <div className="dt-share-card-tl">allele</div>
            <div className="dt-share-card-tr">{num}</div>
            <div className="dt-share-card-center">
              <div className="dt-share-card-eyebrow">· {s.family} ·</div>
              <div className="dt-share-card-name">{s.name}</div>
              <div className="dt-share-card-tag">{s.tagline}</div>
              <div className="dt-share-card-rail">
                {s.palette.slice(0, 8).map((c, i) => (
                  <div key={i} className="dt-share-chip" style={{ background: c }} />
                ))}
              </div>
            </div>
            <div className="dt-share-card-foot">allele.app · find your season</div>
          </div>
        </div>
      </div>
    </section>
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
  return <ResultsInner seasonParam={sp.get("season")} />;
}

export default function ResultsContent() {
  return (
    <Suspense
      fallback={
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

function ResultsInner({ seasonParam }) {
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

  useEffect(() => {
    if (!s) return;
    track.quizCompleted({
      season: s.name,
      undertone: s.undertone,
      contrast: s.chroma,
      value: s.depth,
      chroma: s.chroma,
    });
  }, [s?.name]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSeasonChange = (id) => {
    setSeasonId(id);
    const url = `/results?season=${encodeURIComponent(SEASONS[id].name)}`;
    router.replace(url, { scroll: false });
  };

  if (!s) return null;

  return (
    <main className="dt-results">
      <Nav seasonId={seasonId} onChange={onSeasonChange} />
      <Hero s={s} seasonId={seasonId} />
      <Contrast seasonId={seasonId} />
      <Drape s={s} seasonId={seasonId} />
      <PredictsThisYear seasonId={seasonId} />
      <Basics seasonId={seasonId} />
      <Edit s={s} seasonId={seasonId} />
      <Collect s={s} />
      <Deeper s={s} />
      <Share s={s} seasonId={seasonId} />
      <Footer />
    </main>
  );
}
