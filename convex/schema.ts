import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // 사용자 테이블
  users: defineTable({
    email: v.string(),
    name: v.string(),
    passwordHash: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_email", ["email"]),

  // 거래 데이터 테이블
  trades: defineTable({
    userId: v.id("users"),
    date: v.string(),
    entry: v.number(),
    withdrawal: v.number(),
    balance: v.number(),
    profit: v.number(),
    memo: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_date", ["userId", "date"]),

  // 매매일지 테이블
  journals: defineTable({
    userId: v.id("users"),
    date: v.string(),
    content: v.string(),
    mood: v.optional(v.union(
      v.literal("excellent"), 
      v.literal("good"), 
      v.literal("neutral"), 
      v.literal("bad"), 
      v.literal("terrible")
    )),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_date", ["userId", "date"]),

  // 매매전략 테이블
  strategies: defineTable({
    userId: v.id("users"),
    name: v.string(),
    description: v.optional(v.string()),
    buyCriteria: v.optional(v.string()),
    sellCriteria: v.optional(v.string()),
    moneyManagement: v.optional(v.string()),
    stopLoss: v.optional(v.string()),
    technicalIndicators: v.optional(v.string()),
    riskLevel: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    timeframe: v.optional(v.string()),
    targetReturn: v.optional(v.string()),
    maxDrawdown: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),

  // 목표설정 테이블
  goals: defineTable({
    userId: v.id("users"),
    title: v.string(),
    targetAmount: v.number(),
    targetWinRate: v.number(),
    deadline: v.string(),
    description: v.string(),
    isCompleted: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),
});