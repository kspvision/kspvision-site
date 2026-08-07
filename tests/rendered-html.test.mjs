import assert from "node:assert/strict";
import { lstat, readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the finished KSP Vision homepage with production metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>KSP Vision — Film Production in Montréal<\/title>/i);
  assert.match(html, /Your vision\./);
  assert.match(html, /Music Videos/);
  assert.match(html, /Brand \/ Doc/);
  assert.match(html, /Wedding films/);
  assert.match(html, /Book a project/);
  assert.match(html, /og\.png/);
  assert.doesNotMatch(html, /starter loading skeleton|Your site is taking shape/i);
});

test("renders all portfolio routes and excludes local wedding masters", async () => {
  const routes = [["/music-videos", "Kreyday Everyday"], ["/brand-documentary", "Stories with purpose"], ["/weddings", "Smith &amp; Aureanne"], ["/booking", "Request availability"]];
  for (const [path, expected] of routes) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(await response.text(), new RegExp(expected, "i"), path);
  }
  for (const name of ["smith-aureanne.mp4", "ralph-evelyne.mp4", "suffrard-florence.mp4"]) {
    await assert.rejects(lstat(new URL(`../public/weddings/${name}`, import.meta.url)));
  }
  const music = await readFile(new URL("../app/music-videos/page.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(music, /Discontinué|TazManiax/);
  assert.match(music, /hqdefault\.jpg/);
});
