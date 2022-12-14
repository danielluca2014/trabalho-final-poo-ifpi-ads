"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AplicacaoError = exports.ValorInvalidoError = exports.InfracaoJaCadastradoError = exports.InfratorNaoEncontradoError = exports.InfratorJaCadastradoError = exports.ArquivoError = void 0;
class AplicacaoError extends Error {
    constructor(mensagem) {
        super(mensagem);
    }
}
exports.AplicacaoError = AplicacaoError;
class ValorInvalidoError extends AplicacaoError {
    constructor(mensagem) {
        super(mensagem);
    }
}
exports.ValorInvalidoError = ValorInvalidoError;
class InfratorNaoEncontradoError extends AplicacaoError {
    constructor(mensagem) {
        super(mensagem);
    }
}
exports.InfratorNaoEncontradoError = InfratorNaoEncontradoError;
class InfratorJaCadastradoError extends AplicacaoError {
    constructor(mensagem) {
        super(mensagem);
    }
}
exports.InfratorJaCadastradoError = InfratorJaCadastradoError;
class InfracaoJaCadastradoError extends AplicacaoError {
    constructor(mensagem) {
        super(mensagem);
    }
}
exports.InfracaoJaCadastradoError = InfracaoJaCadastradoError;
class ArquivoError extends AplicacaoError {
    constructor(mensagem) {
        super(mensagem);
    }
}
exports.ArquivoError = ArquivoError;
