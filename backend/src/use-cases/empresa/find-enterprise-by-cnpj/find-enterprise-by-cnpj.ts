import { Empresa } from "@/domain/entities/Empresa";
import { EnterprisesRepository } from "@/domain/repositories/enterprises-repository";

export class FindEnterpriseByCnpjUseCase {
  constructor(private enterpriseRepository: EnterprisesRepository) {}

  async execute(cnpj: string): Promise<Empresa | null> {
    const empresa = await this.enterpriseRepository.findByCnpj(cnpj);
    return empresa;
  }
}
