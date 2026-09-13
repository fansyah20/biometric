"use client";

import { useState, type ChangeEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import type { NIK } from "@/types/user";
import { DOCUMENT_CATALOG, emptyDocumentRecords } from "@/types/document";
import { DocumentUploadRow } from "@/components/ui/DocumentUploadRow";
import { MultiBiometricCard } from "@/components/biometric/MultiBiometricCard";
import { isProfileComplete } from "@/utils/profileCompletion";
import { Save, ShieldCheck, Lock } from "lucide-react";

export default function ProfilPage() {
  const { user, updateProfile, setDocument } = useAuth();

  const [form, setForm] = useState({
    nik: user?.nik ?? "",
    birthPlace: user?.birthPlace ?? "",
    birthDate: user?.birthDate ?? "",
    address: user?.address ?? "",
    district: user?.district ?? "",
    city: user?.city ?? "",
    province: user?.province ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const documents = user?.documents ?? emptyDocumentRecords();
  const requiredDone = DOCUMENT_CATALOG.filter((d) => d.required).every(
    (d) => documents[d.key]?.status !== "empty"
  );
  const complete = isProfileComplete(user);

  const handleField =
  (key: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setSaved(false);
  };

  const handleSaveData = () => {
    setSaving(true);
    setTimeout(() => {
      updateProfile({
        nik: form.nik ? (form.nik as NIK) : undefined,
        birthPlace: form.birthPlace || undefined,
        birthDate: form.birthDate || undefined,
        address: form.address || undefined,
        district: form.district || undefined,
        city: form.city || undefined,
        province: form.province || undefined,
      });
      setSaving(false);
      setSaved(true);
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-ink">Profil Saya</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Lengkapi data diri, dokumen, dan Master Signature untuk membuka layanan otomatis.
        </p>
      </div>

      <div
        className={[
          "flex items-center gap-3 rounded-kiosk border p-4",
          complete ? "border-emerald-500/30 bg-emerald-500/10" : "border-gold-500/40 bg-gold-400/10",
        ].join(" ")}
      >
        <ShieldCheck
          className={["h-5 w-5", complete ? "text-emerald-600" : "text-gold-500"].join(" ")}
          aria-hidden="true"
        />
        <p className="text-sm text-ink">
          {complete
            ? "Profil lengkap & terverifikasi — semua layanan otomatis sudah bisa dipakai."
            : "Lengkapi NIK dan dokumen wajib di bawah supaya layanan otomatis bisa aktif."}
        </p>
      </div>

      <section className="rounded-kiosk border border-surface-border bg-white p-6">
        <h2 className="font-display text-lg text-ink">Data Diri</h2>
        <p className="mt-1 text-sm text-ink-muted">Data ini disinkronkan dengan Dukcapil setelah diverifikasi.</p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="NIK" value={form.nik} onChange={handleField("nik")} placeholder="16 digit NIK" />
          <Field label="Tempat Lahir" value={form.birthPlace} onChange={handleField("birthPlace")} />
          <Field label="Tanggal Lahir" type="date" value={form.birthDate} onChange={handleField("birthDate")} />
          <Field label="Kecamatan" value={form.district} onChange={handleField("district")} />
          <Field label="Kota/Kabupaten" value={form.city} onChange={handleField("city")} />
          <Field label="Provinsi" value={form.province} onChange={handleField("province")} />
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm text-ink-muted">Alamat Domisili</label>
            <textarea
              rows={3}
              value={form.address}
              onChange={handleField("address")}
              className="w-full rounded-xl border border-surface-border bg-white px-4 py-3 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            />
          </div>
        </div>

        <button
          onClick={handleSaveData}
          disabled={saving}
          className="mt-4 flex items-center gap-2 rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-800 disabled:opacity-50"
        >
          <Save className="h-4 w-4" aria-hidden="true" />
          {saving ? "Menyimpan…" : "Simpan Data Diri"}
        </button>
        {saved && <p className="mt-2 text-xs text-emerald-600">Data diri berhasil disimpan.</p>}
      </section>

      <section className="rounded-kiosk border border-surface-border bg-white p-6">
        <h2 className="font-display text-lg text-ink">Dokumen</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Wajib: Foto Pribadi, KTP, KK, Akte. Opsional: NPWP, NIB, Dokumen Perusahaan, Info Bansos.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {DOCUMENT_CATALOG.map((meta) => (
            <DocumentUploadRow
              key={meta.key}
              meta={meta}
              record={documents[meta.key]}
              onUpload={(fileName) =>
                setDocument(meta.key, { status: "uploaded", fileName, uploadedAt: new Date().toISOString() })
              }
            />
          ))}
        </div>
      </section>

      <section className="rounded-kiosk border border-surface-border bg-white p-6">
        <h2 className="font-display text-lg text-ink">Master Signature</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Daftarkan Palm-Vein, Face ID, Retina, atau Civic ID Hash setelah dokumen wajib lengkap.
        </p>

        {requiredDone ? (
          <div className="mt-4">
            <MultiBiometricCard nikSeed={user?.nik ?? user?.email ?? "guest"} />
          </div>
        ) : (
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-surface-border bg-surface-muted p-6">
            <Lock className="h-5 w-5 shrink-0 text-ink-muted" aria-hidden="true" />
            <p className="text-sm text-ink-muted">
              Lengkapi dokumen wajib (Foto, KTP, KK, Akte) dulu untuk membuka pendaftaran biometrik.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-ink-muted">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-surface-border bg-white px-4 py-3 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      />
    </div>
  );
}