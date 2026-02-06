import RouterAbstrac from '../../RouterAbstrac';
import { ParameterizedContext } from 'koa';
import { AdapterConfigure } from '../../../context/Administracion/Equipo/Infraestructure/AdapterConfigure';
import { TEquipo } from '../../../context/Administracion/Equipo/Domain/TEquipo';
// UsoCasos
import UsoCasoEditar from '../../../context/Administracion/Equipo/Application/UsoCasoEditar';
import UsoCasoObtenerPorCodigo from '../../../context/Administracion/Equipo/Application/UsoCasoObtenerPorCodigo';
import UsoCasoAgregar from '../../../context/Administracion/Equipo/Application/UsoCasoAgregar';
import UsoCasoObtener from '../../../context/Administracion/Equipo/Application/UsoCasoObtener';
import ValidatorAJV from '../../../context/Administracion/Equipo/Infraestructure/Validator';
import { TEquipoDashboard } from '../../../context/Administracion/Equipo/Domain/TResponse';
import UsoCasoObtenerDashboard from '../../../context/Administracion/Equipo/Application/UsoCasoObtenerDashboard';
import { TEstadistica } from '../../../context/Administracion/Equipo/Domain/Estadistica';
import UsoCasoEstadistica from '../../../context/Administracion/Equipo/Application/UsoCasoEstadistica';

export default class Router extends RouterAbstrac {
    private validatorAJV: ValidatorAJV;
    constructor(prefix: string) {
        super(prefix, AdapterConfigure);
        this.validatorAJV = new ValidatorAJV();
    }
    public async construirRutas() {
        await this.bootstrap.exec();
        this.router.get('/obtener', this.obtener.bind(this));
        this.router.get('/obtenerDashboard', this.obtenerDashboard.bind(this));
        this.router.post('/obtenerPorCodigo', this.obtenerPorCodigo.bind(this));
        this.router.post('/agregar', this.agregar.bind(this));
        this.router.patch('/editar', this.editar.bind(this));
        this.router.get('/estadistica', this.estadistica.bind(this));
        return this.router;
    }
    private async estadistica(ctx: ParameterizedContext) {
        try {
            const ESTADISTICA: TEstadistica = await new UsoCasoEstadistica(ctx).init();
            ctx.body = JSON.stringify(ESTADISTICA);
        } catch (error) {
            this.lanzarError(error, ctx);
        }
    }
    private async obtenerDashboard(ctx: ParameterizedContext) {
        try {
            const EQUIPOS: TEquipoDashboard[] = await new UsoCasoObtenerDashboard(ctx).init();
            ctx.body = JSON.stringify(EQUIPOS);
        } catch (error) {
            this.lanzarError(error, ctx);
        }
    }
    private async obtener(ctx: ParameterizedContext) {
        try {
            const EQUIPOS: TEquipo[] = await new UsoCasoObtener(ctx).init();
            ctx.body = JSON.stringify(EQUIPOS);
        } catch (error) {
            this.lanzarError(error, ctx);
        }
    }
    private async obtenerPorCodigo(ctx: ParameterizedContext) {
        try {
            const body = ctx.request.body;
            this.validatorAJV.obtenerPorCodigo(body, ctx);
            const EQUIPO: TEquipo = await new UsoCasoObtenerPorCodigo(ctx).init(body);
            ctx.body = JSON.stringify(EQUIPO);
        } catch (error) {
            this.lanzarError(error, ctx);
        }
    }
    private async agregar(ctx: ParameterizedContext) {
        try {
            const body = ctx.request.body;
            this.validatorAJV.agregar(body, ctx);
            const EQUIPO: TEquipo = await new UsoCasoAgregar(ctx).init(body);
            ctx.body = JSON.stringify(EQUIPO);
        } catch (error) {
            this.lanzarError(error, ctx);
        }
    }
    private async editar(ctx: ParameterizedContext) {
        try {
            const body = ctx.request.body;
            this.validatorAJV.editar(body, ctx);
            const EQUIPO: TEquipo = await new UsoCasoEditar(ctx).init(body);
            ctx.body = JSON.stringify(EQUIPO);
        } catch (error) {
            this.lanzarError(error, ctx);
        }
    }
}
