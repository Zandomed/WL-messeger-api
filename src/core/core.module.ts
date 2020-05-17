import { Module } from '@nestjs/common';
import { ValidationPipe } from './pipes/validation/validation.pipe';

@Module({
  providers: [ValidationPipe],
  exports: [ValidationPipe]
})
export class CoreModule {}
