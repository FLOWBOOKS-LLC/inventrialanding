const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase env vars missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local");
}

const defaultHeaders: HeadersInit = {
  apikey: supabaseAnonKey ?? "",
  Authorization: `Bearer ${supabaseAnonKey ?? ""}`,
  "Content-Type": "application/json",
  Prefer: "return=representation"
};

export async function supabaseRequest<T>(
  path: string,
  init: RequestInit & { signal?: AbortSignal } = {}
): Promise<T> {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase is not configured.");
  }

  const res = await fetch(`${supabaseUrl}${path}`, {
    ...init,
    headers: {
      ...defaultHeaders,
      ...(init.headers || {})
    }
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || `Supabase error ${res.status}`);
  }

  return res.json();
}

export { supabaseUrl, supabaseAnonKey };
