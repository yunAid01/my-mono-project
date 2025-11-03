import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // 나중에 CORS 설정을 더 세부적으로 조정
  await app.listen(process.env.PORT ?? 3003);
}
bootstrap();
