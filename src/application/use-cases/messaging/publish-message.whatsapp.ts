import { Injectable, Logger } from '@nestjs/common';
import { EPriority } from 'src/application/common/enums/priority';
import { MessagePublisher } from 'src/infra/messaging/publishers/message.publisher';
import { MessageDTO } from 'src/infra/messaging/dtos/messageDTO';

@Injectable()
export class PublishMessageWhatsApp {
  logger: Logger = new Logger(PublishMessageWhatsApp.name);
  constructor(private messagePublisher: MessagePublisher) {}

  async execute(payload: MessageDTO): Promise<void> {
    const { priority } = payload;
    this.logger.log(
      `[${payload.id}] message distribuited by priority ${priority}`,
    );

    if (priority === EPriority.HIGH)
      this.messagePublisher.publishToHighPriorityQueue(payload);
    else this.messagePublisher.publishToLowPriorityhQueue(payload);
  }
}
