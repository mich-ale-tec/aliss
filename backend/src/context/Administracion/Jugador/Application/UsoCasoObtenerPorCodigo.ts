import { RepositoryMain } from '../Domain/RepositoryMain';
import { RepositoryImplMain } from '../Infraestructure/RepositoryImplMain';
import { TRequestPorCodigo } from '../Domain/TRequest';
import { TJugador } from '../Domain/TJugador';
import { ParameterizedContext } from 'koa';
import UsoCaso from '../../../shared/Infraestructure/UsoCaso';

export default class UsoCasoObtenerPorCodigo extends UsoCaso {
    private readonly repo: RepositoryMain;
    constructor(ctx: ParameterizedContext) {
        super(ctx);
        this.repo = new RepositoryImplMain(this.lanzarError);
    }
    async init(body: TRequestPorCodigo): Promise<TJugador> {
        const client = await this.repo.connection();
        try {
            return await this.repo.obtenerJugadorPorCodigo(body.Codigo, { Client: client });
        } finally {
            await this.repo.closeConnection(client);
        }
    }
}
