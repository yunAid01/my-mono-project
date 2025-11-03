import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PostCreateType, PostUpdateType } from '@repo/validation';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createPost(
    userId: number,
    subradditId: number,
    createPostDto: PostCreateType,
  ): Promise<any> {
    const newPost = await this.prisma.post.create({
      data: {
        ...createPostDto,
        subradditId: subradditId,
        authorId: userId,
      },
    });
    return {
      ...newPost,
      createdAt: newPost.createdAt.toISOString(),
      updatedAt: newPost.updatedAt.toISOString(),
    };
  }

  async updatePost(
    postId: number,
    updatePostDto: PostUpdateType,
  ): Promise<any> {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) {
      throw new NotFoundException('페이지를 찾을 수 없습니다..');
    }
    const updatedPost = await this.prisma.post.update({
      where: { id: postId },
      data: { ...updatePostDto },
    });
    return {
      ...updatedPost,
      createdAt: updatedPost.createdAt.toISOString(),
      updatedAt: updatedPost.updatedAt.toISOString(),
    };
  }

  async findAll() {
    const posts = await this.prisma.post.findMany();
    return posts;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
