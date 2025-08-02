import { TEquipo } from '../Domain/TEquipo';
import { RepositoryMain } from '../Domain/RepositoryMain';
import { RepositoryImplMain } from '../Infraestructure/RepositoryImplMain';
import { TRequestPorCodigo } from '../Domain/TRequest';
import UsoCaso from '../../../shared/Infraestructure/UsoCaso';
import { ParameterizedContext } from 'koa';

export default class UsoCasoObtenerPorCodigo extends UsoCaso {
    private readonly repo: RepositoryMain;
    constructor(ctx: ParameterizedContext) {
        super(ctx);
        this.repo = new RepositoryImplMain(this.lanzarError);
    }
    async init(body: TRequestPorCodigo): Promise<TEquipo> {
        const client = await this.repo.connection();
        try {
            return await this.repo.obtenerPorCodigo(body.Equipo, { Client: client });
        } finally {
            await this.repo.closeConnection(client);
        }
    }
}
