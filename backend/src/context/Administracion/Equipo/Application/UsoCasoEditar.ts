import { RepositoryMain } from '../Domain/RepositoryMain';
import { MongoClient } from 'mongodb';
import { RepositoryImplMain } from '../Infraestructure/RepositoryImplMain';
import { TOptions } from '../../../shared/Domain/RepositoryGenerico';
import { TEquipo } from '../Domain/TEquipo';
import { TRequestEditar } from '../Domain/TRequest';
import UsoCaso from '../../../shared/Infraestructure/UsoCaso';
import { ParameterizedContext } from 'koa';

export default class UsoCasoEditar extends UsoCaso {
    private readonly repo: RepositoryMain;
    constructor(ctx: ParameterizedContext) {
        super(ctx);
        this.repo = new RepositoryImplMain(this.lanzarError);
    }
    async init(body: TRequestEditar): Promise<TEquipo> {
        const client = await this.repo.connection();
        try {
            return await this._init(client, body);
        } finally {
            await this.repo.closeConnection(client);
        }
    }
    private async _init(client: MongoClient, body: TRequestEditar): Promise<TEquipo> {
        debugger;
        const session = await this.repo.session(client);
        try {
            const opciones: Required<TOptions> = { Client: client, Session: session };
            await this.repo.obtenerPorCodigo(body.Codigo, opciones);
            await this.repo.startTransaction(session);
            await this.repo.editar(body, opciones);
            await this.repo.commitTransaction(session);
            return await this.repo.obtenerPorCodigo(body.Codigo, opciones);
        } catch (error) {
            await this.repo.rollbackTransaction(session);
            throw error;
        } finally {
            await this.repo.closeSession(session);
        }
    }
}
