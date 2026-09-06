export type KSPVideo = {
  sourceType: "youtube" | "hosted";
  source: string;
  title: string;
  artist?: string;
  poster?: string;
  captions?: string;
  captionsLanguage?: string;
};

/** Accept existing IDs and standard YouTube URLs without requesting metadata. */
export function youtubeId(source: string): string | null {
  if (/^[\w-]{11}$/.test(source)) return source;
  try {
    const url = new URL(source);
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    const host = url.hostname.toLowerCase();
    let id: string | null = null;
    if (host === "youtu.be") id = url.pathname.split("/")[1];
    else if (["youtube.com", "www.youtube.com", "m.youtube.com", "youtube-nocookie.com", "www.youtube-nocookie.com"].includes(host)) {
      const parts = url.pathname.split("/");
      id = url.pathname === "/watch" ? url.searchParams.get("v") :
        ["embed", "shorts", "live"].includes(parts[1]) ? parts[2] : null;
    }
    return id && /^[\w-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

export function videoSource(video: KSPVideo): { playback: string; external: string } | null {
  if (video.sourceType === "youtube") {
    const id = youtubeId(video.source);
    return id ? {
      playback: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0`,
      external: `https://www.youtube.com/watch?v=${id}`,
    } : null;
  }
  // Root-relative existing files or secure hosted media only.
  if (/^\/(?!\/)/.test(video.source) && !video.source.includes("\\")) {
    return { playback: video.source, external: video.source };
  }
  try {
    const url = new URL(video.source);
    if (url.protocol === "https:" && !url.username && !url.password) {
      return { playback: url.href, external: url.href };
    }
  } catch { /* Missing or unusable sources retain their original card behavior. */ }
  return null;
}
