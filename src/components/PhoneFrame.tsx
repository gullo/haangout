import type { ReactNode } from "react";
import { TabBar } from "./TabBar";

type Props = {
  children: ReactNode;
  withTabBar?: boolean;
};

/**
 * iPhone-shaped frame that centers the app at mobile width on any viewport.
 * Includes a faux status bar and (optionally) the bottom tab navigation.
 */
export function PhoneFrame({ children, withTabBar = true }: Props) {
  return (
    <div className="min-h-screen w-full bg-[oklch(0.94_0.005_90)] py-6 px-4 sm:py-12">
      <div className="mx-auto flex max-w-[420px] flex-col">
        <div className="relative h-[844px] w-full overflow-hidden rounded-[3rem] bg-page shadow-2xl ring-[10px] ring-zinc-900">
          {/* Status bar */}
          <div className="flex items-center justify-between px-8 pt-4 pb-1 text-[12px] font-semibold">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <div className="h-1 w-4 rounded-full bg-zinc-900" />
              <div className="h-3 w-3 rounded-full bg-zinc-900" />
              <div className="h-3 w-3 rounded-full bg-zinc-900" />
            </div>
          </div>

          {/* Scrollable app body */}
          <div
            className="h-[calc(100%-2rem)] overflow-y-auto pb-28"
            style={{ scrollbarWidth: "none" }}
          >
            {children}
          </div>

          {withTabBar && <TabBar />}
        </div>
      </div>
    </div>
  );
}
