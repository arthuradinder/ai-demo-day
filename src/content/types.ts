/**
 * Content types for the deck.
 *
 * Every fact carries its own confirmation status, so the renderer can guarantee that
 * nothing unconfirmed is ever drawn as if it were confirmed. This is the mechanism
 * behind spec rev 1's placeholder policy: the deck is presented to sponsors sitting in
 * the room, and a guessed figure projected as fact is the worst available outcome.
 */

/** A single fact: either confirmed with a value, or an explicit gap with a hint. */
export type Fact<T> =
  | { readonly status: 'confirmed'; readonly value: T }
  | { readonly status: 'placeholder'; readonly hint: string };

/** A list of facts: either the real items, or a known-size gap for layout verification. */
export type FactList<T> =
  | { readonly status: 'confirmed'; readonly items: readonly T[] }
  | { readonly status: 'placeholder'; readonly hint: string; readonly slots: number };

export const confirmed = <T>(value: T): Fact<T> => ({ status: 'confirmed', value });

export const tbc = <T>(hint: string): Fact<T> => ({ status: 'placeholder', hint });

export const confirmedList = <T>(items: readonly T[]): FactList<T> => ({
  status: 'confirmed',
  items,
});

/**
 * `slots` is the number of entries the layout should reserve, so the designer's
 * layout can be reviewed at realistic density before the real data arrives.
 */
export const tbcList = <T>(hint: string, slots: number): FactList<T> => ({
  status: 'placeholder',
  hint,
  slots,
});

export const isConfirmed = <T>(
  fact: Fact<T>,
): fact is { status: 'confirmed'; value: T } => fact.status === 'confirmed';

/** A dated entry on the journey timeline. */
export interface Milestone {
  readonly date: Fact<string>;
  readonly label: Fact<string>;
  /** The single "today" entry, rendered as the timeline's terminus. */
  readonly isToday?: boolean;
}

/** One Cohort 2 project, as shown on the roll of honour. */
export interface Project {
  readonly title: string;
  readonly builder: string;
}

/** A sponsor. `logo` is a path under /public; absent means name-only rendering. */
export interface Sponsor {
  readonly name: string;
  readonly tier?: string;
  readonly logo?: string;
}

export interface Person {
  readonly name: string;
  readonly role?: string;
}

/** A labelled statistic in a stat row. */
export interface Stat {
  readonly figure: Fact<number | string>;
  readonly label: string;
}

/** A conversion route on `get-involved`. */
export interface Route {
  readonly question: string;
  readonly action: string;
  readonly target: Fact<string>;
}

export interface LinkEntry {
  readonly label: string;
  readonly target: Fact<string>;
}
