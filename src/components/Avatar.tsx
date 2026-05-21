type Props = {
  initials: string;
  color?: string;
  size?: number;
  className?: string;
  ring?: boolean;
};

export function Avatar({ initials, color, size = 48, className = "", ring }: Props) {
  return (
    <div
      className={`grid shrink-0 place-items-center rounded-full font-semibold text-white ${
        ring ? "ring-2 ring-card" : ""
      } ${className}`}
      style={{
        width: size,
        height: size,
        background: color ?? "oklch(0.72 0.13 250)",
        fontSize: size * 0.4,
      }}
    >
      {initials}
    </div>
  );
}
