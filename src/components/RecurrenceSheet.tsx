import { useEffect, useState } from "react";
import { X, Check } from "lucide-react";
import {
  blockLabels,
  dayLabels,
  isoDate,
  blocksForTimeRange,
  type Recurrence,
} from "@/lib/mockData";

type Props = {
  open: boolean;
  onClose: () => void;
  kidId: string;
  kidColor: string;
  editing: Recurrence | null;
  onSave: (rule: Omit<Recurrence, "id"> | Recurrence) => void;
};

const dayFullLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type Mode = "blocks" | "time";

export function RecurrenceSheet({ open, onClose, kidId, kidColor, editing, onSave }: Props) {
  const [status, setStatus] = useState<1 | 2>(2);
  const [days, setDays] = useState<number[]>([]);
  const [blocks, setBlocks] = useState<number[]>([]);
  const [mode, setMode] = useState<Mode>("blocks");
  const [startTime, setStartTime] = useState<string>("15:00");
  const [endTime, setEndTime] = useState<string>("17:00");
  const [startDate, setStartDate] = useState<string>(isoDate(new Date()));
  const [forever, setForever] = useState(true);
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    if (!open) return;
    if (editing) {
      setStatus(editing.status);
      setDays(editing.days);
      setBlocks(editing.blocks);
      setStartDate(editing.startDate);
      setForever(editing.endDate === null);
      setEndDate(editing.endDate ?? "");
      if (editing.timeRange) {
        setMode("time");
        setStartTime(editing.timeRange.start);
        setEndTime(editing.timeRange.end);
      } else {
        setMode("blocks");
        setStartTime("15:00");
        setEndTime("17:00");
      }
    } else {
      setStatus(2);
      setDays([]);
      setBlocks([]);
      setMode("blocks");
      setStartTime("15:00");
      setEndTime("17:00");
      setStartDate(isoDate(new Date()));
      setForever(true);
      setEndDate("");
    }
  }, [open, editing]);

  if (!open) return null;

  const derivedBlocks = mode === "time" ? blocksForTimeRange(startTime, endTime) : blocks;
  const timeValid = mode === "blocks" || (endTime > startTime && derivedBlocks.length > 0);
  const canSave = days.length > 0 && derivedBlocks.length > 0 && timeValid;

  function toggle<T>(arr: T[], v: T): T[] {
    return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
  }

  function save() {
    if (!canSave) return;
    const payload: Omit<Recurrence, "id"> = {
      kidId,
      status,
      days: [...days].sort((a, b) => a - b),
      blocks: [...derivedBlocks].sort((a, b) => a - b),
      startDate,
      endDate: forever ? null : endDate || null,
      timeRange: mode === "time" ? { start: startTime, end: endTime } : null,
    };
    if (editing) onSave({ ...payload, id: editing.id });
    else onSave(payload);
    onClose();
  }

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="mt-auto" onClick={(e) => e.stopPropagation()}>
        <div className="max-h-[90%] overflow-y-auto rounded-t-3xl bg-card pb-8 shadow-[0_-12px_40px_rgba(0,0,0,0.18)]">
          <div className="flex items-center justify-between px-6 pt-4 pb-2">
            <div className="size-8" />
            <span className="h-1 w-10 rounded-full bg-zinc-200" />
            <button
              onClick={onClose}
              className="grid size-8 place-items-center rounded-full bg-zinc-100"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="px-6">
            <h2 className="text-xl font-semibold tracking-tight">
              {editing ? "Edit recurring" : "Add recurring"}
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Auto-fill the calendar for the days and times you pick.
            </p>
          </div>

          <div className="mt-5 space-y-5 px-5">
            {/* Status */}
            <div>
              <Label>Status</Label>
              <div className="flex gap-2">
                {([
                  { v: 2 as const, label: "Free" },
                  { v: 1 as const, label: "Maybe" },
                ]).map((opt) => {
                  const active = status === opt.v;
                  return (
                    <button
                      key={opt.v}
                      onClick={() => setStatus(opt.v)}
                      className="flex-1 rounded-xl py-2.5 text-sm font-semibold ring-1 transition"
                      style={
                        active
                          ? opt.v === 2
                            ? { background: kidColor, color: "white", boxShadow: `inset 0 0 0 1px ${kidColor}` }
                            : {
                                background: `color-mix(in oklab, ${kidColor} 22%, transparent)`,
                                color: "oklch(0.25 0.02 270)",
                                boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${kidColor} 35%, transparent)`,
                              }
                          : { background: "white", color: "oklch(0.4 0.02 270)" }
                      }
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Days */}
            <div>
              <Label>Days</Label>
              <div className="flex gap-1.5">
                {dayLabels.map((d, i) => {
                  const active = days.includes(i);
                  return (
                    <button
                      key={i}
                      onClick={() => setDays(toggle(days, i))}
                      aria-label={dayFullLabels[i]}
                      className="grid h-10 flex-1 place-items-center rounded-xl text-sm font-bold ring-1 transition"
                      style={
                        active
                          ? { background: kidColor, color: "white", boxShadow: `inset 0 0 0 1px ${kidColor}` }
                          : { background: "white", color: "oklch(0.4 0.02 270)" }
                      }
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* When */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  When
                </span>
                <div className="flex rounded-full bg-zinc-100 p-0.5 text-[11px] font-semibold">
                  <button
                    onClick={() => setMode("blocks")}
                    className={`rounded-full px-3 py-1 transition ${
                      mode === "blocks" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500"
                    }`}
                  >
                    Time blocks
                  </button>
                  <button
                    onClick={() => setMode("time")}
                    className={`rounded-full px-3 py-1 transition ${
                      mode === "time" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500"
                    }`}
                  >
                    Specific time
                  </button>
                </div>
              </div>

              {mode === "blocks" ? (
                <div className="grid grid-cols-2 gap-2">
                  {blockLabels.map((b, i) => {
                    const active = blocks.includes(i);
                    return (
                      <button
                        key={b}
                        onClick={() => setBlocks(toggle(blocks, i))}
                        className="rounded-xl py-2.5 text-sm font-semibold ring-1 transition"
                        style={
                          active
                            ? { background: kidColor, color: "white", boxShadow: `inset 0 0 0 1px ${kidColor}` }
                            : { background: "white", color: "oklch(0.4 0.02 270)" }
                        }
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                        From
                      </span>
                      <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full rounded-xl bg-zinc-50 px-3 py-2.5 text-sm ring-1 ring-black/5 outline-none focus:ring-accent"
                      />
                    </div>
                    <div>
                      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                        To
                      </span>
                      <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full rounded-xl bg-zinc-50 px-3 py-2.5 text-sm ring-1 ring-black/5 outline-none focus:ring-accent"
                      />
                    </div>
                  </div>
                  {!timeValid ? (
                    <p className="text-[11px] text-destructive">End time must be after start time.</p>
                  ) : (
                    <p className="text-[11px] text-muted-foreground">
                      Covers: {derivedBlocks.map((i) => blockLabels[i]).join(", ")}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Starts</Label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-xl bg-zinc-50 px-3 py-2.5 text-sm ring-1 ring-black/5 outline-none focus:ring-accent"
                />
              </div>
              <div>
                <Label>Ends</Label>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setForever((v) => !v)}
                    className="flex items-center justify-between rounded-xl bg-zinc-50 px-3 py-2.5 text-sm font-medium ring-1 ring-black/5"
                  >
                    <span>Forever</span>
                    <span
                      className={`grid size-5 place-items-center rounded-md ring-1 ${
                        forever ? "bg-accent ring-accent text-accent-foreground" : "bg-white ring-black/15"
                      }`}
                    >
                      {forever && <Check className="size-3" />}
                    </span>
                  </button>
                  {!forever && (
                    <input
                      type="date"
                      value={endDate}
                      min={startDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full rounded-xl bg-zinc-50 px-3 py-2.5 text-sm ring-1 ring-black/5 outline-none focus:ring-accent"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={onClose}
                className="flex-1 rounded-2xl bg-zinc-100 py-3 text-sm font-semibold ring-1 ring-black/5"
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={!canSave}
                className="flex-1 rounded-2xl bg-accent py-3 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-pop)] disabled:opacity-40"
              >
                {editing ? "Save" : "Add rule"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
      {children}
    </span>
  );
}
