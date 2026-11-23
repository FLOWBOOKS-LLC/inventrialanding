import { useEffect } from "react";
import {
  OG_IMAGE_HEIGHT,
  OG_IMAGE_PATH,
  OG_IMAGE_WIDTH,
  SITE_NAME,
  SITE_URL,
  TWITTER_HANDLE,
  absoluteUrl,
  canonicalFor,
  pathForPage,
  routes,
  type PageKey,
} from "@/app/lib/seo";
import { jsonLdForPage } from "@/app/lib/jsonLd";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

function upsertJsonLd(blocks: Record<string, unknown>[]) {
  let element = document.getElementById("seo-jsonld") as HTMLScriptElement | null;
  if (!element) {
    element = document.createElement("script");
    element.id = "seo-jsonld";
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(blocks.length === 1 ? blocks[0] : blocks);
}

/** Applies title, description, canonical, social and structured-data tags for a route. */
export function applySeo(page: PageKey) {
  const meta = routes[page];
  if (!meta) return;

  const canonical = canonicalFor(page);
  const image = `${SITE_URL}${OG_IMAGE_PATH}`;
  const robots = meta.noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  document.title = meta.title;

  upsertMeta("name", "description", meta.description);
  if (meta.keywords?.length) upsertMeta("name", "keywords", meta.keywords.join(", "));
  upsertMeta("name", "robots", robots);
  upsertMeta("name", "googlebot", robots);

  upsertLink("canonical", canonical);

  upsertMeta("property", "og:type", "website");
  upsertMeta("property", "og:site_name", SITE_NAME);
  upsertMeta("property", "og:locale", "en_NG");
  upsertMeta("property", "og:title", meta.title);
  upsertMeta("property", "og:description", meta.description);
  upsertMeta("property", "og:url", canonical);
  upsertMeta("property", "og:image", image);
  upsertMeta("property", "og:image:width", String(OG_IMAGE_WIDTH));
  upsertMeta("property", "og:image:height", String(OG_IMAGE_HEIGHT));
  upsertMeta("property", "og:image:alt", `${SITE_NAME} — accounting software, ERP and NRS e-invoicing`);

  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:site", TWITTER_HANDLE);
  upsertMeta("name", "twitter:title", meta.title);
  upsertMeta("name", "twitter:description", meta.description);
  upsertMeta("name", "twitter:image", image);

  upsertJsonLd(jsonLdForPage(page));
}

/** Keeps <head> in sync with the active route. */
export function useSeo(page: PageKey) {
  useEffect(() => {
    applySeo(page);
  }, [page]);
}

export { absoluteUrl, pathForPage };
