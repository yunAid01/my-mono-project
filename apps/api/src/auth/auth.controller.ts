import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateUserDto,
  LoginUserDto,
  UserResponseDto,
  LoginResponseDto,
} from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createAuthDto: CreateUserDto): Promise<UserResponseDto> {
    return this.authService.createUser(createAuthDto);
  }

  @Post('login')
  findAll(@Body() loginUserData: LoginUserDto): Promise<LoginResponseDto> {
    return this.authService.loginUser(loginUserData);
  }
}
