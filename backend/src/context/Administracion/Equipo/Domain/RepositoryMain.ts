import { RepositoryGenerico, TOptions } from '../../../shared/Domain/RepositoryGenerico';
import { TEquipo } from './TEquipo';

export interface RepositoryMain extends RepositoryGenerico<TEquipo> {
    obtener(opciones: TOptions): Promise<Array<TEquipo>>;
    obtenerPorCodigo(equipo: TEquipo['Codigo'], opciones: TOptions): Promise<TEquipo>;
}
