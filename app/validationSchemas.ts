import z from "zod";

export const IssueSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long').max(100),
  description: z.string().min(10, 'Description must be at least 10 characters long').max(1000),
});
