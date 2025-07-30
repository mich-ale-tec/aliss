import RouterAbstrac from '../../RouterAbstrac';
import { ParameterizedContext } from 'koa';
import UsoCasoObtenerPorEquipo from '../../../context/Administracion/Jugador/Application/UsoCasoObtenerPorEquipo';
import { Bootstraping } from '../../../context/shared/bootsraping';
import { AdapterConfigure } from '../../../context/Administracion/Jugador/Infraestructure/AdapterConfigure';
import { EntityObjectDatabase } from '../../../context/shared/Domain/EntityObjectDatabase';
import { EntityIndex } from '../../../context/shared/Domain/EntityIndex';
import UsoCasoEditar from '../../../context/Administracion/Jugador/Application/UsoCasoEditar';
import { TJugador } from '../../../context/Administracion/Jugador/Domain/TJugador';
import UsoCasoAgregar from '../../../context/Administracion/Jugador/Application/UsoCasoAgregar';

export default class Router extends RouterAbstrac {
    private readonly URI: string;
    private readonly DB: string;
    private readonly OBJECTS: EntityObjectDatabase[];
    private readonly INDEXES: EntityIndex[];
    private bootstrap: Bootstraping;
    constructor(prefix: string) {
        super(prefix);
        this.URI = AdapterConfigure.URI;
        this.DB = AdapterConfigure.DATABASE;
        this.OBJECTS = AdapterConfigure.DATABASE_OBJECTS;
        this.INDEXES = AdapterConfigure.DATABASE_INDEXES;
        this.bootstrap = new Bootstraping('mongodb', this.URI, this.DB, this.OBJECTS, this.INDEXES);
    }
    public async construirRutas() {
        await this.bootstrap.exec();
        this.router.post('/obtenerPorEquipo', this.obtenerPorEquipo.bind(this));
        this.router.patch('/editar', this.editar.bind(this));
        this.router.post('/agregar', this.agregar.bind(this));
        return this.router;
    }
    public async agregar(ctx: ParameterizedContext) {
        try {
            const body = ctx.request.body;
            const JUGADOR: TJugador = await new UsoCasoAgregar().init(body);
            ctx.body = JSON.stringify(JUGADOR);
        } catch (error) {
            console.log(error);
            ctx.body = `Hubo un error ${error}`;
            ctx.status = 406;
        }
    }
    public async editar(ctx: ParameterizedContext) {
        try {
            const body = ctx.request.body;
            const JUGADOR: TJugador = await new UsoCasoEditar().init(body);
            ctx.body = JSON.stringify(JUGADOR);
        } catch (error) {
            console.log(error);
            ctx.body = `Hubo un error ${error}`;
            ctx.status = 406;
        }
    }
    public async obtenerPorEquipo(ctx: ParameterizedContext) {
        try {
            const body = ctx.request.body;
            const JUGADORES = await new UsoCasoObtenerPorEquipo().init(body);
            ctx.body = JSON.stringify(JUGADORES);
        } catch (error) {
            console.log(error);
            ctx.body = `Hubo un error ${error}`;
            ctx.status = 406;
        }
    }
}
