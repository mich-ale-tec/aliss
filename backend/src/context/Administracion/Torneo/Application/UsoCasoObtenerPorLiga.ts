import { RepositoryMain } from '../Domain/RepositoryMain';
import { RepositoryImplMain } from '../Infraestructure/RepositoryImplMain';
import { ParameterizedContext } from 'koa';
import UsoCaso from '../../../shared/Infraestructure/UsoCaso';
import { TOptions } from '../../../shared/Domain/RepositoryGenerico';
import { TEntityMain } from '../Domain/TEntityMain';
import { TRequestPorLiga } from '../Domain/TRequest';

export default class UsoCasoObtenerPorLiga extends UsoCaso {
    private readonly repo: RepositoryMain;
    constructor(ctx: ParameterizedContext) {
        super(ctx);
        this.repo = new RepositoryImplMain(this.lanzarError);
    }
    async init(body: TRequestPorLiga): Promise<TEntityMain[]> {
        const client = await this.repo.connection();
        try {
            const opciones: TOptions = { Client: client };
            return await this.repo.obtenerPorLiga(body.Liga, opciones);
        } finally {
            await this.repo.closeConnection(client);
        }
    }
}
