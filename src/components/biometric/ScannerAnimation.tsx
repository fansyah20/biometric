"use client";

import { useEffect, useRef, useState } from "react";
import type { BiometricMethod, BiometricScanStatus } from "@/types/biometric";
import { Hand, ScanFace, Eye, Fingerprint, CameraOff } from "lucide-react";

const METHOD_ICONS: Record<BiometricMethod, typeof Hand> = {
  palm: Hand,
  face: ScanFace,
  retina: Eye,
  "civic-hash": Fingerprint,
};

const CAMERA_METHODS: BiometricMethod[] = ["palm", "face", "retina"];

interface ScannerAnimationProps {
  method: BiometricMethod;
  status: BiometricScanStatus;
  onCameraReady?: () => void;
  onCameraError?: () => void;
}

const STATUS_RING: Record<BiometricScanStatus, string> = {
  idle: "ring-white/10",
  positioning: "ring-gold-400/50",
  scanning: "ring-emerald-400/70 animate-pulse",
  processing: "ring-emerald-400/70",
  success: "ring-emerald-400",
  failed: "ring-red-400/70",
};

export function ScannerAnimation({ method, status, onCameraReady, onCameraError }: ScannerAnimationProps) {
  const Icon = METHOD_ICONS[method];
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const usesCamera = CAMERA_METHODS.includes(method);

  // Acquire the camera once per scan attempt.
  useEffect(() => {
    if (!usesCamera) {
      onCameraReady?.();
      return;
    }

    let cancelled = false;
    setCameraError(null);
    setCapturedImage(null);

    navigator.mediaDevices
      ?.getUserMedia({ video: { facingMode: "user" } })
      .then((s) => {
        if (cancelled) {
          s.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = s;
        if (videoRef.current) videoRef.current.srcObject = s;
        onCameraReady?.();
      })
      .catch(() => {
        if (!cancelled) {
          setCameraError("Kamera tidak tersedia. Izinkan akses kamera di browser.");
          onCameraError?.();
        }
      });

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method, usesCamera]);

  // On success: freeze the last frame into a still photo, then turn the camera off.
  useEffect(() => {
    if (status !== "success" || !usesCamera || capturedImage) return;
    const video = videoRef.current;
    if (!video || video.videoWidth === 0) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Mirror the snapshot so it matches the mirrored live preview.
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      setCapturedImage(canvas.toDataURL("image/png"));
    }

    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, [status, usesCamera, capturedImage]);

  return (
    <div className="relative mx-auto flex h-56 w-56 items-center justify-center overflow-hidden rounded-full">
      <div
        className={[
          "absolute inset-0 z-20 rounded-full ring-4 transition-all duration-500",
          STATUS_RING[status],
        ].join(" ")}
      />

      {status === "scanning" && (
        <div className="absolute inset-x-3 z-20 h-0.5 animate-[scan-sweep_1.4s_ease-in-out_infinite] bg-emerald-400/80 shadow-glow" />
      )}

      {usesCamera && !cameraError ? (
        <>
          {capturedImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={capturedImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="absolute inset-0 h-full w-full scale-x-[-1] bg-navy-900 object-cover"
            />
          )}
          {!capturedImage && <GuideOverlay method={method} />}
        </>
      ) : usesCamera && cameraError ? (
        <div className="z-10 flex h-full w-full flex-col items-center justify-center gap-2 bg-navy-700 px-4 text-center">
          <CameraOff className="h-8 w-8 text-white/40" aria-hidden="true" />
          <p className="text-xs text-white/50">{cameraError}</p>
        </div>
      ) : (
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-navy-700">
          <Icon className="h-12 w-12 text-emerald-300" strokeWidth={1.5} aria-hidden="true" />
        </div>
      )}

      <style>{`
        @keyframes scan-sweep {
          0% { top: 12%; opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          100% { top: 88%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function GuideOverlay({ method }: { method: BiometricMethod }) {
  if (method === "palm") {
    return (
      <svg viewBox="0 0 100 100" className="absolute inset-0 z-10 h-full w-full">
        <path
          d="M35 85 V45 Q35 38 40 38 Q45 38 45 45 V30 Q45 23 50 23 Q55 23 55 30 V45 Q55 38 60 38 Q65 38 65 45 V85 Z"
          fill="none"
          stroke="white"
          strokeOpacity="0.55"
          strokeWidth="2"
        />
      </svg>
    );
  }

  if (method === "face") {
    return (
      <svg viewBox="0 0 100 100" className="absolute inset-0 z-10 h-full w-full">
        <ellipse cx="50" cy="50" rx="26" ry="34" fill="none" stroke="white" strokeOpacity="0.55" strokeWidth="2" />
      </svg>
    );
  }

  if (method === "retina") {
    return (
      <svg viewBox="0 0 100 100" className="absolute inset-0 z-10 h-full w-full">
        <ellipse cx="50" cy="50" rx="32" ry="18" fill="none" stroke="white" strokeOpacity="0.55" strokeWidth="2" />
        <circle cx="50" cy="50" r="8" fill="none" stroke="white" strokeOpacity="0.7" strokeWidth="2" />
      </svg>
    );
  }

  return null;
}