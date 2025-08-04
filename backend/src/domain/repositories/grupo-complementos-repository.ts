import { GrupoComplemento } from "../entities/GrupoComplemento";



export interface GrupoComplementosRepository {

    create(data: Omit<GrupoComplemento, "id">): Promise<GrupoComplemento>;
    findById(id: string): Promise<GrupoComplemento | null>;
    findManyProdutoId(produtoId: string): Promise<GrupoComplemento[]>;
    update(id:string,data: Partial<Omit<GrupoComplemento,"id">>): Promise<GrupoComplemento>;
    delete(id:string): Promise<void>;
}