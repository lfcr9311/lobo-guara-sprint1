import { User } from '@domain/entities/user'
import { Injectable } from '@nestjs/common'

@Injectable()
export abstract class UserRepository {
  public abstract createUser(user: User): Promise<User>
  public abstract findUserByEmail(email: string): Promise<User | null>
  public abstract findAll(): Promise<User[]>
  public abstract findByEmail(email: string): Promise<User | null>
  public abstract findUserById(id: string): Promise<User | null>
  public abstract updateUser(id: string, user: User): Promise<User>
  public abstract delete(id: string): Promise<boolean>
}
