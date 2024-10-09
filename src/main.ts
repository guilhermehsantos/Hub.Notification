import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvConfig } from './infra/config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(EnvConfig.PORT);
}
bootstrap();
