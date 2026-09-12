import type { HTMLAttributes } from "react";

type Tone = "gold" | "emerald" | "neutral" | "danger";

const TONE_CLASSES: Record<Tone, string> = {
  gold: "bg-gold-400/15 text-gold-300 border-gold-400/30",
  emerald: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  neutral: "bg-white/10 text-white/70 border-white/15",
  danger: "bg-red-500/15 text-red-300 border-red-500/30",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ tone = "neutral", className = "", children, ...rest }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        TONE_CLASSES[tone],
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </span>
  );
}
