"use client";

import { HighContrastToggle } from "@/components/accessibility/HighContrastToggle";
import { VoiceGuideWidget } from "@/components/accessibility/VoiceGuideWidget";
import { FontScaler } from "@/components/accessibility/FontScaler";

export function AccessibilityBar() {
  return (
    <div
      role="toolbar"
      aria-label="Pengaturan Aksesibilitas"
      className="flex flex-wrap items-center gap-2 border-b border-white/10 bg-navy-950 px-4 py-2"
    >
      <span className="mr-1 text-xs font-medium uppercase tracking-wide text-white/40">
        Aksesibilitas
      </span>
      <FontScaler />
      <HighContrastToggle />
      <VoiceGuideWidget />
    </div>
  );
}
