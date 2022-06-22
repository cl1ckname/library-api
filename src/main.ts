import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { readFileSync } from 'fs';
import * as dotenv from 'dotenv'
import { ConfigInterface } from './config.interface';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const config = dotenv.parse<ConfigInterface>(readFileSync('.env').toString())
  const app = await NestFactory.create(AppModule.register(config));
  app.useGlobalPipes(new ValidationPipe())

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Library test task')
    .setDescription('The library api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
