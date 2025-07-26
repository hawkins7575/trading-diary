import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

// 사용자의 모든 전략 조회
export const getUserStrategies = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const strategies = await ctx.db
      .query("strategies")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    return strategies.map(strategy => ({
      id: strategy._id,
      name: strategy.name,
      description: strategy.description,
      rules: strategy.rules,
      riskLevel: strategy.riskLevel,
      createdAt: strategy.createdAt,
      updatedAt: strategy.updatedAt,
    }));
  },
});

// 전략 추가
export const addStrategy = mutation({
  args: {
    userId: v.id("users"),
    name: v.string(),
    description: v.string(),
    rules: v.string(),
    riskLevel: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
  },
  handler: async (ctx, args) => {
    // 사용자 존재 확인
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new ConvexError("사용자를 찾을 수 없습니다.");
    }

    // 입력 검증
    if (!args.name.trim() || !args.description.trim() || !args.rules.trim()) {
      throw new ConvexError("모든 필드를 입력해주세요.");
    }

    const strategyId = await ctx.db.insert("strategies", {
      userId: args.userId,
      name: args.name.trim(),
      description: args.description.trim(),
      rules: args.rules.trim(),
      riskLevel: args.riskLevel,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return { success: true, strategyId };
  },
});

// 전략 수정
export const updateStrategy = mutation({
  args: {
    strategyId: v.id("strategies"),
    userId: v.id("users"),
    name: v.string(),
    description: v.string(),
    rules: v.string(),
    riskLevel: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
  },
  handler: async (ctx, args) => {
    const strategy = await ctx.db.get(args.strategyId);
    
    if (!strategy) {
      throw new ConvexError("전략을 찾을 수 없습니다.");
    }

    if (strategy.userId !== args.userId) {
      throw new ConvexError("권한이 없습니다.");
    }

    await ctx.db.patch(args.strategyId, {
      name: args.name.trim(),
      description: args.description.trim(),
      rules: args.rules.trim(),
      riskLevel: args.riskLevel,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// 전략 삭제
export const deleteStrategy = mutation({
  args: {
    strategyId: v.id("strategies"),
    userId: v.id("users"),
  },
  handler: async (ctx, { strategyId, userId }) => {
    const strategy = await ctx.db.get(strategyId);
    
    if (!strategy) {
      throw new ConvexError("전략을 찾을 수 없습니다.");
    }

    if (strategy.userId !== userId) {
      throw new ConvexError("권한이 없습니다.");
    }

    await ctx.db.delete(strategyId);
    return { success: true };
  },
});