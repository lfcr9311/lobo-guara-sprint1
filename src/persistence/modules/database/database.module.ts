import { InstitutionRepository } from '@domain/repositories/institution.repository'
import { UserRepository } from '@domain/repositories/user.repository'
import { Module } from '@nestjs/common'
import { PrismaService } from '@persistence/config/prisma'
import { PrismaInstitutionRepository } from '@persistence/repositories/prisma/institution'
import { PrismaUserRepository } from '@persistence/repositories/prisma/user'

@Module({
  providers: [
    PrismaService,

    { useClass: PrismaInstitutionRepository,
      provide: InstitutionRepository
    },
    {
      useClass: PrismaUserRepository,
      provide: UserRepository
    }
  ],

  exports: [ InstitutionRepository, UserRepository],
})
export class DatabaseModule {}
