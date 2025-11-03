import { z } from 'zod';

export const createCommentSchema = z.object({
  text: z.string().min(1, 'Text is required'),
});
export type CreateCommentType = z.infer<typeof createCommentSchema>;
