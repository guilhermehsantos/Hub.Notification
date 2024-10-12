import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ZApiService } from './zapi.service';
import { WhatsAppGateway } from 'src/application/gateways/externals/whatsApp-gateway';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: WhatsAppGateway,
      useClass: ZApiService,
    },
  ],
  exports: [WhatsAppGateway],
})
export class ApiServiceModule {}
