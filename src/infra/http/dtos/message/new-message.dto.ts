import { Priority } from 'src/application/common/enums/priority';

export class PostNewMessageDto {
  cnpj: string;
  message: string;
  productKey: string;
  to: string;
  userEmail: string;
  priority: Priority;
  type: string;
  template: string;
  file: string;
}
