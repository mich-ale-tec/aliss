import Router from '@koa/router';
import { ParameterizedContext } from 'koa';
import { Bootstraping } from '../context/shared/bootsraping';
import { EntityObjectDatabase } from '../context/shared/Domain/EntityObjectDatabase';
import { EntityIndex } from '../context/shared/Domain/EntityIndex';
import { EntityAdapterConfigure } from '../context/shared/Domain/EntityAdapterConfigure';

export default abstract class RouterAbstrac {
    private readonly URI: string = '';
    private readonly DB: string = '';
    private readonly OBJECTS: EntityObjectDatabase[] = [];
    private readonly INDEXES: EntityIndex[] = [];

    protected readonly router: Router;
    protected bootstrap: Bootstraping;

    protected constructor(prefix: string, AdapterConfigure: EntityAdapterConfigure | void) {
        this.router = new Router({
            prefix: `/${prefix}`,
        });
        if (AdapterConfigure) {
            this.URI = AdapterConfigure.URI;
            this.DB = AdapterConfigure.DATABASE;
            this.OBJECTS = AdapterConfigure.DATABASE_OBJECTS;
            this.INDEXES = AdapterConfigure.DATABASE_INDEXES;
        }
        this.bootstrap = new Bootstraping('mongodb', this.URI, this.DB, this.OBJECTS, this.INDEXES);
    }
    abstract construirRutas(): Promise<Router>;
    protected lanzarError(error: unknown, ctx: ParameterizedContext) {
        let status = 500;
        let msg = { error: true, errorMsg: '¡Algo salió mal!' };
        if (error instanceof Error) {
            msg = { error: true, errorMsg: error.message };
            if ('status' in error && typeof error.status === 'number') {
                status = error.status;
            }
        }
        ctx.status = status;
        ctx.body = msg;
    }
}
