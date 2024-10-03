import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { ProductEntity } from './entity/product.entity';
import { Product } from 'src/infra/db/typeORM/entities/product';
import { ProductGateway } from './repository/product.gateway';
import { ProductUseCase } from './useCases/product.usecase';
import { Repository } from 'typeorm';
// import {IProductRepository} from './interfaces/IProductRepository';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [],
  providers: [
    ProductUseCase,
    ProductGateway,
    {
      provide: 'IProductGateway',
      useClass: ProductGateway,
    },
  ],
})
export class ProductModule {}
