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
});

