import {
  LanguageEnum as LanguageEnumDomain,
  RoleEnum as RoleEnumDomain,
  User,
} from '@domain/entities/user'
import { LanguageEnum, User as PrismaUser, RoleEnum } from '@prisma/client'

export class UserMapper {
  static toDomain(user: PrismaUser): User {
    const model = new User(
      {
        name: user.name,
        email: user.email,
        password: user.password,
        phone: user.phone,
        city: user.city,
        state: user.state,
        language: user.language as LanguageEnumDomain,
        created_at: user.createdAt,
        deleted_at: user.deletedAt,
        updated_at: user.updatedAt,
        role: user.role as RoleEnumDomain,
      },
      user.id,
    )
    return model
  }

  static toPersistence(user: User): PrismaUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      city: user.city,
      state: user.state,
      language: user.language as LanguageEnum,
      createdAt: user.created_at,
      deletedAt: user.deleted_at,
      updatedAt: user.updated_at,
      role: user.role as RoleEnum,
    }
  }
}
