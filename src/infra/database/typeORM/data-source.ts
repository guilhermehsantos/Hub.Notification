import { DataSource } from 'typeorm';
import { Company } from './entities/company';
import { PhoneNumber } from './entities/phoneNumber';
import { BlackListPhone } from './entities/blackListPhone';
import { InstanceZAPI } from './entities/instanceZAPI';
import { MessageTemplate } from './entities/messageTemplate';
import { Product } from './entities/product';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'notification',
  entities: [
    Company,
    PhoneNumber,
    BlackListPhone,
    InstanceZAPI,
    MessageTemplate,
    Product,
  ],
  migrations: ['src/infra/db/typeORM/migrations/*.ts'],
  synchronize: false,
  logging: true,
});
