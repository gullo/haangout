import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, ChevronRight } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Avatar } from "@/components/Avatar";
import { PlayNowSheet } from "@/components/PlayNowSheet";
import { me, todayMatches } from "@/lib/mockData";
import { kidsBackground } from "@/lib/kidColors";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [playNowOpen, setPlayNowOpen] = useState(false);
  const [activeKidIds, setActiveKidIds] = useState<string[]>([]);
  const activeKids = me.kids.filter((k) => activeKidIds.includes(k.id));
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
            <h1 className="text-2xl font-semibold tracking-tight">Hi, {me.name}</h1>
          </div>
          <Avatar initials={me.initials} color="oklch(0.72 0.13 250)" size={48} />
        </div>
      </header>

      {/* Play Now CTA */}
      <section className="px-6 pt-7">
        <button
          onClick={() => setPlayNowOpen(true)}
          className="group relative flex w-full items-center justify-between overflow-hidden rounded-3xl bg-accent px-6 py-5 text-accent-foreground shadow-[var(--shadow-pop)] transition-transform active:scale-[0.98]"
        >
          <div className="flex flex-col items-start">
            <span className="flex items-center gap-1.5 text-xs font-medium opacity-90">
              <Sparkles className="size-3.5" /> Spontaneous play
            </span>
            <span className="mt-0.5 text-xl font-semibold">Play Now</span>
          </div>
          <div className="flex -space-x-3">
            {me.kids.map((k) => (
              <Avatar
                key={k.id}
                initials={k.initials}
                color={k.color}
                size={40}
                className="border-2 border-accent"
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
          <p className="text-2xl font-semibold tracking-tight">4</p>
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
                <button className="flex-1 rounded-xl bg-zinc-100 py-2.5 text-xs font-semibold ring-1 ring-black/5">
                  Message
                </button>
                <button className="flex-1 rounded-xl bg-accent py-2.5 text-xs font-semibold text-accent-foreground ring-1 ring-accent-ring">
                  Invite
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <PlayNowSheet open={playNowOpen} onClose={() => setPlayNowOpen(false)} />
    </PhoneFrame>
  );
}
