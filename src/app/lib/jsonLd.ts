import { serviceCatalog } from "@/app/constants/servicePlans";
import { FAQS } from "@/app/constants/faqs";
import { landingPages } from "@/app/constants/seoLandingPages";
import { SITE_URL, absoluteUrl, pageKeys, pathForPage, routes, type PageKey } from "@/app/lib/seo";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const SOCIAL_PROFILES = [
  "https://twitter.com/flowbooksng",
  "https://linkedin.com/company/flowbooksng",
  "https://facebook.com/flowbooksng",
  "https://instagram.com/flowbooksng",
];

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "FlowBooks",
    alternateName: "Flowbooks",
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.png`,
    image: `${SITE_URL}/og-image.png`,
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
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "sales@flowbooks.com",
        telephone: "+2348067643479",
        areaServed: "NG",
        availableLanguage: ["en"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@flowbooks.com",
        areaServed: "NG",
        availableLanguage: ["en"],
      },
    ],
    sameAs: SOCIAL_PROFILES,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: "FlowBooks",
    inLanguage: "en-NG",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function breadcrumbJsonLd(page: PageKey) {
  const items = [{ name: "Home", path: "/" }];
  if (page !== "home") {
    items.push({ name: routes[page].title.split("|")[0].trim(), path: pathForPage(page) });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Product schema for the accounting/ERP plan page, using published plan pricing only. */
export function softwareApplicationJsonLd(page: PageKey) {
  const plans = serviceCatalog.accounting.plans
    .map((plan) => Number(String(plan.priceDisplay ?? "").replace(/,/g, "")))
    .filter((value) => Number.isFinite(value) && value > 0);

  const lowPrice = plans.length ? Math.min(...plans) : undefined;
  const highPrice = plans.length ? Math.max(...plans) : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "FlowBooks",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Accounting software / ERP",
    operatingSystem: "Web",
    url: absoluteUrl(pathForPage(page)),
    description:
      "FlowBooks accounting software and ERP covers bookkeeping, invoicing, inventory, bank reconciliation, and financial reporting.",
    publisher: { "@id": ORGANIZATION_ID },
    offers:
      lowPrice !== undefined
        ? {
            "@type": "AggregateOffer",
            priceCurrency: "NGN",
            lowPrice,
            highPrice,
            offerCount: plans.length,
          }
        : undefined,
  };
}

/** Service schema describing the three connected FlowBooks offers. */
export function servicesJsonLd() {
  return Object.values(serviceCatalog).map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.eyebrow,
    description: service.subtitle,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: { "@type": "Country", name: "Nigeria" },
    url: absoluteUrl(routes.services.path),
  }));
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function faqsPageJsonLd() {
  return faqJsonLd(FAQS);
}

export function notFoundJsonLd(page: PageKey) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: routes[page].title,
    url: absoluteUrl(pathForPage(page)),
    isPartOf: { "@id": WEBSITE_ID },
  };
}

/** All structured data that should be present on a given page. */
export function jsonLdForPage(page: PageKey): Record<string, unknown>[] {
  const blocks: Record<string, unknown>[] = [organizationJsonLd(), websiteJsonLd()];

  if (page !== "home" && !routes[page].noindex) {
    blocks.push(breadcrumbJsonLd(page));
  }

  if (page === "accounting" || page === "accounting-software-nigeria") {
    blocks.push(softwareApplicationJsonLd(page));
  }

  if (page === "services") {
    blocks.push(...servicesJsonLd());
  }

  if (page === "faqs") {
    blocks.push(faqsPageJsonLd());
  }

  const landing = landingPages[page];
  if (landing) {
    blocks.push(faqJsonLd(landing.faqs));
  }

  if (page === "not-found" || routes[page].noindex) {
    blocks.push(notFoundJsonLd(page));
  }

  // Guard against unknown page keys
  return pageKeys.includes(page) ? blocks : blocks.slice(0, 2);
}
