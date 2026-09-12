"use client";

import { useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { NibData } from "@/types/service";
import { Building2, Printer } from "lucide-react";

const MOCK_NIB: NibData = {
  nib: "9120009876543",
  businessName: "UMKM Berkah Jaya",
  kbliCode: "47111",
  issuedAt: "2025-11-02",
  status: "valid",
};

export function NibPrinter() {
  const [printing, setPrinting] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-700">
            <Building2 className="h-5 w-5 text-emerald-300" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-display text-base text-white">Cetak NIB (OSS)</h3>
            <p className="text-sm text-white/50">KBLI {MOCK_NIB.kbliCode}</p>
          </div>
        </div>
        <Badge tone="emerald">
          {MOCK_NIB.status === "valid" ? "Berlaku" : "Ditinjau"}
        </Badge>
      </CardHeader>

      <div className="rounded-xl bg-navy-900/60 p-4">
        <p className="text-xs text-white/50">Nomor Induk Berusaha</p>
        <p className="mt-1 font-mono text-lg text-white">{MOCK_NIB.nib}</p>
        <p className="mt-2 text-sm text-white/60">{MOCK_NIB.businessName}</p>
        <p className="text-xs text-white/40">Diterbitkan {MOCK_NIB.issuedAt}</p>
      </div>

      <Button
        className="mt-4 w-full"
        size="md"
        loading={printing}
        onClick={() => setPrinting((p) => !p)}
      >
        <Printer className="h-4 w-4" aria-hidden="true" />
        Cetak Sekarang
      </Button>
    </Card>
  );
}
