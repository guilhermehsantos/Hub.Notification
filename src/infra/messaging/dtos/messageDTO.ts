import { EPriority } from 'src/application/common/enums/priority';
import { EProvider } from 'src/application/common/enums/provider';

export class MessageDTO {
  public id: string;
  public company: {
    id: string;
    cnpj: string;
  };
  public template: string;
  public to: string;
  public message: string;
  public file: string;
  public priority: EPriority;
  public type: EProvider;
}
