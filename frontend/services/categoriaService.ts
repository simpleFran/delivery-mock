// src/services/categoriaService.ts

import { api } from "@/lib/axios";

export async function getCategoriasByEmpresaId(enterpriseId: string) {
    const res = await api.get(`/categories/by-enterprise/${enterpriseId}`);
    return res.data;
}
export async function createCategoria(data: { nome: string; empresaId: string }) {
    const res = await api.post("/categories", data);
    return res.data;
}