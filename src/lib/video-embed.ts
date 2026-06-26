function parseYoutubeStart(t: string | null): number | null {
  if (!t) return null;
  if (/^\d+$/.test(t)) return parseInt(t, 10);
  if (/^\d+s$/.test(t)) return parseInt(t, 10);
  const match = t.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/);
  if (!match) return null;
  const total = parseInt(match[1] || "0", 10) * 3600 + parseInt(match[2] || "0", 10) * 60 + parseInt(match[3] || "0", 10);
  return total > 0 ? total : null;
}

function host(url: URL) {
  return url.hostname.replace(/^www\./, "");
}

/** Convert YouTube/Vimeo watch or share URLs into iframe-safe embed URLs. */
export function toVideoEmbedUrl(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  try {
    const u = new URL(trimmed);
    const h = host(u);

    if (h === "youtube.com" || h === "m.youtube.com") {
      if (u.pathname.startsWith("/embed/")) {
        const id = u.pathname.split("/")[2];
        if (!id) return null;
        const start = parseYoutubeStart(u.searchParams.get("start") ?? u.searchParams.get("t"));
        return `https://www.youtube.com/embed/${id}${start ? `?start=${start}` : ""}`;
      }
      if (u.pathname === "/watch") {
        const id = u.searchParams.get("v");
        if (!id) return null;
        const start = parseYoutubeStart(u.searchParams.get("t") ?? u.searchParams.get("start"));
        return `https://www.youtube.com/embed/${id}${start ? `?start=${start}` : ""}`;
      }
      if (u.pathname.startsWith("/shorts/")) {
        const id = u.pathname.split("/")[2];
        if (!id) return null;
        return `https://www.youtube.com/embed/${id}`;
      }
    }

    if (h === "youtu.be") {
      const id = u.pathname.slice(1).split("/")[0];
      if (!id) return null;
      const start = parseYoutubeStart(u.searchParams.get("t") ?? u.searchParams.get("start"));
      return `https://www.youtube.com/embed/${id}${start ? `?start=${start}` : ""}`;
    }

    if (h === "vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean)[0];
      if (!id || !/^\d+$/.test(id)) return null;
      return `https://player.vimeo.com/video/${id}`;
    }

    if (h === "player.vimeo.com" && u.pathname.startsWith("/video/")) {
      return trimmed;
    }

    return trimmed;
  } catch {
    return null;
  }
}
