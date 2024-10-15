import { MessageGateway, receiveMessageDTO } from '../message-gateway';

describe('MessageGateway', () => {
  let messageGateway: MessageGateway;

  beforeEach(() => {
    messageGateway = {
      publishMessage: jest.fn(),
    } as unknown as MessageGateway;
  });

  it('should publish the message with the given id', async () => {
    const mockPayload: receiveMessageDTO = { id: '12345' };

    await messageGateway.publishMessage(mockPayload);

    expect(messageGateway.publishMessage).toHaveBeenCalledWith(mockPayload);
    expect(messageGateway.publishMessage).toHaveBeenCalledTimes(1);
  });

  it('should not publish the message if no id is provided', async () => {
    const mockPayload: receiveMessageDTO = { id: '' };

    await messageGateway.publishMessage(mockPayload);

    expect(messageGateway.publishMessage).toHaveBeenCalledWith(mockPayload);
    expect(messageGateway.publishMessage).toHaveBeenCalledTimes(1);
  });

  it('should not publish the message if no payload is provided', async () => {
    const mockPayload: receiveMessageDTO = { id: null };
    await messageGateway.publishMessage(mockPayload);

    expect(messageGateway.publishMessage).toHaveBeenCalledWith(mockPayload);
    expect(messageGateway.publishMessage).toHaveBeenCalledTimes(1);
  });

  it('should not publish the message if payload is null', async () => {
    await messageGateway.publishMessage(null);

    expect(messageGateway.publishMessage).toHaveBeenCalledWith(null);
    expect(messageGateway.publishMessage).toHaveBeenCalledTimes(1);
  });
});
