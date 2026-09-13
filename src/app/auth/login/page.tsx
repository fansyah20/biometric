"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLeftPanel } from "@/components/auth/AuthLeftPanel";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Hand, Lock, Mail, ShieldCheck } from "lucide-react";
import { PalmVeinScanner } from "@/components/auth/PalmVeinScanner";

type AuthTab = "email" | "biometric";

export default function LoginPage() {
  const router = useRouter();
  const { step, error, login } = useAuth();
  const [tab, setTab] = useState<AuthTab>("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reveal, setReveal] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.ok) {
      router.push("/dashboard");
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-surface">
      <div className="flex flex-1">
        <AuthLeftPanel />

        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <div className="w-full max-w-[480px] rounded-2xl border border-surface-border bg-white p-8 shadow-lg">
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-brand-700"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Kembali ke Beranda
            </Link>

            {/* Mobile logo (left panel is hidden below lg) */}
            <div className="mb-6 flex items-center gap-2 lg:hidden">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-700">
                <ShieldCheck className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <span className="text-base font-bold text-ink">GovFlow / PalmID</span>
            </div>

            <div className="mb-6">
              <h1 className="mb-1.5 text-2xl font-extrabold tracking-tight text-ink">Masuk ke GovFlow</h1>
              <p className="text-sm text-ink-muted">Gunakan NIK atau Email terdaftar Anda</p>
            </div>

            {/* Tab switcher */}
            <div className="mb-6 flex rounded-xl border border-surface-border bg-surface-muted p-1">
              <button
                type="button"
                onClick={() => setTab("email")}
                className={[
                  "flex flex-1 items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-semibold transition-colors",
                  tab === "email"
                    ? "border-surface-border bg-white text-brand-700 shadow-sm"
                    : "border-transparent text-ink-muted",
                ].join(" ")}
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email / NIK
              </button>
              <button
                type="button"
                onClick={() => setTab("biometric")}
                className={[
                  "flex flex-1 items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-semibold transition-colors",
                  tab === "biometric"
                    ? "border-surface-border bg-white text-brand-700 shadow-sm"
                    : "border-transparent text-ink-muted",
                ].join(" ")}
              >
                <Hand className="h-4 w-4" aria-hidden="true" />
                Scan Vena Telapak
                <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600">
                  Kios Only
                </span>
              </button>
            </div>

            {tab === "email" ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="relative">
                  <Mail
                    className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-muted"
                    aria-hidden="true"
                  />
                  <input
                    type="text"
                    autoComplete="username"
                    required
                    placeholder="NIK (16 digit) atau Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-[10px] border border-surface-border bg-surface-muted py-3 pr-3.5 pl-[42px] text-sm text-ink outline-none transition-colors focus:border-brand-700"
                  />
                </div>

                <div className="relative">
                  <Lock
                    className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-muted"
                    aria-hidden="true"
                  />
                  <input
                    type={reveal ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    placeholder="Kata Sandi"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-[10px] border border-surface-border bg-surface-muted py-3 pr-11 pl-[42px] text-sm text-ink outline-none transition-colors focus:border-brand-700"
                  />
                  <button
                    type="button"
                    onClick={() => setReveal((v) => !v)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-ink-muted hover:text-ink"
                    aria-label={reveal ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                  >
                    {reveal ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <div className="flex justify-end">
                  <Link href="#" className="text-[13px] font-medium text-brand-700 hover:text-gold-500">
                    Lupa Kata Sandi?
                  </Link>
                </div>

                <Button
                  type="submit"
                  variant="brand"
                  size="lg"
                  loading={step === "authenticating"}
                  className="w-full justify-center gap-2.5"
                >
                  Masuk ke Dashboard
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>

                <div className="my-1 flex items-center gap-3">
                  <div className="h-px flex-1 bg-surface-border" />
                  <span className="text-xs text-ink-muted">atau</span>
                  <div className="h-px flex-1 bg-surface-border" />
                </div>

                <p className="text-center text-[13px] text-ink-muted">
                  Belum punya akun?{" "}
                  <Link href="/auth/register" className="font-semibold text-brand-700 hover:text-gold-500">
                    Daftar Akun Warga →
                  </Link>
                </p>
              </form>
            ) : (
              <PalmVeinScanner onSuccess={() => router.push("/dashboard")} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
