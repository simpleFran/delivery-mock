
export interface ComplementoProps {
  id: string;
  nome: string;
  preco: number;
  grupoComplementoId: string; }

export class Complemento {

  public readonly id: string;
  public nome: string;
  public preco: number;
  public grupoComplementoId: string;

  constructor(props: ComplementoProps, id?: string) {
    this.id = id ?? crypto.randomUUID();
    this.nome = props.nome;
    this.preco = props.preco;
    this.grupoComplementoId = props.grupoComplementoId;
  }
}   