"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ScannerModal } from "@/components/biometric/ScannerModal";
import { useBiometricContext } from "@/context/BiometricContext";
import { BIOMETRIC_METHODS, type BiometricMethod } from "@/types/biometric";
import { Hand, ScanFace, Eye, Fingerprint, Accessibility } from "lucide-react";

const METHOD_ICONS: Record<BiometricMethod, typeof Hand> = {
  palm: Hand,
  face: ScanFace,
  retina: Eye,
  "civic-hash": Fingerprint,
};

interface MultiBiometricCardProps {
  nikSeed: string;
}

export function MultiBiometricCard({ nikSeed }: MultiBiometricCardProps) {
  const { records, enroll, masterSignatureReady } = useBiometricContext();
  const [activeMethod, setActiveMethod] = useState<BiometricMethod | null>(null);

  return (
    <Card>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg text-ink">Master Signature</h3>
          <p className="text-sm text-ink-muted">
            Daftarkan minimal satu metode untuk akses tanpa HP/dokumen fisik.
          </p>
        </div>
        <Badge tone={masterSignatureReady ? "emerald" : "neutral"}>
          {masterSignatureReady ? "Aktif" : "Belum Aktif"}
        </Badge>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {BIOMETRIC_METHODS.map((meta) => {
          const Icon = METHOD_ICONS[meta.id];
          const record = records[meta.id];
          return (
            <li
              key={meta.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-surface-border bg-surface-muted p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50">
                  <Icon className="h-5 w-5 text-brand-700" aria-hidden="true" />
                </div>
                <div>
                  <p className="flex items-center gap-1.5 text-sm font-medium text-ink">
                    {meta.label}
                    {meta.accessibilityFriendly && (
                      <Accessibility className="h-3.5 w-3.5 text-amber-500" aria-label="Ramah aksesibilitas" />
                    )}
                  </p>
                  <p className="text-xs text-ink-muted">
                    {record.enrolled ? "Terdaftar" : "Belum terdaftar"}
                  </p>
                </div>
              </div>
              <Button
                size="md"
                variant={record.enrolled ? "secondary" : "primary"}
                onClick={() => setActiveMethod(meta.id)}
              >
                {record.enrolled ? "Ulangi" : "Daftar"}
              </Button>
            </li>
          );
        })}
      </ul>

      {activeMethod && (
        <ScannerModal
          open={activeMethod !== null}
          method={activeMethod}
          seed={nikSeed}
          onClose={() => setActiveMethod(null)}
          onEnrolled={(method, hashPreview) => enroll(method, hashPreview)}
        />
      )}
    </Card>
  );
}
