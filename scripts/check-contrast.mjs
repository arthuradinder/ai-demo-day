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

const TOKENS = {
  paper: '#FAF7F2',
  paperAlt: '#F2EDE4',
  ink: '#16130F',
  inkSoft: '#4A423A',
  accent: '#B4471F',
  accentDeep: '#8E3616',
  accentSoft: '#F6E7DF',
  teal: '#1F5E5B',
  tealSoft: '#E2ECEA',
  tbc: '#8A5A00',
  tbcBg: '#FBF1DC',
  surround: '#0E0C0A',
  white: '#FFFFFF',
};

/** Every pair the deck renders, named by where it appears. */
const PAIRS = [
  ['ink on paper', TOKENS.ink, TOKENS.paper, 'body + headlines, most slides'],
  ['ink-soft on paper', TOKENS.inkSoft, TOKENS.paper, 'eyebrows, footnotes, labels'],
  ['accent on paper', TOKENS.accent, TOKENS.paper, 'kickers, figures, links'],
  ['teal on paper', TOKENS.teal, TOKENS.paper, 'lead-ins, timeline dates'],
  ['ink on paper-alt', TOKENS.ink, TOKENS.paperAlt, 'graduate-voice quote'],
  ['ink-soft on paper-alt', TOKENS.inkSoft, TOKENS.paperAlt, 'graduate-voice attribution'],
  ['accent-deep on paper-alt', TOKENS.accentDeep, TOKENS.paperAlt, 'graduate-voice quote mark'],
  ['ink on accent-soft', TOKENS.ink, TOKENS.accentSoft, 'sponsor-impact-cta, whats-next card'],
  ['ink-soft on accent-soft', TOKENS.inkSoft, TOKENS.accentSoft, 'sponsor-impact-cta label'],
  ['accent-deep on accent-soft', TOKENS.accentDeep, TOKENS.accentSoft, 'sponsor-impact-cta contact'],
  ['ink on teal-soft', TOKENS.ink, TOKENS.tealSoft, 'partnership-aic body'],
  ['teal on teal-soft', TOKENS.teal, TOKENS.tealSoft, 'partnership-aic qualifier, step numbers'],
  ['tbc on tbc-bg', TOKENS.tbc, TOKENS.tbcBg, 'every placeholder marker'],
  ['white on surround', TOKENS.white, TOKENS.surround, 'overview / notes / help overlays'],
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
