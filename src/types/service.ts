export type PillarId = "administrasi" | "pajak" | "pelaporan" | "sertifikat";

export interface PillarMeta {
  id: PillarId;
  title: string;
  subtitle: string;
  href: string;
}

export const PILLARS: PillarMeta[] = [
  {
    id: "administrasi",
    title: "Administrasi & Identitas",
    subtitle: "NPWP, EFIN, NIB, Profil Kependudukan",
    href: "/dashboard/administrasi",
  },
  {
    id: "pajak",
    title: "Pembayaran Pajak & Retribusi",
    subtitle: "PPh UMKM, PBB, PKB, Retribusi Daerah",
    href: "/dashboard/pajak",
  },
  {
    id: "pelaporan",
    title: "Pelaporan & Status",
    subtitle: "SPT Tahunan, Tunggakan, Bansos/PKH",
    href: "/dashboard/pelaporan",
  },
  {
    id: "sertifikat",
    title: "Sertifikat & Surat",
    subtitle: "Suket Fiskal, e-Bupot, Sertifikat Digital",
    href: "/dashboard/sertifikat",
  },
];

/** Pilar 1: Administrasi & Identitas */
export interface EfinData {
  nik: string;
  efinMasked: string; // e.g. "12••••90"
  status: "active" | "not-registered" | "locked";
  lastRequestedAt?: string;
}

export interface NibData {
  nib: string;
  businessName: string;
  kbliCode: string;
  issuedAt: string;
  status: "valid" | "pending" | "revoked";
}

export interface NpwpData {
  npwp: string; // formatted xx.xxx.xxx.x-xxx.xxx
  taxpayerName: string;
  kpp: string; // Kantor Pelayanan Pajak
  status: "active" | "non-active";
}

/** Pilar 2: Pembayaran Pajak & Retribusi */
export type TaxCategory = "pph-umkm" | "pbb" | "pkb" | "retribusi";

export interface TaxBill {
  id: string;
  category: TaxCategory;
  label: string;
  periodLabel: string; // e.g. "Tahun 2026"
  amountIdr: number;
  dueDate: string;
  status: "unpaid" | "paid" | "overdue";
}

/** Pilar 3: Pelaporan & Status */
export interface SptReport {
  id: string;
  taxYear: number;
  formType: "1770" | "1770S" | "1770SS";
  status: "draft" | "submitted" | "verified";
  submittedAt?: string;
}

export interface TaxArrear {
  id: string;
  category: TaxCategory;
  periodLabel: string;
  amountIdr: number;
  overdueDays: number;
}

export type BansosStatus = "eligible" | "under-review" | "not-eligible" | "disbursed";

export interface BansosEligibility {
  programName: string; // e.g. "PKH", "BPNT"
  status: BansosStatus;
  lastUpdated: string;
  note?: string;
}

/** Pilar 4: Sertifikat & Surat (Document Vault) */
export type DocumentCertType = "suket-fiskal" | "e-bupot" | "sertifikat-digital";

export interface DocumentCert {
  id: string;
  type: DocumentCertType;
  title: string;
  issuedAt: string;
  verified: boolean;
  fileSizeKb: number;
}
