import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fastifyCookie from "fastify-cookie";
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['http://beerbars.com:4200'],
    credentials: true
  });
  app.register(fastifyCookie);

  const configService = app.get(ConfigService);
  const SERVER_PORT = configService.get('SERVER_PORT');

  await app.listen(SERVER_PORT, '0.0.0.0');
}

bootstrap();
