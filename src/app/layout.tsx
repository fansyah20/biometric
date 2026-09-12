import type { Metadata, Viewport } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { BiometricProvider } from "@/context/BiometricContext";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import "./globals.css";

// Kiosk terminals are frequently locked to an intranet/allowlisted network,
// so this deliberately avoids next/font/google (which fetches from
// fonts.googleapis.com at build time) and relies on the system font stack
// defined in globals.css instead — zero external network dependency,
// zero font-loading flash on public hardware.

export const metadata: Metadata = {
  title: "GovFlow Kiosk Dashboard",
  description:
    "Kios layanan administrasi, pajak, pelaporan, dan sertifikat digital dengan otentikasi multi-biometrik.",
};

// Kiosk hardware is fixed-viewport; disallow pinch-zoom drift on public terminals
// while still respecting accessibility font scaling handled in-app.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-navy-900 font-body antialiased">
        <AccessibilityProvider>
          <AuthProvider>
            <BiometricProvider>{children}</BiometricProvider>
          </AuthProvider>
        </AccessibilityProvider>
      </body>
    </html>
  );
}
