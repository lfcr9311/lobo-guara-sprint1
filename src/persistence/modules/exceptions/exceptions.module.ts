import { ExceptionsAdapter } from '@domain/adapters/exceptions'
import { Module } from '@nestjs/common'
import { ExceptionsIntegration } from '@persistence/integrations/exceptions'
@Module({
  providers: [{ provide: ExceptionsAdapter, useClass: ExceptionsIntegration }],
  exports: [{ provide: ExceptionsAdapter, useClass: ExceptionsIntegration }],
})
export class ExceptionsModule {}
