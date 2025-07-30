import type { TJugador } from '$lib/core/Equipo/Domain/TJugador.js';

export type TEquipo = {
    Index: number;
    Codigo: number;
    Nombre: string;
    Breve: string;
    Descripcion: string;
    Jugadores: Array<TJugador>;
    Logo: string;
};
