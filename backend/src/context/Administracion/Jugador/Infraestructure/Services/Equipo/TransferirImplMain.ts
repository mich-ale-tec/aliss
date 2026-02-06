import { TransferirMain } from '../../../Domain/Services/Equipo/TransferirMain';
import { TJugador } from '../../../Domain/TJugador';
import { TEquipo } from '../../../../Equipo/Domain/TEquipo';
import { RepositoryMain } from '../../../Domain/RepositoryMain';
import ErrorPersonalizado from '../../../../../shared/Infraestructure/ErrorPersonalizado';
import { Filter, UpdateFilter } from 'mongodb';
import { TOptions } from '../../../../../shared/Domain/RepositoryGenerico';

export class TransferirImplMain implements TransferirMain {
    private readonly repo: RepositoryMain;
    private readonly lanzarError: ErrorPersonalizado;
    constructor(repo: RepositoryMain, lanzarError: ErrorPersonalizado) {
        this.repo = repo;
        this.lanzarError = lanzarError;
    }
    async porEquipo(jugador: TJugador, equipo: TEquipo, opciones: Required<TOptions>) {
        this.validarPorEquipo(jugador, equipo);
        const UPDATE: UpdateFilter<TJugador> = {
            $set: {
                Equipo: equipo.Codigo,
            },
        };
        const FILTER: Filter<TJugador> = {
            Codigo: jugador.Codigo,
        };
        await this.repo.updateOne(opciones.Client, opciones.Session, FILTER, UPDATE);
    }
    private validarPorEquipo(jugador: TJugador, equipo: TEquipo) {
        const { Equipo } = jugador;
        const { Codigo } = equipo;
        if (Equipo === Codigo) {
            this.lanzarError.negocio('¡No puedes tranferir al mismo equipo!');
        }
    }
}
