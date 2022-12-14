import { InfratorJaCadastradoError, InfratorNaoEncontradoError, InfracaoJaCadastradoError, ValorInvalidoError } from "./excecoes";

class Pessoa {
    private _cpf: string;
    private _nome: string;
    private _sobrenome: string;

    constructor(cpf: string, nome: string, sobrenome: string) {
        this._cpf = cpf;
        this._nome = nome;
        this._sobrenome = sobrenome;
    }

    public get cpf(): string {
        return this._cpf;
    }

    public get nome(): string {
        return this._nome;
    }

    public get sobrenome(): string {
        return this._sobrenome;
    }
}

class Infrator extends Pessoa {
    private _id: string;
    private _infracoes: Infracao[] = [];

    constructor(id: string, cpf: string, nome: string, sobrenome: string) {
        super(cpf, nome, sobrenome);
        this._id = id;
    }

    public get id(): string {
        return this._id;
    }

    public get infracoes(): Infracao[] {
        return this._infracoes;
    }

    public inserir(infracao: Infracao) {
        if (this.consultar(infracao.id)) {
            throw new InfracaoJaCadastradoError(`\nInfração com ID ${infracao.id} já cadastrada.`);
        }
        
        this._infracoes.push(infracao);
    }

    public consultar(id: string): Infracao {
        let infracaoProcurada!: Infracao;

        for (let i = 0; i < this._infracoes.length; i++) {
            if (this._infracoes[i].id == id) {
                infracaoProcurada = this._infracoes[i];
            }
        }

        return infracaoProcurada;
    }

    listaInfracoes(): string {
        
        let listaStrings = "";
        console.log("\nInfrações: \n");

        for (let i: number = 0; i < this._infracoes.length; i++) {
            listaStrings = listaStrings +
                "" + this._infracoes[i].descricao + "\n";      
        }

        return listaStrings;
    }
}

class Infracao {
    private _id: string;;
    private _descricao: string;
    private _multa: number;

    constructor(id: string, descricao: string, multa: number) {
        this.validarValor(multa);
        this._id = id;
        this._descricao = descricao;
        this._multa = multa;
    }

    public get id(): string {
        return this._id;
    }

    public get descricao(): string {
        return this._descricao;
    }

    public get multa(): number {
        return this._multa;
    }

    private validarValor(valor: number): boolean {
        if (isNaN(valor) || valor < 0) {
            throw new ValorInvalidoError("\nValor inválido.");
        }

        return true;
    }
}

class DepartamentoDeTransito {
    private _infratores: Infrator[] = [];

    public get infratores(): Infrator[] {
        return this._infratores;
    }

    inserir(infrator: Infrator): void {
        if (this.consultar(infrator.id)) {
            throw new InfratorJaCadastradoError(`\nInfrator com ID ${infrator.id} já cadastrado.`);
        }
        
        this._infratores.push(infrator);
    }

    consultar(id: string): Infrator {
        let infratorProcurado!: Infrator;

        for (let i = 0; i < this._infratores.length; i++) {
            if (this._infratores[i].id == id) {
                infratorProcurado = this._infratores[i];
            }
        }

        return infratorProcurado;
    }

    public consultarPorIndice(id: string): number {
        let indiceProcurado: number = -1;

        for (let i = 0; i < this._infratores.length; i++) {
            if (this._infratores[i].id == id) {
                indiceProcurado = i;
            }
        }

        if (indiceProcurado == -1) {
            throw new InfratorNaoEncontradoError(`\nInfrator com ID ${id} não cadastrado.`);
        }

        return indiceProcurado;
    }

    alterar(infrator: Infrator): void {
        let indice: number = this.consultarPorIndice(infrator.id);
        this._infratores[indice] = infrator;
    }

    excluir(id: string): void {
        let indice: number = this.consultarPorIndice(id);

        for (var i = indice; i < this._infratores.length; i++) {
            this._infratores[i] = this._infratores[i + 1];
        }

        this._infratores.pop();
    }

    listaInfratores(): string {
        let listaStrings = "";

        for (let i: number = 0; i < this._infratores.length; i++) {
            listaStrings = listaStrings +
                "\nID: " + this._infratores[i].id +
                " - Nome Completo: " + this._infratores[i].nome + " " + this._infratores[i].sobrenome + "\n";
        }

        return listaStrings;
    }
}

export { Infrator, Infracao, DepartamentoDeTransito };