import RouterAbstrac from '../RouterAbstrac';
import Router from '@koa/router';
import REquipo from './Equipo/Router';
import RJugador from './Jugador/Router';

export default class RouterAdministracion extends RouterAbstrac {
    private readonly routes: Array<Router> = [];
    constructor(prefix: string) {
        super(prefix);
    }
    public async construirRutas() {
        this.routes.push(await new REquipo('Equipo').construirRutas());
        this.routes.push(await new RJugador('Jugador').construirRutas());
        const METODOS = this.routes.flatMap(r => [r.routes(), r.allowedMethods()]);
        this.router.use(...METODOS);
        return this.router;
    }
}
