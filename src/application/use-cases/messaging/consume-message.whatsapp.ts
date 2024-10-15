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
      delay = delay || 0;
      const company = await this.companyGateway.getCompany({
        companyRegistrationNumber: payload.company.companyRegistrationNumber,
      });

      if (!company) throw new Error('Company not found');

      const instanceZapi =
        await this.instanceZapiGateway.getZapiInstanceByCompanyId({
          companyId: company.getId(),
        });

      if (!instanceZapi) throw new Error('Instance Zapi not found');

      this.logger.log(
        `[${payload.id}] Consume message to company ${company.getName()} - ${company.getCompanyRegistrationNumber()}`,
      );
      new Promise(() =>
        setTimeout(async () => {
          const response = await this.whatsAppGateway.sendMessage(
            {
              id: payload.id,
              accountData: {
                companyRegistrationNumber:
                  company.getCompanyRegistrationNumber(),
                instance: instanceZapi.getCode(),
                token: instanceZapi.getToken(),
                clientToken: instanceZapi.getClientToken(),
              },
              message: {
                to: payload.to,
                message: payload.message,
                type: payload.type,
                file: payload.file,
                fileName: payload.fileName,
              },
            },
            delay,
          );

          const { data, status } = response;
          if (!data?.messageId || status > 203)
            throw new Error(`[${payload.id}] Error on send message`);
        }, delay * 1000),
      );
    } catch (error) {
      this.logger.error(`[${payload.id}]  Error on consume message`);
      throw new Error(`[${payload.id}]  ${error.message}`);
    }
  }
}
