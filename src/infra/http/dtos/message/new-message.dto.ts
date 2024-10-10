import { EPriority } from 'src/application/common/enums/priority';
import { EProvider } from 'src/application/common/enums/provider';

export class PostNewMessageDto {
  cnpj: string;
  companyId: string;
  productKey: string;
  product: string;
  userEmail: string;
  priority: EPriority;
  type: string;
  provider: EProvider;
  content: {
    template: string;
    to: string;
    file: string;
    message: string;
  };
}
