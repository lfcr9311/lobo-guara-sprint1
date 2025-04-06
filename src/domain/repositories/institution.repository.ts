import { Institution } from "../entities/institution";

export abstract class InstitutionRepository {
  abstract create(institution: Institution): Promise<Institution>;
  abstract findById(id: string): Promise<Institution | null>;
  abstract findByCnpj(cnpj: string): Promise<Institution | null>;
  abstract findAll(): Promise<Institution[]>;
  abstract update(id: string,institution: Institution): Promise<Institution>;
  abstract delete(id: string): Promise<void>;
}
