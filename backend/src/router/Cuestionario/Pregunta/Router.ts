import RouterAbstrac from '../../RouterAbstrac';
import { ParameterizedContext } from 'koa';
import UsoCasoObtenerPreguntas from '../../../context/Cuestionario/Pregunta/Application/UsoCasoObtenerPreguntas';

export default class Router extends RouterAbstrac {
    constructor(prefix: string) {
        super(prefix);
    }
    public async construirRutas() {
        this.router.get('/obtener', this.obtener);
        return this.router;
    }
    private async obtener(ctx: ParameterizedContext) {
        try {
            const preguntas = await new UsoCasoObtenerPreguntas().iniciar();
            ctx.body = JSON.stringify(preguntas);
        } catch (error) {
            console.log(error);
            ctx.body = `Hubo un error ${error}`;
            ctx.status = 406;
        }
    }
}
