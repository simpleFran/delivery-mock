

export class Preco {
    private readonly valor: number;

    private constructor(valor: number) {
        if (valor < 0) {
            throw new Error('O valor do preço não pode ser negativo.');
        }
        this.valor = valor;
    }
    static create(valor: number): Preco {
        return new Preco(valor);
    }

    getValue(): number {
        return this.valor;
    }
    aplicarDesconto(percentual: number): Preco {

        if (percentual < 0 || percentual > 100) {
            throw new Error("Percentual de desconto inválido.")
        }

        const desconto = this.valor * (percentual / 100);
        return new Preco(this.valor - desconto);

    }

    formatar(): string {
        return `R$ ${this.valor.toFixed(2).replace('.', ',')}`;
    }
}