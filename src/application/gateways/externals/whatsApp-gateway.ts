import { SendMessageDTO } from 'src/application/dtos/sendMessageDto';

export abstract class WhatsAppGateway {
  abstract sendTextMessage(payload: SendMessageDTO): Promise<void>;

  abstract sendImage(payload: SendMessageDTO): Promise<void>;

  abstract sendDocument(payload: SendMessageDTO): Promise<void>;
}
