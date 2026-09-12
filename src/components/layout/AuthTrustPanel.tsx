import { BadgeCheck, Fingerprint, PhoneCall, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

const TRUST_POINTS = [
  { icon: ShieldCheck, label: "Zero-Knowledge Proof Encryption" },
  { icon: Fingerprint, label: "Palm-Vein Biometric Authentication" },
  { icon: BadgeCheck, label: "Sertifikasi BSrE BSSN Indonesia" },
];

export function AuthTrustPanel() {
  return (
    <div className="relative hidden w-[45%] flex-col justify-between overflow-hidden bg-navy-950 px-10 py-12 lg:flex">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_20%,rgba(52,211,153,0.15),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(217,165,32,0.12),transparent_45%)]"
      />

      <div className="relative">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-700">
            <ShieldCheck className="h-5 w-5 text-emerald-300" aria-hidden="true" />
          </div>
          <div>
            <p className="font-display text-lg leading-none text-white">GovFlow</p>
            <p className="text-xs text-white/40">PalmID</p>
          </div>
        </div>

        <Badge tone="emerald" className="mb-6">
          Republik Indonesia · Official Partner
        </Badge>

        <h1 className="font-display text-3xl leading-tight text-white">
          Akses Layanan Publik Mandiri <span className="text-gold-400">&amp; Aman.</span>
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-white/50">
          Dilindungi oleh enkripsi{" "}
          <span className="font-medium text-white/80">Zero-Knowledge Proof (ZKP)</span> dan
          autentikasi biometrik <span className="font-medium text-white/80">Palm-Vein</span> untuk
          keamanan data warga tertinggi.
        </p>

        <ul className="mt-6 space-y-3">
          {TRUST_POINTS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3 text-sm text-white/70">
              <Icon className="h-4 w-4 text-emerald-300" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </div>

      <Card tone="dark" className="relative">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-medium text-white">Verifikasi Biometrik</p>
          <Badge tone="emerald">Verified</Badge>
        </div>
        <p className="mb-4 text-xs text-white/50">Sekali Tempel di Kios Terdekat</p>

        <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-white/40">
          Bantuan Layanan Sipil
        </p>
        <div className="space-y-1.5 text-xs text-white/60">
          <div className="flex items-center justify-between">
            <span>Layanan Darurat</span>
            <span className="text-white">119</span>
          </div>
          <div className="flex items-center justify-between">
            <span>GovFlow Helpdesk</span>
            <span className="text-white">1500-400</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <PhoneCall className="h-3 w-3" aria-hidden="true" />
              WhatsApp Warga
            </span>
            <span className="text-white">+62 811-0000-400</span>
          </div>
        </div>
      </Card>
    </div>
  );
}