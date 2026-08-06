/**
 * Pre-renders the deck's QR codes to SVG in public/qr/.
 *
 * Done at build time on purpose. The deck must run with the network off and without a QR
 * library in the bundle, and SVG stays crisp at any projector resolution — a raster QR
 * scaled up on a 1920x1080 stage develops soft edges, and soft edges are exactly what makes
 * a projected code fail to scan from the back of a room.
 *
 * URLs come from src/content/deck.ts so there is one source of truth. They are parsed out of
 * that file rather than imported, because this is plain node with no TypeScript loader.
 *
 *   node scripts/gen-qr.mjs     # run automatically by `npm run build`
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import QRCode from 'qrcode';

const OUT_DIR = 'public/qr';

const deck = await readFile('src/content/deck.ts', 'utf8');

/** Pull a confirmed('…') URL out of the `links` block by key. */
function urlFor(key) {
  const re = new RegExp(`${key}:\\s*confirmed\\(\\s*'([^']+)'`, 's');
  const found = deck.match(re);
  if (!found?.[1]) {
    throw new Error(
      `gen-qr: could not find links.${key} as a confirmed('…') value in src/content/deck.ts.\n` +
        'If the URL became a placeholder, remove it from TARGETS here too.',
    );
  }
  return found[1];
}

const TARGETS = [
  { file: 'application.svg', key: 'application' },
  { file: 'linkedin.svg', key: 'linkedIn' },
];

await mkdir(OUT_DIR, { recursive: true });

for (const { file, key } of TARGETS) {
  const url = urlFor(key);
  const svg = await QRCode.toString(url, {
    type: 'svg',
    // High error correction: a projected code gets photographed at an angle, partly glared
    // out, and sometimes with a head in the way. H tolerates ~30% damage.
    errorCorrectionLevel: 'H',
    margin: 2,
    color: { dark: '#070B14', light: '#FFFFFF' },
  });
  await writeFile(`${OUT_DIR}/${file}`, svg, 'utf8');
  console.log(`  ${OUT_DIR}/${file}  ←  ${url}`);
}

console.log(`\n${TARGETS.length} QR code(s) written to ${OUT_DIR}/\n`);
