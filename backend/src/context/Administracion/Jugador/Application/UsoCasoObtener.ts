import { RepositoryMain } from '../Domain/RepositoryMain';
import { RepositoryImplMain } from '../Infraestructure/RepositoryImplMain';
import { MongoClient } from 'mongodb';
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
            return await this._init(client);
        } finally {
            await this.repo.closeConnection(client);
        }
    }
    async _init(client: MongoClient): Promise<Array<TJugador>> {
        const session = await this.repo.session(client);
        try {
            return this.repo.obtener({ Client: client });
        } catch (error) {
            await this.repo.rollbackTransaction(session);
            throw error;
        } finally {
            await this.repo.closeSession(session);
        }
    }
}
