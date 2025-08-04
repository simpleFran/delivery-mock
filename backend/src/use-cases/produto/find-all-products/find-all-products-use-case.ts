import { Produto } from "@/domain/entities/Produto";
import { ProductsRepository } from "@/domain/repositories/produtcts-repository";


export class FindAllProductsUseCase{
    constructor(private productsRepository: ProductsRepository) {}


    async execute(): Promise<Produto[]> {

        const produtos = await this.productsRepository.findAllProducts();

        return produtos;
    }
}