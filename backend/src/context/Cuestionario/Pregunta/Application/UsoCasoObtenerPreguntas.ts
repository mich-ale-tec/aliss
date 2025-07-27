import { EntityMain } from '../Domain/EntityMain';
import { generarNumeroAleatorio } from '../../../../utils/GenerarNumerosAleatorios';
import fs from 'fs/promises';
import { TEquipo } from '../Domain/TEquipo';
import { TJugador } from '../Domain/TJugador';
import path from 'node:path';

export default class UsoCasoObtenerPreguntas {
    constructor() {}
    async init(): Promise<Array<EntityMain>> {
        const PREGUNTAS: Array<EntityMain> = [];
        //
        const IN_EQUIPOS_ALEATORIOS = this.generarListaNumerosAleatorios(4, 0, 3);
        // Equipos
        const DIR_NAME_EQUIPOS = path.join(__dirname, '../../../../data', 'equipos.json');
        const datos = await fs.readFile(DIR_NAME_EQUIPOS, 'utf-8');
        const EQUIPOS: Array<TEquipo> = JSON.parse(datos);
        // Jugadores
        const DIR_NAME_JUGADORES = path.join(__dirname, '../../../../data', 'jugadores.json');
        const dJugadores = await fs.readFile(DIR_NAME_JUGADORES, 'utf-8');
        const JUGADORES: Array<TJugador> = JSON.parse(dJugadores);
        for (const indice of IN_EQUIPOS_ALEATORIOS) {
            const EQUIPO = EQUIPOS[indice];
            const PREGUNTA: EntityMain = {
                id: EQUIPO.Codigo,
                nombre: `¿Qué jugador pertenece al equipo de ${EQUIPO.Nombre}?`,
                descripcion: '',
                respuestas: [],
            };
            const JUGADORES_EQUIPO = JUGADORES.filter(j => j.Equipo === EQUIPO.Codigo);
            const NUMERO_ALEATORIO = generarNumeroAleatorio(0, JUGADORES_EQUIPO.length - 1);
            const JUGADOR = JUGADORES_EQUIPO[NUMERO_ALEATORIO];
            PREGUNTA.respuestas.push({
                id: JUGADOR.Codigo,
                nombre: `${JUGADOR.ApellidoPaterno} ${JUGADOR.ApellidoMaterno}, ${JUGADOR.Nombres}`,
            });
            const OTROS_JUGADORES = JUGADORES.filter(j => j.Equipo !== EQUIPO.Codigo);
            const INDICES_JUGADORES_ALEATORIOS = this.generarListaNumerosAleatorios(
                3,
                0,
                OTROS_JUGADORES.length - 1,
            );
            for (const INDICE_JUGADOR of INDICES_JUGADORES_ALEATORIOS) {
                const JUGADOR = OTROS_JUGADORES[INDICE_JUGADOR];
                PREGUNTA.respuestas.push({
                    id: JUGADOR.Codigo,
                    nombre: `${JUGADOR.ApellidoPaterno} ${JUGADOR.ApellidoMaterno}, ${JUGADOR.Nombres}`,
                });
            }
            PREGUNTAS.push(PREGUNTA);
        }
        return PREGUNTAS;
    }
    generarListaNumerosAleatorios(tamanio: number, minimo: number, maximo: number): Array<number> {
        const NUMEROS_ALEATORIOS: Array<number> = [];
        while (NUMEROS_ALEATORIOS.length < tamanio) {
            const NUMERO_ALEATORIO = generarNumeroAleatorio(minimo, maximo);
            if (!NUMEROS_ALEATORIOS.includes(NUMERO_ALEATORIO)) {
                NUMEROS_ALEATORIOS.push(NUMERO_ALEATORIO);
            }
        }
        NUMEROS_ALEATORIOS.length = tamanio;
        return NUMEROS_ALEATORIOS;
    }
}
