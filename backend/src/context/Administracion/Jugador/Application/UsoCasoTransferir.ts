import UsoCaso from '../../../shared/Infraestructure/UsoCaso';
import { ParameterizedContext } from 'koa';
import { RepositoryMain } from '../Domain/RepositoryMain';
import { RepositoryImplMain } from '../Infraestructure/RepositoryImplMain';
import { TRequestTransferir } from '../Domain/TRequest';
import { TJugador } from '../Domain/TJugador';
import { RepositoryMain as RepositoryMainEquipo } from '../../Equipo/Domain/RepositoryMain';
import { RepositoryImplMain as RepositoryImplMainEquipo } from '../../Equipo/Infraestructure/RepositoryImplMain';
import { TEquipo } from '../../Equipo/Domain/TEquipo';
import { TransferirImplMain } from '../Infraestructure/Services/Equipo/TransferirImplMain';
import { TOptions } from '../../../shared/Domain/RepositoryGenerico';
import { MongoClient } from 'mongodb';

export default class UsoCasoTransferir extends UsoCaso {
    private readonly repo: RepositoryMain;
    private readonly repoEquipo: RepositoryMainEquipo;
    constructor(ctx: ParameterizedContext) {
        super(ctx);
        this.repo = new RepositoryImplMain(this.lanzarError);
        this.repoEquipo = new RepositoryImplMainEquipo(this.lanzarError);
    }
    async init(body: TRequestTransferir): Promise<TJugador> {
        const JUGADOR = await this.obtenerJugador(body.Codigo);
        const EQUIPO = await this.obtenerEquipo(body.Equipo);
        await this.transferirJugador(JUGADOR, EQUIPO);
        return await this.obtenerJugador(body.Codigo);
    }
    private async transferirJugador(jugador: TJugador, equipo: TEquipo) {
        const client = await this.repo.connection();
        try {
            return await this._transferirJugador(client, jugador, equipo);
        } finally {
            await this.repo.closeConnection(client);
        }
    }
    private async _transferirJugador(client: MongoClient, jugador: TJugador, equipo: TEquipo) {
        const session = await this.repo.session(client);
        try {
            await this.repo.startTransaction(session);
            const transferir = new TransferirImplMain(this.repo, this.lanzarError);
            const opciones: Required<TOptions> = { Client: client, Session: session };
            await transferir.porEquipo(jugador, equipo, opciones);
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
    private async obtenerEquipo(equipo: TEquipo['Codigo']): Promise<TEquipo> {
        const client = await this.repoEquipo.connection();
        try {
            return await this.repoEquipo.obtenerPorCodigo(equipo, { Client: client });
        } finally {
            await this.repoEquipo.closeConnection(client);
        }
    }
}
