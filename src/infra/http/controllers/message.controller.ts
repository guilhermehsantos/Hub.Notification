import { Body, Controller, Logger, Post } from '@nestjs/common';
import { PostNewMessageDto } from '../dtos/message/new-message.dto';
import { PublishMessageWhatsApp } from 'src/application/use-cases/messaging/publish-message.whatsapp';
import { randomUUID } from 'crypto';

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

    await this.messagePublisher.execute({
      id: requestId.toString(),
      to: body.content.to,
      priority: body.priority,
      file: body.content.file,
      message: body.content.message,
      type: body.provider,
    });

    return {
      id: requestId.toString(),
      mensagem: `Message processed to ${body.product} product by ${body.userEmail}`,
    };
  }
}
