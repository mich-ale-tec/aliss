import { RepositoryGenerico, TOptions } from '../../../shared/Domain/RepositoryGenerico';
import { TEntityMain } from './TEntityMain';
import { TRequestAgregar } from './TRequest';

export interface RepositoryMain extends RepositoryGenerico<TEntityMain> {
    obtener(opciones: TOptions): Promise<TEntityMain[]>;
    obtenerPorCodigo(opciones: TOptions, codigo: TEntityMain['Codigo']): Promise<TEntityMain>;
    agregar(body: TRequestAgregar, opciones: Required<TOptions>): Promise<TEntityMain>;
    obtenerPorLiga(codigo: TEntityMain['Liga'], opciones: TOptions): Promise<TEntityMain[]>;
}
