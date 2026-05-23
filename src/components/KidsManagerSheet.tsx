import { useEffect, useState } from "react";
import { X, Pencil, Trash2, Plus, Check } from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { kidColorPalette, type Kid } from "@/lib/mockData";

type Props = {
  open: boolean;
  onClose: () => void;
  kids: Kid[];
  onChange: (kids: Kid[]) => void;
};

type Draft = {
  id: string | null; // null = new
  name: string;
  age: string;
  color: string;
};

function emptyDraft(): Draft {
  return { id: null, name: "", age: "", color: kidColorPalette[0] };
}

export function KidsManagerSheet({ open, onClose, kids, onChange }: Props) {
  const [draft, setDraft] = useState<Draft | null>(null);

  useEffect(() => {
    if (!open) setDraft(null);
  }, [open]);

  if (!open) return null;

  const usedColors = new Set(
    kids.filter((k) => k.id !== draft?.id).map((k) => k.color),
  );

  function startEdit(k: Kid) {
    setDraft({ id: k.id, name: k.name, age: String(k.age), color: k.color });
  }

  function startAdd() {
    const firstFree =
      kidColorPalette.find((c) => !kids.some((k) => k.color === c)) ??
      kidColorPalette[0];
    setDraft({ id: null, name: "", age: "", color: firstFree });
  }

  function saveDraft() {
    if (!draft) return;
    const name = draft.name.trim();
    if (!name) return;
    const age = Number(draft.age) || 0;
    const initials = name.charAt(0).toUpperCase();

    if (draft.id) {
      onChange(
        kids.map((k) =>
          k.id === draft.id ? { ...k, name, age, initials, color: draft.color } : k,
        ),
      );
    } else {
      const id = `k-${name.toLowerCase().replace(/[^a-z0-9]/g, "")}-${Date.now().toString(36)}`;
      onChange([...kids, { id, name, age, initials, color: draft.color }]);
    }
    setDraft(null);
  }

  function removeKid(id: string) {
    onChange(kids.filter((k) => k.id !== id));
  }

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="mt-auto" onClick={(e) => e.stopPropagation()}>
        <div className="rounded-t-3xl bg-card pb-8 shadow-[0_-12px_40px_rgba(0,0,0,0.18)]">
          {/* Handle + header */}
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
              {draft ? (draft.id ? "Edit kid" : "Add a kid") : "Manage kids"}
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {draft
                ? "Name, age, and a color used across the app."
                : "Rename, recolor, or remove. Tap + to add."}
            </p>
          </div>

          {/* List view */}
          {!draft && (
            <div className="mt-5 px-5">
              <ul className="space-y-2">
                {kids.map((k) => (
                  <li
                    key={k.id}
                    className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-3 ring-1 ring-black/5"
                  >
                    <Avatar initials={k.initials} color={k.color} size={40} />
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{k.name}</p>
                      <p className="text-xs text-muted-foreground">Age {k.age}</p>
                    </div>
                    <button
                      onClick={() => startEdit(k)}
                      className="grid size-9 place-items-center rounded-full bg-white ring-1 ring-black/5"
                      aria-label={`Edit ${k.name}`}
                    >
                      <Pencil className="size-4 text-zinc-600" />
                    </button>
                    <button
                      onClick={() => removeKid(k.id)}
                      className="grid size-9 place-items-center rounded-full bg-white ring-1 ring-black/5"
                      aria-label={`Delete ${k.name}`}
                    >
                      <Trash2 className="size-4 text-destructive" />
                    </button>
                  </li>
                ))}
              </ul>

              <button
                onClick={startAdd}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-accent py-3 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-pop)] active:scale-[0.99]"
              >
                <Plus className="size-4" /> Add a kid
              </button>
            </div>
          )}

          {/* Draft form */}
          {draft && (
            <div className="mt-5 px-5">
              <div className="flex items-center gap-4 rounded-2xl bg-zinc-50 p-4 ring-1 ring-black/5">
                <Avatar
                  initials={(draft.name.trim()[0] || "?").toUpperCase()}
                  color={draft.color}
                  size={56}
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    {draft.name.trim() || "New kid"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {draft.age ? `Age ${draft.age}` : "Set an age"}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <label className="block">
                  <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                    Name
                  </span>
                  <input
                    autoFocus
                    value={draft.name}
                    onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                    placeholder="e.g. Ava"
                    className="w-full rounded-xl bg-zinc-50 px-4 py-3 text-sm ring-1 ring-black/5 outline-none focus:ring-accent"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                    Age
                  </span>
                  <input
                    inputMode="numeric"
                    value={draft.age}
                    onChange={(e) =>
                      setDraft({ ...draft, age: e.target.value.replace(/\D/g, "") })
                    }
                    placeholder="e.g. 5"
                    className="w-full rounded-xl bg-zinc-50 px-4 py-3 text-sm ring-1 ring-black/5 outline-none focus:ring-accent"
                  />
                </label>

                <div>
                  <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                    Color
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {kidColorPalette.map((c) => {
                      const taken = usedColors.has(c);
                      const active = draft.color === c;
                      return (
                        <button
                          key={c}
                          onClick={() => setDraft({ ...draft, color: c })}
                          disabled={taken && !active}
                          style={{ background: c }}
                          className={`grid size-10 place-items-center rounded-full ring-2 transition ${
                            active
                              ? "ring-zinc-900 scale-110"
                              : "ring-white"
                          } ${taken && !active ? "opacity-30" : ""}`}
                          aria-label={`Pick color ${c}`}
                        >
                          {active && <Check className="size-4 text-white" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => setDraft(null)}
                  className="flex-1 rounded-2xl bg-zinc-100 py-3 text-sm font-semibold ring-1 ring-black/5"
                >
                  Cancel
                </button>
                <button
                  onClick={saveDraft}
                  disabled={!draft.name.trim()}
                  className="flex-1 rounded-2xl bg-accent py-3 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-pop)] disabled:opacity-40"
                >
                  {draft.id ? "Save" : "Add kid"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
