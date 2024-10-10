import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { CompanyGateway } from 'src/application/repositories/company-gateway';
import { InstanceZapiGateway } from 'src/application/repositories/instanceZapi-gateway';
import { MessageDTO } from 'src/infra/messaging/dtos/messageDTO';
import { firstValueFrom } from 'rxjs';
import { ZApiService } from 'src/external/ZAPI/zapi.service';

@Injectable()
export class ConsumeMessageWhatsApp {
  logger: Logger = new Logger(ConsumeMessageWhatsApp.name);

  constructor(
    private companyGateway: CompanyGateway,
    private instanceZapiGateway: InstanceZapiGateway,
    private readonly httpService: HttpService,
    private readonly zApiService: ZApiService,
  ) {}
  async execute(payload: MessageDTO): Promise<void> {
    const company = await this.companyGateway.getCompany({
      cnpj: payload.company.cnpj,
    });

    if (!company) throw new Error('Company not found');

    const instanceZapi =
      await this.instanceZapiGateway.getZapiInstanceByCompanyId({
        companyId: company.getId(),
      });

    if (!instanceZapi) throw new Error('Instance Zapi not found');

    const url = `https://api.z-api.io/instances/${instanceZapi.getCode()}/token/${instanceZapi.getToken()}/send-text`;
    try {
      const response = await this.zApiService.sendTextMessage(instanceZapi, {
        message: payload.message,
        to: payload.to,
      });
      this.logger.log(response);
    } catch (error) {
      console.error('Erro ao fazer a requisição: ', error.message);
    }

    this.logger.log(
      'Consume message from WhatsApp',
      payload,
      company,
      instanceZapi,
    );
  }
}
