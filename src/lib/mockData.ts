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
    { id: "k-ava", name: "Ava", age: 4, initials: "A", color: kidColorPalette[0] },
    { id: "k-theo", name: "Theo", age: 6, initials: "T", color: kidColorPalette[1] },
  ] as Kid[],
};

export const families: Family[] = [
  {
    id: "f-marcus",
    parentName: "Marcus Lee",
    partnerName: "Jen",
    initials: "ML",
    phone: "(415) 555-0129",
    address: "248 Oak St",
    distanceMi: 0.4,
    color: "oklch(0.78 0.13 30)",
    kids: [{ id: "k-liam", name: "Liam", age: 4, initials: "L", color: "oklch(0.78 0.13 30)" }],
    // Ava ↔ Liam
    friendships: [{ myKidId: "k-ava", theirKidId: "k-liam" }],
  },
  {
    id: "f-elena",
    parentName: "Elena Park",
    partnerName: "David",
    initials: "EP",
    phone: "(415) 555-8821",
    address: "1102 Castro",
    distanceMi: 1.2,
    color: "oklch(0.78 0.14 330)",
    kids: [{ id: "k-sophie", name: "Sophie", age: 5, initials: "S", color: "oklch(0.78 0.14 330)" }],
    // Ava ↔ Sophie
    friendships: [{ myKidId: "k-ava", theirKidId: "k-sophie" }],
  },
  {
    id: "f-henderson",
    parentName: "Emma Henderson",
    partnerName: "Mark",
    initials: "EH",
    phone: "(415) 555-0144",
    address: "55 Buena Vista",
    distanceMi: 2.4,
    color: "oklch(0.76 0.13 145)",
    kids: [
      { id: "k-oliver", name: "Oliver", age: 3, initials: "O", color: "oklch(0.76 0.13 145)" },
      { id: "k-maya", name: "Maya", age: 6, initials: "M", color: "oklch(0.76 0.13 250)" },
    ],
    // Theo ↔ Maya only
    friendships: [{ myKidId: "k-theo", theirKidId: "k-maya" }],
  },
  {
    id: "f-jisoo",
    parentName: "Ji-Soo Choi",
    initials: "JC",
    phone: "(415) 555-6620",
    address: "812 Hayes",
    distanceMi: 0.8,
    color: "oklch(0.74 0.14 280)",
    kids: [{ id: "k-suri", name: "Suri", age: 4, initials: "S", color: "oklch(0.74 0.14 280)" }],
    // Ava ↔ Suri
    friendships: [{ myKidId: "k-ava", theirKidId: "k-suri" }],
  },
];

// Derive today's matches strictly from friendships
const matchSeeds = [
  { familyId: "f-marcus", myKidId: "k-ava", theirKidId: "k-liam", window: "Sat 2–5pm", pct: 94 },
  { familyId: "f-elena", myKidId: "k-ava", theirKidId: "k-sophie", window: "This afternoon", pct: 81 },
  { familyId: "f-henderson", myKidId: "k-theo", theirKidId: "k-maya", window: "Sun 9–11am", pct: 88 },
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
  { kid: families[2].kids[1], family: families[2], status: "free", detail: "At home · 0.5 mi" },
  { kid: families[3].kids[0], family: families[3], status: "soon-busy", detail: "Leaving in 20 min" },
];

export const blockLabels = ["Morning", "Midday", "Afternoon", "Evening"];
export const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];

// Per-kid schedules. 0 = busy, 1 = maybe, 2 = free
export const initialSchedules: Record<string, number[][]> = {
  "k-ava": [
    [0, 0, 0, 0, 0, 2, 2],
    [0, 1, 0, 0, 0, 2, 1],
    [0, 2, 0, 1, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ],
  "k-theo": [
    [0, 0, 1, 0, 0, 2, 2],
    [0, 0, 2, 0, 0, 2, 0],
    [0, 0, 0, 0, 2, 0, 0],
    [0, 0, 0, 0, 1, 0, 0],
  ],
};

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
