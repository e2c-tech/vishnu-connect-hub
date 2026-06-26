const FALLBACK_ORIGIN = "https://vishnu-connect-hub.lovable.app";

export function getSiteOrigin(): string {
  const fromEnv =
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_URL) ||
    (typeof process !== "undefined" && (process.env.SITE_URL || process.env.VITE_SITE_URL));
  if (fromEnv) return String(fromEnv).replace(/\/$/, "");
  if (typeof window !== "undefined" && window.location?.origin) return window.location.origin;
  return FALLBACK_ORIGIN;
}

/** Prefer stable public Supabase URLs over signed links for social crawlers. */
export function normalizeMediaUrl(url: string): string {
  const trimmed = url.trim();
  const signMatch = trimmed.match(
    /^(https:\/\/[^/]+\/storage\/v1\/object\/)sign(\/media\/[^?]+)(?:\?.*)?$/i,
  );
  if (signMatch) return `${signMatch[1]}public${signMatch[2]}`;
  return trimmed;
}

export function toAbsoluteUrl(url: string, origin = getSiteOrigin()): string {
  if (!url?.trim()) return `${origin}/og-default.jpg`;
  const normalized = normalizeMediaUrl(url.trim());
  if (/^https?:\/\//i.test(normalized)) return normalized;
  return `${origin}${normalized.startsWith("/") ? normalized : `/${normalized}`}`;
}

export function stripHtml(value: string): string {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

type ShareMetaInput = {
  pageTitle: string;
  title: string;
  description: string;
  pathname: string;
  image?: string;
  type?: "article" | "website";
};

export function buildShareMeta({
  pageTitle,
  title,
  description,
  pathname,
  image,
  type = "article",
}: ShareMetaInput) {
  const origin = getSiteOrigin();
  const canonicalPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const url = `${origin}${canonicalPath}`;
  const desc = description.trim().slice(0, 300);
  const imageUrl = toAbsoluteUrl(image ?? "", origin);

  return {
    meta: [
      { title: pageTitle },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:type", content: type },
      { property: "og:url", content: url },
      { property: "og:site_name", content: "Sri Vishnu Consol Pvt Ltd" },
      { property: "og:image", content: imageUrl },
      { property: "og:image:secure_url", content: imageUrl },
      { property: "og:image:alt", content: title },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: desc },
      { name: "twitter:image", content: imageUrl },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
