# GovFlow Kiosk Dashboard

Kiosk web app (Next.js 14 App Router + TypeScript + Tailwind) untuk 4 pilar
layanan publik: **Administrasi & Identitas**, **Pembayaran Pajak &
Retribusi**, **Pelaporan & Status**, dan **Sertifikat & Surat**, dengan
otentikasi berbasis NIK + pendaftaran multi-biometrik (Palm-Vein, Face ID
Hands-Free, Retina/Iris, Civic ID Hash simulasi).

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`. Alur: **Landing → Login NIK (16 digit apa
saja untuk demo) → Dashboard → Daftar Biometrik → 4 Pilar**.

## Arsitektur

```
src/
├── app/                     # Next.js App Router (routing only, tipis)
│   ├── layout.tsx           # Root layout: fonts + global providers
│   ├── page.tsx             # Landing page kios
│   ├── globals.css
│   ├── auth/login/page.tsx
│   └── dashboard/
│       ├── layout.tsx       # Shell: Sidebar + Header + guard sesi
│       ├── page.tsx         # Overview 4 pilar
│       ├── administrasi/    ├── pajak/ ├── pelaporan/ ├── sertifikat/
│       └── biometric-enrollment/
├── components/
│   ├── ui/                  # Primitives: Button, Card, Badge, Modal, Toast
│   ├── layout/               # Header, Sidebar
│   ├── biometric/            # ScannerModal, ScannerAnimation, MultiBiometricCard
│   ├── modules/               # Widget per-fitur (NPWP, EFIN, NIB, Pajak, Vault)
│   └── accessibility/         # HighContrastToggle, VoiceGuideWidget, FontScaler
├── context/                  # AuthContext, BiometricContext, AccessibilityContext
├── hooks/                    # useBiometric (state machine scan), useAccessibility
├── types/                    # user.ts, biometric.ts, service.ts (semua strictly-typed)
└── utils/cryptoSim.ts        # Simulasi hash "civic ID" untuk demo UI — BUKAN kripto nyata
```

### Prinsip desain

- **Client components** dipakai hanya di boundary yang butuh interaktivitas
  (form, modal, context) — halaman route tetap tipis dan mudah dibaca.
- **State machine biometrik** (`positioning → scanning → processing →
  success/failed`) hidup di `useBiometric`, dipakai ulang oleh `ScannerModal`
  untuk semua 4 metode biometrik.
- **Strict TypeScript**: `strict`, `noUncheckedIndexedAccess` aktif; NIK
  dimodelkan sebagai branded type (`NIK`) supaya tidak tertukar dengan
  string biasa.
- **Aksesibilitas** adalah pilar arsitektur, bukan tambahan: `AccessibilityBar`
  tampil di setiap layar publik, Face ID Hands-Free ditandai
  `accessibilityFriendly` di level tipe data.

### Catatan penting sebelum produksi sungguhan

- `cryptoSim.ts`, data NPWP/EFIN/NIB/SPT, dan `mockLookupProfile` di
  `AuthContext` adalah **data tiruan untuk demo UI**. Sebelum dipakai publik,
  gantikan dengan integrasi resmi (Dukcapil untuk NIK, DJP untuk
  NPWP/EFIN/SPT, OSS untuk NIB) dan modul kriptografi biometrik yang diaudit
  keamanannya — jangan pakai simulasi ini sebagai pengganti sistem keamanan
  identitas/biometrik nyata.
- Sesi kiosk saat ini disimpan di React state (hilang saat refresh) — untuk
  kios publik sungguhan, tambahkan session store server-side dengan timeout
  otomatis dan audit log akses.
