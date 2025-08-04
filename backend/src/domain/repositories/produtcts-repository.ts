
import { Produto } from "@/domain/entities/Produto";

export interface ProductsRepository {
  create(produto: Produto): Promise<void>;
  findById(id: string): Promise<Produto | null>;
  findByName(name: string): Promise<Produto[] | null>;
  findByCategoryId(categoryId: string): Promise<Produto[]>;
  findOneProductByEnterpriseId(name:string,enterpriseId: string): Promise<Produto | null>;
  // findManyProductsByEnterpriseId(enterpriseId: string): Promise<Produto[]>;
  findAllProducts(): Promise<Produto[]>;
  deleteProduct(productId:string,enterpriseId:string): Promise<void>

  updateProduct(productId: string, data: Partial<Produto>): Promise<Produto>;

}