import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { SubradditModule } from './subraddit/subraddit.module';
import { CommentModule } from './comment/comment.module';
import { VoteModule } from './vote/vote.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    AuthModule,
    PostModule,
    SubradditModule,
    CommentModule,
    VoteModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_PIPE',
      useClass: ZodValidationPipe,
    },
    {
      provide: 'APP_INTERCEPTOR',
      useClass: ZodSerializerInterceptor,
    },
  ],
})
export class AppModule {}
