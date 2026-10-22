import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

interface GraduateSeed {
  fullName: string;
  completionDate: string;
  trainingTopic: string;
  trainingCategory?: string;
  certificateNumber: string;
  institution?: string;
  grade?: string;
  hours?: string;
  status: string;
  notes?: string;
  certificateImageUrl?: string;
  venue?: string;
  instructor?: string;
}

export const INITIAL_GRADUATES: GraduateSeed[] = [
  // Pengenalan, Desain & Commissioning PLTS (17 Oktober 2026)
  {
    fullName: "SAMUEL FEBRIANTO SIMBOLON",
    completionDate: "17 Oktober 2026",
    trainingTopic: "Pengenalan, Desain & Commissioning PLTS",
    trainingCategory: "Renewable Energy (PLTS)",
    certificateNumber: "",
    institution: "Peserta Profesional",
    hours: "32 Jam Pelatihan",
    status: "verified",
    notes: "Menyelesaikan program pelatihan teknis Pengenalan, Desain & Commissioning PLTS.",
  },
  {
    fullName: "RIZKY NAHDATUL",
    completionDate: "17 Oktober 2026",
    trainingTopic: "Pengenalan, Desain & Commissioning PLTS",
    trainingCategory: "Renewable Energy (PLTS)",
    certificateNumber: "",
    institution: "Peserta Profesional",
    hours: "32 Jam Pelatihan",
    status: "verified",
    notes: "Menyelesaikan program pelatihan teknis Pengenalan, Desain & Commissioning PLTS.",
  },
  {
    fullName: "SEKAR AYU ARUMNINGTYAS",
    completionDate: "17 Oktober 2026",
    trainingTopic: "Pengenalan, Desain & Commissioning PLTS",
    trainingCategory: "Renewable Energy (PLTS)",
    certificateNumber: "",
    institution: "Peserta Profesional",
    hours: "32 Jam Pelatihan",
    status: "verified",
    notes: "Menyelesaikan program pelatihan teknis Pengenalan, Desain & Commissioning PLTS.",
  },
  {
    fullName: "GINANJAR RAGANATA",
    completionDate: "17 Oktober 2026",
    trainingTopic: "Pengenalan, Desain & Commissioning PLTS",
    trainingCategory: "Renewable Energy (PLTS)",
    certificateNumber: "",
    institution: "Peserta Profesional",
    hours: "32 Jam Pelatihan",
    status: "verified",
    notes: "Menyelesaikan program pelatihan teknis Pengenalan, Desain & Commissioning PLTS.",
  },
  {
    fullName: "ZAKI IMAMI",
    completionDate: "17 Oktober 2026",
    trainingTopic: "Pengenalan, Desain & Commissioning PLTS",
    trainingCategory: "Renewable Energy (PLTS)",
    certificateNumber: "",
    institution: "Peserta Profesional",
    hours: "32 Jam Pelatihan",
    status: "verified",
    notes: "Menyelesaikan program pelatihan teknis Pengenalan, Desain & Commissioning PLTS.",
  },
  {
    fullName: "YUDHA SEPTIAWAN",
    completionDate: "17 Oktober 2026",
    trainingTopic: "Pengenalan, Desain & Commissioning PLTS",
    trainingCategory: "Renewable Energy (PLTS)",
    certificateNumber: "",
    institution: "Peserta Profesional",
    hours: "32 Jam Pelatihan",
    status: "verified",
    notes: "Menyelesaikan program pelatihan teknis Pengenalan, Desain & Commissioning PLTS.",
  },
  {
    fullName: "MUHAMMAD REZA FATHONI",
    completionDate: "17 Oktober 2026",
    trainingTopic: "Pengenalan, Desain & Commissioning PLTS",
    trainingCategory: "Renewable Energy (PLTS)",
    certificateNumber: "",
    institution: "Peserta Profesional",
    hours: "32 Jam Pelatihan",
    status: "verified",
    notes: "Menyelesaikan program pelatihan teknis Pengenalan, Desain & Commissioning PLTS.",
  },
  {
    fullName: "JETHRO BRYAN SITORUS",
    completionDate: "17 Oktober 2026",
    trainingTopic: "Pengenalan, Desain & Commissioning PLTS",
    trainingCategory: "Renewable Energy (PLTS)",
    certificateNumber: "",
    institution: "Peserta Profesional",
    hours: "32 Jam Pelatihan",
    status: "verified",
    notes: "Menyelesaikan program pelatihan teknis Pengenalan, Desain & Commissioning PLTS.",
  },

  // Commissioning in Oil & Gas and Power Plant Project (26 – 27 September 2026)
  {
    fullName: "KAISAR ALI KAMARLIS",
    completionDate: "26 – 27 September 2026",
    trainingTopic: "Commissioning in Oil & Gas and Power Plant Project",
    trainingCategory: "Commissioning & Engineering",
    certificateNumber: "MSS-COF22-092601",
    institution: "Peserta Profesional",
    hours: "40 Jam Pelatihan",
    status: "verified",
    venue: "BATAM",
    instructor: "Emos Arapenta Ginting",
    certificateImageUrl: "/images/certificates/sertifikat-kaisar-ali-kamarlis.png",
    notes: "Menyelesaikan program pelatihan teknis Commissioning in Oil & Gas and Power Plant Project di Batam.",
  },
  {
    fullName: "WAHYU HIDAYAT",
    completionDate: "26 – 27 September 2026",
    trainingTopic: "Commissioning in Oil & Gas and Power Plant Project",
    trainingCategory: "Commissioning & Engineering",
    certificateNumber: "MSS-COF22-092602",
    institution: "Peserta Profesional",
    hours: "40 Jam Pelatihan",
    status: "verified",
    venue: "BATAM",
    instructor: "Emos Arapenta Ginting",
    certificateImageUrl: "/images/certificates/sertifikat-wahyu-hidayat.png",
    notes: "Menyelesaikan program pelatihan teknis Commissioning in Oil & Gas and Power Plant Project di Batam.",
  },
];

export const listGraduates = query({
  args: {
    searchQuery: v.optional(v.string()),
    category: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let graduates = await ctx.db
      .query("trainingGraduates")
      .withIndex("by_createdAt")
      .order("desc")
      .take(args.limit ?? 100);

    // If query returned results, filter by search & category if specified
    if (args.searchQuery) {
      const q = args.searchQuery.toLowerCase().trim();
      graduates = graduates.filter(
        (g) =>
          g.fullName.toLowerCase().includes(q) ||
          g.certificateNumber.toLowerCase().includes(q) ||
          g.trainingTopic.toLowerCase().includes(q) ||
          (g.institution && g.institution.toLowerCase().includes(q))
      );
    }

    if (args.category && args.category !== "all") {
      graduates = graduates.filter((g) => g.trainingCategory === args.category);
    }

    return graduates;
  },
});

export const getGraduateByCertificate = query({
  args: {
    certificateNumber: v.string(),
  },
  handler: async (ctx, args) => {
    const graduate = await ctx.db
      .query("trainingGraduates")
      .withIndex("by_certificateNumber", (q) =>
        q.eq("certificateNumber", args.certificateNumber.trim())
      )
      .first();

    return graduate;
  },
});

export const seedGraduates = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("trainingGraduates").take(1);
    if (existing.length > 0) {
      return { status: "already_seeded", count: existing.length };
    }

    const insertedIds = [];
    const now = Date.now();
    for (let i = 0; i < INITIAL_GRADUATES.length; i++) {
      const grad = INITIAL_GRADUATES[i];
      const id = await ctx.db.insert("trainingGraduates", {
        fullName: grad.fullName,
        completionDate: grad.completionDate,
        trainingTopic: grad.trainingTopic,
        trainingCategory: grad.trainingCategory,
        certificateNumber: grad.certificateNumber,
        institution: grad.institution,
        grade: grad.grade,
        hours: grad.hours,
        status: grad.status,
        notes: grad.notes,
        certificateImageUrl: grad.certificateImageUrl,
        venue: grad.venue,
        instructor: grad.instructor,
        createdAt: now - i * 86400000,
      });
      insertedIds.push(id);
    }

    return { status: "success", count: insertedIds.length };
  },
});

export const reseedWithOfficialGraduates = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("trainingGraduates").collect();
    for (const record of existing) {
      await ctx.db.delete(record._id);
    }

    const insertedIds = [];
    const now = Date.now();
    for (let i = 0; i < INITIAL_GRADUATES.length; i++) {
      const grad = INITIAL_GRADUATES[i];
      const id = await ctx.db.insert("trainingGraduates", {
        fullName: grad.fullName,
        completionDate: grad.completionDate,
        trainingTopic: grad.trainingTopic,
        trainingCategory: grad.trainingCategory,
        certificateNumber: grad.certificateNumber,
        institution: grad.institution,
        grade: grad.grade,
        hours: grad.hours,
        status: grad.status,
        notes: grad.notes,
        certificateImageUrl: grad.certificateImageUrl,
        venue: grad.venue,
        instructor: grad.instructor,
        createdAt: now - i * 86400000,
      });
      insertedIds.push(id);
    }

    return { status: "reseeded_success", count: insertedIds.length };
  },
});

export const updateOfficialCertificates = mutation({
  args: {},
  handler: async (ctx) => {
    const graduates = await ctx.db.query("trainingGraduates").collect();
    let updatedCount = 0;

    for (const g of graduates) {
      if (g.fullName.toUpperCase().includes("KAISAR ALI")) {
        await ctx.db.patch(g._id, {
          certificateNumber: "MSS-COF22-092601",
          trainingTopic: "Commissioning in Oil & Gas and Power Plant Project",
          completionDate: "26 – 27 September 2026",
          certificateImageUrl: "/images/certificates/sertifikat-kaisar-ali-kamarlis.png",
          venue: "BATAM",
          instructor: "Emos Arapenta Ginting",
          notes: "Menyelesaikan program pelatihan teknis Commissioning in Oil & Gas and Power Plant Project di Batam.",
        });
        updatedCount++;
      } else if (g.fullName.toUpperCase().includes("WAHYU HIDAYAT")) {
        await ctx.db.patch(g._id, {
          certificateNumber: "MSS-COF22-092602",
          trainingTopic: "Commissioning in Oil & Gas and Power Plant Project",
          completionDate: "26 – 27 September 2026",
          certificateImageUrl: "/images/certificates/sertifikat-wahyu-hidayat.png",
          venue: "BATAM",
          instructor: "Emos Arapenta Ginting",
          notes: "Menyelesaikan program pelatihan teknis Commissioning in Oil & Gas and Power Plant Project di Batam.",
        });
        updatedCount++;
      }
    }

    return { updatedCount };
  },
});

export const addGraduate = mutation({
  args: {
    fullName: v.string(),
    completionDate: v.string(),
    trainingTopic: v.string(),
    trainingCategory: v.optional(v.string()),
    certificateNumber: v.string(),
    institution: v.optional(v.string()),
    grade: v.optional(v.string()),
    hours: v.optional(v.string()),
    notes: v.optional(v.string()),
    certificateImageUrl: v.optional(v.string()),
    venue: v.optional(v.string()),
    instructor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("trainingGraduates")
      .withIndex("by_certificateNumber", (q) =>
        q.eq("certificateNumber", args.certificateNumber.trim())
      )
      .first();

    if (existing) {
      throw new Error(`Nomor sertifikat ${args.certificateNumber} sudah terdaftar.`);
    }

    const graduateId = await ctx.db.insert("trainingGraduates", {
      fullName: args.fullName.trim(),
      completionDate: args.completionDate.trim(),
      trainingTopic: args.trainingTopic.trim(),
      trainingCategory: args.trainingCategory?.trim(),
      certificateNumber: args.certificateNumber.trim(),
      institution: args.institution?.trim(),
      grade: args.grade?.trim(),
      hours: args.hours?.trim(),
      status: "verified",
      notes: args.notes?.trim(),
      certificateImageUrl: args.certificateImageUrl?.trim(),
      venue: args.venue?.trim(),
      instructor: args.instructor?.trim(),
      createdAt: Date.now(),
    });

    return graduateId;
  },
});
