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
          type: 'topic',
        },
      ],
      uri: `amqp://${EnvConfig.RABBITMQ_USER}:${EnvConfig.RABBITMQ_PASS}@localhost:5672`,
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
          options: {
            arguments: {
              'x-dead-letter-routing-key': `${EnvConfig.WHATSAPP_QUEUE_HIGH_PRIORITY}.dlq`,
              'x-dead-letter-exchange': EnvConfig.EXCHANGE,
            },
            channel: 'highPriorityChannel',
          },
        },
        {
          name: EnvConfig.WHATSAPP_QUEUE_LOW_PRIORITY,
          options: {
            arguments: {
              'x-dead-letter-routing-key': `${EnvConfig.WHATSAPP_QUEUE_LOW_PRIORITY}.dlq`,
              'x-dead-letter-exchange': EnvConfig.EXCHANGE,
            },
            channel: 'lowPriorityChannel',
          },
        },
        {
          name: `${EnvConfig.WHATSAPP_QUEUE_LOW_PRIORITY}.dlq`,
          options: {
            arguments: {
              'x-dead-letter-routing-key': `${EnvConfig.WHATSAPP_QUEUE_LOW_PRIORITY}.dlq`,
              'x-dead-letter-exchange': EnvConfig.EXCHANGE,
            },
          },
        },
        {
          name: `${EnvConfig.WHATSAPP_QUEUE_HIGH_PRIORITY}.dlq`,
          options: {
            arguments: {
              'x-dead-letter-routing-key': `${EnvConfig.WHATSAPP_QUEUE_HIGH_PRIORITY}.dlq`,
              'x-dead-letter-exchange': EnvConfig.EXCHANGE,
            },
          },
        },
      ],
    }),
  ],
  providers: [MessagePublisher, MessageConsumer],
  exports: [MessagePublisher, MessageConsumer],
})
export class MessagingModule {}
