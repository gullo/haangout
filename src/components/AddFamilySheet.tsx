import { useEffect, useState } from "react";
import { X, Plus, Trash2, Check } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { kidColorPalette, type Family, type Kid } from "@/lib/mockData";
import { useKids } from "@/lib/kidsContext";

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (family: Family) => void;
};

type KidDraft = { name: string; age: string; color: string; friendWithMyKidId: string | null };

const emptyKid = (color: string): KidDraft => ({
  name: "",
  age: "",
  color,
  friendWithMyKidId: null,
});

export function AddFamilySheet({ open, onClose, onAdd }: Props) {
  const { kids: myKids } = useKids();
  const [parentName, setParentName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [color, setColor] = useState(kidColorPalette[3]);
  const [kids, setKids] = useState<KidDraft[]>([emptyKid(kidColorPalette[4])]);

  useEffect(() => {
    if (!open) {
      setParentName("");
      setPartnerName("");
      setAddress("");
      setPhone("");
      setColor(kidColorPalette[3]);
      setKids([emptyKid(kidColorPalette[4])]);
    }
  }, [open]);

  if (!open) return null;

  const canSave = parentName.trim().length > 0;

  function updateKid(i: number, patch: Partial<KidDraft>) {
    setKids((prev) => prev.map((k, idx) => (idx === i ? { ...k, ...patch } : k)));
  }

  function addKidRow() {
    const used = new Set(kids.map((k) => k.color));
    const next = kidColorPalette.find((c) => !used.has(c)) ?? kidColorPalette[0];
    setKids((prev) => [...prev, emptyKid(next)]);
  }

  function removeKidRow(i: number) {
    setKids((prev) => prev.filter((_, idx) => idx !== i));
  }

  function save() {
    if (!canSave) return;
    const p = parentName.trim();
    const partner = partnerName.trim();
    const id = `f-${p.toLowerCase().replace(/[^a-z0-9]/g, "")}-${Date.now().toString(36)}`;
    const initials = (p.charAt(0) + (partner.charAt(0) || "")).toUpperCase();

    const validKids = kids.filter((k) => k.name.trim());
    const familyKids: Kid[] = validKids.map((k, i) => ({
      id: `${id}-k${i}`,
      name: k.name.trim(),
      age: Number(k.age) || 0,
      initials: k.name.trim().charAt(0).toUpperCase(),
      color: k.color,
    }));

    const friendships = validKids
      .map((k, i) =>
        k.friendWithMyKidId
          ? { myKidId: k.friendWithMyKidId, theirKidId: familyKids[i].id }
          : null,
      )
      .filter((x): x is { myKidId: string; theirKidId: string } => x !== null);

    const family: Family = {
      id,
      parentName: p,
      partnerName: partner || undefined,
      initials: initials || p.charAt(0).toUpperCase(),
      phone: phone.trim() || "—",
      address: address.trim() || "—",
      distanceMi: Math.round(Math.random() * 18) / 10 + 0.2,
      color,
      kids: familyKids,
      friendships,
    };
    onAdd(family);
    onClose();
  }

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="mt-auto flex max-h-[88%] flex-col rounded-t-3xl bg-card shadow-[0_-12px_40px_rgba(0,0,0,0.18)]" onClick={(e) => e.stopPropagation()}>
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
          <h2 className="text-xl font-semibold tracking-tight">Add a family</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Parents, kids, and which of your kids they're friends with.
          </p>
        </div>

        <div className="mt-5 flex-1 space-y-4 overflow-y-auto px-5 pb-4">
            <div className="flex items-center gap-4 rounded-2xl bg-zinc-50 p-4 ring-1 ring-black/5">
              <Avatar
                initials={(parentName.trim()[0] || "?").toUpperCase()}
                color={color}
                size={52}
              />
              <div className="flex-1">
                <p className="text-sm font-semibold">
                  {parentName.trim() || "New family"}
                  {partnerName.trim() && (
                    <span className="font-normal text-zinc-400"> & {partnerName.trim()}</span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">
                  {address.trim() || "Add address"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Parent">
                <input
                  autoFocus
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Nina"
                  className="w-full rounded-xl bg-zinc-50 px-3 py-2.5 text-sm ring-1 ring-black/5 outline-none focus:ring-accent"
                />
              </Field>
              <Field label="Partner">
                <input
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="Alex"
                  className="w-full rounded-xl bg-zinc-50 px-3 py-2.5 text-sm ring-1 ring-black/5 outline-none focus:ring-accent"
                />
              </Field>
            </div>

            <Field label="Address">
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="248 Oak St"
                className="w-full rounded-xl bg-zinc-50 px-3 py-2.5 text-sm ring-1 ring-black/5 outline-none focus:ring-accent"
              />
            </Field>

            <Field label="Phone">
              <input
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(415) 555-0129"
                className="w-full rounded-xl bg-zinc-50 px-3 py-2.5 text-sm ring-1 ring-black/5 outline-none focus:ring-accent"
              />
            </Field>

            <div>
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                Family color
              </span>
              <div className="flex flex-wrap gap-2">
                {kidColorPalette.map((c) => {
                  const active = color === c;
                  return (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      style={{ background: c }}
                      className={`grid size-9 place-items-center rounded-full ring-2 transition ${
                        active ? "ring-zinc-900 scale-110" : "ring-white"
                      }`}
                    >
                      {active && <Check className="size-3.5 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  Their kids
                </span>
                <button
                  onClick={addKidRow}
                  className="flex items-center gap-1 text-xs font-semibold text-accent"
                >
                  <Plus className="size-3.5" /> Add kid
                </button>
              </div>
              <ul className="space-y-2">
                {kids.map((k, i) => (
                  <li
                    key={i}
                    className="rounded-2xl bg-zinc-50 p-3 ring-1 ring-black/5"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar
                        initials={(k.name.trim()[0] || "?").toUpperCase()}
                        color={k.color}
                        size={36}
                      />
                      <input
                        value={k.name}
                        onChange={(e) => updateKid(i, { name: e.target.value })}
                        placeholder="Name"
                        className="flex-1 rounded-lg bg-white px-3 py-2 text-sm ring-1 ring-black/5 outline-none focus:ring-accent"
                      />
                      <input
                        inputMode="numeric"
                        value={k.age}
                        onChange={(e) =>
                          updateKid(i, { age: e.target.value.replace(/\D/g, "") })
                        }
                        placeholder="Age"
                        className="w-16 rounded-lg bg-white px-2 py-2 text-sm ring-1 ring-black/5 outline-none focus:ring-accent"
                      />
                      {kids.length > 1 && (
                        <button
                          onClick={() => removeKidRow(i)}
                          className="grid size-8 place-items-center rounded-full bg-white ring-1 ring-black/5"
                          aria-label="Remove kid"
                        >
                          <Trash2 className="size-3.5 text-destructive" />
                        </button>
                      )}
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <span className="mr-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                        Color
                      </span>
                      {kidColorPalette.map((c) => {
                        const active = k.color === c;
                        return (
                          <button
                            key={c}
                            onClick={() => updateKid(i, { color: c })}
                            style={{ background: c }}
                            className={`size-5 rounded-full ring-2 ${
                              active ? "ring-zinc-900" : "ring-white"
                            }`}
                          />
                        );
                      })}
                    </div>

                    {myKids.length > 0 && (
                      <div className="mt-2">
                        <span className="block text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                          Friends with
                        </span>
                        <div className="mt-1 flex flex-wrap gap-1.5">
                          <button
                            onClick={() => updateKid(i, { friendWithMyKidId: null })}
                            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${
                              k.friendWithMyKidId === null
                                ? "bg-zinc-900 text-white ring-zinc-900"
                                : "bg-white text-zinc-600 ring-black/10"
                            }`}
                          >
                            None
                          </button>
                          {myKids.map((mk) => {
                            const active = k.friendWithMyKidId === mk.id;
                            return (
                              <button
                                key={mk.id}
                                onClick={() => updateKid(i, { friendWithMyKidId: mk.id })}
                                className={`flex items-center gap-1.5 rounded-full px-2 py-1 text-[11px] font-semibold ring-1 ${
                                  active
                                    ? "bg-accent text-accent-foreground ring-accent"
                                    : "bg-white text-zinc-600 ring-black/10"
                                }`}
                              >
                                <span
                                  className="size-2 rounded-full"
                                  style={{ background: mk.color }}
                                />
                                {mk.name}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-2 pt-2">
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
                Add family
              </button>
            </div>
          </div>
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
