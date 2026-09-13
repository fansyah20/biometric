import { ArrowRight, Hand, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";

const ACTIVE_KIOSK_COUNT = "2.847";

export function KioskScanPanel() {
  return (
    <div className="flex flex-col items-center py-2 text-center">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50">
        <Hand className="h-9 w-9 text-emerald-600" aria-hidden="true" />
      </div>

      <h2 className="font-display text-lg text-ink">Tempelkan Telapak Tangan</h2>
      <p className="mt-1 text-sm text-ink-muted">
        Fitur ini hanya tersedia di Kios GovFlow terdekat. Kunjungi kantor kelurahan atau mall
        terdekat yang memiliki terminal PalmID.
      </p>

      <div className="mt-5 flex w-full items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-left">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
        <p className="text-sm text-ink-muted">
          <span className="font-medium text-amber-700">Informasi Kios: </span>
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
