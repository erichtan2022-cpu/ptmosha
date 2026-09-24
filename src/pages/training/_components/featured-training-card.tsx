import { motion } from "motion/react";
import { Calendar, Clock, MapPin, CheckCircle2, Award, FileText, Video, ExternalLink, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";

const OUTLINE_ITEMS = [
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

const BENEFITS = [
  { icon: FileText, text: "Softcopy Modul Training" },
  { icon: Award, text: "Sertifikat Lembaga Training" },
  { icon: FileText, text: "Contoh Project Prosedur, ITR, Drawing, dll." },
  { icon: CheckCircle2, text: "Kisi-Kisi Interview Commissioning" },
  { icon: Video, text: "Rekaman Video Training" },
];

export default function FeaturedTrainingCard() {
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
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30 mb-3 px-3 py-1 text-xs font-semibold tracking-wide uppercase">
            Jadwal Pelatihan Terdekat
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            Program Training & Sertifikasi Tatap Muka
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base">
            Tingkatkan keahlian teknis Anda bersama instruktur profesional dalam pelaksanaan commissioning industri Oil & Gas serta Pembangkit Listrik.
          </p>
        </motion.div>

        {/* Main Card Grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-border bg-card shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0"
        >
          {/* Left Column: Poster Image Card */}
          <div className="lg:col-span-5 relative bg-black/90 flex items-center justify-center p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-border">
            <div className="relative group overflow-hidden rounded-xl shadow-2xl border border-white/10 w-full max-w-md">
              <img
                src="/images/PT_MOSHA_New.jpg"
                alt="Commissioning Fasilitas Oil & Gas & Pembangkit Listrik Training Banner"
                className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md">
                  Offline / Tatap Muka
                </Badge>
              </div>
            </div>
          </div>

          {/* Right Column: Training Details */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              {/* Header Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge className="bg-accent text-accent-foreground font-semibold">
                  PT Mosha Sinalsal Solusi & Masebi
                </Badge>
                <Badge variant="outline" className="text-muted-foreground border-border">
                  Batam, Kepulauan Riau
                </Badge>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-foreground leading-tight">
                Commissioning Fasilitas Oil & Gas & Pembangkit Listrik
              </h3>

              {/* Date, Time, Location Grid */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-muted/50 border border-border">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent shrink-0">
                    <Calendar className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Jadwal Tanggal</p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">26 – 27 Sept 2026</p>
                    <p className="text-xs text-muted-foreground">(Sabtu & Minggu)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent shrink-0">
                    <Clock className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Waktu Pelaksanaan</p>
                    <p className="text-sm font-semibold text-foreground mt-0.5">13.30 – 18.00 WIB</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-accent/10 text-accent shrink-0">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Lokasi Pelatihan</p>
                    <p className="text-xs font-semibold text-foreground leading-snug mt-0.5">
                      Ruko Bukit Kemuning Blok DD3 No. 02, Batam
                    </p>
                  </div>
                </div>
              </div>

              {/* Outline Materi */}
              <div className="mt-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">
                  Outline Materi Training (10 Modul)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                  {OUTLINE_ITEMS.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-muted-foreground">
                      <span className="inline-flex items-center justify-center size-5 rounded-full bg-accent/10 text-accent text-[11px] font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits Peserta */}
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-3">
                  Fasilitas & Benefit Peserta
                </h4>
                <div className="flex flex-wrap gap-2">
                  {BENEFITS.map((benefit, idx) => {
                    const Icon = benefit.icon;
                    return (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/5 border border-accent/20 text-xs font-medium text-foreground"
                      >
                        <Icon className="size-3.5 text-accent" />
                        {benefit.text}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center gap-3">
              <a
                href="https://bit.ly/4cz9xct"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer shadow-lg">
                  <ExternalLink className="size-4 mr-2" />
                  Daftar Sekarang (Register Now)
                </Button>
              </a>

              <a
                href="https://wa.me/6282268195332?text=Halo%20PT%20Mosha%20Sinalsal%20Solusi,%20saya%20ingin%20bertanya%20mengenai%20Training%20Commissioning%20Oil%20%26%20Gas"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button size="lg" variant="outline" className="w-full border-emerald-600 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 font-semibold cursor-pointer">
                  <MessageCircle className="size-4 mr-2 text-emerald-600" />
                  WhatsApp Admin (082268195332)
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
