import { TJugador } from '../Domain/TJugador';
import { RepositoryMain } from '../Domain/RepositoryMain';
import { MongoClient } from 'mongodb';
import { RepositoryImplMain } from '../Infraestructure/RepositoryImplMain';
import { TRequestEditar } from '../Domain/TRequest';
import { TOptions } from '../../../shared/Domain/RepositoryGenerico';

export default class UsoCasoEditar {
    private readonly repoMain: RepositoryMain;
    constructor() {
        this.repoMain = new RepositoryImplMain();
    }
    async init(body: TRequestEditar): Promise<TJugador> {
        const client = await this.repoMain.connection();
        try {
            return await this._init(client, body);
        } catch (error) {
            throw error;
        } finally {
            await this.repoMain.closeConnection(client);
        }
    }
    private async _init(client: MongoClient, body: TRequestEditar): Promise<TJugador> {
        const session = await this.repoMain.session(client);
        try {
            const opciones: TOptions = { Client: client, Session: session };
            await this.repoMain.obtenerJugadorPorCodigo(body.Codigo, opciones);
            await this.repoMain.startTransaction(session);
            await this.repoMain.editar(body, opciones);
            await this.repoMain.commitTransaction(session);
            return await this.repoMain.obtenerJugadorPorCodigo(body.Codigo, opciones);
        } catch (error) {
            await this.repoMain.rollbackTransaction(session);
            throw error;
        } finally {
            await this.repoMain.closeSession(session);
        }
    }
}
