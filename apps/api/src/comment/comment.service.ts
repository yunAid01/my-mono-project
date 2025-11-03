import { Injectable } from '@nestjs/common';
import { CreateCommentType } from '@repo/validation';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: number,
    postId: number,
    createCommentDto: CreateCommentType,
  ) {
    const newComment = await this.prisma.comment.create({
      data: {
        ...createCommentDto,
        authorId: userId,
        postId: postId,
      },
    });
    return {
      ...newComment,
      createdAt: newComment.createdAt.toISOString(),
    };
  }

  findAll() {
    return `This action returns all comment`;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} comment`;
  // }

  // update(id: number, updateCommentDto: UpdateCommentDto) {
  //   return `This action updates a #${id} comment`;
  // }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
