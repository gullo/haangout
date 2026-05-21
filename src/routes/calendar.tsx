import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Avatar } from "@/components/Avatar";
import { me, blockLabels, dayLabels, initialSchedule } from "@/lib/mockData";

export const Route = createFileRoute("/calendar")({
  component: CalendarPage,
});

function CalendarPage() {
  const [activeKidIdx, setActiveKidIdx] = useState(0);
  const [schedule, setSchedule] = useState<number[][]>(initialSchedule.map((r) => [...r]));

  const activeKid = me.kids[activeKidIdx];

  function cycleCell(row: number, col: number) {
    setSchedule((s) =>
      s.map((r, ri) =>
        ri === row ? r.map((c, ci) => (ci === col ? ((c + 1) % 3) : c)) : r
      )
    );
  }

  function cellClass(v: number) {
    if (v === 0) return "bg-zinc-50 ring-1 ring-zinc-100";
    if (v === 1) return "bg-accent/15 ring-1 ring-accent/25";
    return "bg-accent ring-1 ring-accent-ring shadow-sm";
  }

  return (
    <PhoneFrame>
      <header className="px-6 pt-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Schedule</h1>
          <div className="flex items-center gap-1">
            <button className="grid size-8 place-items-center rounded-full bg-zinc-100">
              <ChevronLeft className="size-4" />
            </button>
            <span className="text-sm font-medium">Oct 14 – 20</span>
            <button className="grid size-8 place-items-center rounded-full bg-zinc-100">
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        {/* Kid switcher */}
        <div className="mt-5 flex gap-2">
          {me.kids.map((k, i) => (
            <button
              key={k.id}
              onClick={() => setActiveKidIdx(i)}
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
                i === activeKidIdx
                  ? "bg-zinc-900 text-white"
                  : "bg-zinc-100 text-zinc-600"
              }`}
            >
              <Avatar initials={k.initials} color={k.color} size={22} />
              {k.name}
            </button>
          ))}
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Tap a block to mark {activeKid.name}'s free time. Tap again for "maybe."
        </p>
      </header>

      {/* Grid */}
      <section className="mt-5 px-5">
        <div className="rounded-3xl bg-card p-4 ring-1 ring-black/5">
          <div className="grid grid-cols-[64px_repeat(7,1fr)] gap-1.5 pb-2">
            <div />
            {dayLabels.map((d, i) => (
              <span
                key={i}
                className={`text-center text-[10px] font-bold uppercase ${
                  i >= 5 ? "text-accent" : "text-zinc-400"
                }`}
              >
                {d}
              </span>
            ))}
          </div>

          {schedule.map((row, ri) => (
            <div key={ri} className="grid grid-cols-[64px_repeat(7,1fr)] gap-1.5 py-1">
              <span className="self-center text-[11px] font-medium text-zinc-500">
                {blockLabels[ri]}
              </span>
              {row.map((v, ci) => (
                <button
                  key={ci}
                  onClick={() => cycleCell(ri, ci)}
                  className={`h-11 rounded-lg transition-all ${cellClass(v)}`}
                  aria-label={`${blockLabels[ri]} ${dayLabels[ci]}`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-3 rounded bg-accent ring-1 ring-accent-ring" /> Free
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-3 rounded bg-accent/15 ring-1 ring-accent/25" /> Maybe
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-3 rounded bg-zinc-100 ring-1 ring-zinc-200" /> Busy
          </span>
        </div>
      </section>

      <section className="mt-6 px-6">
        <button className="w-full rounded-2xl bg-zinc-900 py-4 text-sm font-semibold text-white">
          Save schedule
        </button>
      </section>
    </PhoneFrame>
  );
}
