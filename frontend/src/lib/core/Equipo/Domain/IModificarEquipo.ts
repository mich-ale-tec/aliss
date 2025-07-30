import type { TEquipo } from '$lib/core/Equipo/Domain/TEquipo.js';

export interface IModificarEquipo {
    obtenerEquipos: (equipos: Array<TEquipo>) => void;
    establecerEquipo: (equipo: TEquipo) => void;
}
