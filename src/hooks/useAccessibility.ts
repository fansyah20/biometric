"use client";

import { useContext } from "react";
import { AccessibilityContext } from "@/context/AccessibilityContext";

/**
 * Convenience accessor for AccessibilityContext with a clear error if
 * used outside the provider tree (helps catch wiring mistakes fast).
 */
export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return ctx;
}
