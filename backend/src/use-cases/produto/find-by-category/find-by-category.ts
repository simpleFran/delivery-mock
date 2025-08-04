import { Produto } from "@/domain/entities/Produto";
import { ProductsRepository } from "@/domain/repositories/produtcts-repository";
import { AppError } from "@/errors/base-error";




export class FindByCategory {
    constructor(
        private readonly productsRepository: ProductsRepository,
    ) {}
    async execute(categoryId: string): Promise<Produto[]> {
        const produtos = await this.productsRepository.findByCategoryId(categoryId);
        if (!produtos || produtos.length === 0) {
            throw new AppError("Produtos não encontrados para essa categoria", 404);
        }
        return produtos;
        
    }
}