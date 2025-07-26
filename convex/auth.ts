import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

// 비밀번호 해시 함수 (간단한 구현)
function hashPassword(password: string): string {
  // 실제 프로덕션에서는 bcrypt 등을 사용해야 합니다
  return btoa(password + "salt_2024");
}

function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// 회원가입
export const signUp = mutation({
  args: {
    email: v.string(),
    name: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { email, name, password }) => {
    // 이메일 중복 확인
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (existingUser) {
      throw new ConvexError("이미 존재하는 이메일입니다.");
    }

    // 입력 검증
    if (!email || !name || !password) {
      throw new ConvexError("모든 필드를 입력해주세요.");
    }

    if (password.length < 6) {
      throw new ConvexError("비밀번호는 6자 이상이어야 합니다.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ConvexError("올바른 이메일 형식이 아닙니다.");
    }

    // 사용자 생성
    const userId = await ctx.db.insert("users", {
      email,
      name,
      passwordHash: hashPassword(password),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return {
      success: true,
      userId,
      user: { id: userId, email, name },
    };
  },
});

// 로그인
export const signIn = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, { email, password }) => {
    // 사용자 찾기
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (!user) {
      throw new ConvexError("이메일 또는 비밀번호가 잘못되었습니다.");
    }

    // 비밀번호 확인
    if (!verifyPassword(password, user.passwordHash)) {
      throw new ConvexError("이메일 또는 비밀번호가 잘못되었습니다.");
    }

    return {
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    };
  },
});

// 사용자 정보 조회
export const getCurrentUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    const user = await ctx.db.get(userId);
    
    if (!user) {
      return null;
    }

    return {
      id: user._id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  },
});

// 비밀번호 변경
export const changePassword = mutation({
  args: {
    userId: v.id("users"),
    currentPassword: v.string(),
    newPassword: v.string(),
  },
  handler: async (ctx, { userId, currentPassword, newPassword }) => {
    const user = await ctx.db.get(userId);
    
    if (!user) {
      throw new ConvexError("사용자를 찾을 수 없습니다.");
    }

    // 현재 비밀번호 확인
    if (!verifyPassword(currentPassword, user.passwordHash)) {
      throw new ConvexError("현재 비밀번호가 잘못되었습니다.");
    }

    // 새 비밀번호 검증
    if (newPassword.length < 6) {
      throw new ConvexError("새 비밀번호는 6자 이상이어야 합니다.");
    }

    // 비밀번호 업데이트
    await ctx.db.patch(userId, {
      passwordHash: hashPassword(newPassword),
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});

// 프로필 업데이트
export const updateProfile = mutation({
  args: {
    userId: v.id("users"),
    name: v.string(),
  },
  handler: async (ctx, { userId, name }) => {
    const user = await ctx.db.get(userId);
    
    if (!user) {
      throw new ConvexError("사용자를 찾을 수 없습니다.");
    }

    if (!name.trim()) {
      throw new ConvexError("이름을 입력해주세요.");
    }

    await ctx.db.patch(userId, {
      name: name.trim(),
      updatedAt: Date.now(),
    });

    return { success: true };
  },
});