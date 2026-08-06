/**
 * Measures WCAG 2.1 contrast for every foreground/background pair the deck actually uses.
 *
 * The design bar requires contrast >= 4.5:1 "verified, not eyeballed" — this is the
 * verification. QA re-runs it as readiness evidence:
 *
 *   node scripts/check-contrast.mjs
 *
 * Exits non-zero if any pair fails, so it can gate a build if that is ever wanted.
 * Token values below must stay in sync with src/styles/theme.css.
 */

/*
  Palette sampled from the event poster. Values must stay in sync with src/styles/theme.css.
*/
const TOKENS = {
  canvas: '#070B14',
  canvasAlt: '#0C1422',
  panel: '#111C2E',
  fg: '#FFFFFF',
  fgSoft: '#9DAAC0',
  blue: '#2E93F7',
  blueBright: '#5BAEFF',
  flame: '#F0512B',
  flameBright: '#FF7A4D',
  tbc: '#F7C860',
  tbcBg: '#241A08',
  surround: '#02030A',
};

/** Every pair the deck renders, named by where it appears. */
const PAIRS = [
  ['fg on canvas', TOKENS.fg, TOKENS.canvas, 'body + headlines, most slides'],
  ['fg-soft on canvas', TOKENS.fgSoft, TOKENS.canvas, 'eyebrows, footnotes, labels, meta'],
  ['blue on canvas', TOKENS.blue, TOKENS.canvas, 'lead-ins, timeline dates, route questions'],
  ['blue-bright on canvas', TOKENS.blueBright, TOKENS.canvas, 'title tagline'],
  ['flame on canvas', TOKENS.flame, TOKENS.canvas, 'links, figures, thanks'],
  ['flame-bright on canvas', TOKENS.flameBright, TOKENS.canvas, 'kickers'],

  ['fg on canvas-alt', TOKENS.fg, TOKENS.canvasAlt, 'graduate-voice quote'],
  ['fg-soft on canvas-alt', TOKENS.fgSoft, TOKENS.canvasAlt, 'graduate-voice attribution'],
  ['flame on canvas-alt', TOKENS.flame, TOKENS.canvasAlt, 'graduate-voice quote mark'],

  ['fg on panel', TOKENS.fg, TOKENS.panel, 'sponsor-impact-cta, whats-next card, partnership'],
  ['fg-soft on panel', TOKENS.fgSoft, TOKENS.panel, 'sponsor-impact-cta label'],
  ['blue on panel', TOKENS.blue, TOKENS.panel, 'partnership qualifier, step numbers'],
  ['flame on panel', TOKENS.flame, TOKENS.panel, 'sponsor-impact-cta contact'],

  ['tbc on tbc-bg', TOKENS.tbc, TOKENS.tbcBg, 'every placeholder marker'],
  ['tbc on canvas', TOKENS.tbc, TOKENS.canvas, 'placeholder hint text on bare ground'],
  ['fg on surround', TOKENS.fg, TOKENS.surround, 'overview / notes / help overlays'],
];

const srgbToLinear = (c) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex) => {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return (
    0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b)
  );
};

const ratio = (fg, bg) => {
  const [a, b] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
};

const FLOOR = 4.5;
let failed = 0;

console.log('\nWCAG 2.1 contrast — floor 4.5:1\n');
console.log(
  `${'pair'.padEnd(26)} ${'ratio'.padStart(7)}  ${'AA'.padEnd(5)} where`,
);
console.log('-'.repeat(96));

for (const [name, fg, bg, where] of PAIRS) {
  const r = ratio(fg, bg);
  const ok = r >= FLOOR;
  if (!ok) failed += 1;
  console.log(
    `${name.padEnd(26)} ${r.toFixed(2).padStart(7)}  ${(ok ? 'PASS' : 'FAIL').padEnd(5)} ${where}`,
  );
}

console.log('-'.repeat(96));
if (failed > 0) {
  console.error(`\n${failed} pair(s) below ${FLOOR}:1. Fix the tokens in theme.css.\n`);
  process.exit(1);
}
console.log(`\nAll ${PAIRS.length} pairs pass ${FLOOR}:1.\n`);
