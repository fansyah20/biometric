"use client";

import { useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import type { TaxBill } from "@/types/service";
import { Wallet, CheckCircle2 } from "lucide-react";

interface TaxPaymentCardProps {
  bill: TaxBill;
  onPaid?: (billId: string) => void;
}

const STATUS_TONE: Record<TaxBill["status"], "emerald" | "gold" | "danger"> = {
  paid: "emerald",
  unpaid: "gold",
  overdue: "danger",
};

const STATUS_LABEL: Record<TaxBill["status"], string> = {
  paid: "Lunas",
  unpaid: "Belum Dibayar",
  overdue: "Jatuh Tempo",
};

function formatIdr(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function TaxPaymentCard({ bill, onPaid }: TaxPaymentCardProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [paying, setPaying] = useState(false);
  const [status, setStatus] = useState(bill.status);

  const handleConfirmPay = () => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setStatus("paid");
      setConfirmOpen(false);
      onPaid?.(bill.id);
    }, 1100);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-700">
              <Wallet className="h-5 w-5 text-emerald-300" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-display text-base text-white">{bill.label}</h3>
              <p className="text-sm text-white/50">{bill.periodLabel}</p>
            </div>
          </div>
          <Badge tone={STATUS_TONE[status]}>{STATUS_LABEL[status]}</Badge>
        </CardHeader>

        <div className="rounded-xl bg-navy-900/60 p-4">
          <p className="text-xs text-white/50">Jumlah Tagihan</p>
          <p className="mt-1 font-mono text-2xl text-white">{formatIdr(bill.amountIdr)}</p>
          <p className="mt-2 text-xs text-white/40">Jatuh tempo {bill.dueDate}</p>
        </div>

        <Button
          className="mt-4 w-full"
          size="md"
          variant={status === "paid" ? "secondary" : "primary"}
          disabled={status === "paid"}
          onClick={() => setConfirmOpen(true)}
        >
          {status === "paid" ? (
            <>
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Sudah Dibayar
            </>
          ) : (
            "Bayar Sekarang"
          )}
        </Button>
      </Card>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Konfirmasi Pembayaran"
        widthClassName="max-w-sm"
      >
        <div className="space-y-4 text-center">
          <p className="text-sm text-white/70">
            Bayar <span className="text-white">{bill.label}</span> sebesar
          </p>
          <p className="font-mono text-3xl text-emerald-300">{formatIdr(bill.amountIdr)}</p>
          <p className="text-xs text-white/40">
            Pembayaran diverifikasi otomatis lewat Master Signature biometrik Anda.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Button variant="ghost" onClick={() => setConfirmOpen(false)}>
              Batal
            </Button>
            <Button loading={paying} onClick={handleConfirmPay}>
              Konfirmasi Bayar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
