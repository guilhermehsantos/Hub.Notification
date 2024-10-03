import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { NewMessageController } from './controllers/newMessage.controller';
import { ProductModule } from '../product/product.module';
import { ProductUseCase } from '../product/useCases/product.usecase';
import { ProductGateway } from '../product/repository/product.gateway';
import { Product } from 'src/infra/db/typeORM/entities/product';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ProductModule, TypeOrmModule.forFeature([Product])],
  controllers: [NewMessageController],
  providers: [
    ProductUseCase,
    ProductGateway,
    {
      provide: 'IProductGateway',
      useClass: ProductGateway,
    },
  ],
})
export class NewMessageModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('new-mesage');
  }
}
