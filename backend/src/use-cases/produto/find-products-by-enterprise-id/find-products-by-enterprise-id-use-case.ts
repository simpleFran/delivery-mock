// import { Produto } from "@/domain/entities/Produto";
// import { ProductsRepository } from "@/domain/repositories/produtcts-repository";


// export class FindProductsByEnterpriseIdUseCase {
//     constructor(private productsRepository: ProductsRepository) { }

//     async execute(enterpriseId: string): Promise<Produto[]> {
//         if (!enterpriseId) {
//             throw new Error("Enterprise ID is required");
//         }
//         const products = await this.productsRepository.findManyProductsByEnterpriseId(enterpriseId);

//         return products;
//     }
// }