import type { TTorneoAPI } from '$lib/core/Torneo/Domain/TTorneo.js';

export function crearObjeto(): TTorneoAPI {
    return {
        Codigo: 0,
        Nombre: '',
        Liga: 0,
        Descripcion: '',
        Logo: '',
        FechaInicio: '',
        FechaFin: '',
    };
}
