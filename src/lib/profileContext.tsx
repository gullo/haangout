import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Profile = {
  name: string;
  email: string;
  phone: string;
  spouseName: string;
  address: string;
};

const defaultProfile: Profile = {
  name: "Erika Gullo",
  email: "erika@example.com",
  phone: "(415) 555-2018",
  spouseName: "",
  address: "248 Oak St",
};

type Ctx = {
  profile: Profile;
  setProfile: (p: Profile) => void;
};

const ProfileContext = createContext<Ctx | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const value = useMemo(() => ({ profile, setProfile }), [profile]);
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}

export function profileInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase() || "?";
}
