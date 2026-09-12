export type BiometricMethod = "palm" | "face" | "retina" | "civic-hash";

export type BiometricScanStatus =
  | "idle"
  | "positioning"
  | "scanning"
  | "processing"
  | "success"
  | "failed";

export interface BiometricMethodMeta {
  id: BiometricMethod;
  label: string;
  description: string;
  /** Marks methods designed for hands-free / accessibility use. */
  accessibilityFriendly: boolean;
}

/**
 * A locally-simulated, zero-knowledge-style commitment derived from a scan.
 * This is a UI/demo simulation only — not a real cryptographic ZKP.
 */
export interface CivicIdHash {
  hashPreview: string; // e.g. "0x7f9a...3b21"
  createdAt: string; // ISO timestamp
}

export interface BiometricEnrollmentRecord {
  method: BiometricMethod;
  enrolled: boolean;
  enrolledAt?: string;
  civicHash?: CivicIdHash;
}

export interface BiometricState {
  records: Record<BiometricMethod, BiometricEnrollmentRecord>;
  masterSignatureReady: boolean;
}

export const BIOMETRIC_METHODS: BiometricMethodMeta[] = [
  {
    id: "palm",
    label: "Telapak Tangan",
    description: "Pindai vena telapak tangan (Palm-Vein Scanner).",
    accessibilityFriendly: false,
  },
  {
    id: "face",
    label: "Face ID Hands-Free",
    description: "Pengenalan wajah tanpa sentuh, khusus aksesibilitas disabilitas.",
    accessibilityFriendly: true,
  },
  {
    id: "retina",
    label: "Retina / Iris",
    description: "Pindai pola iris mata untuk verifikasi presisi tinggi.",
    accessibilityFriendly: false,
  },
  {
    id: "civic-hash",
    label: "Unique Civic ID Hash",
    description: "Identifier terenkripsi yang diturunkan dari NIK.",
    accessibilityFriendly: true,
  },
];
