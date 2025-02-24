import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstanceZapiEntity } from 'src/application/entities/instanceZapi.entity';
import { InstanceZapiGateway } from 'src/application/gateways/db/instanceZapi-gateway';
import { InstanceZAPI } from '../entities/instanceZAPI';
import { Repository } from 'typeorm';
import { EStatus } from 'src/application/common/enums/status';
import { InstanceZapiMapper } from '../mappers/instanceZapi.mapper';

@Injectable()
export class TypeOrmInstanceZapiRepository implements InstanceZapiGateway {
  constructor(
    @InjectRepository(InstanceZAPI)
    private readonly instanceZapiRepository: Repository<InstanceZAPI>,
  ) {}
  async getZapiInstanceByCompanyId(params: {
    companyId?: string;
  }): Promise<InstanceZapiEntity | null> {
    const instanceZapi = await this.instanceZapiRepository
      .createQueryBuilder('instanceZapi')
      .select([
        'instanceZapi.id',
        'instanceZapi.phoneNumberId',
        'instanceZapi.code',
        'instanceZapi.token',
        'instanceZapi.type',
        'instanceZapi.status',
        'instanceZapi.createdBy',
        'instanceZapi.createdAt',
        'instanceZapi.clientToken',
      ])
      .innerJoin(
        'phone_number',
        'phoneNumber',
        'phoneNumber.id = instanceZapi.phoneNumberId',
      )
      .innerJoin('company', 'company', 'company.id = phoneNumber.companyId')
      .where(
        'company.id = :id and company.status = :companyStatus and phoneNumber.deleted = :phoneNumberStatus and instanceZapi.status = :instanceStatus',
        {
          id: params.companyId,
          companyStatus: EStatus.ACTIVE,
          phoneNumberStatus: false,
          instanceStatus: EStatus.ACTIVE,
        },
      )
      .getOne();

    return InstanceZapiMapper.toEntity(instanceZapi);
  }
}
