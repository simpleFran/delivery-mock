import { FastifyReply, FastifyRequest } from "fastify";
import { createEnterpriseSchema } from "./zod-schemas/enterprise-schema";
import { PrismaEnterpriseRepository } from "@/infra/prisma/repositories/prisma-enterprise-repository";
import { CreateEnterpriseUseCase } from "@/use-cases/empresa/create-enterprise/create-enterprise";
import { z } from "zod";

export class CreateEnterpriseController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const {
        nome,
        cnpj,
        razaoSocial,
        endereco,
        telefone,
        email,
        municipio,
        estado,
      } = createEnterpriseSchema.parse(req.body);
      const enterpriseRepository = new PrismaEnterpriseRepository();
      const createEnterpriseUseCase = new CreateEnterpriseUseCase(
        enterpriseRepository
      );

      const id = crypto.randomUUID(); // Generate a unique ID
      await createEnterpriseUseCase.execute({
        id,
        nome,
        cnpj,
        razaoSocial,
        endereco,
        telefone,
        email,
        municipio,
        estado,
      });
      return res.status(201).send({ message: "Empresa criada com sucesso" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).send({
          message: "Erro de validação",
          errors: error.flatten(),
        });
      }

      return res.status(500).send({
        message: "Erro interno ao criar empresa",
      });
    }
  }
}
