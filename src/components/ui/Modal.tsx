"use client";

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  widthClassName?: string;
}

export function Modal({ open, onClose, title, children, widthClassName = "max-w-lg" }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/80 p-4 backdrop-blur-sm"
    >
      <div
        className={[
          "w-full rounded-kiosk border border-white/10 bg-navy-800 p-6 shadow-panel",
          widthClassName,
        ].join(" ")}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 id="modal-title" className="font-display text-xl text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="rounded-full p-1.5 text-white/60 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
