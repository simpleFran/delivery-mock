import { Categoria } from "../entities/Categoria";



export interface CategoriesRepository {

    create(data: Categoria): Promise<Categoria>;
    findById(id: string): Promise<Categoria | null>;
    findByEnterpriseId(enterpriseId: string): Promise<Categoria[]>;
}