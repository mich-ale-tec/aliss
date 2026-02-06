import type { TJugador, TJugadorDashboard } from '$lib/core/Jugador/Domain/TJugador.js';

export const obtenerLabelNombres = (jugador: TJugador | TJugadorDashboard): string => {
    const { ApellidoPaterno, ApellidoMaterno, Nombres } = jugador;
    const apellidos = [ApellidoPaterno, ApellidoMaterno].filter(Boolean).join(' ');
    const nombres = Nombres ?? '';
    if (apellidos && nombres) return `${apellidos}, ${nombres}`;
    if (apellidos) return apellidos;
    if (nombres) return nombres;
    return '';
};
