import { RepositoryGenerico, TOptions } from '../../../shared/Domain/RepositoryGenerico';
import { TJugador } from './TJugador';
import { TEquipo } from '../../Equipo/Domain/TEquipo';
import { TRequestAgregar, TRequestEditar } from './TRequest';

export interface RepositoryMain extends RepositoryGenerico<TJugador> {
    obtener(opciones: TOptions): Promise<TJugador[]>;
    obtenerJugadoresPorEquipo(equipo: TEquipo['Codigo'], opcion: TOptions): Promise<TJugador[]>;
    obtenerJugadorPorCodigo(codigo: TJugador['Codigo'], opcion: TOptions): Promise<TJugador>;
    editar(body: TRequestEditar, opciones: Required<TOptions>): Promise<void>;
    agregar(body: TRequestAgregar, opciones: Required<TOptions>): Promise<TJugador>;
}
