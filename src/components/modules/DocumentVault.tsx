"use client";

import { useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { DocumentCert } from "@/types/service";
import { FileCheck2, Download, ShieldCheck } from "lucide-react";

interface DocumentVaultProps {
  documents: DocumentCert[];
}

function formatKb(kb: number): string {
  return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;
}

export function DocumentVault({ documents }: DocumentVaultProps) {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedIds, setDownloadedIds] = useState<Set<string>>(new Set());

  const handleDownload = (id: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedIds((prev) => new Set(prev).add(id));
    }, 900);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-700">
            <FileCheck2 className="h-5 w-5 text-emerald-300" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-display text-base text-white">Document Vault</h3>
            <p className="text-sm text-white/50">Sertifikat & surat terverifikasi</p>
          </div>
        </div>
      </CardHeader>

      <ul className="space-y-3">
        {documents.map((doc) => (
          <li
            key={doc.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-navy-900/60 p-4"
          >
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 truncate text-sm font-medium text-white">
                {doc.title}
                {doc.verified && (
                  <ShieldCheck
                    className="h-3.5 w-3.5 shrink-0 text-emerald-400"
                    aria-label="Terverifikasi"
                  />
                )}
              </p>
              <p className="text-xs text-white/40">
                Diterbitkan {doc.issuedAt} · {formatKb(doc.fileSizeKb)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {doc.verified && <Badge tone="emerald">Valid</Badge>}
              <Button
                size="md"
                variant="secondary"
                loading={downloadingId === doc.id}
                onClick={() => handleDownload(doc.id)}
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {downloadedIds.has(doc.id) ? "Unduh Ulang" : "Unduh"}
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {documents.length === 0 && (
        <p className="py-6 text-center text-sm text-white/40">
          Belum ada dokumen yang tersedia di vault Anda.
        </p>
      )}
    </Card>
  );
}
