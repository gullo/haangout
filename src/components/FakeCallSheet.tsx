import { useEffect, useState } from "react";
import { Mic, MicOff, Grid3x3, Volume2, UserPlus, Video, PhoneOff } from "lucide-react";
import { Avatar } from "@/components/Avatar";

type Props = {
  open: boolean;
  onClose: () => void;
  contactName: string;
  contactInitials: string;
  contactColor: string;
  phone: string;
};

export function FakeCallSheet({
  open,
  onClose,
  contactName,
  contactInitials,
  contactColor,
  phone,
}: Props) {
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState<"calling" | "connected">("calling");
  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(false);

  useEffect(() => {
    if (!open) return;
    setSeconds(0);
    setStatus("calling");
    setMuted(false);
    setSpeaker(false);
    const connectTimer = setTimeout(() => setStatus("connected"), 1800);
    return () => clearTimeout(connectTimer);
  }, [open]);

  useEffect(() => {
    if (!open || status !== "connected") return;
    const tick = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(tick);
  }, [open, status]);

  if (!open) return null;

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col text-white"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 0%, #4b4b4b 0%, #2a2a2a 50%, #0f0f0f 100%)",
      }}
    >
      {/* iOS status bar */}
      <div className="flex items-center justify-between px-8 pt-4 pb-1 text-[12px] font-semibold">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <div className="h-1 w-4 rounded-full bg-white" />
          <div className="h-3 w-3 rounded-full bg-white" />
          <div className="h-3 w-3 rounded-full bg-white" />
        </div>
      </div>

      {/* Contact header */}
      <div className="flex flex-col items-center px-6 pt-10">
        <p className="text-[28px] font-light tracking-tight">{contactName}</p>
        <p className="mt-1 text-sm text-white/70">
          {status === "calling" ? "calling…" : `mobile · ${mm}:${ss}`}
        </p>
        <p className="mt-0.5 text-[11px] text-white/40">{phone}</p>

        <div className="mt-10">
          <div
            className={`rounded-full ${
              status === "calling" ? "animate-pulse" : ""
            }`}
          >
            <Avatar initials={contactInitials} color={contactColor} size={140} />
          </div>
        </div>
      </div>

      {/* Action grid */}
      <div className="mt-auto px-8 pb-10">
        <div className="grid grid-cols-3 gap-y-7">
          <CallAction
            label={muted ? "unmute" : "mute"}
            Icon={muted ? MicOff : Mic}
            active={muted}
            onClick={() => setMuted((v) => !v)}
          />
          <CallAction label="keypad" Icon={Grid3x3} />
          <CallAction
            label="speaker"
            Icon={Volume2}
            active={speaker}
            onClick={() => setSpeaker((v) => !v)}
          />
          <CallAction label="add" Icon={UserPlus} />
          <CallAction label="FaceTime" Icon={Video} />
          <CallAction label="contacts" Icon={UserPlus} />
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={onClose}
            aria-label="End call"
            className="grid size-16 place-items-center rounded-full bg-[#ff3b30] shadow-[0_8px_24px_rgba(255,59,48,0.45)] transition active:scale-95"
          >
            <PhoneOff className="size-7" fill="currentColor" />
          </button>
        </div>
      </div>
    </div>
  );
}

function CallAction({
  label,
  Icon,
  active,
  onClick,
}: {
  label: string;
  Icon: typeof Mic;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1.5">
      <span
        className={`grid size-[68px] place-items-center rounded-full backdrop-blur ${
          active ? "bg-white text-black" : "bg-white/15 text-white"
        }`}
      >
        <Icon className="size-6" />
      </span>
      <span className="text-[11px] text-white/85">{label}</span>
    </button>
  );
}
