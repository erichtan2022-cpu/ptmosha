import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getSessionHistory = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", args.sessionId))
      .collect();

    messages.sort((a, b) => a.createdAt - b.createdAt);
    return messages;
  },
});

export const getUserProfileBySession = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", args.sessionId))
      .first();

    return profile || null;
  },
});

export const saveChatMessage = mutation({
  args: {
    sessionId: v.string(),
    role: v.string(),
    content: v.string(),
    recommendations: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Ensure session exists
    const existingSession = await ctx.db
      .query("chatSessions")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", args.sessionId))
      .first();

    if (!existingSession) {
      await ctx.db.insert("chatSessions", {
        sessionId: args.sessionId,
        createdAt: now,
        updatedAt: now,
        status: "active",
      });
    } else {
      await ctx.db.patch(existingSession._id, { updatedAt: now });
    }

    const messageId = await ctx.db.insert("messages", {
      sessionId: args.sessionId,
      role: args.role,
      content: args.content,
      recommendations: args.recommendations,
      createdAt: now,
    });

    return messageId;
  },
});

export const updateUserProfile = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("userProfiles")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", args.sessionId))
      .first();

    const now = Date.now();

    if (existing) {
      const updatedFields: Record<string, any> = { updatedAt: now };

      if (args.name !== undefined) updatedFields.name = args.name;
      if (args.education !== undefined) updatedFields.education = args.education;
      if (args.occupation !== undefined) updatedFields.occupation = args.occupation;
      if (args.industry !== undefined) updatedFields.industry = args.industry;
      if (args.experience !== undefined) updatedFields.experience = args.experience;
      if (args.skills !== undefined) updatedFields.skills = args.skills;
      if (args.interests !== undefined) updatedFields.interests = args.interests;
      if (args.goals !== undefined) updatedFields.goals = args.goals;
      if (args.careerTarget !== undefined) updatedFields.careerTarget = args.careerTarget;
      if (args.level !== undefined) updatedFields.level = args.level;
      if (args.preferences !== undefined) updatedFields.preferences = args.preferences;

      await ctx.db.patch(existing._id, updatedFields);
      return existing._id;
    } else {
      const id = await ctx.db.insert("userProfiles", {
        sessionId: args.sessionId,
        name: args.name,
        education: args.education,
        occupation: args.occupation,
        industry: args.industry,
        experience: args.experience,
        skills: args.skills,
        interests: args.interests,
        goals: args.goals,
        careerTarget: args.careerTarget,
        level: args.level,
        preferences: args.preferences,
        updatedAt: now,
      });
      return id;
    }
  },
});

export const clearSessionHistory = mutation({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", args.sessionId))
      .collect();

    for (const msg of messages) {
      await ctx.db.delete(msg._id);
    }

    const profile = await ctx.db
      .query("userProfiles")
      .withIndex("by_sessionId", (q) => q.eq("sessionId", args.sessionId))
      .first();

    if (profile) {
      await ctx.db.delete(profile._id);
    }

    return { message: "Session cleared" };
  },
});
