import { EPriority } from 'src/application/common/enums/priority';
import { EProvider } from 'src/application/common/enums/provider';
import { ApiProperty } from '@nestjs/swagger';

class MessageContent {
  @ApiProperty({ description: 'Tipo da mensagem' })
  type: string;

  @ApiProperty({ description: 'Template da mensagem' })
  template: string;

  @ApiProperty({ description: 'Destinatário da mensagem' })
  to: string;

  @ApiProperty({ description: 'Arquivo da mensagem' })
  file: string;

  @ApiProperty({ description: 'Mensagem' })
  message: string;

  @ApiProperty({ description: 'Nome do arquivo' })
  fileName?: string;
}

export class PostNewMessageDto {
  @ApiProperty({ description: 'Número de registro da empresa' })
  companyRegistrationNumber: string;

  @ApiProperty({ description: 'ID da empresa' })
  companyId: string;

  @ApiProperty({ description: 'Chave do produto' })
  productKey: string;

  product: string;

  @ApiProperty({ description: 'E-mail do usuário' })
  userEmail: string;

  @ApiProperty({ description: 'Prioridade da mensagem' })
  priority: EPriority;

  @ApiProperty({ description: 'Provedor de mensagens (WhatsApp, SMS, etc)' })
  provider: EProvider;

  @ApiProperty({ description: 'Conteúdo da mensagem' })
  content: MessageContent;
}
