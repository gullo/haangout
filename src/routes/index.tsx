import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Sparkles, ChevronRight } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Avatar } from "@/components/Avatar";
import { PlayNowSheet } from "@/components/PlayNowSheet";
import { FakeMessageSheet } from "@/components/FakeMessageSheet";
import { FakeCallSheet } from "@/components/FakeCallSheet";
import { EditProfileSheet } from "@/components/EditProfileSheet";
import { me, type Family, type Kid, type Match } from "@/lib/mockData";
import { useKids } from "@/lib/kidsContext";
import { useFamilies } from "@/lib/familiesContext";
import { useProfile, profileInitials } from "@/lib/profileContext";
import { kidsBackground } from "@/lib/kidColors";

export const Route = createFileRoute("/")({
  component: Home,
});

const matchWindows = [
  { window: "Sat 2–5pm", pct: 94 },
  { window: "This afternoon", pct: 88 },
  { window: "Sun 9–11am", pct: 81 },
  { window: "Tomorrow 10am", pct: 76 },
];


function buildMatches(kids: Kid[], families: Family[]): Match[] {
  if (families.length === 0) return [];
  return kids
    .map((myKid, i): Match | null => {
      const tpl = matchWindows[i % matchWindows.length];
      const family = families[i % families.length];
      const theirKid =
        family.kids.find((k) => Math.abs(k.age - myKid.age) <= 2) ?? family.kids[0];
      if (!theirKid) return null;
      return {
        id: `m-${family.id}-${myKid.id}-${theirKid.id}`,
        family,
        myKid,
        theirKid,
        windowLabel: tpl.window,
        fullLabel: `${myKid.name} & ${theirKid.name} both free ${tpl.window}`,
        matchPct: tpl.pct,
      };
    })
    .filter((m): m is Match => m !== null);
}

function Home() {
  const { kids } = useKids();
  const { families } = useFamilies();
  const [playNowOpen, setPlayNowOpen] = useState(false);
  const [messageMatch, setMessageMatch] = useState<Match | null>(null);
  const [callMatch, setCallMatch] = useState<Match | null>(null);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [activeKidIds, setActiveKidIds] = useState<string[]>([]);
  const { profile } = useProfile();
  const firstName = profile.name.trim().split(/\s+/)[0] || me.name;
  const activeKids = kids.filter((k) => activeKidIds.includes(k.id));
  const todayMatches = useMemo(() => buildMatches(kids, families), [kids, families]);
  const isLive = activeKids.length > 0;
  const ctaBg = isLive ? kidsBackground(activeKids) : "var(--accent)";
  const toggleKid = (kidId: string) =>
    setActiveKidIds((ids) =>
      ids.includes(kidId) ? ids.filter((id) => id !== kidId) : [...ids, kidId],
    );

  return (
    <PhoneFrame>
      {/* Header */}
      <header className="px-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Good morning</p>
            <h1 className="text-2xl font-semibold tracking-tight">Hi, {firstName}</h1>
          </div>
          <button
            onClick={() => setEditProfileOpen(true)}
            className="rounded-full transition active:scale-95"
            aria-label="Edit profile"
          >
            <Avatar initials={profileInitials(profile.name)} color="oklch(0.72 0.13 250)" size={48} />
          </button>
        </div>
      </header>

      {/* Hangout Now CTA */}
      <section className="px-6 pt-7">
        <button
          onClick={() => setPlayNowOpen(true)}
          style={{ background: ctaBg }}
          className="group relative flex w-full items-center justify-between overflow-hidden rounded-3xl px-6 py-5 text-white shadow-[var(--shadow-pop)] ring-1 ring-white/15 ring-inset transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.35)] active:translate-y-0 active:scale-[0.985]"
        >
          {/* sheen */}
          <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent" />
          {/* shimmer on hover */}
          <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100" />

          <div className="relative flex flex-col items-start">
            <span className="flex items-center gap-1.5 text-xs font-medium opacity-90">
              {isLive ? (
                <>
                  <span className="size-2 animate-pulse rounded-full bg-white" /> Live ·{" "}
                  {activeKids.map((k) => k.name).join(" & ")}
                </>
              ) : (
                <>
                  <Sparkles className="size-3.5" /> Spontaneous hangout
                </>
              )}
            </span>
            <span className="mt-0.5 flex items-center gap-1.5 text-xl font-semibold">
              Hangout Now
              <ChevronRight className="size-5 -translate-x-0.5 opacity-80 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </span>
          </div>
          <div className="relative flex -space-x-3 transition-transform duration-300 group-hover:scale-105">
            {kids.map((k) => (
              <Avatar
                key={k.id}
                initials={k.initials}
                color={k.color}
                size={40}
                className="border-2 border-white/90 shadow-sm"
              />
            ))}
          </div>
        </button>

      </section>

      {/* Quick stats */}
      <section className="mt-5 grid grid-cols-2 gap-3 px-6">
        <div className="rounded-2xl bg-card p-4 ring-1 ring-black/5">
          <p className="text-2xl font-semibold tracking-tight">3</p>
          <p className="text-xs text-muted-foreground">Matches today</p>
        </div>
        <div className="rounded-2xl bg-card p-4 ring-1 ring-black/5">
          <p className="text-2xl font-semibold tracking-tight">{families.length}</p>
          <p className="text-xs text-muted-foreground">Trusted families</p>
        </div>
      </section>

      {/* Matches */}
      <section className="px-6 pt-8">
        <div className="flex items-center justify-between pb-4">
          <h2 className="text-lg font-semibold tracking-tight">Today's Matches</h2>
          <button className="flex items-center gap-0.5 text-xs font-semibold text-accent">
            View all <ChevronRight className="size-3" />
          </button>
        </div>

        <ul className="space-y-3">
          {todayMatches.map((m) => (
            <li key={m.id} className="rounded-3xl bg-card p-5 ring-1 ring-black/5">
              <div className="flex items-start gap-4">
                {/* Paired avatars: my kid + their kid */}
                <div className="flex -space-x-3 shrink-0">
                  <Avatar
                    initials={m.myKid.initials}
                    color={m.myKid.color}
                    size={44}
                    className="ring-2 ring-card"
                  />
                  <Avatar
                    initials={m.theirKid.initials}
                    color={m.theirKid.color}
                    size={44}
                    className="ring-2 ring-card"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-medium text-zinc-400">
                      {m.myKid.name} &amp; {m.theirKid.name}
                    </p>
                    <span className="text-[10px] font-bold text-success">
                      {m.matchPct}% MATCH
                    </span>
                  </div>
                  <p className="mt-0.5 text-[15px] font-semibold leading-snug">
                    {m.fullLabel}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    via {m.family.parentName.split(" ")[0]} · {m.family.distanceMi} mi · {m.windowLabel}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setMessageMatch(m)}
                  className="flex-1 rounded-xl bg-zinc-100 py-2.5 text-xs font-semibold ring-1 ring-black/5"
                >
                  Message
                </button>
                <button
                  onClick={() => setCallMatch(m)}
                  className="flex-1 rounded-xl bg-transparent py-2.5 text-xs font-semibold text-accent ring-1 ring-accent/60 hover:bg-accent/5"
                >
                  Call
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <PlayNowSheet
        open={playNowOpen}
        onClose={() => setPlayNowOpen(false)}
        activeKidIds={activeKidIds}
        onToggleKid={toggleKid}
      />

      <FakeMessageSheet
        open={messageMatch !== null}
        onClose={() => setMessageMatch(null)}
        contactName={
          messageMatch
            ? `${messageMatch.family.parentName}${
                messageMatch.family.partnerName ? ` & ${messageMatch.family.partnerName}` : ""
              }`
            : ""
        }
        contactInitials={messageMatch?.family.initials ?? ""}
        contactColor={messageMatch?.family.color ?? "var(--accent)"}
        prefill={
          messageMatch
            ? `Hey ${messageMatch.family.parentName}! ${messageMatch.myKid.name} and ${messageMatch.theirKid.name} are both free ${messageMatch.windowLabel.toLowerCase()}. Want to set up a hangout?`
            : ""
        }
      />

      <FakeCallSheet
        open={callMatch !== null}
        onClose={() => setCallMatch(null)}
        contactName={
          callMatch
            ? `${callMatch.family.parentName}${
                callMatch.family.partnerName ? ` & ${callMatch.family.partnerName}` : ""
              }`
            : ""
        }
        contactInitials={callMatch?.family.initials ?? ""}
        contactColor={callMatch?.family.color ?? "var(--accent)"}
        phone={callMatch?.family.phone ?? ""}
      />

      <EditProfileSheet
        open={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
      />
    </PhoneFrame>
  );
}

