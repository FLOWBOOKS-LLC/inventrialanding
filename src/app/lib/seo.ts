import routesJson from "@/app/seo/routes.json";

/**
 * SEO metadata for every public route.
 * The same JSON file is consumed by `scripts/generate-seo-pages.mjs`, which bakes
 * per-route <head> tags into static HTML at build time.
 */

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  priority?: string;
  changefreq?: string;
  noindex?: boolean;
  landing?: boolean;
}

export type PageKey = keyof typeof routesJson.pages;

export const SITE_URL = routesJson.siteUrl.replace(/\/$/, "");
export const routes = routesJson.pages as Record<PageKey, RouteMeta>;
export const pageKeys = Object.keys(routes) as PageKey[];

export const SITE_NAME = "FlowBooks";
export const OG_IMAGE_PATH = "/og-image.png";
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const TWITTER_HANDLE = "@flowbooksng";

/** Normalises a pathname: ensures a leading slash and removes trailing slashes. */
export function normalizePath(input: string): string {
  let path = (input || "/").split("?")[0].split("#")[0];
  if (!path.startsWith("/")) path = `/${path}`;
  path = path.replace(/\/{2,}/g, "/");
  if (path.length > 1) path = path.replace(/\/+$/, "");
  return path || "/";
}

export function pathForPage(page: PageKey): string {
  return routes[page]?.path ?? "/";
}

export function pageFromPath(input: string): PageKey | null {
  const path = normalizePath(input);
  return pageKeys.find((key) => routes[key].path === path) ?? null;
}

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${normalizePath(path)}`;
}

/** Absolute canonical URL for a page. */
export function canonicalFor(page: PageKey): string {
  return absoluteUrl(pathForPage(page));
}

/** Public routes that should appear in the sitemap. */
export function indexablePages(): PageKey[] {
  return pageKeys.filter((key) => !routes[key].noindex);
}
