import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
  }).index("by_token", ["tokenIdentifier"]),

  trainings: defineTable({
    no: v.number(),
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    category: v.string(),
    targetAudience: v.array(v.string()),
    level: v.string(),
    duration: v.string(),
    mode: v.string(),
    certification: v.string(),
    requirements: v.array(v.string()),
    skills: v.array(v.string()),
    tags: v.array(v.string()),
    careerPaths: v.array(v.string()),
    benefits: v.array(v.string()),
    notes: v.optional(v.string()),
    url: v.optional(v.string()),
    status: v.string(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["category"])
    .index("by_level", ["level"])
    .index("by_status", ["status"]),

  companyInfo: defineTable({
    key: v.string(),
    value: v.any(),
  }).index("by_key", ["key"]),

  userProfiles: defineTable({
    sessionId: v.string(),
    name: v.optional(v.string()),
    education: v.optional(v.string()),
    occupation: v.optional(v.string()),
    industry: v.optional(v.string()),
    experience: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    interests: v.optional(v.array(v.string())),
    goals: v.optional(v.array(v.string())),
    careerTarget: v.optional(v.string()),
    level: v.optional(v.string()),
    preferences: v.optional(v.string()),
    updatedAt: v.number(),
  }).index("by_sessionId", ["sessionId"]),

  chatSessions: defineTable({
    sessionId: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    status: v.string(),
  }).index("by_sessionId", ["sessionId"]),

  messages: defineTable({
    sessionId: v.string(),
    role: v.string(), // "user" | "assistant" | "system"
    content: v.string(),
    recommendations: v.optional(v.any()),
    createdAt: v.number(),
  }).index("by_sessionId", ["sessionId"]),

  trainingRegistrations: defineTable({
    trainingId: v.string(),
    trainingTitle: v.string(),
    trainingFee: v.string(),
    fullName: v.string(),
    email: v.string(),
    phone: v.string(),
    currentJob: v.string(),
    photoStorageId: v.optional(v.id("_storage")),
    photoUrl: v.optional(v.string()),
    proofStorageId: v.optional(v.id("_storage")),
    proofUrl: v.optional(v.string()),
    createdAt: v.number(),
    status: v.string(), // "pending" | "verified"
    notes: v.optional(v.string()),
  })
    .index("by_email", ["email"])
    .index("by_training", ["trainingId"])
    .index("by_createdAt", ["createdAt"]),

  trainingGraduates: defineTable({
    fullName: v.string(),
    completionDate: v.string(), // e.g. "17 Oktober 2026"
    trainingTopic: v.string(), // e.g. "Training Pengenalan, Desain & Commissioning PLTS"
    trainingCategory: v.optional(v.string()), // e.g. "Renewable Energy (PLTS)"
    certificateNumber: v.string(), // e.g. "MSS-CERT/PLTS/2026/001"
    institution: v.optional(v.string()), // e.g. "PT PLN Nusantara Power"
    grade: v.optional(v.string()), // e.g. "Sangat Baik (A)"
    hours: v.optional(v.string()), // e.g. "32 Jam Pelatihan"
    status: v.string(), // "verified"
    notes: v.optional(v.string()),
    certificateImageUrl: v.optional(v.string()),
    venue: v.optional(v.string()),
    instructor: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_certificateNumber", ["certificateNumber"])
    .index("by_fullName", ["fullName"])
    .index("by_completionDate", ["completionDate"])
    .index("by_createdAt", ["createdAt"]),
});

