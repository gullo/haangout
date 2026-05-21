export type Kid = {
  id: string;
  name: string;
  age: number;
  initials: string;
  color: string;
};

export type Family = {
  id: string;
  parentName: string;
  partnerName?: string;
  initials: string;
  phone: string;
  address: string;
  distanceMi: number;
  kids: Kid[];
  color: string;
};

export type Match = {
  id: string;
  family: Family;
  kid: Kid;
  myKid: string;
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

export const me = {
  name: "Sarah",
  initials: "S",
  kids: [
    { id: "k-ava", name: "Ava", age: 4, initials: "A", color: "oklch(0.78 0.13 70)" },
    { id: "k-theo", name: "Theo", age: 6, initials: "T", color: "oklch(0.72 0.14 200)" },
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
    kids: [
      { id: "k-liam", name: "Liam", age: 4, initials: "L", color: "oklch(0.78 0.13 30)" },
    ],
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
    kids: [
      { id: "k-sophie", name: "Sophie", age: 5, initials: "S", color: "oklch(0.78 0.14 330)" },
    ],
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
  },
  {
    id: "f-jisoo",
    parentName: "Ji-Soo Choi",
    initials: "JC",
    phone: "(415) 555-6620",
    address: "812 Hayes",
    distanceMi: 0.8,
    color: "oklch(0.74 0.14 280)",
    kids: [
      { id: "k-suri", name: "Suri", age: 4, initials: "S", color: "oklch(0.74 0.14 280)" },
    ],
  },
];

export const todayMatches: Match[] = [
  {
    id: "m-1",
    family: families[0],
    kid: families[0].kids[0],
    myKid: "Ava",
    windowLabel: "Sat 2–5pm",
    fullLabel: "Ava is free Sat 2–5pm — so is Liam",
    matchPct: 94,
  },
  {
    id: "m-2",
    family: families[1],
    kid: families[1].kids[0],
    myKid: "Ava",
    windowLabel: "This afternoon",
    fullLabel: "Free this afternoon for a park visit",
    matchPct: 81,
  },
  {
    id: "m-3",
    family: families[2],
    kid: families[2].kids[1],
    myKid: "Theo",
    windowLabel: "Sun morning",
    fullLabel: "Maya is free Sunday 9–11am — so is Theo",
    matchPct: 88,
  },
];

export const playNowFamilies: PlayNowCandidate[] = [
  { kid: families[0].kids[0], family: families[0], status: "free", detail: "At Cedar Park · 15 min ago" },
  { kid: families[2].kids[1], family: families[2], status: "free", detail: "At home · 0.5 mi" },
  { kid: families[3].kids[0], family: families[3], status: "soon-busy", detail: "Leaving in 20 min" },
];

// Schedule grid: 7 days × 4 blocks (morning/midday/afternoon/evening)
export const blockLabels = ["Morning", "Midday", "Afternoon", "Evening"];
export const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];

// 0 = off, 1 = soft, 2 = full
export const initialSchedule: number[][] = [
  // M  T  W  T  F  S  S
  [0, 0, 0, 0, 0, 2, 2], // Morning
  [0, 1, 0, 0, 0, 2, 1], // Midday
  [0, 2, 0, 1, 0, 2, 0], // Afternoon
  [0, 0, 0, 0, 0, 0, 0], // Evening
];
