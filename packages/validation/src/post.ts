import { z } from 'zod';

export const postCreateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});
export type PostCreateType = z.infer<typeof postCreateSchema>;

export const postUpdateSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  content: z.string().min(1, 'Content is required').optional(),
});
export type PostUpdateType = z.infer<typeof postUpdateSchema>;
