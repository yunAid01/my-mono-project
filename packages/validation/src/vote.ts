import { z } from 'zod';

/** request schema */
export const voteTypeSchema = z.enum(['Up', 'Down']);

// createZodDto와 호환되는 스키마
export const voteSchema = z
  .object({
    target: z.enum(['post', 'comment']),
    type: voteTypeSchema,
    postId: z.number().optional(),
    commentId: z.number().optional(),
  })
  .refine(
    (data) =>
      (data.target === 'post' && data.postId && !data.commentId) ||
      (data.target === 'comment' && data.commentId && !data.postId),
    {
      message: 'target이 post면 postId가, comment면 commentId가 필요합니다',
    },
  );

export type CreateVoteType = z.infer<typeof voteSchema>;
