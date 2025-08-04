export interface CategoriaProps {
  nome: string;
  descricao?: string;
  empresaId: string;
}

export class Categoria {
  public readonly id: string;
  public nome: string;
  public descricao?: string;
  public empresaId: string;

  constructor(props: CategoriaProps, id?: string) {
    this.id = id ?? crypto.randomUUID();
    this.nome = props.nome;
    this.descricao = props.descricao;
    this.empresaId = props.empresaId;
  }
}
