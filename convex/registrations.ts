import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const getStorageUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

export const createRegistration = mutation({
  args: {
    trainingId: v.string(),
    trainingTitle: v.string(),
    trainingFee: v.string(),
    fullName: v.string(),
    email: v.string(),
    phone: v.string(),
    currentJob: v.string(),
    photoStorageId: v.optional(v.id("_storage")),
    proofStorageId: v.optional(v.id("_storage")),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let photoUrl: string | undefined = undefined;
    let proofUrl: string | undefined = undefined;

    if (args.photoStorageId) {
      const url = await ctx.storage.getUrl(args.photoStorageId);
      if (url) photoUrl = url;
    }

    if (args.proofStorageId) {
      const url = await ctx.storage.getUrl(args.proofStorageId);
      if (url) proofUrl = url;
    }

    const registrationId = await ctx.db.insert("trainingRegistrations", {
      trainingId: args.trainingId,
      trainingTitle: args.trainingTitle,
      trainingFee: args.trainingFee,
      fullName: args.fullName.trim(),
      email: args.email.trim().toLowerCase(),
      phone: args.phone.trim(),
      currentJob: args.currentJob.trim(),
      photoStorageId: args.photoStorageId,
      photoUrl,
      proofStorageId: args.proofStorageId,
      proofUrl,
      createdAt: Date.now(),
      status: "pending",
      notes: args.notes?.trim(),
    });

    return {
      registrationId,
      photoUrl,
      proofUrl,
    };
  },
});

export const listRegistrations = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;
    return await ctx.db
      .query("trainingRegistrations")
      .withIndex("by_createdAt")
      .order("desc")
      .take(limit);
  },
});
