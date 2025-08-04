import { api } from "@/lib/axios";

export interface EmpresaPayload {
  nome: string;
  razaoSocial: string;
  cnpj: string;
  email: string;
  telefone: string;
  endereco: string;
  municipio: string;
  estado: string;
}


export async function createEmpresa(data: EmpresaPayload) {

    const response = await api.post("/enterprises", data);
    return response.data;
}


export async function getEmpresas(){
  const response = await api.get("/enterprises/all");
  if(!response) throw new Error("Erro ao buscar empresas.");
  return response.data;
  
}

export async function getAllEmpresasTree() {
  const response = await api.get(`/enterprises/products/tree`);
  return response.data;
}
