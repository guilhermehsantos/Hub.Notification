import { ProductGateway } from '../repositories/product-gateway';
import { ProductEntity } from '../entities/product.entity';

export class GetProductByKey {
  constructor(private productGateway: ProductGateway) {}

  async execute(key: string): Promise<ProductEntity | null> {
    const product = await this.productGateway.findByParams(key, 1);

    return product;
  }
}
