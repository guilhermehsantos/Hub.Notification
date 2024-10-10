import { ProductGateway } from 'src/application/repositories/product-gateway';
import { Product } from '../entities/product';
import { ProductEntity } from 'src/application/entities/product.entity';
import { Repository } from 'typeorm';
import { ProductMapper } from '../mappers/product.mapper';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmProductRepository implements ProductGateway {
  logger: Logger;
  constructor(
    @InjectRepository(Product)
    private _productRepository: Repository<Product>,
  ) {
    this.logger = new Logger('TypeOrmProductRepository');
  }

  async findByParams(
    key: string,
    status: number,
  ): Promise<ProductEntity | null> {
    const product = await this._productRepository.findOne({
      where: { key, status },
    });

    if (product) return ProductMapper.toEntity(product);
  }
}
