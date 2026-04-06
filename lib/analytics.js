/**
 * Analytics layer — fires events to both GA4 and PostHog when configured.
 * Import and call these from any client component.
 * 
 * Environment variables needed:
 *   NEXT_PUBLIC_GA_ID - GA4 measurement ID
 *   NEXT_PUBLIC_POSTHOG_KEY - PostHog project API key
 *   NEXT_PUBLIC_POSTHOG_HOST - PostHog host (default: https://us.i.posthog.com)
 */

let posthogInstance = null;

export function initAnalytics() {
  // GA4 — loads via gtag script in layout
  // PostHog — lazy init
  if (typeof window !== "undefined" && !posthogInstance) {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (key) {
      import("posthog-js").then(({ default: posthog }) => {
        posthog.init(key, {
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
          loaded: (ph) => { posthogInstance = ph; },
          capture_pageview: true,
          autocapture: true,
        });
        posthogInstance = posthog;
      }).catch(() => {
        console.warn("[analytics] PostHog failed to load");
      });
    }
  }
}

export function trackEvent(eventName, properties = {}) {
  // GA4
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, properties);
  }

  // PostHog
  if (posthogInstance) {
    posthogInstance.capture(eventName, properties);
  }

  // Dev logging
  if (process.env.NODE_ENV === "development") {
    console.log(`[analytics] ${eventName}`, properties);
  }
}

// Pre-defined event helpers matching the tracking spec

export const track = {
  quizStarted: (source = "homepage") =>
    trackEvent("quiz_started", { source }),

  questionAnswered: (questionNum, questionKey, answerValue) =>
    trackEvent("quiz_question_answered", { question_num: questionNum, question_key: questionKey, answer_value: answerValue }),

  quizCompleted: (resultData) =>
    trackEvent("quiz_completed", resultData),

  quizAbandoned: (lastQuestion, timeOnQuizSec) =>
    trackEvent("quiz_abandoned", { last_question: lastQuestion, time_on_quiz_sec: timeOnQuizSec }),

  shopClick: ({ season, category, tier, brand, productName, price }) =>
    trackEvent("shop_click", { season, category, tier, brand, product_name: productName, price }),

  downloadCard: (season) =>
    trackEvent("download_card", { season }),

  shareClicked: (season, shareMethod) =>
    trackEvent("share_clicked", { season, share_method: shareMethod }),

  emailSubmitted: (season) =>
    trackEvent("email_submitted", { season }),

  emailFailed: (season, errorCode) =>
    trackEvent("email_submit_failed", { season, error_code: errorCode }),
};
