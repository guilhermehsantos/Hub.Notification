import { Test, TestingModule } from '@nestjs/testing';
import { ZApiService } from '../zapi.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { AxiosResponse } from 'axios';
import { SendMessageDTO } from '../../../application/dtos/sendMessageDto';

describe('ZApiService', () => {
  let service: ZApiService;
  let httpService: HttpService;

  const mockHttpService = {
    post: jest.fn(),
  };

  const mockSendMessageDto: SendMessageDTO = {
    id: '123',
    message: {
      to: '1234567890',
      message: 'Hello!',
      type: 'text',
      file: '',
    },
    accountData: {
      instance: 'test-instance',
      token: 'test-token',
      companyRegistrationNumber: '12345678901234',
      clientToken: 'test-client',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZApiService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<ZApiService>(ZApiService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send a text message successfully', async () => {
    const responseMock: AxiosResponse = {
      data: { success: true },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: undefined,
      },
    };

    mockHttpService.post.mockReturnValueOnce(of(responseMock));

    const result = await service.sendMessage(mockSendMessageDto);

    expect(result.status).toBe(200);
    expect(result.data.success).toBe(true);
    expect(httpService.post).toHaveBeenCalled();
    expect(httpService.post).toHaveBeenCalledWith(
      'http://test-url/instances/test-instance/token/test-token/send-text',
      {
        phone: '1234567890',
        message: 'Hello!',
        delayMessage: undefined,
      },
      {
        headers: {
          'Client-Token': 'test-client-token',
          'Content-Type': 'application/json',
        },
      },
    );
  });

  it('should send a media message (document) successfully', async () => {
    const mediaMessageDto: SendMessageDTO = {
      ...mockSendMessageDto,
      message: {
        ...mockSendMessageDto.message,
        type: 'document',
        file: 'data:application/pdf;base64,examplebase64string',
      },
    };

    const responseMock: AxiosResponse = {
      data: { success: true },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: undefined,
      },
    };

    mockHttpService.post.mockReturnValueOnce(of(responseMock));

    const result = await service.sendMessage(mediaMessageDto);

    expect(result.status).toBe(200);
    expect(result.data.success).toBe(true);
    expect(httpService.post).toHaveBeenCalled();
    expect(httpService.post).toHaveBeenCalledWith(
      'http://test-url/instances/test-instance/token/test-token/send-document/application/pdf',
      {
        phone: '1234567890',
        document: 'data:application/pdf;base64,examplebase64string',
        delayMessage: undefined,
        caption: 'Hello!',
      },
      {
        headers: {
          'Client-Token': 'test-client-token',
          'Content-Type': 'application/json',
        },
      },
    );
  });

  it('should throw an error if the message send fails', async () => {
    mockHttpService.post.mockReturnValueOnce(
      throwError(() => new Error('Failed to send message')),
    );

    await expect(service.sendMessage(mockSendMessageDto)).rejects.toThrowError(
      'Failed to send message',
    );
  });
});
