import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { me, initialSchedules, type Kid } from "@/lib/mockData";

type KidsContextValue = {
  kids: Kid[];
  setKids: (kids: Kid[]) => void;
  schedules: Record<string, number[][]>;
  setSchedules: Dispatch<SetStateAction<Record<string, number[][]>>>;
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

  function setKids(next: Kid[]) {
    setKidsState(next);
    setSchedules((prev) => {
      const out: Record<string, number[][]> = {};
      for (const k of next) {
        out[k.id] = prev[k.id] ?? emptySchedule();
      }
      return out;
    });
  }

  const value = useMemo(
    () => ({ kids, setKids, schedules, setSchedules }),
    [kids, schedules],
  );

  return <KidsContext.Provider value={value}>{children}</KidsContext.Provider>;
}

export function useKids() {
  const ctx = useContext(KidsContext);
  if (!ctx) throw new Error("useKids must be used within KidsProvider");
  return ctx;
}
