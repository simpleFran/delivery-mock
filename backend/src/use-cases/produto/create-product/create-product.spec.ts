import { Produto } from "@/domain/entities/Produto";
import { describe, expect, it } from "vitest";
import { CreateProductUseCase } from "./create-produtct-use-case";
import { CreateProductDTO } from "./dto";
import { ConflictError } from "@/errors/base-error";

//Repository fake
class InMemoryProductsRepository {
  private products: Produto[] = [];

  async findOneProductByEnterpriseId(name: string, empresaId: string) {
    return (
      this.products.find((product) => {
        return product.nome === name && product.empresaId === empresaId;
      }) || null
    );
  }

  async findById(id: string) {
    return this.products.find((product) => product.id === id) || null;
  }

  async findByName(name: string) {
    return this.products.find((product) => product.nome === name) || null;
  }

  async findByCategoryId(categoryId: string) {
    return (
      this.products.filter((product) => product.categoriaId === categoryId) ||
      null
    );
  }

  async create(produto: Produto) {
    this.products.push(produto);
  }
}

describe("CreateProductUseCase", () => {
  it("deve lançar ConflictError se o produto já existir para a empresa", async () => {
    const productsRepository = new InMemoryProductsRepository();
    const useCase = new CreateProductUseCase(productsRepository);

    const existingProduct: CreateProductDTO = {
      nome: "Produto teste",
      descricao: "Descrição 1",
      precoBase: 28.5,
      categoriaId: "categoria-1",
      empresaId: "empresa-1",
    };

    //Inserir produto 'existente'
    await productsRepository.create(new Produto(existingProduct));
    // await useCase.execute(existingProduct);

    //Executar o use-case com mesmo nome e empresaId -> conflito
    const duplicateProduct: CreateProductDTO = {
      ...existingProduct,
      descricao: "Descrição 2",
      precoBase: 30.0,
    };

    expect(() => useCase.execute(duplicateProduct)).rejects.toThrowError(
      new ConflictError("Produto já existe para essa empresa")
    );
  });

  it("deve criar produto com sucesso se não houver conflito", async () => {
    const produtctsRepository = new InMemoryProductsRepository();
    const useCase = new CreateProductUseCase(produtctsRepository);

    const newProduct: CreateProductDTO = {
      nome: "Produto teste - sucesso -",
      descricao: "Descrição 1 - sucesso -",
      precoBase: 28.5,
      categoriaId: "categoria-1 - sucesso -",
      empresaId: "empresa-1 - sucesso -",
    };
    //Executa o use-case e verifica se produto foi criado
    
    await expect(useCase.execute(newProduct)).resolves.toBeUndefined();
  });
});
