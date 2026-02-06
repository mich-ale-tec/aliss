import { TJugador } from '../../TJugador';
import { TEquipo } from '../../../../Equipo/Domain/TEquipo';
import { TOptions } from '../../../../../shared/Domain/RepositoryGenerico';

export interface TransferirMain {
    porEquipo(jugador: TJugador, equipo: TEquipo, opciones: Required<TOptions>): Promise<void>;
}
