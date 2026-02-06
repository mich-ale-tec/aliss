import { RepositoryGenerico, TOptions } from '../../../shared/Domain/RepositoryGenerico';
import { TEntityMain } from './TEntityMain';
import { TRequestAgregar, TRequestEditar } from './TRequest';

export interface RepositoryMain extends RepositoryGenerico<TEntityMain> {
    obtener(opciones: TOptions): Promise<TEntityMain[]>;
    obtenerPorCodigo(codigo: TEntityMain['Codigo'], opciones: TOptions): Promise<TEntityMain>;
    agregar(body: TRequestAgregar, opciones: Required<TOptions>): Promise<TEntityMain>;
    editar(boyd: TRequestEditar, opciones: Required<TOptions>): Promise<void>;
}
