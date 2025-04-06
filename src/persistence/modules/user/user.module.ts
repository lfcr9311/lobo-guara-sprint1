import { Module } from '@nestjs/common'
import { UserController } from '@persistence/controllers/user.controller'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { ExceptionsModule } from '../exceptions/exceptions.module'
import { UserUseCase } from '@application/use-cases/user/user.use-case'

@Module({
  imports: [DatabaseModule, ExceptionsModule, CryptographyModule],
  controllers: [UserController],
  providers: [
    UserUseCase
  ],
})
export class UserModule {}
