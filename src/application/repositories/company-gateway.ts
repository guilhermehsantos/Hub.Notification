import { CompanyEntity } from '../entities/company.entity';

export abstract class CompanyGateway {
  abstract getCompany(params: {
    cnpj?: string;
    id?: string;
    default?: boolean;
  }): Promise<CompanyEntity | null>;
}
