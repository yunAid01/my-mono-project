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
import { VoteService } from './vote.service';
import { VoteDto } from './dto/create-vote.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/decorator/user,decorator';
import type { AuthenticatedUser } from '@repo/types';

@UseGuards(AuthGuard('jwt'))
@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Post()
  create(@User() user: AuthenticatedUser, @Body() voteData: VoteDto) {
    return this.voteService.handleVote(user.id, voteData);
  }
}
