import { ProductsRepository } from "@/domain/repositories/produtcts-repository";
import { prisma } from "@/infra/prisma/client";

export class DeleteProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}
  async execute(productId: string, enterpriseId: string): Promise<void> {
    await this.productsRepository.deleteProduct(productId, enterpriseId);
  }
}
