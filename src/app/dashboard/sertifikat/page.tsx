"use client";

import { DocumentVault } from "@/components/modules/DocumentVault";
import type { DocumentCert } from "@/types/service";

const DOCUMENTS: DocumentCert[] = [
  {
    id: "doc-suket-fiskal",
    type: "suket-fiskal",
    title: "Surat Keterangan Fiskal",
    issuedAt: "3 Sep 2026",
    verified: true,
    fileSizeKb: 240,
  },
  {
    id: "doc-e-bupot",
    type: "e-bupot",
    title: "e-Bupot (Bukti Potong)",
    issuedAt: "28 Ags 2026",
    verified: true,
    fileSizeKb: 180,
  },
  {
    id: "doc-sertifikat-digital",
    type: "sertifikat-digital",
    title: "Sertifikat Digital Terverifikasi",
    issuedAt: "15 Ags 2026",
    verified: true,
    fileSizeKb: 96,
  },
];

export default function SertifikatPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-ink">Sertifikat &amp; Surat</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Cetak Suket Fiskal, e-Bupot, dan unduh sertifikat digital terverifikasi.
        </p>
      </div>

      <DocumentVault documents={DOCUMENTS} />
    </div>
  );
}
