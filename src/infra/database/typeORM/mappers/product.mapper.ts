import { ProductEntity } from 'src/application/entities/product.entity';
import { Product } from '../entities/product';

export class ProductMapper {
  static toEntity(product: Product): ProductEntity {
    return new ProductEntity(product.id, {
      name: product.name,
      key: product.key,
      deleted: product.deleted,
      status: product.status,
      updatedAt: product.updatedAt,
      createdAt: product.createdAt,
    });
  }

  static toPersistence(product: ProductEntity): Product {
    return {
      id: product.id,
      name: product.getName(),
      status: product.getStatus(),
      key: product.getKey(),
      deleted: product.getDeleted(),
      updatedAt: product.getUpdatedAt(),
      createdAt: product.getCreatedAt(),
    };
  }
}
