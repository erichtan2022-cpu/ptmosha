import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  CheckCircle2,
  Award,
  FileText,
  Users,
  Briefcase,
  MessageCircle,
  Sun,
  Zap,
  BatteryCharging,
  Maximize2,
  X,
  Layers,
  CreditCard,
  Monitor,
  BarChart3,
  Cpu,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";

// Data for HOMER Pro (Featured Top Card)
const ESG_OUTLINE = [
  "ESG Communication, Avoiding Greenwashing & Career Path",
  "Materiality Assessment & Stakeholder Mapping",
  "Corporate Carbon Accounting & GHG Protocol",
  "Decarbonization Strategy & Circular Economy",
  "Social Impact, DEI, and Human Rights in Business",
  "Corporate Governance, Risk Management & Sustainable Finance",
  "Mastering Sustainability Reporting",
];

const HOMER_OUTLINE = [
  "Pengenalan Software HOMER Pro & Antarmuka",
  "Input Data Lokasi, Sumber Energi & Beban",
  "Konfigurasi Komponen PLTS Hybrid (Panel, Baterai, Genset)",
  "Simulasi & Optimasi Sistem PLTS Hybrid",
  "Analisis Kelayakan Teknis & Ekonomis (NPC, COE, ROI)",
  "Interpretasi Hasil Simulasi & Laporan Output",
];

const HOMER_BENEFITS = [
  { icon: FileText, text: "Softcopy Modul & Materi Training" },
  { icon: Award, text: "Sertifikat dari PT Mosha & Masebi" },
  { icon: Video, text: "Rekaman Video Training" },
  { icon: Monitor, text: "Akses File HOMER Pro Contoh Project" },
  { icon: Users, text: "Bergabung Grup Komunitas PLTS" },
  { icon: Briefcase, text: "Peluang Kerjasama Bisnis" },
];

// Data for PLTS Commissioning (Left Card)
const PLTS_HIGHLIGHTS = [
  "Panel Surya Utama (High Efficiency)",
  "Inverter Hibrida Cerdas",
  "Sistem Penyimpanan Baterai Terintegrasi",
  "Distribusi Arus Searah (DC)",
  "Koneksi Jaringan Pintar & Metering",
];

const PLTS_OUTLINE = [
  "Perkenalan System PLTS",
  "Komponen System PLTS : Modul PV, Inverter dan Baterai",
  "Desain System PLTS",
  "Commissioning PLTS",
];

const PLTS_BENEFITS = [
  { icon: FileText, text: "Softcopy Modul Training" },
  { icon: Award, text: "Sertifikat Dari Perusahaan" },
  { icon: Video, text: "Rekaman Video Training" },
  { icon: Users, text: "Bergabung Dalam Grup PLTS Dan Komunitas" },
  { icon: Briefcase, text: "Peluang Kerjasama (Kolaborasi) Bisnis" },
];

// Data for Oil & Gas Commissioning (Right Card)
const OIL_GAS_OUTLINE = [
  "Perkenalan Precommissioning & Commissioning",
  "System Sub System Limit / Markup P&ID",
  "Rencana dan Strategy Commissioning",
  "Mechanical Completion",
  "Inspection Test Record (ITR)",
  "Support Vendor dalam Precomm & Commissioning",
  "Precomm Comm Mechanical Piping & Electrical Instrument",
  "System Prioritas Commissioning",
  "Commissioning & Startup System Hydrocarbon dan Non-Hydrocarbon",
  "System Handover",
];

const OIL_GAS_BENEFITS = [
  { icon: FileText, text: "Softcopy Modul Training" },
  { icon: Award, text: "Sertifikat Lembaga Training" },
  { icon: FileText, text: "Contoh Project Prosedur, ITR, Drawing, dll." },
  { icon: CheckCircle2, text: "Kisi-Kisi Interview Commissioning" },
  { icon: Video, text: "Rekaman Video Training" },
];

export default function FeaturedTrainingCard() {
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string } | null>(null);

  return (
    <section className="py-12 bg-muted/30 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <Badge
            variant="outline"
            className="bg-accent/10 text-accent border-accent/30 mb-3 px-3 py-1 text-xs font-semibold tracking-wide uppercase"
          >
            Jadwal Pelatihan Pilihan
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            Program Training & Sertifikasi Terdekat
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base">
            Tingkatkan kompetensi profesional Anda melalui pelatihan intensif Energi Terbarukan (PLTS) online dan Commissioning Industri Oil &amp; Gas tatap muka.
          </p>
        </motion.div>

        {/* =========================================================================
            FEATURED HERO BOOTCAMP: CORPORATE ESG STRATEGY & SUSTAINABILITY MANAGEMENT
            ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 rounded-2xl border-2 border-emerald-500/60 hover:border-emerald-500 bg-gradient-to-br from-card via-card to-emerald-500/5 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
        >
          <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500" />
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {/* Left: Poster / Flyer Preview */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <div
                onClick={() =>
                  setPreviewImage({
                    src: "/images/flyer-corporate-esg-strategy.jpg",
                    title: "Brosur Corporate ESG Strategy & Sustainability Management",
                  })
                }
                className="relative bg-black/90 p-2 rounded-xl shadow-lg border border-emerald-500/30 overflow-hidden cursor-pointer group/img max-w-xs w-full"
              >
                <img
                  src="/images/flyer-corporate-esg-strategy.jpg"
                  alt="Corporate ESG Strategy & Sustainability Management Bootcamp"
                  className="w-full h-auto max-h-72 object-contain rounded transition-transform duration-500 group-hover/img:scale-105"
                />
                <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black bg-emerald-600 text-white shadow-md animate-pulse">
                  <Sparkles className="size-3.5" /> Bootcamp Terpopuler
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-center p-3">
                  <span className="text-white text-xs font-semibold drop-shadow flex items-center gap-1">
                    <Maximize2 className="size-3.5" /> Klik untuk perbesar brosur
                  </span>
                </div>
              </div>
            </div>

            {/* Middle: Details & Silabus */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-emerald-600 text-white font-bold text-xs uppercase">
                    Bootcamp Intensif
                  </Badge>
                  <Badge variant="outline" className="border-emerald-500/40 text-emerald-600 dark:text-emerald-400 font-semibold text-xs">
                    Online Zoom Meeting
                  </Badge>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
                  CORPORATE ESG STRATEGY &amp; SUSTAINABILITY MANAGEMENT
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Tingkatkan karir profesional Anda dengan kurikulum terlengkap: Carbon Accounting, GHG Protocol, Decarbonization, Governance &amp; Sustainability Reporting.
                </p>
              </div>

              {/* Schedule Info Box */}
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 text-foreground">
                  <Calendar className="size-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold block">Jumat, 6 Nov 2026</span>
                    <span className="text-[11px] text-muted-foreground">8+ Sesi Live &amp; Intensif</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <Video className="size-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold block">Online Zoom Meeting</span>
                    <span className="text-[11px] text-muted-foreground">Live interaktif &amp; diskusi</span>
                  </div>
                </div>
              </div>

              {/* Benefits Chips */}
              <div className="space-y-1.5">
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  <Award className="size-3.5 text-emerald-600" /> Benefit Peserta:
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-muted border border-border text-foreground">
                    ✓ E-Sertifikat Kelulusan
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-muted border border-border text-foreground">
                    ✓ E-Sertifikat Karbon
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-muted border border-border text-foreground">
                    ✓ Gratis Mini Class Zonaebt
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-muted border border-border text-foreground">
                    ✓ Recording &amp; Study Case
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Investment & Register CTA */}
            <div className="lg:col-span-3 flex flex-col justify-center space-y-4 p-5 rounded-2xl bg-card border-2 border-emerald-500/30 text-center sm:text-left">
              <div>
                <span className="text-xs uppercase font-bold text-muted-foreground tracking-wider block">
                  Biaya Investasi
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm line-through text-rose-500 font-bold">
                    Rp 5.000.000
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 font-extrabold border border-rose-500/20">
                    Hemat 38%
                  </span>
                </div>
                <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 block mt-0.5">
                  Rp 3.100.000
                </span>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Pembayaran via transfer BCA 3262681995 a.n PT Mosha Sinalsal Solusi
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-border">
                <Button
                  asChild
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm h-11 shadow-lg cursor-pointer"
                >
                  <Link to="/pendaftaran-corporate-esg-strategy">
                    <CreditCard className="size-4 mr-2" />
                    Daftar Sekarang
                  </Link>
                </Button>

                <a
                  href="https://wa.me/62822268195332?text=Halo%20Admin%20PT%20Mosha,%20saya%20tertarik%20dengan%20Bootcamp%20Corporate%20ESG%20Strategy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    variant="outline"
                    className="w-full border-emerald-600/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-xs font-semibold h-9 cursor-pointer"
                  >
                    <MessageCircle className="size-3.5 mr-1.5 text-emerald-600" />
                    Tanya via WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4-card Grid: 2x2 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6 items-stretch">
          {/* =========================================================================
              CARD 1: COMMISSIONING OIL & GAS & PEMBANGKIT LISTRIK (ONLINE - 13 NOV 2026 - TERBARU)
              ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border-2 border-orange-500/50 hover:border-orange-500 bg-card shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Top gradient accent bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500" />

              {/* Image placeholder (banner belum tersedia) */}
              <div className="relative bg-gradient-to-br from-orange-950 via-slate-900 to-orange-900 p-2.5 h-48 sm:h-52 flex items-center justify-center border-b border-border overflow-hidden">
                {/* Decorative background */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 size-24 rounded-full bg-orange-500 blur-2xl" />
                  <div className="absolute bottom-4 right-4 size-20 rounded-full bg-amber-400 blur-2xl" />
                </div>
                {/* Icon placeholder */}
                <div className="relative flex flex-col items-center justify-center gap-3 text-center">
                  <div className="size-16 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center">
                    <Zap className="size-8 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-orange-300 font-black text-sm tracking-tight">COMMISSIONING</p>
                    <p className="text-white/70 text-xs">Oil &amp; Gas &amp; Pembangkit</p>
                    <p className="text-orange-400 text-[10px] mt-1 font-semibold">Online Training</p>
                  </div>
                </div>
                {/* Badge Online */}
                <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-600 text-white shadow-md animate-pulse">
                  <Sparkles className="size-3" />
                  Terbaru
                </span>
              </div>

              {/* Content Body */}
              <div className="p-4 sm:p-5 space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <Badge className="bg-orange-600 hover:bg-orange-700 text-white text-[10px] font-semibold px-2 py-0.5">
                      Online Class
                    </Badge>
                    <span className="text-[11px] font-medium text-muted-foreground">PT Mosha &amp; Masebi</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-foreground tracking-tight leading-snug line-clamp-2 min-h-[2.8rem]">
                    Commissioning Oil &amp; Gas &amp; Pembangkit
                  </h3>
                  <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wide">
                    Fasilitas Oil &amp; Gas &amp; Sistem Pembangkit Listrik
                  </p>
                </div>

                {/* Schedule Info Box */}
                <div className="p-3 rounded-xl bg-orange-500/5 border border-orange-500/20 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-foreground">
                    <Calendar className="size-3.5 text-orange-500 shrink-0" />
                    <span className="font-bold">Jumat, 13 Nov 2026 (1 Hari)</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="size-3.5 text-orange-500 shrink-0" />
                    <span>18.00 – 22.00 WIB</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Video className="size-3.5 text-orange-500 shrink-0" />
                    <span>Google Meet / Zoom (Online)</span>
                  </div>
                </div>

                {/* Outline Ringkas */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-foreground mb-1.5 flex items-center gap-1">
                    <Layers className="size-3 text-orange-500" />
                    Materi Utama (7 Modul)
                  </h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li className="flex items-start gap-1.5">
                      <span className="text-orange-500 font-bold">•</span>
                      <span className="line-clamp-1">Prinsip Dasar &amp; Strategi Commissioning</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-orange-500 font-bold">•</span>
                      <span className="line-clamp-1">P&amp;ID Markup &amp; Mechanical Completion</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-orange-500 font-bold">•</span>
                      <span className="line-clamp-1">Prosedur ITR (Inspection &amp; Test Record)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-orange-500 font-bold">•</span>
                      <span className="line-clamp-1">Hydrocarbon Commissioning &amp; System Handover</span>
                    </li>
                  </ul>
                </div>

                {/* Benefit Ringkas */}
                <div className="grid grid-cols-2 gap-1.5 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1 bg-muted/60 px-2 py-1 rounded border border-border">
                    <FileText className="size-3 text-orange-500 shrink-0" /> Modul &amp; Materi
                  </span>
                  <span className="inline-flex items-center gap-1 bg-muted/60 px-2 py-1 rounded border border-border">
                    <Award className="size-3 text-orange-500 shrink-0" /> Sertifikat Resmi
                  </span>
                  <span className="inline-flex items-center gap-1 bg-muted/60 px-2 py-1 rounded border border-border">
                    <Video className="size-3 text-orange-500 shrink-0" /> Rekaman Video
                  </span>
                  <span className="inline-flex items-center gap-1 bg-muted/60 px-2 py-1 rounded border border-border">
                    <Users className="size-3 text-orange-500 shrink-0" /> Grup Alumni
                  </span>
                </div>

                {/* Price Box */}
                <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/25 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-orange-700 dark:text-orange-300">Biaya Investasi</span>
                    <Badge className="bg-orange-600 text-white font-extrabold text-xs px-2 py-0.5">
                      Rp 600.000
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Batas bayar: <strong className="text-foreground">12 Nov 2026</strong> • BCA 3262681995
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 pt-0 flex items-center gap-2">
              <Button
                asChild
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-bold cursor-pointer text-xs h-10 shadow-sm"
              >
                <Link to="/pendaftaran?training=commissioning-oil-gas-pembangkit-online">
                  <CreditCard className="size-3.5 mr-1.5" />
                  Daftar (Rp 600rb)
                </Link>
              </Button>
              <a
                href="https://wa.me/62822268195332?text=Halo%20PT%20Mosha%20Sinalsal%20Solusi,%20saya%20ingin%20mendaftar%20Training%20Commissioning%20Oil%20%26%20Gas%20%26%20Pembangkit%20Online%2013%20November%202026%20Rp%20600.000"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="size-10 border-orange-600 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/40 cursor-pointer shrink-0"
                  title="Hubungi via WhatsApp"
                >
                  <MessageCircle className="size-4 text-orange-600" />
                </Button>
              </a>
            </div>
          </motion.div>

          {/* =========================================================================
              CARD 2: HOMER PRO – DESAIN, SIMULASI & ANALISIS PLTS HYBRID (1 NOV 2026)
              ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-2xl border-2 border-blue-500/50 hover:border-blue-500 bg-card shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Top gradient accent bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500" />

              {/* Flyer / Banner Image (Compact with Zoom) */}
              <div
                onClick={() =>
                  setPreviewImage({
                    src: "/images/flyer-pelatihan-homer-pro.png",
                    title: "Brosur Pelatihan HOMER Pro",
                  })
                }
                className="relative bg-slate-950 p-2.5 h-48 sm:h-52 flex items-center justify-center border-b border-border overflow-hidden cursor-pointer group/img"
              >
                <img
                  src="/images/flyer-pelatihan-homer-pro.png"
                  alt="Brosur Pelatihan HOMER Pro"
                  className="h-full w-auto max-w-full object-contain drop-shadow-md rounded transition-transform duration-500 group-hover/img:scale-105"
                />
                {/* Ribbon Terbaru */}
                <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-600 text-white shadow-md">
                  <Cpu className="size-3" />
                  Online
                </span>
                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-between p-2.5">
                  <span className="text-white text-xs font-medium drop-shadow">Klik perbesar</span>
                  <div className="p-1 rounded-md bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                    <Maximize2 className="size-3.5" />
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-4 sm:p-5 space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <Badge className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-semibold px-2 py-0.5">
                      Online Meet
                    </Badge>
                    <span className="text-[11px] font-medium text-muted-foreground">PT Mosha &amp; Masebi</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-foreground tracking-tight leading-snug line-clamp-2 min-h-[2.8rem]">
                    HOMER PRO – Desain &amp; Simulasi PLTS Hybrid
                  </h3>
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                    Software HOMER Pro • PLTS Terdistribusi
                  </p>
                </div>

                {/* Schedule Info Box */}
                <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/20 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-foreground">
                    <Calendar className="size-3.5 text-blue-500 shrink-0" />
                    <span className="font-bold">Minggu, 1 Nov 2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="size-3.5 text-blue-500 shrink-0" />
                    <span>18.00 – 21.30 WIB</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Video className="size-3.5 text-blue-500 shrink-0" />
                    <span>Google Meet (Online)</span>
                  </div>
                </div>

                {/* Outline Ringkas */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-foreground mb-1.5 flex items-center gap-1">
                    <Layers className="size-3 text-blue-500" />
                    Materi Utama (6 Modul)
                  </h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li className="flex items-start gap-1.5">
                      <span className="text-blue-500 font-bold">•</span>
                      <span className="line-clamp-1">Pengenalan Software HOMER Pro &amp; UI</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-blue-500 font-bold">•</span>
                      <span className="line-clamp-1">Input Data Lokasi, Radiasi &amp; Beban</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-blue-500 font-bold">•</span>
                      <span className="line-clamp-1">Konfigurasi PLTS Hybrid (PV, Baterai, Genset)</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-blue-500 font-bold">•</span>
                      <span className="line-clamp-1">Analisis Kelayakan Finansial (NPC, COE, ROI)</span>
                    </li>
                  </ul>
                </div>

                {/* Benefit Ringkas */}
                <div className="grid grid-cols-2 gap-1.5 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1 bg-muted/60 px-2 py-1 rounded border border-border">
                    <FileText className="size-3 text-blue-500 shrink-0" /> Modul Lengkap
                  </span>
                  <span className="inline-flex items-center gap-1 bg-muted/60 px-2 py-1 rounded border border-border">
                    <Award className="size-3 text-blue-500 shrink-0" /> Sertifikat Resmi
                  </span>
                  <span className="inline-flex items-center gap-1 bg-muted/60 px-2 py-1 rounded border border-border">
                    <Video className="size-3 text-blue-500 shrink-0" /> Video Rekaman
                  </span>
                  <span className="inline-flex items-center gap-1 bg-muted/60 px-2 py-1 rounded border border-border">
                    <Monitor className="size-3 text-blue-500 shrink-0" /> File HOMER Pro
                  </span>
                </div>

                {/* Price Box */}
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/25 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-300">Biaya Investasi</span>
                    <Badge className="bg-blue-600 text-white font-extrabold text-xs px-2 py-0.5">
                      Rp 300.000
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Batas bayar: <strong className="text-foreground">31 Okt 2026</strong> • BCA 3262681995
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 pt-0 flex items-center gap-2">
              <Button
                asChild
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer text-xs h-10 shadow-sm"
              >
                <Link to="/pendaftaran?training=homer-pro">
                  <CreditCard className="size-3.5 mr-1.5" />
                  Daftar (Rp 300rb)
                </Link>
              </Button>
              <a
                href="https://wa.me/62822268195332?text=Halo%20PT%20Mosha%20Sinalsal%20Solusi,%20saya%20ingin%20mendaftar%20Pelatihan%20HOMER%20Pro%201%20November%202026"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="size-10 border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 cursor-pointer shrink-0"
                  title="Hubungi via WhatsApp"
                >
                  <MessageCircle className="size-4 text-blue-500" />
                </Button>
              </a>
            </div>
          </motion.div>

          {/* =========================================================================
              CARD 3: PENGENALAN, DESAIN & COMMISSIONING PLTS (17 OKT 2026)
              ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-2xl border-2 border-emerald-500/50 hover:border-emerald-500 bg-card shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Top gradient accent bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500" />

              {/* Flyer / Banner Image (Compact with Zoom) */}
              <div
                onClick={() =>
                  setPreviewImage({
                    src: "/images/plts-commissioning-training.jpg",
                    title: "Pengenalan, Desain & Commissioning PLTS",
                  })
                }
                className="relative bg-slate-950 p-2.5 h-48 sm:h-52 flex items-center justify-center border-b border-border overflow-hidden cursor-pointer group/img"
              >
                <img
                  src="/images/plts-commissioning-training.jpg"
                  alt="Pelatihan PLTS Commissioning"
                  className="h-full w-auto max-w-full object-contain drop-shadow-md rounded transition-transform duration-500 group-hover/img:scale-105"
                />
                {/* Badge Online */}
                <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-600 text-white shadow-md">
                  <Sun className="size-3" />
                  Online
                </span>
                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-between p-2.5">
                  <span className="text-white text-xs font-medium drop-shadow">Klik perbesar</span>
                  <div className="p-1 rounded-md bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                    <Maximize2 className="size-3.5" />
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-4 sm:p-5 space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-semibold px-2 py-0.5">
                      Online Zoom/Meet
                    </Badge>
                    <span className="text-[11px] font-medium text-muted-foreground">PT Mosha &amp; Masebi</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-foreground tracking-tight leading-snug line-clamp-2 min-h-[2.8rem]">
                    Pengenalan, Desain &amp; Commissioning PLTS
                  </h3>
                  <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                    Sistem Pembangkit Listrik Tenaga Surya
                  </p>
                </div>

                {/* Schedule Info Box */}
                <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-foreground">
                    <Calendar className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="font-bold">Sabtu, 17 Okt 2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>18.00 – 21.30 WIB</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Video className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>Google Meet / Zoom (Online)</span>
                  </div>
                </div>

                {/* Outline Ringkas */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-foreground mb-1.5 flex items-center gap-1">
                    <Layers className="size-3 text-emerald-600" />
                    Materi Utama (4 Modul)
                  </h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span className="line-clamp-1">Perkenalan &amp; Konsep System PLTS</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span className="line-clamp-1">Komponen: Modul PV, Inverter &amp; Baterai</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span className="line-clamp-1">Desain &amp; Perhitungan Sistem PLTS</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span className="line-clamp-1">Prosedur Commissioning &amp; Pengujian PLTS</span>
                    </li>
                  </ul>
                </div>

                {/* Benefit Ringkas */}
                <div className="grid grid-cols-2 gap-1.5 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1 bg-muted/60 px-2 py-1 rounded border border-border">
                    <FileText className="size-3 text-emerald-600 shrink-0" /> Modul Training
                  </span>
                  <span className="inline-flex items-center gap-1 bg-muted/60 px-2 py-1 rounded border border-border">
                    <Award className="size-3 text-emerald-600 shrink-0" /> Sertifikat Resmi
                  </span>
                  <span className="inline-flex items-center gap-1 bg-muted/60 px-2 py-1 rounded border border-border">
                    <Video className="size-3 text-emerald-600 shrink-0" /> Rekaman Video
                  </span>
                  <span className="inline-flex items-center gap-1 bg-muted/60 px-2 py-1 rounded border border-border">
                    <Users className="size-3 text-emerald-600 shrink-0" /> Grup Komunitas
                  </span>
                </div>

                {/* Price Box */}
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-300">Biaya Investasi</span>
                    <Badge className="bg-emerald-600 text-white font-extrabold text-xs px-2 py-0.5">
                      Rp 250.000
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Batas bayar: <strong className="text-foreground">16 Okt 2026</strong> • BCA 3262681995
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 pt-0 flex items-center gap-2">
              <Button
                asChild
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold cursor-pointer text-xs h-10 shadow-sm"
              >
                <Link to="/pendaftaran?training=plts-commissioning">
                  <CreditCard className="size-3.5 mr-1.5" />
                  Daftar (Rp 250rb)
                </Link>
              </Button>
              <a
                href="https://wa.me/62822268195332?text=Halo%20PT%20Mosha%20Sinalsal%20Solusi,%20saya%20ingin%20mendaftar%20Pelatihan%20PLTS%2017%20Oktober%202026"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="size-10 border-emerald-600 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 cursor-pointer shrink-0"
                  title="Hubungi via WhatsApp"
                >
                  <MessageCircle className="size-4 text-emerald-600" />
                </Button>
              </a>
            </div>
          </motion.div>

          {/* =========================================================================
              CARD 4: COMMISSIONING FASILITAS OIL & GAS & PEMBANGKIT LISTRIK (OFFLINE BATAM - 26-27 SEPT 2026)
              ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="rounded-2xl border-2 border-red-500/40 hover:border-red-500 bg-card shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Top gradient accent bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-rose-500 to-amber-500" />

              {/* Flyer / Banner Image (Compact with Zoom) */}
              <div
                onClick={() =>
                  setPreviewImage({
                    src: "/images/PT_MOSHA_New.jpg",
                    title: "Commissioning Fasilitas Oil & Gas & Pembangkit Listrik",
                  })
                }
                className="relative bg-slate-950 p-2.5 h-48 sm:h-52 flex items-center justify-center border-b border-border overflow-hidden cursor-pointer group/img"
              >
                <img
                  src="/images/PT_MOSHA_New.jpg"
                  alt="Commissioning Fasilitas Oil & Gas"
                  className="h-full w-auto max-w-full object-contain drop-shadow-md rounded transition-transform duration-500 group-hover/img:scale-105"
                />
                {/* Badge Offline */}
                <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-600 text-white shadow-md">
                  <MapPin className="size-3" />
                  Offline Batam
                </span>
                {/* Hover overlay with zoom icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-between p-2.5">
                  <span className="text-white text-xs font-medium drop-shadow">Klik perbesar</span>
                  <div className="p-1 rounded-md bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                    <Maximize2 className="size-3.5" />
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-4 sm:p-5 space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <Badge className="bg-red-600 hover:bg-red-700 text-white text-[10px] font-semibold px-2 py-0.5">
                      Offline Tatap Muka
                    </Badge>
                    <span className="text-[11px] font-medium text-muted-foreground">PT Mosha &amp; Masebi</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-foreground tracking-tight leading-snug line-clamp-2 min-h-[2.8rem]">
                    Commissioning Oil &amp; Gas &amp; Pembangkit
                  </h3>
                  <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wide">
                    Sistem Perpipaan, Mekanikal, E&amp;I &amp; HC
                  </p>
                </div>

                {/* Schedule Info Box */}
                <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/20 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-foreground">
                    <Calendar className="size-3.5 text-red-600 shrink-0" />
                    <span className="font-bold">26 – 27 Sept 2026 (2 Hari)</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="size-3.5 text-red-600 shrink-0" />
                    <span>13.30 – 18.00 WIB</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="size-3.5 text-red-600 shrink-0" />
                    <span className="line-clamp-1">Bukit Kemuning DD3 No. 02, Batam</span>
                  </div>
                </div>

                {/* Outline Ringkas */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-foreground mb-1.5 flex items-center gap-1">
                    <Layers className="size-3 text-red-600" />
                    Materi Utama (10 Modul)
                  </h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li className="flex items-start gap-1.5">
                      <span className="text-red-600 font-bold">•</span>
                      <span className="line-clamp-1">Precommissioning &amp; Commissioning Strategy</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-red-600 font-bold">•</span>
                      <span className="line-clamp-1">System Limit, P&amp;ID Markup &amp; Mech Completion</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-red-600 font-bold">•</span>
                      <span className="line-clamp-1">Inspection Test Record (ITR) &amp; Vendor Support</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-red-600 font-bold">•</span>
                      <span className="line-clamp-1">Hydrocarbon Commissioning &amp; Handover</span>
                    </li>
                  </ul>
                </div>

                {/* Benefit Ringkas */}
                <div className="grid grid-cols-2 gap-1.5 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1 bg-muted/60 px-2 py-1 rounded border border-border">
                    <FileText className="size-3 text-red-600 shrink-0" /> Modul &amp; Contoh ITR
                  </span>
                  <span className="inline-flex items-center gap-1 bg-muted/60 px-2 py-1 rounded border border-border">
                    <Award className="size-3 text-red-600 shrink-0" /> Sertifikat Resmi
                  </span>
                  <span className="inline-flex items-center gap-1 bg-muted/60 px-2 py-1 rounded border border-border">
                    <CheckCircle2 className="size-3 text-red-600 shrink-0" /> Kisi-Kisi Interview
                  </span>
                  <span className="inline-flex items-center gap-1 bg-muted/60 px-2 py-1 rounded border border-border">
                    <Video className="size-3 text-red-600 shrink-0" /> Rekaman Video
                  </span>
                </div>

                {/* Price Box */}
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/25 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-red-700 dark:text-red-300">Biaya Investasi</span>
                    <Badge className="bg-red-600 text-white font-extrabold text-xs px-2 py-0.5">
                      Rp 1.500.000
                    </Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Pelatihan Tatap Muka 2 Hari di Batam • BCA 3262681995
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 pt-0 flex items-center gap-2">
              <Button
                asChild
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer text-xs h-10 shadow-sm"
              >
                <Link to="/pendaftaran?training=oil-gas-power-plant-offline">
                  <CreditCard className="size-3.5 mr-1.5" />
                  Daftar (Rp 1.5jt)
                </Link>
              </Button>
              <a
                href="https://wa.me/6282268195332?text=Halo%20PT%20Mosha%20Sinalsal%20Solusi,%20saya%20ingin%20bertanya%20mengenai%20Training%20Commissioning%20Oil%20%26%20Gas"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="size-10 border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 cursor-pointer shrink-0"
                  title="Hubungi via WhatsApp"
                >
                  <MessageCircle className="size-4 text-red-600" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl max-h-[90vh] bg-card rounded-2xl overflow-hidden shadow-2xl border border-white/20 p-2"
            >
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>
              <img
                src={previewImage.src}
                alt={previewImage.title}
                className="w-full h-auto max-h-[85vh] object-contain rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


    </section>
  );
}
