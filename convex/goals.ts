import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

// 사용자의 모든 목표 조회
export const getUserGoals = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const goals = await ctx.db
      .query("goals")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    return goals.map(goal => ({
      id: goal._id,
      title: goal.title,
      targetAmount: goal.targetAmount,
      targetWinRate: goal.targetWinRate,
      deadline: goal.deadline,
      description: goal.description,
      isCompleted: goal.isCompleted,
      createdAt: goal.createdAt,
      updatedAt: goal.updatedAt,
    }));
  },
});

// 목표 추가
export const addGoal = mutation({
  args: {
    userId: v.id("users"),
    title: v.string(),
    targetAmount: v.number(),
    targetWinRate: v.number(),
    deadline: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    // 사용자 존재 확인
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new ConvexError("사용자를 찾을 수 없습니다.");
    }

    // 입력 검증
    if (!args.title.trim() || !args.deadline || !args.description.trim()) {
      throw new ConvexError("모든 필드를 입력해주세요.");
    }

    if (args.targetAmount <= 0) {
      throw new ConvexError("목표 금액은 0보다 커야 합니다.");
    }

    if (args.targetWinRate < 0 || args.targetWinRate > 100) {
      throw new ConvexError("목표 승률은 0-100 사이여야 합니다.");
    }

    const goalId = await ctx.db.insert("goals", {
      userId: args.userId,
      title: args.title.trim(),
      targetAmount: args.targetAmount,
      targetWinRate: args.targetWinRate,
      deadline: args.deadline,
      description: args.description.trim(),
      isCompleted: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return { success: true, goalId };
  },
});

// 목표 수정
export const updateGoal = mutation({
  args: {
    goalId: v.id("goals"),
    userId: v.id("users"),
    title: v.string(),
    targetAmount: v.number(),
    targetWinRate: v.number(),
    deadline: v.string(),
    description: v.string(),
    isCompleted: v.boolean(),
  },
  handler: async (ctx, args) => {
    const goal = await ctx.db.get(args.goalId);
    
    if (!goal) {
      throw new ConvexError("목표를 찾을 수 없습니다.");
    }

    if (goal.userId !== args.userId) {
      throw new ConvexError("권한이 없습니다.");
    }

    await ctx.db.patch(args.goalId, {
      title: args.title.trim(),
      targetAmount: args.targetAmount,
      targetWinRate: args.targetWinRate,
      deadline: args.deadline,
      description: args.description.trim(),
      isCompleted: args.isCompleted,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// 목표 완료 상태 변경
export const toggleGoalCompletion = mutation({
  args: {
    goalId: v.id("goals"),
    userId: v.id("users"),
  },
  handler: async (ctx, { goalId, userId }) => {
    const goal = await ctx.db.get(goalId);
    
    if (!goal) {
      throw new ConvexError("목표를 찾을 수 없습니다.");
    }

    if (goal.userId !== userId) {
      throw new ConvexError("권한이 없습니다.");
    }

    await ctx.db.patch(goalId, {
      isCompleted: !goal.isCompleted,
      updatedAt: Date.now(),
    });

    return { success: true, isCompleted: !goal.isCompleted };
  },
});

// 목표 삭제
export const deleteGoal = mutation({
  args: {
    goalId: v.id("goals"),
    userId: v.id("users"),
  },
  handler: async (ctx, { goalId, userId }) => {
    const goal = await ctx.db.get(goalId);
    
    if (!goal) {
      throw new ConvexError("목표를 찾을 수 없습니다.");
    }

    if (goal.userId !== userId) {
      throw new ConvexError("권한이 없습니다.");
    }

    await ctx.db.delete(goalId);
    return { success: true };
  },
});

// 활성 목표 조회
export const getActiveGoals = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const goals = await ctx.db
      .query("goals")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isCompleted"), false))
      .collect();

    return goals.map(goal => ({
      id: goal._id,
      title: goal.title,
      targetAmount: goal.targetAmount,
      targetWinRate: goal.targetWinRate,
      deadline: goal.deadline,
      description: goal.description,
      createdAt: goal.createdAt,
    }));
  },
});