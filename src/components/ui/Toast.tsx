"use client";

import { CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { useEffect } from "react";

export type ToastKind = "success" | "error" | "info";

interface ToastProps {
  kind: ToastKind;
  message: string;
  onDismiss: () => void;
  durationMs?: number;
}

const ICONS: Record<ToastKind, typeof CheckCircle2> = {
  success: CheckCircle2,
  error: AlertTriangle,
  info: Info,
};

const KIND_CLASSES: Record<ToastKind, string> = {
  success: "border-emerald-500/40 text-emerald-300",
  error: "border-red-500/40 text-red-300",
  info: "border-gold-400/40 text-gold-300",
};

export function Toast({ kind, message, onDismiss, durationMs = 3500 }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, durationMs);
    return () => clearTimeout(t);
  }, [onDismiss, durationMs]);

  const Icon = ICONS[kind];

  return (
    <div
      role="status"
      className={[
        "flex items-center gap-3 rounded-xl border bg-navy-800/95 px-4 py-3 shadow-panel",
        KIND_CLASSES[kind],
      ].join(" ")}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <p className="text-sm text-white">{message}</p>
    </div>
  );
}
