class AplicacaoError extends Error {
    constructor(mensagem: string) {
        super(mensagem);
    }
}

class ValorInvalidoError extends AplicacaoError {
    constructor(mensagem: string) {
        super(mensagem);
    }
}   

class InfratorNaoEncontradoError extends AplicacaoError {
    constructor(mensagem: string) {
        super(mensagem);
    }
}

class InfratorJaCadastradoError extends AplicacaoError {
    constructor(mensagem: string) {
        super(mensagem);
    }
}

class InfracaoJaCadastradoError extends AplicacaoError {
    constructor(mensagem: string) {
        super(mensagem);
    }
}

class ArquivoError extends AplicacaoError {
    constructor(mensagem: string) {
        super(mensagem);
    }
}

export { ArquivoError, InfratorJaCadastradoError, InfratorNaoEncontradoError, InfracaoJaCadastradoError, ValorInvalidoError, AplicacaoError }