import assert from 'node:assert/strict';
import test from 'node:test';
import {readFile} from 'node:fs/promises';
import {sections, collaborators, mergeVideos, parseIdentity, artistNames} from '../app/film-catalogue.mjs';
import {videoSource} from '../app/video-source.ts';
const catalogue = JSON.parse(await readFile(new URL('../data/ksp-films.json',import.meta.url)));
const batch = JSON.parse(await readFile(new URL('../data/ksp-films-batch-2026-09.json',import.meta.url)));

test('all original and batch IDs are preserved once, dated, and supported by the player', async()=>{
  assert.equal(catalogue.videos.length,72);
  assert.equal(new Set(catalogue.videos.map(v=>v.id)).size,72);
  for(const item of batch) assert.ok(catalogue.videos.some(v=>v.id===item.id),item.id);
  for(const v of catalogue.videos) {
    assert.ok(Number.isFinite(Date.parse(v.publishedAt)),v.id);
    assert.ok(Number.isSafeInteger(v.viewCount) && v.viewCount>=0,v.id);
    assert.equal(videoSource({sourceType:'youtube',source:v.id,title:v.title}).external,`https://www.youtube.com/watch?v=${v.id}`);
  }
});
test('sections use actual dates across 2021/2022 and include entire archive',()=>{
  const groups=sections(catalogue.videos);
  assert.equal(groups.latest.length,10);
  assert.equal(groups.archive.length,72);
  assert.equal(groups.era.length+groups.earlier.length,72);
  for(let i=1;i<groups.archive.length;i++) assert.ok(Date.parse(groups.archive[i-1].publishedAt)>=Date.parse(groups.archive[i].publishedAt));
  assert.deepEqual(groups.latest,groups.archive.slice(0,10));
  assert.ok(groups.era.every(v=>+v.publishedAt.slice(0,4)>=2022));
  assert.ok(groups.earlier.every(v=>+v.publishedAt.slice(0,4)<=2021));
  const boundary=sections([{id:'old',publishedAt:'2021-12-31T23:59:59Z'},{id:'new',publishedAt:'2022-01-01T00:00:00Z'},{id:'unknown',publishedAt:null}]);
  assert.deepEqual(boundary.era.map(v=>v.id),['new']);
  assert.deepEqual(boundary.earlier.map(v=>v.id),['old']);
  assert.equal(boundary.archive.length,3);
});
test('Most Watched is ranked by numeric views, excludes unknowns, includes zero',()=>{
  assert.deepEqual(sections([{id:'a',viewCount:1},{id:'b',viewCount:900},{id:'c',viewCount:0},{id:'d',viewCount:null}]).mostWatched.map(v=>v.id),['b','a','c']);
});
test('imports are additive, deduplicate, and preserve editorial identities',()=>{
  const id='lahM68ct_nY';
  const merged=mergeVideos([{id,artist:'Gabo & LKS',title:'Cartier',note:'preserve'}],[{id,artist:'Uploader',title:'Cartier Official 4K',viewCount:42},{id:'aWgoJN5tQvo',artist:'LKS',title:'Yencli'}]);
  assert.equal(merged.length,2);
  assert.equal(merged[0].artist,'Gabo & LKS');
  assert.equal(merged[0].title,'Cartier');
  assert.equal(merged[0].note,'preserve');
  assert.equal(merged[0].viewCount,42);
});
test('collaborators preserve names, deduplicate case, and split genuine collaborations',()=>{
  const names=collaborators(catalogue);
  for(const expected of ['Gabo','LKS','Doni Na Ma','Cupidon','Yung Duce','Chloe KDL','Silow Capone']) assert.ok(names.some(n=>n.toLowerCase()===expected.toLowerCase()),expected);
  assert.equal(new Set(names.map(n=>n.toLowerCase())).size,names.length);
  assert.deepEqual(artistNames({artist:'Gabo & LKS',title:'Droite gauche (feat. Doni Na Ma)'}),['Gabo','LKS','Doni Na Ma']);
  assert.deepEqual(parseIdentity('LKS - Yencli (Official Video)'),{artist:'LKS',title:'Yencli'});
  assert.deepEqual(parseIdentity('Unclear title'),{artist:'',title:'Unclear title'});
});
