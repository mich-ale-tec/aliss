import { RepositoryMain } from '../Domain/RepositoryMain';
import { RepositoryImplMain } from '../Infraestructure/RepositoryImplMain';
import { ParameterizedContext } from 'koa';
import UsoCaso from '../../../shared/Infraestructure/UsoCaso';
import { TOptions } from '../../../shared/Domain/RepositoryGenerico';
import { TEquipo } from '../Domain/TEquipo';

export default class UsoCasoObtener extends UsoCaso {
    private readonly repo: RepositoryMain;
    constructor(ctx: ParameterizedContext) {
        super(ctx);
        this.repo = new RepositoryImplMain(this.lanzarError);
    }
    async init(): Promise<Array<TEquipo>> {
        const client = await this.repo.connection();
        try {
            const opciones: TOptions = { Client: client };
            return await this.repo.obtener(opciones);
        } finally {
            await this.repo.closeConnection(client);
        }
    }
}
