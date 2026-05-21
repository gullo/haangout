import { createFileRoute } from "@tanstack/react-router";
import { Bell, Lock, MapPin, HelpCircle, ChevronRight, LogOut, Plus } from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Avatar } from "@/components/Avatar";
import { me } from "@/lib/mockData";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

const settings = [
  { Icon: Bell, label: "Notifications", value: "On" },
  { Icon: MapPin, label: "Location & address", value: "248 Oak St" },
  { Icon: Lock, label: "Privacy & sharing", value: "Trusted only" },
  { Icon: HelpCircle, label: "Help & support" },
];

function ProfilePage() {
  return (
    <PhoneFrame>
      <header className="px-6 pt-4">
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
      </header>

      {/* Parent card */}
      <section className="mt-5 px-5">
        <div className="rounded-3xl bg-card p-5 ring-1 ring-black/5">
          <div className="flex items-center gap-4">
            <Avatar initials={me.initials} color="oklch(0.72 0.13 250)" size={64} />
            <div>
              <p className="text-lg font-semibold">Sarah Mitchell</p>
              <p className="text-xs text-muted-foreground">sarah@example.com</p>
              <p className="text-xs text-muted-foreground">(415) 555-2018</p>
            </div>
          </div>
          <button className="mt-4 w-full rounded-xl bg-zinc-100 py-2.5 text-xs font-semibold ring-1 ring-black/5">
            Edit profile
          </button>
        </div>
      </section>

      {/* Kids */}
      <section className="mt-6 px-5">
        <div className="mb-3 flex items-center justify-between px-1">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400">My kids</h2>
          <button className="text-xs font-semibold text-accent">Manage</button>
        </div>
        <ul className="space-y-2">
          {me.kids.map((k) => (
            <li
              key={k.id}
              className="flex items-center gap-3 rounded-2xl bg-card p-3 ring-1 ring-black/5"
            >
              <Avatar initials={k.initials} color={k.color} size={40} />
              <div className="flex-1">
                <p className="text-sm font-semibold">{k.name}</p>
                <p className="text-xs text-muted-foreground">Age {k.age}</p>
              </div>
              <ChevronRight className="size-4 text-zinc-300" />
            </li>
          ))}
          <li>
            <button className="flex w-full items-center gap-3 rounded-2xl border-2 border-dashed border-zinc-200 p-3 text-sm font-medium text-zinc-500">
              <div className="grid size-10 place-items-center rounded-full bg-zinc-50">
                <Plus className="size-4" />
              </div>
              Add a kid
            </button>
          </li>
        </ul>
      </section>

      {/* Settings */}
      <section className="mt-6 px-5">
        <h2 className="mb-3 px-1 text-sm font-bold uppercase tracking-wider text-zinc-400">
          Settings
        </h2>
        <ul className="overflow-hidden rounded-2xl bg-card ring-1 ring-black/5">
          {settings.map(({ Icon, label, value }, i) => (
            <li
              key={label}
              className={`flex items-center gap-3 px-4 py-3.5 ${
                i > 0 ? "border-t border-black/5" : ""
              }`}
            >
              <Icon className="size-4 text-zinc-500" />
              <span className="flex-1 text-sm font-medium">{label}</span>
              {value && <span className="text-xs text-muted-foreground">{value}</span>}
              <ChevronRight className="size-4 text-zinc-300" />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6 px-5">
        <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-100 py-3 text-sm font-semibold text-zinc-700 ring-1 ring-black/5">
          <LogOut className="size-4" /> Sign out
        </button>
      </section>
    </PhoneFrame>
  );
}
