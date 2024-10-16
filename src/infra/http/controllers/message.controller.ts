import { Body, Controller, Logger, Post } from '@nestjs/common';
import { PostNewMessageDto } from '../dtos/message/new-message.dto';
import { PublishMessageWhatsApp } from 'src/application/use-cases/messaging/publish-message.whatsapp';
import { randomUUID } from 'crypto';
import { MessageDTO } from 'src/infra/messaging/dtos/messageDTO';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiHeader,
} from '@nestjs/swagger';

@ApiTags('Message')
@Controller('message')
export class MessageController {
  logger: Logger = new Logger(MessageController.name);

  constructor(private messagePublisher: PublishMessageWhatsApp) {}

  @Post('new-message')
  @ApiOperation({ summary: 'Enviar uma nova mensagem.' })
  @ApiResponse({
    status: 201,
    description: 'Mensagem enviada com sucesso.',
    example: { id: 'string', mensagem: 'string' },
  })
  @ApiBody({ type: PostNewMessageDto })
  @ApiHeader({
    name: 'x-product-key',
    description: 'Chave de autenticação por produto',
  })
  async PostNewMessage(
    @Body() body: PostNewMessageDto,
  ): Promise<{ id: string; mensagem: string }> {
    const requestId = randomUUID();
    this.logger.log(`[${requestId}] New message received by ${body.product}`);

    const message: MessageDTO = {
      id: requestId.toString(),
      company: {
        id: body.companyId,
        companyRegistrationNumber: body.companyRegistrationNumber,
      },
      template: body.content.template,
      to: body.content.to,
      message: body.content.message,
      type: body.content.type,
      file: body.content.file,
      fileName: body.content.fileName,
      priority: body.priority,
      provider: body.provider,
    };

    await this.messagePublisher.execute(message);

    return {
      id: requestId.toString(),
      mensagem: `Message processed to ${body.product} product by ${body.userEmail}`,
    };
  }
}
