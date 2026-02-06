import { RepositoryMain } from '../Domain/RepositoryMain';
import { MongoClient } from 'mongodb';
import { RepositoryImplMain } from '../Infraestructure/RepositoryImplMain';
import { TRequestEditar } from '../Domain/TRequest';
import { TOptions } from '../../../shared/Domain/RepositoryGenerico';
import UsoCaso from '../../../shared/Infraestructure/UsoCaso';
import { ParameterizedContext } from 'koa';
import { TEntityMain } from '../Domain/TEntityMain';

export default class UsoCasoEditar extends UsoCaso {
    private readonly repoMain: RepositoryMain;
    constructor(ctx: ParameterizedContext) {
        super(ctx);
        this.repoMain = new RepositoryImplMain(this.lanzarError);
    }
    async init(body: TRequestEditar): Promise<TEntityMain> {
        const client = await this.repoMain.connection();
        try {
            return await this._init(client, body);
        } finally {
            await this.repoMain.closeConnection(client);
        }
    }
    private async _init(client: MongoClient, body: TRequestEditar): Promise<TEntityMain> {
        const session = await this.repoMain.session(client);
        try {
            const opciones: Required<TOptions> = { Client: client, Session: session };
            const LIGA = await this.repoMain.obtenerPorCodigo(body.Codigo, opciones);
            if (!LIGA) this.lanzarError.negocio('¡No se pudo obtener la Liga!');
            await this.repoMain.startTransaction(session);
            await this.repoMain.editar(body, opciones);
            await this.repoMain.commitTransaction(session);
            return await this.repoMain.obtenerPorCodigo(body.Codigo, opciones);
        } catch (error) {
            await this.repoMain.rollbackTransaction(session);
            throw error;
        } finally {
            await this.repoMain.closeSession(session);
        }
    }
}
