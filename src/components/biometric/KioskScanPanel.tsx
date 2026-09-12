import { ArrowRight, Hand, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";

const ACTIVE_KIOSK_COUNT = "2.847";

export function KioskScanPanel() {
  return (
    <div className="flex flex-col items-center py-2 text-center">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-dashed border-emerald-400/40 bg-emerald-500/10">
        <Hand className="h-9 w-9 text-emerald-300" aria-hidden="true" />
      </div>

      <h2 className="font-display text-lg text-white">Tempelkan Telapak Tangan</h2>
      <p className="mt-1 text-sm text-white/50">
        Fitur ini hanya tersedia di Kios GovFlow terdekat. Kunjungi kantor kelurahan atau mall
        terdekat yang memiliki terminal PalmID.
      </p>

      <div className="mt-5 flex w-full items-start gap-3 rounded-xl border border-gold-400/25 bg-gold-400/10 p-4 text-left">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" aria-hidden="true" />
        <p className="text-sm text-white/70">
          <span className="font-medium text-gold-300">Informasi Kios: </span>
          Terdapat {ACTIVE_KIOSK_COUNT} kios PalmID aktif di seluruh Indonesia. Biometrik tidak
          memerlukan koneksi internet — data diproses secara lokal dengan enkripsi end-to-end.
        </p>
      </div>

      <Button variant="primary" size="xl" className="mt-5 w-full">
        Temukan Kios Terdekat
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  );
}