"use client";

import { useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { EfinData } from "@/types/service";
import { KeyRound } from "lucide-react";

const MOCK_EFIN: EfinData = {
  nik: "3273010101990001",
  efinMasked: "12••••90",
  status: "active",
  lastRequestedAt: "2026-08-14",
};

export function EfinLookupWidget() {
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const handleLookup = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRevealed(true);
    }, 900);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-700">
            <KeyRound className="h-5 w-5 text-emerald-300" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-display text-base text-ink">Cek / Lupa EFIN</h3>
            <p className="text-sm text-ink-muted">Diverifikasi otomatis via biometrik</p>
          </div>
        </div>
        <Badge tone={MOCK_EFIN.status === "active" ? "emerald" : "danger"}>
          {MOCK_EFIN.status === "active" ? "Aktif" : "Belum Terdaftar"}
        </Badge>
      </CardHeader>

      {revealed ? (
        <div className="rounded-xl bg-navy-900 p-4">
          <p className="text-xs text-white/50">Nomor EFIN Anda</p>
          <p className="mt-1 font-mono text-2xl tracking-widest text-emerald-300">
            {MOCK_EFIN.efinMasked}
          </p>
          <p className="mt-2 text-xs text-white/60">
            Terakhir diminta: {MOCK_EFIN.lastRequestedAt}
          </p>
        </div>
      ) : (
        <p className="mb-4 text-sm text-ink-muted">
          Tekan tombol di bawah — sistem akan mencocokkan EFIN dengan data biometrik yang
          sudah terdaftar, tanpa perlu formulir manual.
        </p>
      )}

      <Button className="mt-4 w-full" size="md" loading={loading} onClick={handleLookup}>
        {revealed ? "Tampilkan Ulang" : "Cek EFIN Sekarang"}
      </Button>
    </Card>
  );
}
