import { Module } from '@nestjs/common';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { DatabaseModule } from '../database/database.module';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { InstitutionController } from '@persistence/controllers/institution.controller';
import { InstitutionUseCase } from '@application/use-cases/institution/institution.use-case';
import { UserUseCase } from '@application/use-cases/user/user.use-case';

@Module({
    imports: [
        DatabaseModule,
        ExceptionsModule,
        CryptographyModule,
    ],
    controllers: [InstitutionController],
    providers: [InstitutionUseCase, UserUseCase],
})
export class InstitutionModule {}
