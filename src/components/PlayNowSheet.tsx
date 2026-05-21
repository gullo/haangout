import { useEffect } from "react";
import { X, MapPin, Phone, MessageCircle } from "lucide-react";
import { Avatar } from "./Avatar";
import { playNowFamilies } from "@/lib/mockData";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function PlayNowSheet({ open, onClose }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

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
        className={`absolute inset-x-0 bottom-0 z-30 rounded-t-[2rem] bg-page px-6 pt-3 pb-10 shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "82%" }}
      >
        <div className="mx-auto mb-5 h-1.5 w-10 rounded-full bg-zinc-200" />

        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="size-2 animate-pulse rounded-full bg-success" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-success">
                You're live
              </span>
            </div>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">Who's free now?</h2>
            <p className="text-sm text-muted-foreground">Active for the next 2 hours</p>
          </div>
          <button
            onClick={onClose}
            className="grid size-9 place-items-center rounded-full bg-zinc-100 text-zinc-600"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

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
                  {kid.name} <span className="font-normal text-zinc-400">({kid.age}y)</span>
                </p>
                <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                  <MapPin className="size-3" /> {detail}
                </p>
              </div>
              {status === "free" ? (
                <button className="rounded-full bg-accent-soft px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider text-accent">
                  Ping
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
          onClick={onClose}
          className="mt-3 w-full rounded-2xl border border-accent/20 bg-accent-soft py-3 text-sm font-bold text-accent"
        >
          End Play Now
        </button>
      </div>
    </>
  );
}
