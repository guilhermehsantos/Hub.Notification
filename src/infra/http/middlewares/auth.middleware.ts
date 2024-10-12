import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { EStatus } from 'src/application/common/enums/status';
import { ProductGateway } from 'src/application/gateways/db/product-gateway';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  logger: Logger = new Logger('AuthMiddleware');
  constructor(private productGateway: ProductGateway) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-product-key'];

    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }

    const key = await this.productGateway.findByParams(
      apiKey.toString(),
      EStatus.ACTIVE,
    );

    if (!key) {
      throw new UnauthorizedException('Invalid API key');
    }

    req.body.productKey = apiKey;
    req.body.product = key.getName();
    req.body.companyId = null;
    this.logger.log(`Access ${key.getName()} product`);

    next();
  }
}
