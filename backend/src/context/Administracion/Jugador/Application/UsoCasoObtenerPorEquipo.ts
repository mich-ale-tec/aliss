import { TJugador } from '../Domain/TJugador';
import { TRequestPorEquipo } from '../Domain/TRequest';
import { RepositoryMain } from '../Domain/RepositoryMain';
import { MongoClient } from 'mongodb';
import { RepositoryImplMain } from '../Infraestructure/RepositoryImplMain';
import UsoCaso from '../../../shared/Infraestructure/UsoCaso';
import { ParameterizedContext } from 'koa';

export default class UsoCasoObtenerPorEquipo extends UsoCaso {
    private readonly repoMain: RepositoryMain;
    constructor(ctx: ParameterizedContext) {
        super(ctx);
        this.repoMain = new RepositoryImplMain(this.lanzarError);
    }
    async init(body: TRequestPorEquipo): Promise<Array<TJugador>> {
        const client = await this.repoMain.connection();
        try {
            return await this._init(client, body);
        } finally {
            await this.repoMain.closeConnection(client);
        }
    }
    private async _init(client: MongoClient, body: TRequestPorEquipo): Promise<Array<TJugador>> {
        const session = await this.repoMain.session(client);
        try {
            return await this.repoMain.obtenerJugadoresPorEquipo(body.Equipo, { Client: client });
        } catch (error) {
            await this.repoMain.rollbackTransaction(session);
            throw error;
        } finally {
            await this.repoMain.closeSession(session);
        }
    }
}
