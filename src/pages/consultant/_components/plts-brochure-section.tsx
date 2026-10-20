import { useState } from "react";
import { motion } from "motion/react";
import {
  Sun,
  Zap,
  BatteryCharging,
  FileDown,
  ZoomIn,
  CheckCircle2,
  Phone,
  Building,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Coins,
  ChevronRight,
  Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const BROCHURE_IMG = "/images/brosur-plts.png";

const PLTS_SYSTEMS = [
  {
    icon: Sun,
    title: "PLTS ON Grid",
    tagline: "Terhubung ke PLN / Jaringan",
    description:
      "Mengalirkan daya surya langsung ke beban dan jaringan PLN tanpa baterai. Sangat hemat biaya instalasi dan memaksimalkan efisiensi energi siang hari.",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  },
  {
    icon: BatteryCharging,
    title: "PLTS OFF Grid",
    tagline: "Tidak Terhubung ke PLN (Mandiri)",
    description:
      "Sistem 100% mandiri dengan bank baterai lithium. Sangat cocok untuk area tanpa akses PLN, perkebunan, pertambangan, atau remote site.",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  },
  {
    icon: Zap,
    title: "PLTS HYBRID",
    tagline: "Terhubung PLN & Baterai Backup",
    description:
      "Kombinasi fleksibilitas jaringan PLN dengan cadangan baterai cerdas. Menjamin kelangsungan listrik tanpa henti saat PLN padam.",
    badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  },
];

const PACKAGES = [
  {
    name: "OPSI 1: Ongrid (Tanpa Baterai)",
    badge: "Ekonomis",
    badgeType: "default",
    price: "Rp 26.500.000",
    specs: [
      { label: "Modul PLTS", val: "1,95 kWp (Longi 3 x 650 Wp) - Rp 11.5jt" },
      { label: "Inverter", val: "Ubetter 3 kW - Rp 7jt" },
      { label: "Baterai", val: "Tanpa Baterai" },
      { label: "Instalasi & Transport", val: "Kabel, Rak & Jasa - Rp 8jt" },
    ],
  },
  {
    name: "OPSI 2: Offgrid/Hybrid",
    badge: "Ekonomis + Baterai",
    badgeType: "default",
    price: "Rp 34.500.000",
    specs: [
      { label: "Modul PLTS", val: "1,95 kWp (Longi 3 x 650 Wp) - Rp 11.5jt" },
      { label: "Inverter", val: "Ubetter 3 kW - Rp 7jt" },
      { label: "Baterai", val: "Ubetter Lithium 25,6V 50Ah x2 (2.4 kWh) - Rp 7.5jt" },
      { label: "Instalasi & Transport", val: "Kabel, Rak & Jasa - Rp 8.5jt" },
    ],
  },
  {
    name: "OPSI 3: Offgrid/Hybrid",
    badge: "Baterai Optimal",
    badgeType: "popular",
    price: "Rp 44.000.000",
    specs: [
      { label: "Modul PLTS", val: "1,95 kWp (Longi 3 x 650 Wp) - Rp 11.5jt" },
      { label: "Inverter", val: "Ubetter 3 kW - Rp 7jt" },
      { label: "Baterai", val: "Lithium 51,2 Vdc/100 Ah (5 kWh) - Rp 15jt" },
      { label: "Instalasi & Transport", val: "Kabel, Rak & Jasa - Rp 10.5jt" },
    ],
  },
  {
    name: "OPSI 4: Offgrid/Hybrid",
    badge: "System Optimal",
    badgeType: "recommended",
    price: "Rp 60.000.000",
    specs: [
      { label: "Modul PLTS", val: "3,9 kWp (6 x 650 Wp) - Rp 23jt" },
      { label: "Inverter", val: "Ubetter 3 kW - Rp 7jt" },
      { label: "Baterai", val: "Lithium 51,2 Vdc/100 Ah (5 kWh) - Rp 15jt" },
      { label: "Instalasi & Transport", val: "Kabel, Rak & Jasa - Rp 15jt" },
    ],
  },
];

const ECONOMIC_BENEFITS = [
  "Menghemat Biaya Listrik Hingga 40%",
  "Pengembalian Modal (ROI) 5 – 8 Tahun dari Masa Operasi 30 Tahun",
  "Terhindar dari Pemadaman & Gangguan Listrik PLN",
  "Ramah Lingkungan & Mendukung Net Zero Emission (ESG)",
];

const BUSINESS_SCHEMES = [
  "Biaya Sendiri / Kepemilikan Penuh (Capex)",
  "Tanpa Biaya Awal oleh Pihak Ketiga (Third Party / Zero Capex)",
  "Skema Tarif Berdasarkan Nilai Tetap (Fix) atau Performance Rate",
  "Skenario Tarif Listrik Fleksibel (Variatif, Dinamis, Ceiling Price, dll)",
];

const TARGET_LOCATIONS = [
  "Industri & Pabrik",
  "Perumahan & Residensial",
  "Kantor & Komersial",
  "Restoran & Kafe",
  "Toko & Supermarket",
  "Gedung Kampus & Sekolah",
  "Lahan Parkir (Solar Canopy)",
  "Kebun, Ladang & Peternakan",
];

export default function PltsBrochureSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="brosur-plts" className="py-16 lg:py-24 bg-muted/30 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="size-3.5" />
            Brosur Resmi Layanan Konsultan &amp; Pemasangan
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Pembangkit Listrik Tenaga Surya <span className="text-accent">(PLTS) Atap</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            PT Mosha Sinalsal Solusi melayani konsultasi teknis, studi kelayakan, perancangan engineering,
            pengadaan komponen berstandar industri, hingga komisioning dan pemeliharaan PLTS Atap bergaransi.
          </p>
        </motion.div>

        {/* Top Grid: Brochure Image Preview & Quick Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          {/* Left Column: Interactive Brochure Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5"
          >
            <div className="group relative rounded-2xl border-2 border-border/80 bg-card p-3 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="relative overflow-hidden rounded-xl bg-slate-900/5 aspect-[3/4.2]">
                <img
                  src={BROCHURE_IMG}
                  alt="Brosur PLTS Atap PT Mosha Sinalsal Solusi"
                  className="w-full h-full object-contain cursor-pointer transition-transform duration-300 group-hover:scale-[1.02]"
                  onClick={() => setModalOpen(true)}
                />
                <div
                  onClick={() => setModalOpen(true)}
                  className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center cursor-pointer text-white gap-2 backdrop-blur-[2px]"
                >
                  <div className="size-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 shadow-lg">
                    <ZoomIn className="size-6 text-white" />
                  </div>
                  <span className="font-semibold text-sm">Klik untuk Perbesar Brosur</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full font-semibold border-primary/20 hover:bg-primary hover:text-primary-foreground cursor-pointer text-xs sm:text-sm"
                    >
                      <Maximize2 className="size-3.5 mr-1.5" />
                      Pratinjau Penuh
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl p-2 sm:p-4 bg-background/95 backdrop-blur-md max-h-[95vh] overflow-y-auto">
                    <DialogHeader className="px-2 pt-2">
                      <DialogTitle className="text-base sm:text-lg font-bold flex items-center justify-between">
                        <span>Brosur PLTS Atap - PT Mosha Sinalsal Solusi</span>
                      </DialogTitle>
                    </DialogHeader>
                    <div className="mt-2 rounded-lg overflow-hidden border border-border bg-slate-950/5 flex items-center justify-center">
                      <img
                        src={BROCHURE_IMG}
                        alt="Brosur Lengkap PLTS Atap"
                        className="w-full h-auto max-h-[80vh] object-contain"
                      />
                    </div>
                    <div className="flex flex-wrap items-center justify-end gap-2 pt-3 px-2">
                      <a href={BROCHURE_IMG} download="Brosur_PLTS_Atap_PT_Mosha.png">
                        <Button size="sm" variant="outline" className="cursor-pointer gap-1.5 text-xs">
                          <FileDown className="size-3.5" />
                          Download PNG
                        </Button>
                      </a>
                      <a
                        href="https://wa.me/6281261014705?text=Halo%20PT%20Mosha%20Sinalsal%20Solusi%2C%20saya%20tertarik%20dengan%20layanan%20konsultasi%20dan%20pemasangan%20PLTS%20Atap."
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 cursor-pointer gap-1.5 text-xs font-semibold">
                          <Phone className="size-3.5" />
                          Hubungi via WhatsApp
                        </Button>
                      </a>
                    </div>
                  </DialogContent>
                </Dialog>

                <a href={BROCHURE_IMG} download="Brosur_PLTS_Atap_PT_Mosha.png">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full font-semibold cursor-pointer text-xs sm:text-sm"
                  >
                    <FileDown className="size-3.5 mr-1.5" />
                    Unduh Brosur
                  </Button>
                </a>
              </div>

              {/* Direct WhatsApp CTA Button */}
              <a
                href="https://wa.me/6281261014705?text=Halo%20PT%20Mosha%20Sinalsal%20Solusi%2C%20saya%20tertarik%20dengan%20konsultasi%20PLTS%20Atap%20sesuai%20brosur."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 block"
              >
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer text-xs sm:text-sm shadow-md">
                  <Phone className="size-4 mr-2" />
                  Konsultasi Langsung via WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Systems & Scale Capacity Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* 3 Sistem PLTS */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Sun className="size-5 text-accent" />
                3 Pilihan Sistem PLTS Atap
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {PLTS_SYSTEMS.map((sys) => {
                  const Icon = sys.icon;
                  return (
                    <div
                      key={sys.title}
                      className="p-4 rounded-xl border border-border bg-card shadow-sm hover:border-accent/40 transition-colors"
                    >
                      <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                        <Icon className="size-5" />
                      </div>
                      <h4 className="font-bold text-foreground text-sm">{sys.title}</h4>
                      <p className="text-xs font-semibold text-accent mt-0.5 mb-2">{sys.tagline}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{sys.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Industrial Scale Banner */}
            <div className="p-5 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Building className="size-4 text-accent" />
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">Kapasitas Fleksibel</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-foreground">
                  Pembangunan PLTS Hingga Kapasitas <span className="text-primary font-black">500 kWp</span>
                </h4>
                <p className="text-xs text-muted-foreground">
                  Melayani skala kecil (residensial), menengah, hingga skala industri &amp; kawasan komersial besar.
                </p>
              </div>
              <a
                href="https://wa.me/6281261014705?text=Halo%20PT%20Mosha%2C%20kami%20ingin%20konsultasi%20PLTS%20skala%20industri%20%2F%20menengah."
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs font-semibold cursor-pointer">
                  Hubungi Sales Industri
                  <ChevronRight className="size-3.5 ml-1" />
                </Button>
              </a>
            </div>

            {/* Target Locations */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2.5">
                Cocok Untuk Berbagai Lokasi:
              </h4>
              <div className="flex flex-wrap gap-2">
                {TARGET_LOCATIONS.map((loc) => (
                  <span
                    key={loc}
                    className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-secondary text-secondary-foreground border border-border"
                  >
                    <CheckCircle2 className="size-3 mr-1.5 text-accent" />
                    {loc}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Pricing Packages Table / Grid (From Brochure) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-foreground">
              Daftar Harga Paket PLTS Atap <span className="text-accent text-lg font-normal">(Skala Kecil)</span>
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Rincian transparan mencakup Modul Surya Longi, Inverter Ubetter, Baterai Lithium opsional, serta material kabel, transport &amp; biaya instalasi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.name}
                className="relative rounded-xl border border-border bg-card p-5 shadow-sm hover:border-accent hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-accent/15 text-accent">
                      {pkg.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-foreground text-sm leading-snug">{pkg.name}</h4>
                  <div className="mt-4 mb-4 pb-4 border-b border-border">
                    <span className="text-xs text-muted-foreground block">Total (1 Lot)</span>
                    <span className="text-2xl font-extrabold text-primary tracking-tight">{pkg.price}</span>
                  </div>

                  <ul className="space-y-2 text-xs">
                    {pkg.specs.map((spec, i) => (
                      <li key={i} className="flex flex-col">
                        <span className="text-muted-foreground font-medium">{spec.label}:</span>
                        <span className="text-foreground font-semibold">{spec.val}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <a
                    href={`https://wa.me/6281261014705?text=Halo%20PT%20Mosha%2C%20saya%20ingin%20memesan%20atau%20konsultasi%20paket%20${encodeURIComponent(
                      pkg.name
                    )}%20seharga%20${encodeURIComponent(pkg.price)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs font-semibold hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    >
                      Pilih Paket Ini
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Grid: Nilai Ekonomi & Skema Bisnis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Nilai Ekonomi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="size-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center">
                <TrendingUp className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Nilai Ekonomi &amp; Keuntungan</h3>
                <p className="text-xs text-muted-foreground">Investasi cerdas jangka panjang</p>
              </div>
            </div>
            <ul className="space-y-3.5">
              {ECONOMIC_BENEFITS.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <ShieldCheck className="size-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/90 font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Skema Bisnis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Coins className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Pilihan Skema Pembiayaan Bisnis</h3>
                <p className="text-xs text-muted-foreground">Model pembiayaan fleksibel sesuai kebutuhan</p>
              </div>
            </div>
            <ul className="space-y-3.5">
              {BUSINESS_SCHEMES.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/90 font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
