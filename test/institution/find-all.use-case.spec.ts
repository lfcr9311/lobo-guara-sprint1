import { InMemoryInstitutionRepository } from "../repositories/in-memory-institution";

import { Institution } from "../../src/domain/entities/institution";
import { FetchInstitutions } from "@application/use-cases/institution/find-all.use-case";

describe("List Institutions", () => {
  it("should list all institutions", async () => {
    const institutionRepository = new InMemoryInstitutionRepository();
    const fetchInstitution = new FetchInstitutions(institutionRepository);

    const institution1 = new Institution(-23.55052, -46.633308, "id1");
    const institution2 = new Institution(-23.55052, -46.633308, "id2");

    institutionRepository.institutions.push(institution1, institution2);

    const institutions = await fetchInstitution.execute();

    expect(institutions).toHaveLength(2);
    expect(institutions).toEqual([institution1, institution2]);
  });
});
