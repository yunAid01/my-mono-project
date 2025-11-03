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
import { SubradditService } from './subraddit.service';
import {
  CreateSubradditDto,
  CreateSubradditResponseDto,
} from './dto/create-subraddit.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/decorator/user,decorator';
import type { AuthenticatedUser } from '@repo/types';

@Controller('subraddit')
export class SubradditController {
  constructor(private readonly subradditService: SubradditService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createSubraddit(
    @User() user: AuthenticatedUser,
    @Body() createSubradditDto: CreateSubradditDto,
  ): Promise<CreateSubradditResponseDto> {
    const creatorId = user.id;
    return this.subradditService.create(creatorId, createSubradditDto);
  }

  @Get()
  findAll() {
    return this.subradditService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.subradditService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateSubradditDto: UpdateSubradditDto,
  // ) {
  //   return this.subradditService.update(+id, updateSubradditDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.subradditService.remove(+id);
  // }
}
