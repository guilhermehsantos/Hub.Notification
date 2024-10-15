import { SendMessageDTO } from '../sendMessageDto';

describe('SendMessageDTO', () => {
  let sendMessageDTO: SendMessageDTO;

  beforeEach(() => {
    sendMessageDTO = {
      id: '123',
      message: {
        to: '5511999999999',
        message: 'Hello, world!',
        type: 'text',
      },
      accountData: {
        instance: 'instance_1',
        token: 'abc123token',
        cnpj: '12345678901234',
      },
    };
  });

  it('should initialize SendMessageDTO with correct values', () => {
    expect(sendMessageDTO.id).toBe('123');
    expect(sendMessageDTO.message.to).toBe('5511999999999');
    expect(sendMessageDTO.message.message).toBe('Hello, world!');
    expect(sendMessageDTO.message.type).toBe('text');
    expect(sendMessageDTO.message.file).toBeUndefined();
    expect(sendMessageDTO.accountData.instance).toBe('instance_1');
    expect(sendMessageDTO.accountData.token).toBe('abc123token');
    expect(sendMessageDTO.accountData.cnpj).toBe('12345678901234');
  });

  it('should handle optional file property in message', () => {
    sendMessageDTO.message.file = 'path/to/file.jpg';
    expect(sendMessageDTO.message.file).toBe('path/to/file.jpg');
  });

  it('should correctly update message details', () => {
    sendMessageDTO.message.message = 'New message content';
    expect(sendMessageDTO.message.message).toBe('New message content');
  });

  it('should correctly update account data', () => {
    sendMessageDTO.accountData.token = 'newToken456';
    expect(sendMessageDTO.accountData.token).toBe('newToken456');
  });
});
