import { DataSource } from 'typeorm';
import { Company } from './entities/company';
import { PhoneNumber } from './entities/phoneNumber';
import { BlackListPhone } from './entities/blackListPhone';
import { InstanceZAPI } from './entities/instanceZAPI';
import { MessageTemplate } from './entities/messageTemplate';
import { Product } from './entities/product';
import { EnvConfig } from '../../config/configuration';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: EnvConfig.DATABASE_HOST,
  port: EnvConfig.DATABASE_PORT,
  username: EnvConfig.DATABASE_USERNAME,
  password: EnvConfig.DATABASE_PASSWORD,
  database: EnvConfig.DATABASE,
  // entities: ['src/infra/database/typeORM/entities/*.{ts,js}'],
  entities: [
    Company,
    PhoneNumber,
    BlackListPhone,
    InstanceZAPI,
    MessageTemplate,
    Product,
  ],
  migrations: ['src/infra/database/typeORM/migrations/*.js'],
  synchronize: false,
  logging: false,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
