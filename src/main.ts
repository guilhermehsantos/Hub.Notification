import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvConfig } from './infra/config/configuration';
import { description } from './application/common/constants/docs/description';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(EnvConfig.API_PREFIX);

  const config = new DocumentBuilder()
    .setTitle('Qyon.CRM.Notification.Service')
    .setDescription(description)
    .setVersion('1.0')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${EnvConfig.API_PREFIX}/docs`, app, document);

  await app.listen(EnvConfig.PORT);
}
bootstrap();
