import { Preco } from "@/domain/value-objects/Preco";

export interface ProdutoProps {
  nome: string;
  descricao?: string;
  precoBase: Preco;
  categoriaId: string;
  empresaId: string;

  // Relacionamentos opcionais
  empresa?: {
    id: string;
    nome: string;
  };
  categoria?: {
    id: string;
    nome: string;
  };
}

export class Produto {
  public readonly id: string;
  public nome: string;
  public descricao?: string;
  public precoBase: Preco;
  public categoriaId: string;
  public empresaId: string;

  // Relacionamentos opcionais
  public readonly empresa?: {
    id: string;
    nome: string;
  };
  public readonly categoria?: {
    id: string;
    nome: string;
  };

  constructor(props: ProdutoProps, id?: string) {
    this.id = id ?? crypto.randomUUID();
    this.nome = props.nome;
    this.descricao = props.descricao;
    this.precoBase = props.precoBase;
    this.categoriaId = props.categoriaId;
    this.empresaId = props.empresaId;

    this.empresa = props.empresa;
    this.categoria = props.categoria;
  }

  public aplicarDesconto(percentual: number): void {
    const novoValor = this.precoBase.getValue() * (1 - percentual / 100);
    this.precoBase = Preco.create(novoValor);
  }

  public precoFormatado(): string {
    return `R$ ${this.precoBase.getValue().toFixed(2)}`;
  }
}
