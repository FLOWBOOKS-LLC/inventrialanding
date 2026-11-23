/**
 * Marketing site CMS — reads/writes via FlowBooks API (proxied /api/site).
 */

async function siteRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }
  const res = await fetch(`/api/site${path}`, {
    ...options,
    headers,
    cache: "no-store",
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message =
      data && typeof data === "object" && "message" in data
        ? String((data as { message: string }).message)
        : `Request failed (${res.status})`;
    throw new Error(message);
  }
  return data as T;
}

function listFrom<T>(payload: { data?: T[]; items?: T[] } | T[]): T[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
}

export interface SiteSuccessStory {
  id: string;
  company: string;
  industry: string;
  logo: string;
  image: string;
  challenge: string;
  result: string;
}

export interface SiteBlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
}

export async function fetchSiteStories(): Promise<SiteSuccessStory[]> {
  const payload = await siteRequest<{ data?: SiteSuccessStory[]; items?: SiteSuccessStory[] }>(
    "/stories",
  );
  return listFrom(payload);
}

export async function fetchSiteBlogPosts(): Promise<SiteBlogPost[]> {
  const payload = await siteRequest<{ data?: SiteBlogPost[]; items?: SiteBlogPost[] }>(
    "/blog",
  );
  return listFrom(payload).map((p) => ({
    ...p,
    readTime: p.readTime || (p as { read_time?: string }).read_time || "5 min read",
  }));
}

export async function createSiteContact(input: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
}) {
  return siteRequest("/contacts", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
