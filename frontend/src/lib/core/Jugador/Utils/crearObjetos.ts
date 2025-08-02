import type { TJugador } from '$lib/core/Jugador/Domain/TJugador.js';
import type { TEquipo } from '$lib/core/Equipo/Domain/TEquipo.js';

export const crearJugadorPorDefecto = (): TJugador => {
    return {
        Index: 0,
        Codigo: 0,
        Equipo: 0,
        ApellidoPaterno: '',
        ApellidoMaterno: '',
        Nombres: '',
        Numero: 0,
        Posicion: '',
        Edad: 18,
        Nacionalidad: '',
    };
};
