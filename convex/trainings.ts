import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export interface TrainingItem {
  no: number;
  name: string;
  slug: string;
  description: string;
  category: string;
  targetAudience: string[];
  level: string;
  duration: string;
  mode: string;
  certification: string;
  requirements: string[];
  skills: string[];
  tags: string[];
  careerPaths: string[];
  benefits: string[];
  notes?: string;
  url?: string;
  status: string;
}

export const SEED_TRAININGS_DATA: TrainingItem[] = [
  {
    no: 0,
    name: "Pengenalan, Desain & Commissioning PLTS (Sistem Pembangkit Listrik Tenaga Surya)",
    slug: "pengenalan-desain-commissioning-plts",
    description: "Pelatihan komprehensif sistem PLTS bersama PT Mosha & Masebi. Membahas panel surya modul PV, inverter hibrida cerdas, sistem baterai terintegrasi, distribusi DC, smart metering, desain sistem, dan prosedur commissioning PLTS.",
    category: "Renewable Energy (PLTS)",
    targetAudience: ["Engineers", "Teknisi Listrik", "Solar Installer", "Mahasiswa Teknik", "Praktisi Energi Terbarukan", "Pelaku Usaha Energi"],
    level: "Pemula - Menengah",
    duration: "Sabtu, 17 Oktober 2026 (18.00 - 21.30 WIB)",
    mode: "Online (Google Meet / Zoom)",
    certification: "Sertifikat Dari Perusahaan (PT Mosha & Masebi)",
    requirements: ["Koneksi Internet & Laptop/HP untuk Google Meet / Zoom", "Minat di bidang energi terbarukan / PLTS"],
    skills: ["Panel Surya PV", "Inverter Hibrida Cerdas", "Baterai Terintegrasi", "Distribusi Arus DC", "Desain PLTS", "Commissioning PLTS"],
    tags: ["plts", "solar", "surya", "energi terbarukan", "commissioning plts", "inverter", "baterai", "masebi"],
    careerPaths: ["Solar PV Engineer", "PLTS Commissioning Specialist", "Renewable Energy Consultant", "Solar Project Developer"],
    benefits: ["Softcopy Modul Training", "Sertifikat Dari Perusahaan", "Rekaman Video Training", "Grup PLTS & Komunitas", "Peluang Kerjasama Bisnis"],
    notes: "Online via Google Meet/Zoom, 17 Oktober 2026, 18.00 - 21.30 WIB",
    url: "https://bit.ly/3T6EePy",
    status: "active"
  },
  {
    no: 1,
    name: "Commissioning Oil & Gas dan Sistem Pembangkit Listrik (Online)",
    slug: "commissioning-oil-gas-power-plant-online",
    description: "Pelatihan komprehensif mengenai prinsip dasar, strategi, prosedur ITR, P&ID markup, mechanical completion, dan startup sistem Hydrocarbon & Non-hydrocarbon pada fasilitas Oil & Gas dan Power Plant.",
    category: "Commissioning & Engineering",
    targetAudience: ["Engineers", "Teknisi Listrik", "Teknisi Mekanikal", "Mahasiswa Teknik", "Fresh Graduate Teknik"],
    level: "Pemula - Menengah",
    duration: "2 x 2,5 jam",
    mode: "Online",
    certification: "Sertifikat Lembaga Training (PT Mosha & Masebi)",
    requirements: ["Pemahaman dasar gambar teknik / P&ID", "Latar belakang Teknik / Industri"],
    skills: ["Commissioning Strategy", "P&ID Markup", "Inspection Test Record (ITR)", "Hydrocarbon Startup"],
    tags: ["oil and gas", "power plant", "commissioning", "hydrocarbon", "piping", "electrical", "instrument"],
    careerPaths: ["Commissioning Engineer", "Field Engineer", "Site Supervisor", "QA/QC Inspector"],
    benefits: ["Softcopy Modul Training", "Sertifikat Resmi", "Contoh Prosedur Real Project & Drawing", "Kisi-Kisi Interview", "Rekaman Video Training"],
    notes: "-",
    url: "https://bit.ly/4cz9xct",
    status: "active"
  },
  {
    no: 2,
    name: "Commissioning Oil & Gas dan Sistem Pembangkit Listrik (Offline Tatap Muka Batam)",
    slug: "commissioning-oil-gas-power-plant-offline",
    description: "Program intensif tatap muka 2 hari (10 jam) bersama praktisi industri. Membahas 10 modul lengkap commissioning fasilitas Oil & Gas dan Pembangkit Listrik.",
    category: "Commissioning & Engineering",
    targetAudience: ["Commissioning Technicians", "Field Engineers", "Project Engineers", "Praktisi Industri"],
    level: "Pemula - Menengah",
    duration: "2 x 5 jam (2 Hari)",
    mode: "Offline (Tatap muka)",
    certification: "Sertifikat Lembaga Training (PT Mosha & Masebi)",
    requirements: ["Latar belakang Teknik / Industri", "Hadir langsung di Batam"],
    skills: ["Commissioning Execution", "Sub-system Limit Markup", "ITR & Mechanical Completion", "System Handover"],
    tags: ["oil and gas", "batam", "tatap muka", "offline", "power plant", "commissioning", "handover"],
    careerPaths: ["Senior Commissioning Engineer", "Lead Commissioning Supervisor", "Site Manager"],
    benefits: ["Modul Lengkap", "Sertifikat", "File Real Project", "Bimbingan Direct Instruktur", "Coffee Break & Lunch"],
    notes: "Tatap Muka di Batam (4-12 peserta)",
    url: "https://bit.ly/4cz9xct",
    status: "active"
  },
  {
    no: 3,
    name: "Commissioning Mechanical & Piping",
    slug: "commissioning-mechanical-piping",
    description: "Fokus pada pengujian kesiapan mekanikal, sistem perpipaan, hydrotesting, flushing, dan alignment peralatan berputar (rotating equipment).",
    category: "Commissioning & Engineering",
    targetAudience: ["Mechanical Engineers", "Piping Technicians", "QA/QC Piping", "Mahasiswa Mesin/Manufaktur"],
    level: "Pemula - Menengah",
    duration: "2 x 2,5 jam",
    mode: "Online",
    certification: "Sertifikat Lembaga Training",
    requirements: ["Dasar-dasar Teknik Mesin / Piping"],
    skills: ["Mechanical Completion", "Hydrotest & Flushing", "Piping Inspection", "Punch List Management"],
    tags: ["mechanical", "piping", "hydrotest", "flushing", "commissioning", "mesin"],
    careerPaths: ["Mechanical Commissioning Specialist", "Piping QC Inspector"],
    benefits: ["Softcopy Modul", "Sertifikat", "Rekaman Video"],
    notes: "-",
    url: "https://bit.ly/4cz9xct",
    status: "active"
  },
  {
    no: 4,
    name: "Commissioning Electrical & Instrument",
    slug: "commissioning-electrical-instrument",
    description: "Pengujian kesiapan kelistrikan tegangan rendah/menengah, kalibrasi instrumen, loop check, dan pengujian interlock panel.",
    category: "Commissioning & Engineering",
    targetAudience: ["Electrical Engineers", "Instrument Technicians", "DCS/PLC Technicians"],
    level: "Pemula - Menengah",
    duration: "2 x 2,5 jam",
    mode: "Online",
    certification: "Sertifikat Lembaga Training",
    requirements: ["Dasar-dasar Elektro / Instrumentasi"],
    skills: ["Loop Testing", "Instrument Calibration", "Electrical Protection Check", "Control Logic Verification"],
    tags: ["electrical", "instrument", "kalibrasi", "loop test", "listrik", "otomasi"],
    careerPaths: ["E&I Commissioning Engineer", "Instrument Technician"],
    benefits: ["Modul", "Sertifikat", "Rekaman Video"],
    notes: "-",
    url: "https://bit.ly/4cz9xct",
    status: "active"
  },
  {
    no: 5,
    name: "Tube Fitting & Tube Bending",
    slug: "tube-fitting-tube-bending",
    description: "Pelatihan teknik pembentukan dan penyambungan tube instrumen presisi tinggi untuk aplikasi instrumen industri minyak dan gas.",
    category: "Commissioning & Engineering",
    targetAudience: ["Teknisi Instrumentasi", "Fitter Instrument", "Operator Pabrik"],
    level: "Pemula",
    duration: "2 x 5 jam",
    mode: "Online & Offline",
    certification: "Sertifikat Lembaga Training",
    requirements: ["Minimal SMK/Diploma Teknik"],
    skills: ["Tube Bending Calculation", "Swagelok/Parker Fitting Assembly", "Leak Testing"],
    tags: ["tube fitting", "tube bending", "fitter", "instrumentation", "swagelok"],
    careerPaths: ["Instrument Fitter", "Maintenance Technician"],
    benefits: ["Teori & Praktik", "Sertifikat"],
    notes: "-",
    status: "active"
  },
  {
    no: 6,
    name: "PLTS - Pembangkit Listrik Tenaga Surya (Teori)",
    slug: "plts-pembangkit-listrik-tenaga-surya-teori",
    description: "Pemahaman dasar komponen PLTS, prinsip photovoltaic, perhitungan kapasitas solar panel, inverter, dan baterai.",
    category: "Renewable Energy (PLTS)",
    targetAudience: ["Mahasiswa Teknik", "Fresh Graduate", "Pengembang Energi Terbarukan", "Umum"],
    level: "Pemula / Beginner",
    duration: "2 x 2,5 jam",
    mode: "Online",
    certification: "Sertifikat Lembaga Training",
    requirements: ["Tertarik bidang energi terbarukan"],
    skills: ["Solar PV Fundamentals", "Inverter & Battery Sizing", "System Design Theory"],
    tags: ["plts", "solar energy", "solar panel", "energi terbarukan", "pv", "listrik surya"],
    careerPaths: ["Junior Solar Engineer", "Renewable Energy Consultant"],
    benefits: ["Modul Digital", "Sertifikat", "Rekaman"],
    notes: "-",
    status: "active"
  },
  {
    no: 7,
    name: "PLTS - Pembangkit Listrik Tenaga Surya (Teori & Praktik)",
    slug: "plts-teori-dan-praktik",
    description: "Pembelajaran komprehensif teori ditambah studi kasus perancangan dan perakitan instalasi fisik PLTS On-Grid / Off-Grid.",
    category: "Renewable Energy (PLTS)",
    targetAudience: ["Teknisi Listrik", "Solar Installer", "Kontraktor EPC Solar"],
    level: "Pemula - Menengah",
    duration: "3 x 2,5 jam",
    mode: "Online & Offline",
    certification: "Sertifikat Lembaga Training",
    requirements: ["Dasar Kelistrikan"],
    skills: ["PV System Installation", "Wiring & Protection", "Testing & Troubleshooting"],
    tags: ["plts", "praktik", "solar installation", "on grid", "off grid"],
    careerPaths: ["Solar PV Installer", "Site Solar Engineer"],
    benefits: ["Praktik / Simulator", "Sertifikat"],
    notes: "-",
    status: "active"
  },
  {
    no: 8,
    name: "PLTS - Training dan Sertifikasi KEBTKE",
    slug: "plts-sertifikasi-kebtke",
    description: "Program persiapan dan asesmen sertifikasi kompetensi resmi Kementerian ESDM / KEBTKE untuk tenaga teknik bidang PLTS.",
    category: "Certifications & Competency",
    targetAudience: ["Tenaga Ahli PLTS", "Teknisi Listrik Industri", "Engineer Energi Terbarukan"],
    level: "Menengah - Lanjutan",
    duration: "3 x 5 jam",
    mode: "Online & Offline",
    certification: "Sertifikasi Resmi KEBTKE ESDM",
    requirements: ["Pengalaman kerja di bidang listrik / PLTS atau Lulusan Teknik"],
    skills: ["Standar K3 PLTS KEBTKE", "Inspeksi & Pengujian Sistem PV", "Penilaian Kompetensi ESDM"],
    tags: ["kebtke", "esdm", "sertifikasi resmi", "plts", "kompetensi esdm"],
    careerPaths: ["Certified Solar Engineer KEBTKE", "Penanggung Jawab Teknik PLTS"],
    benefits: ["Sertifikat Garuda ESDM KEBTKE", "Modul Resmi", "Pendampingan Asesmen"],
    notes: "Sertifikasi KEBTKE ESDM",
    status: "active"
  },
  {
    no: 9,
    name: "PV Syst / Helioscope - Design PLTS",
    slug: "pv-syst-helioscope-design-plts",
    description: "Pelatihan simulasi 3D dan kalkulasi radiasi matahari serta estimasi produksi energi tahunan menggunakan software PVsyst dan Helioscope.",
    category: "Software & Engineering Design",
    targetAudience: ["Design Engineer", "Solar Proposal Specialist", "Mahasiswa Teknik"],
    level: "Pemula - Menengah",
    duration: "2 x 2,5 jam",
    mode: "Online",
    certification: "Sertifikat Lembaga Training",
    requirements: ["Laptop dengan software PVsyst/Helioscope"],
    skills: ["PVsyst Simulation", "Shading Analysis", "P50/P90 Yield Calculation"],
    tags: ["pvsyst", "helioscope", "design plts", "simulasi solar", "software design"],
    careerPaths: ["Solar Design Engineer", "Pre-sales Solar Specialist"],
    benefits: ["Tutorial Software Step-by-Step", "Sample Project File"],
    notes: "-",
    status: "active"
  },
  {
    no: 10,
    name: "HOMER PRO - Design PLTS Hybrid",
    slug: "homer-pro-design-plts-hybrid",
    description: "Studi kelayakan teknis dan ekonomis sistem mikrogrid hybrid (PLTS + Genset + Baterai) menggunakan HOMER Pro.",
    category: "Software & Engineering Design",
    targetAudience: ["Microgrid Engineer", "Energy Analyst", "Konsultan Energi"],
    level: "Menengah",
    duration: "2 x 2,5 jam",
    mode: "Online",
    certification: "Sertifikat Lembaga Training",
    requirements: ["Konsep Dasar Kelistrikan & Ekonomi Teknik"],
    skills: ["Hybrid Microgrid Modeling", "HOMER Pro Optimization", "LCOE Calculation"],
    tags: ["homer pro", "plts hybrid", "microgrid", "genset solar", "ekonomi energi"],
    careerPaths: ["Microgrid Consultant", "Energy Analyst"],
    benefits: ["Modul HOMER Pro", "Sertifikat"],
    notes: "-",
    status: "active"
  },
  {
    no: 12,
    name: "Audit Energy & Energy Management",
    slug: "audit-energy-energy-management",
    description: "Identifikasi peluang penghematan energi (PHE) pada sistem penerangan, HVAC, boiler, dan motor listrik industri berdasarkan ISO 50001.",
    category: "Sustainability & Environment",
    targetAudience: ["Facility Manager", "Energy Auditor", "Maintenance Manager", "Engineer Industri"],
    level: "Menengah",
    duration: "2 x 2,5 jam",
    mode: "Online & Offline",
    certification: "Sertifikat Lembaga Training",
    requirements: ["Latar belakang Teknik / Manajemen Fasilitas"],
    skills: ["Energy Balance Calculation", "ISO 50001 Framework", "EnPI & Baseline Setting"],
    tags: ["audit energi", "iso 50001", "energy management", "efisiensi energi", "hemat listrik"],
    careerPaths: ["Energy Manager", "Industrial Energy Auditor"],
    benefits: ["Template Audit Energi", "Sertifikat"],
    notes: "-",
    status: "active"
  },
  {
    no: 13,
    name: "Green House Gas (GHG) Emission Accounting & Reporting (Online)",
    slug: "ghg-emission-accounting-reporting-online",
    description: "Perhitungan jejak karbon (Carbon Footprint) Scope 1, 2, dan 3 perusahaan berdasarkan standar GHG Protocol dan ISO 14064.",
    category: "Sustainability & Environment",
    targetAudience: ["HSE Officer", "Sustainability Specialist", "Corporate ESG Team"],
    level: "Pemula - Menengah",
    duration: "2 x 2,5 jam",
    mode: "Online",
    certification: "Sertifikat Lembaga Training",
    requirements: ["Minat pada isu keberlanjutan & emisi karbon"],
    skills: ["Carbon Accounting", "Scope 1, 2, 3 Inventory", "GHG Protocol Reporting"],
    tags: ["ghg", "jejak karbon", "emisi", "iso 14064", "carbon footprint", "sustainability"],
    careerPaths: ["Sustainability Specialist", "Carbon Accounting Officer"],
    benefits: ["Calculator Template Carbon", "Sertifikat"],
    notes: "-",
    status: "active"
  },
  {
    no: 15,
    name: "Environment, Social, Governance (ESG) - Sertifikasi BNSP",
    slug: "esg-environment-social-governance-bnsp",
    description: "Pelatihan dan asesmen sertifikasi kompetensi BNSP untuk praktisi ESG dalam merancang strategi keberlanjutan dan laporan ESG perusahaan.",
    category: "Certifications & Competency",
    targetAudience: ["Manajer Perusahaan", "Praktisi ESG", "HSE Specialist", "Konsultan Keberlanjutan"],
    level: "Menengah - Lanjutan",
    duration: "3 Hari",
    mode: "Online & Offline",
    certification: "Sertifikasi BNSP Resmi",
    requirements: ["Pengalaman kerja / latar belakang pendidikan relevan"],
    skills: ["ESG Framework & Reporting", "Materiality Assessment", "BNSP Assessment Preparedness"],
    tags: ["esg", "bnsp", "sertifikasi bnsp", "sustainability", "governance"],
    careerPaths: ["Certified ESG Specialist BNSP", "Sustainability Director"],
    benefits: ["Sertifikat BNSP Garuda", "Modul & Bimbingan Asesmen"],
    notes: "Sertifikasi BNSP",
    status: "active"
  },
  {
    no: 16,
    name: "Environment, Social, Governance, Risk & Compliance (ESGRC) - Sertifikasi BNSP",
    slug: "esgrc-sertifikasi-bnsp",
    description: "Integrasi prinsip ESG dengan manajemen risiko korporat dan kepatuhan regulasi (Governance, Risk, Compliance).",
    category: "Certifications & Competency",
    targetAudience: ["Risk Officer", "Compliance Manager", "Auditor Internal", "Direksi"],
    level: "Lanjutan",
    duration: "3 Hari",
    mode: "Online & Offline",
    certification: "Sertifikasi BNSP Resmi",
    requirements: ["Pengalaman Manajemen / Compliance"],
    skills: ["ESGRC Framework", "Risk Matrix Analysis", "Regulatory Compliance"],
    tags: ["esgrc", "bnsp", "risk management", "compliance", "sertifikasi bnsp"],
    careerPaths: ["Chief Risk Officer", "ESGRC Manager"],
    benefits: ["Sertifikat BNSP", "Materi Uji Kompetensi"],
    notes: "Sertifikasi BNSP",
    status: "active"
  },
  {
    no: 17,
    name: "Project Management Professional (PMP) - Sertifikasi BNSP",
    slug: "pmp-project-management-professional-bnsp",
    description: "Pembekalan manajemen proyek berstandar PMBOK dan asesmen sertifikasi Manajer Proyek dari Badan Nasional Sertifikasi Profesi (BNSP).",
    category: "Certifications & Competency",
    targetAudience: ["Project Manager", "Project Engineer", "Team Lead", "Praktisi Manajemen Proyek"],
    level: "Menengah - Lanjutan",
    duration: "3 Hari",
    mode: "Online & Offline",
    certification: "Sertifikasi Manajer Proyek BNSP",
    requirements: ["Pengalaman mengelola proyek minimal 2-3 tahun"],
    skills: ["Project Scope & Schedule Management", "Cost & Risk Control", "PMBOK Standards", "BNSP Competency"],
    tags: ["pmp", "project management", "manajer proyek", "bnsp", "pmbok"],
    careerPaths: ["Certified Project Manager BNSP", "Project Director"],
    benefits: ["Sertifikat Kompetensi BNSP", "Template Dokumen Proyek"],
    notes: "Sertifikasi BNSP",
    status: "active"
  },
  {
    no: 18,
    name: "Microsoft Project - Project Management",
    slug: "microsoft-project-management",
    description: "Praktik langsung pengoperasian MS Project untuk membuat WBS, Gantt Chart, alokasi resource, dan tracking progres proyek.",
    category: "Software & Engineering Design",
    targetAudience: ["Drafter", "Scheduler Proyek", "Site Engineer", "Mahasiswa Teknik"],
    level: "Pemula - Menengah",
    duration: "2 x 2 jam",
    mode: "Online",
    certification: "Sertifikat Lembaga Training",
    requirements: ["Laptop terinstall Microsoft Project"],
    skills: ["WBS Creation", "Gantt Chart Scheduling", "Resource Leveling", "S-Curve Tracking"],
    tags: ["microsoft project", "ms project", "gantt chart", "scheduler", "wbs"],
    careerPaths: ["Project Scheduler", "Project Planning Engineer"],
    benefits: ["Master Template MS Project", "Sertifikat"],
    notes: "-",
    status: "active"
  },
  {
    no: 19,
    name: "Drafter / AutoCAD",
    slug: "drafter-autocad",
    description: "Pelatihan menggambar teknik 2D/3D menggunakan AutoCAD untuk kebutuhan sipil, mekanikal, piping, dan elektrikal.",
    category: "Software & Engineering Design",
    targetAudience: ["Calon Drafter", "Mahasiswa Teknik", "SMK Teknik", "Desainer Industri"],
    level: "Pemula / Beginner",
    duration: "2 x 2,5 jam",
    mode: "Online",
    certification: "Sertifikat Lembaga Training",
    requirements: ["Laptop terinstall AutoCAD"],
    skills: ["AutoCAD 2D Drafting", "Dimensioning & Layering", "Engineering Symbol Standard"],
    tags: ["autocad", "drafter", "gambar teknik", "2d 3d", "cad"],
    careerPaths: ["CAD Drafter", "Engineering Designer"],
    benefits: ["Modul AutoCAD", "Library Symbol Teknik", "Sertifikat"],
    notes: "-",
    status: "active"
  },
  {
    no: 24,
    name: "K3 Umum - Keselamatan dan Kesehatan Kerja",
    slug: "k3-umum-keselamatan-kerja",
    description: "Pemahaman regulasi K3, identifikasi bahaya (HIRADC), investigasi kecelakaan kerja, dan budaya keselamatan industri.",
    category: "K3 & Safety",
    targetAudience: ["HSE Officer", "Anggota P2K3", "Supervisor Lapangan", "Semua Pekerja Industri"],
    level: "Pemula - Menengah",
    duration: "2 x 2,5 jam",
    mode: "Online & Offline",
    certification: "Sertifikat Lembaga Training",
    requirements: ["Minat pada keselamatan kerja"],
    skills: ["HIRADC Hazard Analysis", "Incident Investigation", "Safety Inspection"],
    tags: ["k3 umum", "safety", "hse", "hiradc", "keselamatan kerja"],
    careerPaths: ["HSE Officer", "Safety Inspector"],
    benefits: ["Sertifikat K3", "Template HIRADC"],
    notes: "-",
    status: "active"
  },
  {
    no: 27,
    name: "K3 dan Sertifikasi BNSP",
    slug: "k3-sertifikasi-bnsp",
    description: "Pelatihan Ahli K3 dan asesmen sertifikasi kompetensi keselamatan kerja dari Badan Nasional Sertifikasi Profesi (BNSP).",
    category: "Certifications & Competency",
    targetAudience: ["Ahli K3", "Safety Engineer", "HSE Manager"],
    level: "Menengah - Lanjutan",
    duration: "3 Hari",
    mode: "Online & Offline",
    certification: "Sertifikasi BNSP K3 Resmi",
    requirements: ["Pengalaman kerja di bidang K3 / Pendidikan D3/S1"],
    skills: ["Audit K3", "Penilaian Risiko K3 BNSP", "Tanggap Darurat"],
    tags: ["k3 bnsp", "ahli k3", "sertifikasi k3", "safety bnsp"],
    careerPaths: ["Certified Safety Manager BNSP", "HSE Coordinator"],
    benefits: ["Sertifikat Kompetensi BNSP", "Lisensi K3"],
    notes: "Sertifikasi BNSP",
    status: "active"
  },
  {
    no: 32,
    name: "Microsoft Apps & AI Training",
    slug: "microsoft-apps-ai-training",
    description: "Pemanfaatan kecerdasan buatan (Copilot/ChatGPT) dan otomatisasi Microsoft Office (Excel, Power Automate) untuk produktivitas kerja modern.",
    category: "Software & IT",
    targetAudience: ["Pekerja Kantor", "Administrasi", "Manajer", "Mahasiswa"],
    level: "Pemula / Beginner",
    duration: "2 x 2.5 jam",
    mode: "Online & Offline",
    certification: "Sertifikat Lembaga Training",
    requirements: ["Laptop & koneksi internet"],
    skills: ["AI Prompting for Business", "Excel Automation", "Copilot Integration"],
    tags: ["ai", "microsoft office", "excel", "copilot", "produktivitas", "otomatisasi"],
    careerPaths: ["Office Productivity Specialist", "Data Admin"],
    benefits: ["Modul AI Prompt", "Sertifikat"],
    notes: "-",
    status: "active"
  },
  {
    no: 35,
    name: "Sertifikasi Kompetensi Pembangkit Listrik Tenaga Sampah (PLTSa)",
    slug: "sertifikasi-kompetensi-pltsa",
    description: "Sertifikasi keahlian teknis pengoperasian dan pemeliharaan pembangkit listrik berbasis pengolahan sampah / waste-to-energy.",
    category: "Certifications & Competency",
    targetAudience: ["Operator PLTSa", "Engineer Waste to Energy", "Teknisi Lingkungan"],
    level: "Menengah",
    duration: "3 Hari",
    mode: "Online & Offline",
    certification: "Sertifikasi Resmi Sektor Ketenagalistrikan",
    requirements: ["Pengalaman di bidang pembangkit / pengolahan limbah"],
    skills: ["Waste to Energy Operation", "Incinerator & Gasification Control"],
    tags: ["pltsa", "sampah", "waste to energy", "sertifikasi pembangkit"],
    careerPaths: ["PLTSa Plant Operator", "Waste-to-Energy Specialist"],
    benefits: ["Sertifikat Resmi", "Uji Kompetensi"],
    notes: "-",
    status: "active"
  },
  {
    no: 38,
    name: "Sertifikasi Kompetensi Auditor Energi dan Manajer Energi",
    slug: "sertifikasi-auditor-energi-manajer-energi",
    description: "Sertifikasi kompetensi resmi untuk Manajer Energi dan Auditor Energi Industri berdasarkan SKKNI.",
    category: "Certifications & Competency",
    targetAudience: ["Manajer Energi", "Auditor Energi", "Engineer Efisiensi Industri"],
    level: "Lanjutan",
    duration: "3 Hari",
    mode: "Online & Offline",
    certification: "Sertifikasi SKKNI / BNSP Auditor Energi",
    requirements: ["Pengalaman kerja di bidang konservasi/audit energi"],
    skills: ["Energy Audit SKKNI Standards", "Investment Grade Audit (IGA)"],
    tags: ["auditor energi", "manajer energi", "skkni", "sertifikasi energi"],
    careerPaths: ["Certified Energy Auditor", "Corporate Energy Manager"],
    benefits: ["Sertifikat BNSP / SKKNI", "Materi Pendampingan"],
    notes: "-",
    status: "active"
  },
  {
    no: 42,
    name: "Sertifikasi Microsoft Office",
    slug: "sertifikasi-microsoft-office",
    description: "Uji kompetensi internasional/nasional untuk keahlian Microsoft Word, Excel, dan PowerPoint.",
    category: "Certifications & Competency",
    targetAudience: ["Mahasiswa", "Fresh Graduate", "Staf Administrasi"],
    level: "Pemula - Menengah",
    duration: "2 Hari",
    mode: "Online & Offline",
    certification: "Sertifikat Kompetensi Microsoft",
    requirements: ["Menguasai dasar Microsoft Office"],
    skills: ["Advanced Excel Formulas", "Word Formatting", "PowerPoint Presentation"],
    tags: ["microsoft office", "excel", "sertifikasi ms office"],
    careerPaths: ["Administrative Officer", "Data Entry Specialist"],
    benefits: ["Uji Kompetensi", "Sertifikat"],
    notes: "-",
    status: "active"
  }
];

export const getTrainingList = query({
  args: {
    category: v.optional(v.string()),
    level: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const trainings = await ctx.db.query("trainings").collect();
    let filtered = trainings;

    if (args.category) {
      filtered = filtered.filter(
        (t) => t.category.toLowerCase() === args.category!.toLowerCase()
      );
    }
    if (args.level) {
      filtered = filtered.filter((t) =>
        t.level.toLowerCase().includes(args.level!.toLowerCase())
      );
    }
    if (args.limit) {
      filtered = filtered.slice(0, args.limit);
    }

    // If empty DB, return local seeds as fallback so system always has actual data
    if (trainings.length === 0) {
      let seeds = SEED_TRAININGS_DATA;
      if (args.category) {
        seeds = seeds.filter(
          (t) => t.category.toLowerCase() === args.category!.toLowerCase()
        );
      }
      if (args.limit) {
        seeds = seeds.slice(0, args.limit);
      }
      return seeds;
    }

    return filtered;
  },
});

export const getTrainingByIdOrSlug = query({
  args: { queryText: v.string() },
  handler: async (ctx, args) => {
    const trainings = await ctx.db.query("trainings").collect();
    const source = trainings.length > 0 ? trainings : SEED_TRAININGS_DATA;
    const lower = args.queryText.toLowerCase();

    return (
      source.find(
        (t) =>
          t.slug.toLowerCase() === lower ||
          t.name.toLowerCase().includes(lower) ||
          String(t.no) === args.queryText
      ) || null
    );
  },
});

export const searchTrainings = query({
  args: { queryText: v.string() },
  handler: async (ctx, args) => {
    const trainings = await ctx.db.query("trainings").collect();
    const source = trainings.length > 0 ? trainings : SEED_TRAININGS_DATA;
    const q = args.queryText.toLowerCase().trim();

    if (!q) return source.slice(0, 5);

    return source.filter((t) => {
      const matchName = t.name.toLowerCase().includes(q);
      const matchDesc = t.description.toLowerCase().includes(q);
      const matchCategory = t.category.toLowerCase().includes(q);
      const matchTags = t.tags.some((tag) => tag.toLowerCase().includes(q));
      const matchSkills = t.skills.some((sk) => sk.toLowerCase().includes(q));
      const matchAudience = t.targetAudience.some((aud) =>
        aud.toLowerCase().includes(q)
      );

      return (
        matchName ||
        matchDesc ||
        matchCategory ||
        matchTags ||
        matchSkills ||
        matchAudience
      );
    });
  },
});

export const seedTrainings = mutation({
  handler: async (ctx) => {
    const existing = await ctx.db.query("trainings").collect();
    if (existing.length > 0) {
      return { message: "Database already populated", count: existing.length };
    }

    for (const item of SEED_TRAININGS_DATA) {
      await ctx.db.insert("trainings", item);
    }

    return {
      message: "Successfully seeded training database",
      count: SEED_TRAININGS_DATA.length,
    };
  },
});
