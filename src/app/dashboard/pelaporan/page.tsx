"use client";

import { useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { SptReport, TaxArrear, BansosEligibility } from "@/types/service";
import { ClipboardList, AlertTriangle, HeartHandshake, Send } from "lucide-react";

const SPT: SptReport = {
  id: "spt-2025",
  taxYear: 2025,
  formType: "1770S",
  status: "draft",
};

const ARREARS: TaxArrear[] = [
  {
    id: "arrear-pkb",
    category: "pkb",
    periodLabel: "PKB Tahun 2025",
    amountIdr: 875000,
    overdueDays: 12,
  },
];

const BANSOS: BansosEligibility = {
  programName: "PKH (Program Keluarga Harapan)",
  status: "eligible",
  lastUpdated: "1 Sep 2026",
  note: "Verifikasi lanjutan di kantor desa tidak diperlukan.",
};

const SPT_STATUS_LABEL: Record<SptReport["status"], string> = {
  draft: "Draft",
  submitted: "Terkirim",
  verified: "Terverifikasi",
};

const BANSOS_TONE: Record<BansosEligibility["status"], "emerald" | "gold" | "danger" | "neutral"> = {
  eligible: "emerald",
  disbursed: "emerald",
  "under-review": "gold",
  "not-eligible": "danger",
};

const BANSOS_LABEL: Record<BansosEligibility["status"], string> = {
  eligible: "Layak Menerima",
  disbursed: "Sudah Disalurkan",
  "under-review": "Sedang Ditinjau",
  "not-eligible": "Tidak Layak",
};

function formatIdr(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function PelaporanPage() {
  const [sptStatus, setSptStatus] = useState(SPT.status);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitSpt = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSptStatus("submitted");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-white">Pelaporan &amp; Status</h1>
        <p className="mt-1 text-sm text-white/50">
          SPT Tahunan, riwayat tunggakan pajak, dan status kelayakan bansos.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-700">
                <ClipboardList className="h-5 w-5 text-emerald-300" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-base text-white">Lapor SPT Tahunan</h3>
                <p className="text-sm text-white/50">Formulir {SPT.formType} &middot; Tahun {SPT.taxYear}</p>
              </div>
            </div>
            <Badge tone={sptStatus === "draft" ? "gold" : "emerald"}>
              {SPT_STATUS_LABEL[sptStatus]}
            </Badge>
          </CardHeader>
          <p className="mb-4 text-sm text-white/60">
            {sptStatus === "draft"
              ? "Draft SPT Anda sudah terisi otomatis dari data pemotongan. Tinjau lalu kirim."
              : "SPT telah dikirim dan menunggu verifikasi Direktorat Jenderal Pajak."}
          </p>
          <Button
            className="w-full"
            size="md"
            disabled={sptStatus !== "draft"}
            loading={submitting}
            onClick={handleSubmitSpt}
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            {sptStatus === "draft" ? "Kirim SPT" : "Sudah Dikirim"}
          </Button>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-700">
                <AlertTriangle className="h-5 w-5 text-gold-300" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-base text-white">Riwayat Tunggakan Pajak</h3>
                <p className="text-sm text-white/50">{ARREARS.length} tunggakan aktif</p>
              </div>
            </div>
          </CardHeader>
          {ARREARS.length === 0 ? (
            <p className="text-sm text-white/50">Tidak ada tunggakan pajak. Semua lunas.</p>
          ) : (
            <ul className="space-y-2">
              {ARREARS.map((arrear) => (
                <li
                  key={arrear.id}
                  className="flex items-center justify-between rounded-xl bg-navy-900/60 p-4"
                >
                  <div>
                    <p className="text-sm text-white">{arrear.periodLabel}</p>
                    <p className="text-xs text-red-300">
                      Terlambat {arrear.overdueDays} hari
                    </p>
                  </div>
                  <p className="font-mono text-sm text-white">{formatIdr(arrear.amountIdr)}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-700">
                <HeartHandshake className="h-5 w-5 text-emerald-300" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-base text-white">Status Kelayakan Bansos / PKH</h3>
                <p className="text-sm text-white/50">{BANSOS.programName}</p>
              </div>
            </div>
            <Badge tone={BANSOS_TONE[BANSOS.status]}>{BANSOS_LABEL[BANSOS.status]}</Badge>
          </CardHeader>
          <p className="text-sm text-white/60">{BANSOS.note}</p>
          <p className="mt-2 text-xs text-white/40">Terakhir diperbarui {BANSOS.lastUpdated}</p>
        </Card>
      </div>
    </div>
  );
}
