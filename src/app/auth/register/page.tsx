"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
  import { AuthLeftPanel } from "@/components/layout/AuthLeftPanel";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { Eye, EyeOff, Lock, Mail, Phone, ShieldCheck, User } from "lucide-react";

const STRENGTH_COLORS = ["#EF4444", "#F97316", "#EAB308", "#10B981"];
const STRENGTH_LABELS = ["Lemah", "Cukup", "Kuat", "Sangat Kuat"];

export default function RegisterPage() {
  const router = useRouter();
  const { register, login } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [reveal, setReveal] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const strength = Math.min(4, Math.floor(password.length / 3));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }
    if (!agreed) {
      setError("Anda harus menyetujui Syarat & Ketentuan serta Kebijakan Privasi.");
      return;
    }

    setSubmitting(true);
    const result = await register({ fullName, email, phone, password });
    if (!result.ok) {
      setError(result.error ?? "Pendaftaran gagal.");
      setSubmitting(false);
      return;
    }

    const loginResult = await login(email, password);
    setSubmitting(false);
    if (loginResult.ok) {
      router.push("/dashboard");
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-surface">

      <div className="flex flex-1">
        <AuthLeftPanel />
        
        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <div className="w-full max-w-[480px] rounded-2xl border border-surface-border bg-white p-8 shadow-lg">
            {/* Mobile logo (left panel is hidden below lg) */}
            <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-brand-700"
        >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Kembali ke Beranda
          </Link>
            <div className="mb-6 flex items-center gap-2 lg:hidden">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-700">
                <ShieldCheck className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <span className="text-base font-bold text-ink">GovFlow / PalmID</span>
            </div>

            <div className="mb-6">
              <h1 className="mb-1.5 text-2xl font-extrabold tracking-tight text-ink">Buat Akun Warga Baru</h1>
              <p className="text-sm text-ink-muted">
                Data KTP/NIK bisa dilengkapi nanti di halaman Profil setelah masuk.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative">
                <User
                  className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-muted"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Nama Lengkap Sesuai KTP"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-[10px] border border-surface-border bg-surface-muted py-3 pr-3.5 pl-[42px] text-sm text-ink outline-none transition-colors focus:border-brand-700"
                />
              </div>

              <div className="relative">
                <Mail
                  className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-muted"
                  aria-hidden="true"
                />
                <input
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email Aktif"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-[10px] border border-surface-border bg-surface-muted py-3 pr-3.5 pl-[42px] text-sm text-ink outline-none transition-colors focus:border-brand-700"
                />
              </div>

              <div className="relative">
                <Phone
                  className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-muted"
                  aria-hidden="true"
                />
                <input
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel"
                  required
                  placeholder="Nomor HP (08xx)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^\d+]/g, ""))}
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
                  autoComplete="new-password"
                  required
                  placeholder="Buat Kata Sandi"
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

              {password.length > 0 && (
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-1 flex-1 rounded-full transition-all"
                      style={{ background: i < strength ? STRENGTH_COLORS[strength - 1] : "#E2E8F0" }}
                    />
                  ))}
                  <span className="ml-1 whitespace-nowrap text-[11px] text-ink-muted">
                    {STRENGTH_LABELS[Math.max(0, strength - 1)]}
                  </span>
                </div>
              )}

              <div className="relative">
                <Lock
                  className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-ink-muted"
                  aria-hidden="true"
                />
                <input
                  type={reveal ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  placeholder="Ulangi Kata Sandi"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-[10px] border border-surface-border bg-surface-muted py-3 pr-3.5 pl-[42px] text-sm text-ink outline-none transition-colors focus:border-brand-700"
                />
              </div>

              <label className="flex cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 flex-shrink-0 accent-brand-700"
                />
                <span className="text-xs leading-relaxed text-ink-muted">
                  Saya menyetujui <span className="font-semibold text-brand-700">Syarat & Ketentuan</span>{" "}
                  serta <span className="font-semibold text-brand-700">Kebijakan Privasi</span> GovFlow sesuai
                  UU ITE No. 11/2008.
                </span>
              </label>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <Button type="submit" variant="brand" size="lg" loading={submitting} className="mt-1 w-full justify-center">
                Daftar Akun Warga
              </Button>

              <p className="text-center text-[13px] text-ink-muted">
                Sudah punya akun?{" "}
                <Link href="/auth/login" className="font-semibold text-brand-700 hover:text-gold-500">
                  Masuk Sekarang →
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}