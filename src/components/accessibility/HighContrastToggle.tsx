"use client";

import { Contrast } from "lucide-react";
import { useAccessibility } from "@/hooks/useAccessibility";

export function HighContrastToggle() {
  const { highContrast, toggleHighContrast } = useAccessibility();

  return (
    <button
      onClick={toggleHighContrast}
      aria-pressed={highContrast}
      className={[
        "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        highContrast
          ? "border-emerald-400 bg-emerald-500/15 text-emerald-300"
          : "border-white/15 text-white/60 hover:bg-white/10",
      ].join(" ")}
    >
      <Contrast className="h-3.5 w-3.5" aria-hidden="true" />
      Kontras Tinggi
    </button>
  );
}
