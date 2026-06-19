import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Users as UsersIcon, MapPin, Check, Plus } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { TabBar } from "@/components/TabBar";
import { Avatar } from "@/components/Avatar";

export const Route = createFileRoute("/groups")({
  head: () => ({
    meta: [
      { title: "Groups — Haangout" },
      {
        name: "description",
        content:
          "Join community groups and see which kids are looking to haangout right now.",
      },
    ],
  }),
  component: GroupsPage,
});

type LookingPost = {
  id: string;
  parent: string;
  kidName: string;
  kidAge: number;
  initials: string;
  color: string;
  activity: string;
  when: string;
  neighborhood: string;
};

type Group = {
  id: string;
  name: string;
  blurb: string;
  members: number;
  tags: string[];
  color: string;
  initials: string;
  looking: LookingPost[];
};

const groups: Group[] = [
  {
    id: "g-noe-valley",
    name: "Noe Valley Parents",
    blurb: "Neighborhood group for families in 94114.",
    members: 248,
    tags: ["neighborhood", "park", "school pickup"],
    color: "oklch(0.78 0.13 30)",
    initials: "NV",
    looking: [
      {
        id: "l-1",
        parent: "Maya",
        kidName: "Theo",
        kidAge: 8,
        initials: "T",
        color: "oklch(0.78 0.13 70)",
        activity: "Scootering at the park",
        when: "This afternoon",
        neighborhood: "Douglass Park",
      },
      {
        id: "l-2",
        parent: "Jordan",
        kidName: "Iris",
        kidAge: 10,
        initials: "I",
        color: "oklch(0.78 0.14 330)",
        activity: "Lego build session",
        when: "Sat morning",
        neighborhood: "24th St",
      },
    ],
  },
  {
    id: "g-soccer",
    name: "Mission Youth Soccer",
    blurb: "Pickup games and practice buddies, ages 6–12.",
    members: 132,
    tags: ["soccer", "sports", "outdoors"],
    color: "oklch(0.76 0.13 145)",
    initials: "MS",
    looking: [
      {
        id: "l-3",
        parent: "Sam",
        kidName: "Luca",
        kidAge: 9,
        initials: "L",
        color: "oklch(0.76 0.13 250)",
        activity: "Kickaround, any level",
        when: "Sun 10am",
        neighborhood: "Garfield Square",
      },
    ],
  },
  {
    id: "g-art",
    name: "Kid Artists Club",
    blurb: "Crafts, drawing, and messy projects.",
    members: 86,
    tags: ["art", "crafts", "indoor"],
    color: "oklch(0.74 0.14 280)",
    initials: "AC",
    looking: [
      {
        id: "l-4",
        parent: "Priya",
        kidName: "Anya",
        kidAge: 7,
        initials: "A",
        color: "oklch(0.78 0.14 100)",
        activity: "Watercolor afternoon",
        when: "Today 3pm",
        neighborhood: "Home studio",
      },
      {
        id: "l-5",
        parent: "Chris",
        kidName: "Milo",
        kidAge: 8,
        initials: "M",
        color: "oklch(0.78 0.13 30)",
        activity: "Cardboard fort build",
        when: "Sat",
        neighborhood: "Bernal Heights",
      },
    ],
  },
  {
    id: "g-readers",
    name: "Little Readers",
    blurb: "Book swaps and weekly read-alongs.",
    members: 54,
    tags: ["books", "reading", "indoor", "quiet"],
    color: "oklch(0.72 0.14 200)",
    initials: "LR",
    looking: [],
  },
];

function GroupsPage() {
  const [query, setQuery] = useState("");
  const [joined, setJoined] = useState<Record<string, boolean>>({
    "g-noe-valley": true,
  });
  const [openId, setOpenId] = useState<string | null>("g-noe-valley");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups.filter((g) => {
      if (g.name.toLowerCase().includes(q)) return true;
      if (g.blurb.toLowerCase().includes(q)) return true;
      if (g.tags.some((t) => t.includes(q))) return true;
      if (g.looking.some((l) => l.activity.toLowerCase().includes(q))) return true;
      return false;
    });
  }, [query]);

  return (
    <PhoneFrame>
      <div className="pb-28">
        <header className="px-6 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Groups</h1>
              <p className="text-sm text-muted-foreground">
                Find communities looking to haangout
              </p>
            </div>
            <button
              className="grid size-11 place-items-center rounded-full bg-accent text-accent-foreground shadow-[var(--shadow-pop)]"
              aria-label="Create group"
            >
              <Plus className="size-5" />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-2xl bg-zinc-100 px-4 py-3">
            <Search className="size-4 text-zinc-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search activity or interest…"
              className="w-full bg-transparent text-sm placeholder:text-zinc-400 focus:outline-none"
            />
          </div>
        </header>

        <ul className="mt-5 space-y-3 px-5">
          {filtered.map((g) => {
            const isJoined = !!joined[g.id];
            const isOpen = openId === g.id;
            return (
              <li
                key={g.id}
                className="rounded-3xl bg-card p-5 ring-1 ring-black/5"
              >
                <div className="flex items-start gap-4">
                  <Avatar initials={g.initials} color={g.color} size={48} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-semibold leading-tight">
                      {g.name}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {g.blurb}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
                      <UsersIcon className="size-3" />
                      {g.members} members
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setJoined((s) => ({ ...s, [g.id]: !s[g.id] }))
                    }
                    className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      isJoined
                        ? "bg-zinc-100 text-zinc-600"
                        : "bg-accent text-accent-foreground"
                    }`}
                  >
                    {isJoined ? (
                      <>
                        <Check className="size-3" /> Joined
                      </>
                    ) : (
                      "Join"
                    )}
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {g.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-zinc-50 px-2.5 py-1 text-[11px] text-zinc-500 ring-1 ring-black/5"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setOpenId(isOpen ? null : g.id)}
                  className="mt-4 flex w-full items-center justify-between rounded-2xl bg-zinc-50 px-4 py-2.5 text-xs font-medium text-zinc-600 ring-1 ring-black/5"
                >
                  <span>
                    {g.looking.length > 0
                      ? `${g.looking.length} looking to haangout`
                      : "No one looking right now"}
                  </span>
                  <span className="text-zinc-400">{isOpen ? "Hide" : "View"}</span>
                </button>

                {isOpen && g.looking.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {g.looking.map((l) => (
                      <li
                        key={l.id}
                        className="flex items-start gap-3 rounded-2xl bg-zinc-50/60 p-3 ring-1 ring-black/5"
                      >
                        <Avatar
                          initials={l.initials}
                          color={l.color}
                          size={36}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium leading-tight">
                            {l.kidName}{" "}
                            <span className="text-xs font-normal text-zinc-400">
                              · age {l.kidAge} · w/ {l.parent}
                            </span>
                          </p>
                          <p className="mt-0.5 text-xs text-zinc-600">
                            {l.activity}
                          </p>
                          <p className="mt-0.5 flex items-center gap-1 text-[11px] text-zinc-400">
                            <MapPin className="size-3" />
                            {l.neighborhood} · {l.when}
                          </p>
                        </div>
                        <button className="rounded-full bg-accent px-3 py-1.5 text-[11px] font-medium text-accent-foreground">
                          Wave
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}

          {filtered.length === 0 && (
            <li className="rounded-3xl bg-card p-8 text-center text-sm text-muted-foreground ring-1 ring-black/5">
              No groups match "{query}".
            </li>
          )}
        </ul>
      </div>
      <TabBar />
    </PhoneFrame>
  );
}
