import { Module } from '@nestjs/common';
// import { CompanyModule } from './modules/server/company/company.module';
import { NewMessageModule } from './modules/server/newMessage/newMessage.module';
// import { ProductUseCase } from './modules/server/product/useCases/product.usecase';
import { ProductModule } from './modules/server/product/product.module';
import { AppDataSource } from './infra/db/typeORM/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceModule } from './infra/db/typeORM/data-source.module';
import { AuthMiddleware } from './modules/middlewares/auth.middleware';

@Module({
  imports: [
    // CompanyModule,
    NewMessageModule,
    ProductModule,
    DataSourceModule,
    TypeOrmModule.forRoot(AppDataSource.options),
  ],
})
export class AppModule {}
