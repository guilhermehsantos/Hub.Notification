import { MessageTemplateEntity } from '../../entities/messageTemplate.entity';
import { EStatus } from '../../common/enums/status';

describe('MessageTemplateEntity', () => {
  let messageTemplate: MessageTemplateEntity;

  const mockTemplatePayload = {
    companyId: '12345',
    name: 'Welcome Template',
    status: EStatus.ACTIVE,
    description: 'A template for welcome messages',
    body: 'Welcome to our service!',
    provider: 1,
    deleted: false,
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-01-01'),
  };

  beforeEach(() => {
    messageTemplate = new MessageTemplateEntity('1', mockTemplatePayload);
  });

  it('should initialize with correct values', () => {
    expect(messageTemplate.getId()).toBe('1');
    expect(messageTemplate.getCompanyId()).toBe('12345');
    expect(messageTemplate.getName()).toBe('Welcome Template');
    expect(messageTemplate.getStatus()).toBe(EStatus.ACTIVE);
    expect(messageTemplate.getDescription()).toBe(
      'A template for welcome messages',
    );
    expect(messageTemplate.getBody()).toBe('Welcome to our service!');
    expect(messageTemplate.getProvider()).toBe(1);
    expect(messageTemplate.isDeleted()).toBe(false);
    expect(messageTemplate.getCreatedAt()).toEqual(new Date('2023-01-01'));
    expect(messageTemplate.getUpdatedAt()).toEqual(new Date('2023-01-01'));
  });

  it('should update name and timestamp', () => {
    const newName = 'Updated Template';
    messageTemplate.updateName(newName);
    expect(messageTemplate.getName()).toBe(newName);
    expect(messageTemplate.getUpdatedAt()).toBeInstanceOf(Date); // Verifica se o timestamp foi atualizado
  });

  it('should update status and timestamp', () => {
    messageTemplate.updateStatus(EStatus.INACTIVE);
    expect(messageTemplate.getStatus()).toBe(EStatus.INACTIVE);
    expect(messageTemplate.getUpdatedAt()).toBeInstanceOf(Date);
  });

  it('should update description and timestamp', () => {
    const newDescription = 'Updated description';
    messageTemplate.updateDescription(newDescription);
    expect(messageTemplate.getDescription()).toBe(newDescription);
    expect(messageTemplate.getUpdatedAt()).toBeInstanceOf(Date);
  });

  it('should update body and timestamp', () => {
    const newBody = 'Updated body text';
    messageTemplate.updateBody(newBody);
    expect(messageTemplate.getBody()).toBe(newBody);
    expect(messageTemplate.getUpdatedAt()).toBeInstanceOf(Date);
  });

  it('should mark template as deleted and update timestamp', () => {
    messageTemplate.markAsDeleted();
    expect(messageTemplate.isDeleted()).toBe(true);
    expect(messageTemplate.getUpdatedAt()).toBeInstanceOf(Date);
  });
});
