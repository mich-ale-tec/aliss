import type { TEquipo } from '$lib/core/Equipo/Domain/TEquipo.js';

export default function crearObjeto(): TEquipo {
    return {
        Index: 0,
        Codigo: 0,
        Nombre: '',
        Breve: '',
        Descripcion: '',
        Jugadores: [],
        Logo: '',
        Entrenador: '',
        Fundado: '',
        Estadio: '',
        Ciudad: '',
    };
}
