import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import { Priority } from 'src/application/common/enums/priority';
import { Provider } from 'src/application/common/enums/provider';

export type MessagePayload = {
  id: string;
  priority: Priority;
  message: string;
  to: string;
  file: string;
  type: Provider;
};
export const ProviderQueue = {
  whatsapp: {
    highPriority: 'qyon.crm.notification.high.priority',
    lowPriority: 'qyon.crm.notification.low.priority',
  },
};

@Injectable()
export class MessagePublisher {
  logger: Logger;
  private exchange: string;
  private lowPriorityQueue: string;
  private highPriorityQueue: string;

  constructor(private readonly amqpConnection: AmqpConnection) {
    this.logger = new Logger('MessagePublisher');
    this.exchange = 'qyon.crm.notification';
    this.lowPriorityQueue = 'qyon.crm.notification.low.priority';
    this.highPriorityQueue = 'qyon.crm.notification.high.priority';
  }

  public async publishToHighPriorityQueue(eventData: MessagePayload) {
    const queue = ProviderQueue[eventData.type].highPriority;
    try {
      this.logger.log(`[${eventData.id}] Publish event to ${queue}`);

      this.amqpConnection.publish(this.exchange, queue, eventData);
    } catch (error) {
      this.logger.error(
        `[${eventData.id}] Publish event to ${queue}`,
        error.mesage,
      );
    }
  }

  public async publishToLowPriorityhQueue(eventData: MessagePayload) {
    const queue = ProviderQueue[eventData.type].lowPriority;

    try {
      this.logger.log(
        `[${eventData.id}] Publish event to ${eventData.type} in queue ${queue}`,
      );
      this.amqpConnection.publish(this.exchange, queue, eventData);
    } catch (error) {
      this.logger.error(
        `[${eventData.id}] Publish event to ${queue}`,
        error.mesage,
      );
    }
  }
}
