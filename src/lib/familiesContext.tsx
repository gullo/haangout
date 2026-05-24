import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { families as initialFamilies, type Family } from "@/lib/mockData";

type FamiliesContextValue = {
  families: Family[];
  setFamilies: (families: Family[]) => void;
  addFamily: (family: Family) => void;
  removeFamily: (id: string) => void;
};

const FamiliesContext = createContext<FamiliesContextValue | null>(null);

export function FamiliesProvider({ children }: { children: ReactNode }) {
  const [families, setFamilies] = useState<Family[]>(initialFamilies);

  const value = useMemo<FamiliesContextValue>(
    () => ({
      families,
      setFamilies,
      addFamily: (f) => setFamilies((prev) => [...prev, f]),
      removeFamily: (id) => setFamilies((prev) => prev.filter((x) => x.id !== id)),
    }),
    [families],
  );

  return <FamiliesContext.Provider value={value}>{children}</FamiliesContext.Provider>;
}

export function useFamilies() {
  const ctx = useContext(FamiliesContext);
  if (!ctx) throw new Error("useFamilies must be used within FamiliesProvider");
  return ctx;
}
