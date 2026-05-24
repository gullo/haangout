import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { useProfile, profileInitials, type Profile } from "@/lib/profileContext";
import { me } from "@/lib/mockData";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function EditProfileSheet({ open, onClose }: Props) {
  const { profile, setProfile } = useProfile();
  const [draft, setDraft] = useState<Profile>(profile);

  useEffect(() => {
    if (open) setDraft(profile);
  }, [open, profile]);

  if (!open) return null;

  const canSave = draft.name.trim().length > 0;

  function update<K extends keyof Profile>(key: K, value: Profile[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
  }

  function save() {
    if (!canSave) return;
    setProfile({
      name: draft.name.trim(),
      email: draft.email.trim(),
      phone: draft.phone.trim(),
      spouseName: draft.spouseName.trim(),
      address: draft.address.trim(),
    });
    onClose();
  }

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="mt-auto flex max-h-[88%] flex-col rounded-t-3xl bg-card shadow-[0_-12px_40px_rgba(0,0,0,0.18)]"
        onClick={(e) => e.stopPropagation()}
      >
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
          <h2 className="text-xl font-semibold tracking-tight">Edit profile</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Update how friends and families see you.
          </p>
        </div>

        <div className="mt-5 flex-1 space-y-4 overflow-y-auto px-5 pb-4">
          <div className="flex items-center gap-4 rounded-2xl bg-zinc-50 p-4 ring-1 ring-black/5">
            <Avatar initials={profileInitials(draft.name)} color={me.color} size={52} />
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-semibold">
                {draft.name.trim() || "Your name"}
                {draft.spouseName.trim() && (
                  <span className="font-normal text-zinc-400"> & {draft.spouseName.trim()}</span>
                )}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {draft.address.trim() || "Add your address"}
              </p>
            </div>
          </div>

          <Field label="Name">
            <input
              autoFocus
              value={draft.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Erika Gullo"
              className="w-full rounded-xl bg-zinc-50 px-3 py-2.5 text-sm ring-1 ring-black/5 outline-none focus:ring-accent"
            />
          </Field>

          <Field label="Email">
            <input
              type="email"
              value={draft.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl bg-zinc-50 px-3 py-2.5 text-sm ring-1 ring-black/5 outline-none focus:ring-accent"
            />
          </Field>

          <Field label="Phone">
            <input
              inputMode="tel"
              value={draft.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="(415) 555-0000"
              className="w-full rounded-xl bg-zinc-50 px-3 py-2.5 text-sm ring-1 ring-black/5 outline-none focus:ring-accent"
            />
          </Field>

          <Field label="Spouse / partner">
            <input
              value={draft.spouseName}
              onChange={(e) => update("spouseName", e.target.value)}
              placeholder="Optional"
              className="w-full rounded-xl bg-zinc-50 px-3 py-2.5 text-sm ring-1 ring-black/5 outline-none focus:ring-accent"
            />
          </Field>

          <Field label="Address">
            <input
              value={draft.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="248 Oak St"
              className="w-full rounded-xl bg-zinc-50 px-3 py-2.5 text-sm ring-1 ring-black/5 outline-none focus:ring-accent"
            />
          </Field>
        </div>

        <div className="flex gap-2 border-t border-black/5 bg-card px-5 pb-8 pt-3">
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
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
        {label}
      </span>
      {children}
    </label>
  );
}
