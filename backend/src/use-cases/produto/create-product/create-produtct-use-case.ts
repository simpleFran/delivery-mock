import { Produto } from "@/domain/entities/Produto";
import { ConflictError } from "@/errors/base-error";
import { ProductsRepository } from "../../../domain/repositories/produtcts-repository";
import { CreateProductDTO } from "./dto";
import { Preco } from "@/domain/value-objects/Preco";

export class CreateProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(data: CreateProductDTO): Promise<void> {
    //verifica se o produto já existe(mesmo nome para a empresa)
    const enterpriseProductAlreadyExists =
      await this.productsRepository.findOneProductByEnterpriseId(
        data.nome,
        data.empresaId
      );
    if (enterpriseProductAlreadyExists) {
      throw new ConflictError("Produto já existe para essa empresa");
    }
    const produto = new Produto({
      nome: data.nome,
      descricao: data.descricao,
      precoBase: Preco.create(data.precoBase),
      empresaId: data.empresaId,
      categoriaId: data.categoriaId,
   
    });

    await this.productsRepository.create(produto);
  }
}
