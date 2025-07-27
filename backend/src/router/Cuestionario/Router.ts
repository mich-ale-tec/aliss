import RouterAbstrac from '../RouterAbstrac';
import RPregunta from './Pregunta/Router';
import RRespuesta from './Respuesta/Router';
import Router from '@koa/router';

export default class RouterCuestionario extends RouterAbstrac {
    private readonly routes: Array<Router> = [];
    constructor(prefix: string) {
        super(prefix);
    }
    // Publicas
    public construirRutas() {
        this.routes.push(new RPregunta('Pregunta').construirRutas());
        this.routes.push(new RRespuesta('Respuesta').construirRutas());
        const METODOS = this.routes.flatMap(r => [r.routes(), r.allowedMethods()]);
        this.router.use(...METODOS);
        return this.router;
    }
}
