import { SendMessageDTO } from 'src/application/dtos/sendMessageDto';

export abstract class WhatsAppGateway {
  abstract sendMessage(
    payload: SendMessageDTO,
    delay?: number,
  ): Promise<{ data: any; status: number }>;

  abstract sendTextMessage(
    payload: SendMessageDTO,
    url: string,
    delay?: number,
  ): Promise<{ data: any; status: number }>;

  abstract sendMidiaMessage(
    payload: SendMessageDTO,
    url: string,
    delay?: number,
  ): Promise<{ data: any; status: number }>;
}
