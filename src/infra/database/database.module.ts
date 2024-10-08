import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './typeORM/data-source';
import { ProductGateway } from 'src/application/repositories/product-gateway';
import { TypeOrmProductRepository } from './typeORM/repositories/typeOrm-product-repository';
import { Product } from './typeORM/entities/product';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    TypeOrmModule.forFeature([Product]),
  ],
  providers: [
    {
      provide: ProductGateway,
      useClass: TypeOrmProductRepository,
    },
  ],
  exports: [ProductGateway],
})
export class DatabaseModule {}
