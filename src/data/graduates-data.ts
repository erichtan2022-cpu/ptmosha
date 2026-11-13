export interface GraduateRecord {
  id: string;
  fullName: string;
  completionDate: string;
  trainingTopic: string;
  trainingCategory: string;
  certificateNumber: string;
  institution?: string;
  grade?: string;
  hours?: string;
  venue?: string;
  instructor?: string;
  certificateImageUrl?: string;
  topics?: string[];
  status: "verified" | "active";
  notes?: string;
  issuer: string;
  signatory1: {
    name: string;
    role: string;
  };
  signatory2: {
    name: string;
    role: string;
  };
}

export const COMMISSIONING_TOPICS = [
  "01 Introduction to Pre-Commissioning & Commissioning",
  "02 System, Sub-System Limit / P&ID Markup",
  "03 Plan and Strategy of Commissioning",
  "04 Mechanical Completion",
  "05 Inspection Test Record (ITR)",
  "06 Vendor Support in Precommissioning and Commissioning",
  "07 Precomm Comm Mechanical Piping and Electrical Instrument",
  "08 Commissioning System Prioritization",
  "09 Commissioning & Start-up of Hydrocarbon and Non-Hydrocarbon Systems",
  "10 System Handover",
];

export const PLTS_TOPICS = [
  "01 Perkenalan System PLTS",
  "02 Komponen System PLTS : Modul PV Inverter dan Baterai",
  "03 Desain System PLTS",
  "04 Commissioning PLTS",
];

export const CERTIFICATE_NUMBER_MAP: Record<string, string> = {
  "SAMUEL FEBRIANTO SIMBOLON": "MSS-PVOL06-102601",
  "RIZKY NAHDATUL": "MSS-PVOL06-102602",
  "SEKAR AYU ARUMNINGTYAS": "MSS-PVOL06-102603",
  "GINANJAR RAGANATA": "MSS-PVOL06-102604",
  "ZAKI IMAMI": "MSS-PVOL06-102605",
  "YUDHA SEPTIAWAN": "MSS-PVOL06-102606",
  "MUHAMMAD REZA FATHONI": "MSS-PVOL06-102607",
  "JETHRO BRYAN SITORUS": "MSS-PVOL06-102608",
  "KAISAR ALI KAMARLIS": "MSS-COF22-092601",
  "WAHYU HIDAYAT": "MSS-COF22-092602",
};

export const CERTIFICATE_IMAGE_MAP: Record<string, string> = {
  "MSS-COF22-092601": "/images/certificates/sertifikat-kaisar-ali-kamarlis.png",
  "MSS-COF22-092602": "/images/certificates/sertifikat-wahyu-hidayat.png",
  "MSS-PVOL06-102601": "/images/certificates/sertifikat-samuel-febrianto-simbolon.jpg",
  "MSS-PVOL06-102602": "/images/certificates/sertifikat-rizky-nahdatul.jpg",
  "MSS-PVOL06-102603": "/images/certificates/sertifikat-sekar-ayu-arumningtyas.jpg",
  "MSS-PVOL06-102604": "/images/certificates/sertifikat-ginanjar-raganata.jpg",
  "MSS-PVOL06-102605": "/images/certificates/sertifikat-zaki-imami.jpg",
  "MSS-PVOL06-102606": "/images/certificates/sertifikat-yudha-septiawan.jpg",
  "MSS-PVOL06-102607": "/images/certificates/sertifikat-muhammad-reza-fathoni.jpg",
  "MSS-PVOL06-102608": "/images/certificates/sertifikat-jethro-bryan-sitorus.jpg",
};

export function getCertificateNumber(fullName?: string, existingCertNumber?: string): string {
  if (existingCertNumber && existingCertNumber.trim() !== "") {
    return existingCertNumber.trim();
  }
  if (!fullName) return "";
  const norm = fullName.trim().toUpperCase();
  for (const [name, num] of Object.entries(CERTIFICATE_NUMBER_MAP)) {
    if (norm.includes(name) || name.includes(norm)) {
      return num;
    }
  }
  return "";
}

export function getCertificateImage(certNumber?: string, fullName?: string): string | undefined {
  if (certNumber && CERTIFICATE_IMAGE_MAP[certNumber]) {
    return CERTIFICATE_IMAGE_MAP[certNumber];
  }
  if (fullName) {
    const norm = fullName.trim().toUpperCase();
    for (const [name, num] of Object.entries(CERTIFICATE_NUMBER_MAP)) {
      if (norm.includes(name) || name.includes(norm)) {
        return CERTIFICATE_IMAGE_MAP[num];
      }
    }
  }
  return undefined;
}

export const OFFICIAL_CERTIFICATE_CONFIG = {
  companyName: "PT MOSHA SINALSAL SOLUSI",
  companySub: "Consultant, Training & Manpower Supply",
  companyTagline: "Main Business : Energy (Oil & Gas, Power Plant, Solar PV, Renewable Energy), Commissioning, Automation",
  address: "Komplek Pertokoan Bukit Kemuning Blok DD3 No 02, BATAM – KEPULAUAN RIAU",
  contact: "Phone : 082392907198, Email: admin@moshassolusi.com, staff@moshassolusi.com",
  website: "www.moshassolusi.com",
  partnerName: "Masyarakat Sistem Energi Berkelanjutan Indonesia (MASEBI)",
  partnerWebsite: "www.masebi.org",
  skKemenkumham: "AHU-0012345.AH.01.01.TAHUN 2021",
  logoUrl: "https://hercules-cdn.com/file_hefyWjrnJQZ3depHrmPx78nx",
  directorName: "Ir. Mosha Sinalsal, M.T., IPM.",
  directorRole: "Direktur Utama PT Mosha Sinalsal Solusi",
  managerInstructorName: "Emos Arapenta Ginting",
  managerInstructorRole: "Manager & Instructor",
  leadInstructorName: "Ir. Ardiansyah, S.T., M.Eng.",
  leadInstructorRole: "Lead Trainer & Commissioning Specialist",
};

export const INITIAL_GRADUATES_LIST: GraduateRecord[] = [
  // Pengenalan, Desain & Commissioning PLTS (17 Oktober 2026)
  {
    id: "grad-plts-001",
    fullName: "SAMUEL FEBRIANTO SIMBOLON",
    completionDate: "17 Oktober 2026",
    trainingTopic: "Pengenalan, Desain & Commissioning PLTS",
    trainingCategory: "Renewable Energy (PLTS)",
    certificateNumber: "MSS-PVOL06-102601",
    institution: "Peserta Profesional",
    hours: "32 Jam Pelatihan",
    venue: "ONLINE VIA ZOOM",
    instructor: "Emos Arapenta Ginting",
    certificateImageUrl: "/images/certificates/sertifikat-samuel-febrianto-simbolon.jpg",
    topics: PLTS_TOPICS,
    status: "verified",
    notes: "Menyelesaikan program pelatihan teknis Pengenalan, Desain & Commissioning PLTS (Sistem Pembangkit Listrik Tenaga Surya).",
    issuer: "PT Mosha Sinalsal Solusi & MASEBI",
    signatory1: {
      name: "Emos Arapenta Ginting",
      role: "Manager & Instructor PT Mosha Sinalsal Solusi",
    },
    signatory2: {
      name: "Masyarakat Sistem Energi Berkelanjutan Indonesia",
      role: "Partner Asosiasi (MASEBI)",
    },
  },
  {
    id: "grad-plts-002",
    fullName: "RIZKY NAHDATUL",
    completionDate: "17 Oktober 2026",
    trainingTopic: "Pengenalan, Desain & Commissioning PLTS",
    trainingCategory: "Renewable Energy (PLTS)",
    certificateNumber: "MSS-PVOL06-102602",
    institution: "Peserta Profesional",
    hours: "32 Jam Pelatihan",
    venue: "ONLINE VIA ZOOM",
    instructor: "Emos Arapenta Ginting",
    certificateImageUrl: "/images/certificates/sertifikat-rizky-nahdatul.jpg",
    topics: PLTS_TOPICS,
    status: "verified",
    notes: "Menyelesaikan program pelatihan teknis Pengenalan, Desain & Commissioning PLTS (Sistem Pembangkit Listrik Tenaga Surya).",
    issuer: "PT Mosha Sinalsal Solusi & MASEBI",
    signatory1: {
      name: "Emos Arapenta Ginting",
      role: "Manager & Instructor PT Mosha Sinalsal Solusi",
    },
    signatory2: {
      name: "Masyarakat Sistem Energi Berkelanjutan Indonesia",
      role: "Partner Asosiasi (MASEBI)",
    },
  },
  {
    id: "grad-plts-003",
    fullName: "SEKAR AYU ARUMNINGTYAS",
    completionDate: "17 Oktober 2026",
    trainingTopic: "Pengenalan, Desain & Commissioning PLTS",
    trainingCategory: "Renewable Energy (PLTS)",
    certificateNumber: "MSS-PVOL06-102603",
    institution: "Peserta Profesional",
    hours: "32 Jam Pelatihan",
    venue: "ONLINE VIA ZOOM",
    instructor: "Emos Arapenta Ginting",
    certificateImageUrl: "/images/certificates/sertifikat-sekar-ayu-arumningtyas.jpg",
    topics: PLTS_TOPICS,
    status: "verified",
    notes: "Menyelesaikan program pelatihan teknis Pengenalan, Desain & Commissioning PLTS (Sistem Pembangkit Listrik Tenaga Surya).",
    issuer: "PT Mosha Sinalsal Solusi & MASEBI",
    signatory1: {
      name: "Emos Arapenta Ginting",
      role: "Manager & Instructor PT Mosha Sinalsal Solusi",
    },
    signatory2: {
      name: "Masyarakat Sistem Energi Berkelanjutan Indonesia",
      role: "Partner Asosiasi (MASEBI)",
    },
  },
  {
    id: "grad-plts-004",
    fullName: "GINANJAR RAGANATA",
    completionDate: "17 Oktober 2026",
    trainingTopic: "Pengenalan, Desain & Commissioning PLTS",
    trainingCategory: "Renewable Energy (PLTS)",
    certificateNumber: "MSS-PVOL06-102604",
    institution: "Peserta Profesional",
    hours: "32 Jam Pelatihan",
    venue: "ONLINE VIA ZOOM",
    instructor: "Emos Arapenta Ginting",
    certificateImageUrl: "/images/certificates/sertifikat-ginanjar-raganata.jpg",
    topics: PLTS_TOPICS,
    status: "verified",
    notes: "Menyelesaikan program pelatihan teknis Pengenalan, Desain & Commissioning PLTS (Sistem Pembangkit Listrik Tenaga Surya).",
    issuer: "PT Mosha Sinalsal Solusi & MASEBI",
    signatory1: {
      name: "Emos Arapenta Ginting",
      role: "Manager & Instructor PT Mosha Sinalsal Solusi",
    },
    signatory2: {
      name: "Masyarakat Sistem Energi Berkelanjutan Indonesia",
      role: "Partner Asosiasi (MASEBI)",
    },
  },
  {
    id: "grad-plts-005",
    fullName: "ZAKI IMAMI",
    completionDate: "17 Oktober 2026",
    trainingTopic: "Pengenalan, Desain & Commissioning PLTS",
    trainingCategory: "Renewable Energy (PLTS)",
    certificateNumber: "MSS-PVOL06-102605",
    institution: "Peserta Profesional",
    hours: "32 Jam Pelatihan",
    venue: "ONLINE VIA ZOOM",
    instructor: "Emos Arapenta Ginting",
    certificateImageUrl: "/images/certificates/sertifikat-zaki-imami.jpg",
    topics: PLTS_TOPICS,
    status: "verified",
    notes: "Menyelesaikan program pelatihan teknis Pengenalan, Desain & Commissioning PLTS (Sistem Pembangkit Listrik Tenaga Surya).",
    issuer: "PT Mosha Sinalsal Solusi & MASEBI",
    signatory1: {
      name: "Emos Arapenta Ginting",
      role: "Manager & Instructor PT Mosha Sinalsal Solusi",
    },
    signatory2: {
      name: "Masyarakat Sistem Energi Berkelanjutan Indonesia",
      role: "Partner Asosiasi (MASEBI)",
    },
  },
  {
    id: "grad-plts-006",
    fullName: "YUDHA SEPTIAWAN",
    completionDate: "17 Oktober 2026",
    trainingTopic: "Pengenalan, Desain & Commissioning PLTS",
    trainingCategory: "Renewable Energy (PLTS)",
    certificateNumber: "MSS-PVOL06-102606",
    institution: "Peserta Profesional",
    hours: "32 Jam Pelatihan",
    venue: "ONLINE VIA ZOOM",
    instructor: "Emos Arapenta Ginting",
    certificateImageUrl: "/images/certificates/sertifikat-yudha-septiawan.jpg",
    topics: PLTS_TOPICS,
    status: "verified",
    notes: "Menyelesaikan program pelatihan teknis Pengenalan, Desain & Commissioning PLTS (Sistem Pembangkit Listrik Tenaga Surya).",
    issuer: "PT Mosha Sinalsal Solusi & MASEBI",
    signatory1: {
      name: "Emos Arapenta Ginting",
      role: "Manager & Instructor PT Mosha Sinalsal Solusi",
    },
    signatory2: {
      name: "Masyarakat Sistem Energi Berkelanjutan Indonesia",
      role: "Partner Asosiasi (MASEBI)",
    },
  },
  {
    id: "grad-plts-007",
    fullName: "MUHAMMAD REZA FATHONI",
    completionDate: "17 Oktober 2026",
    trainingTopic: "Pengenalan, Desain & Commissioning PLTS",
    trainingCategory: "Renewable Energy (PLTS)",
    certificateNumber: "MSS-PVOL06-102607",
    institution: "Peserta Profesional",
    hours: "32 Jam Pelatihan",
    venue: "ONLINE VIA ZOOM",
    instructor: "Emos Arapenta Ginting",
    certificateImageUrl: "/images/certificates/sertifikat-muhammad-reza-fathoni.jpg",
    topics: PLTS_TOPICS,
    status: "verified",
    notes: "Menyelesaikan program pelatihan teknis Pengenalan, Desain & Commissioning PLTS (Sistem Pembangkit Listrik Tenaga Surya).",
    issuer: "PT Mosha Sinalsal Solusi & MASEBI",
    signatory1: {
      name: "Emos Arapenta Ginting",
      role: "Manager & Instructor PT Mosha Sinalsal Solusi",
    },
    signatory2: {
      name: "Masyarakat Sistem Energi Berkelanjutan Indonesia",
      role: "Partner Asosiasi (MASEBI)",
    },
  },
  {
    id: "grad-plts-008",
    fullName: "JETHRO BRYAN SITORUS",
    completionDate: "17 Oktober 2026",
    trainingTopic: "Pengenalan, Desain & Commissioning PLTS",
    trainingCategory: "Renewable Energy (PLTS)",
    certificateNumber: "MSS-PVOL06-102608",
    institution: "Peserta Profesional",
    hours: "32 Jam Pelatihan",
    venue: "ONLINE VIA ZOOM",
    instructor: "Emos Arapenta Ginting",
    certificateImageUrl: "/images/certificates/sertifikat-jethro-bryan-sitorus.jpg",
    topics: PLTS_TOPICS,
    status: "verified",
    notes: "Menyelesaikan program pelatihan teknis Pengenalan, Desain & Commissioning PLTS (Sistem Pembangkit Listrik Tenaga Surya).",
    issuer: "PT Mosha Sinalsal Solusi & MASEBI",
    signatory1: {
      name: "Emos Arapenta Ginting",
      role: "Manager & Instructor PT Mosha Sinalsal Solusi",
    },
    signatory2: {
      name: "Masyarakat Sistem Energi Berkelanjutan Indonesia",
      role: "Partner Asosiasi (MASEBI)",
    },
  },

  // Commissioning in Oil & Gas and Power Plant Project (26 – 27 September 2026)
  {
    id: "grad-ogp-001",
    fullName: "KAISAR ALI KAMARLIS",
    completionDate: "26 – 27 September 2026",
    trainingTopic: "Commissioning in Oil & Gas and Power Plant Project",
    trainingCategory: "Commissioning & Engineering",
    certificateNumber: "MSS-COF22-092601",
    institution: "Peserta Profesional",
    hours: "40 Jam Pelatihan",
    venue: "BATAM",
    instructor: "Emos Arapenta Ginting",
    certificateImageUrl: "/images/certificates/sertifikat-kaisar-ali-kamarlis.png",
    topics: COMMISSIONING_TOPICS,
    status: "verified",
    notes: "Menyelesaikan program pelatihan teknis Commissioning in Oil & Gas and Power Plant Project di Batam.",
    issuer: "PT Mosha Sinalsal Solusi & MASEBI",
    signatory1: {
      name: "Emos Arapenta Ginting",
      role: "Manager & Instructor PT Mosha Sinalsal Solusi",
    },
    signatory2: {
      name: "Masyarakat Sistem Energi Berkelanjutan Indonesia",
      role: "Partner Asosiasi (MASEBI)",
    },
  },
  {
    id: "grad-ogp-002",
    fullName: "WAHYU HIDAYAT",
    completionDate: "26 – 27 September 2026",
    trainingTopic: "Commissioning in Oil & Gas and Power Plant Project",
    trainingCategory: "Commissioning & Engineering",
    certificateNumber: "MSS-COF22-092602",
    institution: "Peserta Profesional",
    hours: "40 Jam Pelatihan",
    venue: "BATAM",
    instructor: "Emos Arapenta Ginting",
    certificateImageUrl: "/images/certificates/sertifikat-wahyu-hidayat.png",
    topics: COMMISSIONING_TOPICS,
    status: "verified",
    notes: "Menyelesaikan program pelatihan teknis Commissioning in Oil & Gas and Power Plant Project di Batam.",
    issuer: "PT Mosha Sinalsal Solusi & MASEBI",
    signatory1: {
      name: "Emos Arapenta Ginting",
      role: "Manager & Instructor PT Mosha Sinalsal Solusi",
    },
    signatory2: {
      name: "Masyarakat Sistem Energi Berkelanjutan Indonesia",
      role: "Partner Asosiasi (MASEBI)",
    },
  },
];
