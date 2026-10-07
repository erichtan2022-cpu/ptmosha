export interface TrainingOption {
  id: string;
  name: string;
  shortTitle: string;
  category: string;
  fee: number;
  feeFormatted: string;
  feeWords: string;
  schedule: string;
  time: string;
  location: string;
  mode: "Online" | "Offline Batam";
  organizer: string;
  paymentDeadline: string;
  description: string;
  badge?: string;
  image?: string;
}

export const BANK_ACCOUNT_DETAILS = {
  bankName: "Bank Central Asia (BCA)",
  bankShort: "BCA",
  accountNumber: "3262681995",
  accountHolder: "PT Mosha Sinalsal Solusi",
  destinationEmail: "moshasolusi@gmail.com",
  adminWhatsapp1: "62822268195332",
  adminWhatsapp2: "6282392907198",
};

export const AVAILABLE_TRAININGS: TrainingOption[] = [
  {
    id: "plts-commissioning",
    name: "TRAINING PENGENALAN, DESAIN & COMMISSIONING PLTS - Rp 250.000",
    shortTitle: "TRAINING PENGENALAN, DESAIN & COMMISSIONING PEMBANGKIT LISTRIK TENAGA SURYA (PLTS)",
    category: "Renewable Energy (PLTS)",
    fee: 250000,
    feeFormatted: "Rp 250.000",
    feeWords: "Dua Ratus Lima Puluh Ribu Rupiah",
    schedule: "Sabtu, 17 Oktober 2026",
    time: "18.00 – 21.30 WIB",
    location: "Online Training Lewat Google Meet",
    mode: "Online",
    organizer: "PT Mosha Sinalsal Solusi dan Masyarakat Sistem Energi Berkelanjutan Indonesia (www.masebi.org)",
    paymentDeadline: "16 Oktober 2026",
    description: "Diselenggarakan oleh PT Mosha Sinalsal Solusi dan Masyarakat Sistem Energi Berkelanjutan Indonesia (www.masebi.org). Membahas Modul PV, Inverter Hibrida Cerdas, Sistem Penyimpanan Baterai Terintegrasi, Distribusi DC, Smart Metering, Desain & Prosedur Commissioning PLTS.",
    badge: "Terbaru & Online",
    image: "/images/plts-commissioning-training.jpg",
  },
  {
    id: "oil-gas-power-plant-offline",
    name: "COMMISSIONING FASILITAS OIL & GAS & PEMBANGKIT LISTRIK (Offline Batam) - Rp 1.500.000",
    shortTitle: "Commissioning Fasilitas Oil & Gas & Pembangkit Listrik (Tatap Muka Batam)",
    category: "Commissioning & Engineering",
    fee: 1500000,
    feeFormatted: "Rp 1.500.000",
    feeWords: "Satu Juta Lima Ratus Ribu Rupiah",
    schedule: "26 – 27 September 2026 (Sabtu & Minggu)",
    time: "13.30 – 18.00 WIB",
    location: "Ruko Bukit Kemuning Blok DD3 No. 02, Batam",
    mode: "Offline Batam",
    organizer: "PT Mosha Sinalsal Solusi & Masebi",
    paymentDeadline: "H-2 sebelum pelaksanaan",
    description: "Pelatihan tatap muka intensif 10 modul: P&ID Markup, Mechanical Completion, ITR, Piping, E&I, Hydrocarbon Startup, System Handover.",
    badge: "Offline Batam",
    image: "/images/PT_MOSHA_New.jpg",
  },
  {
    id: "oil-gas-power-plant-online",
    name: "COMMISSIONING OIL & GAS DAN SISTEM PEMBANGKIT LISTRIK (Online) - Rp 500.000",
    shortTitle: "Commissioning Oil & Gas & Power Plant (Online)",
    category: "Commissioning & Engineering",
    fee: 500000,
    feeFormatted: "Rp 500.000",
    feeWords: "Lima Ratus Ribu Rupiah",
    schedule: "Batch Terdekat (Jadwal Fleksibel)",
    time: "19.00 – 21.30 WIB (2 Sesi)",
    location: "Online Training Lewat Google Meet / Zoom",
    mode: "Online",
    organizer: "PT Mosha Sinalsal Solusi & Masebi",
    paymentDeadline: "H-1 sebelum pelaksanaan",
    description: "Prinsip dasar, strategi, prosedur ITR, P&ID markup, mechanical completion, dan startup sistem Hydrocarbon & Non-hydrocarbon.",
    badge: "Online Class",
  },
  {
    id: "mechanical-piping-commissioning",
    name: "COMMISSIONING MECHANICAL & PIPING (Online) - Rp 450.000",
    shortTitle: "Commissioning Mechanical & Piping",
    category: "Commissioning & Engineering",
    fee: 450000,
    feeFormatted: "Rp 450.000",
    feeWords: "Empat Ratus Lima Puluh Ribu Rupiah",
    schedule: "Batch Terdekat",
    time: "2 x 2,5 Jam",
    location: "Online Training Lewat Google Meet / Zoom",
    mode: "Online",
    organizer: "PT Mosha Sinalsal Solusi",
    paymentDeadline: "H-1 sebelum pelaksanaan",
    description: "Pengujian mekanikal, hydrotest, flushing, punch list management, dan alignment peralatan rotating.",
    badge: "Online Class",
  },
  {
    id: "electrical-instrument-commissioning",
    name: "COMMISSIONING ELECTRICAL & INSTRUMENTATION (Online) - Rp 450.000",
    shortTitle: "Commissioning Electrical & Instrumentation",
    category: "Commissioning & Engineering",
    fee: 450000,
    feeFormatted: "Rp 450.000",
    feeWords: "Empat Ratus Lima Puluh Ribu Rupiah",
    schedule: "Batch Terdekat",
    time: "2 x 2,5 Jam",
    location: "Online Training Lewat Google Meet / Zoom",
    mode: "Online",
    organizer: "PT Mosha Sinalsal Solusi",
    paymentDeadline: "H-1 sebelum pelaksanaan",
    description: "Pengujian isolasi listrik, loop check instrumen, kalibrasi sensor, proteksi rele, dan pengujian sistem kontrol otomatis.",
    badge: "Online Class",
  },
];
