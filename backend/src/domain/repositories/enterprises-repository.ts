import { Empresa } from "../entities/Empresa";

export interface EnterprisesRepository {
  create(empresa: Empresa): Promise<Empresa>;
  findById(id: string): Promise<Empresa | null>;
  findByCnpj(cnpj: string): Promise<Empresa | null>;
  findAll(): Promise<Empresa[]>
  getAllEmpresasProdutosTree(): Promise<Empresa[]>
  
}
