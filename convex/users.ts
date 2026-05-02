import { mutation } from "./_generated/server";
import { v } from "convex/values";
import bcrypt from "bcryptjs";

export const login = mutation({
  args: {
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // 1. Look up the user by username
    const user = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .unique();

    // If you haven't set up an index yet, use this simpler version:
    // const user = await ctx.db.query("users").filter(q => q.eq(q.field("username"), args.username)).unique();

    if (!user) {
      return { success: false, message: "User not found!" };
    }

    // 2. Compare the provided password with the hashed password in the DB
    const isPasswordCorrect = bcrypt.compareSync(args.password, user.password);

    if (!isPasswordCorrect) {
      return { success: false, message: "Invalid credentials!" };
    }

    // 3. Return success and the user's unique ID
    return {
      success: true,
      userId: user._id,
    };
  },
});

export const register = mutation({
  args: {
    username: v.string(),
    password: v.string(),
    fullname: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("username"), args.username))
      .unique();

    if (existingUser) {
      return { success: false, message: "User already exists!" };
    }

    const hashedPassword = bcrypt.hashSync(args.password, 10);

    const userId = await ctx.db.insert("users", {
      username: args.username,
      password: hashedPassword,
      fullname: args.fullname,
    });

    return { success: true, userId };
  },
});