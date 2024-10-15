import { WhatsAppGateway } from '../whatsApp-gateway';
import { SendMessageDTO } from '../../../dtos/sendMessageDto';

describe('WhatsAppGateway', () => {
  let whatsappGateway: WhatsAppGateway;

  beforeEach(() => {
    whatsappGateway = {
      sendMessage: jest.fn(),
      sendTextMessage: jest.fn(),
      sendMidiaMessage: jest.fn(),
    } as unknown as WhatsAppGateway;
  });

  it('should send a message with the given payload', async () => {
    const mockPayload: SendMessageDTO = {
      id: '1',
      message: {
        to: '123456789',
        message: 'Hello!',
        type: 'text',
      },
      accountData: {
        instance: 'instance123',
        token: 'token123',
        companyRegistrationNumber: '1234567890001',
      },
    };

    await whatsappGateway.sendMessage(mockPayload, 1000);

    expect(whatsappGateway.sendMessage).toHaveBeenCalledWith(mockPayload, 1000);
    expect(whatsappGateway.sendMessage).toHaveBeenCalledTimes(1);
  });

  it('should send a text message with the given payload and URL', async () => {
    const mockPayload: SendMessageDTO = {
      id: '1',
      message: {
        to: '123456789',
        message: 'Hello!',
        type: 'text',
      },
      accountData: {
        instance: 'instance123',
        token: 'token123',
        companyRegistrationNumber: '1234567890001',
      },
    };
    const url = 'https://example.com';

    await whatsappGateway.sendTextMessage(mockPayload, url, 500);

    expect(whatsappGateway.sendTextMessage).toHaveBeenCalledWith(
      mockPayload,
      url,
      500,
    );
    expect(whatsappGateway.sendTextMessage).toHaveBeenCalledTimes(1);
  });

  it('should send a media message with the given payload and URL', async () => {
    const mockPayload: SendMessageDTO = {
      id: '1',
      message: {
        to: '123456789',
        message: 'Check this out!',
        type: 'image',
        file: 'image.png',
      },
      accountData: {
        instance: 'instance123',
        token: 'token123',
        companyRegistrationNumber: '1234567890001',
      },
    };
    const url = 'https://example.com';

    await whatsappGateway.sendMidiaMessage(mockPayload, url, 1000);

    expect(whatsappGateway.sendMidiaMessage).toHaveBeenCalledWith(
      mockPayload,
      url,
      1000,
    );
    expect(whatsappGateway.sendMidiaMessage).toHaveBeenCalledTimes(1);
  });
});
