import type { PageLoad } from './$types.ts';
import type { TEntityMain } from '$lib/preguntas/Domain/EntityMain.js';

export const load: PageLoad = async () => {
    const preguntas: Array<TEntityMain> = [
        {
            id: '1',
            nombre: 'Pregunta 1',
            descripcion: 'Cual es el jugador indicado',
        },
        {
            id: '2',
            nombre: 'Pregunta 2',
            descripcion: 'Quien gano el camponeotano 12',
        },
        {
            id: '3',
            nombre: 'Pregunta 3',
            descripcion: 'Cual equipo que pertence',
        },
    ];
    return {
        preguntas,
    };
};
