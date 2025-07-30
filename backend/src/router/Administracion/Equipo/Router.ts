import RouterAbstrac from '../../RouterAbstrac';
import { ParameterizedContext } from 'koa';
import UsoCasoObtener from '../../../context/Administracion/Equipo/Application/UsoCasoObtener';
import { Bootstraping } from '../../../context/shared/bootsraping';
import { AdapterConfigure } from '../../../context/Administracion/Equipo/Infraestructure/AdapterConfigure';

export default class Router extends RouterAbstrac {
    private bootstrap: Bootstraping;
    constructor(prefix: string) {
        super(prefix);
        this.bootstrap = new Bootstraping(
            'mongodb',
            AdapterConfigure.URI,
            AdapterConfigure.DATABASE,
            AdapterConfigure.DATABASE_OBJECTS,
            AdapterConfigure.DATABASE_INDEXES,
        );
    }
    public async construirRutas() {
        await this.bootstrap.exec();
        this.router.get('/obtener', this.obtener);
        return this.router;
    }
    private async obtener(ctx: ParameterizedContext) {
        try {
            const EQUIPOS = await new UsoCasoObtener().init();
            ctx.body = JSON.stringify(EQUIPOS);
        } catch (error) {
            console.log(error);
            ctx.body = `Hubo un error ${error}`;
            ctx.status = 406;
        }
    }
}
