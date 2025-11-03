import { z } from 'zod';

/** request schema */
export const createSubradditSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().min(10).max(1000),
});
export type CreateSubradditType = z.infer<typeof createSubradditSchema>;

/** response schema */
export const createSubradditResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  creatorId: z.number(),
});
export type CreateSubradditResponseType = z.infer<
  typeof createSubradditResponseSchema
>;
