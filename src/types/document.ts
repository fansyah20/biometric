export type DocumentKey =
  | "foto-pribadi"
  | "ktp"
  | "kk"
  | "akte"
  | "npwp"
  | "nib"
  | "dokumen-perusahaan"
  | "info-bansos";

export interface DocumentMeta {
  key: DocumentKey;
  label: string;
  description: string;
  required: boolean;
}

export const DOCUMENT_CATALOG: DocumentMeta[] = [
  { key: "foto-pribadi", label: "Foto Pribadi", description: "Foto wajah terbaru, latar polos.", required: true },
  { key: "ktp", label: "KTP", description: "Kartu Tanda Penduduk yang masih berlaku.", required: true },
  { key: "kk", label: "Kartu Keluarga (KK)", description: "Kartu Keluarga terbaru.", required: true },
  { key: "akte", label: "Akte Kelahiran", description: "Akte kelahiran atau surat kenal lahir.", required: true },
  { key: "npwp", label: "NPWP", description: "Nomor Pokok Wajib Pajak — opsional.", required: false },
  { key: "nib", label: "NIB", description: "Nomor Induk Berusaha — opsional, untuk pelaku usaha.", required: false },
  { key: "dokumen-perusahaan", label: "Dokumen Perusahaan", description: "Akta pendirian / legalitas usaha — opsional.", required: false },
  { key: "info-bansos", label: "Info Bansos", description: "Data kepesertaan program bantuan sosial — opsional.", required: false },
];

export type DocumentStatus = "empty" | "uploaded" | "verified";

export interface DocumentRecord {
  key: DocumentKey;
  status: DocumentStatus;
  fileName?: string;
  uploadedAt?: string;
}

export function emptyDocumentRecords(): Record<DocumentKey, DocumentRecord> {
  return DOCUMENT_CATALOG.reduce((acc, doc) => {
    acc[doc.key] = { key: doc.key, status: "empty" };
    return acc;
  }, {} as Record<DocumentKey, DocumentRecord>);
}