import 'dotenv/config';
import Router from '@koa/router';
import RCuestionario from './Cuestionario/Router';

export default class RouterApp {
    private readonly prefijo: string;
    private readonly router: Router;
    private readonly routes: Array<Router> = [];
    constructor() {
        this.prefijo = process.env.PREFIJO || 'test';
        this.router = new Router({
            prefix: `/api/${this.prefijo}`,
        });
    }
    get obtenerRouter() {
        return this.router;
    }
    public construirRutas() {
        this.routes.push(new RCuestionario('Cuestionario').construirRutas());
        const METODOS = this.routes.flatMap(r => [r.routes(), r.allowedMethods()]);
        this.router.use(...METODOS);
    }
}
