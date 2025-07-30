import { TEquipo } from '../Domain/TEquipo';
import { RepositoryMain } from '../Domain/RepositoryMain';
import { RepositoryImplMain } from '../Infraestructure/RepositoryImplMain';
import { MongoClient } from 'mongodb';

export default class UsoCasoObtener {
    private readonly repoMain: RepositoryMain;
    constructor() {
        this.repoMain = new RepositoryImplMain();
    }
    async init(): Promise<Array<TEquipo>> {
        const client = await this.repoMain.connection();
        try {
            return await this._init(client);
        } catch (error) {
            throw error;
        } finally {
            await this.repoMain.closeConnection(client);
        }
    }
    async _init(client: MongoClient): Promise<Array<TEquipo>> {
        const session = await this.repoMain.session(client);
        try {
            return this.repoMain.obtener({ Client: client });
        } catch (error) {
            await this.repoMain.rollbackTransaction(session);
            throw error;
        } finally {
            await this.repoMain.closeSession(session);
        }
    }
}
