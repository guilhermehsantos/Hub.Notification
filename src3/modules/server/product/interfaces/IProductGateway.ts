import { ProductEntity } from '../entity/product.entity';

export abstract class IProductGateway {
  abstract findByParams(
    id: string,
    status: number,
  ): Promise<ProductEntity | null>;
}
