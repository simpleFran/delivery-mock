import { ProductsRepository } from "@/domain/repositories/produtcts-repository";
import { AppError } from "@/errors/base-error";
import { Produto } from "@/domain/entities/Produto";


export class FindProductByNameUseCase {
    constructor(
        private readonly productsRepository: ProductsRepository,
    ) {}
    async execute(name: string): Promise<Produto[] | null> {
        const produto = await this.productsRepository.findByName(name);
        if (!produto) {
            throw new AppError("Produto não encontrado", 404);
        }
        return produto;
    }
}
