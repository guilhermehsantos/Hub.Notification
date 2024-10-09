import { Priority } from 'src/application/common/enums/priority';
import { Provider } from 'src/application/common/enums/provider';

export class PostNewMessageDto {
  cnpj: string;
  productKey: string;
  product: string;
  userEmail: string;
  priority: Priority;
  type: string;
  provider: Provider;
  content: {
    template: string;
    to: string;
    file: string;
    message: string;
  };
}
