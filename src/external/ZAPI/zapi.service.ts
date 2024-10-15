import { Injectable, Logger } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { EnvConfig } from '../../infra/config/configuration';
import { AxiosResponse } from 'axios';
import { SendMessageDTO } from '../../application/dtos/sendMessageDto';
import { WhatsAppGateway } from '../../application/gateways/externals/whatsApp-gateway';

enum ZAPIEndpoints {
  text = 'send-text',
  image = 'send-image',
  document = 'send-document',
  video = 'send-video',
  audio = 'send-audio',
  location = 'send-location',
  contact = 'send-contact',
  sticker = 'send-sticker',
  gif = 'send-gif',
  reaction = 'send-reaction',
}
@Injectable()
export class ZApiService implements WhatsAppGateway {
  private readonly logger = new Logger(ZApiService.name);

  constructor(private readonly httpService: HttpService) {}

  async sendMessage(payload: SendMessageDTO, delay?: number) {
    let url = `${EnvConfig.ZAPI_URL}/instances/${payload.accountData.instance}/token/${
      payload.accountData.token
    }/${ZAPIEndpoints[payload.message.type]}`;

    if (payload.message.type === 'text') {
      return await this.sendTextMessage(payload, url, delay);
    }

    const mimeType = getMimeType(payload.message.file);
    if (payload.message.type === 'document') url = `${url}/${mimeType}`;

    return await this.sendMidiaMessage(payload, url, delay);
  }

  async sendTextMessage(
    params: SendMessageDTO,
    url: string,
    delay?: number,
  ): Promise<{ data: any; status: number }> {
    delay = delay == 0 ? 0 : Math.floor(delay / 2);
    try {
      this.logger.log(
        `[${params.id}] Sent TEXT message to ${params.message.to} with delay ${delay || '0'}`,
      );
      const response: AxiosResponse = await lastValueFrom(
        this.httpService.post(
          url,
          {
            phone: params.message.to,
            message: params.message.message,
            delayMessage: delay,
          },
          {
            headers: {
              'Client-Token': params.accountData.clientToken,
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      this.logger.log(
        `[${params.id}] Message sent successfully: ${JSON.stringify(response.data)}`,
      );
      return { data: response.data, status: response.status };
    } catch (error) {
      this.logger.error(
        `[${params.id}] Error sending message: ${error.message}`,
      );
      throw new Error(`Failed to send message: ${error.message}`);
    }
  }

  async sendMidiaMessage(
    params: SendMessageDTO,
    url: string,
    delay?: number,
  ): Promise<{ data: any; status: number }> {
    try {
      this.logger.log(
        `[${params.id}] Sent ${params.message.type} message to ${params.message.to} with delay ${delay || '0'}`,
      );
      delay = delay == 0 ? 0 : Math.floor(delay / 2);
      const response: AxiosResponse = await lastValueFrom(
        this.httpService.post(
          url,
          {
            phone: params.message.to,
            [params.message.type]: params.message.file,
            delayMessage: delay,
            caption: params.message.message,
            fileName: params.message.fileName,
          },
          {
            headers: {
              'Client-Token': params.accountData.clientToken,
              'Content-Type': 'application/json',
            },
          },
        ),
      );

      this.logger.log(
        `[${params.id}] Message sent successfully: ${JSON.stringify(response.data)}`,
      );
      return { data: response.data, status: response.status };
    } catch (error) {
      this.logger.error(
        `[${params.id}]  Error sending message: ${error.message}`,
      );
      throw new Error(`Failed to send message: ${error.message}`);
    }
  }
}

function getMimeType(base64String: string): string | null {
  const regex = /^data:([a-zA-Z0-9-+/]+);base64,/;
  const match = base64String.match(regex);
  return match ? match[1].split('/')[1] : null;
}

// function mapMimeTypeToEndpointKey(mimeType: string): string | null {
//   const mimeMap: Record<string, keyof typeof ZAPIEndpoints> = {
//     'image/png': 'image',
//     'image/jpeg': 'image',
//     'image/gif': 'gif',
//     'application/pdf': 'document',
//     'video/mp4': 'video',
//     'audio/mpeg': 'audio',
//     'audio/ogg': 'audio',
//     'text/plain': 'text',
//     'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
//       'document',
//     'application/msword': 'document',
//     'application/vnd.ms-excel': 'document',
//     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
//       'document',
//     'application/zip': 'document',
//   };

//   return mimeMap[mimeType] || null;
// }

// function mapBase64ToZAPIEndpointKey(
//   base64String: string,
// ): { type: string; extension: string } | null {
//   const mimeType = getMimeType(base64String);
//   if (!mimeType) {
//     console.error('MimeType not found.');
//     return null;
//   }
//   return {
//     type: mapMimeTypeToEndpointKey(mimeType),
//     extension: mimeType.split('/')[1],
//   };
// }
