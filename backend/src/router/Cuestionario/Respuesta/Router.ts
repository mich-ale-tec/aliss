import RouterAbstrac from '../../RouterAbstrac';
import { ParameterizedContext } from 'koa';
import UsoCasoValidar from '../../../context/Cuestionario/Respuesta/Application/UsoCasoValidar';

export default class Router extends RouterAbstrac {
    constructor(prefix: string) {
        super(prefix);
    }
    public async construirRutas() {
        this.router.post('/validar', this.validar);
        return this.router;
    }
    private async validar(ctx: ParameterizedContext) {
        try {
            const body = ctx.request.body;
            const resultado = await new UsoCasoValidar().init(body);
            ctx.body = JSON.stringify(resultado);
        } catch (error) {
            console.log(error);
            ctx.body = `Hubo un error ${error}`;
            ctx.status = 406;
        }
    }
}
