import { EPriority } from 'src/application/common/enums/priority';
import { EProvider } from 'src/application/common/enums/provider';

export class PostNewMessageDto {
  companyRegistrationNumber: string;
  companyId: string;
  productKey: string;
  product: string;
  userEmail: string;
  priority: EPriority;
  provider: EProvider;
  content: {
    type: string;
    template: string;
    to: string;
    file: string;
    message: string;
    fileName?: string;
  };
}
