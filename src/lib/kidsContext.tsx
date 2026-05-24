import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import {
  me,
  initialSchedules,
  initialRecurrences,
  addDays,
  isoDate,
  type Kid,
  type Recurrence,
} from "@/lib/mockData";

type ResolvedCell = { value: number; fromRecurrence: boolean };

type KidsContextValue = {
  kids: Kid[];
  setKids: (kids: Kid[]) => void;
  schedules: Record<string, number[][]>;
  setSchedules: Dispatch<SetStateAction<Record<string, number[][]>>>;
  recurrences: Recurrence[];
  addRecurrence: (r: Omit<Recurrence, "id">) => void;
  updateRecurrence: (id: string, patch: Partial<Recurrence>) => void;
  removeRecurrence: (id: string) => void;
  resolveCell: (kidId: string, weekStart: Date, block: number, day: number) => ResolvedCell;
};

const KidsContext = createContext<KidsContextValue | null>(null);

const emptySchedule = (): number[][] => [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

export function KidsProvider({ children }: { children: ReactNode }) {
  const [kids, setKidsState] = useState<Kid[]>(me.kids);
  const [schedules, setSchedules] = useState<Record<string, number[][]>>(
    () =>
      Object.fromEntries(
        Object.entries(initialSchedules).map(([k, v]) => [k, v.map((r) => [...r])]),
      ),
  );
  const [recurrences, setRecurrences] = useState<Recurrence[]>(initialRecurrences);

  function setKids(next: Kid[]) {
    setKidsState(next);
    setSchedules((prev) => {
      const out: Record<string, number[][]> = {};
      for (const k of next) {
        out[k.id] = prev[k.id] ?? emptySchedule();
      }
      return out;
    });
    setRecurrences((prev) => prev.filter((r) => next.some((k) => k.id === r.kidId)));
  }

  const addRecurrence = useCallback((r: Omit<Recurrence, "id">) => {
    setRecurrences((prev) => [
      ...prev,
      { ...r, id: `r-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}` },
    ]);
  }, []);

  const updateRecurrence = useCallback((id: string, patch: Partial<Recurrence>) => {
    setRecurrences((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }, []);

  const removeRecurrence = useCallback((id: string) => {
    setRecurrences((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const resolveCell = useCallback<KidsContextValue["resolveCell"]>(
    (kidId, weekStart, block, day) => {
      const override = schedules[kidId]?.[block]?.[day] ?? 0;
      if (override !== 0) return { value: override, fromRecurrence: false };

      const cellDate = isoDate(addDays(weekStart, day));
      let best = 0;
      for (const r of recurrences) {
        if (r.kidId !== kidId) continue;
        if (!r.days.includes(day)) continue;
        if (!r.blocks.includes(block)) continue;
        if (cellDate < r.startDate) continue;
        if (r.endDate && cellDate > r.endDate) continue;
        if (r.status > best) best = r.status;
      }
      return { value: best, fromRecurrence: best > 0 };
    },
    [schedules, recurrences],
  );

  const value = useMemo(
    () => ({
      kids,
      setKids,
      schedules,
      setSchedules,
      recurrences,
      addRecurrence,
      updateRecurrence,
      removeRecurrence,
      resolveCell,
    }),
    [kids, schedules, recurrences, addRecurrence, updateRecurrence, removeRecurrence, resolveCell],
  );

  return <KidsContext.Provider value={value}>{children}</KidsContext.Provider>;
}

export function useKids() {
  const ctx = useContext(KidsContext);
  if (!ctx) throw new Error("useKids must be used within KidsProvider");
  return ctx;
}
