"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BiometricEnrollmentRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard/profil");
  }, [router]);
  return null;
}