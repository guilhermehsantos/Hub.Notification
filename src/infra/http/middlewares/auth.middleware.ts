import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Status } from 'src/application/common/enums/status';
import { ProductGateway } from 'src/application/repositories/product-gateway';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private productGateway: ProductGateway) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-product-key'];

    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }

    const key = await this.productGateway.findByParams(
      apiKey.toString(),
      Status.ACTIVE,
    );

    if (!key) {
      throw new UnauthorizedException('Invalid API key');
    }

    console.log(`${key.getName()} request`);

    next();
  }
}
