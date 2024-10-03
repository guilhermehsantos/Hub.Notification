import { ProductEntity } from '../entity/product.entity';
import { Product } from 'src/infra/db/typeORM/entities/product';

export class ProductMapper {
  static toDomain(ProductEntity: ProductEntity): Product {
    const product = new Product();
    product.id = ProductEntity.id;
    product.name = ProductEntity.name;
    product.key = ProductEntity.key;
    product.deleted = ProductEntity.deleted;
    product.status = ProductEntity.status;
    product.updatedAt = ProductEntity.updatedAt;
    product.createdAt = ProductEntity.createdAt;
    return product;
  }

  static toEntity(Product: Product): ProductEntity {
    const productEntity = new ProductEntity(
      Product.id,
      Product.name,
      Product.key,
      Product.deleted,
      Product.status,
      Product.updatedAt,
      Product.createdAt,
    );
    return productEntity;
  }
}
