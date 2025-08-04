import { FastifyReply, FastifyRequest } from "fastify";
import { findEnterpriseByCnpjSchema } from "./zod-schemas/enterprise-schema";
import { PrismaEnterpriseRepository } from "@/infra/prisma/repositories/prisma-enterprise-repository";
import { FindEnterpriseByCnpjUseCase } from "@/use-cases/empresa/find-enterprise-by-cnpj/find-enterprise-by-cnpj";
import { AppError } from "@/errors/base-error";
import { z } from "zod";



export class FindEnterpriseByCnpjController {
  
  async handler(request: FastifyRequest, reply: FastifyReply) {

    try {
        const { cnpj } = findEnterpriseByCnpjSchema.parse(request.query);
  
        const enterpriseRepository = new PrismaEnterpriseRepository();
        const findEnterpriseByCnpjUseCase = new FindEnterpriseByCnpjUseCase(
          enterpriseRepository
        );
        const enterprise = await findEnterpriseByCnpjUseCase.execute(cnpj);
        if (!enterprise) {
          return reply.status(404).send({ message: "Empresa não encontrada" });
        }
        return reply.status(200).send(enterprise);
      }    
    
    catch (error) {
        if (error instanceof AppError) {
            return reply.status(error.statusCode).send({ message: error.message });
        }
        if (error instanceof z.ZodError) {
            return reply.status(400).send({
            message: "Erro de validação",
            errors: error.flatten(),
            });
        }
        return reply
            .status(500)
            .send({
            message:
                error instanceof Error ? error.message : "Erro interno do servidor",
            });
        }
  }
}