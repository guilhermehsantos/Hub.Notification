import { Injectable, Logger } from '@nestjs/common';
import { CompanyGateway } from 'src/application/gateways/db/company-gateway';
import { InstanceZapiGateway } from 'src/application/gateways/db/instanceZapi-gateway';
import { MessageDTO } from 'src/infra/messaging/dtos/messageDTO';
import { WhatsAppGateway } from 'src/application/gateways/externals/whatsApp-gateway';

@Injectable()
export class ConsumeMessageWhatsApp {
  logger: Logger = new Logger(ConsumeMessageWhatsApp.name);

  constructor(
    private companyGateway: CompanyGateway,
    private instanceZapiGateway: InstanceZapiGateway,
    private readonly whatsAppGateway: WhatsAppGateway,
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

    try {
      // const response = await this.zApiService.sendTextMessage(instanceZapi, {
      //   message: payload.message,
      //   to: payload.to,
      // });

      const response = await this.whatsAppGateway.sendTextMessage({
        accountData: {
          cnpj: company.getCnpj(),
          instance: instanceZapi.getCode(),
          token: instanceZapi.getToken(),
        },
        message: {
          to: payload.to,
          message: payload.message,
        },
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
