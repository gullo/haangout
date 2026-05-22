import type { Kid } from "./mockData";

/**
 * Build a CSS background from one or more kid colors.
 * - 0 kids → falls back to the accent token
 * - 1 kid → solid color
 * - 2+ kids → linear gradient blending them
 */
export function kidsBackground(kids: Kid[]): string {
  if (kids.length === 0) return "var(--accent)";
  if (kids.length === 1) return kids[0].color;
  const stops = kids.map((k, i) => `${k.color} ${(i / (kids.length - 1)) * 100}%`).join(", ");
  return `linear-gradient(135deg, ${stops})`;
}
