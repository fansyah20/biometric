"use client";

import { useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { NpwpData } from "@/types/service";
import { Printer, FileBadge } from "lucide-react";

const MOCK_NPWP: NpwpData = {
  npwp: "09.123.456.7-089.000",
  taxpayerName: "Warga Kiosk Demo",
  kpp: "KPP Pratama Bandung Cibeunying",
  status: "active",
};

export function NpwpPrinter() {
  const [printing, setPrinting] = useState(false);
  const [printed, setPrinted] = useState(false);

  const handlePrint = () => {
    setPrinting(true);
    setTimeout(() => {
      setPrinting(false);
      setPrinted(true);
    }, 1200);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-700">
            <FileBadge className="h-5 w-5 text-emerald-300" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-display text-base text-white">Cetak NPWP Instan</h3>
            <p className="text-sm text-white/50">{MOCK_NPWP.kpp}</p>
          </div>
        </div>
        <Badge tone="gold">{MOCK_NPWP.status === "active" ? "Aktif" : "Non-Aktif"}</Badge>
      </CardHeader>

      <div className="rounded-xl bg-navy-900/60 p-4">
        <p className="text-xs text-white/50">Nomor NPWP</p>
        <p className="mt-1 font-mono text-lg text-white">{MOCK_NPWP.npwp}</p>
        <p className="mt-2 text-sm text-white/60">{MOCK_NPWP.taxpayerName}</p>
      </div>

      <Button
        className="mt-4 w-full"
        size="md"
        loading={printing}
        onClick={handlePrint}
      >
        <Printer className="h-4 w-4" aria-hidden="true" />
        {printed ? "Cetak Ulang" : "Cetak Sekarang"}
      </Button>
      {printed && (
        <p className="mt-2 text-center text-xs text-emerald-300">
          Dokumen sedang dicetak di printer kiosk.
        </p>
      )}
    </Card>
  );
}
