import { CreateInstitution } from "../../src/application/use-cases/institution/create.use-case";
import { InMemoryInstitutionRepository } from "../repositories/in-memory-institution";

describe("Create Institution", () => {
  it("should be able to create an institution", async () => {
    const institutionRepository = new InMemoryInstitutionRepository();
    const createInstitution = new CreateInstitution(institutionRepository);

    const institution = await createInstitution.execute({
      cnpj: "12345678901234",
      latitude: -23.55052,
      longitude: -46.633308,
      userId: "9876",
    });

    expect(institutionRepository.institutions).toHaveLength(1);
    expect(institutionRepository.institutions[0]).toEqual(institution);
  });
});
