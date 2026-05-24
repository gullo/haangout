import { useEffect, useRef, useState } from "react";
import { X, MapPin, Phone, MessageCircle, Check, Clock, Sunrise, Sun, Sunset, Bell } from "lucide-react";
import { Avatar } from "./Avatar";
import { playNowFamilies, type Kid } from "@/lib/mockData";
import { kidsBackground } from "@/lib/kidColors";
import { useKids } from "@/lib/kidsContext";

type Props = {
  open: boolean;
  onClose: () => void;
  activeKidIds: string[];
  onToggleKid: (kidId: string) => void;
};

type Mode = "now" | "today";
type DayPart = "morning" | "afternoon" | "evening";

const HOUR_OPTIONS = [1, 2, 3, 4];
const DAYPARTS: { id: DayPart; label: string; range: string; icon: typeof Sunrise }[] = [
  { id: "morning", label: "Morning", range: "8a–12p", icon: Sunrise },
  { id: "afternoon", label: "Afternoon", range: "12p–5p", icon: Sun },
  { id: "evening", label: "Evening", range: "5p–8p", icon: Sunset },
];

type KidAvail = { mode: Mode; hours: number; dayParts: DayPart[] };
const DEFAULT_AVAIL: KidAvail = { mode: "now", hours: 2, dayParts: ["afternoon"] };

export function PlayNowSheet({ open, onClose, activeKidIds, onToggleKid }: Props) {
  const { kids } = useKids();
  const [avail, setAvail] = useState<Record<string, KidAvail>>({});
  const [pingedKidIds, setPingedKidIds] = useState<string[]>([]);
  const [notice, setNotice] = useState<{ kidName: string; parentName: string } | null>(null);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function pingKid(kidName: string, parentName: string, kidId: string) {
    setPingedKidIds((prev) => (prev.includes(kidId) ? prev : [...prev, kidId]));
    setNotice({ kidName, parentName });
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(null), 3800);
  }

  useEffect(() => () => {
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
  }, []);
  const getAvail = (id: string): KidAvail => avail[id] ?? DEFAULT_AVAIL;
  const updateAvail = (id: string, patch: Partial<KidAvail>) =>
    setAvail((cur) => ({ ...cur, [id]: { ...getAvail(id), ...patch } }));
  const toggleDayPart = (id: string, dp: DayPart) => {
    const cur = getAvail(id).dayParts;
    updateAvail(id, {
      dayParts: cur.includes(dp) ? cur.filter((d) => d !== dp) : [...cur, dp],
    });
  };

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const activeKids: Kid[] = kids.filter((k) => activeKidIds.includes(k.id));
  const headerBg = kidsBackground(activeKids);
  const isLive = activeKids.length > 0;

  const summarizeKid = (k: Kid) => {
    const a = getAvail(k.id);
    if (a.mode === "now") return `${k.name} · ${a.hours}h`;
    if (a.dayParts.length === 0) return `${k.name} · pick time`;
    return `${k.name} · ${a.dayParts.map((d) => d.slice(0, 3)).join("+")}`;
  };
  const windowLabel = isLive ? activeKids.map(summarizeKid).join(" • ") : "";

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 z-20 bg-zinc-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      {/* Sheet */}
      <div
        className={`absolute inset-x-0 bottom-0 z-30 overflow-hidden rounded-t-[2rem] bg-page pb-10 shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "92%" }}
      >
        {/* Colored header reflecting active kids */}
        <div
          className="relative px-6 pt-3 pb-5 text-white transition-[background] duration-500"
          style={{ background: headerBg }}
        >
          <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-white/40" />

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`size-2 rounded-full bg-white ${isLive ? "animate-pulse" : "opacity-50"}`}
                />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  {isLive ? "You're live" : "Not live"}
                </span>
              </div>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                {isLive ? "Who's free now?" : "Activate Hangout Now"}
              </h2>
              <p className="text-sm text-white/80">
                {isLive ? windowLabel : "Pick which kids are free to play"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="grid size-9 place-items-center rounded-full bg-white/20 text-white"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Kid toggle chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {kids.map((k) => {
              const active = activeKidIds.includes(k.id);
              return (
                <button
                  key={k.id}
                  onClick={() => onToggleKid(k.id)}
                  className={`flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3 text-xs font-semibold transition ${
                    active
                      ? "bg-white text-zinc-900 shadow-sm"
                      : "bg-white/15 text-white ring-1 ring-white/30"
                  }`}
                >
                  <Avatar initials={k.initials} color={k.color} size={22} />
                  {k.name}
                  {active && <Check className="size-3.5" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="px-6 pt-5">
          {isLive ? (
            <>
              {/* Per-kid availability cards */}
              <div className="space-y-3">
                {activeKids.map((k) => {
                  const a = getAvail(k.id);
                  return (
                    <div
                      key={k.id}
                      className="rounded-2xl bg-card p-4 ring-1 ring-black/5"
                      style={{ borderLeft: `4px solid ${k.color}` }}
                    >
                      <div className="mb-3 flex items-center gap-2">
                        <Avatar initials={k.initials} color={k.color} size={28} />
                        <p className="text-sm font-semibold">{k.name}</p>
                      </div>

                      <div className="flex rounded-xl bg-zinc-100 p-1 text-[11px] font-semibold">
                        <button
                          onClick={() => updateAvail(k.id, { mode: "now" })}
                          className={`flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 transition ${
                            a.mode === "now"
                              ? "bg-white text-zinc-900 shadow-sm"
                              : "text-zinc-500"
                          }`}
                        >
                          <Clock className="size-3" /> Right now
                        </button>
                        <button
                          onClick={() => updateAvail(k.id, { mode: "today" })}
                          className={`flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 transition ${
                            a.mode === "today"
                              ? "bg-white text-zinc-900 shadow-sm"
                              : "text-zinc-500"
                          }`}
                        >
                          <Sun className="size-3" /> Later today
                        </button>
                      </div>

                      {a.mode === "now" ? (
                        <div className="mt-3 flex gap-1.5">
                          {HOUR_OPTIONS.map((h) => {
                            const active = a.hours === h;
                            return (
                              <button
                                key={h}
                                onClick={() => updateAvail(k.id, { hours: h })}
                                className={`flex-1 rounded-xl py-2 text-xs font-semibold ring-1 transition ${
                                  active
                                    ? "text-white ring-transparent"
                                    : "bg-page text-zinc-700 ring-black/5"
                                }`}
                                style={active ? { background: k.color } : undefined}
                              >
                                {h}h
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="mt-3 grid grid-cols-3 gap-1.5">
                          {DAYPARTS.map(({ id, label, range, icon: Icon }) => {
                            const active = a.dayParts.includes(id);
                            return (
                              <button
                                key={id}
                                onClick={() => toggleDayPart(k.id, id)}
                                className={`flex flex-col items-center gap-0.5 rounded-xl py-2 ring-1 transition ${
                                  active
                                    ? "text-white ring-transparent"
                                    : "bg-page text-zinc-700 ring-black/5"
                                }`}
                                style={active ? { background: k.color } : undefined}
                              >
                                <Icon className="size-3.5" />
                                <span className="text-[11px] font-semibold">{label}</span>
                                <span
                                  className={`text-[9px] ${active ? "text-white/80" : "text-muted-foreground"}`}
                                >
                                  {range}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <p className="mt-5 mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Friends who match
              </p>
              <ul className="space-y-3">
                {playNowFamilies.map(({ kid, family, status, detail }) => (
                  <li
                    key={kid.id}
                    className={`flex items-center gap-4 rounded-2xl bg-card p-4 ring-1 ring-black/5 ${
                      status === "soon-busy" ? "opacity-60" : ""
                    }`}
                  >
                    <div className="relative">
                      <Avatar initials={kid.initials} color={kid.color} size={48} />
                      {status === "free" && (
                        <span className="absolute -right-0.5 -bottom-0.5 size-3.5 rounded-full bg-success ring-2 ring-card" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {kid.name}{" "}
                        <span className="font-normal text-zinc-400">({kid.age}y)</span>
                      </p>
                      <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                        <MapPin className="size-3" /> {detail}
                      </p>
                    </div>
                    {status === "free" ? (
                      <button
                        onClick={() => pingKid(kid.name, family.parentName, kid.id)}
                        disabled={pingedKidIds.includes(kid.id)}
                        className={`rounded-full px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider transition ${
                          pingedKidIds.includes(kid.id)
                            ? "bg-success/15 text-success"
                            : "bg-accent-soft text-accent active:scale-95"
                        }`}
                      >
                        {pingedKidIds.includes(kid.id) ? "Pinged" : "Ping"}
                      </button>
                    ) : (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                        Soon
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex gap-2">
                <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-zinc-100 py-3 text-sm font-semibold">
                  <MessageCircle className="size-4" /> Group text
                </button>
                <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-zinc-100 py-3 text-sm font-semibold">
                  <Phone className="size-4" /> Call first
                </button>
              </div>

              <button
                onClick={() => {
                  // End Play Now: clear all active kids
                  activeKidIds.forEach(onToggleKid);
                }}
                className="mt-3 w-full rounded-2xl border border-accent/20 bg-accent-soft py-3 text-sm font-bold text-accent"
              >
                End Hangout Now
              </button>
            </>
          ) : (
            <div className="rounded-2xl bg-card p-5 text-center text-sm text-muted-foreground ring-1 ring-black/5">
              Tap a kid above to mark them as free to play right now.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
