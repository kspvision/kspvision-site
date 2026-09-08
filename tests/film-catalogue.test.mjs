import assert from 'node:assert/strict';
import test from 'node:test';
import {readFile} from 'node:fs/promises';
import {sections, collaborators, mergeVideos, parseIdentity, artistNames, filterArchive} from '../app/film-catalogue.mjs';
import {videoSource} from '../app/video-source.ts';
const catalogue = JSON.parse(await readFile(new URL('../data/ksp-films.json',import.meta.url)));
const batch = JSON.parse(await readFile(new URL('../data/ksp-films-batch-2026-09.json',import.meta.url)));

test('all original and batch IDs are preserved once, dated, and supported by the player', async()=>{
  assert.equal(catalogue.videos.length,133);
  assert.equal(new Set(catalogue.videos.map(v=>v.id)).size,133);
  for(const item of batch) assert.ok(catalogue.videos.some(v=>v.id===item.id),item.id);
  for(const v of catalogue.videos) {
    assert.ok(Number.isFinite(Date.parse(v.publishedAt)),v.id);
    assert.ok(Number.isSafeInteger(v.viewCount) && v.viewCount>=0,v.id);
    assert.equal(videoSource({sourceType:'youtube',source:v.id,title:v.title}).external,`https://www.youtube.com/watch?v=${v.id}`);
  }
});
test('sections use actual dates across 2016/2017/2020 and include entire archive',()=>{
  const groups=sections(catalogue.videos);
  assert.equal(groups.latest.length,10);
  assert.equal(groups.archive.length,133);
  assert.equal(groups.twenties.length+groups.late.length+groups.early.length,133);
  for(let i=1;i<groups.archive.length;i++) assert.ok(Date.parse(groups.archive[i-1].publishedAt)>=Date.parse(groups.archive[i].publishedAt));
  assert.deepEqual(groups.latest,groups.archive.slice(0,10));
  assert.ok(groups.twenties.every(v=>+v.publishedAt.slice(0,4)>=2020));
  assert.ok(groups.early.every(v=>+v.publishedAt.slice(0,4)<=2016));
  assert.ok(groups.late.every(v=>+v.publishedAt.slice(0,4)>=2017 && +v.publishedAt.slice(0,4)<=2019));
  const boundary=sections(['2016-12-31','2017-01-01','2019-12-31','2020-01-01'].map((publishedAt,i)=>({id:String(i),publishedAt})));
  assert.deepEqual(boundary.twenties.map(v=>v.id),['3']);
  assert.deepEqual(boundary.late.map(v=>v.id),['2','1']);
  assert.deepEqual(boundary.early.map(v=>v.id),['0']);
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

test('timeline batch is deduplicated and archive filters combine without a display limit', async()=>{
 const supplied=JSON.parse(await readFile(new URL('../data/ksp-films-batch-timeline.json',import.meta.url)));
 for(const v of supplied) assert.equal(catalogue.videos.filter(x=>x.id===v.id).length,1);
 const archive=sections(catalogue.videos).archive;
 assert.ok(filterArchive(archive,'jEeKaY').length>=6);
 assert.ok(filterArchive(archive,'Parano').some(v=>v.id==='5goIpRnXuxI'));
 const expected=archive.filter(v=>v.publishedAt.startsWith('2018') && `${v.artist} ${v.title}`.toLowerCase().includes('demon'));
 assert.ok(expected.length);
 assert.deepEqual(filterArchive(archive,'Demon','2018'),expected);
 assert.deepEqual(filterArchive(archive,'','2018'),archive.filter(v=>v.publishedAt.startsWith('2018')));
 assert.deepEqual(filterArchive(archive,'xyz-no-match'),[]);
 assert.deepEqual(filterArchive(archive,'  '),archive);
});
