import { Injectable, Logger } from '@nestjs/common';
import { CompanyGateway } from '../../gateways/db/company-gateway';
import { InstanceZapiGateway } from '../../gateways/db/instanceZapi-gateway';
import { MessageDTO } from '../../../infra/messaging/dtos/messageDTO';
import { WhatsAppGateway } from '../../gateways/externals/whatsApp-gateway';

@Injectable()
export class ConsumeMessageWhatsApp {
  logger: Logger = new Logger(ConsumeMessageWhatsApp.name);

  constructor(
    private companyGateway: CompanyGateway,
    private instanceZapiGateway: InstanceZapiGateway,
    private readonly whatsAppGateway: WhatsAppGateway,
  ) {}
  async execute(payload: MessageDTO, delay?: number): Promise<void> {
    try {
      const company = await this.companyGateway.getCompany({
        cnpj: payload.company.cnpj,
      });

      if (!company) throw new Error('Company not found');

      const instanceZapi =
        await this.instanceZapiGateway.getZapiInstanceByCompanyId({
          companyId: company.getId(),
        });

      if (!instanceZapi) throw new Error('Instance Zapi not found');

      const response = await this.whatsAppGateway.sendMessage(
        {
          id: payload.id,
          accountData: {
            cnpj: company.getCnpj(),
            instance: instanceZapi.getCode(),
            token: instanceZapi.getToken(),
          },
          message: {
            to: payload.to,
            message: payload.message,
            type: payload.type,
            file: payload.file,
          },
        },
        delay,
      );

      const { data, status } = response;
      if (!data?.messageId)
        throw new Error(`[${payload.id}] Error on send message`);
    } catch (error) {
      this.logger.error(`[${payload.id}]  Error on consume message`);
      throw new Error(`[${payload.id}]  ${error.message}`);
    }
  }
}
