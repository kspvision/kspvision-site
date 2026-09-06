import assert from 'node:assert/strict';
import test from 'node:test';
import { youtubeId, videoSource } from '../app/video-source.ts';

test('recognizes IDs and official watch, short, embed and live URLs', () => {
  const id = '_pGbFSSgh_o';
  for (const input of [id, `https://www.youtube.com/watch?v=${id}&t=10`, `https://youtu.be/${id}?si=x`, `https://m.youtube.com/shorts/${id}`, `https://www.youtube-nocookie.com/embed/${id}`, `https://youtube.com/live/${id}`]) assert.equal(youtubeId(input), id, input);
});

test('rejects malformed or misleading YouTube sources', () => {
  for (const input of ['', 'bad-id', 'https://youtube.com.evil.test/watch?v=_pGbFSSgh_o', 'https://evil.test/embed/_pGbFSSgh_o', 'javascript:_pGbFSSgh_o', 'https://youtube.com/watch?v=too-short']) assert.equal(youtubeId(input), null, input);
});

test('builds privacy-enhanced playback and original-source fallback without metadata', () => {
  const result = videoSource({sourceType:'youtube', source:'_pGbFSSgh_o', title:'Existing film'});
  assert.equal(result.playback, 'https://www.youtube-nocookie.com/embed/_pGbFSSgh_o?autoplay=1&playsinline=1&rel=0');
  assert.equal(result.external, 'https://www.youtube.com/watch?v=_pGbFSSgh_o');
});

test('supports local and secure hosted media but rejects unsafe sources', () => {
  for (const source of ['/home-reel-mobile.mp4', 'https://example.com/existing.mp4?version=2']) assert.ok(videoSource({sourceType:'hosted', source, title:'Existing reel'}));
  for (const source of ['javascript:alert(1)', '//evil.test/file.mp4', '/\\evil.test/file.mp4', 'https://user:password@example.com/file.mp4']) assert.equal(videoSource({sourceType:'hosted', source, title:'Invalid'}), null);
});
