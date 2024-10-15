import { Test, TestingModule } from '@nestjs/testing';
import { ConsumeMessageWhatsApp } from '../consume-message.whatsapp';
import { CompanyGateway } from '../../../gateways/db/company-gateway';
import { InstanceZapiGateway } from '../../../gateways/db/instanceZapi-gateway';
import { WhatsAppGateway } from '../../../gateways/externals/whatsApp-gateway';
import { Logger } from '@nestjs/common';
import { MessageDTO } from '../../../../infra/messaging/dtos/messageDTO';
import { randomUUID } from 'crypto';
import { EPriority } from '../../../common/enums/priority';
import { EProvider } from '../../../common/enums/provider';

describe('ConsumeMessageWhatsApp', () => {
  let service: ConsumeMessageWhatsApp;
  let companyGateway: CompanyGateway;
  let instanceZapiGateway: InstanceZapiGateway;
  let whatsAppGateway: WhatsAppGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsumeMessageWhatsApp,
        {
          provide: CompanyGateway,
          useValue: {
            getCompany: jest.fn(),
          },
        },
        {
          provide: InstanceZapiGateway,
          useValue: {
            getZapiInstanceByCompanyId: jest.fn(),
          },
        },
        {
          provide: WhatsAppGateway,
          useValue: {
            sendMessage: jest.fn(),
          },
        },
        Logger,
      ],
    }).compile();

    service = module.get<ConsumeMessageWhatsApp>(ConsumeMessageWhatsApp);
    companyGateway = module.get<CompanyGateway>(CompanyGateway);
    instanceZapiGateway = module.get<InstanceZapiGateway>(InstanceZapiGateway);
    whatsAppGateway = module.get<WhatsAppGateway>(WhatsAppGateway);
  });

  it('should send message successfully', async () => {
    const mockPayload: MessageDTO = {
      id: '123',
      company: {
        companyRegistrationNumber: '123456789',
        id: randomUUID().toString(),
      },
      to: 'recipient',
      message: 'Hello',
      type: 'text',
      file: null,
      priority: EPriority.LOW,
      provider: EProvider.WHATSAPP,
      template: 'common',
    };
    const mockCompany = {
      getId: jest.fn(() => 'company-id'),
      getCompanyRegistrationNumber: jest.fn(() => '123456789'),
    };
    const mockInstanceZapi = {
      getCode: jest.fn(() => 'zapi-code'),
      getToken: jest.fn(() => 'zapi-token'),
    };
    const mockResponse = { data: { messageId: 'message-id' }, status: 200 };

    (companyGateway.getCompany as jest.Mock).mockResolvedValue(mockCompany);
    (
      instanceZapiGateway.getZapiInstanceByCompanyId as jest.Mock
    ).mockResolvedValue(mockInstanceZapi);
    (whatsAppGateway.sendMessage as jest.Mock).mockResolvedValue(mockResponse);

    await service.execute(mockPayload);

    expect(companyGateway.getCompany).toHaveBeenCalledWith({
      companyRegistrationNumber: '123456789',
    });
    expect(instanceZapiGateway.getZapiInstanceByCompanyId).toHaveBeenCalledWith(
      { companyId: 'company-id' },
    );
    expect(whatsAppGateway.sendMessage).toHaveBeenCalledWith(
      {
        id: '123',
        accountData: {
          companyRegistrationNumber: '123456789',
          instance: 'zapi-code',
          token: 'zapi-token',
        },
        message: {
          to: 'recipient',
          message: 'Hello',
          type: 'text',
          file: null,
        },
      },
      undefined,
    );
  });

  it('should throw an error if company not found', async () => {
    const mockPayload: MessageDTO = {
      id: '123',
      company: {
        companyRegistrationNumber: '123456789',
        id: randomUUID().toString(),
      },
      to: 'recipient',
      message: 'Hello',
      type: 'text',
      file: null,
      priority: EPriority.LOW,
      provider: EProvider.WHATSAPP,
      template: 'common',
    };

    (companyGateway.getCompany as jest.Mock).mockResolvedValue(null);

    await expect(service.execute(mockPayload)).rejects.toThrow(
      'Company not found',
    );
  });

  it('should throw an error if instance zapi not found', async () => {
    const mockPayload: MessageDTO = {
      id: '123',
      company: {
        companyRegistrationNumber: '123456789',
        id: randomUUID().toString(),
      },
      to: 'recipient',
      message: 'Hello',
      type: 'text',
      file: null,
      priority: EPriority.LOW,
      provider: EProvider.WHATSAPP,
      template: 'common',
    };
    const mockCompany = { getId: jest.fn(() => 'company-id') };

    (companyGateway.getCompany as jest.Mock).mockResolvedValue(mockCompany);
    (
      instanceZapiGateway.getZapiInstanceByCompanyId as jest.Mock
    ).mockResolvedValue(null);

    await expect(service.execute(mockPayload)).rejects.toThrow(
      'Instance Zapi not found',
    );
  });

  it('should log and throw error if sendMessage fails', async () => {
    const mockPayload: MessageDTO = {
      id: '123',
      company: {
        companyRegistrationNumber: '123456789',
        id: randomUUID().toString(),
      },
      to: 'recipient',
      message: 'Hello',
      type: 'text',
      file: null,
      priority: EPriority.LOW,
      provider: EProvider.WHATSAPP,
      template: 'common',
    };
    const mockCompany = {
      getId: jest.fn(() => 'company-id'),
      companyRegistrationNumber: jest.fn(() => '123456789'),
    };
    const mockInstanceZapi = {
      getCode: jest.fn(() => 'zapi-code'),
      getToken: jest.fn(() => 'zapi-token'),
    };

    (companyGateway.getCompany as jest.Mock).mockResolvedValue(mockCompany);
    (
      instanceZapiGateway.getZapiInstanceByCompanyId as jest.Mock
    ).mockResolvedValue(mockInstanceZapi);
    (whatsAppGateway.sendMessage as jest.Mock).mockResolvedValue({
      data: null,
      status: 500,
    });

    await expect(service.execute(mockPayload)).rejects.toThrow(
      '[123] Error on send message',
    );
  });
});
