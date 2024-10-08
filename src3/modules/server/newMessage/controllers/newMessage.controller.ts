import { Controller, Post, Body } from '@nestjs/common';
import { NewMessageDto } from '../dtos/newMessage.dto';

@Controller('new-mesage')
export class NewMessageController {
  constructor() {}

  @Post()
  async create(@Body() request: NewMessageDto): Promise<void> {
    console.log(JSON.stringify(request));
  }
}
