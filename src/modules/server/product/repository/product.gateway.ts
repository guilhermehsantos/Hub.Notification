import { Injectable } from '@nestjs/common';
import { IProductGateway as IProductGateway } from '../interfaces/IProductGateway';
import { Product } from '../../../../infra/db/typeORM/entities/product';
// import { ProductEntity } from '../entity/product.entity';
// import { Status } from 'src/core/common/enums/status';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductGateway implements IProductGateway {
  constructor(
    @InjectRepository(Product)
    private readonly _productRepository: Repository<Product>,
  ) {}
  findByParams(id: string, status: number): Promise<Product | null> {
    return this._productRepository.findOne({ where: { id, status } });
  }
}
