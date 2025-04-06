import { Institution } from "@domain/entities/institution";
import { InstitutionStatusEnum as InstitutionStatusEnumDomain } from "@domain/entities/institution";
import { Institution as PrismaInstitution, User } from "@prisma/client";
import { Prisma } from "@prisma/client";

type PrismaInstitutionWithUser = PrismaInstitution & { user: User };

export class InstitutionMapper {
  static toDomain(institution: PrismaInstitutionWithUser): Institution {
    return new Institution(
      {
        cnpj: institution.cnpj,
        latitude: institution.latitude,
        longitude: institution.longitude,
        status: institution.status as InstitutionStatusEnumDomain,
        userId: institution.userId,
      },
      institution.id,
    );
  }

  static toPersistence(institution: Institution): PrismaInstitution {
    return {
      id: institution.id,
      latitude: institution.latitude,
      longitude: institution.longitude,
      userId: institution.userId,
      status: institution.status,
      cnpj: institution.cnpj,
    };
  }
}
