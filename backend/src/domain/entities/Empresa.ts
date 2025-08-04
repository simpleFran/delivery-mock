export interface EmpresaProps {
  nome: string;
  cnpj: string;
  razaoSocial: string;
  endereco: string;
  telefone: string;
  email: string;
  municipio: string;
  estado: string;
}

export class Empresa {
  public readonly id: string;
  public nome: string;
  public cnpj: string;
  public razaoSocial: string;
  public endereco: string;
  public telefone: string;
  public email: string;
  public municipio: string;
  public estado: string;

  constructor(props: EmpresaProps, id?: string) {
    this.id = id ?? crypto.randomUUID();
    this.nome = props.nome;
    this.cnpj = props.cnpj;
    this.razaoSocial = props.razaoSocial;
    this.endereco = props.endereco;
    this.telefone = props.telefone;
    this.email = props.email;
    this.municipio = props.municipio;
    this.estado = props.estado;
  }
}
