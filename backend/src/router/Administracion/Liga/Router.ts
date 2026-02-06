import RouterAbstrac from '../../RouterAbstrac';
import { AdapterConfigure } from '../../../context/Administracion/Liga/Infraestructure/AdapterConfigure';
import { ParameterizedContext } from 'koa';
import { TEntityMain } from '../../../context/Administracion/Liga/Domain/TEntityMain';
import UsoCasoObtener from '../../../context/Administracion/Liga/Application/UsoCasoObtener';
import ValidatorAJV from '../../../context/Administracion/Liga/Infraestructure/Validator';
import UsoCasoAgregar from '../../../context/Administracion/Liga/Application/UsoCasoAgregar';
import UsoCasoObtenerPorCodigo from '../../../context/Administracion/Liga/Application/UsoCasoObtenerPorCodigo';
import UsoCasoEditar from '../../../context/Administracion/Liga/Application/UsoCasoEditar';

export default class Router extends RouterAbstrac {
    private readonly validatorAJV: ValidatorAJV;
    constructor(prefix: string) {
        super(prefix, AdapterConfigure);
        this.validatorAJV = new ValidatorAJV();
    }
    public async construirRutas() {
        await this.bootstrap.exec();
        this.router.get('/obtener', this.obtener.bind(this));
        this.router.post('/obtenerPorCodigo', this.obtenerPorCodigo.bind(this));
        this.router.post('/agregar', this.agregar.bind(this));
        this.router.patch('/editar', this.editar.bind(this));
        return this.router;
    }
    public async obtener(ctx: ParameterizedContext) {
        try {
            const JUGADORES: TEntityMain[] = await new UsoCasoObtener(ctx).init();
            ctx.body = JSON.stringify(JUGADORES);
        } catch (error) {
            this.lanzarError(error, ctx);
        }
    }
    public async obtenerPorCodigo(ctx: ParameterizedContext) {
        try {
            const body = ctx.request.body;
            this.validatorAJV.obtenerPorCodigo(body, ctx);
            const LIGA: TEntityMain = await new UsoCasoObtenerPorCodigo(ctx).init(body);
            ctx.body = JSON.stringify(LIGA);
        } catch (error) {
            this.lanzarError(error, ctx);
        }
    }
    public async agregar(ctx: ParameterizedContext) {
        try {
            const body = ctx.request.body;
            this.validatorAJV.agregar(body, ctx);
            const EQUIPO: TEntityMain = await new UsoCasoAgregar(ctx).init(body);
            ctx.body = JSON.stringify(EQUIPO);
        } catch (error) {
            this.lanzarError(error, ctx);
        }
    }
    public async editar(ctx: ParameterizedContext) {
        try {
            const body = ctx.request.body;
            this.validatorAJV.editar(body, ctx);
            const LIGA: TEntityMain = await new UsoCasoEditar(ctx).init(body);
            ctx.body = JSON.stringify(LIGA);
        } catch (error) {
            this.lanzarError(error, ctx);
        }
    }
}
