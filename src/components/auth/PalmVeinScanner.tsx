"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Hand, VideoOff } from "lucide-react";

type ScanStage = "requesting" | "live" | "scanning" | "success" | "denied";

interface PalmVeinScannerProps {
  onSuccess: () => void;
}

export function PalmVeinScanner({ onSuccess }: PalmVeinScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [stage, setStage] = useState<ScanStage>("requesting");
  const [snapshot, setSnapshot] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
        setStage("live");

        // Simulasi timing deteksi vena — hardware kios asli biasanya
        // butuh ~2-3 detik setelah telapak tangan diam di sensor.
        setTimeout(() => {
          if (cancelled) return;
          setStage("scanning");

          setTimeout(() => {
            if (cancelled) return;
            captureSnapshot();
            setStage("success");
            setTimeout(() => {
              if (!cancelled) onSuccess();
            }, 900);
          }, 1600);
        }, 2200);
      } catch {
        if (!cancelled) setStage("denied");
      }
    }

    startCamera();

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const captureSnapshot = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    setSnapshot(canvas.toDataURL("image/jpeg", 0.85));
    // Matiin live feed setelah dapet "foto" — biar mirip kamera kios
    // yang freeze pas vena berhasil match.
    streamRef.current?.getTracks().forEach((t) => t.stop());
  };

  if (stage === "denied") {
    return (
      <div className="flex flex-col items-center py-6 text-center">
        <div className="mb-5 flex h-[100px] w-[100px] items-center justify-center rounded-2xl border-2 border-dashed border-red-300 bg-red-50">
          <VideoOff className="h-10 w-10 text-red-500" aria-hidden="true" />
        </div>
        <h2 className="mb-2 text-lg font-bold text-ink">Kamera Tidak Dapat Diakses</h2>
        <p className="max-w-[300px] text-sm text-ink-muted">
          Izinkan akses kamera di browser Anda, atau gunakan terminal PalmID fisik di kios terdekat.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-6 text-center">
      <div className="relative mb-5 h-[220px] w-[220px] overflow-hidden rounded-2xl bg-navy-900">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={[
            "h-full w-full object-cover transition-opacity",
            snapshot ? "opacity-0" : "opacity-100",
          ].join(" ")}
        />
        {snapshot && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={snapshot}
            alt="Hasil pindai telapak tangan"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className={[
              "flex h-32 w-32 items-center justify-center rounded-full border-4 transition-colors",
              stage === "success"
                ? "border-emerald-400"
                : stage === "scanning"
                ? "animate-pulse border-gold-400"
                : "border-white/60",
            ].join(" ")}
          >
            {stage === "success" ? (
              <CheckCircle2 className="h-12 w-12 text-emerald-400" aria-hidden="true" />
            ) : (
              <Hand className="h-12 w-12 text-white/80" aria-hidden="true" />
            )}
          </div>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>

      <h2 className="mb-2 text-lg font-bold text-ink">
        {stage === "requesting" && "Menyiapkan Kamera…"}
        {stage === "live" && "Posisikan Telapak Tangan"}
        {stage === "scanning" && "Memindai Pola Vena…"}
        {stage === "success" && "Terverifikasi!"}
      </h2>
      <p className="max-w-[300px] text-sm text-ink-muted">
        {stage === "requesting" && "Mohon izinkan akses kamera pada browser Anda."}
        {stage === "live" &&
          "Tempatkan telapak tangan di dalam bingkai, tetap tenang selama proses berlangsung."}
        {stage === "scanning" && "Jangan gerakkan tangan Anda sampai proses selesai."}
        {stage === "success" && "Pola vena Anda berhasil dicocokkan. Mengalihkan ke dashboard…"}
      </p>
    </div>
  );
}