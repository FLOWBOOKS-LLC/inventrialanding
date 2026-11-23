/**
 * Cookie consent storage, shared by the banner UI and analytics gating.
 *
 * Aligned with the FlowBooks Cookie Policy (NDPA 2023 / GAID 2025):
 * - No non-essential script runs before explicit consent.
 * - Consent is remembered for six months, then re-requested.
 */

export type OptionalCategoryKey = "performance" | "targeting" | "functional";

export type ConsentState = Record<OptionalCategoryKey, boolean>;

export const CONSENT_STORAGE_KEY = "fb_cookie_consent";
export const CONSENT_EVENT = "fb:cookie-consent";
export const CONSENT_TTL_MS = 182 * 24 * 60 * 60 * 1000; // ~6 months

export const defaultConsent: ConsentState = {
  performance: false,
  targeting: false,
  functional: false,
};

export interface StoredConsent extends ConsentState {
  necessary: true;
  action: string;
  updatedAt: string;
  expiresAt: string;
}

/** Reads stored consent, returning null when missing, malformed or expired. */
export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredConsent>;
    if (!parsed || typeof parsed !== "object") return null;

    if (parsed.expiresAt) {
      const expires = Date.parse(parsed.expiresAt);
      if (Number.isFinite(expires) && expires < Date.now()) {
        window.localStorage.removeItem(CONSENT_STORAGE_KEY);
        return null;
      }
    }

    return {
      performance: Boolean(parsed.performance),
      targeting: Boolean(parsed.targeting),
      functional: Boolean(parsed.functional),
    };
  } catch {
    return null;
  }
}

/** Persists consent and notifies listeners (analytics) in the same tab. */
export function writeConsent(state: ConsentState, action: string): ConsentState {
  const now = new Date();
  const record: StoredConsent = {
    ...state,
    necessary: true,
    action,
    updatedAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + CONSENT_TTL_MS).toISOString(),
  };

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage can be blocked; the session still works without persistence.
  }

  window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: state }));
  return state;
}

/** True only when the visitor has actively granted analytics/performance consent. */
export function analyticsAllowed(): boolean {
  return Boolean(readConsent()?.performance);
}
