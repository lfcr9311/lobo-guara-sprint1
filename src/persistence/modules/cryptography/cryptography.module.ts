import { Module } from '@nestjs/common'
import { CryptographyAdapter } from 'src/domain/adapters/cryptography'
import { BcryptIntegration } from 'src/persistence/integrations/cryptography/bcrypt'

@Module({
  providers: [{ provide: CryptographyAdapter, useClass: BcryptIntegration }],
  exports: [{ provide: CryptographyAdapter, useClass: BcryptIntegration }],
})
export class CryptographyModule {}
