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

export const OFFICIAL_CERTIFICATE_CONFIG = {
  companyName: "PT MOSHA SINALSAL SOLUSI",
  companySub: "Engineering, Commissioning, Training & Manpower Solutions",
  skKemenkumham: "AHU-0012345.AH.01.01.TAHUN 2021",
  partnerName: "Masyarakat Sistem Energi Berkelanjutan Indonesia (MASEBI)",
  logoUrl: "https://hercules-cdn.com/file_hefyWjrnJQZ3depHrmPx78nx",
  directorName: "Ir. Mosha Sinalsal, M.T., IPM.",
  directorRole: "Direktur Utama PT Mosha Sinalsal Solusi",
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

  // Commissioning Fasilitas Oil & Gas & Pembangkit Listrik (26 – 27 September 2026)
  {
    id: "grad-ogp-001",
    fullName: "KAISAR ALI KAMARLIS",
    completionDate: "26 – 27 September 2026",
    trainingTopic: "Commissioning Fasilitas Oil & Gas & Pembangkit Listrik",
    trainingCategory: "Commissioning & Engineering",
    certificateNumber: "",
    institution: "Peserta Profesional",
    hours: "40 Jam Pelatihan",
    status: "verified",
    notes: "Menyelesaikan program pelatihan teknis Commissioning Fasilitas Oil & Gas & Pembangkit Listrik.",
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
    id: "grad-ogp-002",
    fullName: "WAHYU HIDAYAT",
    completionDate: "26 – 27 September 2026",
    trainingTopic: "Commissioning Fasilitas Oil & Gas & Pembangkit Listrik",
    trainingCategory: "Commissioning & Engineering",
    certificateNumber: "",
    institution: "Peserta Profesional",
    hours: "40 Jam Pelatihan",
    status: "verified",
    notes: "Menyelesaikan program pelatihan teknis Commissioning Fasilitas Oil & Gas & Pembangkit Listrik.",
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
];
