import { InstanceZapiEntity } from '../entities/instanceZapi.entity';

export abstract class InstanceZapiGateway {
  abstract getZapiInstanceByCompanyId(params: {
    companyId?: string;
  }): Promise<InstanceZapiEntity | null>;
}
