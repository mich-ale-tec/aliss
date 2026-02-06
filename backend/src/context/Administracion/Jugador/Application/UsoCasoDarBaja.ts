import UsoCaso from '../../../shared/Infraestructure/UsoCaso';
import { ParameterizedContext } from 'koa';
import { RepositoryMain } from '../Domain/RepositoryMain';
import { RepositoryImplMain } from '../Infraestructure/RepositoryImplMain';
import { TRequestPorCodigo } from '../Domain/TRequest';
import { TJugador } from '../Domain/TJugador';
import { MongoClient } from 'mongodb';
import { TOptions } from '../../../shared/Domain/RepositoryGenerico';

export default class UsoCasoDarBaja extends UsoCaso {
    private readonly repo: RepositoryMain;
    constructor(ctx: ParameterizedContext) {
        super(ctx);
        this.repo = new RepositoryImplMain(this.lanzarError);
    }
    async init(body: TRequestPorCodigo): Promise<TJugador> {
        const JUGADOR = await this.obtenerJugador(body.Codigo);
        if (JUGADOR.Status.IdStatus !== 1)
            this.lanzarError.negocio('¡El jugador no se encuentra activo!');
        await this.darBaja(body.Codigo);
        return await this.obtenerJugador(body.Codigo);
    }
    private async darBaja(codigo: TJugador['Codigo']) {
        const client = await this.repo.connection();
        try {
            return await this._darBaja(client, codigo);
        } finally {
            await this.repo.closeConnection(client);
        }
    }
    private async _darBaja(client: MongoClient, codigo: TJugador['Codigo']) {
        const session = await this.repo.session(client);
        try {
            await this.repo.startTransaction(session);
            const opciones: Required<TOptions> = { Client: client, Session: session };
            await this.repo.darBaja(codigo, opciones);
            await this.repo.commitTransaction(session);
        } catch (error) {
            await this.repo.rollbackTransaction(session);
            throw error;
        } finally {
            await this.repo.closeSession(session);
        }
    }
    private async obtenerJugador(codigo: TJugador['Codigo']): Promise<TJugador> {
        const client = await this.repo.connection();
        try {
            return await this.repo.obtenerJugadorPorCodigo(codigo, { Client: client });
        } finally {
            await this.repo.closeConnection(client);
        }
    }
}
