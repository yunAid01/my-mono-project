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
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/decorator/user,decorator';
import { AuthenticatedUser } from '@repo/types';

@UseGuards(AuthGuard('jwt'))
@Controller('post/:id/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(
    @User() user: AuthenticatedUser,
    @Param('id') postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentService.create(user.id, +postId, createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.commentService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
  //   return this.commentService.update(+id, updateCommentDto);
  // }

  @Delete(':commentId')
  remove(@Param('commentId') commentId: string) {
    return this.commentService.remove(+commentId);
  }
}
