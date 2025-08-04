import { z } from "zod";

export const createCategorySchema = z.object({
  nome: z.string().min(2, "Nome é obrigatório"),
  descricao: z.string().optional(),
  empresaId: z.string().uuid("ID de empresa inválido"),
});


export const findCategoryByIdSchema = z.object({
  id: z.string().uuid("ID de categoria inválido"),
});