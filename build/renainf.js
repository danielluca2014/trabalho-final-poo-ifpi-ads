"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartamentoDeTransito = exports.Infracao = exports.Infrator = void 0;
const excecoes_1 = require("./excecoes");
class Pessoa {
    constructor(cpf, nome, sobrenome) {
        this._cpf = cpf;
        this._nome = nome;
        this._sobrenome = sobrenome;
    }
    get cpf() {
        return this._cpf;
    }
    get nome() {
        return this._nome;
    }
    get sobrenome() {
        return this._sobrenome;
    }
}
class Infrator extends Pessoa {
    constructor(id, cpf, nome, sobrenome) {
        super(cpf, nome, sobrenome);
        this._infracoes = [];
        this._id = id;
    }
    get id() {
        return this._id;
    }
    get infracoes() {
        return this._infracoes;
    }
    inserir(infracao) {
        if (this.consultar(infracao.id)) {
            throw new excecoes_1.InfracaoJaCadastradoError(`\nInfração com ID ${infracao.id} já cadastrada.`);
        }
        this._infracoes.push(infracao);
    }
    consultar(id) {
        let infracaoProcurada;
        for (let i = 0; i < this._infracoes.length; i++) {
            if (this._infracoes[i].id == id) {
                infracaoProcurada = this._infracoes[i];
            }
        }
        return infracaoProcurada;
    }
    listaInfracoes() {
        let listaStrings = "";
        console.log("\nInfrações: \n");
        for (let i = 0; i < this._infracoes.length; i++) {
            listaStrings = listaStrings +
                "" + this._infracoes[i].descricao + "\n";
        }
        return listaStrings;
    }
}
exports.Infrator = Infrator;
class Infracao {
    constructor(id, descricao, multa) {
        this.validarValor(multa);
        this._id = id;
        this._descricao = descricao;
        this._multa = multa;
    }
    ;
    get id() {
        return this._id;
    }
    get descricao() {
        return this._descricao;
    }
    get multa() {
        return this._multa;
    }
    validarValor(valor) {
        if (isNaN(valor) || valor < 0) {
            throw new excecoes_1.ValorInvalidoError("\nValor inválido.");
        }
        return true;
    }
}
exports.Infracao = Infracao;
class DepartamentoDeTransito {
    constructor() {
        this._infratores = [];
    }
    get infratores() {
        return this._infratores;
    }
    inserir(infrator) {
        if (this.consultar(infrator.id)) {
            throw new excecoes_1.InfratorJaCadastradoError(`\nInfrator com ID ${infrator.id} já cadastrado.`);
        }
        this._infratores.push(infrator);
    }
    consultar(id) {
        let infratorProcurado;
        for (let i = 0; i < this._infratores.length; i++) {
            if (this._infratores[i].id == id) {
                infratorProcurado = this._infratores[i];
            }
        }
        return infratorProcurado;
    }
    consultarPorIndice(id) {
        let indiceProcurado = -1;
        for (let i = 0; i < this._infratores.length; i++) {
            if (this._infratores[i].id == id) {
                indiceProcurado = i;
            }
        }
        if (indiceProcurado == -1) {
            throw new excecoes_1.InfratorNaoEncontradoError(`\nInfrator com ID ${id} não cadastrado.`);
        }
        return indiceProcurado;
    }
    alterar(infrator) {
        let indice = this.consultarPorIndice(infrator.id);
        this._infratores[indice] = infrator;
    }
    excluir(id) {
        let indice = this.consultarPorIndice(id);
        for (var i = indice; i < this._infratores.length; i++) {
            this._infratores[i] = this._infratores[i + 1];
        }
        this._infratores.pop();
    }
    listaInfratores() {
        let listaStrings = "";
        for (let i = 0; i < this._infratores.length; i++) {
            listaStrings = listaStrings +
                "\nID: " + this._infratores[i].id +
                " - Nome Completo: " + this._infratores[i].nome + " " + this._infratores[i].sobrenome + "\n";
        }
        return listaStrings;
    }
}
exports.DepartamentoDeTransito = DepartamentoDeTransito;
