import { ProductEntity } from 'src/application/entities/product.entity';

export abstract class ProductGateway {
  abstract findByParams(
    id: string,
    status: number,
  ): Promise<ProductEntity | null>;
}
