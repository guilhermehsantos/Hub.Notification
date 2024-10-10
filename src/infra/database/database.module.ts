import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './typeORM/data-source';
import { ProductGateway } from 'src/application/repositories/product-gateway';
import { TypeOrmProductRepository } from './typeORM/repositories/typeOrm-product-repository';
import { Product } from './typeORM/entities/product';
import { CompanyGateway } from 'src/application/repositories/company-gateway';
import { TypeOrmCompanyRepository } from './typeORM/repositories/typeOrm-company-repository';
import { Company } from './typeORM/entities/company';
import { InstanceZapiGateway } from 'src/application/repositories/instanceZapi-gateway';
import { TypeOrmInstanceZapiRepository } from './typeORM/repositories/typeOrm-instanceZapi-repository';
import { InstanceZAPI } from './typeORM/entities/instanceZAPI';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([Company]),
    TypeOrmModule.forFeature([InstanceZAPI]),
  ],
  providers: [
    {
      provide: ProductGateway,
      useClass: TypeOrmProductRepository,
    },
    {
      provide: CompanyGateway,
      useClass: TypeOrmCompanyRepository,
    },
    {
      provide: InstanceZapiGateway,
      useClass: TypeOrmInstanceZapiRepository,
    },
  ],
  exports: [ProductGateway, CompanyGateway, InstanceZapiGateway],
})
export class DatabaseModule {}
