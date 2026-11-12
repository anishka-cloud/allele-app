"use client";

// Pinterest base tag. Loads only when NEXT_PUBLIC_PINTEREST_TAG_ID is set in
// Vercel AND the visitor accepted cookies (allele-cookie-consent). Fires a
// page visit on load; call pinTrack("lead") / pinTrack("custom", {...}) from
// other components for conversions. Needed before any paid Pinterest test so
// signups and shop clicks can be attributed.

import { useEffect } from "react";

const TAG_ID = process.env.NEXT_PUBLIC_PINTEREST_TAG_ID;
const CONSENT_KEY = "allele-cookie-consent";

function hasConsent() {
  try {
    const v = JSON.parse(localStorage.getItem(CONSENT_KEY) || "null");
    return Boolean(v && v.accepted);
  } catch {
    return false;
  }
}

function load() {
  if (!TAG_ID || typeof window === "undefined" || window.pintrk) return;
  !function(e){if(!window.pintrk){window.pintrk=function(){window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var n=window.pintrk;n.queue=[],n.version="3.0";var t=document.createElement("script");t.async=!0,t.src=e;var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
  window.pintrk("load", TAG_ID);
  window.pintrk("page");
}

export function pinTrack(event, data = {}) {
  if (typeof window !== "undefined" && window.pintrk) {
    window.pintrk("track", event, data);
  }
}

export default function PinterestTag() {
  useEffect(() => {
    if (!TAG_ID) return;
    if (hasConsent()) load();
    const onConsent = () => hasConsent() && load();
    window.addEventListener("allele-consent", onConsent);
    return () => window.removeEventListener("allele-consent", onConsent);
  }, []);
  return null;
}
