import { useCallback, useEffect, useState } from 'react';

import { Stage } from './components/Stage';
import { speakerNotes } from './content/deck';
import { slides, totalMinutes, virtualAddressMinutes } from './slides/index';

type Overlay = 'none' | 'overview' | 'notes' | 'help';

/** The 12:30–12:45 introductory-welcome slot, per brief rev 2's run of show. */
const SLOT_MINUTES = 15;

/**
 * Deck shell: keyboard navigation, click zones, progress, overview, speaker notes.
 *
 * Navigation supports what a presenter remote actually sends — arrow keys and
 * PageUp/PageDown — as well as Space, Home/End, F for fullscreen and O for overview.
 * Nothing in the deck depends on hover, because nobody hovers on a projector.
 */
export function App() {
  const [index, setIndex] = useState(0);
  const [overlay, setOverlay] = useState<Overlay>('none');

  const last = slides.length - 1;
  const go = useCallback(
    (next: number) => setIndex(Math.max(0, Math.min(last, next))),
    [last],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Let the browser own modified keystrokes (F11, Ctrl+R, etc.).
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
        case 'Enter':
          e.preventDefault();
          if (overlay === 'overview') setOverlay('none');
          else go(index + 1);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
        case 'Backspace':
          e.preventDefault();
          go(index - 1);
          break;
        case 'Home':
          e.preventDefault();
          go(0);
          break;
        case 'End':
          e.preventDefault();
          go(last);
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          void toggleFullscreen();
          break;
        case 'o':
        case 'O':
          e.preventDefault();
          setOverlay((o) => (o === 'overview' ? 'none' : 'overview'));
          break;
        case 'n':
        case 'N':
        case 's':
        case 'S':
          e.preventDefault();
          setOverlay((o) => (o === 'notes' ? 'none' : 'notes'));
          break;
        case '?':
        case 'h':
        case 'H':
          e.preventDefault();
          setOverlay((o) => (o === 'help' ? 'none' : 'help'));
          break;
        case 'Escape':
          setOverlay('none');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, index, last, overlay]);

  const current = slides[index];
  if (!current) return null;
  const { Component } = current;

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <Stage key={current.id} className="deck-slide">
        <Component />
      </Stage>

      {/* Click/tap zones at the edges only, leaving the centre free. */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(index - 1)}
        className="absolute inset-y-0 left-0 w-[12vw] cursor-w-resize bg-transparent"
      />
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(index + 1)}
        className="absolute inset-y-0 right-0 w-[12vw] cursor-e-resize bg-transparent"
      />

      <Chrome index={index} total={slides.length} minutes={totalMinutes} />

      {overlay === 'overview' ? (
        <Overview
          index={index}
          onPick={(i) => {
            go(i);
            setOverlay('none');
          }}
          onClose={() => setOverlay('none')}
        />
      ) : null}

      {overlay === 'notes' ? (
        <Notes index={index} onClose={() => setOverlay('none')} />
      ) : null}

      {overlay === 'help' ? <Help onClose={() => setOverlay('none')} /> : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function Chrome({
  index,
  total,
  minutes,
}: {
  index: number;
  total: number;
  minutes: number;
}) {
  const pct = total > 1 ? (index / (total - 1)) * 100 : 100;
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-[6px] w-full bg-black/25"
      >
        <div className="h-full bg-flame transition-[width] duration-300" style={{ width: `${pct}%` }} />
      </div>
      <p className="pointer-events-none absolute right-[18px] bottom-[16px] font-sans text-[15px] font-semibold tracking-[0.1em] text-white/70 tabular-nums">
        {index + 1} / {total} · {minutes.toFixed(1)} min budget · press ? for keys
      </p>
    </>
  );
}

function Overview({
  index,
  onPick,
  onClose,
}: {
  index: number;
  onPick: (i: number) => void;
  onClose: () => void;
}) {
  return (
    <div className="absolute inset-0 overflow-auto bg-[#0e0c0a] p-[24px]">
      <div className="mb-[18px] flex items-baseline justify-between">
        <h1 className="font-sans text-[20px] font-bold text-white">
          Deck overview · {slides.length} slides · {totalMinutes.toFixed(1)} min for the{' '}
          {SLOT_MINUTES}-min slot
          {virtualAddressMinutes > 0
            ? ` · ${virtualAddressMinutes.toFixed(1)} of that is the virtual address`
            : ''}
        </h1>
        <button
          type="button"
          onClick={onClose}
          className="font-sans text-[15px] font-semibold text-white/70 underline"
        >
          Close (Esc)
        </button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[18px]">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onPick(i)}
            className={`text-left ${i === index ? 'ring-[4px] ring-blue' : 'ring-[2px] ring-white/15'}`}
          >
            <Stage scale={0.155}>
              <s.Component />
            </Stage>
            <p className="mt-[6px] font-sans text-[13px] font-semibold text-white/80">
              {i + 1}. {s.title}
            </p>
            <p className="font-mono text-[11px] text-white/45">
              {s.id} · {s.minutes} min
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

function Notes({ index, onClose }: { index: number; onClose: () => void }) {
  const current = slides[index];
  const next = slides[index + 1];
  if (!current) return null;

  return (
    <div className="absolute inset-x-0 bottom-0 max-h-[45vh] overflow-auto border-t-[3px] border-flame bg-[#0e0c0a]/97 p-[24px] font-sans text-white">
      <div className="mb-[10px] flex items-baseline justify-between">
        <p className="text-[15px] font-bold tracking-[0.12em] uppercase">
          Speaker notes · {current.minutes} min
        </p>
        <button type="button" onClick={onClose} className="text-[14px] text-white/70 underline">
          Close (N)
        </button>
      </div>
      <p className="text-[19px] leading-[1.5] text-white/95">
        {speakerNotes[current.id] ?? 'No notes for this slide.'}
      </p>
      <p className="mt-[14px] text-[15px] text-white/55">
        Next: {next ? `${index + 2}. ${next.title}` : 'end of deck — leave the holding slide up'}
      </p>
    </div>
  );
}

function Help({ onClose }: { onClose: () => void }) {
  const keys: readonly [string, string][] = [
    ['→ ↓ Space PgDn', 'Next slide'],
    ['← ↑ PgUp', 'Previous slide'],
    ['Home / End', 'First / last slide'],
    ['F', 'Fullscreen'],
    ['O', 'Overview grid'],
    ['N or S', 'Speaker notes'],
    ['? or H', 'This help'],
    ['Esc', 'Close overlay'],
    ['Click edges', 'Previous / next'],
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0e0c0a]/92 font-sans text-white">
      <div className="w-[620px] max-w-[90vw]">
        <div className="mb-[18px] flex items-baseline justify-between">
          <h1 className="text-[22px] font-bold">Presenter keys</h1>
          <button type="button" onClick={onClose} className="text-[14px] text-white/70 underline">
            Close (Esc)
          </button>
        </div>
        <dl className="flex flex-col gap-[10px]">
          {keys.map(([k, v]) => (
            <div key={k} className="flex items-baseline gap-[18px]">
              <dt className="w-[220px] flex-none font-mono text-[15px] text-flame">{k}</dt>
              <dd className="text-[17px] text-white/90">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-[20px] text-[14px] text-white/55">
          A presenter remote sends arrow keys or PageUp/PageDown — both work.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

async function toggleFullscreen(): Promise<void> {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch {
    // Fullscreen can be refused (permissions, unsupported browser). F11 still works,
    // and failing silently is better than throwing mid-presentation.
  }
}
