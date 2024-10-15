import { MessageTemplateGateway } from '../messageTemplate-gateway';
import { MessageTemplateEntity } from '../../../entities/messageTemplate.entity';
import { EStatus } from '../../../common/enums/status';

describe('MessageTemplateGateway', () => {
  let messageTemplateGateway: MessageTemplateGateway;

  beforeEach(() => {
    messageTemplateGateway = {
      getTemplate: jest.fn(),
    } as unknown as MessageTemplateGateway;
  });

  it('should return the message template when the template exists', async () => {
    const mockTemplateName = 'testTemplate';
    const mockTemplateEntity = new MessageTemplateEntity('1', {
      name: mockTemplateName,
      status: EStatus.ACTIVE,
      body: 'Template body',
      provider: 1,
      deleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    (messageTemplateGateway.getTemplate as jest.Mock).mockResolvedValue(
      mockTemplateEntity,
    );

    const result = await messageTemplateGateway.getTemplate(mockTemplateName);

    expect(messageTemplateGateway.getTemplate).toHaveBeenCalledWith(
      mockTemplateName,
    );
    expect(result).toEqual(mockTemplateEntity);
  });

  it('should return null when the template does not exist', async () => {
    const mockTemplateName = 'nonExistentTemplate';

    (messageTemplateGateway.getTemplate as jest.Mock).mockResolvedValue(null);

    const result = await messageTemplateGateway.getTemplate(mockTemplateName);

    expect(messageTemplateGateway.getTemplate).toHaveBeenCalledWith(
      mockTemplateName,
    );
    expect(result).toBeNull();
  });

  it('should return null when the template name is not provided', async () => {
    const result = await messageTemplateGateway.getTemplate('');

    expect(messageTemplateGateway.getTemplate).toHaveBeenCalledWith('');
    expect(result).toBeUndefined();
  });

  it('should return null when the template name is null', async () => {
    const result = await messageTemplateGateway.getTemplate(null);

    expect(messageTemplateGateway.getTemplate).toHaveBeenCalledWith(null);
    expect(result).toBeUndefined();
  });
});
