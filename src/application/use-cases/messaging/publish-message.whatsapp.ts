import { Injectable, Logger } from '@nestjs/common';
import { EPriority } from '../../common/enums/priority';
import { MessagePublisher } from '../../../infra/messaging/publishers/message.publisher';
import { MessageDTO } from '../../../infra/messaging/dtos/messageDTO';

@Injectable()
export class PublishMessageWhatsApp {
  logger: Logger = new Logger(PublishMessageWhatsApp.name);
  constructor(private messagePublisher: MessagePublisher) {}

  async execute(payload: MessageDTO): Promise<void> {
    const { priority } = payload;
    const priorityLabel = EPriority[priority];

    this.logger.log(
      `[${payload.id}] message distribuited by priority ${priorityLabel}`,
    );

    if (priority === EPriority.HIGH)
      this.messagePublisher.publishToHighPriorityQueue(payload);
    else this.messagePublisher.publishToLowPriorityhQueue(payload);
  }
}
