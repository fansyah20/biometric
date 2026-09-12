import { Lock, ShieldCheck } from "lucide-react";

export function AuthFooterBadges() {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-white/35">
      <span className="flex items-center gap-1">
        <Lock className="h-3 w-3" aria-hidden="true" />
        SSL 256-bit Terenkripsi
      </span>
      <span className="flex items-center gap-1">
        <ShieldCheck className="h-3 w-3" aria-hidden="true" />
        BSSN Certified · UU ITE Compliant
      </span>
      <span>© {new Date().getFullYear()} GovFlow. Semua hak dilindungi.</span>
    </div>
  );
}