import RouterAbstrac from '../../RouterAbstrac';
import { ParameterizedContext } from 'koa';
import { AdapterConfigure } from '../../../context/Administracion/Torneo/Infraestructure/AdapterConfigure';
import { TEntityMain } from '../../../context/Administracion/Torneo/Domain/TEntityMain';
import UsoCasoAgregar from '../../../context/Administracion/Torneo/Application/UsoCasoAgregar';
import ValidatorAJV from '../../../context/Administracion/Torneo/Infraestructure/Validator';
import UsoCasoObtener from '../../../context/Administracion/Torneo/Application/UsoCasoObtener';
import UsoCasoObtenerPorLiga from '../../../context/Administracion/Torneo/Application/UsoCasoObtenerPorLiga';

export default class Router extends RouterAbstrac {
    private readonly validatorAJV: ValidatorAJV;
    constructor(prefix: string) {
        super(prefix, AdapterConfigure);
        this.validatorAJV = new ValidatorAJV();
    }
    public async construirRutas() {
        await this.bootstrap.exec();
        this.router.post('/agregar', this.agregar.bind(this));
        this.router.post('/obtener', this.obtener.bind(this));
        this.router.post('/obtenerPorCodigo', this.obtenerPorCodigo.bind(this));
        this.router.post('/obtenerPorLiga', this.obtenerPorLiga.bind(this));
        return this.router;
    }
    public async obtener(ctx: ParameterizedContext) {
        try {
            const TORNEOS: TEntityMain[] = await new UsoCasoObtener(ctx).init();
            ctx.body = JSON.stringify(TORNEOS);
        } catch (error) {
            this.lanzarError(error, ctx);
        }
    }
    public async agregar(ctx: ParameterizedContext) {
        try {
            const body = ctx.request.body;
            this.validatorAJV.agregar(body, ctx);
            const TORNEO: TEntityMain = await new UsoCasoAgregar(ctx).init(body);
            ctx.body = JSON.stringify(TORNEO);
        } catch (error) {
            this.lanzarError(error, ctx);
        }
    }
    public async obtenerPorLiga(ctx: ParameterizedContext) {
        try {
            const body = ctx.request.body;
            this.validatorAJV.obtenerPorLiga(body, ctx);
            const TORNEO: TEntityMain[] = await new UsoCasoObtenerPorLiga(ctx).init(body);
            ctx.body = JSON.stringify(TORNEO);
        } catch (error) {
            this.lanzarError(error, ctx);
        }
    }
    public async obtenerPorCodigo(ctx: ParameterizedContext) {
        try {
            const body = ctx.request.body;
            this.validatorAJV.obtenerPorCodigo(body, ctx);
            const TORNEO: TEntityMain = await new UsoCasoObtener(ctx).porCodigo(body);
            ctx.body = JSON.stringify(TORNEO);
        } catch (error) {
            this.lanzarError(error, ctx);
        }
    }
}
