import { Empresa } from "@/domain/entities/Empresa";
import { EnterprisesRepository } from "@/domain/repositories/enterprises-repository";
import { prisma } from "../client";

export class PrismaEnterpriseRepository implements EnterprisesRepository {
 
  async getAllEmpresasProdutosTree(): Promise<Empresa[]> {
    const empresaCategoriasProdutos = await prisma.empresa.findMany({
      include: {
        categorias: {
          include: {
            produtos: true,
          },
        },
      },
    });
    return empresaCategoriasProdutos;
  }
  async findAll(): Promise<Empresa[]> {
    const allEnterprises = await prisma.empresa.findMany({
      orderBy: { nome: "asc" },
    });
    return allEnterprises;
  }
  async findByCnpj(cnpj: string): Promise<Empresa | null> {
    const empresa = await prisma.empresa.findUnique({
      where: {
        cnpj: cnpj,
      },
    });
    return empresa;
  }
  async create(empresa: Empresa): Promise<Empresa> {
    const createdEnterprise = await prisma.empresa.create({
      data: {
        nome: empresa.nome,
        id: empresa.id,
        cnpj: empresa.cnpj,
        razaoSocial: empresa.razaoSocial,
        endereco: empresa.endereco,
        telefone: empresa.telefone,
        email: empresa.email,
        municipio: empresa.municipio,
        estado: empresa.estado,
      },
    });

    return createdEnterprise;
  }

  async findById(id: string): Promise<Empresa | null> {
    const empresa = await prisma.empresa.findUnique({
      where: {
        id: id,
      },
    });
    return empresa;
  }
}
