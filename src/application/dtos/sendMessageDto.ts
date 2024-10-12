export class SendMessageDTO {
  public message: {
    to: string;
    message: string;
    image?: string;
    document?: string;
    video?: string;
  };
  public accountData: {
    instance: string;
    token: string;
    cnpj: string;
  };
}
