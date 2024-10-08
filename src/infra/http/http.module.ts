import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { GetProductByKey } from 'src/application/use-cases/get-product-by-key';
import { ProductController } from './controllers/product.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [GetProductByKey],
})
export class HttpModule {}
