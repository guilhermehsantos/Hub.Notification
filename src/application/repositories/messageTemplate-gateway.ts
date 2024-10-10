import { MessageTemplateEntity } from '../entities/messageTemplate.entity';

export abstract class MessageTemplateGateway {
  abstract getTemplate(
    templatename: string,
  ): Promise<MessageTemplateEntity | null>;
}
