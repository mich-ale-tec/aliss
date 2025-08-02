import CEquipo from '$lib/core/Equipo/Application/Equipo.js';
import type { TEquipo } from '$lib/core/Equipo/Domain/TEquipo.js';
import { mostrarToast } from '../../../../store/ToastStore.js';
import { ErrorPersonalizado } from '$lib/core/shared/Infraestructure/ErrorPersonalizado.js';
import axios from 'axios';

export default class UsoCasoAgregar extends CEquipo {
    constructor(equipo: TEquipo) {
        super(equipo);
    }
    public async iniciar(): Promise<TEquipo | void> {
        try {
            this.validar();
            const EQUIPO = await this.agregar();
            mostrarToast({
                Mostrar: true,
                Texto: 'Agregado',
                Icono: 'qlementine-icons:success-12',
                Tipo: 'success',
            });
            return EQUIPO;
        } catch (error: unknown) {
            ErrorPersonalizado.retornarError(error);
        }
    }
    private async agregar(): Promise<TEquipo> {
        const url = `${localStorage.getItem('URL_BACKEND')}/Administracion/Equipo/agregar`;
        const res = await axios.post<TEquipo>(url, {
            Nombre: this.Nombre,
            Breve: this.Breve,
            Descripcion: this.Descripcion,
            Logo: this.Logo,
            Entrenador: this.Entrenador,
            Fundado: this.Fundado,
            Estadio: this.Estadio,
            Ciudad: this.Ciudad,
        });
        return res.data as TEquipo;
    }
}
