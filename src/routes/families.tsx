import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Phone, MapPin, MessageCircle, Heart, Trash2 } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Avatar } from "@/components/Avatar";
import { AddFamilySheet } from "@/components/AddFamilySheet";
import { useFamilies } from "@/lib/familiesContext";
import { useKids } from "@/lib/kidsContext";
import type { Family, Kid } from "@/lib/mockData";

export const Route = createFileRoute("/families")({
  component: FamiliesPage,
});

function myKidsInFamilyFor(family: Family, myKids: Kid[]): Kid[] {
  return family.friendships
    .map((fr) => myKids.find((k) => k.id === fr.myKidId))
    .filter((k): k is Kid => Boolean(k));
}

function FamiliesPage() {
  const { families, addFamily, removeFamily } = useFamilies();
  const { kids: myKids } = useKids();
  const [addOpen, setAddOpen] = useState(false);
  return (
    <PhoneFrame>
      <header className="px-6 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Families</h1>
            <p className="text-sm text-muted-foreground">
              {families.length} trusted parent{families.length === 1 ? "" : "s"}
            </p>
          </div>
          <button
            onClick={() => setAddOpen(true)}
            className="grid size-11 place-items-center rounded-full bg-accent text-accent-foreground shadow-[var(--shadow-pop)]"
            aria-label="Add family"
          >
            <Plus className="size-5" />
          </button>
        </div>

        <input
          placeholder="Search families…"
          className="mt-4 w-full rounded-2xl bg-zinc-100 px-4 py-3 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-accent/40"
        />
      </header>

      <ul className="mt-5 space-y-3 px-5">
        {families.map((f) => {
          const myKidsFriends = myKidsInFamilyFor(f, myKids);
          return (
            <li key={f.id} className="rounded-3xl bg-card p-5 ring-1 ring-black/5">
              <div className="flex items-start gap-4">
                <Avatar initials={f.initials} color={f.color} size={52} />
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-semibold leading-tight">
                    {f.parentName}
                    {f.partnerName && (
                      <span className="font-normal text-zinc-400"> &amp; {f.partnerName}</span>
                    )}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3" />
                    {f.address} · {f.distanceMi} mi
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <Phone className="size-3" />
                    {f.phone}
                  </p>
                </div>
              </div>

              {/* Their kids */}
              <div className="mt-4 flex flex-wrap gap-2">
                {f.kids.map((k) => (
                  <div
                    key={k.id}
                    className="flex items-center gap-2 rounded-full bg-zinc-50 py-1.5 pl-1.5 pr-3 ring-1 ring-black/5"
                  >
                    <Avatar initials={k.initials} color={k.color} size={22} />
                    <span className="text-xs font-semibold">
                      {k.name} <span className="font-normal text-zinc-400">· {k.age}y</span>
                    </span>
                  </div>
                ))}
              </div>

              {/* Friendship pairs */}
              <div className="mt-3 flex items-center gap-2 rounded-2xl bg-accent-soft px-3 py-2">
                <Heart className="size-3.5 shrink-0 text-accent" fill="currentColor" />
                <span className="text-[11px] font-semibold text-accent">
                  Friends with{" "}
                  {myKidsFriends.length
                    ? myKidsFriends.map((k) => k.name).join(", ")
                    : "—"}
                </span>
                <button className="ml-auto text-[11px] font-semibold text-accent underline-offset-2 hover:underline">
                  Edit
                </button>
              </div>

              <div className="mt-3 flex gap-2">
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-zinc-100 py-2.5 text-xs font-semibold ring-1 ring-black/5">
                  <MessageCircle className="size-3.5" /> Message
                </button>
                <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-zinc-100 py-2.5 text-xs font-semibold ring-1 ring-black/5">
                  <Phone className="size-3.5" /> Call
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </PhoneFrame>
  );
}
