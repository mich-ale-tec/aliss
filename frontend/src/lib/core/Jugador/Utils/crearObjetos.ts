import type { TJugador } from '$lib/core/Equipo/Domain/TJugador.js';
import type { TEquipo } from '$lib/core/Equipo/Domain/TEquipo.js';

export const crearJugadorPorDefecto = (equipo: TEquipo): TJugador => {
    return {
        Index: 0,
        Codigo: 0,
        Equipo: equipo.Codigo,
        ApellidoPaterno: '',
        ApellidoMaterno: '',
        Nombres: '',
        Numero: 0,
        Posicion: '',
        Edad: 18,
        Nacionalidad: '',
    };
};
