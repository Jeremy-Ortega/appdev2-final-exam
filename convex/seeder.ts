import { mutation } from "./_generated/server";

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    // Update these fields to match your schema's required properties
    const testUserId = await ctx.db.insert("users", {
      username: "exam_tester", 
      password: "password123",
    });

    const initialTasks = [
      "Buy groceries",
      "Finish React Native tutorial",
      "Clean the kitchen",
      "Call mom",
      "Schedule dentist appointment",
      "Fix bug in todo app",
      "Read 10 pages of a book",
      "Go for a 20-minute run",
      "Organize desk",
      "Meditate for 5 minutes"
    ];

    for (const taskText of initialTasks) {
      await ctx.db.insert("todos", {
        text: taskText,
        isCompleted: Math.random() > 0.7, 
        userId: testUserId,
      });
    }
    
    return "Successfully seeded 10 tasks linked to user!";
  },
});