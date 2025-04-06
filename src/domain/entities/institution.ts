import { createId } from "@paralleldrive/cuid2";
import { randomUUID } from "crypto";

export enum InstitutionStatusEnum {
  WAITING = 'WAITING',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
interface InstitutionInterface {
  cnpj?: string;
  latitude: number;
  longitude: number;
  userId: string;
  status: InstitutionStatusEnum;
}
  export class Institution {
  id: string;
  cnpj?: string;
  latitude: number;
  longitude: number;
  userId: string;
  status: InstitutionStatusEnum;

  constructor(institution: InstitutionInterface, id?: string) {
    this.id = id ?? createId();
    this.cnpj = institution.cnpj;
    this.latitude = institution.latitude;
    this.longitude = institution.longitude;
    this.userId = institution.userId;
    this.status = institution.status;
  }

  public getId(): string {
    return this.id;
  }
  public getCnpj(): string | undefined {
    return this.cnpj;
  }
  public getLatitude(): number {
    return this.latitude;
  }
  public getLongitude(): number {
    return this.longitude;
  }
  public getUserId(): string {
    return this.userId;
  }
  public getStatus(): InstitutionStatusEnum {
    return this.status;
  }
  public setCnpj(cnpj: string): void {
    this.cnpj = cnpj;
  }
  public setLatitude(latitude: number): void {
    this.latitude = latitude;
  }
  public setLongitude(longitude: number): void {
    this.longitude = longitude;
  }
  public setUserId(userId: string): void {
    this.userId = userId;
  }
  public setStatus(status: InstitutionStatusEnum): void {
    this.status = status;
  }
}