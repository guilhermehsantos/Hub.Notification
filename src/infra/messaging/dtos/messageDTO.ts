import { EPriority } from 'src/application/common/enums/priority';
import { EProvider } from 'src/application/common/enums/provider';

export class MessageDTO {
  public id: string;
  public company: {
    id: string;
    companyRegistrationNumber: string;
  };
  public template: string;
  public to: string;
  public message: string;
  public type: string;
  public file: string;
  public fileName?: string;
  public priority: EPriority;
  public provider: EProvider;
}
