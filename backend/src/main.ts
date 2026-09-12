import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove chaves que não estão no DTO
      forbidNonWhitelisted: true, // Levantar erro qdo a chave não existir
    }),
  );

  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
