import { Module } from '@nestjs/common';
import { SubradditService } from './subraddit.service';
import { SubradditController } from './subraddit.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [SubradditController],
  providers: [SubradditService],
})
export class SubradditModule {}
