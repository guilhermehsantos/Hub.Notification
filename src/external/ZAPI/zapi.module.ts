import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ZApiService } from './zapi.service';

@Module({
  imports: [HttpModule],
  providers: [ZApiService],
  exports: [ZApiService],
})
export class ApiServiceModule {}
