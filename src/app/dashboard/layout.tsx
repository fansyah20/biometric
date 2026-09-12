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
      <div className="flex min-h-screen items-center justify-center bg-navy-900">
        <p className="text-sm text-white/50">Memeriksa sesi…</p>
      </div>
    );
  }

  const complete = isProfileComplete(user);
  const onProfilePage = pathname === "/dashboard/profil";

  return (
    <div className="flex min-h-screen bg-navy-900">
      <Sidebar profileComplete={complete} />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {!complete && !onProfilePage && (
            <div className="mb-6 flex items-center justify-between gap-4 rounded-kiosk border border-gold-400/30 bg-gold-400/5 p-4">
              <div className="flex items-center gap-3">
                <ShieldAlert className="h-5 w-5 text-gold-300" aria-hidden="true" />
                <p className="text-sm text-white/80">
                  Lengkapi data diri, dokumen, dan Master Signature di{" "}
                  <span className="font-medium text-white">Profil</span> sebelum memakai layanan
                  otomatis.
                </p>
              </div>
              <Link
                href="/dashboard/profil"
                className="flex items-center gap-1.5 whitespace-nowrap rounded-xl bg-gold-400 px-4 py-2 text-sm font-medium text-navy-950 hover:bg-gold-300"
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