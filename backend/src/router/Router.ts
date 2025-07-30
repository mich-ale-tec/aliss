import 'dotenv/config';
import Router from '@koa/router';
import RCuestionario from './Cuestionario/Router';
import RAdministracion from './Administracion/Router';

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
    public async construirRutas(): Promise<void> {
        this.routes.push(await new RCuestionario('Cuestionario').construirRutas());
        this.routes.push(await new RAdministracion('Administracion').construirRutas());
        const METODOS = this.routes.flatMap(r => [r.routes(), r.allowedMethods()]);
        this.router.use(...METODOS);
    }
}
