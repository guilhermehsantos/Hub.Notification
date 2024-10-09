import { Module } from '@nestjs/common';
import { NewMessageModule } from './modules/server/newMessage/newMessage.module';
import { ProductModule } from './modules/server/product/product.module';
import { AppDataSource } from './infra/db/typeORM/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceModule } from './infra/db/typeORM/data-source.module';

@Module({
  imports: [
    NewMessageModule,
    ProductModule,
    DataSourceModule,
    TypeOrmModule.forRoot(AppDataSource.options),
  ],
})
export class AppModule {}
