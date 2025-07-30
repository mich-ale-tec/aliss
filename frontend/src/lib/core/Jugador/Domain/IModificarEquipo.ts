import type { TJugador } from '$lib/core/Equipo/Domain/TJugador.js';

export interface IModificarJugadores {
    obtenerJugadores: (jugadores: Array<TJugador>) => void;
    modificarJugador: (jugador: TJugador) => void;
    agregarJugador: (jugador: TJugador) => void;
}
