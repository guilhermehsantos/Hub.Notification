import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
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
    routingKey: EnvConfig.WHATSAPP_QUEUE_HIGH_PRIORITY,
    queue: EnvConfig.WHATSAPP_QUEUE_HIGH_PRIORITY,
    queueOptions: {
      deadLetterExchange: EnvConfig.EXCHANGE,
      deadLetterRoutingKey: `${EnvConfig.WHATSAPP_QUEUE_HIGH_PRIORITY}.dlq`,
    },
  })
  public async onQueueConsumptionHighPriority(msg: MessageDTO): Promise<void> {
    try {
      this.logger.log(
        `[${msg.id}] Consume message from ${msg.type} | Send to use case`,
      );
      this.messageConsumerWhatsApp.execute(msg);
    } catch (error) {
      this.logger.error(
        `[${msg.id}] Error consuming message | ${error.message}`,
      );
    }
  }

  @RabbitSubscribe({
    exchange: EnvConfig.EXCHANGE,
    routingKey: EnvConfig.WHATSAPP_QUEUE_LOW_PRIORITY,
    queue: EnvConfig.WHATSAPP_QUEUE_LOW_PRIORITY,
    queueOptions: {
      deadLetterExchange: EnvConfig.EXCHANGE,
      deadLetterRoutingKey: `${EnvConfig.WHATSAPP_QUEUE_LOW_PRIORITY}.dlq`,
    },
  })
  public async onQueueConsumptionLowPriority(msg: MessageDTO): Promise<void> {
    try {
      this.logger.log(
        `[${msg.id}] Consume message from ${msg.type} | Send to use case`,
      );
      this.messageConsumerWhatsApp.execute(msg);
    } catch (error) {
      this.logger.error(
        `[${msg.id}] Error consuming message | ${error.message}`,
      );
    }
  }
}
