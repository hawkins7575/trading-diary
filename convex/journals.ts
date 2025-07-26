import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

// 사용자의 모든 일지 조회
export const getUserJournals = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const journals = await ctx.db
      .query("journals")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    return journals.map(journal => ({
      id: journal._id,
      date: journal.date,
      content: journal.content,
      createdAt: journal.createdAt,
      updatedAt: journal.updatedAt,
    }));
  },
});

// 특정 날짜의 일지 조회
export const getJournalByDate = query({
  args: { 
    userId: v.id("users"),
    date: v.string(),
  },
  handler: async (ctx, { userId, date }) => {
    const journal = await ctx.db
      .query("journals")
      .withIndex("by_user_date", (q) => q.eq("userId", userId).eq("date", date))
      .first();

    if (!journal) {
      return null;
    }

    return {
      id: journal._id,
      date: journal.date,
      content: journal.content,
      createdAt: journal.createdAt,
      updatedAt: journal.updatedAt,
    };
  },
});

// 일지 저장 (추가/수정)
export const saveJournal = mutation({
  args: {
    userId: v.id("users"),
    date: v.string(),
    content: v.string(),
  },
  handler: async (ctx, { userId, date, content }) => {
    // 사용자 존재 확인
    const user = await ctx.db.get(userId);
    if (!user) {
      throw new ConvexError("사용자를 찾을 수 없습니다.");
    }

    // 입력 검증
    if (!date || !content.trim()) {
      throw new ConvexError("날짜와 내용을 입력해주세요.");
    }

    // 기존 일지 확인
    const existingJournal = await ctx.db
      .query("journals")
      .withIndex("by_user_date", (q) => q.eq("userId", userId).eq("date", date))
      .first();

    if (existingJournal) {
      // 기존 일지 수정
      await ctx.db.patch(existingJournal._id, {
        content: content.trim(),
        updatedAt: Date.now(),
      });

      return { success: true, journalId: existingJournal._id, isUpdate: true };
    } else {
      // 새 일지 추가
      const journalId = await ctx.db.insert("journals", {
        userId,
        date,
        content: content.trim(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      return { success: true, journalId, isUpdate: false };
    }
  },
});

// 일지 삭제
export const deleteJournal = mutation({
  args: {
    journalId: v.id("journals"),
    userId: v.id("users"),
  },
  handler: async (ctx, { journalId, userId }) => {
    const journal = await ctx.db.get(journalId);
    
    if (!journal) {
      throw new ConvexError("일지를 찾을 수 없습니다.");
    }

    if (journal.userId !== userId) {
      throw new ConvexError("권한이 없습니다.");
    }

    await ctx.db.delete(journalId);
    return { success: true };
  },
});

// 일지가 있는 날짜 목록 조회
export const getJournalDates = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const journals = await ctx.db
      .query("journals")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    return journals.map(journal => journal.date);
  },
});

// 최근 일지 조회 (개수 제한)
export const getRecentJournals = query({
  args: { 
    userId: v.id("users"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { userId, limit = 10 }) => {
    const journals = await ctx.db
      .query("journals")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(limit);

    return journals.map(journal => ({
      id: journal._id,
      date: journal.date,
      content: journal.content.length > 100 ? 
        journal.content.substring(0, 100) + "..." : 
        journal.content,
      createdAt: journal.createdAt,
      updatedAt: journal.updatedAt,
    }));
  },
});