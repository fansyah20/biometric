"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PILLARS } from "@/types/service";
import {
  LayoutGrid,
  FileText,
  CreditCard,
  ClipboardList,
  ShieldCheck,
  UserCircle,
  Lock,
} from "lucide-react";

const PILLAR_ICONS = {
  administrasi: FileText,
  pajak: CreditCard,
  pelaporan: ClipboardList,
  sertifikat: ShieldCheck,
} as const;

interface SidebarProps {
  profileComplete: boolean;
}

export function Sidebar({ profileComplete }: SidebarProps) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <aside className="hidden w-64 shrink-0 border-r border-surface-border bg-white p-4 lg:flex lg:flex-col">
      <Link href="/dashboard" className="mb-6 flex items-center gap-2 px-2 py-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 text-white font-display font-bold">
          G
        </div>
        <span className="font-display text-lg text-ink">GovFlow</span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1" aria-label="Navigasi Dashboard">
        <SidebarLink href="/dashboard" active={isActive("/dashboard")} icon={LayoutGrid}>
          Overview
        </SidebarLink>
        {PILLARS.map((pillar) => (
          <SidebarLink
            key={pillar.id}
            href={pillar.href}
            active={isActive(pillar.href)}
            icon={PILLAR_ICONS[pillar.id]}
            locked={!profileComplete}
          >
            {pillar.title}
          </SidebarLink>
        ))}
        <div className="my-2 border-t border-surface-border" />
        <SidebarLink href="/dashboard/profil" active={isActive("/dashboard/profil")} icon={UserCircle}>
          Profil Saya
        </SidebarLink>
      </nav>

      <p className="px-2 pt-4 text-xs text-ink-muted">GovFlow Kiosk v1.0</p>
    </aside>
  );
}

function SidebarLink({
  href,
  active,
  icon: Icon,
  locked = false,
  children,
}: {
  href: string;
  active: boolean;
  icon: typeof LayoutGrid;
  locked?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={[
        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
        active ? "bg-brand-700/10 text-brand-700" : "text-ink-muted hover:bg-surface-muted hover:text-ink",
      ].join(" ")}
      aria-current={active ? "page" : undefined}
    >
      <Icon className="h-4.5 w-4.5" aria-hidden="true" />
      <span className="flex-1">{children}</span>
      {locked && <Lock className="h-3.5 w-3.5 text-ink-muted/60" aria-hidden="true" />}
    </Link>
  );
}