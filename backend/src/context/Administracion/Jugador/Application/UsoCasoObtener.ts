import { RepositoryMain } from '../Domain/RepositoryMain';
import { RepositoryImplMain } from '../Infraestructure/RepositoryImplMain';
import { TJugador } from '../Domain/TJugador';
import UsoCaso from '../../../shared/Infraestructure/UsoCaso';
import { ParameterizedContext } from 'koa';

export default class UsoCasoObtener extends UsoCaso {
    private readonly repo: RepositoryMain;
    constructor(ctx: ParameterizedContext) {
        super(ctx);
        this.repo = new RepositoryImplMain(this.lanzarError);
    }
    async init(): Promise<Array<TJugador>> {
        const client = await this.repo.connection();
        try {
            return await this.repo.obtener({ Client: client });
        } finally {
            await this.repo.closeConnection(client);
        }
    }
}
