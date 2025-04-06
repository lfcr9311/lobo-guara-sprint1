import { createId } from "@paralleldrive/cuid2"

export enum LanguageEnum {
  PORTUGUESE = 'PORTUGUESE',
  ENGLISH = 'ENGLISH',
  SPANISH = 'SPANISH',
}

export enum RoleEnum {
  ADMIN = 'ADMIN',
  REFUGIE = 'REFUGIE',
  INSTITUTION = 'INSTITUTION',
}

interface UserInterface {
  name: string
  email: string
  password: string
  phone: string
  city: string
  state: string
  language: LanguageEnum
  created_at: Date
  deleted_at: Date | null
  updated_at: Date
  role: RoleEnum
}

export class User {
  id: string
  name: string
  email: string
  password: string
  phone: string
  city: string
  state: string
  language: LanguageEnum
  created_at: Date
  deleted_at: Date | null
  updated_at: Date
  role: RoleEnum

  constructor(user: UserInterface, id?: string) {
    this.id = id ?? createId()
    this.name = user.name
    this.email = user.email
    this.password = user.password
    this.phone = user.phone
    this.city = user.city
    this.state = user.state
    this.language = user.language
    this.created_at = user.created_at
    this.deleted_at = user.deleted_at
    this.updated_at = user.updated_at
    this.role = user.role
  }

  public getId(): string {
    return this.id
  }

  public getName(): string {
    return this.name
  }

  public getEmail(): string {
    return this.email
  }

  public getPassword(): string {
    return this.password
  }

  public getPhone(): string {
    return this.phone
  }

  public getCity(): string {
    return this.city
  }

  public getState(): string {
    return this.state
  }

  public getLanguage(): LanguageEnum {
    return this.language
  }

  public getCreatedAt(): Date {
    return this.created_at
  }

  public getDeletedAt(): Date | null {
    return this.deleted_at
  }

  public getUpdatedAt(): Date | null {
    return this.updated_at
  }

  public getRole(): RoleEnum {
    return this.role
  }

  public setName(name: string): void {
    this.name = name
  }

  public setEmail(email: string): void {
    this.email = email
  }

  public setPassword(password: string): void {
    this.password = password
  }

  public setPhone(phone: string): void {
    this.phone = phone
  }

  public setCity(city: string): void {
    this.city = city
  }

  public setState(state: string): void {
    this.state = state
  }

  public setLanguage(language: LanguageEnum): void {
    this.language = language
  }

  public setCreatedAt(createdAt: Date): void {
    this.created_at = createdAt
  }

  public setDeletedAt(deletedAt: Date | null): void {
    this.deleted_at = deletedAt
  }

  public setUpdatedAt(updatedAt: Date | null): void {
    this.updated_at = updatedAt
  }

  public setRole(role: RoleEnum): void {
    this.role = role
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      city: this.city,
      state: this.state,
      language: this.language,
      created_at: this.created_at,
      deleted_at: this.deleted_at,
      updated_at: this.updated_at,
      role: this.role,
    }
  }
}
