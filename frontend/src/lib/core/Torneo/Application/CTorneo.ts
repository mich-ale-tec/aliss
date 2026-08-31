import type { TTorneoAPI } from '$lib/core/Torneo/Domain/TTorneo.js';
import { ErrorPersonalizado } from '$lib/core/shared/Infraestructure/ErrorPersonalizado.js';
import { api } from '$lib/core/shared/Infraestructure/api.js';

export default class CTorneo {
    protected readonly Codigo: number;
    protected readonly Logo: string;
    protected readonly Nombre: string;
    protected readonly Descripcion: string;
    protected readonly Liga: number;
    protected readonly FechaInicio: string;
    protected readonly FechaFin: string;

    constructor(torneo: TTorneoAPI) {
        this.Codigo = torneo.Codigo;
        this.Nombre = torneo.Nombre;
        this.Logo = torneo.Logo;
        this.Descripcion = torneo.Descripcion;
        this.Liga = torneo.Liga;
        this.FechaInicio = torneo.FechaInicio;
        this.FechaFin = torneo.FechaFin;
    }
    public validarAgregar() {
        this.validarNombre();
        this.validarLogo();
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
    static async obtenerPorCodigo(codigo: string): Promise<TTorneoAPI | void> {
        try {
            const res = await api.post('/Administracion/Torneo/obtenerPorCodigo', {
                Codigo: parseInt(codigo),
            });
            return res.data as TTorneoAPI;
        } catch (error) {
            ErrorPersonalizado.retornarError(error);
        }
    }
    static async obtenerPorLiga(codigo: string): Promise<TTorneoAPI[] | void> {
        try {
            const res = await api.post('/Administracion/Torneo/obtenerPorLiga', {
                Liga: parseInt(codigo),
            });
            return res.data as TTorneoAPI[];
        } catch (error) {
            ErrorPersonalizado.retornarError(error);
        }
    }
}
