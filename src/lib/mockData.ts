export type Kid = {
  id: string;
  name: string;
  age: number;
  initials: string;
  color: string;
};

export type Friendship = {
  myKidId: string;
  theirKidId: string;
};

export type Family = {
  id: string;
  parentName: string;
  partnerName?: string;
  lastName?: string;
  initials: string;
  phone: string;
  address: string;
  distanceMi: number;
  color: string;
  kids: Kid[];
  friendships: Friendship[];
};

export type Match = {
  id: string;
  family: Family;
  theirKid: Kid;
  myKid: Kid;
  windowLabel: string;
  fullLabel: string;
  matchPct: number;
};

export type PlayNowCandidate = {
  kid: Kid;
  family: Family;
  status: "free" | "soon-busy";
  detail: string;
};

// Palette parents pick from when adding a kid
export const kidColorPalette: string[] = [
  "oklch(0.78 0.13 70)",   // amber
  "oklch(0.72 0.14 200)",  // teal
  "oklch(0.74 0.14 280)",  // violet
  "oklch(0.78 0.14 330)",  // pink
  "oklch(0.76 0.13 145)",  // green
  "oklch(0.78 0.13 30)",   // coral
  "oklch(0.76 0.13 250)",  // blue
  "oklch(0.78 0.14 100)",  // chartreuse
];

export const me = {
  name: "Erika",
  initials: "E",

  color: "oklch(0.72 0.13 250)",
  kids: [
    { id: "k-avery", name: "Avery", age: 11, initials: "A", color: kidColorPalette[0] },
    { id: "k-emmy", name: "Emmy", age: 9, initials: "E", color: kidColorPalette[1] },
    { id: "k-nick", name: "Nick", age: 7, initials: "N", color: kidColorPalette[2] },
  ] as Kid[],

};

export const families: Family[] = [
  {
    id: "f-nina-alex",
    parentName: "Nina",
    partnerName: "Alex",
    initials: "NA",
    phone: "(415) 555-0129",
    address: "248 Oak St",
    distanceMi: 0.4,
    color: "oklch(0.78 0.13 30)",
    kids: [
      { id: "k-alex-kid", name: "Alex", age: 7, initials: "A", color: "oklch(0.78 0.13 30)" },
      { id: "k-adrianna", name: "Adrianna", age: 9, initials: "A", color: "oklch(0.78 0.14 330)" },
    ],
    // Nick ↔ Alex, Emmy ↔ Adrianna
    friendships: [
      { myKidId: "k-nick", theirKidId: "k-alex-kid" },
      { myKidId: "k-emmy", theirKidId: "k-adrianna" },
    ],
  },
];

// Derive today's matches strictly from friendships
const matchSeeds = [
  { familyId: "f-nina-alex", myKidId: "k-nick", theirKidId: "k-alex-kid", window: "Sat 2–5pm", pct: 94 },
  { familyId: "f-nina-alex", myKidId: "k-emmy", theirKidId: "k-adrianna", window: "This afternoon", pct: 88 },
];


export const todayMatches: Match[] = matchSeeds
  .map((s): Match | null => {
    const family = families.find((f) => f.id === s.familyId);
    const myKid = me.kids.find((k) => k.id === s.myKidId);
    const theirKid = family?.kids.find((k) => k.id === s.theirKidId);
    if (!family || !myKid || !theirKid) return null;
    // Enforce: only valid if the friendship pair exists
    const isFriends = family.friendships.some(
      (f) => f.myKidId === myKid.id && f.theirKidId === theirKid.id
    );
    if (!isFriends) return null;
    return {
      id: `m-${family.id}-${myKid.id}-${theirKid.id}`,
      family,
      myKid,
      theirKid,
      windowLabel: s.window,
      fullLabel: `${myKid.name} & ${theirKid.name} both free ${s.window}`,
      matchPct: s.pct,
    };
  })
  .filter((m): m is Match => m !== null);

export const playNowFamilies: PlayNowCandidate[] = [
  { kid: families[0].kids[0], family: families[0], status: "free", detail: "At Cedar Park · 15 min ago" },
  { kid: families[0].kids[1], family: families[0], status: "soon-busy", detail: "Leaving in 20 min" },
];


export const blockLabels = ["Morning", "Midday", "Afternoon", "Evening"];
export const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];

// Per-kid schedules. 0 = busy, 1 = maybe, 2 = free
export const initialSchedules: Record<string, number[][]> = {
  "k-avery": [
    [0, 0, 0, 0, 0, 2, 2],
    [0, 1, 0, 0, 0, 2, 1],
    [0, 2, 0, 1, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ],
  "k-emmy": [
    [0, 0, 1, 0, 0, 2, 2],
    [0, 0, 2, 0, 0, 2, 0],
    [0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
  ],
  "k-nick": [
    [0, 1, 0, 0, 0, 2, 2],
    [0, 0, 0, 1, 0, 2, 2],
    [0, 0, 2, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ],
};

// Recurring availability rules. status 1 = maybe, 2 = free.
export type Recurrence = {
  id: string;
  kidId: string;
  status: 1 | 2;
  days: number[];   // 0..6, Mon-first to match dayLabels
  blocks: number[]; // 0..3, indices into blockLabels
  startDate: string;       // ISO yyyy-mm-dd
  endDate: string | null;  // null = forever
};

export function isoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// Monday-based week start
export function getWeekStart(d: Date): Date {
  const out = new Date(d);
  out.setHours(0, 0, 0, 0);
  const dow = out.getDay(); // 0 = Sun
  const delta = dow === 0 ? -6 : 1 - dow;
  out.setDate(out.getDate() + delta);
  return out;
}

export function addDays(d: Date, n: number): Date {
  const out = new Date(d);
  out.setDate(out.getDate() + n);
  return out;
}

export function formatWeekRange(weekStart: Date): string {
  const end = addDays(weekStart, 6);
  const monthFmt = (x: Date) => x.toLocaleDateString("en-US", { month: "short" });
  if (weekStart.getMonth() === end.getMonth()) {
    return `${monthFmt(weekStart)} ${weekStart.getDate()} – ${end.getDate()}`;
  }
  return `${monthFmt(weekStart)} ${weekStart.getDate()} – ${monthFmt(end)} ${end.getDate()}`;
}

export const initialRecurrences: Recurrence[] = [
  {
    id: "r-avery-mwf-pm",
    kidId: "k-avery",
    status: 2,
    days: [0, 2, 4], // Mon, Wed, Fri
    blocks: [2],     // Afternoon
    startDate: "2025-01-01",
    endDate: null,
  },
];


// Helper: who is my kid friends with (across all families)?
export function friendsOfMyKid(myKidId: string) {
  return families
    .flatMap((f) =>
      f.friendships
        .filter((fr) => fr.myKidId === myKidId)
        .map((fr) => ({ family: f, theirKid: f.kids.find((k) => k.id === fr.theirKidId)! }))
    )
    .filter((x) => x.theirKid);
}

// Helper: which of MY kids are friends with this family?
export function myKidsInFamily(family: Family): Kid[] {
  return family.friendships
    .map((fr) => me.kids.find((k) => k.id === fr.myKidId))
    .filter((k): k is Kid => Boolean(k));
}
