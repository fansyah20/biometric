"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { ScannerAnimation } from "@/components/biometric/ScannerAnimation";
import { useBiometric } from "@/hooks/useBiometric";
import { BIOMETRIC_METHODS, type BiometricMethod } from "@/types/biometric";

const CAMERA_METHODS: BiometricMethod[] = ["palm", "face", "retina"];

interface ScannerModalProps {
  open: boolean;
  method: BiometricMethod;
  seed: string;
  onClose: () => void;
  onEnrolled: (method: BiometricMethod, hashPreview?: string) => void;
}

const STATUS_LABEL: Record<string, string> = {
  idle: "Bersiap memulai pemindaian…",
  positioning: "Posisikan sesuai panduan di layar…",
  scanning: "Memindai, jangan bergerak…",
  processing: "Memproses data biometrik…",
  success: "Berhasil terdaftar!",
  failed: "Pemindaian gagal.",
};

export function ScannerModal({ open, method, seed, onClose, onEnrolled }: ScannerModalProps) {
  const { status, progress, hashPreview, error, startScan, reset } = useBiometric();
  const [cameraPending, setCameraPending] = useState(false);
  const meta = BIOMETRIC_METHODS.find((m) => m.id === method);
  const needsCamera = CAMERA_METHODS.includes(method);

  useEffect(() => {
    if (!open) {
      reset();
      setCameraPending(false);
      return;
    }
    if (needsCamera) {
      // Wait for the live camera feed before starting the fake scan timer.
      setCameraPending(true);
    } else {
      startScan(method, seed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, method]);

  useEffect(() => {
    if (status === "success") {
      onEnrolled(method, hashPreview ?? undefined);
    }
  }, [status, method, hashPreview, onEnrolled]);

  const handleCameraReady = () => {
    setCameraPending(false);
    startScan(method, seed);
  };

  const handleCameraError = () => {
    // Denied/unavailable — proceed anyway with the icon fallback so the demo doesn't hang.
    setCameraPending(false);
    startScan(method, seed);
  };

  return (
    <Modal open={open} onClose={onClose} title={`Pendaftaran ${meta?.label ?? ""}`}>
      <div className="space-y-6 text-center">
        <p className="text-sm text-white/60">{meta?.description}</p>

        <ScannerAnimation
          method={method}
          status={cameraPending ? "idle" : status}
          onCameraReady={handleCameraReady}
          onCameraError={handleCameraError}
        />

        <div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-navy-700">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${cameraPending ? 5 : progress}%` }}
            />
          </div>
          <p className="mt-3 text-sm font-medium text-white" aria-live="polite">
            {cameraPending ? "Menyalakan kamera…" : STATUS_LABEL[status]}
          </p>
          {error && <p className="mt-1 text-sm text-red-300">{error}</p>}
          {status === "success" && hashPreview && (
            <p className="mt-1 font-mono text-xs text-emerald-300">{hashPreview}</p>
          )}
        </div>

        <div className="flex justify-center gap-3">
          {status === "failed" && (
            <Button variant="secondary" onClick={() => startScan(method, seed)}>
              Coba Lagi
            </Button>
          )}
          <Button variant={status === "success" ? "primary" : "ghost"} onClick={onClose}>
            {status === "success" ? "Selesai" : "Batal"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}