import { normalizePath, pageFromPath, pathForPage, type PageKey } from "@/app/lib/seo";

/**
 * Minimal History-API router.
 *
 * The marketing site historically switched pages with React state only, which
 * left every page on "/" and made the subpages uncrawlable. This router gives
 * each page a real, stable URL without changing how components navigate
 * (they still call `onNavigate(page)`).
 */

export const DEFAULT_PAGE: PageKey = "home";

export function pageFromLocation(location: Pick<Location, "pathname"> = window.location): PageKey {
  return pageFromPath(location.pathname) ?? "not-found";
}

export function pushPage(page: PageKey, options: { replace?: boolean } = {}) {
  const path = pathForPage(page);
  if (typeof window === "undefined") return;
  if (normalizePath(window.location.pathname) === normalizePath(path)) return;

  const state = { page };
  if (options.replace) {
    window.history.replaceState(state, "", path);
  } else {
    window.history.pushState(state, "", path);
  }
}
