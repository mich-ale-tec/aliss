import { TJugador } from '../Domain/TJugador';
import { TRequestPorEquipo } from '../Domain/TRequest';
import { RepositoryMain } from '../Domain/RepositoryMain';
import { MongoClient } from 'mongodb';
import { RepositoryImplMain } from '../Infraestructure/RepositoryImplMain';

export default class UsoCasoObtenerPorEquipo {
    private readonly repoMain: RepositoryMain;
    constructor() {
        this.repoMain = new RepositoryImplMain();
    }
    async init(body: TRequestPorEquipo): Promise<Array<TJugador>> {
        const client = await this.repoMain.connection();
        try {
            return await this._init(client, body);
        } catch (error) {
            throw error;
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
