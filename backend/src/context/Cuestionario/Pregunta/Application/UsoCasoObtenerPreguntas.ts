import { EntityMain } from '../Domain/EntityMain';
import { generarNumeroAleatorio } from '../../../../utils/GenerarNumerosAleatorios';
import { TEquipo } from '../../../Administracion/Equipo/Domain/TEquipo';
import { TJugador } from '../../../Administracion/Jugador/Domain/TJugador';
import { RepositoryImplMain as RMImplJugador } from '../../../Administracion/Jugador/Infraestructure/RepositoryImplMain';
import { RepositoryImplMain as RMImplEquipo } from '../../../Administracion/Equipo/Infraestructure/RepositoryImplMain';
import { RepositoryMain as RMJugador } from '../../../Administracion/Jugador/Domain/RepositoryMain';
import { RepositoryMain as RMEquipo } from '../../../Administracion/Equipo/Domain/RepositoryMain';

export default class UsoCasoObtenerPreguntas {
    private readonly repoJugador: RMJugador;
    private readonly repoEquipo: RMEquipo;
    constructor() {
        this.repoJugador = new RMImplJugador();
        this.repoEquipo = new RMImplEquipo();
    }
    public async iniciar(): Promise<Array<EntityMain>> {
        try {
            const PREGUNTAS: Array<EntityMain> = [];
            const JUGADORES = await this.obtenerJugadores();
            const EQUIPOS = await this.obtenerEquipos();
            const INDICES_EQUIPOS_ALEATORIOS = this.generarNumerosAzar(4, 0, 3);
            for (const INDICE_EQUIPO_ALEATORIO of INDICES_EQUIPOS_ALEATORIOS) {
                const EQUIPO = EQUIPOS[INDICE_EQUIPO_ALEATORIO];
                const PREGUNTA = this.obtenerPregunta(EQUIPO);
                const JUGADOR_EQUIPO = this.obtenerJugadorDelEquipo(JUGADORES, EQUIPO);
                const JUGADORES_INCORRECTOS = this.obtenerJugadoresIncorrecto(JUGADORES, EQUIPO);
                this.generarRespuestas(JUGADOR_EQUIPO, JUGADORES_INCORRECTOS, PREGUNTA);
                PREGUNTAS.push(PREGUNTA);
            }
            return PREGUNTAS;
        } catch (error) {
            throw error;
        }
    }
    private generarRespuestas(jugador: TJugador, jugadoresInco: TJugador[], pregunta: EntityMain) {
        pregunta.respuestas.push({
            id: jugador.Codigo,
            nombre: `${jugador.ApellidoPaterno} ${jugador.ApellidoMaterno}, ${jugador.Nombres}`,
        });
        for (const JUGADOR of jugadoresInco) {
            pregunta.respuestas.push({
                id: JUGADOR.Codigo,
                nombre: `${JUGADOR.ApellidoPaterno} ${JUGADOR.ApellidoMaterno}, ${JUGADOR.Nombres}`,
            });
        }
        pregunta.respuestas.sort((a, b) => a.id - b.id);
    }
    private obtenerJugadorDelEquipo(jugadores: Array<TJugador>, equipo: TEquipo): TJugador {
        const JUGADORES_EQUIPO = jugadores.filter(j => j.Equipo === equipo.Codigo);
        const NUMERO_ALEATORIO = generarNumeroAleatorio(0, JUGADORES_EQUIPO.length - 1);
        return JUGADORES_EQUIPO[NUMERO_ALEATORIO];
    }
    private obtenerJugadoresIncorrecto(jugadores: TJugador[], equipo: TEquipo): Array<TJugador> {
        const JUGADORES_INCORRECTOS: Array<TJugador> = [];
        const OTROS_JUGADORES = jugadores.filter(j => j.Equipo !== equipo.Codigo);
        const INDI_JUGADORES_AZAR = this.generarNumerosAzar(3, 0, OTROS_JUGADORES.length - 1);
        for (const INDICE_JUGADOR of INDI_JUGADORES_AZAR) {
            const JUGADOR = OTROS_JUGADORES[INDICE_JUGADOR];
            JUGADORES_INCORRECTOS.push(JUGADOR);
        }
        return JUGADORES_INCORRECTOS;
    }
    private obtenerPregunta(equipo: TEquipo): EntityMain {
        return {
            id: equipo.Codigo,
            nombre: `¿Qué jugador pertenece al equipo de ${equipo.Nombre}?`,
            descripcion: '',
            respuestas: [],
        };
    }
    private generarNumerosAzar(tamanio: number, minimo: number, maximo: number): number[] {
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
    private async obtenerEquipos(): Promise<Array<TEquipo>> {
        const client = await this.repoEquipo.connection();
        try {
            return await this.repoEquipo.obtener({ Client: client });
        } catch (error) {
            throw error;
        } finally {
            await this.repoEquipo.closeConnection(client);
        }
    }
    private async obtenerJugadores(): Promise<Array<TJugador>> {
        const client = await this.repoJugador.connection();
        try {
            return await this.repoJugador.obtener({ Client: client });
        } catch (error) {
            throw error;
        } finally {
            await this.repoJugador.closeConnection(client);
        }
    }
}
