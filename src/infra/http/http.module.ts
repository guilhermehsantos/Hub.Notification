import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { GetProductByKey } from 'src/application/use-cases/product/get-product-by-key';
import { ProductController } from './controllers/product.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { MessageController } from './controllers/message.controller';
import { MessagingModule } from '../messaging/messaging.module';
import { PublishMessageWhatsApp } from 'src/application/use-cases/messaging/publish-message.whatsapp';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConsumeMessageWhatsApp } from 'src/application/use-cases/messaging/consume-message.whatsapp';
import { HttpModule as AxionsModule } from '@nestjs/axios';
import { EnvConfig } from '../config/configuration';
import { ApiServiceModule } from 'src/external/ZAPI/zapi.module';

@Module({
  imports: [
    forwardRef(() => MessagingModule),
    DatabaseModule,
    AxionsModule,
    ApiServiceModule,
  ],
  controllers: [ProductController, MessageController],
  providers: [GetProductByKey, PublishMessageWhatsApp, ConsumeMessageWhatsApp],
  exports: [GetProductByKey, PublishMessageWhatsApp, ConsumeMessageWhatsApp],
})
export class HttpModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/message/new-message');
  }
}
