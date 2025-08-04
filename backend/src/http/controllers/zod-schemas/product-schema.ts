import { z } from "zod";

export const createProductSchema = z.object({
  nome: z.string().min(2, "Nome é obrigatório"),
  descricao: z.string().optional(),
  precoBase: z.number().min(0, "Preço é obrigatório"),
  quantidade: z.number().min(0, "Quantidade é obrigatória"),
  empresaId: z.string().uuid("ID inválido para a empresa"),
  categoriaId: z.string().uuid("ID inválido para a categoria"),
});

export const findProductByIdSchema = z.object({
  id: z.string().uuid("ID do Produto inválido"),
});

export const findProductByNameSchema = z.object({
  nome: z.string().min(2, "Nome é obrigatório"),
});

export const deleteProductSchema = z.object({
  enterpriseId: z.string().uuid("ID da Empresa inválida"),
  productId:z.string().uuid("ID do Produto inválido")
});