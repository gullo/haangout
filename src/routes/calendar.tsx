import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Pencil, Trash2, Repeat } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Avatar } from "@/components/Avatar";
import { RecurrenceSheet } from "@/components/RecurrenceSheet";
import {
  blockLabels,
  dayLabels,
  addDays,
  getWeekStart,
  formatWeekRange,
  type Recurrence,
} from "@/lib/mockData";
import { useKids } from "@/lib/kidsContext";

export const Route = createFileRoute("/calendar")({
  component: CalendarPage,
});

const dayFull = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function CalendarPage() {
  const {
    kids,
    schedules,
    setSchedules,
    recurrences,
    addRecurrence,
    updateRecurrence,
    removeRecurrence,
    resolveCell,
  } = useKids();
  const [activeKidId, setActiveKidId] = useState<string>(kids[0]?.id ?? "");
  const [weekStart, setWeekStart] = useState<Date | null>(null);
  useEffect(() => {
    setWeekStart(getWeekStart(new Date()));
  }, []);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editing, setEditing] = useState<Recurrence | null>(null);

  const activeKid = kids.find((k) => k.id === activeKidId) ?? kids[0];

  const kidRecurrences = useMemo(
    () => recurrences.filter((r) => r.kidId === activeKid?.id),
    [recurrences, activeKid?.id],
  );

  function cycleCell(row: number, col: number) {
    if (!activeKid) return;
    const current = schedules[activeKid.id]?.[row]?.[col] ?? 0;
    const next = (current + 1) % 3;
    setSchedules((prev) => {
      const grid = prev[activeKid.id] ?? blockLabels.map(() => dayLabels.map(() => 0));
      return {
        ...prev,
        [activeKid.id]: grid.map((r, ri) =>
          ri === row ? r.map((c, ci) => (ci === col ? next : c)) : r,
        ),
      };
    });
  }

  function cellStyle(v: number, fromRecurrence: boolean): React.CSSProperties {
    if (!activeKid || v === 0) return {};
    const base: React.CSSProperties =
      v === 1
        ? {
            background: `color-mix(in oklab, ${activeKid.color} 22%, transparent)`,
            boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${activeKid.color} 35%, transparent)`,
          }
        : {
            background: activeKid.color,
            boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${activeKid.color} 70%, white)`,
          };
    if (fromRecurrence) {
      base.backgroundImage =
        "repeating-linear-gradient(135deg, rgba(255,255,255,0.45) 0 2px, transparent 2px 7px)";
    }
    return base;
  }

  function openAdd() {
    setEditing(null);
    setSheetOpen(true);
  }

  function openEdit(r: Recurrence) {
    setEditing(r);
    setSheetOpen(true);
  }

  function handleSave(rule: Omit<Recurrence, "id"> | Recurrence) {
    if ("id" in rule) updateRecurrence(rule.id, rule);
    else addRecurrence(rule);
  }

  if (!activeKid || !weekStart) {
    return (
      <PhoneFrame>
        <div className="p-8 text-center text-sm text-muted-foreground">
          Add a kid in your profile to start scheduling.
        </div>
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <header className="px-6 pt-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Schedule</h1>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setWeekStart((d) => addDays(d ?? new Date(), -7))}
              className="grid size-8 place-items-center rounded-full bg-zinc-100"
              aria-label="Previous week"
            >
              <ChevronLeft className="size-4" />
            </button>
            <span className="text-sm font-medium">{formatWeekRange(weekStart)}</span>
            <button
              onClick={() => setWeekStart((d) => addDays(d ?? new Date(), 7))}
              className="grid size-8 place-items-center rounded-full bg-zinc-100"
              aria-label="Next week"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        {/* Kid switcher */}
        <div className="mt-5 flex flex-wrap gap-2">
          {kids.map((k) => {
            const active = k.id === activeKid.id;
            return (
              <button
                key={k.id}
                onClick={() => setActiveKidId(k.id)}
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
          Tap a block to mark {activeKid.name}&apos;s free time. Striped cells come from recurring rules.
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

          {blockLabels.map((blockName, ri) => (
            <div key={ri} className="grid grid-cols-[64px_repeat(7,1fr)] gap-1.5 py-1">
              <span className="self-center text-[11px] font-medium text-zinc-500">
                {blockName}
              </span>
              {dayLabels.map((_, ci) => {
                const { value, fromRecurrence } = resolveCell(activeKid.id, weekStart, ri, ci);
                return (
                  <button
                    key={ci}
                    onClick={() => cycleCell(ri, ci)}
                    className="h-11 rounded-lg bg-zinc-50 ring-1 ring-zinc-100 transition-all"
                    style={cellStyle(value, fromRecurrence)}
                    aria-label={`${blockName} ${dayFull[ci]}`}
                  />
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-3 rounded" style={{ background: activeKid.color }} /> Free
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
            <span
              className="size-3 rounded"
              style={{
                background: activeKid.color,
                backgroundImage:
                  "repeating-linear-gradient(135deg, rgba(255,255,255,0.55) 0 2px, transparent 2px 7px)",
              }}
            />{" "}
            Recurring
          </span>
        </div>
      </section>

      {/* Recurring availability */}
      <section className="mt-6 px-5">
        <div className="mb-3 flex items-center justify-between px-1">
          <h2 className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider text-zinc-400">
            <Repeat className="size-3.5" /> Recurring availability
          </h2>
          <button onClick={openAdd} className="text-xs font-semibold text-accent">
            + Add
          </button>
        </div>

        {kidRecurrences.length === 0 ? (
          <button
            onClick={openAdd}
            className="flex w-full items-center gap-3 rounded-2xl border-2 border-dashed border-zinc-200 p-4 text-left"
          >
            <div className="grid size-10 place-items-center rounded-full bg-zinc-50">
              <Plus className="size-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-700">
                Add a recurring rule for {activeKid.name}
              </p>
              <p className="text-[11px] text-muted-foreground">
                e.g. free MWF afternoons
              </p>
            </div>
          </button>
        ) : (
          <ul className="space-y-2">
            {kidRecurrences.map((r) => (
              <li
                key={r.id}
                className="flex items-center gap-3 rounded-2xl bg-card p-3 ring-1 ring-black/5"
              >
                <span
                  className="grid size-9 shrink-0 place-items-center rounded-xl text-[10px] font-bold uppercase text-white"
                  style={{ background: activeKid.color }}
                >
                  {r.status === 2 ? "Free" : "Maybe"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {r.days.map((d) => dayFull[d]).join(" · ")}
                  </p>
                  <p className="truncate text-[11px] text-muted-foreground">
                    {r.blocks.map((b) => blockLabels[b]).join(", ")} · From{" "}
                    {formatDate(r.startDate)} ·{" "}
                    {r.endDate ? `Until ${formatDate(r.endDate)}` : "Forever"}
                  </p>
                </div>
                <button
                  onClick={() => openEdit(r)}
                  className="grid size-8 place-items-center rounded-full bg-zinc-50 ring-1 ring-black/5"
                  aria-label="Edit rule"
                >
                  <Pencil className="size-3.5 text-zinc-600" />
                </button>
                <button
                  onClick={() => removeRecurrence(r.id)}
                  className="grid size-8 place-items-center rounded-full bg-zinc-50 ring-1 ring-black/5"
                  aria-label="Delete rule"
                >
                  <Trash2 className="size-3.5 text-destructive" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-6 px-6">
        <button className="w-full rounded-2xl bg-zinc-900 py-4 text-sm font-semibold text-white">
          Save schedule
        </button>
      </section>

      <RecurrenceSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        kidId={activeKid.id}
        kidColor={activeKid.color}
        editing={editing}
        onSave={handleSave}
      />
    </PhoneFrame>
  );
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, (m ?? 1) - 1, d ?? 1);
  return dt.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
