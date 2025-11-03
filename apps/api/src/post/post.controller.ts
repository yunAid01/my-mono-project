import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../auth/decorator/user,decorator';
import { AuthGuard } from '@nestjs/passport';
import type { AuthenticatedUser } from '@repo/types/dist/';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @User() user: AuthenticatedUser,
    subradditId: number,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postService.createPost(user.id, subradditId, createPostDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') postId: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.updatePost(+postId, updatePostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.postService.findOne(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.postService.remove(+id);
  // }
}
