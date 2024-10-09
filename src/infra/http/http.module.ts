import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { GetProductByKey } from 'src/application/use-cases/product/get-product-by-key';
import { ProductController } from './controllers/product.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { MessageController } from './controllers/message.controller';
import { MessagingModule } from '../messaging/messaging.module';
import { PublishMessageWhatsApp } from 'src/application/use-cases/messaging/publish-message.whatsapp';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    DatabaseModule,
    MessagingModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'qyon.crm.notification',
          type: 'topic',
        },
      ],
      uri: 'amqp://local:local@localhost:5672',
    }),
  ],
  controllers: [ProductController, MessageController],
  providers: [GetProductByKey, PublishMessageWhatsApp],
})
export class HttpModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/message/new-message');
  }
}
