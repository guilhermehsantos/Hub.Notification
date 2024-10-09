import { Injectable, Logger } from '@nestjs/common';
import { Priority } from 'src/application/common/enums/priority';
import { Provider } from 'src/application/common/enums/provider';
import { MessagePublisher } from 'src/infra/messaging/publishers/message.publisher';

export type MessageType = {
  id: string;
  priority: Priority;
  message: string;
  to: string;
  file: string;
  type: Provider;
};

@Injectable()
export class PublishMessageWhatsApp {
  logger: Logger = new Logger(PublishMessageWhatsApp.name);
  constructor(private messagePublisher: MessagePublisher) {}

  async execute(payload: MessageType): Promise<void> {
    const { priority } = payload;
    this.logger.log(
      `[${payload.id}] message distribuited by priority ${priority}`,
    );

    if (priority === Priority.HIGH)
      this.messagePublisher.publishToHighPriorityQueue(payload);
    else this.messagePublisher.publishToLowPriorityhQueue(payload);
  }
}
