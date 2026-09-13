import type { HTMLAttributes } from "react";

type Tone = "gold" | "emerald" | "neutral" | "danger";

const TONE_CLASSES: Record<Tone, string> = {
  gold: "bg-amber-50 text-amber-700 border-amber-200",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
  neutral: "bg-slate-100 text-slate-600 border-slate-200",
  danger: "bg-red-50 text-red-700 border-red-200",
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
