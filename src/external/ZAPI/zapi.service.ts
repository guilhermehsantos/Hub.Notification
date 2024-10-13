import { Injectable, Logger } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { EnvConfig } from 'src/infra/config/configuration';
import { AxiosResponse } from 'axios';
import { SendMessageDTO } from 'src/application/dtos/sendMessageDto';
import { WhatsAppGateway } from 'src/application/gateways/externals/whatsApp-gateway';

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

  async sendMessage(payload: SendMessageDTO): Promise<void> {
    let url = `${EnvConfig.ZAPI_URL}/instances/${payload.accountData.instance}/token/${
      payload.accountData.token
    }/${ZAPIEndpoints[payload.message.type]}`;

    if (payload.message.type === 'text') {
      return await this.sendTextMessage(payload, url);
    }

    const mimeType = getMimeType(payload.message.file);
    if (payload.message.type === 'document') url = `${url}/${mimeType}`;

    return await this.sendMidiaMessage(payload, url);
  }

  async sendTextMessage(params: SendMessageDTO, url: string): Promise<void> {
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

  async sendMidiaMessage(params: SendMessageDTO, url: string): Promise<void> {
    try {
      const response: AxiosResponse = await lastValueFrom(
        this.httpService.post(
          url,
          {
            phone: params.message.to,
            [params.message.type]: params.message.file,
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

function getMimeType(base64String: string): string | null {
  const regex = /^data:([a-zA-Z0-9-+/]+);base64,/;
  const match = base64String.match(regex);
  return match ? match[1].split('/')[1] : null;
}

function mapMimeTypeToEndpointKey(mimeType: string): string | null {
  const mimeMap: Record<string, keyof typeof ZAPIEndpoints> = {
    'image/png': 'image',
    'image/jpeg': 'image',
    'image/gif': 'gif',
    'application/pdf': 'document',
    'video/mp4': 'video',
    'audio/mpeg': 'audio',
    'audio/ogg': 'audio',
    'text/plain': 'text',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      'document',
    'application/msword': 'document',
    'application/vnd.ms-excel': 'document',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      'document',
    'application/zip': 'document',
  };

  return mimeMap[mimeType] || null;
}

function mapBase64ToZAPIEndpointKey(
  base64String: string,
): { type: string; extension: string } | null {
  const mimeType = getMimeType(base64String);
  if (!mimeType) {
    console.error('MimeType not found.');
    return null;
  }
  return {
    type: mapMimeTypeToEndpointKey(mimeType),
    extension: mimeType.split('/')[1],
  };
}
