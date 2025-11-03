import {
  CreateUserSchema,
  LoginUserSchema,
  UserResponseSchema,
  LoginResponseSchema,
} from '@repo/validation';
import { createZodDto } from 'nestjs-zod';

// input dto
export class CreateUserDto extends createZodDto(CreateUserSchema) {}
export class LoginUserDto extends createZodDto(LoginUserSchema) {}

// output dto
export class UserResponseDto extends createZodDto(UserResponseSchema) {}
export class LoginResponseDto extends createZodDto(LoginResponseSchema) {}
