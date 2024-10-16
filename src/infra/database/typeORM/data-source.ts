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
  entities: [
    Company,
    PhoneNumber,
    BlackListPhone,
    InstanceZAPI,
    MessageTemplate,
    Product,
  ],
  migrations: ['dist/infra/database/typeORM/migrations/*{.js,.ts}'],
  synchronize: false,
  migrationsRun: true,
  logging: false,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
