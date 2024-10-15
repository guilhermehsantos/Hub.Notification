import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import { EnvConfig } from '../../config/configuration';
import { MessageDTO } from '../dtos/messageDTO';

export const ProviderQueue = {
  whatsapp: {
    highPriority: EnvConfig.WHATSAPP_QUEUE_HIGH_PRIORITY,
    lowPriority: EnvConfig.WHATSAPP_QUEUE_LOW_PRIORITY,
  },
};

@Injectable()
export class MessagePublisher {
  logger: Logger;
  private exchange: string;

  constructor(private readonly amqpConnection: AmqpConnection) {
    this.logger = new Logger('MessagePublisher');
    this.exchange = EnvConfig.EXCHANGE;
  }

  public async publishToHighPriorityQueue(eventData: MessageDTO) {
    const queue = ProviderQueue[eventData.provider].highPriority;
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

  public async publishToLowPriorityhQueue(eventData: MessageDTO) {
    const queue = ProviderQueue[eventData.provider].lowPriority;

    try {
      this.logger.log(
        `[${eventData.id}] Publish event to ${eventData.provider} in queue ${queue}`,
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
