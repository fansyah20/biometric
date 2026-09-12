import type { HTMLAttributes } from "react";

type Tone = "dark" | "light";

const TONE_CLASSES: Record<Tone, string> = {
  dark: "border-white/10 bg-navy-800/70 text-white shadow-panel backdrop-blur-sm",
  light: "border-surface-border bg-surface-card text-ink shadow-sm",
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: Tone;
}

export function Card({ tone = "dark", className = "", children, ...rest }: CardProps) {
  return (
    <div className={["rounded-kiosk border p-6", TONE_CLASSES[tone], className].join(" ")} {...rest}>
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={["mb-4 flex items-start justify-between gap-3", className].join(" ")} {...rest}>
      {children}
    </div>
  );
}