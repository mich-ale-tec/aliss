import { RepositoryMain } from '../Domain/RepositoryMain';
import { MongoClient } from 'mongodb';
import { RepositoryImplMain } from '../Infraestructure/RepositoryImplMain';
import { TOptions } from '../../../shared/Domain/RepositoryGenerico';
import { TRequestAgregar } from '../Domain/TRequest';
import UsoCaso from '../../../shared/Infraestructure/UsoCaso';
import { ParameterizedContext } from 'koa';
import { TEntityMain } from '../Domain/TEntityMain';

export default class UsoCasoAgregar extends UsoCaso {
    private readonly repo: RepositoryMain;
    constructor(ctx: ParameterizedContext) {
        super(ctx);
        this.repo = new RepositoryImplMain(this.lanzarError);
    }
    async init(body: TRequestAgregar): Promise<TEntityMain> {
        const client = await this.repo.connection();
        try {
            return await this._init(client, body);
        } finally {
            await this.repo.closeConnection(client);
        }
    }
    private async _init(client: MongoClient, body: TRequestAgregar): Promise<TEntityMain> {
        const session = await this.repo.session(client);
        try {
            const opciones: Required<TOptions> = { Client: client, Session: session };
            await this.repo.startTransaction(session);
            const LIGA = await this.repo.agregar(body, opciones);
            await this.repo.commitTransaction(session);
            return LIGA;
        } catch (error) {
            await this.repo.rollbackTransaction(session);
            throw error;
        } finally {
            await this.repo.closeSession(session);
        }
    }
}
