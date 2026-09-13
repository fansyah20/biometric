import Link from "next/link";
import { PILLARS } from "@/types/service";
import { Card } from "@/components/ui/Card";
import { FileText, CreditCard, ClipboardList, ShieldCheck, ArrowUpRight } from "lucide-react";

const ICONS = {
  administrasi: FileText,
  pajak: CreditCard,
  pelaporan: ClipboardList,
  sertifikat: ShieldCheck,
} as const;

export function PillarGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {PILLARS.map((pillar) => {
        const Icon = ICONS[pillar.id];
        return (
          <Link key={pillar.id} href={pillar.href} className="group">
            <Card className="h-full transition-colors group-hover:border-emerald-400/40">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-700">
                  <Icon className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                </div>
                <ArrowUpRight className="h-4 w-4 text-ink-muted/50 transition-colors group-hover:text-emerald-500" />
              </div>
              <h3 className="mt-4 font-display text-base text-ink">{pillar.title}</h3>
              <p className="mt-1 text-sm text-ink-muted">{pillar.subtitle}</p>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
