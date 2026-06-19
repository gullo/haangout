import { Link, useLocation } from "@tanstack/react-router";
import { Home, CalendarDays, Users, Sparkles, User } from "lucide-react";

const tabs = [
  { to: "/app", label: "Home", Icon: Home },
  { to: "/calendar", label: "Calendar", Icon: CalendarDays },
  { to: "/groups", label: "Groups", Icon: Sparkles },
  { to: "/families", label: "Families", Icon: Users },
  { to: "/profile", label: "Profile", Icon: User },
] as const;

export function TabBar() {
  const { pathname } = useLocation();

  return (
    <nav className="absolute bottom-0 left-0 right-0 border-t border-black/5 bg-card/85 px-6 pt-3 pb-8 backdrop-blur-xl">
      <ul className="flex items-center justify-between">
        {tabs.map(({ to, label, Icon }) => {
          const active = pathname === to;
          return (
            <li key={to}>
              <Link
                to={to}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  active ? "text-accent" : "text-zinc-400"
                }`}
              >
                <Icon className="size-5" strokeWidth={active ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
