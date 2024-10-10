import { Injectable, Logger } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { EnvConfig } from 'src/infra/config/configuration';
import { AxiosResponse } from 'axios';
import { MessageDTO } from 'src/infra/messaging/dtos/messageDTO';

@Injectable()
export class ZApiService {
  private readonly logger = new Logger(ZApiService.name);

  constructor(private readonly httpService: HttpService) {}

  async sendMessage(instanceZapi: any, payload: MessageDTO): Promise<any> {}

  async sendTextMessage(
    instanceZapi: any,
    payload: { to: string; message: string },
  ): Promise<any> {
    const url = `${EnvConfig.ZAPI_URL}/instances/${instanceZapi.getCode()}/token/${instanceZapi.getToken()}/send-text`;

    try {
      const response: AxiosResponse = await lastValueFrom(
        this.httpService.post(
          url,
          {
            phone: payload.to,
            message: payload.message,
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
}
