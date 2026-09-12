"use client";

import { createContext, useMemo, useState, type ReactNode } from "react";

export type FontScale = "normal" | "large" | "xlarge";

export interface AccessibilityContextValue {
  highContrast: boolean;
  toggleHighContrast: () => void;
  voiceGuideEnabled: boolean;
  toggleVoiceGuide: () => void;
  fontScale: FontScale;
  setFontScale: (scale: FontScale) => void;
  kioskMode: boolean;
  setKioskMode: (enabled: boolean) => void;
}

export const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [highContrast, setHighContrast] = useState(false);
  const [voiceGuideEnabled, setVoiceGuideEnabled] = useState(false);
  const [fontScale, setFontScale] = useState<FontScale>("normal");
  const [kioskMode, setKioskMode] = useState(true);

  const value = useMemo<AccessibilityContextValue>(
    () => ({
      highContrast,
      toggleHighContrast: () => setHighContrast((v) => !v),
      voiceGuideEnabled,
      toggleVoiceGuide: () => setVoiceGuideEnabled((v) => !v),
      fontScale,
      setFontScale,
      kioskMode,
      setKioskMode,
    }),
    [highContrast, voiceGuideEnabled, fontScale, kioskMode]
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}
