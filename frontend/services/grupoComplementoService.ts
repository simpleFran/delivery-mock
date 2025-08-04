import { api } from "@/lib/axios";

// Tipagem para Grupo de Complemento
export interface GrupoComplementoData {
    nome: string;
    minItens: number;
    maxItens: number;
    produtoId: string;
}

// Criar Grupo de Complemento
export async function createGrupoComplemento(data: GrupoComplementoData) {
    const res = await api.post("/grupos-complemento", data);
    return res.data;
}

// Atualizar Grupo de Complemento
export async function updateGrupoComplemento(grupoId: string, data: GrupoComplementoData) {
    const res = await api.put(`/grupos-complemento/${grupoId}`, data);
    return res.data;
}

// Deletar Grupo de Complemento
export async function deleteGrupoComplemento(grupoId: string) {
    const res = await api.delete(`/grupos-complemento/${grupoId}`);
    return res.data;
}

// Buscar Grupos por Produto
export async function getGruposByProdutoId(produtoId: string) {
    const res = await api.get(`/grupos-complemento/by-produto/${produtoId}`);
    return res.data;
}
