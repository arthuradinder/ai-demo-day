/**
 * Folds dist/ into a single self-contained HTML file: dist/deck-standalone.html
 *
 * Why this exists. The deck must run with no network — but "no network" and "no local
 * server" are different problems. `npm run preview` covers the first and needs node
 * installed on whatever laptop is driving the projector. This file covers the second: one
 * HTML file, double-click, no toolchain, no server, works off a USB stick.
 *
 * A normal Vite build cannot do that, because <script type="module"> is CORS-blocked over
 * file:// — the page loads and renders nothing. vite.config.ts emits a classic IIFE bundle
 * so it can be inlined here as a plain <script>.
 *
 *   npm run build   # runs this automatically
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';

const OUT = 'dist/deck-standalone.html';

const html = await readFile('dist/index.html', 'utf8');
let js = await readFile('dist/assets/deck.js', 'utf8');
const css = await readFile('dist/assets/deck.css', 'utf8');

/*
  Fold every referenced asset into the bundle as a data URI.

  Without this the standalone file still points at "./logos/x.png" and "./qr/y.svg", which
  only resolve while it sits inside dist/ beside those folders. Copy the single file to a USB
  stick on its own and the logos fall back to text and the QR codes disappear entirely — the
  QR ones silently, which is worse, because a slide that says "scan the code" with no code is
  a dead end in front of a room.

  Assets that are not present are left as-is: the reference 404s and Logo.tsx falls back to
  the organisation name, which is intended behaviour rather than a failure.
*/
const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp' };

/** Every public/ subdirectory whose files the deck references by relative path. */
const ASSET_DIRS = ['logos', 'qr'];
let inlined = 0;

for (const dir of ASSET_DIRS) {
  let files = [];
  try {
    files = await readdir(`dist/${dir}`);
  } catch {
    continue; // directory not present in this build
  }

  for (const file of files) {
    const ext = file.slice(file.lastIndexOf('.')).toLowerCase();
    const mime = MIME[ext];
    if (!mime) continue;

    const ref = `./${dir}/${file}`;
    if (!js.includes(ref)) continue;

    const bytes = await readFile(`dist/${dir}/${file}`);
    const dataUri = `data:${mime};base64,${bytes.toString('base64')}`;
    js = js.replaceAll(ref, dataUri);
    inlined += 1;
  }
}

const stillReferenced = (
  js.match(new RegExp(`\\./(?:${ASSET_DIRS.join('|')})/[^"']+`, 'g')) ?? []
).length;

// A stray </script> inside the bundle would terminate the inline tag early.
const safeJs = js.replaceAll('</script', '<\\/script');

/*
  Replacer FUNCTIONS, not replacement strings. A minified React bundle contains `$&` and
  `$'` sequences, and String.replace treats those as substitution patterns in a string
  replacement — `$&` re-inserts the matched text, which put the original
  <script src="deck.js"> tag back inside its own replacement. Returning from a function
  bypasses all `$` interpretation.
*/
let single = html
  .replace(/<link[^>]+rel="stylesheet"[^>]*>/, () => `<style>\n${css}\n</style>`)
  // Drop the head <script> entirely; it is re-inserted at the end of <body> below.
  .replace(/<script[^>]*src="[^"]*deck\.js"[^>]*><\/script>\s*/, () => '');

// Fail loudly rather than shipping a file that silently renders nothing.
if (single.includes('deck.js') || single.includes('deck.css')) {
  console.error(
    'inline-dist: could not strip both asset references — dist/index.html still points at them.\n' +
      'Check the tag shapes emitted by Vite against the regexes above.',
  );
  process.exit(1);
}

/*
  The bundle goes at the END of <body>, not in <head>.

  Vite's original tag is <script type="module">, which browsers defer until the document
  has parsed. An inlined CLASSIC script has no such deferral — in <head> it executes
  immediately, before <div id="root"> exists, and main.tsx throws "#root not found".
  Placing it after the div restores the original ordering guarantee.
*/
// Function form again, for the same `$&` reason — a string replacement here injected
// "</body>" into the middle of the bundle and closed the script tag early.
single = single.replace(
  '</body>',
  () => `  <script>\n${safeJs}\n  </script>\n  </body>`,
);

if (!single.includes('<script>')) {
  console.error('inline-dist: bundle was not re-inserted — no </body> found in dist/index.html.');
  process.exit(1);
}

single = single.replace(
  '</head>',
  () => '  <!-- Self-contained build: no network, no server. Double-click to present. -->\n  </head>',
);

await writeFile(OUT, single, 'utf8');

const kb = (Buffer.byteLength(single, 'utf8') / 1024).toFixed(0);
console.log(`\n${OUT}  ${kb} kB  — single file, opens over file://, no server needed`);
console.log(`  logos inlined as data URIs: ${inlined}`);
if (stillReferenced > 0) {
  console.log(
    `  logo refs left unresolved: ${stillReferenced} — these fall back to the organisation\n` +
      '  name on screen. Add the files to public/logos/ and rebuild to inline them.',
  );
}
console.log('');
