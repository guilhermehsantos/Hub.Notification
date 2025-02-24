import { ProductGateway } from '../../gateways/db/product-gateway';
import { ProductEntity } from '../../entities/product.entity';
import { Injectable } from '@nestjs/common';
import { EStatus } from '../../common/enums/status';

@Injectable()
export class GetProductByKey {
  constructor(private productGateway: ProductGateway) {}

  async execute(key: string): Promise<ProductEntity | null> {
    const product = await this.productGateway.findByParams(key, EStatus.ACTIVE);

    return product;
  }
}
