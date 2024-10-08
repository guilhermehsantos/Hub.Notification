import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ProductEntity } from './entity/product.entity';
import { Product } from 'src3/infra/db/typeORM/entities/product';
import { ProductGateway } from './repository/product.gateway';
import { ProductUseCase } from './useCases/product.usecase';
import { IProductGateway } from './interfaces/IProductGateway';
// import {IProductRepository} from './interfaces/IProductRepository';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [
    ProductUseCase,
    ProductGateway,
    {
      provide: IProductGateway,
      useClass: ProductGateway,
    },
  ],
  exports: [IProductGateway],
})
export class ProductModule {}
