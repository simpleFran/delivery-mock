import { GrupoComplemento } from "@/domain/entities/GrupoComplemento";
import { GrupoComplementosRepository } from "@/domain/repositories/grupo-complementos-repository";



export class CreateGrupoComplementoUseCase {
  constructor(private grupoComplementosRepository: GrupoComplementosRepository){}

  async execute(data: Omit<GrupoComplemento, "id">): Promise<GrupoComplemento> {
    const grupoComplemento = new GrupoComplemento({
        nome: data.nome,
        minItens: data.minItens,
        maxItens: data.maxItens,
        produtoId: data.produtoId,
    });

    const created = await this.grupoComplementosRepository.create(grupoComplemento);

    return created;
  }
}