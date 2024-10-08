import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { MessagePublisher } from './publishers/message.publisher';
import { MessageConsumer } from './consumers/message.consumer';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'qyon.crm.notification',
          type: 'topic',
        },
      ],
      uri: 'amqp://local:local@localhost:5672',
      queues: [
        {
          name: 'qyon.crm.notification.high.priority',
          options: {
            arguments: {
              'x-dead-letter-routing-key':
                'qyon.crm.notification.high.priority.dlq',
              'x-dead-letter-exchange': 'qyon.crm.notification',
            },
          },
        },
        {
          name: 'qyon.crm.notification.low.priority',
          options: {
            arguments: {
              'x-dead-letter-routing-key':
                'qyon.crm.notification.low.priority.dlq',
              'x-dead-letter-exchange': 'qyon.crm.notification',
            },
          },
        },
        {
          name: 'qyon.crm.notification.low.priority.dlq',
          options: {
            arguments: {
              'x-dead-letter-routing-key':
                'qyon.crm.notification.low.priority.dlq',
              'x-dead-letter-exchange': 'qyon.crm.notification',
            },
          },
        },
        {
          name: 'qyon.crm.notification.high.priority.dlq',
          options: {
            arguments: {
              'x-dead-letter-routing-key':
                'qyon.crm.notification.high.priority.dlq',
              'x-dead-letter-exchange': 'qyon.crm.notification',
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
