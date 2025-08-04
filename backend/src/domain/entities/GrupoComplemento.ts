import { InvalidItemRangeError } from "@/errors/base-error";


export interface GrupoComplementoProps {

    id?:string;
    nome:string;
    minItens:number;
    maxItens:number;
    produtoId:string;
}


export class GrupoComplemento {

    public readonly id: string;
    public nome: string;
    public minItens: number;
    public maxItens: number;
    public produtoId: string;

    constructor({id, nome, minItens, maxItens, produtoId}: GrupoComplementoProps, ) {
        if (minItens > maxItens) {
            throw new InvalidItemRangeError();
          }
          
        this.id = id ?? crypto.randomUUID();
        this.nome = nome;
        this.minItens = minItens;
        this.maxItens = maxItens;
        this.produtoId = produtoId;
    }
}