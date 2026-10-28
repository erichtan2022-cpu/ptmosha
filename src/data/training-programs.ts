export interface TrainingOption {
  id: string;
  name: string;
  shortTitle: string;
  category: string;
  fee: number;
  feeFormatted: string;
  originalFee?: number;
  originalFeeFormatted?: string;
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
  meetUrl?: string;
  meetInfo?: string;
  syllabus?: string[];
  benefits?: string[];
  slugAliases?: string[];
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
    id: "corporate-esg-strategy",
    name: "BOOTCAMP CORPORATE ESG STRATEGY & SUSTAINABILITY MANAGEMENT - Rp 3.100.000",
    shortTitle: "Corporate ESG Strategy & Sustainability Management Bootcamp",
    category: "ESG & Sustainability",
    fee: 3100000,
    feeFormatted: "Rp 3.100.000",
    originalFee: 5000000,
    originalFeeFormatted: "Rp 5.000.000",
    feeWords: "Tiga Juta Seratus Ribu Rupiah",
    schedule: "Mulai Jumat, 6 November 2026",
    time: "8+ Sesi Live & Intensif (19.00 – 21.00 WIB)",
    location: "Online Zoom Meeting",
    mode: "Online",
    organizer: "PT Mosha Sinalsal Solusi, Zonaebt & Masebi",
    paymentDeadline: "5 November 2026",
    description: "Tingkatkan karir profesional Anda dengan program Bootcamp intensif Corporate ESG Strategy & Sustainability Management. Diselenggarakan melalui Online Zoom Meeting 8+ Sesi Live & Intensif.",
    badge: "Bootcamp Intensif",
    image: "/images/flyer-corporate-esg-strategy.jpg",
    meetUrl: "https://zoom.us/j/ptmosha-esg-bootcamp",
    meetInfo: "Jumat, 6 Nov 2026 · 8+ Sesi Live Online Zoom Meeting",
    syllabus: [
      "ESG Communication, Avoiding Greenwashing & Career Path",
      "Materiality Assessment & Stakeholder Mapping",
      "Corporate Carbon Accounting & GHG Protocol",
      "Decarbonization Strategy & Circular Economy",
      "Social Impact, DEI, and Human Rights in Business",
      "Corporate Governance, Risk Management & Sustainable Finance",
      "Mastering Sustainability Reporting",
    ],
    benefits: [
      "E-Sertifikat kelulusan resmi PT Mosha",
      "Gratis mini class Zonaebt",
      "E-Sertifikat karbon",
      "Mentor profesional berpengalaman",
      "Akses rekaman video & materi lengkap",
      "Studi kasus nyata industri (Study case)",
      "Grup diskusi interaktif bareng mentor",
    ],
    slugAliases: [
      "corporate-esg-strategy",
      "corporate-esg",
      "esg-strategy",
      "esg",
      "pendaftaran-corporate-esg-strategy",
      "pendaftaran-corporate-esg",
    ],
  },
  {
    id: "homer-pro",
    name: "TRAINING HOMER PRO (Desain, Simulasi & Analisis PLTS Hybrid) - Rp 300.000",
    shortTitle: "TRAINING HOMER PRO (Desain, Simulasi & Analisis PLTS Hybrid)",
    category: "Renewable Energy (PLTS)",
    fee: 300000,
    feeFormatted: "Rp 300.000",
    feeWords: "Tiga Ratus Ribu Rupiah",
    schedule: "Minggu, 1 November 2026",
    time: "18.00 – 21.30 WIB",
    location: "Live Online Training Lewat Google Meet",
    mode: "Online",
    organizer: "PT Mosha Sinalsal Solusi dan Masyarakat Sistem Energi Berkelanjutan Indonesia (www.masebi.org)",
    paymentDeadline: "31 Oktober 2026",
    description: "Desain, Simulasi dan Analisis Pembangkit Listrik Tenaga Surya (PLTS) Hybrid Menggunakan HOMER Pro. Outline Materi: 01 Pendahuluan (Kapabilitas HOMER Pro), 02 Desain (Beban Listrik, Komponen & Parameter Ekonomi), 03 Simulasi & Optimasi Teknis & Biaya, 04 Analisis Teknis, Finansial (CAPEX, OPEX, LCOE) dan Emisi CO2.",
    badge: "Terbaru & Online",
    image: "/images/flyer-pelatihan-homer-pro.png",
    meetUrl: "https://meet.google.com/hqo-ujsh-ogm",
    meetInfo: "Sunday, November 1 · 6:00 – 9:30pm (Time zone: Asia/Jakarta)",
    syllabus: [
      "Pendahuluan Kapabilitas Software HOMER Pro",
      "Desain Beban Listrik, Komponen & Parameter Ekonomi",
      "Simulasi & Optimasi Teknis dan Biaya",
      "Analisis Teknis, Finansial (CAPEX, OPEX, LCOE) dan Emisi CO2",
    ],
    benefits: [
      "Softcopy modul & materi pelatihan",
      "E-Sertifikat resmi PT Mosha & Masebi",
      "Akses rekaman video training",
      "File contoh project HOMER Pro",
      "Grup komunitas alumni PLTS",
    ],
    slugAliases: [
      "homer-pro",
      "homer",
      "plts-homer",
      "pendaftaran-homer-pro",
    ],
  },
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
    syllabus: [
      "Perkenalan Sistem PLTS",
      "Komponen Sistem PLTS (Modul PV, Inverter, Baterai)",
      "Desain Sistem PLTS",
      "Commissioning & Pengujian Sistem PLTS",
    ],
    benefits: [
      "Softcopy modul & materi training",
      "E-Sertifikat resmi PT Mosha",
      "Akses rekaman video training",
      "Grup diskusi & konsultasi",
    ],
    slugAliases: [
      "plts-commissioning",
      "plts",
      "commissioning-plts",
      "pendaftaran-plts-commissioning",
    ],
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
    slugAliases: [
      "oil-gas-power-plant-offline",
      "oil-gas-offline",
      "commissioning-offline",
      "pendaftaran-oil-gas-power-plant-offline",
    ],
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
    slugAliases: [
      "oil-gas-power-plant-online",
      "oil-gas-online",
      "commissioning-online",
      "pendaftaran-oil-gas-power-plant-online",
    ],
  },
  {
    id: "commissioning-oil-gas-pembangkit-online",
    name: "COMMISSIONING OIL & GAS & PEMBANGKIT (Online) - Rp 600.000",
    shortTitle: "Commissioning Oil & Gas & Pembangkit (Online)",
    category: "Commissioning & Engineering",
    fee: 600000,
    feeFormatted: "Rp 600.000",
    feeWords: "Enam Ratus Ribu Rupiah",
    schedule: "Jumat, 13 November 2026 (1 Hari)",
    time: "18.00 – 22.00 WIB",
    location: "Online Training Lewat Google Meet / Zoom",
    mode: "Online",
    organizer: "PT Mosha Sinalsal Solusi & Masebi",
    paymentDeadline: "12 November 2026",
    description: "Pelatihan online intensif Commissioning Oil & Gas & Pembangkit mencakup prinsip dasar, strategi, prosedur ITR, P&ID markup, mechanical completion, dan startup sistem Hydrocarbon & Non-hydrocarbon untuk fasilitas Oil & Gas dan Pembangkit Listrik.",
    badge: "Online Class",
    syllabus: [
      "Prinsip Dasar & Strategi Commissioning",
      "P&ID Markup & Mechanical Completion",
      "Prosedur ITR (Inspection & Test Record)",
      "Commissioning Sistem Hydrocarbon & Non-hydrocarbon",
      "Startup Fasilitas Oil & Gas",
      "Commissioning Sistem Pembangkit Listrik",
      "System Handover & Documentation",
    ],
    benefits: [
      "Softcopy modul & materi pelatihan",
      "E-Sertifikat resmi PT Mosha & Masebi",
      "Akses rekaman video training",
      "Grup diskusi & konsultasi alumni",
    ],
    slugAliases: [
      "commissioning-oil-gas-pembangkit-online",
      "commissioning-oil-gas-pembangkit",
      "oil-gas-pembangkit-online",
      "pendaftaran-commissioning-oil-gas-pembangkit-online",
    ],
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
    slugAliases: [
      "mechanical-piping-commissioning",
      "mechanical-piping",
      "piping",
      "pendaftaran-mechanical-piping-commissioning",
    ],
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
    slugAliases: [
      "electrical-instrument-commissioning",
      "electrical-instrument",
      "instrument",
      "pendaftaran-electrical-instrument-commissioning",
    ],
  },
];

/**
 * Robust slug/URL parser to resolve any QR code link or route parameter into a TrainingOption
 */
export function findTrainingBySlug(slugOrPath?: string | null): TrainingOption | undefined {
  if (!slugOrPath) return undefined;

  let cleaned = decodeURIComponent(slugOrPath).trim().toLowerCase();

  // Strip origin or URL if full URL is passed
  try {
    if (cleaned.startsWith("http://") || cleaned.startsWith("https://")) {
      const parsedUrl = new URL(cleaned);
      cleaned = parsedUrl.pathname + parsedUrl.search;
    }
  } catch {
    // ignore
  }

  // Check query parameter if present: ?training=xyz
  const queryMatch = cleaned.match(/[?&]training=([^&#]+)/i);
  if (queryMatch && queryMatch[1]) {
    const qVal = queryMatch[1].toLowerCase().trim();
    const byQuery = AVAILABLE_TRAININGS.find((t) => t.id === qVal || t.slugAliases?.includes(qVal));
    if (byQuery) return byQuery;
  }

  // Strip query strings and hash
  cleaned = cleaned.split("?")[0].split("#")[0];

  // Strip leading/trailing slashes
  cleaned = cleaned.replace(/^\/+|\/+$/g, "");

  // Strip prefixes like "pendaftaran-" or "pendaftaran/"
  cleaned = cleaned.replace(/^pendaftaran[-/]?/, "");

  // Normalize spaces/punctuation to hyphens
  cleaned = cleaned.replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");

  if (!cleaned) return undefined;

  // 1. Direct ID match
  const byId = AVAILABLE_TRAININGS.find((t) => t.id.toLowerCase() === cleaned);
  if (byId) return byId;

  // 2. Exact slug alias match
  const byAlias = AVAILABLE_TRAININGS.find((t) =>
    t.slugAliases?.some((alias) => {
      const normAlias = alias.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
      return normAlias === cleaned;
    })
  );
  if (byAlias) return byAlias;

  // 3. Substring / Keyword matching (e.g. contains "esg", "homer", "plts", "piping", "electrical", "oil")
  if (cleaned.includes("esg") || cleaned.includes("sustainability")) {
    return AVAILABLE_TRAININGS.find((t) => t.id === "corporate-esg-strategy");
  }
  if (cleaned.includes("homer")) {
    return AVAILABLE_TRAININGS.find((t) => t.id === "homer-pro");
  }
  if (cleaned.includes("plts")) {
    return AVAILABLE_TRAININGS.find((t) => t.id === "plts-commissioning");
  }
  if (cleaned.includes("piping") || cleaned.includes("mechanical")) {
    return AVAILABLE_TRAININGS.find((t) => t.id === "mechanical-piping-commissioning");
  }
  if (cleaned.includes("electrical") || cleaned.includes("instrument")) {
    return AVAILABLE_TRAININGS.find((t) => t.id === "electrical-instrument-commissioning");
  }
  if (cleaned.includes("oil") || cleaned.includes("gas")) {
    if (cleaned.includes("offline") || cleaned.includes("batam")) {
      return AVAILABLE_TRAININGS.find((t) => t.id === "oil-gas-power-plant-offline");
    }
    if (cleaned.includes("pembangkit") && cleaned.includes("600")) {
      return AVAILABLE_TRAININGS.find((t) => t.id === "commissioning-oil-gas-pembangkit-online");
    }
    // If slug explicitly contains "commissioning-oil-gas-pembangkit" pattern
    if (cleaned === "commissioning-oil-gas-pembangkit-online" || cleaned === "commissioning-oil-gas-pembangkit" || cleaned === "oil-gas-pembangkit-online") {
      return AVAILABLE_TRAININGS.find((t) => t.id === "commissioning-oil-gas-pembangkit-online");
    }
    return AVAILABLE_TRAININGS.find((t) => t.id === "oil-gas-power-plant-online");
  }

  // 4. Fuzzy fallback check on title
  return AVAILABLE_TRAININGS.find((t) => {
    const normTitle = t.shortTitle.toLowerCase().replace(/[^a-z0-9]/g, "-");
    return normTitle.includes(cleaned) || cleaned.includes(t.id);
  });
}
