import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { initTrace } from 'src/trace';
import { AppModule } from './app.module';

async function bootstrap() {
  initTrace();
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
