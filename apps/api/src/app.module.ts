import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { SubradditModule } from './subraddit/subraddit.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../api/.env',
    }),
    AuthModule,
    PostModule,
    SubradditModule,
    CommentModule,
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
