## Goal

Let parents set **recurring availability** for a kid — e.g. "Avery is free MWF afternoons" — so those slots auto-fill the calendar instead of being tapped in every week. Rules can run in perpetuity or between specific start/end dates.

## What you'll see in the app

On `/calendar`, under the weekly grid:

- A new **"Recurring availability"** section listing the active kid's rules:
  - `Free · Mon/Wed/Fri · Afternoon · From Oct 14 · Forever`
  - Each row has edit + delete.
- An **"+ Add recurring"** button opens a bottom sheet with:
  - Status: Free / Maybe (matches existing tap states)
  - Days: M T W T F S S (multi-select chips)
  - Time blocks: Morning / Midday / Afternoon / Evening (multi-select)
  - Starts: date picker (defaults to today)
  - Ends: "Never" toggle, or date picker
- The grid renders recurring slots with a subtle **dotted/striped overlay** so it's clear they came from a rule, not a one-off tap. One-off taps still override (and visually win).
- Week nav (`Oct 14 – 20`) becomes real — recurring rules resolve against the visible week's dates, so navigating weeks shows rules only where they're in range.

## Data model

New per-kid type stored in `KidsContext` alongside `schedules`:

```ts
type Recurrence = {
  id: string;
  kidId: string;
  status: 1 | 2;            // 1 = maybe, 2 = free (matches grid values)
  days: number[];           // 0..6, Mon-first to match dayLabels
  blocks: number[];         // 0..3, indices into blockLabels
  startDate: string;        // ISO yyyy-mm-dd
  endDate: string | null;   // null = forever
};
```

`schedules` stays as the one-off override layer. Display value for a cell becomes:

```
override = schedules[kidId][block][day]
if (override !== 0) return override         // user tap wins
rule = active recurrence for (date, block)  // pick highest status if many
return rule?.status ?? 0
```

Tapping a cell still writes into `schedules` (the override layer), so a recurring "free" Friday afternoon can be set to busy for one week without deleting the rule.

## Files

- `src/lib/kidsContext.tsx` — add `recurrences`, `setRecurrences`, helpers `addRecurrence` / `removeRecurrence` / `resolveCell(kidId, weekStartISO, block, day)`. Seed Avery with one example MWF-afternoon rule so the feature is visible on first load.
- `src/lib/mockData.ts` — export `Recurrence` type and an `initialRecurrences` seed; add a `getWeekStart(date)` helper (Monday-based).
- `src/components/RecurrenceSheet.tsx` — new bottom sheet (mirrors `KidsManagerSheet` styling) for add/edit.
- `src/routes/calendar.tsx`:
  - Add `weekStart` state + real Prev/Next handlers and date-range label.
  - Replace `grid` with a resolved grid using `resolveCell`.
  - Add overlay styling for recurring-sourced cells (dotted ring).
  - Add the "Recurring availability" list + "Add recurring" button + sheet wiring.

## Out of scope

- No backend / persistence beyond in-memory context (matches the rest of the prototype).
- No "every other week" or monthly patterns — weekly day-of-week only.
- No conflict UI when two rules cover the same cell; highest status wins silently.

## Open questions

1. For the "free MWF afternoons" example, should adding a rule **clear** any conflicting one-off "busy" taps in that range, or leave them as overrides? Default plan: leave them — taps always win.
2. Should rules be shared across kids ("apply to Avery & Emmy") or strictly per-kid? Default plan: per-kid, with a copy-to-other-kid action later.
