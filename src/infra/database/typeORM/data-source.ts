import { DataSource } from 'typeorm';
import { Company } from './entities/company';
import { PhoneNumber } from './entities/phoneNumber';
import { BlackListPhone } from './entities/blackListPhone';
import { InstanceZAPI } from './entities/instanceZAPI';
import { MessageTemplate } from './entities/messageTemplate';
import { Product } from './entities/product';
import { ConfigModule, ConfigService } from '@nestjs/config';

ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '../../../../.env',
});

const configService = new ConfigService();
console.log('DB_HOST:', configService.get<string>('DB_HOST'));
console.log('DB_USERNAME:', configService.get<string>('DB_USERNAME'));
console.log('DB_PASSWORD:', configService.get<string>('DB_PASSWORD'));
console.log('DB_NAME:', configService.get<string>('DB_NAME'));

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST') || 'localhost',
  port: configService.get<number>('DATABASE_PORT') || 5432,
  username: configService.get<string>('DATABASE_NAME') || 'postgres',
  password: configService.get<string>('DATABASE_PASSWORD') || 'postgres',
  database: configService.get<string>('DATABASE') || 'notification',
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
