import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Avatar } from "@/components/Avatar";
import { blockLabels, dayLabels } from "@/lib/mockData";
import { useKids } from "@/lib/kidsContext";

export const Route = createFileRoute("/calendar")({
  component: CalendarPage,
});

function CalendarPage() {
  const { kids, schedules, setSchedules } = useKids();
  const [activeKidId, setActiveKidId] = useState<string>(kids[0]?.id ?? "");

  const activeKid = kids.find((k) => k.id === activeKidId) ?? kids[0];
  const grid =
    (activeKid && schedules[activeKid.id]) ??
    blockLabels.map(() => dayLabels.map(() => 0));

  function cycleCell(row: number, col: number) {
    setSchedules((prev) => ({
      ...prev,
      [activeKid.id]: prev[activeKid.id].map((r, ri) =>
        ri === row ? r.map((c, ci) => (ci === col ? (c + 1) % 3 : c)) : r
      ),
    }));
  }

  function cellStyle(v: number): React.CSSProperties {
    if (v === 0) return {};
    if (v === 1)
      return {
        background: `color-mix(in oklab, ${activeKid.color} 22%, transparent)`,
        boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${activeKid.color} 35%, transparent)`,
      };
    return {
      background: activeKid.color,
      boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${activeKid.color} 70%, white)`,
    };
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
          {me.kids.map((k, i) => {
            const active = i === activeKidIdx;
            return (
              <button
                key={k.id}
                onClick={() => setActiveKidIdx(i)}
                className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors"
                style={
                  active
                    ? { background: k.color, color: "white" }
                    : { background: "oklch(0.95 0.005 270)", color: "oklch(0.4 0.02 270)" }
                }
              >
                <Avatar
                  initials={k.initials}
                  color={active ? "rgba(255,255,255,0.25)" : k.color}
                  size={22}
                />
                {k.name}
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Tap a block to mark {activeKid.name}&apos;s free time. Tap again for &ldquo;maybe.&rdquo;
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
                className="text-center text-[10px] font-bold uppercase"
                style={{
                  color: i >= 5 ? activeKid.color : "oklch(0.6 0.02 270)",
                }}
              >
                {d}
              </span>
            ))}
          </div>

          {grid.map((row, ri) => (
            <div key={ri} className="grid grid-cols-[64px_repeat(7,1fr)] gap-1.5 py-1">
              <span className="self-center text-[11px] font-medium text-zinc-500">
                {blockLabels[ri]}
              </span>
              {row.map((v, ci) => (
                <button
                  key={ci}
                  onClick={() => cycleCell(ri, ci)}
                  className="h-11 rounded-lg bg-zinc-50 ring-1 ring-zinc-100 transition-all"
                  style={cellStyle(v)}
                  aria-label={`${blockLabels[ri]} ${dayLabels[ci]}`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span
              className="size-3 rounded"
              style={{ background: activeKid.color }}
            />{" "}
            Free
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="size-3 rounded"
              style={{
                background: `color-mix(in oklab, ${activeKid.color} 22%, transparent)`,
              }}
            />{" "}
            Maybe
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
