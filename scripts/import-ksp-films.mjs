import { readFile, writeFile, rename, mkdir, copyFile, open, unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { youtubeId } from '../app/video-source.ts';
import { parseIdentity, mergeVideos, collaborators } from '../app/film-catalogue.mjs';

const root = new URL('../', import.meta.url);
const cataloguePath = new URL('data/ksp-films.json', root);
const work = new URL('work/films-import/', root);
const args = process.argv.slice(2);
const refresh = args.includes('--refresh');
const force = args.includes('--force');
const dryRun = args.includes('--dry-run');
const fileIndex = args.indexOf('--file');
const inputs = args.filter((v,i) => !v.startsWith('--') && (fileIndex < 0 || i !== fileIndex+1));
await mkdir(work, {recursive:true});
let lock;
try {
  lock = await open(new URL('import.lock', work), 'wx');
} catch { throw new Error('Another import may be running. Check work/films-import/import.lock before retrying.'); }
try {
  const original = await readFile(cataloguePath, 'utf8');
  const catalogue = JSON.parse(original);
  let supplied = [];
  if (fileIndex >= 0) {
    const content = await readFile(args[fileIndex+1], 'utf8');
    supplied = content.trim().startsWith('[') ? JSON.parse(content) : content.split(/\s+/).filter(Boolean);
  }
  supplied.push(...inputs);
  if (refresh) supplied.push(...catalogue.videos.map(v => ({id:v.id, title:v.title, artist:v.artist})));
  if (!supplied.length) throw new Error('Supply YouTube links, --file batch.txt (or JSON), or --refresh.');
  const requested = new Map();
  for (const input of supplied) {
    const item = typeof input === 'string' ? {url:input} : input;
    const id = youtubeId(item.id || item.url || '');
    if (!id) throw new Error('Invalid YouTube link in batch; no catalogue changes made.');
    requested.set(id, {...requested.get(id), ...item, id});
  }
  // Local env file is ignored by Git; the key never enters a URL, output, or catalogue.
  if (!process.env.YOUTUBE_API_KEY) {
    try { process.loadEnvFile(fileURLToPath(new URL('.env.local', root))); } catch { /* Optional. */ }
  }
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) throw new Error('YOUTUBE_API_KEY is missing. Add it to ignored .env.local or the command environment. No catalogue changes made.');
  let cache = {};
  const cachePath = new URL('youtube-cache.json', work);
  try { cache = JSON.parse(await readFile(cachePath,'utf8')); } catch { /* First import. */ }
  const now = new Date().toISOString();
  const ids = [...requested.keys()];
  const stale = ids.filter(id => force || !cache[id] || !Number.isFinite(Date.parse(cache[id].metadataCheckedAt)) || Date.now()-Date.parse(cache[id].metadataCheckedAt) >= 86400000);
  const unavailable = [];
  for (let offset=0; offset<stale.length; offset+=50) {
    const batch = stale.slice(offset,offset+50);
    const url = new URL('https://www.googleapis.com/youtube/v3/videos');
    url.searchParams.set('part','snippet,statistics,status');
    url.searchParams.set('id',batch.join(','));
    const response = await fetch(url, {headers:{'X-Goog-Api-Key':key}, signal:AbortSignal.timeout(20000)});
    if (!response.ok) throw new Error(`YouTube API returned HTTP ${response.status}; no catalogue changes made.`);
    const body = await response.json();
    for (const item of body.items || []) {
      if (!batch.includes(item.id) || !item.snippet?.publishedAt || !Number.isFinite(Date.parse(item.snippet.publishedAt))) throw new Error('Invalid API metadata; no catalogue changes made.');
      const thumb = item.snippet.thumbnails;
      cache[item.id] = {id:item.id,youtubeTitle:item.snippet.title,publishedAt:item.snippet.publishedAt,
        viewCount:item.statistics?.viewCount != null ? Number(item.statistics.viewCount) : null,
        thumbnail:thumb?.high?.url || thumb?.medium?.url || `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`,
        embeddable:item.status?.embeddable ?? null, metadataSource:'youtube-data-api-v3',metadataCheckedAt:now};
    }
    for (const id of batch) if (!(body.items || []).some(item=>item.id===id)) unavailable.push(id);
  }
  if (unavailable.length) throw new Error(`YouTube did not return: ${unavailable.join(', ')}. Existing catalogue preserved; resolve unavailable IDs before retrying.`);
  const incoming = ids.map(id => {
    const item = requested.get(id), metadata = cache[id];
    const identity = parseIdentity(metadata.youtubeTitle);
    return {...metadata, artist:item.artist || identity.artist, title:item.title || identity.title};
  });
  const next = {...catalogue,videos:mergeVideos(catalogue.videos,incoming)};
  next.artists = collaborators(next);
  const summary = {requested:ids.length,added:next.videos.length-catalogue.videos.length,total:next.videos.length,
    apiRequests:Math.ceil(stale.length/50),needsArtistReview:incoming.filter(v=>!v.artist).map(v=>v.id),
    embeddingRestricted:incoming.filter(v=>v.embeddable===false).map(v=>v.id),dryRun};
  if (!dryRun) {
    await copyFile(cataloguePath,new URL(`catalogue-${Date.now()}.json`,work));
    const temp = new URL('data/.ksp-films.tmp.json',root);
    await writeFile(temp,JSON.stringify(next,null,2)+'\n');
    // Atomic replace only after every API batch and validation succeeded.
    await rename(temp,cataloguePath);
    await writeFile(cachePath,JSON.stringify(cache,null,2)+'\n');
  }
  console.log(JSON.stringify(summary,null,2));
} finally {
  await lock.close();
  await unlink(new URL('import.lock',work));
}
