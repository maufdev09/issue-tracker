import z from "zod";

export const IssueSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long').max(255),
  description: z.string().min(10, 'Description must be at least 10 characters long').max(65535),

});

export const patchIssueSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long').max(255).optional(),
  description: z.string().min(10, 'Description must be at least 10 characters long').max(65535).optional(),
  status: z.enum(['OPEN', 'IN_PROGRESS', 'CLOSED']).optional(),
  assigneeId: z.string().min(1, 'Assignee ID is required').max(255).optional()
});



