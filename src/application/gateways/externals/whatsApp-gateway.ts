import { SendMessageDTO } from 'src/application/dtos/sendMessageDto';

export abstract class WhatsAppGateway {
  abstract sendMessage(payload: SendMessageDTO, delay?: number): Promise<void>;

  abstract sendTextMessage(
    payload: SendMessageDTO,
    url: string,
    delay?: number,
  ): Promise<void>;

  abstract sendMidiaMessage(
    payload: SendMessageDTO,
    url: string,
    delay?: number,
  ): Promise<void>;
}
