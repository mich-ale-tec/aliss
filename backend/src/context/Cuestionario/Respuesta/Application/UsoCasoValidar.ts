import { TEquipo } from '../../../Administracion/Equipo/Domain/TEquipo';
import { TJugador } from '../../../Administracion/Jugador/Domain/TJugador';
import { TRequestRespuestas } from '../Domain/TRequest';
import { TResponseRespuestas } from '../Domain/TResponse';
import { RepositoryMain as RMJugador } from '../../../Administracion/Jugador/Domain/RepositoryMain';
import { RepositoryMain as RMEquipo } from '../../../Administracion/Equipo/Domain/RepositoryMain';
import { RepositoryImplMain as RMImplJugador } from '../../../Administracion/Jugador/Infraestructure/RepositoryImplMain';
import { RepositoryImplMain as RMImplEquipo } from '../../../Administracion/Equipo/Infraestructure/RepositoryImplMain';
import UsoCaso from '../../../shared/Infraestructure/UsoCaso';
import { ParameterizedContext } from 'koa';

export default class UsoCasoValidar extends UsoCaso {
    private readonly repoJugador: RMJugador;
    private readonly repoEquipo: RMEquipo;
    constructor(ctx: ParameterizedContext) {
        super(ctx);
        this.repoJugador = new RMImplJugador(this.lanzarError);
        this.repoEquipo = new RMImplEquipo(this.lanzarError);
    }
    public async init(body: TRequestRespuestas): Promise<TResponseRespuestas> {
        let correctas = 0;
        let incorrectas = 0;

        const EQUIPOS = await this.obtenerEquipos();
        const JUGADORES = await this.obtenerJugadores();
        const PREGUNTAS_RESPUESTAS = this.obtenerRespuestasPorPregunta(body.Respuestas);
        for (const PREGUNTA_RESPUESTA of PREGUNTAS_RESPUESTAS) {
            const CODIGO_PREGUNTA = this.obtenerCodigoPregunta(PREGUNTA_RESPUESTA);
            const COD_RESPUESTA = this.obtenerCodigoRespuesta(PREGUNTA_RESPUESTA);
            const EQUIPO = this.obtenerEquipo(EQUIPOS, CODIGO_PREGUNTA);
            const ES_CORRECTA = this.esRespuestaCorrecta(JUGADORES, EQUIPO, COD_RESPUESTA);
            if (ES_CORRECTA) {
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
    private obtenerRespuestasPorPregunta(respuestas: string): Array<string> {
        return respuestas.split(':');
    }
    private obtenerCodigoPregunta(pregunta_respuesta: string): number {
        const [pregunta] = pregunta_respuesta.split('_');
        return parseInt(pregunta.slice(1));
    }
    private obtenerCodigoRespuesta(pregunta_respuesta: string): number {
        const [, respuesta] = pregunta_respuesta.split('_');
        return parseInt(respuesta.slice(1));
    }
    private obtenerEquipo(equipos: TEquipo[], codigoPregunta: number): TEquipo {
        const EQUIPO = equipos.find(e => e.Codigo === codigoPregunta);
        if (!EQUIPO) throw new Error('¡Equipo no encontrado!');
        return EQUIPO;
    }
    private esRespuestaCorrecta(jugad: TJugador[], equi: TEquipo, codRes: number): boolean {
        return jugad.some(j => {
            const PERTENECE_EQUIPO = j.Equipo === equi.Codigo;
            const RESPUESTA_CORRECTA = j.Codigo === codRes;
            return PERTENECE_EQUIPO && RESPUESTA_CORRECTA;
        });
    }
    private async obtenerEquipos(): Promise<Array<TEquipo>> {
        const client = await this.repoEquipo.connection();
        try {
            return await this.repoEquipo.obtener({ Client: client });
        } finally {
            await this.repoEquipo.closeConnection(client);
        }
    }
    private async obtenerJugadores(): Promise<Array<TJugador>> {
        const client = await this.repoJugador.connection();
        try {
            return await this.repoJugador.obtener({ Client: client });
        } finally {
            await this.repoJugador.closeConnection(client);
        }
    }
}
