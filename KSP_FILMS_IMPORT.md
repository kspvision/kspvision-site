# KSP Films imports

The authoritative catalogue is `data/ksp-films.json`. Never replace it with a batch file. Importing merges by YouTube ID, preserves editorial artist/title values and all existing records, updates metadata, and automatically extends the collaborator list. Page sections, newest ten, numeric Most Watched rankings and display years derive from this one catalogue.

## One-time credential setup

Enable **YouTube Data API v3** in a Google Cloud project. Create a key restricted to that API. Store `YOUTUBE_API_KEY=your-key` in the repository's ignored `.env.local`, or provide it through the local command environment. Do not use a `NEXT_PUBLIC_` variable. Never paste the real key into documentation, source files, a batch, or Git. The importer uses the official `videos.list` endpoint with `snippet,statistics,status`, at most 50 IDs per request. The credential is passed in the Google API request header, never sent to the website visitor.

## Add videos

Run `npm run films:import -- "https://www.youtube.com/watch?v=VIDEO_ID" "https://youtu.be/ANOTHER_ID"`.

For many links, put one per line in a text file, then run `npm run films:import -- --file path/to/batch.txt`.

For ambiguous artist/title parsing, use JSON with objects like `{"url":"https://youtu.be/VIDEO_ID","artist":"Artist & Collaborator","title":"Film title"}`. The September request is retained as `data/ksp-films-batch-2026-09.json`. A title without a clear artist separator is retained, with its ID listed for artist review; the uploader is not assumed to be the performer.

Run `npm run films:refresh` before reviewing and manually publishing an update. This refreshes the entire catalogue using the same merge workflow. Metadata is cached for 24 hours in ignored `work/films-import/youtube-cache.json`. Use `--force` to bypass that cache or `--dry-run` to preview a batch without changing files.

Imports have a single-writer lock and validate every API batch before an atomic catalogue replacement. A timestamped backup of the previous catalogue is saved under `work/films-import/`. Missing credentials, invalid IDs, API failures or unavailable videos leave the catalogue untouched. An interrupted process may leave `import.lock`; check no importer is running before removing that lock. This workflow does not commit, push, or deploy.

## Deployment architecture

The existing app runs on Vinext/Cloudflare Workers. The website renders a metadata snapshot and makes no visitor-triggered YouTube API calls; it does not depend on a key or a metadata outage to render. Import/refresh is a local server-side Node workflow, not a production scraper. **Counts update when the refresh command is run and the reviewed snapshot is manually published, not continuously in a visitor's browser.** No public mutation endpoint or new cloud database is required. The present deployment does not need a YouTube runtime secret because the importer owns refreshes.

## September 5 snapshot

All 41 original IDs and 31 requested IDs are present once (72 total). Exact publication timestamps and numeric views were obtained from YouTube's public page metadata in a one-time ingestion, checked against the requested video ID. `metadataSource`, `metadataCheckedAt`, and `youtubeTitle` record provenance. This temporary ingestion is not the permanent importer. Subsequent official-API refreshes replace the snapshot metadata. No release dates or view counts were estimated.

Unknown dates are excluded from dated chapters and Latest Work but retained in Archive. Unknown views are excluded from Most Watched. API embedding restrictions are reported; the player retains a YouTube fallback because regional, account and copyright restrictions can still prevent playback.

## Wedding photos

Add a `[path, factual alt text]` item to `data/wedding-gallery.ts`. The responsive gallery uses equal 4:5 tiles and the same lightbox automatically. No per-photo CSS is needed.

References: [YouTube videos.list](https://developers.google.com/youtube/v3/docs/videos/list), [YouTube player parameters](https://developers.google.com/youtube/player_parameters).
