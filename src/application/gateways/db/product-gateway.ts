import { ProductEntity } from '../../entities/product.entity';

export abstract class ProductGateway {
  abstract findByParams(
    key: string,
    status: number,
  ): Promise<ProductEntity | null>;
}
