"use client";

import { useMemo } from "react";
import { getSkinTone, getSkinShadow, hairColorMap, eyeColorMap, lightenHex, darkenHex, mixHex } from "@/lib/skinTones";

/**
 * Editorial fashion illustration avatar.
 * Dynamic SVG with swappable skin/hair/eye/makeup color layers.
 */
export default function AvatarSVG({
  skinAnswer = "medium",
  undertone = "Warm",
  olive = false,
  hairAnswer = "deep_cool",
  eyeAnswer = "medium",
  lipColor = "#C08090",
  blushColor = "#D4A0B0",
  eyeshadowColor = "#B0A0B0",
  size = 320,
}) {
  const colors = useMemo(() => {
    const skin = getSkinTone(skinAnswer, undertone, olive);
    const skinShadow = getSkinShadow(skinAnswer, undertone, olive);
    const skinHighlight = lightenHex(skin, 0.15);
    const hair = hairColorMap[hairAnswer] || hairColorMap.deep_cool;
    const eye = eyeColorMap[eyeAnswer] || eyeColorMap.medium;
    const lipDark = darkenHex(lipColor, 0.2);
    const lipHighlight = lightenHex(lipColor, 0.3);
    const blushSoft = mixHex(blushColor, skin, 0.45);
    const eyeshadowSoft = mixHex(eyeshadowColor, skin, 0.35);
    const browColor = darkenHex(hair.fill, 0.15);
    const lashColor = darkenHex(hair.fill, 0.3);

    return { skin, skinShadow, skinHighlight, hair, eye, lipColor, lipDark, lipHighlight, blushSoft, eyeshadowSoft, browColor, lashColor };
  }, [skinAnswer, undertone, olive, hairAnswer, eyeAnswer, lipColor, blushColor, eyeshadowColor]);

  const id = useMemo(() => Math.random().toString(36).slice(2, 8), []);

  return (
    <svg
      viewBox="0 0 300 400"
      width={size}
      height={size * (400 / 300)}
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.08))" }}
    >
      <defs>
        {/* Watercolor texture filter */}
        <filter id={`wc-${id}`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" seed="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* Soft glow for skin */}
        <filter id={`glow-${id}`}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Gradient for hair shine */}
        <linearGradient id={`hair-grad-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={colors.hair.highlight} stopOpacity="0.6" />
          <stop offset="50%" stopColor={colors.hair.fill} />
          <stop offset="100%" stopColor={colors.hair.shadow} />
        </linearGradient>

        {/* Radial gradient for blush */}
        <radialGradient id={`blush-l-${id}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={colors.blushSoft} stopOpacity="0.6" />
          <stop offset="100%" stopColor={colors.blushSoft} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`blush-r-${id}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor={colors.blushSoft} stopOpacity="0.6" />
          <stop offset="100%" stopColor={colors.blushSoft} stopOpacity="0" />
        </radialGradient>

        {/* Skin gradient for face */}
        <radialGradient id={`skin-grad-${id}`} cx="0.5" cy="0.4" r="0.55">
          <stop offset="0%" stopColor={colors.skinHighlight} />
          <stop offset="70%" stopColor={colors.skin} />
          <stop offset="100%" stopColor={colors.skinShadow} />
        </radialGradient>

        {/* Lip gradient */}
        <linearGradient id={`lip-grad-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colors.lipHighlight} />
          <stop offset="40%" stopColor={colors.lipColor} />
          <stop offset="100%" stopColor={colors.lipDark} />
        </linearGradient>

        {/* Eye shadow gradient */}
        <linearGradient id={`shadow-grad-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colors.eyeshadowSoft} stopOpacity="0.7" />
          <stop offset="100%" stopColor={colors.eyeshadowSoft} stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* ─── Layer 1: Neck ─── */}
      <path
        d="M120,310 Q125,330 115,370 L185,370 Q175,330 180,310"
        fill={colors.skin}
        stroke={colors.skinShadow}
        strokeWidth="0.5"
        opacity="0.95"
      />
      {/* Neck shadow */}
      <ellipse cx="150" cy="310" rx="32" ry="8" fill={colors.skinShadow} opacity="0.2" />

      {/* ─── Layer 2: Hair behind (back layer) ─── */}
      <path
        d="M70,140 Q60,200 65,320 Q70,350 80,370 L60,370 Q40,300 45,200 Q50,120 90,70 Q110,50 150,42 Q190,50 210,70 Q250,120 255,200 Q260,300 240,370 L220,370 Q230,350 235,320 Q240,200 230,140"
        fill={`url(#hair-grad-${id})`}
        filter={`url(#wc-${id})`}
      />

      {/* ─── Layer 3: Face shape ─── */}
      <ellipse
        cx="150" cy="200"
        rx="80" ry="105"
        fill={`url(#skin-grad-${id})`}
        filter={`url(#glow-${id})`}
      />

      {/* Face contour / jaw */}
      <path
        d="M75,210 Q80,280 110,305 Q130,318 150,320 Q170,318 190,305 Q220,280 225,210"
        fill="none"
        stroke={colors.skinShadow}
        strokeWidth="0.8"
        opacity="0.15"
      />

      {/* Nose */}
      <path
        d="M148,210 Q145,235 140,248 Q145,252 150,253 Q155,252 160,248 Q155,235 152,210"
        fill="none"
        stroke={colors.skinShadow}
        strokeWidth="0.8"
        opacity="0.25"
      />
      {/* Nose highlight */}
      <line x1="149" y1="215" x2="150" y2="240" stroke={colors.skinHighlight} strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />

      {/* ─── Layer 4: Eyeshadow ─── */}
      <ellipse cx="118" cy="192" rx="22" ry="12" fill={`url(#shadow-grad-${id})`} />
      <ellipse cx="182" cy="192" rx="22" ry="12" fill={`url(#shadow-grad-${id})`} />

      {/* ─── Layer 5: Eyes ─── */}
      {/* Left eye */}
      <path
        d="M98,198 Q108,186 118,184 Q128,186 138,198 Q128,204 118,206 Q108,204 98,198Z"
        fill="white"
        stroke={colors.skinShadow}
        strokeWidth="0.5"
        opacity="0.95"
      />
      <circle cx="118" cy="196" r="8.5" fill={colors.eye.ring} />
      <circle cx="118" cy="196" r="7" fill={colors.eye.iris} />
      <circle cx="118" cy="196" r="3.5" fill="#1a1a1a" />
      <circle cx="116" cy="193" r="2" fill="white" opacity="0.85" />
      <circle cx="121" cy="195" r="1" fill="white" opacity="0.5" />

      {/* Right eye */}
      <path
        d="M162,198 Q172,186 182,184 Q192,186 202,198 Q192,204 182,206 Q172,204 162,198Z"
        fill="white"
        stroke={colors.skinShadow}
        strokeWidth="0.5"
        opacity="0.95"
      />
      <circle cx="182" cy="196" r="8.5" fill={colors.eye.ring} />
      <circle cx="182" cy="196" r="7" fill={colors.eye.iris} />
      <circle cx="182" cy="196" r="3.5" fill="#1a1a1a" />
      <circle cx="180" cy="193" r="2" fill="white" opacity="0.85" />
      <circle cx="185" cy="195" r="1" fill="white" opacity="0.5" />

      {/* ─── Layer 6: Eyelashes ─── */}
      <path
        d="M96,198 Q108,183 118,181 Q128,183 140,198"
        fill="none"
        stroke={colors.lashColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M160,198 Q172,183 182,181 Q192,183 204,198"
        fill="none"
        stroke={colors.lashColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* ─── Layer 7: Eyebrows ─── */}
      <path
        d="M95,176 Q105,165 120,168 Q130,170 138,175"
        fill="none"
        stroke={colors.browColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M162,175 Q170,170 180,168 Q195,165 205,176"
        fill="none"
        stroke={colors.browColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.75"
      />

      {/* ─── Layer 8: Blush ─── */}
      <ellipse cx="105" cy="248" rx="28" ry="18" fill={`url(#blush-l-${id})`} />
      <ellipse cx="195" cy="248" rx="28" ry="18" fill={`url(#blush-r-${id})`} />

      {/* ─── Layer 9: Lips ─── */}
      {/* Upper lip */}
      <path
        d="M130,275 Q137,268 143,270 Q147,265 150,264 Q153,265 157,270 Q163,268 170,275 Q160,278 150,279 Q140,278 130,275Z"
        fill={`url(#lip-grad-${id})`}
        stroke={colors.lipDark}
        strokeWidth="0.5"
      />
      {/* Lower lip */}
      <path
        d="M130,275 Q140,278 150,279 Q160,278 170,275 Q165,290 150,293 Q135,290 130,275Z"
        fill={`url(#lip-grad-${id})`}
        stroke={colors.lipDark}
        strokeWidth="0.5"
      />
      {/* Lip highlight */}
      <ellipse cx="150" cy="283" rx="10" ry="4" fill="white" opacity="0.15" />
      {/* Cupid's bow highlight */}
      <path
        d="M145,267 Q147,265 150,264 Q153,265 155,267"
        fill="none"
        stroke={colors.lipHighlight}
        strokeWidth="1"
        opacity="0.4"
        strokeLinecap="round"
      />

      {/* ─── Layer 10: Hair front (framing layers) ─── */}
      <path
        d="M75,160 Q70,120 90,85 Q110,60 150,52 Q190,60 210,85 Q230,120 225,160 Q220,140 200,125 Q180,115 150,112 Q120,115 100,125 Q80,140 75,160Z"
        fill={`url(#hair-grad-${id})`}
        filter={`url(#wc-${id})`}
      />

      {/* Hair parting / framing strands - left */}
      <path
        d="M85,120 Q78,160 72,210 Q70,240 73,260"
        fill="none"
        stroke={colors.hair.highlight}
        strokeWidth="1.5"
        opacity="0.3"
        strokeLinecap="round"
      />
      {/* Right framing strand */}
      <path
        d="M215,120 Q222,160 228,210 Q230,240 227,260"
        fill="none"
        stroke={colors.hair.highlight}
        strokeWidth="1.5"
        opacity="0.3"
        strokeLinecap="round"
      />

      {/* ─── Layer 11: Subtle highlights / watercolor accents ─── */}
      {/* Forehead highlight */}
      <ellipse cx="150" cy="150" rx="30" ry="15" fill={colors.skinHighlight} opacity="0.15" />
      {/* Chin highlight */}
      <ellipse cx="150" cy="310" rx="12" ry="6" fill={colors.skinHighlight} opacity="0.1" />

      {/* Decorative watercolor splashes */}
      <circle cx="55" cy="90" r="15" fill={colors.lipColor} opacity="0.06" filter={`url(#wc-${id})`} />
      <circle cx="245" cy="100" r="12" fill={colors.eyeshadowSoft} opacity="0.06" filter={`url(#wc-${id})`} />
      <circle cx="40" cy="350" r="20" fill={colors.blushSoft} opacity="0.04" filter={`url(#wc-${id})`} />
    </svg>
  );
}
