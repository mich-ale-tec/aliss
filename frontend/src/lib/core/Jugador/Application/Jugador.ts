import type { TJugador } from '$lib/core/Equipo/Domain/TJugador.js';
import { ErrorPersonalizado } from '$lib/core/shared/Infraestructure/ErrorPersonalizado.js';

export default class Jugador {
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
    private esNumero(valor: string): boolean {
        const regex = /^\d+$/;
        return regex.test(valor);
    }

    private convertirNumero(valor: string | number): number {
        return typeof valor === 'number' ? valor : parseInt(valor);
    }
}
