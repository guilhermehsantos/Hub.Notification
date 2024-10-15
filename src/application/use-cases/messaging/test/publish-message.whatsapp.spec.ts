import { Test, TestingModule } from '@nestjs/testing';
import { PublishMessageWhatsApp } from '../publish-message.whatsapp';
import { MessagePublisher } from '../../../../infra/messaging/publishers/message.publisher';
import { Logger } from '@nestjs/common';
import { MessageDTO } from '../../../../infra/messaging/dtos/messageDTO';
import { EPriority } from '../../../common/enums/priority';
import { randomUUID } from 'crypto';
import { EProvider } from '../../../common/enums/provider';

describe('PublishMessageWhatsApp', () => {
  let service: PublishMessageWhatsApp;
  let messagePublisher: MessagePublisher;
  let logger: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PublishMessageWhatsApp,
        {
          provide: MessagePublisher,
          useValue: {
            publishToHighPriorityQueue: jest.fn(),
            publishToLowPriorityhQueue: jest.fn(),
          },
        },
        Logger,
      ],
    }).compile();

    service = module.get<PublishMessageWhatsApp>(PublishMessageWhatsApp);
    messagePublisher = module.get<MessagePublisher>(MessagePublisher);
    logger = module.get<Logger>(Logger);

    jest.spyOn(service.logger, 'log');
  });

  it('should publish to high priority queue when priority is HIGH', async () => {
    const mockPayload: MessageDTO = {
      id: '123',
      priority: EPriority.HIGH,
      company: {
        companyRegistrationNumber: '123456789',
        id: randomUUID().toString(),
      },
      to: 'recipient',
      message: 'Hello',
      type: 'text',
      file: null,
      provider: EProvider.WHATSAPP,
      template: 'common',
    };

    await service.execute(mockPayload);

    expect(service.logger.log).toHaveBeenCalledWith(
      `[123] message distribuited by priority HIGH`,
    );
    expect(messagePublisher.publishToHighPriorityQueue).toHaveBeenCalledWith(
      mockPayload,
    );
  });

  it('should publish to low priority queue when priority is not HIGH', async () => {
    const mockPayload: MessageDTO = {
      id: '123',
      priority: EPriority.LOW,
      company: {
        companyRegistrationNumber: '123456789',
        id: randomUUID().toString(),
      },
      to: 'recipient',
      message: 'Hello',
      type: 'text',
      file: null,
      provider: EProvider.WHATSAPP,
      template: 'common',
    };

    await service.execute(mockPayload);

    expect(service.logger.log).toHaveBeenCalledWith(
      `[123] message distribuited by priority LOW`,
    );
    expect(messagePublisher.publishToLowPriorityhQueue).toHaveBeenCalledWith(
      mockPayload,
    );
  });
});
