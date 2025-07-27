import path from 'node:path';
import fs from 'fs/promises';
import { TEquipo } from '../../Pregunta/Domain/TEquipo';
import { TJugador } from '../../Pregunta/Domain/TJugador';
import { TRequestRespuestas } from '../Domain/TRequest';
import { TResponseRespuestas } from '../Domain/TResponse';

export default class UsoCasoValidar {
    constructor() {}
    public async iniciar(body: TRequestRespuestas): Promise<TResponseRespuestas> {
        // Equipos
        const DIR_NAME_EQUIPOS = path.join(__dirname, '../../../../data', 'equipos.json');
        const datos = await fs.readFile(DIR_NAME_EQUIPOS, 'utf-8');
        const EQUIPOS: Array<TEquipo> = JSON.parse(datos);
        // Jugadores
        const DIR_NAME_JUGADORES = path.join(__dirname, '../../../../data', 'jugadores.json');
        const dJugadores = await fs.readFile(DIR_NAME_JUGADORES, 'utf-8');
        const JUGADORES: Array<TJugador> = JSON.parse(dJugadores);
        // Validar
        const { Respuestas } = body;
        const arregloRespuestas = Respuestas.split(':');
        let correctas = 0;
        let incorrectas = 0;
        for (const respuestaStr of arregloRespuestas) {
            const [pregunta, respuesta] = respuestaStr.split('_');
            const CodigoPregunta = parseInt(pregunta.slice(1));
            const CodigoRespuesta = parseInt(respuesta.slice(1));
            const EQUIPO = EQUIPOS.find(e => e.Codigo === CodigoPregunta);
            if (!EQUIPO) throw new Error('¡Equipo no encontrado!');
            if (JUGADORES.some(j => j.Equipo === EQUIPO.Codigo && j.Codigo === CodigoRespuesta)) {
                correctas++;
            } else {
                incorrectas++;
            }
        }
        return {
            Correctas: correctas,
            Incorrectas: incorrectas,
        };
    }
}
