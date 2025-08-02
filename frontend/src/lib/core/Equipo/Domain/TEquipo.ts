import type { TJugador } from '$lib/core/Jugador/Domain/TJugador.js';

type TEquipoAPI = {
    Codigo: number;
    Nombre: string;
    Breve: string;
    Descripcion: string;
    Logo: string;
    Entrenador: string;
    Fundado: string;
    Estadio: string;
    Ciudad: string;
};
export type TEquipoDashboard = TEquipoAPI & {
    CantidadJugadores: number;
};
export type TEquipo = TEquipoAPI & {
    Index: number;
    Jugadores: Array<TJugador>;
};
