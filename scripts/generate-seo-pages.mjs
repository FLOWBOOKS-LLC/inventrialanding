#!/usr/bin/env node
/**
 * Post-build SEO generator.
 *
 * Vite emits a single index.html for the SPA. This script writes a real HTML
 * file for every public route (`dist/<path>/index.html`) with that route's
 * title, description, canonical, Open Graph/Twitter tags and JSON-LD baked in,
 * then generates sitemap.xml and robots.txt from the same route config.
 *
 * Source of truth: src/app/seo/routes.json (also used by the React app).
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const routesFile = path.join(root, "src", "app", "seo", "routes.json");

if (!existsSync(distDir)) {
  console.error("[seo] dist/ not found — run `vite build` first.");
  process.exit(1);
}

const config = JSON.parse(readFileSync(routesFile, "utf8"));
const siteUrl = String(config.siteUrl || "https://flowbooks.org").replace(/\/$/, "");
const entries = Object.entries(config.pages);

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const OG_IMAGE = `${siteUrl}/og-image.png`;

const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "FlowBooks",
  alternateName: "Flowbooks",
  url: siteUrl,
  logo: OG_IMAGE,
  image: OG_IMAGE,
  description:
    "FlowBooks provides accounting software and ERP, NRS e-invoicing, and NDPR data compliance services for organisations in Nigeria.",
  email: "hello@flowbooks.com",
  telephone: "+2348067643479",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Floor 1 African Alliance House, Airport Road",
    addressLocality: "Kano",
    addressRegion: "Kano State",
    addressCountry: "NG",
  },
  sameAs: [
    "https://twitter.com/flowbooksng",
    "https://linkedin.com/company/flowbooksng",
    "https://facebook.com/flowbooksng",
    "https://instagram.com/flowbooksng",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "FlowBooks",
  inLanguage: "en-NG",
  publisher: { "@id": `${siteUrl}/#organization` },
};

function breadcrumbSchema(route) {
  const items = [{ name: "Home", path: "/" }];
  if (route.path !== "/") {
    items.push({ name: String(route.title).split("|")[0].trim(), path: route.path });
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path === "/" ? "/" : item.path}`,
    })),
  };
}

function headBlock(route) {
  const canonical = `${siteUrl}${route.path === "/" ? "/" : route.path}`;
  const robots = route.noindex
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

  const schemas = [organisationSchema, websiteSchema];
  if (route.path !== "/" && !route.noindex) schemas.push(breadcrumbSchema(route));

  const keywords = Array.isArray(route.keywords) && route.keywords.length
    ? `\n    <meta name="keywords" content="${escapeHtml(route.keywords.join(", "))}" />`
    : "";

  return [
    "<!--seo:start-->",
    `    <title>${escapeHtml(route.title)}</title>`,
    `    <meta name="description" content="${escapeHtml(route.description)}" />${keywords}`,
    `    <link rel="canonical" href="${canonical}" />`,
    `    <meta name="robots" content="${robots}" />`,
    `    <meta name="googlebot" content="${robots}" />`,
    `    <meta property="og:type" content="website" />`,
    `    <meta property="og:site_name" content="FlowBooks" />`,
    `    <meta property="og:locale" content="en_NG" />`,
    `    <meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `    <meta property="og:description" content="${escapeHtml(route.description)}" />`,
    `    <meta property="og:url" content="${canonical}" />`,
    `    <meta property="og:image" content="${OG_IMAGE}" />`,
    `    <meta property="og:image:width" content="1200" />`,
    `    <meta property="og:image:height" content="630" />`,
    `    <meta property="og:image:alt" content="FlowBooks — accounting software, ERP and NRS e-invoicing" />`,
    `    <meta name="twitter:card" content="summary_large_image" />`,
    `    <meta name="twitter:site" content="@flowbooksng" />`,
    `    <meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `    <meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `    <meta name="twitter:image" content="${OG_IMAGE}" />`,
    `    <script type="application/ld+json" id="seo-jsonld">`,
    `      ${JSON.stringify(schemas.length === 1 ? schemas[0] : schemas, null, 2).split("\n").join("\n      ")}`,
    `    </script>`,
    "    <!--seo:end-->",
  ].join("\n");
}

const template = readFileSync(path.join(distDir, "index.html"), "utf8");

const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;
if (!SEO_BLOCK.test(template)) {
  console.error("[seo] Could not find <!--seo:start--> / <!--seo:end--> markers in dist/index.html");
  process.exit(1);
}

const verification = (process.env.VITE_GOOGLE_SITE_VERIFICATION || "").trim();
const gscTag = verification
  ? `<meta name="google-site-verification" content="${escapeHtml(verification)}" />`
  : "";

function renderDocument(route) {
  let html = template.replace(SEO_BLOCK, headBlock(route));
  html = html.replace("<!--gsc-->", gscTag);
  return html;
}

let written = 0;

for (const [key, route] of entries) {
  const html = renderDocument(route);
  if (key === "not-found") {
    // Served by nginx for unknown URLs — not a public route of its own
    writeFileSync(path.join(distDir, "404.html"), html);
    written += 1;
    continue;
  }
  if (route.path === "/" || !route.path) {
    writeFileSync(path.join(distDir, "index.html"), html);
  } else {
    const dir = path.join(distDir, route.path.replace(/^\//, ""));
    mkdirSync(dir, { recursive: true });
    writeFileSync(path.join(dir, "index.html"), html);
  }
  written += 1;
}

// sitemap.xml — indexable routes only
const indexable = entries
  .map(([, route]) => route)
  .filter((route) => !route.noindex && route.path !== "/404");

const today = new Date().toISOString().slice(0, 10);
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...indexable.map((route) => {
    const loc = `${siteUrl}${route.path === "/" ? "/" : route.path}`;
    const parts = [`    <loc>${loc}</loc>`, `    <lastmod>${today}</lastmod>`];
    if (route.changefreq) parts.push(`    <changefreq>${route.changefreq}</changefreq>`);
    if (route.priority) parts.push(`    <priority>${route.priority}</priority>`);
    return ["  <url>", ...parts, "  </url>"].join("\n");
  }),
  "</urlset>",
  "",
].join("\n");
writeFileSync(path.join(distDir, "sitemap.xml"), sitemap);

// robots.txt
const robots = [
  "User-agent: *",
  "Allow: /",
  "",
  "# Private / non-indexable areas",
  "Disallow: /register",
  "Disallow: /register-partner",
  "Disallow: /api/",
  "Disallow: /*?*utm_",
  "",
  `Sitemap: ${siteUrl}/sitemap.xml`,
  "",
].join("\n");
writeFileSync(path.join(distDir, "robots.txt"), robots);

console.log(
  `[seo] wrote ${written} HTML documents, sitemap.xml (${indexable.length} URLs) and robots.txt${
    verification ? " + Google site verification" : ""
  }`,
);
