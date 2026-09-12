import type { UserProfile } from "@/types/user";
import { DOCUMENT_CATALOG } from "@/types/document";

/**
 * Profil dianggap "lengkap" kalau NIK sudah diisi + semua dokumen wajib
 * (foto, KTP, KK, akte) sudah diunggah. Ini yang menggerbang biometrik +
 * layanan otomatis lainnya.
 */
export function isProfileComplete(user: UserProfile | null): boolean {
  if (!user || !user.nik) return false;
  const requiredKeys = DOCUMENT_CATALOG.filter((d) => d.required).map((d) => d.key);
  return requiredKeys.every((key) => {
    const record = user.documents?.[key];
    return record?.status === "uploaded" || record?.status === "verified";
  });
}