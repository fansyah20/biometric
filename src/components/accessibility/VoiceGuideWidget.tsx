"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useAccessibility } from "@/hooks/useAccessibility";

export function VoiceGuideWidget() {
  const { voiceGuideEnabled, toggleVoiceGuide } = useAccessibility();

  return (
    <button
      onClick={toggleVoiceGuide}
      aria-pressed={voiceGuideEnabled}
      className={[
        "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        voiceGuideEnabled
          ? "border-emerald-400 bg-emerald-500/15 text-emerald-300"
          : "border-white/15 text-white/60 hover:bg-white/10",
      ].join(" ")}
    >
      {voiceGuideEnabled ? (
        <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
      ) : (
        <VolumeX className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      Panduan Suara
    </button>
  );
}
