export class SendMessageDTO {
  public id: string;
  public message: {
    to: string;
    message: string;
    type: string; // 'text' | 'image' | 'document' | 'video' | 'audio' | 'location' | 'contact' | 'sticker' | 'gif' | 'reaction';
    file?: string;
    fileName?: string;
  };
  public accountData: {
    instance: string;
    token: string;
    clientToken: string;
    companyRegistrationNumber: string;
  };
}
