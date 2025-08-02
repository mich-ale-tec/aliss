import { RepositoryGenerico, TOptions } from '../../../shared/Domain/RepositoryGenerico';
import { TEquipo } from './TEquipo';
import { TRequestAgregar, TRequestEditar } from './TRequest';

export interface RepositoryMain extends RepositoryGenerico<TEquipo> {
    obtener(opciones: TOptions): Promise<Array<TEquipo>>;
    obtenerPorCodigo(equipo: TEquipo['Codigo'], opciones: TOptions): Promise<TEquipo>;
    agregar(body: TRequestAgregar, opciones: Required<TOptions>): Promise<TEquipo>;
    editar(body: TRequestEditar, opciones: Required<TOptions>): Promise<void>;
}
