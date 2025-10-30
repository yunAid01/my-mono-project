import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodResponse } from 'nestjs-zod';
import {
  CreateUserDto,
  LoginUserDto,
  UserResponseDto,
  LoginResponseDto,
} from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ZodResponse({ type: UserResponseDto })
  @Post('register')
  createUser(@Body() createAuthDto: CreateUserDto) {
    return this.authService.createUser(createAuthDto);
  }

  @ZodResponse({ type: LoginResponseDto })
  @Post('login')
  findAll(@Body() loginUserData: LoginUserDto) {
    return this.authService.loginUser(loginUserData);
  }
}
