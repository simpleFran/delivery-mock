import { Categoria } from "@/domain/entities/Categoria";
import { CategoriesRepository } from "@/domain/repositories/categories-repository";
import { prisma } from "../client";

export class PrismaCategoriesRepository implements CategoriesRepository {
  async findByEnterpriseId(enterpriseId: string): Promise<Categoria[]> {
    const categories = await prisma.categoria.findMany({
      where: {
        empresaId: enterpriseId,
      },
    });
    return categories.map(category => ({
      nome: category.nome,
      descricao: category.descricao ?? undefined,
      empresaId: category.empresaId,
      id: category.id,
    }));
  }
  async create(categoria: Categoria): Promise<Categoria> {
    // const {nome,descricao,empresaId,id} = categoria;
    const category = await prisma.categoria.create({
      data: {
        nome: categoria.nome,
        descricao: categoria.descricao,
        empresaId: categoria.empresaId,
        id: categoria.id,
      },
    });
    return {
      ...category,
      descricao: category.descricao ?? undefined,
    };
  }
  async findById(id: string): Promise<Categoria | null> {
    const category =await prisma.categoria.findUnique({
      where: {
        id: id,
      },
    });
    if (!category) return null;
    return {
      nome:category.nome,
      descricao: category.descricao ?? undefined,
      empresaId: category.empresaId,
      id: category.id,
    }
  }
}
