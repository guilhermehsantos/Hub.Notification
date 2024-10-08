import {
  Inject,
  Injectable,
  // Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Status } from '../../core/common/enums/status';
// import { ProductRepository } from 'src/modules/server/product/repository/product.repository';
import { ProductUseCase } from '../server/product/useCases/product.usecase';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject('ProductUseCase')
    private useCaseProduct: ProductUseCase,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-product-key'];

    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }

    const key = await this.useCaseProduct.findProductByKey(
      apiKey.toString(),
      Status.ACTIVE,
    );

    if (!key) {
      throw new UnauthorizedException('Invalid API key');
    }

    next();
  }
}
