import type { TEntityMain } from '$lib/core/preguntas/Domain/EntityMain.js';

export interface IModificarPregunta {
    terminarCuestionario: () => void;
    agregarPregunta: () => void;
    limpiarRespuesta: () => void;
    almacenarPreguntas: (preguntas: Array<TEntityMain>) => void;
}
