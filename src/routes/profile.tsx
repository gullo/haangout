import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bell, Lock, MapPin, HelpCircle, ChevronRight, LogOut, Plus,
  Link as LinkIcon, Copy, Check, Share2, MessageSquare, Mail,
} from "lucide-react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Avatar } from "@/components/Avatar";
import { KidsManagerSheet } from "@/components/KidsManagerSheet";
import { me, kidColorPalette } from "@/lib/mockData";
import { useKids } from "@/lib/kidsContext";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

const settings = [
  { Icon: Bell, label: "Notifications", value: "On" },
  { Icon: MapPin, label: "Location & address", value: "248 Oak St" },
  { Icon: Lock, label: "Privacy & sharing", value: "Trusted only" },
  { Icon: HelpCircle, label: "Help & support" },
];

const INVITE_LINK = "playdate.app/i/sarah-2X9F";

function ProfilePage() {
  const [copied, setCopied] = useState(false);
  const { kids, setKids } = useKids();
  const [managerOpen, setManagerOpen] = useState(false);
  const [editKidId, setEditKidId] = useState<string | null>(null);

  function openManager(kidId: string | null = null) {
    setEditKidId(kidId);
    setManagerOpen(true);
  }


  function copyLink() {
    navigator.clipboard?.writeText(`https://${INVITE_LINK}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <PhoneFrame>
      <header className="px-6 pt-4">
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
      </header>

      {/* Parent card */}
      <section className="mt-5 px-5">
        <div className="rounded-3xl bg-card p-5 ring-1 ring-black/5">
          <div className="flex items-center gap-4">
            <Avatar initials={me.initials} color={me.color} size={64} />
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

      {/* Invite / connection link */}
      <section className="mt-6 px-5">
        <div className="relative overflow-hidden rounded-3xl bg-accent p-5 text-accent-foreground shadow-[var(--shadow-pop)]">
          <div className="flex items-start gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-white/20">
              <LinkIcon className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Invite a parent</p>
              <p className="text-xs opacity-90">
                Share this link. They'll connect with you and pick which kids are friends.
              </p>
            </div>
          </div>

          {/* Link row */}
          <div className="mt-4 flex items-center gap-2 rounded-2xl bg-white/15 p-1.5 ring-1 ring-white/20 backdrop-blur-sm">
            <span className="flex-1 truncate px-3 py-1.5 text-xs font-medium">
              {INVITE_LINK}
            </span>
            <button
              onClick={copyLink}
              className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-2 text-xs font-bold text-accent transition-transform active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="size-3.5" /> Copied
                </>
              ) : (
                <>
                  <Copy className="size-3.5" /> Copy
                </>
              )}
            </button>
          </div>

          {/* Share buttons */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            <button className="flex flex-col items-center gap-1 rounded-2xl bg-white/15 py-3 text-[11px] font-semibold backdrop-blur-sm ring-1 ring-white/20">
              <MessageSquare className="size-4" />
              Text
            </button>
            <button className="flex flex-col items-center gap-1 rounded-2xl bg-white/15 py-3 text-[11px] font-semibold backdrop-blur-sm ring-1 ring-white/20">
              <Mail className="size-4" />
              Email
            </button>
            <button className="flex flex-col items-center gap-1 rounded-2xl bg-white/15 py-3 text-[11px] font-semibold backdrop-blur-sm ring-1 ring-white/20">
              <Share2 className="size-4" />
              Share
            </button>
          </div>
        </div>
      </section>

      {/* Kids */}
      <section className="mt-6 px-5">
        <div className="mb-3 flex items-center justify-between px-1">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400">My kids</h2>
          <button
            onClick={() => openManager()}
            className="text-xs font-semibold text-accent"
          >
            Manage
          </button>
        </div>
        <ul className="space-y-2">
          {kids.map((k) => (
            <li key={k.id}>
              <button
                onClick={() => openManager(k.id)}
                className="flex w-full items-center gap-3 rounded-2xl bg-card p-3 text-left ring-1 ring-black/5 transition active:scale-[0.99]"
              >
                <Avatar initials={k.initials} color={k.color} size={40} />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{k.name}</p>
                  <p className="text-xs text-muted-foreground">Age {k.age}</p>
                </div>
                <span
                  className="mr-1 size-3 rounded-full ring-2 ring-white"
                  style={{ background: k.color }}
                  title="Kid color"
                />
                <ChevronRight className="size-4 text-zinc-300" />
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => openManager()}

              className="flex w-full items-center gap-3 rounded-2xl border-2 border-dashed border-zinc-200 p-3 text-left"
            >
              <div className="grid size-10 place-items-center rounded-full bg-zinc-50">
                <Plus className="size-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-700">Add a kid</p>
                <p className="text-[11px] text-muted-foreground">Pick a color when adding</p>
              </div>
              <div className="flex -space-x-1.5">
                {kidColorPalette.slice(0, 5).map((c, i) => (
                  <span
                    key={i}
                    className="size-4 rounded-full ring-2 ring-card"
                    style={{ background: c }}
                  />
                ))}
              </div>
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

      <KidsManagerSheet
        open={managerOpen}
        onClose={() => setManagerOpen(false)}
        kids={kids}
        onChange={setKids}
      />
    </PhoneFrame>
  );
}
