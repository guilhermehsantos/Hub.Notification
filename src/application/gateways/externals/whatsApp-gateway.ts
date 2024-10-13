import { SendMessageDTO } from 'src/application/dtos/sendMessageDto';

export abstract class WhatsAppGateway {
  abstract sendMessage(payload: SendMessageDTO): Promise<void>; 

  abstract sendTextMessage(payload: SendMessageDTO, url: string): Promise<void>;

  abstract sendMidiaMessage(payload: SendMessageDTO, url: string): Promise<void>;
}
