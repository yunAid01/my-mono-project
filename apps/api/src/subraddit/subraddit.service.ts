import { Injectable } from '@nestjs/common';
import { CreateSubradditType } from '@repo/validation';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubradditService {
  constructor(private readonly prismaService: PrismaService) {}

  /** create subraddit */
  async create(creatorId: number, createSubradditDto: CreateSubradditType) {
    const newSubraddit = await this.prismaService.subraddit.create({
      data: {
        ...createSubradditDto,
        creatorId: creatorId,
      },
    });
    return newSubraddit;
  }

  // todo - without password
  findAll() {
    const subraddits = this.prismaService.subraddit.findMany({
      include: {
        creator: true,
        subscribes: true,
        posts: true,
      },
    });
    return subraddits;
  }

  findOne(id: number) {
    return `This action returns a #${id} subraddit`;
  }

  // update(id: number, updateSubradditDto: UpdateSubradditDto) {
  //   return `This action updates a #${id} subraddit`;
  // }

  remove(id: number) {
    return `This action removes a #${id} subraddit`;
  }
}
