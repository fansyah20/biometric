"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { AccessibilityBar } from "@/components/accessibility/AccessibilityBar";
import { useAuth } from "@/context/AuthContext";
import { isProfileComplete } from "@/utils/profileCompletion";
import { ShieldAlert, ArrowRight } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { step, user } = useAuth();

  useEffect(() => {
    if (step === "idle") {
      router.replace("/auth/login");
    }
  }, [step, router]);

  if (step !== "authenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <p className="text-sm text-ink-muted">Memeriksa sesi…</p>
      </div>
    );
  }

  const complete = isProfileComplete(user);
  const onProfilePage = pathname === "/dashboard/profil";

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar profileComplete={complete} />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {!complete && !onProfilePage && (
            <div className="mb-6 flex items-center justify-between gap-4 rounded-kiosk border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-center gap-3">
                <ShieldAlert className="h-5 w-5 text-amber-600" aria-hidden="true" />
                <p className="text-sm text-ink">
                  Lengkapi data diri, dokumen, dan Master Signature di{" "}
                  <span className="font-medium text-ink">Profil</span> sebelum memakai layanan
                  otomatis.
                </p>
              </div>
              <Link
                href="/dashboard/profil"
                className="flex items-center gap-1.5 whitespace-nowrap rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600"
              >
                Lengkapi Profil
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
