"use client";

import { CaseSensitive } from "lucide-react";
import { useAccessibility } from "@/hooks/useAccessibility";
import type { FontScale } from "@/context/AccessibilityContext";

const SCALES: { id: FontScale; label: string }[] = [
  { id: "normal", label: "A" },
  { id: "large", label: "A+" },
  { id: "xlarge", label: "A++" },
];

export function FontScaler() {
  const { fontScale, setFontScale } = useAccessibility();

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/15 px-1 py-1">
      <CaseSensitive className="ml-1.5 h-3.5 w-3.5 text-white/50" aria-hidden="true" />
      {SCALES.map((s) => (
        <button
          key={s.id}
          onClick={() => setFontScale(s.id)}
          aria-pressed={fontScale === s.id}
          className={[
            "rounded-full px-2 py-1 text-xs font-medium transition-colors",
            fontScale === s.id
              ? "bg-emerald-500 text-navy-950"
              : "text-white/60 hover:bg-white/10",
          ].join(" ")}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
