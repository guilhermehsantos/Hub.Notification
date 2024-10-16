import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductEntity } from 'src/application/entities/product.entity';
import { GetProductByKey } from 'src/application/use-cases/product/get-product-by-key';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private getProductByKey: GetProductByKey) {}

  @Get(':key')
  async getByKey(@Param('key') key: string): Promise<ProductEntity> {
    if (!key) {
      throw new Error('Key is required');
    }
    return this.getProductByKey.execute(key);
  }
}
