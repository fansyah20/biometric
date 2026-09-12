"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  BiometricEnrollmentRecord,
  BiometricMethod,
  BiometricState,
} from "@/types/biometric";

interface BiometricContextValue extends BiometricState {
  enroll: (method: BiometricMethod, hashPreview?: string) => void;
  revoke: (method: BiometricMethod) => void;
}

const BiometricContext = createContext<BiometricContextValue | null>(null);

const EMPTY_RECORDS: BiometricState["records"] = {
  palm: { method: "palm", enrolled: false },
  face: { method: "face", enrolled: false },
  retina: { method: "retina", enrolled: false },
  "civic-hash": { method: "civic-hash", enrolled: false },
};

/**
 * "Master Signature" is considered ready once at least one biometric
 * method (or the civic hash) has been successfully enrolled — mirroring
 * the spec's "no phone/physical document needed" flow.
 */
function computeMasterSignatureReady(records: BiometricState["records"]): boolean {
  return Object.values(records).some((r) => r.enrolled);
}

export function BiometricProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<BiometricState["records"]>(EMPTY_RECORDS);

  const enroll = useCallback((method: BiometricMethod, hashPreview?: string) => {
    setRecords((prev) => {
      const record: BiometricEnrollmentRecord = {
        method,
        enrolled: true,
        enrolledAt: new Date().toISOString(),
        ...(hashPreview
          ? { civicHash: { hashPreview, createdAt: new Date().toISOString() } }
          : {}),
      };
      return { ...prev, [method]: record };
    });
  }, []);

  const revoke = useCallback((method: BiometricMethod) => {
    setRecords((prev) => ({
      ...prev,
      [method]: { method, enrolled: false },
    }));
  }, []);

  const value = useMemo<BiometricContextValue>(
    () => ({
      records,
      masterSignatureReady: computeMasterSignatureReady(records),
      enroll,
      revoke,
    }),
    [records, enroll, revoke]
  );

  return <BiometricContext.Provider value={value}>{children}</BiometricContext.Provider>;
}

export function useBiometricContext(): BiometricContextValue {
  const ctx = useContext(BiometricContext);
  if (!ctx) throw new Error("useBiometricContext must be used within a BiometricProvider");
  return ctx;
}
