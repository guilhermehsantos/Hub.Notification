import { Module } from '@nestjs/common';
import { AppDataSource } from './data-source';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options)],
  providers: [],
})
export class DataSourceModule {}
