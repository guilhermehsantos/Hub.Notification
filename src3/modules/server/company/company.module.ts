// import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
// import { AuthMiddleware } from 'src/modules/middlewares/auth.middleware';
// import { ProductUseCase } from '../product/useCases/product.usecase';
// import { ProductGateway } from '../product/repository/product.gateway';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Product } from 'src/infra/db/typeORM/entities/product';
// import { ProductModule } from '../product/product.module';

// @Module({
//   imports: [ProductModule, TypeOrmModule.forFeature([Product])],
//   controllers: [],
//   providers: [
//     ProductUseCase,
//     ProductGateway,
//     {
//       provide: 'IProductGateway',
//       useClass: ProductGateway,
//     },
//   ],
// })
// export class CompanyModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(AuthMiddleware).forRoutes('company');
//   }
// }
// A;
// //
