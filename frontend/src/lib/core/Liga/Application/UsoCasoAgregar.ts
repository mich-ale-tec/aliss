import { mostrarToast } from '../../../../store/ToastStore.js';
import { ErrorPersonalizado } from '$lib/core/shared/Infraestructure/ErrorPersonalizado.js';
import axios from 'axios';
import CLiga from '$lib/core/Liga/Application/CLiga.js';
import type { TLigaAPI } from '$lib/core/Liga/Domain/TLiga.js';

export default class UsoCasoAgregar extends CLiga {
    constructor(equipo: TLigaAPI) {
        super(equipo);
    }
    public async iniciar(): Promise<TLigaAPI | void> {
        try {
            this.validarAgregar();
            const LIGA = await this.agregar();
            mostrarToast({
                Mostrar: true,
                Texto: 'Agregado',
                Icono: 'qlementine-icons:success-12',
                Tipo: 'success',
            });
            return LIGA;
        } catch (error: unknown) {
            ErrorPersonalizado.retornarError(error);
        }
    }
    private async agregar(): Promise<TLigaAPI> {
        const url = `${localStorage.getItem('URL_BACKEND')}/Administracion/Liga/agregar`;
        const res = await axios.post<TLigaAPI>(url, {
            Nombre: this.Nombre,
            Descripcion: this.Descripcion,
            Logo: this.Logo,
            Anio: parseInt(this.Anio),
            FechaInicio: this.FechaInicio,
            FechaFin: this.FechaFin,
            Equipos: this.Equipos,
        });
        return res.data as TLigaAPI;
    }
}
