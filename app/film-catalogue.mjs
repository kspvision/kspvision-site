/** Pure catalogue rules shared by the site and the local importer. */
export function cleanTitle(value = '') {
  return value.replace(/\s*[[(](?:official\b|clip\b|music video\b|vid[eé]o\b|4k\b|hd\b)[^\])]*[\])]/gi, '').trim();
}
export function parseIdentity(raw = '') {
  const parts = cleanTitle(raw).split(/\s+[—–-]\s+/, 2);
  return parts.length === 2 ? { artist: parts[0].trim(), title: parts[1].trim() } : { artist: '', title: cleanTitle(raw) };
}
export function artistNames(video) {
  const featured = [...video.title.matchAll(/\b(?:feat\.?|ft\.?)\s+([^()[\]]+)/gi)].map(m => m[1]);
  return [video.artist, ...featured].flatMap(name => name.split(/\s+(?:x|×|&|feat\.?|ft\.?)\s+/i))
    .map(name => name.replace(/[()[\]]/g, '').trim()).filter(name => name && !/^(official(?: video)?|music video|clip officiel|4k|hd)$/i.test(name));
}
export function collaborators(catalogue) {
  const names = new Map();
  for (const name of [...catalogue.artists, ...catalogue.videos.flatMap(artistNames)]) {
    const display = name.trim();
    if (display && !names.has(display.toLocaleLowerCase('en'))) names.set(display.toLocaleLowerCase('en'), display);
  }
  return [...names.values()];
}
export function sections(videos) {
  const archive = [...videos].sort((a,b) => (Date.parse(b.publishedAt) || 0) - (Date.parse(a.publishedAt) || 0) || a.id.localeCompare(b.id));
  const dated = archive.filter(v => v.publishedAt && Number.isFinite(Date.parse(v.publishedAt)));
  return {
    archive,
    latest: dated.slice(0,10),
    era: dated.filter(v => Number(v.publishedAt.slice(0,4)) >= 2022),
    earlier: dated.filter(v => Number(v.publishedAt.slice(0,4)) <= 2021),
    mostWatched: archive.filter(v => Number.isSafeInteger(v.viewCount) && v.viewCount >= 0)
      .sort((a,b) => b.viewCount-a.viewCount || a.id.localeCompare(b.id)).slice(0,3),
  };
}
export function viewLabel(count) {
  return Number.isSafeInteger(count) && count >= 0 ? new Intl.NumberFormat('en', {notation:'compact', maximumFractionDigits:1}).format(count) : '';
}
/** Preserve editorial identities, every existing video, and unknown fields. */
export function mergeVideos(existing, incoming) {
  const merged = new Map(existing.map(v => [v.id, {...v}]));
  for (const item of incoming) {
    if (!/^[\w-]{11}$/.test(item.id)) throw new Error('Invalid video ID');
    const previous = merged.get(item.id);
    merged.set(item.id, previous ? {...previous, ...item, artist: previous.artist || item.artist, title: previous.title || item.title} : {...item});
  }
  return [...merged.values()];
}
