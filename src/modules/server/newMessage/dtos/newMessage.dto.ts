import { Priority } from 'src/core/common/enums/priority';
type MessageFile = {
  name: string;
  url: string;
  size: number;
  base64: string;
  mimeType: string;
};

export class NewMessageDto {
  cnpj: string;
  message: string;
  productKey: string;
  userEmail: string;
  priority: Priority;
  to: string;
  file: MessageFile;
}
