/**
 * Google Analytics 4 (optional, consent-gated).
 *
 * Set `VITE_GA_MEASUREMENT_ID` (e.g. G-XXXXXXX) at build time to enable GA4.
 * Nothing is loaded until the visitor grants performance/analytics consent in
 * the cookie banner — required by the FlowBooks Cookie Policy and GAID 2025
 * (Art. 19 prior script blocking).
 */

import { CONSENT_EVENT, analyticsAllowed, type ConsentState } from "@/app/lib/cookieConsent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const measurementId = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined)?.trim();

let loaded = false;

function loadGtag() {
  if (typeof window === "undefined" || !measurementId) return;

  if (!loaded) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };

    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag("js", new Date());
    loaded = true;
  }

  window.gtag?.("consent", "update", { analytics_storage: "granted" });
  window.gtag?.("config", measurementId, { send_page_view: false });
}

/** Loads GA4 only if analytics consent has been granted. */
export function initAnalyticsIfConsented() {
  if (!measurementId || !analyticsAllowed()) return;
  loadGtag();
}

/** Applies a consent change immediately (grant loads GA, revoke stops collection). */
export function applyConsentChange(state: ConsentState) {
  if (!measurementId) return;
  if (state.performance) {
    loadGtag();
    return;
  }
  if (loaded && window.gtag) {
    window.gtag("consent", "update", { analytics_storage: "denied" });
  }
}

/** Subscribes to banner consent changes. Returns an unsubscribe function. */
export function watchConsent(onChange: (state: ConsentState) => void) {
  const listener = (event: Event) => {
    const detail = (event as CustomEvent<ConsentState>).detail;
    if (detail) onChange(detail);
  };
  window.addEventListener(CONSENT_EVENT, listener);
  return () => window.removeEventListener(CONSENT_EVENT, listener);
}

export function trackPageView(path: string, title: string) {
  if (typeof window === "undefined" || !window.gtag || !analyticsAllowed()) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  });
}
