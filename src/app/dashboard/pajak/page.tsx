"use client";

import { useState } from "react";
import { TaxPaymentCard } from "@/components/modules/TaxPaymentCard";
import type { TaxBill } from "@/types/service";

const INITIAL_BILLS: TaxBill[] = [
  {
    id: "bill-pph-umkm",
    category: "pph-umkm",
    label: "PPh UMKM",
    periodLabel: "Masa Pajak Agustus 2026",
    amountIdr: 320000,
    dueDate: "20 Sep 2026",
    status: "unpaid",
  },
  {
    id: "bill-pbb",
    category: "pbb",
    label: "PBB (Pajak Bumi & Bangunan)",
    periodLabel: "Tahun 2026",
    amountIdr: 1450000,
    dueDate: "30 Sep 2026",
    status: "unpaid",
  },
  {
    id: "bill-pkb",
    category: "pkb",
    label: "Pajak Kendaraan (PKB / Samsat)",
    periodLabel: "Perpanjangan Tahunan",
    amountIdr: 875000,
    dueDate: "12 Sep 2026",
    status: "overdue",
  },
  {
    id: "bill-retribusi",
    category: "retribusi",
    label: "Retribusi Daerah / Pasar",
    periodLabel: "September 2026",
    amountIdr: 150000,
    dueDate: "15 Sep 2026",
    status: "paid",
  },
];

export default function PajakPage() {
  const [bills, setBills] = useState(INITIAL_BILLS);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-ink">Pembayaran Pajak &amp; Retribusi</h1>
        <p className="mt-1 text-sm text-ink-muted">
          PPh UMKM, PBB, PKB (Samsat), dan retribusi daerah dalam satu tempat.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {bills.map((bill) => (
          <TaxPaymentCard
            key={bill.id}
            bill={bill}
            onPaid={(id) =>
              setBills((prev) =>
                prev.map((b) => (b.id === id ? { ...b, status: "paid" } : b))
              )
            }
          />
        ))}
      </div>
    </div>
  );
}
