import { Categoria } from "@/domain/entities/Categoria";
import { CategoriesRepository } from "@/domain/repositories/categories-repository";
import { AppError } from "@/errors/base-error";


export class FindCategoriesByEnterpriseIdUseCase {
  constructor(private categoriesRepository: CategoriesRepository) { }

  async execute(enterpriseId: string): Promise<Categoria[]> {
    const categories = await this.categoriesRepository.findByEnterpriseId(enterpriseId);

    return categories.map(category => ({
      ...category,
      descricao: category.descricao ?? undefined,
    }));
  }
}