import { validateCNPJ } from "@/utils/validate-cnpj";
import { z } from "zod";

export const createEnterpriseSchema = z.object({
  nome: z.string().min(2, "Nome é obrigatório"),
  cnpj: z.string().transform((val)=> val.replace(/\D/g,'')).refine((val)=> validateCNPJ(val),{
    message: "CNPJ inválido",
  }),
  razaoSocial: z.string().min(2, "Razão social é obrigatória"),
  endereco: z.string().min(2, "Endereço é obrigatório"),
  telefone: z.string().min(2, "Telefone é obrigatório"),
  email: z.string().email("Email inválido"),
  municipio: z.string().min(2, "Município é obrigatório"),
  estado: z.string().length(2,"UF inválida")
  
});


export const findEnterpriseByIdSchema = z.object({
  id: z.string().uuid("ID inválido"),
});

export const findEnterpriseByCnpjSchema = z.object({
  cnpj: z.string().transform((val)=> val.replace(/\D/g,'')).refine((val)=> validateCNPJ(val),{
    message: "CNPJ inválido",
  }),
});
