import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { Priority } from 'src/application/common/enums/priority';

export type MessagePayload = {
  id: string;
  priority: Priority;
  message: string;
  to: string;
  file: string;
};

@Injectable()
export class MessagePublisher {
  private exchange: string;
  private lowPriorityQueue: string;
  private highPriorityQueue: string;

  constructor(private readonly amqpConnection: AmqpConnection) {
    this.exchange = 'qyon.crm.notification';
    this.lowPriorityQueue = 'qyon.crm.notification.low.priority';
    this.highPriorityQueue = 'qyon.crm.notification.high.priority';
  }

  public async publishToHighPriorityQueue(eventData: MessagePayload) {
    try {
      console.log(
        `[${eventData.id}] Publish event to ${this.highPriorityQueue}`,
      );
      this.amqpConnection.publish(
        this.exchange,
        this.highPriorityQueue,
        eventData,
      );
    } catch (error) {
      console.error(
        `[${eventData.id}] Publish event to ${this.highPriorityQueue}`,
        error.mesage,
      );
    }
  }

  public async publishToLowPriorityhQueue(eventData: MessagePayload) {
    try {
      console.log(
        `[${eventData.id}] Publish event to ${this.highPriorityQueue}`,
      );
      this.amqpConnection.publish(
        this.exchange,
        this.lowPriorityQueue,
        eventData,
      );
    } catch (error) {
      console.error(
        `[${eventData.id}] Publish event to ${this.highPriorityQueue}`,
        error.mesage,
      );
    }
  }
}
