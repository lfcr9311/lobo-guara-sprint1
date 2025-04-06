import { Institution } from '@domain/entities/institution';
import { InstitutionRepository } from '@domain/repositories/institution-repository';

export class InMemoryInstitutionRepository implements InstitutionRepository {
  public institutions: Institution[] = [];

  async findById(id: string): Promise<Institution | null> {
    const institution = this.institutions.find((inst) => inst.getId() === id);
    return Promise.resolve(institution || null);
  }

  async findAll(): Promise<Institution[]> {
    return this.institutions;
  }
  async update(id: string, data: Partial<Institution>): Promise<Institution> {
      const index = this.institutions.findIndex((x) => x.getId() === id );

      if(index === -1){
        throw new Error('institution not found');
      }
      const institution = this.institutions[index];

      if (data.getLatitude() !== undefined) {
        institution.setLatitude(data.getLatitude());
      }
      if (data.getLongitude() !== undefined) {
        institution.setLongitude(data.getLongitude());
      }
      if (data.getCnpj() !== undefined) {
        institution.setCnpj(data.getCnpj());
      }
      if (data.getStatus() !== undefined) {
        institution.setStatus(data.getStatus());
      }
    
      this.institutions[index] = institution;
      return institution;
    }
  async delete(id: string): Promise<void> {
    const index = this.institutions.findIndex(inst => inst.getId() === id);
    if (index === -1) {
      throw new Error('Institution not found.');
    }
    this.institutions.splice(index, 1);
  }

  async create(institution: Institution): Promise<Institution> {
    const exists = this.institutions.some(inst => inst.getId() === institution.getId());
    if (exists) {
        throw new Error('Institution already created.');
    }
    this.institutions.push(institution);
    return institution;
  }
}