import { query } from "./_generated/server";
import { v } from "convex/values";
import { SEED_TRAININGS_DATA, type TrainingItem } from "./trainings";

export interface UserProfileInput {
  education?: string;
  occupation?: string;
  industry?: string;
  experience?: string;
  skills?: string[];
  interests?: string[];
  goals?: string[];
  careerTarget?: string;
  level?: string;
}

export interface RecommendationResult {
  training: TrainingItem;
  score: number;
  matchedReasons: string[];
}

export const DEFAULT_WEIGHTS = {
  interest_match: 0.3,
  career_goal_match: 0.2,
  background_match: 0.2,
  skill_match: 0.15,
  experience_level_match: 0.1,
  other_match: 0.05,
};

export function scoreTraining(
  t: TrainingItem,
  profile: UserProfileInput,
  weights = DEFAULT_WEIGHTS
): { score: number; matchedReasons: string[] } {
  let interestScore = 0;
  let goalScore = 0;
  let backgroundScore = 0;
  let skillScore = 0;
  let levelScore = 0;
  let otherScore = 0;

  const matchedReasons: string[] = [];

  const userInterests = (profile.interests || []).map((i) => i.toLowerCase());
  const userGoals = (profile.goals || []).map((g) => g.toLowerCase());
  if (profile.careerTarget) userGoals.push(profile.careerTarget.toLowerCase());

  const userBackground = [
    profile.education || "",
    profile.occupation || "",
    profile.industry || "",
  ]
    .join(" ")
    .toLowerCase();

  const userSkills = (profile.skills || []).map((s) => s.toLowerCase());
  const userLevel = (profile.level || profile.experience || "").toLowerCase();

  // 1. Interest Match (30%)
  if (userInterests.length > 0) {
    const matched = userInterests.filter(
      (interest) =>
        t.tags.some((tag) => tag.toLowerCase().includes(interest)) ||
        t.category.toLowerCase().includes(interest) ||
        t.name.toLowerCase().includes(interest) ||
        t.skills.some((sk) => sk.toLowerCase().includes(interest))
    );

    if (matched.length > 0) {
      interestScore = Math.min(1.0, matched.length * 0.5);
      matchedReasons.push(
        `Sesuai dengan minat Anda pada ${matched.join(", ")}`
      );
    }
  } else {
    interestScore = 0.5; // neutral default
  }

  // 2. Career Goal Match (20%)
  if (userGoals.length > 0) {
    const matchedGoal = userGoals.filter(
      (goal) =>
        t.careerPaths.some((cp) => cp.toLowerCase().includes(goal)) ||
        t.tags.some((tag) => tag.toLowerCase().includes(goal)) ||
        t.benefits.some((b) => b.toLowerCase().includes(goal))
    );

    if (matchedGoal.length > 0) {
      goalScore = 1.0;
      matchedReasons.push(
        `Mendukung tujuan karier & pengembangan skill (${matchedGoal[0]})`
      );
    } else {
      goalScore = 0.3;
    }
  } else {
    goalScore = 0.5;
  }

  // 3. Background Match (20%)
  if (userBackground.trim().length > 0) {
    const matchedAudience = t.targetAudience.some((aud) =>
      userBackground.includes(aud.toLowerCase()) || aud.toLowerCase().includes(userBackground)
    );
    const matchedName = userBackground.split(" ").some((term) =>
      term.length > 2 && (t.name.toLowerCase().includes(term) || t.tags.some((tg) => tg.includes(term)))
    );

    if (matchedAudience || matchedName) {
      backgroundScore = 1.0;
      matchedReasons.push(`Cocok untuk latar belakang ${profile.occupation || profile.education || "teknis Anda"}`);
    } else {
      backgroundScore = 0.4;
    }
  } else {
    backgroundScore = 0.5;
  }

  // 4. Skill Match (15%)
  if (userSkills.length > 0) {
    const matchedSkill = userSkills.filter(
      (sk) =>
        t.skills.some((tsk) => tsk.toLowerCase().includes(sk)) ||
        t.tags.some((tag) => tag.toLowerCase().includes(sk))
    );

    if (matchedSkill.length > 0) {
      skillScore = 1.0;
      matchedReasons.push(`Mengembangkan skill target: ${matchedSkill.join(", ")}`);
    } else {
      skillScore = 0.3;
    }
  } else {
    skillScore = 0.5;
  }

  // 5. Experience / Level Match (10%)
  if (userLevel) {
    if (
      (userLevel.includes("pemula") || userLevel.includes("beginner") || userLevel.includes("mahasiswa") || userLevel.includes("fresh")) &&
      (t.level.toLowerCase().includes("pemula") || t.level.toLowerCase().includes("beginner") || t.level.toLowerCase().includes("semua"))
    ) {
      levelScore = 1.0;
      matchedReasons.push("Tingkat kesulitan materi sesuai untuk level Pemula / Beginner");
    } else if (
      (userLevel.includes("menengah") || userLevel.includes("intermediate")) &&
      t.level.toLowerCase().includes("menengah")
    ) {
      levelScore = 1.0;
      matchedReasons.push("Sesuai untuk tingkat pengalaman Menengah / Intermediate");
    } else {
      levelScore = 0.6;
    }
  } else {
    levelScore = 0.7;
  }

  // 6. Other Match (5%) - Certification bonus
  if (t.certification && t.certification !== "Sertifikat Lembaga Training") {
    otherScore = 1.0;
    matchedReasons.push(`Termasuk sertifikasi resmi (${t.certification})`);
  } else {
    otherScore = 0.5;
  }

  const rawScore =
    interestScore * weights.interest_match +
    goalScore * weights.career_goal_match +
    backgroundScore * weights.background_match +
    skillScore * weights.skill_match +
    levelScore * weights.experience_level_match +
    otherScore * weights.other_match;

  const score = Math.min(99, Math.max(60, Math.round(rawScore * 100)));

  return { score, matchedReasons };
}

export const findRecommendedTrainings = query({
  args: {
    education: v.optional(v.string()),
    occupation: v.optional(v.string()),
    industry: v.optional(v.string()),
    experience: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    interests: v.optional(v.array(v.string())),
    goals: v.optional(v.array(v.string())),
    careerTarget: v.optional(v.string()),
    level: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const trainingsInDb = await ctx.db.query("trainings").collect();
    const trainings = trainingsInDb.length > 0 ? trainingsInDb : SEED_TRAININGS_DATA;

    const profile: UserProfileInput = {
      education: args.education,
      occupation: args.occupation,
      industry: args.industry,
      experience: args.experience,
      skills: args.skills,
      interests: args.interests,
      goals: args.goals,
      careerTarget: args.careerTarget,
      level: args.level,
    };

    const scored = trainings.map((t) => {
      const { score, matchedReasons } = scoreTraining(t, profile);
      return {
        training: t,
        score,
        matchedReasons,
      };
    });

    // Sort by score descending
    scored.sort((a, b) => b.score - a.score);

    const limit = args.limit || 3;
    return scored.slice(0, limit);
  },
});
