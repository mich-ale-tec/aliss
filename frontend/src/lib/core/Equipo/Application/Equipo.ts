import type { TEquipo, TEquipoDashboard } from '$lib/core/Equipo/Domain/TEquipo.js';
import axios from 'axios';
import { ErrorPersonalizado } from '$lib/core/shared/Infraestructure/ErrorPersonalizado.js';
import type { TEstadistica } from '$lib/core/Equipo/Domain/Estadistica.js';

export default class CEquipo {
    protected Codigo: number;
    protected readonly Nombre: string;
    protected readonly Breve: string;
    protected Descripcion: string;
    protected Entrenador: string;
    protected Fundado: string;
    protected Estadio: string;
    protected Ciudad: string;
    protected Logo: string;
    constructor(equipo: TEquipo) {
        this.Codigo = equipo.Codigo;
        this.Nombre = equipo.Nombre;
        this.Breve = equipo.Breve;
        this.Descripcion = equipo.Descripcion;
        this.Entrenador = equipo.Entrenador;
        this.Fundado = equipo.Fundado;
        this.Estadio = equipo.Estadio;
        this.Ciudad = equipo.Ciudad;
        this.Logo = equipo.Logo;
    }
    protected validar() {
        this.validarNombre();
        this.validarBreve();
    }
    private validarNombre() {
        const ES_NUMERO = this.esNumero(this.Nombre);
        if (ES_NUMERO) {
            throw new ErrorPersonalizado('¡Por favor el campo nombre no puede ser númerico!');
        }
        if (!this.Nombre) {
            throw new ErrorPersonalizado('¡Por favor el campo nombre no puede quedar vacio!');
        }
    }
    private validarBreve() {
        const ES_NUMERO = this.esNumero(this.Breve);
        if (ES_NUMERO) {
            throw new ErrorPersonalizado('¡Por favor el campo breve no puede ser númerico!');
        }
        if (!this.Breve) {
            throw new ErrorPersonalizado('¡Por favor el campo breve no puede quedar vacio!');
        }
    }
    static async obtenerEquipos(): Promise<Array<TEquipo>> {
        const url = `${localStorage.getItem('URL_BACKEND')}/Administracion/Equipo/obtener`;
        const res = await axios.get(url);
        return res.data as Array<TEquipo>;
    }
    static async obtenerEquiposDashboard(): Promise<Array<TEquipoDashboard>> {
        const url = `${localStorage.getItem('URL_BACKEND')}/Administracion/Equipo/obtenerDashboard`;
        const res = await axios.get(url);
        return res.data as Array<TEquipoDashboard>;
    }
    static async obtenerEquipo(codigo: string): Promise<TEquipo> {
        const url = `${localStorage.getItem('URL_BACKEND')}/Administracion/Equipo/obtenerPorCodigo`;
        const res = await axios.post(url, {
            Equipo: parseInt(codigo),
        });
        const EQUIPO = res.data as TEquipo;
        return {
            ...EQUIPO,
            Index: 0,
            Jugadores: EQUIPO.Jugadores || [],
            Logo: EQUIPO.Logo || '',
            Entrenador: EQUIPO.Entrenador || '',
            Fundado: EQUIPO.Fundado || '',
            Estadio: EQUIPO.Estadio || '',
            Ciudad: EQUIPO.Ciudad || '',
        };
    }
    static async estadistica(): Promise<TEstadistica> {
        const url = `${localStorage.getItem('URL_BACKEND')}/Administracion/Equipo/estadistica`;
        const res = await axios.get(url);
        return res.data as TEstadistica;
    }
    private esNumero(valor: string): boolean {
        const regex = /^\d+$/;
        return regex.test(valor);
    }
}
