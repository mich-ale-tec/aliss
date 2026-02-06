import RouterAbstrac from '../../RouterAbstrac';
import ValidatorAJV from '../../../context/Administracion/Jugador/Infraestructure/Validator';
import { ParameterizedContext } from 'koa';
import { AdapterConfigure } from '../../../context/Administracion/Jugador/Infraestructure/AdapterConfigure';
import { TJugador } from '../../../context/Administracion/Jugador/Domain/TJugador';
// Uso Casos
import UsoCasoObtenerPorEquipo from '../../../context/Administracion/Jugador/Application/UsoCasoObtenerPorEquipo';
import UsoCasoEditar from '../../../context/Administracion/Jugador/Application/UsoCasoEditar';
import UsoCasoAgregar from '../../../context/Administracion/Jugador/Application/UsoCasoAgregar';
import UsoCasoObtener from '../../../context/Administracion/Jugador/Application/UsoCasoObtener';
import UsoCasoObtenerPorCodigo from '../../../context/Administracion/Jugador/Application/UsoCasoObtenerPorCodigo';
import { TJugadorDashboard } from '../../../context/Administracion/Jugador/Domain/TResponse';
import UsoCasoObtenerDashboard from '../../../context/Administracion/Jugador/Application/UsoCasoObtenerDashboard';
import UsoCasoTransferir from '../../../context/Administracion/Jugador/Application/UsoCasoTransferir';
import UsoCasoDarBaja from '../../../context/Administracion/Jugador/Application/UsoCasoDarBaja';
import { TEstadistica } from '../../../context/Administracion/Jugador/Domain/Estadistica';
import UsoCasoEstadistica from '../../../context/Administracion/Jugador/Application/UsoCasoEstadistica';

export default class Router extends RouterAbstrac {
    private readonly validatorAJV: ValidatorAJV;
    constructor(prefix: string) {
        super(prefix, AdapterConfigure);
        this.validatorAJV = new ValidatorAJV();
    }
    public async construirRutas() {
        await this.bootstrap.exec();
        this.router.get('/obtener', this.obtener.bind(this));
        this.router.get('/obtenerDashboard', this.obtenerDashboard.bind(this));
        this.router.post('/obtenerPorEquipo', this.obtenerPorEquipo.bind(this));
        this.router.post('/obtenerPorCodigo', this.obtenerPorCodigo.bind(this));
        this.router.patch('/editar', this.editar.bind(this));
        this.router.post('/agregar', this.agregar.bind(this));
        this.router.post('/transferir', this.transferir.bind(this));
        this.router.post('/darBaja', this.darBaja.bind(this));
        this.router.get('/estadistica', this.estadistica.bind(this));
        return this.router;
    }
    public async estadistica(ctx: ParameterizedContext) {
        try {
            const ESTADISTICA: TEstadistica = await new UsoCasoEstadistica(ctx).init();
            ctx.body = JSON.stringify(ESTADISTICA);
        } catch (error) {
            this.lanzarError(error, ctx);
        }
    }
    public async darBaja(ctx: ParameterizedContext) {
        try {
            const body = ctx.request.body;
            this.validatorAJV.obtenerPorCodigo(body, ctx);
            const JUGADOR: TJugador = await new UsoCasoDarBaja(ctx).init(body);
            ctx.body = JSON.stringify(JUGADOR);
        } catch (error) {
            this.lanzarError(error, ctx);
        }
    }
    public async transferir(ctx: ParameterizedContext) {
        try {
            const body = ctx.request.body;
            this.validatorAJV.transferir(body, ctx);
            const JUGADOR: TJugador = await new UsoCasoTransferir(ctx).init(body);
            ctx.body = JSON.stringify(JUGADOR);
        } catch (error) {
            this.lanzarError(error, ctx);
        }
    }
    public async obtenerPorCodigo(ctx: ParameterizedContext) {
        try {
            const body = ctx.request.body;
            this.validatorAJV.obtenerPorCodigo(body, ctx);
            const JUGADOR: TJugador = await new UsoCasoObtenerPorCodigo(ctx).init(body);
            ctx.body = JSON.stringify(JUGADOR);
        } catch (error) {
            this.lanzarError(error, ctx);
        }
    }
    public async obtenerDashboard(ctx: ParameterizedContext) {
        try {
            const JUGADORES: TJugadorDashboard[] = await new UsoCasoObtenerDashboard(ctx).init();
            ctx.body = JSON.stringify(JUGADORES);
        } catch (error) {
            this.lanzarError(error, ctx);
        }
    }
    public async obtener(ctx: ParameterizedContext) {
        try {
            const JUGADORES: TJugador[] = await new UsoCasoObtener(ctx).init();
            ctx.body = JSON.stringify(JUGADORES);
        } catch (error) {
            this.lanzarError(error, ctx);
        }
    }
    public async agregar(ctx: ParameterizedContext) {
        try {
            const body = ctx.request.body;
            this.validatorAJV.agregar(body, ctx);
            const JUGADOR: TJugador = await new UsoCasoAgregar(ctx).init(body);
            ctx.body = JSON.stringify(JUGADOR);
        } catch (error) {
            this.lanzarError(error, ctx);
        }
    }
    public async editar(ctx: ParameterizedContext) {
        try {
            const body = ctx.request.body;
            this.validatorAJV.editar(body, ctx);
            const JUGADOR: TJugador = await new UsoCasoEditar(ctx).init(body);
            ctx.body = JSON.stringify(JUGADOR);
        } catch (error) {
            this.lanzarError(error, ctx);
        }
    }
    public async obtenerPorEquipo(ctx: ParameterizedContext) {
        try {
            const body = ctx.request.body;
            this.validatorAJV.obtenerPorEquipo(body, ctx);
            const JUGADORES: TJugador[] = await new UsoCasoObtenerPorEquipo(ctx).init(body);
            ctx.body = JSON.stringify(JUGADORES);
        } catch (error) {
            this.lanzarError(error, ctx);
        }
    }
}
