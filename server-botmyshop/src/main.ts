import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger();

  const configService = app.get(ConfigService);
  const APP_PORT = configService.get('APP_PORT') ?? 3000;

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(APP_PORT);
  logger.log(
    `Server-botmyshop started & running at localhost:${APP_PORT}`,
    'main',
  );
}
bootstrap();
