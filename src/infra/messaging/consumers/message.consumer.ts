import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageConsumer {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @RabbitSubscribe({
    exchange: 'qyon.crm.notification',
    routingKey: 'qyon.crm.notification.high.priority',
    queue: 'qyon.crm.notification.high.priority',
    queueOptions: {
      deadLetterExchange: 'qyon.crm.notification',
      deadLetterRoutingKey: 'qyon.crm.notification.high.priority.dlq',
    },
  })
  public async onQueueConsumptionHighPriority(msg): Promise<void> {
    console.log(`[Consume message by high priority`);
    console.log(msg);
  }

  @RabbitSubscribe({
    exchange: 'qyon.crm.notification',
    routingKey: 'qyon.crm.notification.low.priority',
    queue: 'qyon.crm.notification.low.priority',
    queueOptions: {
      deadLetterExchange: 'qyon.crm.notification',
      deadLetterRoutingKey: 'qyon.crm.notification.low.priority.dlq',
    },
  })
  public async onQueueConsumptionLowPriority(msg): Promise<void> {
    console.log(`[Consume message by low priority`);
    console.log(msg);
  }
}
