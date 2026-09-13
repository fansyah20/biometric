"use client";

import { PillarGrid } from "@/components/modules/PillarGrid";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/context/AuthContext";
import { useBiometricContext } from "@/context/BiometricContext";
import Link from "next/link";
import { Fingerprint, ArrowRight } from "lucide-react";

export default function DashboardOverviewPage() {
  const { user } = useAuth();
  const { masterSignatureReady } = useBiometricContext();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-ink">
          Halo, {user?.fullName?.split(" ")[0] ?? "Warga"}
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          Pilih salah satu dari 4 pilar layanan kiosk di bawah ini.
        </p>
      </div>

      {!masterSignatureReady && (
        <Card className="border-amber-200 bg-amber-50">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                <Fingerprint className="h-5 w-5 text-amber-600" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-medium text-ink">
                  Master Signature belum aktif
                </p>
                <p className="text-sm text-ink-muted">
                  Daftarkan biometrik agar bisa akses semua modul tanpa HP/dokumen.
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/profil"
              className="flex items-center gap-1.5 whitespace-nowrap rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
            >
              Daftar Sekarang
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Card>
      )}

      {masterSignatureReady && (
        <Badge tone="emerald">Master Signature aktif — semua modul terbuka</Badge>
      )}

      <PillarGrid />
    </div>
  );
}
