import { User } from '@domain/entities/user'
import { UserRepository } from '@domain/repositories/user.repository'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@persistence/config/prisma'
import { UserMapper } from '@persistence/mappers/user-mapper'

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) { }

  public async createUser(user: User): Promise<User> {
    const prismaModel = UserMapper.toPersistence(user)
    const newUser = await this.prisma.user.create({
      data: prismaModel,
    })

    return UserMapper.toDomain(newUser)
  }

  public async updateUser(id: string, user: User): Promise<User> {
    const prismaUser = UserMapper.toPersistence(user)

    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: prismaUser,
    })

    return UserMapper.toDomain(updatedUser)
  }

  public async findUserById(id: string): Promise<User | null> {
    const findById = await this.prisma.user.findFirst({
      where: {
        id,
      },
    })

    if (!findById) {
      return null
    }

    return UserMapper.toDomain(findById)
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
        deletedAt: null,
      }
    })

    return user ? UserMapper.toDomain(user) : null
  }

  public async findAll(): Promise<User[]> {
    const findUsers = await this.prisma.user.findMany({
      where: {
        deletedAt: null,
      },
    })

    return findUsers.map(UserMapper.toDomain)
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
        deletedAt: null,
      },
    })

    return user ? UserMapper.toDomain(user) : null
  }

  public async delete(id: string): Promise<boolean> {
    const deletedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    })

    return !!deletedUser
  }
}
