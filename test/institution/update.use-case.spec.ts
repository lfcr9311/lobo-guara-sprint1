import { UpdateInstitution } from "../../src/application/use-cases/institution/update.use-case";
import { InMemoryInstitutionRepository } from "../repositories/in-memory-institution";
import { Institution } from "../../src/domain/entities/institution";
import { ExceptionsAdapter } from "@domain/adapters/exceptions";

describe("Update Institution Use Case", () => {
  let updateInstitution: UpdateInstitution;
  let institutionRepository: InMemoryInstitutionRepository;

  beforeEach(() => {
    institutionRepository = new InMemoryInstitutionRepository();
    updateInstitution = new UpdateInstitution(institutionRepository);
  });

  it("should update an institution successfully", async () => {
    const institution = new Institution(
      -23.55052,
      -46.633308,
      "12345678901234",
      "9876"
    );
    await institutionRepository.create(institution);

    const updatedData = new Institution(
      -22.9068,
      -43.1729,
      institution.getCnpj(),
      institution.getUserId()
    );
    await updateInstitution.execute(institution.getId(), updatedData);

    const updatedInstitution = await institutionRepository.findById(
      institution.getId()
    );

    expect(updatedInstitution).toBeDefined();
    expect(updatedInstitution?.getLatitude()).toBe(updatedData.getLatitude());
    expect(updatedInstitution?.getLongitude()).toBe(updatedData.getLongitude());
  });
});
