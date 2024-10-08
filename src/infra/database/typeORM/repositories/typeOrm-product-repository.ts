import { ProductGateway } from 'src/application/repositories/product-gateway';
import { Product } from '../entities/product';
import { ProductEntity } from 'src/application/entities/product.entity';
import { Repository } from 'typeorm';
import { ProductMapper } from '../mappers/product.mapper';

export class TypeOrmProductRepository implements ProductGateway {
  constructor(private _productRepository: Repository<Product>) {}
  async findByParams(
    id: string,
    status: number,
  ): Promise<ProductEntity | null> {
    const product = await this._productRepository.findOne({
      where: { id, status },
    });

    return ProductMapper.toEntity(product);
  }
}
