"use client";

import { useState } from "react";
import { NpwpPrinter } from "@/components/modules/NpwpPrinter";
import { EfinLookupWidget } from "@/components/modules/EfinLookupWidget";
import { NibPrinter } from "@/components/modules/NibPrinter";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { UserCog, Save } from "lucide-react";

export default function AdministrasiPage() {
  const { user } = useAuth();
  const [address, setAddress] = useState(user?.address ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-white">Administrasi &amp; Identitas</h1>
        <p className="mt-1 text-sm text-white/50">
          Cetak NPWP, cek EFIN, cetak NIB, dan perbarui profil kependudukan.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <NpwpPrinter />
        <EfinLookupWidget />
        <NibPrinter />

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-700">
                <UserCog className="h-5 w-5 text-emerald-300" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display text-base text-white">Update Profil Kependudukan</h3>
                <p className="text-sm text-white/50">{user?.fullName}</p>
              </div>
            </div>
          </CardHeader>

          <label htmlFor="address" className="mb-1.5 block text-sm text-white/70">
            Alamat Domisili
          </label>
          <textarea
            id="address"
            rows={3}
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              setSaved(false);
            }}
            className="w-full rounded-xl border border-white/15 bg-navy-900/60 px-4 py-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          />

          <Button className="mt-4 w-full" size="md" loading={saving} onClick={handleSave}>
            <Save className="h-4 w-4" aria-hidden="true" />
            Simpan Perubahan
          </Button>
          {saved && (
            <p className="mt-2 text-center text-xs text-emerald-300">
              Profil berhasil diperbarui.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
