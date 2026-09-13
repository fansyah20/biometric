import { Shield, Hand, CheckCircle2, Phone } from "lucide-react";

const trustBadges = [
  { icon: Shield, label: "Zero-Knowledge Proof Encryption", tone: "bg-brand-700/20 text-brand-200" },
  { icon: Hand, label: "Palm-Vein Biometric Authentication", tone: "bg-emerald-500/20 text-emerald-300" },
  { icon: CheckCircle2, label: "Sertifikasi BSrE BSSN Indonesia", tone: "bg-gold-400/20 text-gold-300" },
];

const helplines = [
  { label: "Layanan Darurat", number: "119" },
  { label: "GovFlow Helpdesk", number: "1500-400" },
  { label: "WhatsApp Warga", number: "+62 811-0000-400" },
];

/**
 * Dark branding panel shown on the left side of the auth screens
 * (hidden below the `lg` breakpoint). Purely presentational — reused
 * by both the login and register pages.
 */
export function AuthLeftPanel() {
  return (
    <div className="relative hidden w-[45%] flex-shrink-0 flex-col justify-between overflow-hidden bg-navy-900 lg:flex">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-[10%] -left-[20%] h-[70%] w-[70%] rounded-full bg-brand-700/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-[10%] bottom-0 h-[40%] w-[50%] rounded-full bg-emerald-500/10 blur-3xl" />

      {/* Top: logo + badge */}
      <div className="relative z-10 p-10">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-700">
            <Shield className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <div>
            <div className="text-xl font-bold leading-none tracking-tight text-white">GovFlow</div>
            <div className="text-[11px] font-semibold tracking-widest text-emerald-400">PalmID</div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="text-[11px] font-semibold tracking-wide text-white/70">
            REPUBLIK INDONESIA · OFFICIAL PARTNER
          </span>
        </div>
      </div>

      {/* Middle: hero copy */}
      <div className="relative z-10 px-10 py-8">
        <h1 className="mb-5 text-[clamp(28px,3.2vw,42px)] font-extrabold leading-tight tracking-tight text-white">
          Akses Layanan
          <br />
          Publik Mandiri
          <br />
          <span className="text-gold-400">&amp; Aman.</span>
        </h1>
        <p className="mb-8 max-w-[340px] text-sm leading-relaxed text-white/55">
          Dilindungi oleh enkripsi{" "}
          <span className="font-semibold text-white/85">Zero-Knowledge Proof (ZKP)</span> dan autentikasi
          biometrik <span className="font-semibold text-white/85">Palm-Vein</span> untuk keamanan data warga
          tertinggi.
        </p>

        <div className="flex flex-col gap-3">
          {trustBadges.map(({ icon: Icon, label, tone }) => (
            <div key={label} className="flex items-center gap-3 text-[13px] font-medium text-white/75">
              <div className={`flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-md ${tone}`}>
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: kiosk info card */}
      <div className="relative z-10 p-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
          <div className="mb-4 flex items-start gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white">
              <Hand className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <div className="mb-0.5 text-sm font-semibold text-white">Verifikasi Biometrik</div>
              <div className="text-xs text-white/50">Sekali Tempel di Kios Terdekat</div>
            </div>
            <div className="ml-auto flex flex-shrink-0 items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/15 px-2 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] font-bold text-emerald-400">VERIFIED</span>
            </div>
          </div>

          <div className="mb-4 h-px bg-white/10" />

          <div className="mb-2 text-[11px] font-semibold tracking-wide text-white/50">
            BANTUAN LAYANAN SIPIL
          </div>
          <div className="flex flex-col gap-2">
            {helplines.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <Phone className="h-3 w-3 flex-shrink-0 text-gold-400" aria-hidden="true" />
                <span className="text-xs text-white/50">{item.label}</span>
                <span className="ml-auto text-xs font-semibold text-white/85">{item.number}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
