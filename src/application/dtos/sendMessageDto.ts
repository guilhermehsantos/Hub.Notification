export class SendMessageDTO {
  public id: string;
  public message: {
    to: string;
    message: string;
    type: string; // 'text' | 'image' | 'document' | 'video' | 'audio' | 'location' | 'contact' | 'sticker' | 'gif' | 'reaction';
    file?: string;
  };
  public accountData: {
    instance: string;
    token: string;
    cnpj: string;
  };
}
