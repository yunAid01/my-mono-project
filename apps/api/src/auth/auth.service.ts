import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

// dto
import {
  CreateUserDtoType,
  LoginUserDtoType,
  LoginResponseType,
  CreateUserResponseType,
} from '@repo/validation';

//service
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // ------------------------------------------------------------------------
  async createUser(
    createUserData: CreateUserDtoType,
  ): Promise<CreateUserResponseType> {
    const user = await this.prisma.user.findUnique({
      where: { email: createUserData.email },
    });
    if (user) {
      throw new UnauthorizedException('이미 존재하는 이메일입니다..');
    }
    const hashedPassword = await bcrypt.hash(createUserData.password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        email: createUserData.email,
        nickname: createUserData.nickname,
        password: hashedPassword,
      },
    });
    const { password, ...result } = newUser;
    return {
      ...result,
      createdAt: newUser.createdAt.toISOString(),
    };
  }

  // ------------------------------------------------------------------------
  async loginUser(loginUserData: LoginUserDtoType): Promise<LoginResponseType> {
    const user = await this.prisma.user.findUnique({
      where: { email: loginUserData.email },
    });
    if (!user) {
      throw new UnauthorizedException('존재하지 않는 이메일입니다.');
    }
    const isPasswordValid = await bcrypt.compare(
      loginUserData.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('비밀번호가 올바르지 않습니다.');
    }
    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);
    const { password: _, ...result } = user;
    return {
      access_token,
      user: {
        ...result,
        createdAt: user.createdAt.toISOString(),
      },
    };
  }
}
