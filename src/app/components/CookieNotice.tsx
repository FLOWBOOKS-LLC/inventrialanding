import { useCallback, useEffect, useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import logo from "@/assets/flowbooks-blue.png";
import {
  defaultConsent,
  readConsent,
  writeConsent,
  type ConsentState,
  type OptionalCategoryKey,
} from "@/app/lib/cookieConsent";

const OPEN_EVENT = "inventria:open-cookie-settings";
const BRAND = "#0b3574";

const categories: {
  key: OptionalCategoryKey | "necessary";
  title: string;
  description: string;
}[] = [
  {
    key: "necessary",
    title: "Strictly Necessary Cookies",
    description:
      "These cookies are required for the website and FlowBooks workspace to operate safely. Without them, core features such as logging into your account, switching workspaces, maintaining session security, and preventing cross-site request forgery (CSRF) cannot function. They are deployed without prior opt-in consent.",
  },
  {
    key: "functional",
    title: "Functional & Preference Cookies",
    description:
      "These cookies let the platform remember choices you make—such as your preferred language, selected pricing plan during sign-up, or dashboard display preferences—to provide a more personalised experience. They are optional and only set with your consent.",
  },
  {
    key: "performance",
    title: "Performance & Analytics Cookies",
    description:
      "If enabled by you, these cookies collect aggregated, statistical information about how visitors navigate www.flowbooks.org (such as page load times, error messages, and popular features). We use this data strictly to improve platform reliability and user experience.",
  },
  {
    key: "targeting",
    title: "Marketing & Third-Party Cookies",
    description:
      "If enabled by you, these cookies may be set by trusted advertising or social media partners to measure the effectiveness of our outreach campaigns. FlowBooks does not sell personal data or financial workspace records collected through cookies.",
  },
];

export function CookieNotice() {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [consent, setConsent] = useState<ConsentState>(defaultConsent);

  useEffect(() => {
    const stored = readConsent();
    if (stored) {
      setConsent(stored);
    } else {
      setBannerVisible(true);
    }
  }, []);

  useEffect(() => {
    const open = () => {
      setExpanded({});
      setBannerVisible(false);
      setPanelOpen(true);
    };
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  const save = useCallback((next: ConsentState, action: string) => {
    writeConsent(next, action);
    setConsent(next);
    setPanelOpen(false);
    setBannerVisible(false);
  }, []);

  const acceptAll = () =>
    save({ performance: true, targeting: true, functional: true }, "accept-all");

  const rejectNonEssential = () =>
    save({ performance: false, targeting: false, functional: false }, "reject-non-essential");

  const toggle = (key: OptionalCategoryKey) =>
    setConsent((prev) => ({ ...prev, [key]: !prev[key] }));

  // Lock background scrolling while the preferences panel is open
  useEffect(() => {
    if (!panelOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPanelOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [panelOpen]);

  return (
    <>
      {bannerVisible && !panelOpen ? (
        <div className="fixed inset-x-0 bottom-0 z-[70] px-3 pb-3 sm:bottom-4 sm:px-4">
          <div
            role="dialog"
            aria-label="Cookie consent"
            aria-live="polite"
            className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-2xl border border-neutral-200 bg-white px-5 py-5 text-black shadow-[0_10px_40px_rgba(0,0,0,0.18)]"
          >
            <img src={logo} alt="FlowBooks" className="h-8 w-auto self-start" />
            <p className="text-sm leading-relaxed text-neutral-700">
              We use cookies to keep FlowBooks secure, remember your preferences, and—only if you
              agree—understand how visitors use the site. Analytics and marketing cookies are not
              set until you accept them. You can change or withdraw your choices at any time with the
              Cookie Settings link in our footer.
            </p>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={acceptAll}
                className="w-full rounded-lg px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b3574] focus-visible:ring-offset-2"
                style={{ backgroundColor: BRAND }}
              >
                Accept All Cookies
              </button>
              <button
                type="button"
                onClick={rejectNonEssential}
                className="w-full rounded-lg px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b3574] focus-visible:ring-offset-2"
                style={{ backgroundColor: BRAND }}
              >
                Reject Non-Essential Cookies
              </button>
              <button
                type="button"
                onClick={() => setPanelOpen(true)}
                className="w-full rounded-lg border border-neutral-400 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b3574] focus-visible:ring-offset-2"
              >
                Manage Cookies
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {panelOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/40 sm:items-center sm:p-4"
          onClick={() => setPanelOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Cookie consent preferences"
            onClick={(event) => event.stopPropagation()}
            className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-white text-black shadow-2xl sm:rounded-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-4 border-b border-neutral-200 px-5 py-4">
              <img src={logo} alt="FlowBooks" className="h-9 w-auto" />
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                aria-label="Close cookie preferences"
                className="rounded-md border border-neutral-300 p-2 text-neutral-700 transition-colors hover:bg-neutral-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <p className="text-sm leading-relaxed text-neutral-700">
                We use cookies to give you a more personalised web experience. Because we respect
                your right to privacy, you can choose not to allow some types of cookies. Click on
                the different category headings to learn more and change our default settings.
                Blocking some types of cookies may impact your experience of the site and the
                services we are able to offer.
              </p>

              <button
                type="button"
                onClick={() => setConsent({ performance: true, targeting: true, functional: true })}
                className="mt-5 w-full rounded-lg px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ backgroundColor: BRAND }}
              >
                Allow All
              </button>

              <h2 className="mt-7 text-base font-bold text-neutral-800">
                Manage Consent Preferences
              </h2>

              <div className="mt-3 divide-y divide-neutral-200 border-y border-neutral-200">
                {categories.map((category) => {
                  const isNecessary = category.key === "necessary";
                  const isOpen = Boolean(expanded[category.key]);
                  const checked = isNecessary
                    ? true
                    : consent[category.key as OptionalCategoryKey];

                  return (
                    <div key={category.key} className="py-3">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setExpanded((prev) => ({ ...prev, [category.key]: !prev[category.key] }))
                          }
                          aria-expanded={isOpen}
                          aria-label={`${isOpen ? "Collapse" : "Expand"} ${category.title}`}
                          className="flex h-6 w-6 shrink-0 items-center justify-center text-neutral-700 hover:text-neutral-950"
                        >
                          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        </button>
                        <span className="flex-1 text-sm font-semibold leading-snug text-neutral-800">
                          {category.title}
                        </span>
                        {isNecessary ? null : (
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-medium text-neutral-500">
                              {checked ? "On" : "Off"}
                            </span>
                            <button
                              type="button"
                              role="switch"
                              aria-checked={checked}
                              aria-label={category.title}
                              onClick={() => toggle(category.key as OptionalCategoryKey)}
                              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b3574] focus-visible:ring-offset-2 ${
                                checked ? "" : "bg-neutral-300"
                              }`}
                              style={{ backgroundColor: checked ? BRAND : undefined }}
                            >
                              <span
                                className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                                  checked ? "translate-x-6" : "translate-x-1"
                                }`}
                              />
                            </button>
                          </div>
                        )}
                      </div>
                      {isOpen ? (
                        <p className="mt-3 pl-9 text-xs leading-relaxed text-neutral-600">
                          {category.description}
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex flex-col gap-2 border-t border-neutral-200 px-5 py-4">
              <button
                type="button"
                onClick={rejectNonEssential}
                className="w-full rounded-lg px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ backgroundColor: BRAND }}
              >
                Reject All
              </button>
              <button
                type="button"
                onClick={() => save(consent, "custom")}
                className="w-full rounded-lg px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ backgroundColor: BRAND }}
              >
                Confirm My Choices
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

/** Lets any part of the site (e.g. the footer "Cookie Settings" link) reopen the panel. */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}
