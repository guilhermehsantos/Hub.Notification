import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { forwardRef, Module } from '@nestjs/common';
import { MessagePublisher } from './publishers/message.publisher';
import { MessageConsumer } from './consumers/message.consumer';
import { EnvConfig } from '../config/configuration';
import { HttpModule } from '../http/http.module';
import { channel } from 'diagnostics_channel';

@Module({
  imports: [
    forwardRef(() => HttpModule),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: EnvConfig.EXCHANGE,
          type: 'direct',
        },
      ],
      uri: EnvConfig.RABBITMQ_URL_CONNECT,
      channels: {
        lowPriorityChannel: {
          prefetchCount: 2,
        },
        highPriorityChannel: {
          prefetchCount: 20,
        },
      },
      queues: [
        {
          name: EnvConfig.WHATSAPP_QUEUE_HIGH_PRIORITY,
          routingKey: EnvConfig.WHATSAPP_QUEUE_HIGH_PRIORITY,
          exchange: EnvConfig.EXCHANGE,
          options: {
            arguments: {
              'x-dead-letter-routing-key': `${EnvConfig.WHATSAPP_QUEUE_HIGH_PRIORITY}.dlq`,
              'x-dead-letter-exchange': EnvConfig.EXCHANGE,
            },
            channel: 'highPriorityChannel',
            durable: true,
            assert: true,
          },
        },
        {
          exchange: EnvConfig.EXCHANGE,
          name: EnvConfig.WHATSAPP_QUEUE_LOW_PRIORITY,
          routingKey: EnvConfig.WHATSAPP_QUEUE_LOW_PRIORITY,
          options: {
            arguments: {
              'x-dead-letter-routing-key': `${EnvConfig.WHATSAPP_QUEUE_LOW_PRIORITY}.dlq`,
              'x-dead-letter-exchange': EnvConfig.EXCHANGE,
            },
            channel: 'lowPriorityChannel',
            assert: true,
            durable: true,
          },
        },
        {
          exchange: EnvConfig.EXCHANGE,
          name: `${EnvConfig.WHATSAPP_QUEUE_LOW_PRIORITY}.dlq`,
          routingKey: `${EnvConfig.WHATSAPP_QUEUE_LOW_PRIORITY}.dlq`,
          options: {
            assert: true,
            durable: true,
          },
        },
        {
          exchange: EnvConfig.EXCHANGE,
          name: `${EnvConfig.WHATSAPP_QUEUE_HIGH_PRIORITY}.dlq`,
          routingKey: `${EnvConfig.WHATSAPP_QUEUE_HIGH_PRIORITY}.dlq`,
          options: {
            assert: true,
            durable: true,
          },
        },
      ],
    }),
  ],
  providers: [MessagePublisher, MessageConsumer],
  exports: [MessagePublisher, MessageConsumer],
})
export class MessagingModule {}
