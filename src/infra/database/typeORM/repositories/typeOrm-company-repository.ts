import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EStatus } from 'src/application/common/enums/status';
import { CompanyEntity } from 'src/application/entities/company.entity';
import { CompanyGateway } from 'src/application/gateways/db/company-gateway';
import { Repository } from 'typeorm';
import { Company } from '../entities/company';
import { CompanyMapper } from '../mappers/company.mapper';

@Injectable()
export class TypeOrmCompanyRepository implements CompanyGateway {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async getCompany(params: {
    id: string;
    companyRegistrationNumber: string;
  }): Promise<CompanyEntity | null> {
    let company;
    if (params.id)
      company = await this.companyRepository.findOne({
        where: { id: params.id },
      });
    else if (params.companyRegistrationNumber)
      company = await this.companyRepository.findOne({
        where: {
          companyRegistrationNumber: params.companyRegistrationNumber,
          status: EStatus.ACTIVE,
        },
      });
    else
      company = await this.companyRepository.findOne({ where: { default: 1 } });

    if (!company) return null;

    return CompanyMapper.toEntity(company);
  }
}
