"use client";

import Link from "next/link";
import Image from "next/image";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Reveal } from "@/components/motion/Reveal";
import {
  Fingerprint,
  MapPin,
  Scan,
  ShieldCheck,
  Printer,
  User,
  CreditCard,
  ClipboardList,
  FolderLock,
  Camera,
  Volume2,
  Eye,
  Accessibility,
  ShieldCheck as ShieldIcon,
  Database,
  CheckCircle2,
} from "lucide-react";

const PILARS = [
  {
    icon: User,
    badge: "PILAR UTAMA",
    title: "Administrasi & Identitas",
    desc: "Penerbitan dokumen identitas nasional instan",
    items: ["Cetak NPWP Baru", "Lupa EFIN Instan", "Cetak NIB KBLI"],
  },
  {
    icon: CreditCard,
    badge: "PILAR UTAMA",
    title: "Pembayaran Pajak",
    desc: "Transaksi keuangan daerah dan nasional instan",
    items: ["Pajak Bumi & Bangunan (PBB)", "PPh Final UMKM", "Samsat PKB Bersama"],
  },
  {
    icon: ClipboardList,
    badge: "PILAR UTAMA",
    title: "Pelaporan & Status",
    desc: "Pemantauan wajib pajak & bantuan sosial",
    items: ["Status SPT Tahunan", "Riwayat Tunggakan", "Validasi Bansos PKH"],
  },
  {
    icon: FolderLock,
    badge: "PILAR UTAMA",
    title: "Sertifikat & Vault",
    desc: "Akses enkripsi berkas legalitas resmi",
    items: ["Surat Keterangan Fiskal", "e-Bupot Terverifikasi", "Unduh Berkas Resmi"],
  },
];

const STEPS = [
  {
    number: "01",
    icon: MapPin,
    title: "Hampiri Kios Publik",
    desc: "Temukan Kios GovFlow terdekat di kantor desa, mall pelayanan publik, atau stasiun transportasi.",
  },
  {
    number: "02",
    icon: Scan,
    title: "Scan Vena Telapak",
    desc: "Cukup letakkan tangan Anda di atas sensor pemindai inframerah aman non-kontak langsung.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Validasi Rahasia (ZKP)",
    desc: "Sistem memverifikasi kelayakan identitas Anda dengan sistem kriptografi tanpa membaca data mentah.",
  },
  {
    number: "04",
    icon: Printer,
    title: "Akses & Cetak Mandiri",
    desc: "Pilih layanan publik yang Anda butuhkan dan cetak dokumen resmi dalam hitungan detik.",
  },
];

const ACCESSIBILITY_FEATURES = [
  { icon: Camera, label: "Face ID Hands-Free Mode" },
  { icon: Volume2, label: "Voice Guide Toggle (Panduan Suara)" },
  { icon: Eye, label: "Kontras Tinggi (Bagi Gangguan Visual)" },
  { icon: Accessibility, label: "Desain Ramah Kursi Roda" },
];

const ZKP_POINTS = [
  "Enkripsi Enklave Keras Tingkat Militer (Local Secure Enclave)",
  "Sesuai Regulasi UU Pelindungan Data Pribadi (UU PDP)",
  "Audit Keamanan Rutin Independen Secara Real-Time",
];

const LAYANAN_UTAMA = [
  "Pendaftaran NPWP",
  "Cetak EFIN Pajak",
  "Verifikasi Bansos",
  "Surat Keterangan Fiskal",
  "Samsat Online",
];

const NAV_LINKS = [
  "Tentang Platform",
  "Cara Kerja Kios",
  "4 Pilar Layanan",
  "Aksesibilitas",
  "Keamanan (ZKP)",
];

export default function GovFlowLandingPage() {
  return (
    <main className="min-h-screen bg-white font-body text-navy-900">
      <SmoothScroll />
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-30 border-b border-navy-900/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <div className="flex items-center gap-3">
            <div>
             <Image
              src="/images/palmid-hand-icon-transparent.png"
              alt="Logo PalmID"
              width={24}
              height={24}
              className="h-full w-full object-contain"
            />
             </div>
            <span className="font-display text-lg font-bold">
              Palm<span className="text-gold-500">ID</span>
            </span>
            <span className="ml-2 hidden items-center gap-1.5 rounded-full border border-navy-900/10 bg-navy-900/5 px-3 py-1 text-xs font-medium text-navy-700 sm:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Republik Indonesia Official Partner
            </span>
          </div>

          <nav className="hidden items-center gap-7 text-sm font-medium text-navy-800 lg:flex">
            {NAV_LINKS.map((link) => (
              <a key={link} href="#" className="transition-colors hover:text-gold-500">
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="hidden text-sm font-semibold text-navy-800 hover:text-gold-500 sm:inline"
            >
              Cek Status Biometrik
            </a>
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 shadow-sm transition-colors hover:bg-gold-400"
            >
              Masuk Kios Publik →
            </Link>
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-sky-300 px-4 py-1.5 text-xs font-semibold tracking-wide text-sky-600">
              NO-PHONE REQUIRED • BIOMETRIC CIVIC IDENTITY
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight text-navy-900 sm:text-5xl">
              Layanan Publik Tanpa Hambatan.{" "}
              <span className="text-gold-500">Satu Sentuhan Telapak Tangan.</span>
            </h1>
            <p className="mt-5 max-w-lg text-navy-600">
              Akses NPWP, Pembayaran Pajak, Bansos, dan Cetak Surat Resmi di Kios
              Publik tanpa perlu membawa HP atau dokumen fisik. Didukung enkripsi
              mutakhir Zero-Knowledge Proof.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 text-sm font-semibold text-navy-950 shadow-sm transition-colors hover:bg-gold-400">
                <Scan className="h-4 w-4" aria-hidden="true" />
                Simulasi Scan Palm-Vein
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-navy-900/15 px-6 py-3.5 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-900/5">
                Pelajari Aksesibilitas
              </button>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-white bg-navy-200"
                  />
                ))}
              </div>
              <p className="text-sm text-navy-500">
                Telah dipercaya oleh <span className="font-semibold text-navy-800">2.4 Juta+</span>{" "}
                warga di seluruh wilayah uji coba.
              </p>
            </div>
          </Reveal>

          {/* Hero visual */}
          <Reveal delay={0.15} className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-panel">
              <Image
                src="/images/image2.jpeg"
                alt="Warga memverifikasi identitas lewat scan vena telapak tangan di kios PalmID"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="border-y border-navy-900/10 bg-navy-50/40">
        <Reveal stagger className="mx-auto grid max-w-7xl gap-8 px-6 py-14 sm:grid-cols-3">
          {[
            {
              value: "99.99%",
              title: "Akurasi Vena Telapak",
              desc: "Pola vena internal manusia bersifat unik & mustahil diduplikasi oleh replikasi fisik atau AI generatif.",
            },
            {
              value: "<3 Detik",
              title: "Kecepatan Akses",
              desc: "Hanya satu sentuhan tanpa perlu OTP SMS, verifikasi manual, ataupun antrean panjang berkas fisik.",
            },
            {
              value: "100% ZKP",
              title: "Zero-Knowledge Proofs",
              desc: "Autentikasi tingkat militer yang membuktikan identitas resmi tanpa menyimpan atau membocorkan data pribadi Anda.",
            },
          ].map((stat) => (
            <div key={stat.title} className="border-l-4 border-gold-500 pl-5">
              <p className="font-display text-3xl font-extrabold text-navy-900">{stat.value}</p>
              <p className="mt-2 font-semibold text-navy-800">{stat.title}</p>
              <p className="mt-1 text-sm text-navy-500">{stat.desc}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ================= 4 PILAR LAYANAN ================= */}
      <section className="mx-auto max-w-7xl px-6 py-24 text-center">
        <Reveal>
          <span className="inline-flex items-center rounded-full border border-gold-400 px-4 py-1.5 text-xs font-semibold text-gold-600">
            LAYANAN KOMPREHENSIF
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">
            4 Pilar Layanan Publik Masa Depan
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-navy-500">
            Satu pintu masuk aman menuju seluruh kebutuhan birokrasi dan administrasi
            kewarganegaraan Anda di Republik Indonesia.
          </p>
        </Reveal>

        <Reveal stagger className="mt-14 grid gap-6 text-left sm:grid-cols-2 lg:grid-cols-4">
          {PILARS.map((pilar) => (
            <div
              key={pilar.title}
              className="rounded-2xl border border-navy-900/10 p-6 transition-shadow hover:shadow-panel"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                  <pilar.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="rounded-full border border-navy-900/10 px-2.5 py-1 text-[10px] font-semibold text-navy-500">
                  {pilar.badge}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-navy-900">
                {pilar.title}
              </h3>
              <p className="mt-1 text-sm text-navy-500">{pilar.desc}</p>
              <ul className="mt-4 space-y-2 border-t border-navy-900/10 pt-4">
                {pilar.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-navy-700">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-500" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ================= CARA KERJA ================= */}
      <section className="bg-navy-50/40 py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-gold-400 px-4 py-1.5 text-xs font-semibold text-gold-600">
              ALUR PROSES 100% MANDIRI
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">
              Cara Kerja Kios Palm<span className="text-gold-500">ID</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-navy-500">
              Nikmati kemudahan akses dalam 4 langkah instan tanpa perlu kartu maupun
              dokumen cetak.
            </p>
          </Reveal>

          <Reveal stagger className="mt-14 grid gap-10 text-left sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div key={step.number}>
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-800 text-sm font-bold text-white">
                    {step.number}
                  </span>
                  <step.icon className="h-5 w-5 text-navy-500" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-navy-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-navy-500">{step.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ================= AKSESIBILITAS ================= */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="inline-flex items-center rounded-full border border-gold-400 px-4 py-1.5 text-xs font-semibold text-gold-600">
                AKSESIBILITAS UNTUK SEMUA
              </span>
              <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl">
                Identitas Digital yang Inklusif Tanpa Hambatan Fisik
              </h2>
              <p className="mt-4 text-navy-500">
                GovFlow dirancang agar dapat diakses oleh seluruh lapisan masyarakat
                Indonesia, termasuk penyandang disabilitas fisik, lansia, dan warga
                rentan digital tanpa diskriminasi teknologi.
              </p>
            </Reveal>

            <Reveal stagger className="mt-8 grid gap-4 sm:grid-cols-2">
              {ACCESSIBILITY_FEATURES.map((feat) => (
                <div
                  key={feat.label}
                  className="flex items-center gap-3 rounded-xl border border-navy-900/10 px-4 py-4"
                >
                  <feat.icon className="h-5 w-5 flex-shrink-0 text-sky-600" aria-hidden="true" />
                  <span className="text-sm font-medium text-navy-800">{feat.label}</span>
                </div>
              ))}
            </Reveal>
          </div>

          <Reveal delay={0.15} className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src="/images/iamge1.jpeg"
              alt="Warga lansia menggunakan kios biometrik yang ramah aksesibilitas"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* ================= ZKP SECURITY (DARK) ================= */}
      <section className="bg-navy-950 py-24 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <Reveal className="rounded-2xl border border-white/10 p-8">
            <p className="text-center font-display text-lg font-bold">
              Arsitektur Kriptografi ZKP GovFlow
            </p>
            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex-1 rounded-xl bg-white/5 p-4 text-center">
                <Fingerprint className="mx-auto h-6 w-6 text-white/80" aria-hidden="true" />
                <p className="mt-2 text-sm font-semibold">Palm-Vein Scanner</p>
                <p className="text-xs text-white/40">Data Vena Mentah</p>
              </div>
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-sky-500">
                <ShieldIcon className="h-4 w-4 text-white" aria-hidden="true" />
              </span>
              <div className="flex-1 rounded-xl bg-white/5 p-4 text-center">
                <Database className="mx-auto h-6 w-6 text-white/80" aria-hidden="true" />
                <p className="mt-2 text-sm font-semibold">Gov Database</p>
                <p className="text-xs text-white/40">Sertifikat Identitas Kripto</p>
              </div>
            </div>
            <p className="mt-6 rounded-lg border border-sky-400/40 py-2.5 text-center text-xs font-semibold text-sky-300">
              Data Biometrik Tidak Pernah Meninggalkan Perangkat Lokal
            </p>
          </Reveal>

          <div>
            <Reveal delay={0.1}>
              <span className="inline-flex items-center rounded-full border border-gold-400 px-4 py-1.5 text-xs font-semibold text-gold-400">
                PRIVASI MUTLAK DIJAMIN
              </span>
              <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
                Kedaulatan Data Berbasis Zero-Knowledge Proofs
              </h2>
              <p className="mt-4 text-white/60">
                Kios GovFlow menggunakan protokol ZKP yang revolusioner. Kios dapat
                mengonfirmasi kelayakan hak sipil Anda tanpa perlu tahu, menyimpan,
                ataupun mengirimkan salinan fisik data biometrik Anda ke server pusat.
              </p>
            </Reveal>
            <Reveal as="ul" stagger delay={0.2} className="mt-6 space-y-3">
              {ZKP_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-white/80">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-400" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================= CAKUPAN LAYANAN TICKER ================= */}
      <section className="border-b border-navy-900/10 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 text-sm">
          <span className="font-semibold tracking-wide text-navy-400">
            CAKUPAN LAYANAN UTAMA:
          </span>
          {LAYANAN_UTAMA.map((item) => (
            <span key={item} className="flex items-center gap-2 font-medium text-navy-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <Reveal>
          <span className="inline-flex items-center rounded-full border border-gold-400 px-4 py-1.5 text-xs font-semibold text-gold-600">
            MARI MEMULAI TRANSISI
          </span>
          <h2 className="mt-5 font-display text-3xl font-extrabold text-navy-900 sm:text-4xl">
            Siap Menikmati Layanan Publik Instan?
          </h2>
          <p className="mt-4 text-navy-500">
            Temukan Kios GovFlow terdekat di kota Anda atau coba simulasi digital untuk
            mendaftarkan enkripsi vena telapak tangan Anda secara mandiri dalam waktu
            kurang dari 2 menit.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button className="rounded-full bg-gold-500 px-6 py-3.5 text-sm font-semibold text-navy-950 shadow-sm transition-colors hover:bg-gold-400">
              Mulai Pendaftaran Mandiri
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-navy-900/15 px-6 py-3.5 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-900/5">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Cari Kios Terdekat (Maps)
            </button>
          </div>
        </Reveal>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-navy-950 pt-16 text-white/70">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
             <Image
              src="/images/palmid-hand-icon-transparent.png"
              alt="Logo PalmID"
              width={24}
              height={24}
              className="h-full w-full object-contain"
            />
             </div>
            <p className="mt-4 text-sm text-white/40">
              Mewujudkan inklusi identitas kewarganegaraan modern Indonesia yang
              mutakhir, tepercaya, dan ramah terhadap seluruh penyandang disabilitas.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">TENTANG PLATFORM</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-white">Cara Kerja Sensor</a></li>
              <li><a href="#" className="hover:text-white">Lokasi Kios Nasional</a></li>
              <li><a href="#" className="hover:text-white">4 Pilar Layanan</a></li>
              <li><a href="#" className="hover:text-white">Berita Pelayanan</a></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">KEAMANAN & PRIVASI</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-white">Panduan Enkripsi ZKP</a></li>
              <li><a href="#" className="hover:text-white">Pelindungan Data Pribadi</a></li>
              <li><a href="#" className="hover:text-white">Sertifikasi ISO 27001</a></li>
              <li><a href="#" className="hover:text-white">Developer API</a></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">DUKUNGAN & BANTUAN</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-white">Hubungi Halo Kios</a></li>
              <li><a href="#" className="hover:text-white">Panduan Disabilitas</a></li>
              <li><a href="#" className="hover:text-white">Laporkan Masalah Kios</a></li>
              <li><a href="#" className="hover:text-white">Pusat Darurat 112</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-6">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-xs text-white/40 sm:flex-row">
            <p>© 2026 PalmID Indonesia • Hak Cipta Dilindungi Undang-Undang.</p>
            <div className="flex gap-5">
              <a href="#" className="hover:text-white">Kebijakan Privasi</a>
              <a href="#" className="hover:text-white">Ketentuan Penggunaan</a>
              <a href="#" className="hover:text-white">Aksesibilitas</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
