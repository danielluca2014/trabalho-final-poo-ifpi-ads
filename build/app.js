"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const renainf_1 = require("./renainf");
const excecoes_1 = require("./excecoes");
var chalk = require("chalk");
var fileSystem = require("fs");
var JSONStream = require("JSONStream");
let input = (0, prompt_sync_1.default)();
let d = new renainf_1.DepartamentoDeTransito();
let opcao = '';
do {
    try {
        console.log(chalk.blue("\nAplicação iniciada...\n"));
        console.log("Bem vindo!\nDigite uma opção:\n");
        console.log('1 - Cadastro de Infratores     2 - Registrar Infrações     3 - Consultar infrações\n' +
            '4 - Excluir     5 - Listar infratores     6 - Carregar informações     7 - Salvar informações\n' +
            chalk.red('\n0 - Sair\n'));
        opcao = input("Opção: ");
        switch (opcao) {
            case "1":
                inserir();
                break;
            case "2":
                registrarInfracoes();
                break;
            case "3":
                listarInfracoes();
                break;
            case "4":
                excluir();
                break;
            case "5":
                listarInfratores();
                break;
            case "6":
                carregarDeArquivo();
                break;
            case "7":
                salvarEmArquivo();
                break;
        }
    }
    catch (e) {
        console.log("\nErro não esperado.");
    }
    input('\nOperação finalizada. Pressione [Enter].');
    console.clear();
} while (opcao != "0");
console.log("Aplicação encerrada.");
function inserir() {
    try {
        console.log(chalk.blue("\nCadastrar infratores:\n"));
        let id = input("ID: ");
        let cpf = input("CPF: ");
        let nome = input("Nome: ");
        let sobrenome = input("Sobrenome: ");
        let infrator;
        infrator = new renainf_1.Infrator(id, cpf, nome, sobrenome);
        d.inserir(infrator);
    }
    catch (e) {
        if (e instanceof excecoes_1.InfratorJaCadastradoError) {
            console.log(chalk.red(e.message));
        }
    }
}
function registrarInfracoes() {
    try {
        console.log(chalk.blue("\nRegistrar Infrações:\n"));
        let id_infrator = input("ID do infrator: ");
        let indiceProcurado = d.consultarPorIndice(id_infrator);
        console.log("\nDigite as informações da infração:\n");
        let id = input("ID da infração: ");
        let descricao = input("Descrição da infração: ");
        let multa = Number(input("Valor da multa: "));
        let infracao;
        infracao = new renainf_1.Infracao(id, descricao, multa);
        d.infratores[indiceProcurado].inserir(infracao);
        console.log(chalk.green("\nInformações registradas com sucesso."));
        /* let indiceProcurado: number = -1;
    
        for (let i = 0; i < d.infratores.length; i++) {
            if (d.infratores[i].id == id_infrator) {
                indiceProcurado = i;
            }
        }
        */
    }
    catch (e) {
        if (e instanceof excecoes_1.InfratorNaoEncontradoError) {
            console.log(chalk.red(e.message));
        }
        if (e instanceof excecoes_1.InfracaoJaCadastradoError) {
            console.log(chalk.red(e.message));
        }
        if (e instanceof excecoes_1.ValorInvalidoError) {
            console.log(chalk.red(e.message));
        }
    }
}
function excluir() {
    try {
        console.log(chalk.blue("\nExcluir infratores:\n"));
        let id = input('ID do infrator: ');
        d.consultarPorIndice(id);
        d.excluir(id);
        console.log(chalk.green("\nInformações excluídas com sucesso."));
    }
    catch (e) {
        if (e instanceof excecoes_1.InfratorNaoEncontradoError) {
            console.log(chalk.red(e.message));
        }
    }
}
function carregarDeArquivo() {
    try {
        let data = require("./data.json");
        for (let i = 0; i < data.length; i++) {
            let obj = JSON.parse(JSON.stringify(data[i]));
            let id = obj._id;
            let cpf = obj._cpf;
            let nome = obj._nome;
            let sobrenome = obj._sobrenome;
            let infrator;
            infrator = new renainf_1.Infrator(id, cpf, nome, sobrenome);
            let infracao;
            for (let j = 0; j < obj._infracoes.length; j++) {
                let id = obj._infracoes[j]._id;
                let descricao = obj._infracoes[j]._descricao;
                let multa = obj._infracoes[j]._multa;
                infracao = new renainf_1.Infracao(id, descricao, multa);
                infrator.inserir(infracao);
            }
            d.inserir(infrator);
            console.log(chalk.green(`\nID ${infrator.id} carregado.`));
        }
    }
    catch (e) {
        throw new excecoes_1.ArquivoError(chalk.red('\nFalha ao ler o arquivo.'));
    }
}
function listarInfratores() {
    if (d.infratores.length == 0) {
        console.log(chalk.red("\nCadastro de infratores vazios."));
    }
    console.log(d.listaInfratores());
}
function listarInfracoes() {
    try {
        let id_infrator = input("\nID do infrator: ");
        let indiceProcurado = d.consultarPorIndice(id_infrator);
        console.log(d.infratores[indiceProcurado].listaInfracoes());
    }
    catch (e) {
        if (e instanceof excecoes_1.InfratorNaoEncontradoError) {
            console.log(chalk.red(e.message));
        }
    }
}
function salvarEmArquivo() {
    var transformStream = JSONStream.stringify();
    var outputStream = fileSystem.createWriteStream(__dirname + "/data.json");
    transformStream.pipe(outputStream);
    d.infratores.forEach(transformStream.write);
    transformStream.end();
    console.log(chalk.green("\nInformações salvas com sucesso."));
    outputStream.on("finish", function handleFinish() {
        console.log("- - - - - - - - - - - - - - - - - - - - - - -");
    });
    outputStream.on("finish", function handleFinish() {
        var transformStream = JSONStream.parse("*");
        var inputStream = fileSystem.createReadStream(__dirname + "/data.json");
        inputStream
            .pipe(transformStream)
            .on("data", function handleRecord(data) {
            console.log(chalk.green("Arquivos salvos:"), data);
        })
            .on("end", function handleEnd() {
            console.log("- - - - - - - - - - - - - - - - - - - - - - -");
        });
    });
}
