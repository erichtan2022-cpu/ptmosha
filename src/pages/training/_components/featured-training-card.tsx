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
  ExternalLink,
  MessageCircle,
  Sun,
  Zap,
  BatteryCharging,
  Maximize2,
  X,
  Layers,
  CreditCard,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import TrainingRegistrationDialog from "@/components/training/training-registration-dialog.tsx";

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
  const [registrationModal, setRegistrationModal] = useState<{
    open: boolean;
    trainingId: string;
  }>({
    open: false,
    trainingId: "plts-commissioning",
  });

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

        {/* 2-Column Cards Grid: PLTS on the LEFT, Oil & Gas on the RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* =========================================================================
              CARD 1 (LEFT): PENGENALAN, DESAIN & COMMISSIONING PLTS
              ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border-2 border-emerald-500/40 bg-card shadow-xl overflow-hidden flex flex-col justify-between relative group hover:border-emerald-500/70 transition-colors"
          >
            {/* Ribbon "Terbaru / Online" */}
            <div className="absolute top-4 right-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-md animate-pulse">
                <Sun className="size-3.5" />
                Terbaru (Online)
              </span>
            </div>

            <div>
              {/* Poster Image Section */}
              <div className="relative bg-slate-950 p-4 sm:p-6 border-b border-border flex flex-col items-center justify-center">
                <div className="relative group/img overflow-hidden rounded-xl shadow-2xl border border-white/10 w-full max-w-sm">
                  <img
                    src="/images/plts-commissioning-training.jpg"
                    alt="Pelatihan Profesional: Pengenalan, Desain & Commissioning PLTS"
                    className="w-full h-auto object-cover transform transition-transform duration-500 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-between p-3">
                    <span className="text-white text-xs font-medium">Klik untuk perbesar</span>
                    <button
                      onClick={() =>
                        setPreviewImage({
                          src: "/images/plts-commissioning-training.jpg",
                          title: "Pengenalan, Desain & Commissioning PLTS",
                        })
                      }
                      className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm cursor-pointer"
                      title="Lihat Gambar Penuh"
                    >
                      <Maximize2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Training Details Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-2.5">
                    <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
                      Online via Google Meet / Zoom
                    </Badge>
                    <Badge variant="outline" className="border-border text-muted-foreground text-xs">
                      PT Mosha Sinalsal Solusi &amp; Masebi
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight leading-tight">
                    Pengenalan, Desain &amp; Commissioning PLTS
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-1 uppercase tracking-wide">
                    Sistem Pembangkit Listrik Tenaga Surya
                  </p>
                </div>

                {/* Schedule Info Box */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                      <Calendar className="size-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Jadwal</p>
                      <p className="text-xs sm:text-sm font-bold text-foreground">Sabtu, 17 Okt 2026</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                      <Clock className="size-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Waktu</p>
                      <p className="text-xs sm:text-sm font-bold text-foreground">18.00 – 21.30 WIB</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                      <Video className="size-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Media</p>
                      <p className="text-xs sm:text-sm font-bold text-foreground">Google Meet / Zoom</p>
                    </div>
                  </div>
                </div>

                {/* 5 Highlights from Poster */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-2.5 flex items-center gap-1.5">
                    <Zap className="size-3.5 text-amber-500" />
                    Topik &amp; Komponen Utama
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {PLTS_HIGHLIGHTS.map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-muted text-[11px] font-medium text-foreground border border-border"
                      >
                        <BatteryCharging className="size-3 text-emerald-500" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Outline Materi */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-2.5 flex items-center gap-1.5">
                    <Layers className="size-3.5 text-emerald-600" />
                    Outline Pelatihan (4 Modul)
                  </h4>
                  <div className="space-y-1.5">
                    {PLTS_OUTLINE.map((modul, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <span className="inline-flex items-center justify-center size-4 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="font-medium text-foreground/90">{modul}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefit Peserta */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-2.5">
                    Benefit Peserta
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PLTS_BENEFITS.map((b, idx) => {
                      const Icon = b.icon;
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 border border-border text-xs font-medium text-foreground"
                        >
                          <Icon className="size-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{b.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Pricing & Official Bank Transfer Details */}
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold tracking-wider text-emerald-800 dark:text-emerald-300">
                      Biaya Training (Investasi)
                    </span>
                    <Badge className="bg-emerald-600 text-white font-black text-xs px-2.5 py-0.5 shadow-sm">
                      Rp 250.000
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Dua Ratus Lima Puluh Ribu Rupiah • Pembayaran paling lambat <strong className="text-foreground">16 Oktober 2026</strong>.
                  </p>
                  <div className="pt-2 border-t border-emerald-500/20 text-xs flex flex-wrap items-center justify-between gap-1">
                    <span className="text-muted-foreground">Rekening Resmi:</span>
                    <span className="font-bold text-foreground">
                      BCA 3262681995 a.n. PT Mosha Sinalsal Solusi
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 pt-4 border-t border-border bg-card flex flex-col sm:flex-row items-center gap-3">
              <Button
                onClick={() =>
                  setRegistrationModal({
                    open: true,
                    trainingId: "plts-commissioning",
                  })
                }
                className="w-full sm:flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold cursor-pointer shadow-md text-sm h-11"
              >
                <CreditCard className="size-4 mr-2" />
                Daftar &amp; Bayar (Rp 250rb)
              </Button>

              <a
                href="https://wa.me/62822268195332?text=Halo%20PT%20Mosha%20Sinalsal%20Solusi,%20saya%20ingin%20mendaftar%20Pelatihan%20PLTS%2017%20Oktober%202026"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  className="w-full border-emerald-600 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 font-semibold cursor-pointer h-11 text-sm"
                >
                  <MessageCircle className="size-4 mr-1.5 text-emerald-600" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>

          {/* =========================================================================
              CARD 2 (RIGHT): COMMISSIONING FASILITAS OIL & GAS & PEMBANGKIT LISTRIK
              ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border-2 border-border bg-card shadow-xl overflow-hidden flex flex-col justify-between relative group hover:border-accent/60 transition-colors"
          >
            {/* Badge "Offline / Tatap Muka" */}
            <div className="absolute top-4 right-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white shadow-md">
                <MapPin className="size-3.5" />
                Offline Batam
              </span>
            </div>

            <div>
              {/* Poster Image Section */}
              <div className="relative bg-slate-950 p-4 sm:p-6 border-b border-border flex flex-col items-center justify-center">
                <div className="relative group/img overflow-hidden rounded-xl shadow-2xl border border-white/10 w-full max-w-sm">
                  <img
                    src="/images/PT_MOSHA_New.jpg"
                    alt="Commissioning Fasilitas Oil & Gas & Pembangkit Listrik"
                    className="w-full h-auto object-cover transform transition-transform duration-500 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-between p-3">
                    <span className="text-white text-xs font-medium">Klik untuk perbesar</span>
                    <button
                      onClick={() =>
                        setPreviewImage({
                          src: "/images/PT_MOSHA_New.jpg",
                          title: "Commissioning Fasilitas Oil & Gas & Pembangkit Listrik",
                        })
                      }
                      className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm cursor-pointer"
                      title="Lihat Gambar Penuh"
                    >
                      <Maximize2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Training Details Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-2.5">
                    <Badge className="bg-red-600 hover:bg-red-700 text-white font-semibold">
                      Offline Tatap Muka
                    </Badge>
                    <Badge variant="outline" className="border-border text-muted-foreground text-xs">
                      PT Mosha Sinalsal Solusi &amp; Masebi
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight leading-tight">
                    Commissioning Fasilitas Oil &amp; Gas &amp; Pembangkit Listrik
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-accent mt-1 uppercase tracking-wide">
                    Sistem Perpipaan, Mekanikal, E&amp;I &amp; Hydrocarbon
                  </p>
                </div>

                {/* Schedule Info Box */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-muted/50 border border-border">
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-lg bg-accent/10 text-accent shrink-0 mt-0.5">
                      <Calendar className="size-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Jadwal</p>
                      <p className="text-xs sm:text-sm font-bold text-foreground">26 – 27 Sept 2026</p>
                      <p className="text-[10px] text-muted-foreground">(Sabtu &amp; Minggu)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-lg bg-accent/10 text-accent shrink-0 mt-0.5">
                      <Clock className="size-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Waktu</p>
                      <p className="text-xs sm:text-sm font-bold text-foreground">13.30 – 18.00 WIB</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-lg bg-accent/10 text-accent shrink-0 mt-0.5">
                      <MapPin className="size-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Lokasi</p>
                      <p className="text-xs font-bold text-foreground leading-snug">Bukit Kemuning DD3 No. 02, Batam</p>
                    </div>
                  </div>
                </div>

                {/* Outline Materi */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-2.5 flex items-center gap-1.5">
                    <Layers className="size-3.5 text-accent" />
                    Outline Pelatihan (10 Modul)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {OIL_GAS_OUTLINE.map((modul, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                        <span className="inline-flex items-center justify-center size-4 rounded-full bg-accent/10 text-accent text-[10px] font-bold shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="font-medium text-foreground/90 truncate">{modul}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefit Peserta */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-foreground mb-2.5">
                    Fasilitas &amp; Benefit Peserta
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {OIL_GAS_BENEFITS.map((b, idx) => {
                      const Icon = b.icon;
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 border border-border text-xs font-medium text-foreground"
                        >
                          <Icon className="size-3.5 text-accent shrink-0" />
                          <span className="truncate">{b.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Pricing & Official Bank Transfer Details */}
                <div className="p-4 rounded-xl bg-muted/60 border border-border space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold tracking-wider text-muted-foreground">
                      Biaya Training (Investasi)
                    </span>
                    <Badge className="bg-red-600 text-white font-black text-xs px-2.5 py-0.5 shadow-sm">
                      Rp 1.500.000
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Satu Juta Lima Ratus Ribu Rupiah • Pelatihan Tatap Muka 2 Hari di Batam.
                  </p>
                  <div className="pt-2 border-t border-border text-xs flex flex-wrap items-center justify-between gap-1">
                    <span className="text-muted-foreground">Rekening Resmi:</span>
                    <span className="font-bold text-foreground">
                      BCA 3262681995 a.n. PT Mosha Sinalsal Solusi
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 pt-4 border-t border-border bg-card flex flex-col sm:flex-row items-center gap-3">
              <Button
                onClick={() =>
                  setRegistrationModal({
                    open: true,
                    trainingId: "oil-gas-power-plant-offline",
                  })
                }
                className="w-full sm:flex-1 bg-red-600 hover:bg-red-700 text-white font-extrabold cursor-pointer shadow-md text-sm h-11"
              >
                <CreditCard className="size-4 mr-2" />
                Daftar &amp; Bayar Sekarang
              </Button>

              <a
                href="https://wa.me/6282268195332?text=Halo%20PT%20Mosha%20Sinalsal%20Solusi,%20saya%20ingin%20bertanya%20mengenai%20Training%20Commissioning%20Oil%20%26%20Gas"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  className="w-full border-emerald-600 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 font-semibold cursor-pointer h-11 text-sm"
                >
                  <MessageCircle className="size-4 mr-1.5 text-emerald-600" />
                  WhatsApp
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

      {/* Training Registration & Payment Modal */}
      <TrainingRegistrationDialog
        open={registrationModal.open}
        onOpenChange={(open) =>
          setRegistrationModal((prev) => ({ ...prev, open }))
        }
        trainingId={registrationModal.trainingId}
      />
    </section>
  );
}
