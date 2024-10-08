import { Injectable } from '@nestjs/common';
import { Priority } from 'src/application/common/enums/priority';
import { MessagePublisher } from 'src/infra/messaging/publishers/message.publisher';

export type MessageType = {
  id: string;
  priority: Priority;
  message: string;
  to: string;
  file: string;
};

@Injectable()
export class PublishMessage {
  constructor(private messagePublisher: MessagePublisher) {}

  async execute(payload: MessageType): Promise<void> {
    const { priority } = payload;

    if (priority === Priority.HIGH)
      this.messagePublisher.publishToHighPriorityQueue(payload);
    else this.messagePublisher.publishToLowPriorityhQueue(payload);
  }
}
