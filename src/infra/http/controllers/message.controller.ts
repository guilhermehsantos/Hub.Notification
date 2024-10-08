import { Body, Controller, Post } from '@nestjs/common';
import { PostNewMessageDto } from '../dtos/message/new-message.dto';
import { PublishMessage } from 'src/application/use-cases/messaging/publish-message';
import { randomUUID } from 'crypto';

@Controller('message')
export class MessageController {
  constructor(private messagePublisher: PublishMessage) {}

  @Post('new-message')
  async PostNewMessage(@Body() body: PostNewMessageDto): Promise<void> {
    const requestId = randomUUID();
    await this.messagePublisher.execute({
      id: requestId.toString(),
      to: body.to,
      priority: body.priority,
      file: body.file,
      message: body.message,
    });
    console.log(body);
  }
}
