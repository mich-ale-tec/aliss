import type { TEquipo } from '$lib/core/Equipo/Domain/TEquipo.js';
import axios from 'axios';
import type { IModificarEquipo } from '$lib/core/Equipo/Domain/IModificarEquipo.js';
import type { TJugador } from '$lib/core/Equipo/Domain/TJugador.js';
import type { IModificarJugadores } from '$lib/core/Jugador/Domain/IModificarEquipo.js';

export default class CEquipo {
    private Codigo: number;
    private Nombre: string;
    private Breve: string;
    private Descripcion: string;
    constructor(equipo: TEquipo) {
        this.Codigo = equipo.Codigo;
        this.Nombre = equipo.Nombre;
        this.Breve = equipo.Breve;
        this.Descripcion = equipo.Descripcion;
    }
    public async obtenerJugadores(props: IModificarJugadores): Promise<Array<TJugador>> {
        const url = `${localStorage.getItem('URL_BACKEND')}/Administracion/Jugador/obtenerPorEquipo`;
        const response = await axios.post(url, {
            Equipo: this.Codigo,
        });
        const JUGADORES = response.data as Array<TJugador>;
        const JUGADORES_INDEX = this.transformarJugadoresPorDefecto(JUGADORES);
        props.obtenerJugadores(JUGADORES_INDEX);
        return JUGADORES_INDEX;
    }
    private transformarJugadoresPorDefecto(jugadores: Array<TJugador>): Array<TJugador> {
        return jugadores.map((e, i) => {
            return {
                Index: i,
                Codigo: e.Codigo,
                Equipo: e.Equipo,
                ApellidoPaterno: e.ApellidoPaterno,
                ApellidoMaterno: e.ApellidoMaterno,
                Nombres: e.Nombres,
                // Agregar
                Numero: e.Numero || 0,
                Posicion: e.Posicion || '',
                Edad: e.Edad || 18,
                Nacionalidad: e.Nacionalidad || '',
            };
        });
    }
    static async obtenerEquipos(props: IModificarEquipo): Promise<Array<TEquipo>> {
        const url = `${localStorage.getItem('URL_BACKEND')}/Administracion/Equipo/obtener`;
        const res = await axios.get(url);
        const EQUIPOS = res.data as Array<TEquipo>;
        const EQUIPOS_INDEX: Array<TEquipo> = EQUIPOS.map((e, i) => ({
            ...e,
            Index: i,
            Jugadores: [],
            Logo: e.Logo || '',
        }));
        props.obtenerEquipos(EQUIPOS_INDEX);
        const [EQUIPO] = EQUIPOS_INDEX;
        if (EQUIPO) {
            props.establecerEquipo(EQUIPO);
        }
        return EQUIPOS_INDEX;
    }
}
