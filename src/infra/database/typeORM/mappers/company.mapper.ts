import { CompanyEntity } from 'src/application/entities/company.entity';
import { Company } from '../entities/company';

export class CompanyMapper {
  static toEntity(company: Company): CompanyEntity {
    return new CompanyEntity(company.id, {
      deleted: company.deleted,
      status: company.status,
      companyRegistrationNumber: company.companyRegistrationNumber,
      name: company.name,
      createdAt: company.createdAt,
      default: company.default,
    });
  }
  static toPersistence(company: CompanyEntity): Company {
    return {
      companyRegistrationNumber: company.getCompanyRegistrationNumber(),
      id: company.getId(),
      name: company.getName(),
      createdAt: company.getCreatedAt(),
      deleted: company.getDeleted(),
      default: company.getDefault(),
      status: company.getStatus(),
    };
  }
}
