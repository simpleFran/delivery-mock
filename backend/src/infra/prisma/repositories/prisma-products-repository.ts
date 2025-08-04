import { Produto } from "@/domain/entities/Produto";
import { ProductsRepository } from "@/domain/repositories/produtcts-repository";
import { prisma } from "../client";
import { Preco } from "@/domain/value-objects/Preco";
import { sanitizeSearchQuery } from "@/utils/sanitize-search-query";

export class PrismaProductsRepository implements ProductsRepository {
  async updateProduct(productId: string, data: Partial<Produto>): Promise<Produto> {


    const produtoAtualizado = await prisma.produto.update({
      where: { id: productId },
      data: {

        nome: data.nome,
        descricao: data.descricao,
        categoriaId: data.categoriaId,
        empresaId: data.empresaId,
        precoBase: data.precoBase ? data.precoBase.getValue() : undefined,
      },
    });

    return new Produto(
      {
        nome: produtoAtualizado.nome,
        descricao: produtoAtualizado.descricao ?? undefined,
        precoBase: Preco.create(produtoAtualizado.precoBase),
        empresaId: produtoAtualizado.empresaId,
        categoriaId: produtoAtualizado.categoriaId,
      },
      produtoAtualizado.id
    );
  }

  async findAllProducts(): Promise<Produto[]> {
    const produtos = await prisma.produto.findMany({
      include: {
        empresa: { select: { id: true, nome: true } },
        categoria: { select: { id: true, nome: true } },
      },
    });

    return produtos.map(
      (produto) =>
        new Produto(
          {
            nome: produto.nome,
            descricao: produto.descricao ?? undefined,
            precoBase: Preco.create(produto.precoBase),
            empresaId: produto.empresaId,
            categoriaId: produto.categoriaId,
            empresa: produto.empresa
              ? { id: produto.empresa.id, nome: produto.empresa.nome }
              : undefined,
            categoria: produto.categoria
              ? { id: produto.categoria.id, nome: produto.categoria.nome }
              : undefined,
          },
          produto.id
        )
    );
  }

  async deleteProduct(productId: string, enterpriseId: string): Promise<void> {
    await prisma.produto.delete({
      where: { id: productId, empresaId: enterpriseId },
    });
  }

  async findOneProductByEnterpriseId(name: string, enterpriseId: string): Promise<Produto | null> {
    const safeName = name.trim();
    const result = await prisma.$queryRaw<any[]>`
  SELECT * FROM "Produto" 
  WHERE unaccent("nome") ILIKE unaccent(${`%${safeName}%`})
  AND "empresaId" = ${enterpriseId}
  LIMIT 1
`;

    const produto = result[0];
    if (!produto) return null;

    return new Produto(
      {
        nome: produto.nome,
        descricao: produto.descricao ?? undefined,
        precoBase: Preco.create(produto.precoBase),
        empresaId: produto.empresaId,
        categoriaId: produto.categoriaId,
      },
      produto.id
    );
  }

  async findById(id: string): Promise<Produto | null> {
    const produto = await prisma.produto.findUnique({
      where: { id },
      include: {
        empresa: { select: { id: true, nome: true } },
        categoria: { select: { id: true, nome: true } },
      },
    });

    if (!produto) return null;

    return new Produto(
      {
        nome: produto.nome,
        descricao: produto.descricao ?? undefined,
        precoBase: Preco.create(produto.precoBase),
        empresaId: produto.empresaId,
        categoriaId: produto.categoriaId,
        empresa: produto.empresa
          ? { id: produto.empresa.id, nome: produto.empresa.nome }
          : undefined,
        categoria: produto.categoria
          ? { id: produto.categoria.id, nome: produto.categoria.nome }
          : undefined,
      },
      produto.id
    );
  }

  async findByName(nome: string): Promise<Produto[] | null> {
    const safeName = sanitizeSearchQuery(nome);
    const produtos = await prisma.$queryRaw<any[]>`
  SELECT * FROM "Produto" 
  WHERE unaccent("nome") ILIKE unaccent(${`%${safeName}%`})
`;


    if (!produtos.length) return null;

    return produtos.map(
      (produto) =>
        new Produto(
          {
            nome: produto.nome,
            descricao: produto.descricao ?? undefined,
            precoBase: Preco.create(produto.precoBase),
            empresaId: produto.empresaId,
            categoriaId: produto.categoriaId,
          },
          produto.id
        )
    );
  }

  async findByCategoryId(categoryId: string): Promise<Produto[]> {
    const produtos = await prisma.produto.findMany({
      where: { categoriaId: categoryId },
    });

    return produtos.map(
      (produto) =>
        new Produto(
          {
            nome: produto.nome,
            descricao: produto.descricao ?? undefined,
            precoBase: Preco.create(produto.precoBase),
            empresaId: produto.empresaId,
            categoriaId: produto.categoriaId,
          },
          produto.id
        )
    );
  }

  async create(produto: Produto): Promise<void> {
    await prisma.produto.create({
      data: {
        id: produto.id,
        nome: produto.nome,
        descricao: produto.descricao,
        precoBase: produto.precoBase.getValue(),
        categoriaId: produto.categoriaId,
        empresaId: produto.empresaId,
      },
    });
  }
}
