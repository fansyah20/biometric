"use client";

import { useCallback, useRef, useState } from "react";
import type { BiometricMethod, BiometricScanStatus } from "@/types/biometric";
import { generateCivicHashPreview } from "@/utils/cryptoSim";

interface UseBiometricResult {
  status: BiometricScanStatus;
  progress: number; // 0-100
  hashPreview: string | null;
  error: string | null;
  startScan: (method: BiometricMethod, seed: string) => void;
  reset: () => void;
}

const STAGE_DURATIONS_MS: Record<Exclude<BiometricScanStatus, "idle" | "success" | "failed">, number> = {
  positioning: 900,
  scanning: 1600,
  processing: 700,
};

/**
 * Simulates a biometric enrollment/auth scan through a staged state
 * machine: positioning -> scanning -> processing -> success/failed.
 * This is a UI-only simulation; no real sensor access occurs.
 */
export function useBiometric(): UseBiometricResult {
  const [status, setStatus] = useState<BiometricScanStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [hashPreview, setHashPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const reset = useCallback(() => {
    clearTimers();
    setStatus("idle");
    setProgress(0);
    setHashPreview(null);
    setError(null);
  }, []);

  const startScan = useCallback((method: BiometricMethod, seed: string) => {
    clearTimers();
    setError(null);
    setHashPreview(null);
    setStatus("positioning");
    setProgress(10);

    const stages: BiometricScanStatus[] = ["positioning", "scanning", "processing"];
    let elapsed = 0;

    stages.forEach((stage, idx) => {
      const duration = STAGE_DURATIONS_MS[stage as keyof typeof STAGE_DURATIONS_MS];
      elapsed += duration;
      const t = setTimeout(() => {
        setStatus(stage);
        setProgress(Math.round(((idx + 1) / (stages.length + 1)) * 100));
      }, elapsed - duration);
      timers.current.push(t);
    });

    const finalT = setTimeout(() => {
      // Small deliberate failure chance to make the demo feel real & to
      // exercise the retry path during a live presentation.
      const succeeds = Math.random() > 0.08;
      if (succeeds) {
        setHashPreview(generateCivicHashPreview(`${method}:${seed}`));
        setStatus("success");
        setProgress(100);
      } else {
        setError("Pemindaian gagal, posisikan ulang dan coba lagi.");
        setStatus("failed");
        setProgress(0);
      }
    }, elapsed);
    timers.current.push(finalT);
  }, []);

  return { status, progress, hashPreview, error, startScan, reset };
}
