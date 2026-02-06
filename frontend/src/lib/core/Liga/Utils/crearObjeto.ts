import type { TLigaAPI } from '$lib/core/Liga/Domain/TLiga.js';

export function crearObjeto(): TLigaAPI {
    return {
        Codigo: 0,
        Nombre: '',
        Descripcion: '',
        Logo: '',
        Anio: 2000,
        FechaInicio: '',
        FechaFin: '',
        Equipos: [],
    };
}
