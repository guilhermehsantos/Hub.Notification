import {
  AmqpConnection,
  RabbitSubscribe,
  Nack,
} from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import { EnvConfig } from 'src/infra/config/configuration';
import { MessageDTO } from '../dtos/messageDTO';
import { ConsumeMessageWhatsApp } from 'src/application/use-cases/messaging/consume-message.whatsapp';

@Injectable()
export class MessageConsumer {
  logger: Logger = new Logger(MessageConsumer.name);
  constructor(
    private readonly amqpConnection: AmqpConnection,
    private messageConsumerWhatsApp: ConsumeMessageWhatsApp,
  ) {}

  @RabbitSubscribe({
    exchange: EnvConfig.EXCHANGE,
    queue: EnvConfig.WHATSAPP_QUEUE_HIGH_PRIORITY,
    routingKey: EnvConfig.WHATSAPP_QUEUE_HIGH_PRIORITY,
    queueOptions: {
      channel: 'highPriorityChannel',
      deadLetterExchange: EnvConfig.EXCHANGE,
      deadLetterRoutingKey: `${EnvConfig.WHATSAPP_QUEUE_HIGH_PRIORITY}.dlq`,
    },
  })
  public async onQueueConsumptionHighPriority(msg: MessageDTO) {
    try {
      this.logger.log(
        `[${msg.id}][HighPriorityQueue] Consume message from ${msg.provider} | Send to use case`,
      );

      await this.messageConsumerWhatsApp.execute(msg);
      return;
    } catch (error) {
      this.logger.error(
        `[${msg.id}]HighPriorityQueue] Error consuming message | ${error.message}`,
      );
      return new Nack(false);
    }
  }

  @RabbitSubscribe({
    exchange: EnvConfig.EXCHANGE,
    routingKey: EnvConfig.WHATSAPP_QUEUE_LOW_PRIORITY,
    queue: EnvConfig.WHATSAPP_QUEUE_LOW_PRIORITY,
    queueOptions: {
      channel: 'lowPriorityChannel',
      deadLetterExchange: EnvConfig.EXCHANGE,
      deadLetterRoutingKey: `${EnvConfig.WHATSAPP_QUEUE_LOW_PRIORITY}.dlq`,
    },
  })
  public async onQueueConsumptionLowPriority(msg: MessageDTO) {
    const delay = getRandomSeconds(7, 15);
    try {
      this.logger.log(
        `[${msg.id}]LowPriorityQueue] Consume message from ${msg.provider} with delahy ${delay}| Send to use case`,
      );

      await this.messageConsumerWhatsApp.execute(msg, delay);
      return;
    } catch (error) {
      this.logger.error(
        `[${msg.id}]LowPriorityQueue] Error consuming message | ${error.message}`,
      );
      return new Nack(false);
    }
  }
}

function getRandomSeconds(min, max) {
  const randomSeconds = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomSeconds;
}
