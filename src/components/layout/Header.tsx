"use client";

import { useAuth } from "@/context/AuthContext";
import { maskNik } from "@/utils/cryptoSim";
import { LogOut, Fingerprint } from "lucide-react";

export function Header() {
  const { user, logout } = useAuth();
  const biometricLinked = Boolean(user?.nik);

  return (
    <header className="flex items-center justify-between border-b border-surface-border bg-white px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-700 text-white font-display font-bold">
          G
        </div>
        <div>
          <p className="font-display text-sm text-ink">GovFlow Kiosk</p>
          <p className="text-xs text-ink-muted">{user?.fullName ?? "Warga"}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-xl border border-brand-200 bg-brand-50 px-3 py-1.5 sm:flex">
          <Fingerprint className="h-4 w-4 text-brand-700" aria-hidden="true" />
          <div className="leading-tight">
            <p className="font-mono text-xs text-brand-800">
              NIK: {user?.nik ? maskNik(user.nik) : "----------------"}
            </p>
            <p className="text-[11px] text-brand-700/70">
              {biometricLinked ? "Terdaftar" : "Belum terdaftar"}
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-1.5 rounded-xl bg-red-50 px-3 py-1.5 text-sm text-red-600 hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Keluar
        </button>
      </div>
    </header>
  );
}