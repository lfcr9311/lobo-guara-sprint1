import { Module } from '@nestjs/common'
import { ExceptionsModule } from '../exceptions/exceptions.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { InstitutionModule } from '../institution/institution.module'
import { UserModule } from '../user/user.module'

@Module({
  imports: [ExceptionsModule, CryptographyModule, DatabaseModule,  InstitutionModule, UserModule],
})
export class AppModule {}
