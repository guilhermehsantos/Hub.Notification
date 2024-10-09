import { DataSource } from 'typeorm';
import { Company } from './entities/company';
import { PhoneNumber } from './entities/phoneNumber';
import { BlackListPhone } from './entities/blackListPhone';
import { InstanceZAPI } from './entities/instanceZAPI';
import { MessageTemplate } from './entities/messageTemplate';
import { Product } from './entities/product';
import { EnvConfig } from '../../config/configuration';

console.log('DB_HOST:', EnvConfig.DATABASE_HOST);
console.log('DB_USERNAME:', EnvConfig.DATABASE_USERNAME);
console.log('DB_PASSWORD:', EnvConfig.DATABASE_PASSWORD);
console.log('DB_NAME:', EnvConfig.DATABASE);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: EnvConfig.DATABASE_HOST || 'localhost',
  port: EnvConfig.DATABASE_PORT || 5432,
  username: EnvConfig.DATABASE_USERNAME || 'postgres',
  password: EnvConfig.DATABASE_PASSWORD || 'postgres',
  database: EnvConfig.DATABASE || 'notification',
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
