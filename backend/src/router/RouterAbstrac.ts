import Router from '@koa/router';

export default abstract class RouterAbstrac {
    protected readonly router: Router;
    protected constructor(prefix: string) {
        this.router = new Router({
            prefix: `/${prefix}`,
        });
    }
    abstract construirRutas(): Router;
}
