import type { TJugador } from '$lib/core/Jugador/Domain/TJugador.js';

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
        Nacionalidad: 'Perú',
        Status: {
            IdStatus: 1,
            Status: 'Activo',
        },
    };
};
