import { CategoriesRepository } from "@/domain/repositories/categories-repository";
import { AppError } from "@/errors/base-error";
import { Categoria } from "@prisma/client";

export class FindCategoryByIdUseCase {
  constructor(private categoryRepository: CategoriesRepository) {} // Replace 'any' with the actual type of your repository

  async execute(id: string): Promise<Categoria | null> {
    const category = await this.categoryRepository.findById(id);
    if (!category) {
      throw new AppError("Categoria não encontrada.", 404);
    }
    return {
      ...category,
      descricao: category.descricao ?? null,
    };
  }
}
