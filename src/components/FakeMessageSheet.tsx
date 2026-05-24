import { useEffect, useState } from "react";
import { ChevronLeft, Video, Info, Plus, Camera, Mic, ArrowUp } from "lucide-react";
import { Avatar } from "@/components/Avatar";

type Props = {
  open: boolean;
  onClose: () => void;
  contactName: string;
  contactInitials: string;
  contactColor: string;
  prefill: string;
};

export function FakeMessageSheet({
  open,
  onClose,
  contactName,
  contactInitials,
  contactColor,
  prefill,
}: Props) {
  const [text, setText] = useState(prefill);
  const [sent, setSent] = useState<string[]>([]);
  const [showDelivered, setShowDelivered] = useState(false);

  useEffect(() => {
    if (open) {
      setText(prefill);
      setSent([]);
      setShowDelivered(false);
    }
  }, [open, prefill]);

  if (!open) return null;

  function send() {
    if (!text.trim()) return;
    setSent((prev) => [...prev, text.trim()]);
    setText("");
    setShowDelivered(false);
    setTimeout(() => setShowDelivered(true), 400);
  }

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-[#f6f6f6]">
      {/* iOS status bar */}
      <div className="flex items-center justify-between bg-[#f6f6f6] px-8 pt-4 pb-1 text-[12px] font-semibold text-black">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <div className="h-1 w-4 rounded-full bg-zinc-900" />
          <div className="h-3 w-3 rounded-full bg-zinc-900" />
          <div className="h-3 w-3 rounded-full bg-zinc-900" />
        </div>
      </div>

      {/* iMessage nav */}
      <div className="relative flex items-center justify-between border-b border-black/10 bg-[#f6f6f6]/95 px-3 py-2 backdrop-blur">
        <button
          onClick={onClose}
          className="flex items-center text-[#007AFF]"
          aria-label="Back"
        >
          <ChevronLeft className="size-6" strokeWidth={2.5} />
          <span className="-ml-1 text-[11px] font-semibold">2</span>
        </button>
        <div className="flex flex-col items-center">
          <Avatar initials={contactInitials} color={contactColor} size={32} />
          <span className="mt-0.5 flex items-center gap-0.5 text-[11px] text-zinc-700">
            {contactName}
            <ChevronLeft className="size-3 -rotate-90 text-zinc-400" />
          </span>
        </div>
        <div className="flex items-center gap-3 text-[#007AFF]">
          <Video className="size-5" />
          <Info className="size-5" />
        </div>
      </div>

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
          iMessage · Today 9:41 AM
        </p>

        {sent.map((msg, i) => (
          <div key={i} className="mb-1 flex justify-end">
            <div className="max-w-[78%] rounded-[20px] bg-[#007AFF] px-3.5 py-2 text-[15px] leading-snug text-white">
              {msg}
            </div>
          </div>
        ))}
        {sent.length > 0 && showDelivered && (
          <p className="mr-1 mt-0.5 text-right text-[10px] text-zinc-400">Delivered</p>
        )}
      </div>

      {/* iMessage input bar */}
      <div className="flex items-end gap-2 border-t border-black/10 bg-[#f6f6f6] px-2 py-2 pb-6">
        <button className="grid size-8 shrink-0 place-items-center rounded-full bg-zinc-200 text-zinc-600">
          <Plus className="size-4" />
        </button>
        <button className="grid size-8 shrink-0 place-items-center rounded-full bg-zinc-200 text-zinc-600">
          <Camera className="size-4" />
        </button>
        <div className="relative flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={Math.min(4, Math.max(1, text.split("\n").length))}
            placeholder="iMessage"
            className="w-full resize-none rounded-[18px] border border-zinc-300 bg-white py-2 pl-3 pr-9 text-[15px] leading-tight outline-none placeholder:text-zinc-400 focus:border-zinc-400"
          />
          {text.trim() ? (
            <button
              onClick={send}
              className="absolute bottom-1.5 right-1.5 grid size-7 place-items-center rounded-full bg-[#007AFF] text-white"
              aria-label="Send"
            >
              <ArrowUp className="size-4" strokeWidth={3} />
            </button>
          ) : (
            <button
              className="absolute bottom-1.5 right-2 grid size-6 place-items-center text-zinc-500"
              aria-label="Dictate"
            >
              <Mic className="size-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
