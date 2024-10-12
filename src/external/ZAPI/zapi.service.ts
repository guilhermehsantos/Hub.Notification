import { Injectable, Logger } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { EnvConfig } from 'src/infra/config/configuration';
import { AxiosResponse } from 'axios';
import { SendMessageDTO } from 'src/application/dtos/sendMessageDto';
import { WhatsAppGateway } from 'src/application/gateways/externals/whatsApp-gateway';

@Injectable()
export class ZApiService implements WhatsAppGateway {
  private readonly logger = new Logger(ZApiService.name);

  constructor(private readonly httpService: HttpService) {}
  async sendTextMessage(params: SendMessageDTO): Promise<void> {
    const url = `${EnvConfig.ZAPI_URL}/instances/${params.accountData.instance}/token/${
      params.accountData.token
    }/send-text`;

    try {
      const response: AxiosResponse = await lastValueFrom(
        this.httpService.post(
          url,
          {
            phone: params.message.to,
            message: params.message.message,
          },
          {
            headers: {
              'Client-Token': EnvConfig.ZAPI_CLIENT_TOKEN,
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      this.logger.log(`Message sent successfully: ${response.data}`);
      return response.data;
    } catch (error) {
      this.logger.error(`Error sending message: ${error.message}`);
      throw new Error(`Failed to send message: ${error.message}`);
    }
  }
  sendImage(params: SendMessageDTO): Promise<void> {
    throw new Error(`${params} | Method not implemented.`);
  }
  sendDocument(params: SendMessageDTO): Promise<void> {
    throw new Error(`${params} | Method not implemented.`);
  }
}
