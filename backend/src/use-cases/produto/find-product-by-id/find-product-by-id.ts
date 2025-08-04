

import { ProductsRepository } from "@/domain/repositories/produtcts-repository";
import { AppError } from "@/errors/base-error";
import { Produto } from "@/domain/entities/Produto";


export class FindProductByIdUseCase {
    constructor(
        private readonly productsRepository: ProductsRepository,
    ) {}
    async execute(id: string): Promise<Produto | null> {
        const produto = await this.productsRepository.findById(id);
        if (!produto) {
            throw new AppError("Produto não encontrado", 404);
        }
        return {...produto,
            descricao: produto.descricao ?? undefined,
        };
    }
}
