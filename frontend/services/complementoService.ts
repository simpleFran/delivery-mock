import { api } from "@/lib/axios";

// Tipagem para Complemento
export interface ComplementoData {
    nome: string;
    preco: number;
    grupoComplementoId: string;
}

// Criar Complemento
export async function createComplemento(data: ComplementoData) {
    const res = await api.post("/complementos", data);
    return res.data;
}

// Atualizar Complemento
export async function updateComplemento(complementoId: string, data: ComplementoData) {
    const res = await api.put(`/complementos/${complementoId}`, data);
    return res.data;
}

// Deletar Complemento
export async function deleteComplemento(complementoId: string) {
    const res = await api.delete(`/complementos/${complementoId}`);
    return res.data;
}

// Buscar Complementos por Grupo
export async function getComplementosByGrupoId(grupoComplementoId: string) {
    const res = await api.get(`/complementos/by-grupo/${grupoComplementoId}`);
    return res.data;
}
