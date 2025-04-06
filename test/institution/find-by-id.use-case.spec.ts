import { InMemoryInstitutionRepository } from "../repositories/in-memory-institution";
import { Institution } from "../../src/domain/entities/institution";
import { FetchInstitution } from "../../src/application/use-cases/institution/find-by-id.use-case";

describe("Get Institution", () => {
  it("should return an institution by ID", async () => {
    const institutionRepository = new InMemoryInstitutionRepository();
    const fetchInstitution = new FetchInstitution(institutionRepository);

    const institution = new Institution(-23.55052, -46.633308, "id1");
    institutionRepository.institutions.push(institution);

    const result = await fetchInstitution.execute(institution.getId());

    expect(result).toBeDefined();
    expect(result).toEqual(institution);
  });

  it("should throw an error if institution is not found", async () => {
    const institutionRepository = new InMemoryInstitutionRepository();
    const fetchInstitution = new FetchInstitution(institutionRepository);

    await expect(
      fetchInstitution.execute({ id: "non-existent-id" })
    ).rejects.toThrow("Institution not found");
  });
});
