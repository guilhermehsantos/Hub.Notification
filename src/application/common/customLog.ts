import { LoggerService } from '@nestjs/common';

export class CustomLogger implements LoggerService {
  log(message: string) {
    console.log(`[${new Date().toISOString()}] LOG: ${message}`);
  }

  error(message: string, trace: string) {
    console.error(
      `[${new Date().toISOString()}] ERROR: ${message} \nTrace: ${trace}`,
    );
  }

  warn(message: string) {
    console.warn(`[${new Date().toISOString()}] WARN: ${message}`);
  }
}
