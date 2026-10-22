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
    certificateNumber: "",
    institution: "Peserta Profesional",
    hours: "32 Jam Pelatihan",
    status: "verified",
    notes: "Menyelesaikan program pelatihan teknis Pengenalan, Desain & Commissioning PLTS.",
    issuer: "PT Mosha Sinalsal Solusi & MASEBI",
    signatory1: {
      name: "Ir. Mosha Sinalsal, M.T., IPM.",
      role: "Direktur Utama PT Mosha Sinalsal Solusi",
    },
    signatory2: {
      name: "Ir. Ardiansyah, S.T., M.Eng.",
      role: "Lead Trainer & Commissioning Specialist",
    },
  },
  {
    id: "grad-plts-002",
    fullName: "RIZKY NAHDATUL",
    completionDate: "17 Oktober 2026",
    trainingTopic: "Pengenalan, Desain & Commissioning PLTS",
    trainingCategory: "Renewable Energy (PLTS)",
    certificateNumber: "",
    institution: "Peserta Profesional",
    hours: "32 Jam Pelatihan",
    status: "verified",
    notes: "Menyelesaikan program pelatihan teknis Pengenalan, Desain & Commissioning PLTS.",
    issuer: "PT Mosha Sinalsal Solusi & MASEBI",
    signatory1: {
      name: "Ir. Mosha Sinalsal, M.T., IPM.",
      role: "Direktur Utama PT Mosha Sinalsal Solusi",
    },
    signatory2: {
      name: "Ir. Ardiansyah, S.T., M.Eng.",
      role: "Lead Trainer & Commissioning Specialist",
    },
  },
  {
    id: "grad-plts-003",
    fullName: "SEKAR AYU ARUMNINGTYAS",
    completionDate: "17 Oktober 2026",
    trainingTopic: "Pengenalan, Desain & Commissioning PLTS",
    trainingCategory: "Renewable Energy (PLTS)",
    certificateNumber: "",
    institution: "Peserta Profesional",
    hours: "32 Jam Pelatihan",
    status: "verified",
    notes: "Menyelesaikan program pelatihan teknis Pengenalan, Desain & Commissioning PLTS.",
    issuer: "PT Mosha Sinalsal Solusi & MASEBI",
    signatory1: {
      name: "Ir. Mosha Sinalsal, M.T., IPM.",
      role: "Direktur Utama PT Mosha Sinalsal Solusi",
    },
    signatory2: {
      name: "Ir. Ardiansyah, S.T., M.Eng.",
      role: "Lead Trainer & Commissioning Specialist",
    },
  },
  {
    id: "grad-plts-004",
    fullName: "GINANJAR RAGANATA",
    completionDate: "17 Oktober 2026",
    trainingTopic: "Pengenalan, Desain & Commissioning PLTS",
    trainingCategory: "Renewable Energy (PLTS)",
    certificateNumber: "",
    institution: "Peserta Profesional",
    hours: "32 Jam Pelatihan",
    status: "verified",
    notes: "Menyelesaikan program pelatihan teknis Pengenalan, Desain & Commissioning PLTS.",
    issuer: "PT Mosha Sinalsal Solusi & MASEBI",
    signatory1: {
      name: "Ir. Mosha Sinalsal, M.T., IPM.",
      role: "Direktur Utama PT Mosha Sinalsal Solusi",
    },
    signatory2: {
      name: "Ir. Ardiansyah, S.T., M.Eng.",
      role: "Lead Trainer & Commissioning Specialist",
    },
  },
  {
    id: "grad-plts-005",
    fullName: "ZAKI IMAMI",
    completionDate: "17 Oktober 2026",
    trainingTopic: "Pengenalan, Desain & Commissioning PLTS",
    trainingCategory: "Renewable Energy (PLTS)",
    certificateNumber: "",
    institution: "Peserta Profesional",
    hours: "32 Jam Pelatihan",
    status: "verified",
    notes: "Menyelesaikan program pelatihan teknis Pengenalan, Desain & Commissioning PLTS.",
    issuer: "PT Mosha Sinalsal Solusi & MASEBI",
    signatory1: {
      name: "Ir. Mosha Sinalsal, M.T., IPM.",
      role: "Direktur Utama PT Mosha Sinalsal Solusi",
    },
    signatory2: {
      name: "Ir. Ardiansyah, S.T., M.Eng.",
      role: "Lead Trainer & Commissioning Specialist",
    },
  },
  {
    id: "grad-plts-006",
    fullName: "YUDHA SEPTIAWAN",
    completionDate: "17 Oktober 2026",
    trainingTopic: "Pengenalan, Desain & Commissioning PLTS",
    trainingCategory: "Renewable Energy (PLTS)",
    certificateNumber: "",
    institution: "Peserta Profesional",
    hours: "32 Jam Pelatihan",
    status: "verified",
    notes: "Menyelesaikan program pelatihan teknis Pengenalan, Desain & Commissioning PLTS.",
    issuer: "PT Mosha Sinalsal Solusi & MASEBI",
    signatory1: {
      name: "Ir. Mosha Sinalsal, M.T., IPM.",
      role: "Direktur Utama PT Mosha Sinalsal Solusi",
    },
    signatory2: {
      name: "Ir. Ardiansyah, S.T., M.Eng.",
      role: "Lead Trainer & Commissioning Specialist",
    },
  },
  {
    id: "grad-plts-007",
    fullName: "MUHAMMAD REZA FATHONI",
    completionDate: "17 Oktober 2026",
    trainingTopic: "Pengenalan, Desain & Commissioning PLTS",
    trainingCategory: "Renewable Energy (PLTS)",
    certificateNumber: "",
    institution: "Peserta Profesional",
    hours: "32 Jam Pelatihan",
    status: "verified",
    notes: "Menyelesaikan program pelatihan teknis Pengenalan, Desain & Commissioning PLTS.",
    issuer: "PT Mosha Sinalsal Solusi & MASEBI",
    signatory1: {
      name: "Ir. Mosha Sinalsal, M.T., IPM.",
      role: "Direktur Utama PT Mosha Sinalsal Solusi",
    },
    signatory2: {
      name: "Ir. Ardiansyah, S.T., M.Eng.",
      role: "Lead Trainer & Commissioning Specialist",
    },
  },
  {
    id: "grad-plts-008",
    fullName: "JETHRO BRYAN SITORUS",
    completionDate: "17 Oktober 2026",
    trainingTopic: "Pengenalan, Desain & Commissioning PLTS",
    trainingCategory: "Renewable Energy (PLTS)",
    certificateNumber: "",
    institution: "Peserta Profesional",
    hours: "32 Jam Pelatihan",
    status: "verified",
    notes: "Menyelesaikan program pelatihan teknis Pengenalan, Desain & Commissioning PLTS.",
    issuer: "PT Mosha Sinalsal Solusi & MASEBI",
    signatory1: {
      name: "Ir. Mosha Sinalsal, M.T., IPM.",
      role: "Direktur Utama PT Mosha Sinalsal Solusi",
    },
    signatory2: {
      name: "Ir. Ardiansyah, S.T., M.Eng.",
      role: "Lead Trainer & Commissioning Specialist",
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
