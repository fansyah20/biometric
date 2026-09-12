"use client";

import type { ReactNode } from "react";
import { Mail, ScanLine } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export type AuthMethod = "credentials" | "kiosk";

interface AuthMethodTabsProps {
  value: AuthMethod;
  onChange: (method: AuthMethod) => void;
}

export function AuthMethodTabs({ value, onChange }: AuthMethodTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Metode masuk"
      className="mb-6 grid grid-cols-2 gap-1 rounded-xl border border-white/10 bg-navy-900/60 p-1"
    >
      <TabButton
        active={value === "credentials"}
        onClick={() => onChange("credentials")}
        icon={<Mail className="h-4 w-4" aria-hidden="true" />}
        label="Email"
      />
      <TabButton
        active={value === "kiosk"}
        onClick={() => onChange("kiosk")}
        icon={<ScanLine className="h-4 w-4" aria-hidden="true" />}
        label="Scan Vena Telapak"
        badge={
          <Badge tone="gold" className="ml-1 px-1.5 py-0.5 text-[10px]">
            Kios Only
          </Badge>
        }
      />
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
  badge?: ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={[
        "flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-2.5 text-sm font-medium transition-colors",
        active ? "bg-white text-navy-900" : "text-white/60 hover:text-white",
      ].join(" ")}
    >
      {icon}
      <span className="whitespace-nowrap">{label}</span>
      {badge}
    </button>
  );
}