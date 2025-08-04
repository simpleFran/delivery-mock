import { Categoria } from "@/domain/entities/Categoria";
import { CreateCategoryDTO } from "./dto";

import { CategoriesRepository } from "@/domain/repositories/categories-repository";

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(data: CreateCategoryDTO): Promise<Categoria> {
    const { nome, descricao, empresaId } = data;

    const category = new Categoria({
      nome,
      descricao,
      empresaId,
    });

    await this.categoriesRepository.create(category);

    return category;
  }
}
