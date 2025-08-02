import { ParameterizedContext } from 'koa';

export default class ErrorPersonalizado {
    private readonly ctx: ParameterizedContext;
    constructor(ctx: ParameterizedContext) {
        this.ctx = ctx;
    }
    negocio(msg: string) {
        this.ctx.throw(422, msg);
    }
}
