import ErrorPersonalizado from './ErrorPersonalizado';
import { ParameterizedContext } from 'koa';

export default abstract class UsoCaso {
    protected readonly lanzarError: ErrorPersonalizado;
    protected constructor(ctx: ParameterizedContext) {
        this.lanzarError = new ErrorPersonalizado(ctx);
    }
}
