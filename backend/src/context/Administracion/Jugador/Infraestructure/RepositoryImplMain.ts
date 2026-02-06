import { RepositoryImplMongoGenerico as RepoImplMongoGene } from '../../../shared/Infraestructure/RepositoryImplMongoGenerico';
import { TJugador } from '../Domain/TJugador';
import { RepositoryMain } from '../Domain/RepositoryMain';
import { AdapterConfigure as AC } from './AdapterConfigure';
import { pipeline } from '../../../shared/Domain/EntityUpdate';
import { TOptions } from '../../../shared/Domain/RepositoryGenerico';
import { TRequestAgregar, TRequestEditar } from '../Domain/TRequest';
import { UpdateFilter, Filter } from 'mongodb';
import ErrorPersonalizado from '../../../shared/Infraestructure/ErrorPersonalizado';

export class RepositoryImplMain extends RepoImplMongoGene<TJugador> implements RepositoryMain {
    private lanzarError: ErrorPersonalizado;
    constructor(lanzarError: ErrorPersonalizado) {
        super(AC.URI, AC.DATABASE, AC.SCHEMA, AC.ENTITY);
        this.lanzarError = lanzarError;
    }
    async obtener(opciones: TOptions): Promise<TJugador[]> {
        const pipe: Array<pipeline> = [{ $match: {} }];
        return await this.find(opciones.Client, pipe);
    }
    async obtenerJugadoresPorEquipo(equipo: number, opciones: TOptions): Promise<TJugador[]> {
        const pipe: Array<pipeline> = [{ $match: { Equipo: equipo } }];
        return await this.find(opciones.Client, pipe);
    }
    async obtenerJugadorPorCodigo(codigo: TJugador['Codigo'], opcion: TOptions): Promise<TJugador> {
        const pipe: Array<pipeline> = [{ $match: { Codigo: codigo } }];
        const JUGADORES = await this.find(opcion.Client, pipe);
        const [JUGADOR] = JUGADORES;
        if (!JUGADOR) this.lanzarError.negocio('¡No se encontró el jugador!');
        return JUGADOR;
    }
    async editar(body: TRequestEditar, opciones: Required<TOptions>): Promise<void> {
        const FILTER: Filter<TJugador> = { Codigo: body.Codigo };
        const UPDATE: UpdateFilter<TJugador> = {
            $set: {
                Numero: body.Numero,
                ApellidoPaterno: body.ApellidoPaterno,
                ApellidoMaterno: body.ApellidoMaterno,
                Nombres: body.Nombres,
                Posicion: body.Posicion,
                Edad: body.Edad,
                Nacionalidad: body.Nacionalidad,
            },
        };
        await this.updateOne(opciones.Client, opciones.Session, FILTER, UPDATE);
    }
    async agregar(body: TRequestAgregar, opciones: Required<TOptions>): Promise<TJugador> {
        const CODIGO = await this.obtenerCodigo(opciones);
        const JUGADOR: TJugador = {
            Codigo: CODIGO,
            Equipo: body.Equipo,
            ApellidoPaterno: body.ApellidoPaterno,
            ApellidoMaterno: body.ApellidoMaterno,
            Nombres: body.Nombres,
            Numero: body.Numero,
            Posicion: body.Posicion,
            Edad: body.Edad,
            Nacionalidad: body.Nacionalidad,
            Status: {
                IdStatus: 1,
                Status: 'Activo',
            },
        };
        await this.saveOne(opciones.Client, opciones.Session, JUGADOR);
        return JUGADOR;
    }
    async darBaja(codigo: TJugador['Codigo'], opciones: Required<TOptions>) {
        const FILTER: Filter<TJugador> = { Codigo: codigo };
        const UPDATE: UpdateFilter<TJugador> = {
            $set: {
                Status: {
                    IdStatus: 10,
                    Status: 'Inactivo',
                },
                Equipo: 0,
            },
        };
        await this.updateOne(opciones.Client, opciones.Session, FILTER, UPDATE);
    }
    private async obtenerCodigo(opciones: TOptions): Promise<TJugador['Codigo']> {
        const pipe: Array<pipeline> = [
            { $group: { _id: null, Codigo: { $max: '$Codigo' } } },
            { $project: { _id: 0, Codigo: 1 } },
            { $limit: 1 },
        ];
        const JUGADORES = await this.find(opciones.Client, pipe);
        return JUGADORES.length > 0 ? JUGADORES[0].Codigo + 1 : 1;
    }
}
