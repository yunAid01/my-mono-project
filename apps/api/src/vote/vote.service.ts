import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { CreateVoteType } from '@repo/validation';

@Injectable()
export class VoteService {
  constructor(private readonly prisma: PrismaService) {}

  async handleVote(voterId: number, voteData: CreateVoteType) {
    const { type, target, postId, commentId } = voteData;

    // 1. Prisma Unique Where 절 생성 (기존 buildWhereClause 로직)
    // 💡 헬퍼 함수 없이 인라인으로 처리하는 것이 더 명확합니다.
    const whereClause =
      target === 'post'
        ? { voterId_postId: { voterId: voterId, postId: postId! } }
        : { voterId_commentId: { voterId: voterId, commentId: commentId! } };

    // 2. 기존 투표 내역 확인 (기존 existingVote 로직)
    const existingVote = await this.prisma.vote.findUnique({
      where: whereClause,
    });

    let voteCountChange = 0;

    // 3. 트랜잭션 실행
    const result = await this.prisma.$transaction(async (tx) => {
      // 💡 try-catch는 트랜잭션 *내부*에 두어야 롤백이 정상 작동합니다.
      try {
        // [Case 1] 기존 투표 없음 (신규 생성)
        if (!existingVote) {
          voteCountChange = type === 'Up' ? 1 : -1;

          await tx.vote.create({
            data: {
              type,
              voterId,
              postId: target === 'post' ? postId : undefined,
              commentId: target === 'comment' ? commentId : undefined,
            },
          });
        }
        // [Case 2] 기존 투표와 같은 버튼 클릭 (투표 취소)
        else if (existingVote.type === type) {
          voteCountChange = type === 'Up' ? -1 : 1;
          await tx.vote.delete({ where: { id: existingVote.id } });
        }
        // [Case 3] 기존 투표와 다른 버튼 클릭 (투표 변경)
        else {
          voteCountChange = type === 'Up' ? 2 : -2; // (Down -> Up) or (Up -> Down)
          await tx.vote.update({
            where: { id: existingVote.id },
            data: { type },
          });
        }

        // 4. Post 또는 Comment의 voteCount 업데이트
        if (target === 'post') {
          const updatedPost = await tx.post.update({
            where: { id: postId! },
            data: { voteCount: { increment: voteCountChange } },
          });
          return { newCount: updatedPost.voteCount };
        } else {
          const updatedComment = await tx.comment.update({
            where: { id: commentId! },
            data: { voteCount: { increment: voteCountChange } },
          });
          return { newCount: updatedComment.voteCount };
        }
      } catch (error) {
        // (예: 투표하는 순간 게시글이 삭제됨)
        throw new BadRequestException('투표 처리 중 오류가 발생했습니다.');
      }
    });

    // 5. 트랜잭션의 최종 결과를 컨트롤러로 반환 (버그 수정)
    return result;
  }
}
