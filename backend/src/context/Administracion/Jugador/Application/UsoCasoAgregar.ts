import { TJugador } from '../Domain/TJugador';
import { RepositoryMain } from '../Domain/RepositoryMain';
import { MongoClient } from 'mongodb';
import { RepositoryImplMain } from '../Infraestructure/RepositoryImplMain';
import { TRequestAgregar } from '../Domain/TRequest';
import { TOptions } from '../../../shared/Domain/RepositoryGenerico';
import { RepositoryMain as RepositoryMainEquipo } from '../../Equipo/Domain/RepositoryMain';
import { RepositoryImplMain as RepositoryImplMainEquipo } from '../../Equipo/Infraestructure/RepositoryImplMain';
import UsoCaso from '../../../shared/Infraestructure/UsoCaso';
import { ParameterizedContext } from 'koa';

export default class UsoCasoAgregar extends UsoCaso {
    private readonly repoMain: RepositoryMain;
    private readonly repoEquipo: RepositoryMainEquipo;
    constructor(ctx: ParameterizedContext) {
        super(ctx);
        this.repoMain = new RepositoryImplMain(this.lanzarError);
        this.repoEquipo = new RepositoryImplMainEquipo(this.lanzarError);
    }
    async init(body: TRequestAgregar): Promise<TJugador> {
        const client = await this.repoMain.connection();
        try {
            return await this._init(client, body);
        } finally {
            await this.repoMain.closeConnection(client);
        }
    }
    private async _init(client: MongoClient, body: TRequestAgregar): Promise<TJugador> {
        const session = await this.repoMain.session(client);
        try {
            const opciones: Required<TOptions> = { Client: client, Session: session };
            await this.repoEquipo.obtenerPorCodigo(body.Equipo, opciones);
            await this.repoMain.startTransaction(session);
            const JUGADOR = await this.repoMain.agregar(body, opciones);
            await this.repoMain.commitTransaction(session);
            return JUGADOR;
        } catch (error) {
            await this.repoMain.rollbackTransaction(session);
            throw error;
        } finally {
            await this.repoMain.closeSession(session);
        }
    }
}
