# Logo assets

Drop the files in at **exactly these names**. The deck references these paths from
`src/content/deck.ts` → `logos`, so no code change is needed once the files are here.

| File | Organisation | Where it appears | Supplied |
|---|---|---|---|
| `nairobi-ai-community.png` | Nairobi AI Community | Slide 12 `partnership-aic` | ⬜ pending |
| `the-ai-collective.png` | The AI Collective — Nairobi Chapter | Slide 12 `partnership-aic` | ⬜ pending |
| `nairobi-business-angel-network.png` | Nairobi Business Angel Network | Slide 13 `sponsors-partners` | ⬜ optional |

For NBAN, also set `logos.angelNetwork` in `src/content/deck.ts` to
`'/logos/nairobi-business-angel-network.png'` — it is `null` today because no asset was
supplied, and `null` correctly renders the name as text rather than a placeholder.

## If a file is missing

Nothing breaks. `src/components/Logo.tsx` falls back to the organisation name at full
weight — never a broken-image icon. A partner's name set as text is perfectly presentable;
a broken icon projected next to their representative is not.

## Notes on the art

- **PNG with transparency is preferred**, but not required: every logo is composited onto
  an identical neutral card, so a solid white background will not look out of place.
  That card exists precisely because the supplied marks differ in this respect.
- **Aim for ≥ 400px on the long edge.** Slide 12 renders each mark up to 132px tall inside
  a 420×188 box on a 1920×1080 stage, so small source art will visibly soften when the
  stage is projected at full size.
- **Shape does not need to match.** A square glyph and a wide wordmark both fit: each is
  fitted inside the same box with `object-contain` and capped on both axes, which is how
  the deck keeps the two main partners at genuinely equal visual weight rather than merely
  equal height.
- `.svg` also works — change the extension in `logos` if you supply vector art, which will
  stay crisp at any projector resolution.
