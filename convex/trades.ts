import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

// 사용자의 모든 거래 조회
export const getUserTrades = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const trades = await ctx.db
      .query("trades")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    return trades.map(trade => ({
      id: trade._id,
      date: trade.date,
      entry: trade.entry,
      withdrawal: trade.withdrawal,
      balance: trade.balance,
      profit: trade.profit,
      memo: trade.memo || "",
      createdAt: trade.createdAt,
      updatedAt: trade.updatedAt,
    }));
  },
});

// 거래 추가 (alias)
export const createTrade = mutation({
  args: {
    userId: v.id("users"),
    date: v.string(),
    entry: v.number(),
    withdrawal: v.number(),
    balance: v.number(),
    profit: v.number(),
    memo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // 사용자 존재 확인
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new ConvexError("사용자를 찾을 수 없습니다.");
    }

    // 입력 검증
    if (!args.date) {
      throw new ConvexError("날짜를 입력해주세요.");
    }

    if (args.entry < 0 || args.withdrawal < 0) {
      throw new ConvexError("입금액과 출금액은 0 이상이어야 합니다.");
    }

    const tradeId = await ctx.db.insert("trades", {
      userId: args.userId,
      date: args.date,
      entry: args.entry,
      withdrawal: args.withdrawal,
      balance: args.balance,
      profit: args.profit,
      memo: args.memo,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // 생성된 거래 정보 반환
    const trade = await ctx.db.get(tradeId);
    return {
      _id: tradeId,
      id: tradeId,
      date: args.date,
      entry: args.entry,
      withdrawal: args.withdrawal,
      balance: args.balance,
      profit: args.profit,
      memo: args.memo,
      createdAt: trade?.createdAt,
      updatedAt: trade?.updatedAt,
    };
  },
});

// 거래 추가
export const addTrade = mutation({
  args: {
    userId: v.id("users"),
    date: v.string(),
    entry: v.number(),
    withdrawal: v.number(),
    balance: v.number(),
    profit: v.number(),
    memo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // 사용자 존재 확인
    const user = await ctx.db.get(args.userId);
    if (!user) {
      throw new ConvexError("사용자를 찾을 수 없습니다.");
    }

    // 입력 검증
    if (!args.date) {
      throw new ConvexError("날짜를 입력해주세요.");
    }

    if (args.entry < 0 || args.withdrawal < 0) {
      throw new ConvexError("입금액과 출금액은 0 이상이어야 합니다.");
    }

    const tradeId = await ctx.db.insert("trades", {
      userId: args.userId,
      date: args.date,
      entry: args.entry,
      withdrawal: args.withdrawal,
      balance: args.balance,
      profit: args.profit,
      memo: args.memo,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return { success: true, tradeId };
  },
});

// 거래 수정
export const updateTrade = mutation({
  args: {
    tradeId: v.id("trades"),
    userId: v.id("users"),
    date: v.string(),
    entry: v.number(),
    withdrawal: v.number(),
    balance: v.number(),
    profit: v.number(),
    memo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const trade = await ctx.db.get(args.tradeId);
    
    if (!trade) {
      throw new ConvexError("거래를 찾을 수 없습니다.");
    }

    if (trade.userId !== args.userId) {
      throw new ConvexError("권한이 없습니다.");
    }

    await ctx.db.patch(args.tradeId, {
      date: args.date,
      entry: args.entry,
      withdrawal: args.withdrawal,
      balance: args.balance,
      profit: args.profit,
      memo: args.memo,
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// 거래 삭제
export const deleteTrade = mutation({
  args: {
    tradeId: v.id("trades"),
    userId: v.id("users"),
  },
  handler: async (ctx, { tradeId, userId }) => {
    const trade = await ctx.db.get(tradeId);
    
    if (!trade) {
      throw new ConvexError("거래를 찾을 수 없습니다.");
    }

    if (trade.userId !== userId) {
      throw new ConvexError("권한이 없습니다.");
    }

    await ctx.db.delete(tradeId);
    return { success: true };
  },
});

// 거래 통계 계산
export const getTradeStats = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const trades = await ctx.db
      .query("trades")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    if (trades.length === 0) {
      return {
        totalProfit: 0,
        totalTrades: 0,
        winRate: 0,
        avgReturn: 0,
        totalInvestment: 0,
        currentBalance: 0,
      };
    }

    const totalProfit = trades.reduce((sum, trade) => sum + trade.profit, 0);
    const totalTrades = trades.length;
    const winningTrades = trades.filter(trade => trade.profit > 0).length;
    const winRate = totalTrades > 0 ? (winningTrades / totalTrades) * 100 : 0;
    const totalInvestment = trades.reduce((sum, trade) => sum + trade.entry, 0);
    const avgReturn = totalInvestment > 0 ? (totalProfit / totalInvestment) * 100 : 0;
    
    // 최신 거래의 잔고를 현재 잔고로 사용
    const sortedTrades = trades.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const currentBalance = sortedTrades[0]?.balance || 0;

    return {
      totalProfit,
      totalTrades,
      winRate,
      avgReturn,
      totalInvestment,
      currentBalance,
    };
  },
});