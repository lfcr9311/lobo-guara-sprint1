import { Injectable, MethodNotAllowedException } from '@nestjs/common';
import { PrismaService } from '@persistence/config/prisma';
import { Institution } from '@domain/entities/institution';
import { UpdateInstitutionDto } from '@application/dtos/institution/update-institution.dto';
import { InstitutionRepository } from '@domain/repositories/institution.repository';
import { InstitutionMapper } from '@persistence/mappers/institution-mapper';

@Injectable()
export class PrismaInstitutionRepository implements InstitutionRepository {
  constructor(private readonly prisma: PrismaService) { }

  public async create(institution: Institution): Promise<Institution> {
    const prismaModel = InstitutionMapper.toPersistence(institution);
    const newInstitution = await this.prisma.institution.create({
      data: prismaModel,
      include: { user: true },
    });
    return InstitutionMapper.toDomain(newInstitution);
  }

  public async findById(id: string): Promise<Institution | null> {
    const institution = await this.prisma.institution.findFirst({
      where: {
        id,
        user: {
          deletedAt: null,
        },
      },
      include: { user: true },
    });

    if (!institution) {
      return null;
    }

    return InstitutionMapper.toDomain(institution);
  }

  public async findAll(): Promise<Institution[]> {
    const institutions = await this.prisma.institution.findMany({
      where: {
        user: {
          deletedAt: null,
        },
      },
      include: { 
        user: true 
      },
    });

    return institutions.map(InstitutionMapper.toDomain);
  }

  public async update(
    id: string,
    institution: Institution
  ): Promise<Institution> {
    const prismaInstitution = InstitutionMapper.toPersistence(institution)

    const updateInstitution = await this.prisma.institution.update({
      where: {
        id,
        user: {
          deletedAt: null,
        }
      },
      include: {
        user: true
      },
      data: prismaInstitution,
    })

    return InstitutionMapper.toDomain(updateInstitution)
  }

  public async delete(id: string): Promise<void> {
    const institution = await this.prisma.institution.findUnique({
      where: { id },
      select: { userId: true },
    });
  
    if (!institution) {
      throw new Error('Institution not found');
    }
  
    await this.prisma.user.update({
      where: { id: institution.userId },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  public async findByCnpj(cnpj: string): Promise<Institution | null> {
    const institution = await this.prisma.institution.findFirst({
      where: {
        cnpj,
      },
      include: { user: true },
    });

    if (!institution) {
      return null;
    }

    return InstitutionMapper.toDomain(institution);
  }
}