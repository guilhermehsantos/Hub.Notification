import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { DatabaseModule } from './infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MessagingModule } from './infra/messaging/messaging.module';
import { ApiServiceModule } from './external/ZAPI/zapi.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    HttpModule,
    DatabaseModule,
    MessagingModule,
    ApiServiceModule,
  ],
})
export class AppModule {}
