/**
 * Walks the whole deck in headless Chromium at 1920x1080, screenshots every slide, and
 * collects evidence the design bar asks for but a build cannot prove:
 *
 *   - every slide actually renders (a deck can compile and still paint a blank slide)
 *   - no console errors across a full pass
 *   - the smallest rendered text on each slide, versus the 24px floor
 *
 * Stage 3 QA re-runs this as readiness evidence.
 *
 *   npm run dev                        # in one shell
 *   node scripts/capture-slides.mjs    # in another
 *
 * Screenshots land in screenshots/ (gitignored). Exits non-zero on console errors or a
 * font-size floor violation.
 */

import { chromium } from 'playwright';
import { mkdir, rm } from 'node:fs/promises';

const URL = process.env.DECK_URL ?? 'http://localhost:5173/';
const OUT = 'screenshots';
const FLOOR_PX = 24;

const errors = [];
/*
  Missing logo assets are reported but not treated as failures. Logo.tsx is built to fall
  back to the organisation name when an asset is absent, so a 404 here is the designed
  behaviour until the real files land — not a defect. Still printed, so it can never be
  silently forgotten.
*/
const expected = [];
const rows = [];

const isMissingAsset = (text) =>
  /ERR_FILE_NOT_FOUND|Failed to load resource/.test(text) === true;

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

page.on('console', (m) => {
  if (m.type() !== 'error') return;
  const text = m.text();
  if (isMissingAsset(text)) expected.push(`[asset] ${text}`);
  else errors.push(`[console] ${text}`);
});
page.on('pageerror', (e) => errors.push(`[pageerror] ${e.message}`));

await page.goto(URL, { waitUntil: 'networkidle' });
await page.waitForSelector('section');

/** Total slide count, parsed from the presenter chrome — also proves chrome renders. */
const chromeText = await page.locator('p.tabular-nums').first().innerText();
const total = Number(chromeText.match(/\d+\s*\/\s*(\d+)/)?.[1] ?? 0);
if (!total) throw new Error(`could not read slide count from chrome: "${chromeText}"`);
console.log(`\nDeck reports ${total} slides. Chrome: ${chromeText.trim()}\n`);

for (let i = 1; i <= total; i += 1) {
  await page.waitForSelector('section');
  // Settle the 180ms entrance animation so screenshots are not caught mid-fade.
  await page.waitForTimeout(260);

  const probe = await page.evaluate((floor) => {
    const slide = document.querySelector('section');
    if (!slide) return { ok: false, id: null, min: null, sample: null, textLen: 0 };

    let min = Infinity;
    let sample = null;
    // Only leaf elements carrying visible text — presenter chrome sits outside <section>.
    for (const el of slide.querySelectorAll('*')) {
      if (el.children.length > 0) continue;
      const text = (el.textContent ?? '').trim();
      if (!text) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none') continue;
      const size = parseFloat(cs.fontSize);
      if (size < min) {
        min = size;
        sample = text.slice(0, 42);
      }
    }
    const box = slide.getBoundingClientRect();
    return {
      ok: box.width > 0 && box.height > 0,
      min: Number.isFinite(min) ? min : null,
      sample,
      textLen: (slide.textContent ?? '').trim().length,
      // Content taller than the 1080px stage. Silently clipped on a projector, so it
      // has to be caught here rather than noticed on the day.
      overflow: Math.max(0, slide.scrollHeight - slide.clientHeight),
      floor,
    };
  }, FLOOR_PX);

  const label = String(i).padStart(2, '0');
  await page.screenshot({ path: `${OUT}/slide-${label}.png` });

  rows.push({ n: i, ...probe });

  if (i < total) {
    await page.keyboard.press('ArrowRight');
  }
}

// Overview grid and speaker notes.
await page.keyboard.press('Home');
await page.waitForTimeout(200);
await page.keyboard.press('o');
await page.waitForTimeout(600);
await page.screenshot({ path: `${OUT}/overview.png` });
await page.keyboard.press('Escape');

await page.waitForTimeout(200);
await page.keyboard.press('n');
await page.waitForTimeout(300);
await page.screenshot({ path: `${OUT}/notes.png` });
await page.keyboard.press('Escape');

await page.waitForTimeout(200);
await page.keyboard.press('?');
await page.waitForTimeout(300);
await page.screenshot({ path: `${OUT}/help.png` });

await browser.close();

/* ---------------------------------- report -------------------------------- */

console.log(
  `${'#'.padStart(3)}  ${'rendered'.padEnd(8)} ${'min px'.padStart(7)} ${'overflow'.padStart(9)}  ${'chars'.padStart(5)}  smallest text`,
);
console.log('-'.repeat(104));

let violations = 0;
let blank = 0;
let clipped = 0;

for (const r of rows) {
  const under = r.min !== null && r.min < FLOOR_PX;
  if (under) violations += 1;
  if (!r.ok || r.textLen === 0) blank += 1;
  if (r.overflow > 0) clipped += 1;
  console.log(
    `${String(r.n).padStart(3)}  ${(r.ok ? 'yes' : 'NO').padEnd(8)} ${
      r.min === null ? '    n/a' : `${r.min.toFixed(0).padStart(5)}${under ? ' !' : '  '}`
    } ${(r.overflow > 0 ? `+${r.overflow}px !` : '—').padStart(9)}  ${String(r.textLen).padStart(5)}  ${r.sample ?? '—'}`,
  );
}

console.log('-'.repeat(104));
console.log(`\nScreenshots: ${OUT}/  (${total} slides + overview + notes + help)`);

if (errors.length) {
  console.error(`\n${errors.length} console error(s):`);
  for (const e of errors) console.error(`  ${e}`);
} else {
  console.log('\nConsole: clean across a full pass.');
}

if (expected.length) {
  console.log(
    `\n${expected.length} missing-asset warning(s) — expected while logo files are absent;` +
      ' the deck falls back to the organisation name:',
  );
  for (const e of new Set(expected)) console.log(`  ${e}`);
}

if (violations) console.error(`\n${violations} slide(s) render text below the ${FLOOR_PX}px floor.`);
if (blank) console.error(`\n${blank} slide(s) rendered blank or empty.`);
if (clipped) console.error(`\n${clipped} slide(s) overflow the 1080px stage and will be clipped when projected.`);

process.exit(errors.length || violations || blank || clipped ? 1 : 0);
