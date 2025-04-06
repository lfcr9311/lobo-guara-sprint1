import { CreateInstitutionDto } from "@application/dtos/institution/create-institution.dto";
import { CreateUserDTO } from "@application/dtos/user/create-user";
import { ExceptionsAdapter } from "@domain/adapters/exceptions";
import { Institution } from "@domain/entities/institution";
import { User } from "@domain/entities/user";
import { UserRepository } from "@domain/repositories/user.repository";
import { Injectable } from "@nestjs/common";
import { RoleEnum } from "@domain/entities/user";
import { UpdateInstitutionDto } from "@application/dtos/institution/update-institution.dto";
import { InstitutionRepository } from "@domain/repositories/institution.repository";
import { UserUseCase } from "../user/user.use-case";

@Injectable()
export class InstitutionUseCase {
    constructor(
        private institutionRepository: InstitutionRepository,
        private readonly exception: ExceptionsAdapter,
        private readonly userUseCase: UserUseCase,
    ) { }

    async createInstitution(institution: CreateInstitutionDto, user: CreateUserDTO): Promise<Institution | void> {

        const findInstitution = await this.userUseCase.findByEmail(user.email);
        if (findInstitution) {
            return this.exception.badRequest({
                message: "Already exist institution with this email",
            });
        }

        const findInstitutionByCnpj =
            await this.institutionRepository.findByCnpj(institution.cnpj);
        if (findInstitutionByCnpj) {
            return this.exception.badRequest({
                message: "Already exist institution with this cnpj",
            });
        }

        const newUser = new User({
            name: user.name,
            email: user.email,
            password: user.password,
            city: user.city,
            state: user.state,
            created_at: new Date(),
            phone: user.phone,
            role: RoleEnum.INSTITUTION,
            deleted_at: null,
            language: user.language,
            updated_at: new Date(),
        });

        const createdUser = await this.userUseCase.createUser(newUser);

        const newInstitution = new Institution({
            cnpj: institution.cnpj,
            latitude: institution.latitude,
            longitude: institution.longitude,
            userId: createdUser.id,
            status: institution.status,
        });

        return await this.institutionRepository.create(newInstitution);

    }

    async findById(id: string): Promise<Institution | void> {
        const institution =
            await this.institutionRepository.findById(id);

        if (!institution) {
            return this.exception.notFound({ message: "Institution not found" });
        }

        return institution;
    }

    async findAll() {
        return await this.institutionRepository.findAll();
    }

    async updateInstitution(institutionId: string, UpdateInstitutionDto: UpdateInstitutionDto): Promise<Institution | void> {
        const { cnpj, latitude, longitude } = UpdateInstitutionDto

        const institution = await this.institutionRepository.findById(institutionId);
        if (!institution) {
            return this.exception.notFound({
                message: "Not found a institution with this id",
            });
        }

        institution.setCnpj(cnpj ?? institution.getCnpj());
        institution.setLatitude(latitude ?? institution.getLatitude());
        institution.setLongitude(longitude ?? institution.getLongitude());

        return await this.institutionRepository.update(institutionId, institution);
    }

    async deleteInstitution(institutionId: string): Promise<void> {
        const institution =
            await this.institutionRepository.findById(institutionId);

        if (!institution) {
            return this.exception.notFound({ message: "Institution not found" });
        }

        await this.institutionRepository.delete(institutionId);
    }
}