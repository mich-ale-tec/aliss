import type { TJugador, TJugadorDashboard } from '$lib/core/Jugador/Domain/TJugador.js';
import { ErrorPersonalizado } from '$lib/core/shared/Infraestructure/ErrorPersonalizado.js';
import axios from 'axios';

export default class CJugador {
    protected readonly Codigo: number;
    protected Equipo: number;
    protected readonly ApellidoPaterno: string;
    protected readonly ApellidoMaterno: string;
    protected readonly Nombres: string;

    protected readonly Numero: number;
    protected readonly Posicion: string;
    protected readonly Edad: number;
    protected readonly Nacionalidad: string;

    constructor(jugador: TJugador) {
        this.Codigo = jugador.Codigo;
        this.Equipo = jugador.Equipo;
        this.ApellidoPaterno = jugador.ApellidoPaterno;
        this.ApellidoMaterno = jugador.ApellidoMaterno;
        this.Nombres = jugador.Nombres;

        this.Numero = this.convertirNumero(jugador.Numero);
        this.Posicion = jugador.Posicion;
        this.Edad = this.convertirNumero(jugador.Edad);
        this.Nacionalidad = jugador.Nacionalidad;
    }
    protected validar() {
        this.validarNumero();
        this.validarEquipo();
        this.validarApellidoPaterno();
        this.validarApellidoMaterno();
        this.validarNombres();
        this.validarPosicion();
        this.validarNacionalidad();
        this.validarEdad();
    }
    private validarPosicion() {
        const ES_NUMERO = this.esNumero(this.Posicion);
        if (ES_NUMERO) {
            throw new ErrorPersonalizado('¡Por favor el campo posición no puede ser númerico!');
        }
    }
    private validarNacionalidad() {
        const ES_NUMERO = this.esNumero(this.Nacionalidad);
        if (ES_NUMERO) {
            throw new ErrorPersonalizado('¡Por favor el campo nacionalidad no puede ser númerico!');
        }
    }
    private validarApellidoPaterno() {
        const ES_NUMERO = this.esNumero(this.ApellidoPaterno);
        if (ES_NUMERO) {
            throw new ErrorPersonalizado('¡Por favor el campo apellido paterno no puede ser númerico!');
        }
        if (!this.ApellidoPaterno) {
            throw new ErrorPersonalizado('¡Por favor el campo apellido paterno no puede quedar vacio!');
        }
    }
    private validarApellidoMaterno() {
        const ES_NUMERO = this.esNumero(this.ApellidoMaterno);
        if (ES_NUMERO) {
            throw new ErrorPersonalizado('¡Por favor el campo apellido materno no puede ser númerico!');
        }
    }
    private validarNombres() {
        const ES_NUMERO = this.esNumero(this.Nombres);
        if (ES_NUMERO) {
            throw new ErrorPersonalizado('¡Por favor el campo nombres no puede ser númerico!');
        }
        if (!this.Nombres) {
            throw new ErrorPersonalizado('¡Por favor el campo nombres no puede quedar vacio!');
        }
    }
    private validarEdad() {
        const ES_NUMERO = this.esNumero(this.Edad.toString());
        if (!ES_NUMERO) {
            throw new ErrorPersonalizado('¡Por favor el campo edad tiene que ser un numérico!');
        }
    }
    private validarNumero() {
        const ES_NUMERO = this.esNumero(this.Numero.toString());
        if (!ES_NUMERO) {
            throw new ErrorPersonalizado('¡Por favor el campo número de camiseta tiene que ser numérico!');
        }
    }
    private validarEquipo() {
        if (!this.Equipo) {
            throw new ErrorPersonalizado('¡Por favor selccionar el equipo!');
        }
    }
    private esNumero(valor: string): boolean {
        const regex = /^\d+$/;
        return regex.test(valor);
    }

    private convertirNumero(valor: string | number): number {
        return typeof valor === 'number' ? valor : parseInt(valor);
    }
    static async obtenerJugador(codigo: string): Promise<TJugador> {
        const url = `${localStorage.getItem('URL_BACKEND')}/Administracion/Jugador/obtenerPorCodigo`;
        const response = await axios.post(url, {
            Codigo: parseInt(codigo),
        });
        const JUGADOR = response.data as TJugador;
        return {
            ...JUGADOR,
            Index: 0,
            Numero: JUGADOR.Numero || 0,
            Posicion: JUGADOR.Posicion || '',
            Edad: JUGADOR.Edad || 18,
            Nacionalidad: JUGADOR.Nacionalidad || '',
        };
    }
    static async obtenerJugadoresDashboard(): Promise<TJugadorDashboard[]> {
        const url = `${localStorage.getItem('URL_BACKEND')}/Administracion/Jugador/obtenerDashboard`;
        const response = await axios.get(url);
        const JUGADORES = response.data as Array<TJugadorDashboard>;
        return JUGADORES.map((e, i) => ({
            ...e,
            Numero: e.Numero || 0,
            Posicion: e.Posicion || '',
            Edad: e.Edad || 18,
            Nacionalidad: e.Nacionalidad || '',
        }));
    }

    static async obtenerJugadores(): Promise<TJugador[]> {
        const url = `${localStorage.getItem('URL_BACKEND')}/Administracion/Jugador/obtener`;
        const response = await axios.get(url);
        const JUGADORES = response.data as Array<TJugador>;
        return JUGADORES.map((e, i) => ({
            ...e,
            Index: i,
            Numero: e.Numero || 0,
            Posicion: e.Posicion || '',
            Edad: e.Edad || 18,
            Nacionalidad: e.Nacionalidad || '',
        }));
    }
    static async obternerJugadorePorEquipo(equipo: string): Promise<Array<TJugador>> {
        const url = `${localStorage.getItem('URL_BACKEND')}/Administracion/Jugador/obtenerPorEquipo`;
        const response = await axios.post(url, {
            Equipo: parseInt(equipo),
        });
        const JUGADORES = response.data as Array<TJugador>;
        return JUGADORES.map((e, i) => ({
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
        }));
    }
}
