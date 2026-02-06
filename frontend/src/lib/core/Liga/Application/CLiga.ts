import type { TLigaAPI } from '$lib/core/Liga/Domain/TLiga.js';
import axios from 'axios';
import { ErrorPersonalizado } from '$lib/core/shared/Infraestructure/ErrorPersonalizado.js';

export default class CLiga {
    protected readonly Codigo: number;
    protected readonly Logo: string;
    protected readonly Nombre: string;
    protected readonly Descripcion: string;
    protected readonly Anio: string;
    protected readonly FechaInicio: string;
    protected readonly FechaFin: string;
    protected readonly Equipos: number[];

    constructor(liga: TLigaAPI) {
        this.Codigo = liga.Codigo;
        this.Nombre = liga.Nombre;
        this.Logo = liga.Logo;
        this.Descripcion = liga.Descripcion;
        this.Anio = liga.Anio.toString();
        this.FechaInicio = liga.FechaInicio;
        this.FechaFin = liga.FechaFin;
        this.Equipos = liga.Equipos;
    }
    public validarEditar() {
        this.validarNombre();
        this.validarAnio();
        this.validarLogo();
        this.validarFecha();
    }
    public validarAgregar() {
        this.validarNombre();
        this.validarAnio();
        this.validarLogo();
        this.validarFecha();
    }
    private validarLogo() {
        if (!this.Logo) {
            throw new ErrorPersonalizado('¡Por favor el campo logo no puede quedar vacio!');
        }
    }
    private validarNombre() {
        if (!this.Nombre) {
            throw new ErrorPersonalizado('¡Por favor el campo nombre no puede quedar vacio!');
        }
    }
    private validarFecha() {
        if (!this.FechaInicio) {
            throw new ErrorPersonalizado('¡Por favor el campo Fecha Inicio no puede quedar vacio!');
        }
        if (!this.FechaFin) {
            throw new ErrorPersonalizado('¡Por favor el campo Fecha Fin no puede quedar vacio!');
        }
    }
    private validarAnio() {
        const ES_NUMERO = this.esNumero(this.Anio.toString());
        if (!ES_NUMERO) {
            throw new ErrorPersonalizado('¡Por favor el campo Año tiene que ser numérico!');
        }
        if (parseInt(this.Anio) < 2020) {
            throw new ErrorPersonalizado(
                '¡Por favor el campo Año tiene que tener un valor válido mayor a 2020!',
            );
        }
    }
    private esNumero(valor: string): boolean {
        const regex = /^\d+$/;
        return regex.test(valor);
    }
    static async obtenerLigas(): Promise<TLigaAPI[]> {
        const url = `${localStorage.getItem('URL_BACKEND')}/Administracion/Liga/obtener`;
        const response = await axios.get(url);
        return response.data as TLigaAPI[];
    }
    static async obtenerLiga(codigo: string): Promise<TLigaAPI | void> {
        try {
            const url = `${localStorage.getItem('URL_BACKEND')}/Administracion/Liga/obtenerPorCodigo`;
            const res = await axios.post(url, {
                Liga: parseInt(codigo),
            });
            return res.data as TLigaAPI;
        } catch (error) {
            ErrorPersonalizado.retornarError(error);
        }
    }
}
