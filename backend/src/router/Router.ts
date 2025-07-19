import 'dotenv/config';
import Router from '@koa/router';
import RouterEquipos from './equipos/RouterEquipos';

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
    // Publicas
    public construirRutas() {
        this.obtenerRutasEquipos('equipos');
        this.router.use(
            ...this.routes.flatMap((r) => [r.routes(), r.allowedMethods()]),
        );
    }
    // Privadas
    private obtenerRutasEquipos(prefix: string) {
        this.routes.push(new RouterEquipos(prefix).construirRutas());
    }
}
