import { EnterprisesRepository } from "@/domain/repositories/enterprises-repository";
import { AppError } from "@/errors/base-error";

export class FindEnterprisesProductsTree {
  constructor(private enterpriseRepository: EnterprisesRepository) {}
  async execute() {
    const enterprises =
      await this.enterpriseRepository.getAllEmpresasProdutosTree();
    if (!enterprises) {
      throw new AppError("Empresa não encontrada.", 404);
    }
    return enterprises;
  }
}
