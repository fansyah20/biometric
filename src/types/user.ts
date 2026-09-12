import type { DocumentKey, DocumentRecord } from "@/types/document";

export type NIK = string & { readonly __brand: "NIK" };

export function isValidNik(value: string): value is NIK {
  return /^\d{16}$/.test(value);
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  nik?: NIK;
  birthPlace?: string;
  birthDate?: string;
  address?: string;
  district?: string;
  city?: string;
  province?: string;
  photoUrl?: string;
  documents?: Record<DocumentKey, DocumentRecord>;
}

export type AuthStep = "idle" | "authenticating" | "authenticated" | "error";

export interface AuthState {
  step: AuthStep;
  user: UserProfile | null;
  error: string | null;
}