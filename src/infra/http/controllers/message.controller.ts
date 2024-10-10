import { Body, Controller, Logger, Post } from '@nestjs/common';
import { PostNewMessageDto } from '../dtos/message/new-message.dto';
import { PublishMessageWhatsApp } from 'src/application/use-cases/messaging/publish-message.whatsapp';
import { randomUUID } from 'crypto';
import { MessageDTO } from 'src/infra/messaging/dtos/messageDTO';

@Controller('message')
export class MessageController {
  logger: Logger = new Logger(MessageController.name);
  constructor(private messagePublisher: PublishMessageWhatsApp) {}

  @Post('new-message')
  async PostNewMessage(
    @Body() body: PostNewMessageDto,
  ): Promise<{ id: string; mensagem: string }> {
    const requestId = randomUUID();
    this.logger.log(`[${requestId}] New message received by ${body.product}`);

    const message: MessageDTO = {
      id: requestId.toString(),
      company: {
        id: body.companyId,
        cnpj: body.cnpj,
      },
      template: body.content.template,
      to: body.content.to,
      message: body.content.message,
      file: body.content.file,
      priority: body.priority,
      type: body.provider,
    };

    await this.messagePublisher.execute(message);

    return {
      id: requestId.toString(),
      mensagem: `Message processed to ${body.product} product by ${body.userEmail}`,
    };
  }
}
