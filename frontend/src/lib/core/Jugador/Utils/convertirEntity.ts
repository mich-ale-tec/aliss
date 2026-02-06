import type { TJugador, TJugadorDashboard } from '$lib/core/Jugador/Domain/TJugador.js';

export default function convertirJugadorDashAJugadorAPI(e: TJugadorDashboard): TJugador {
    return {
        Index: 0,
        Codigo: e.Codigo,
        Equipo: e.Equipo,
        ApellidoPaterno: e.ApellidoPaterno,
        ApellidoMaterno: e.ApellidoMaterno,
        Nombres: e.Nombres,
        Numero: e.Numero,
        Posicion: e.Posicion,
        Edad: e.Edad,
        Nacionalidad: e.Nacionalidad,
        Status: e.Status,
    };
}
