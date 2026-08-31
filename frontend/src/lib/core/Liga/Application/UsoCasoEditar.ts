import { mostrarToast } from '../../../../store/ToastStore.js';
import { ErrorPersonalizado } from '$lib/core/shared/Infraestructure/ErrorPersonalizado.js';
import { api } from '$lib/core/shared/Infraestructure/api.js';
import CLiga from '$lib/core/Liga/Application/CLiga.js';
import type { TLigaAPI } from '$lib/core/Liga/Domain/TLiga.js';

export default class UsoCasoEditar extends CLiga {
    constructor(liga: TLigaAPI) {
        super(liga);
    }
    public async iniciar(equipos: number[]): Promise<TLigaAPI | void> {
        try {
            this.validarEditar();
            const LIGA = await this.editar(equipos);
            mostrarToast({
                Mostrar: true,
                Texto: '¡Liga Actualizada!',
                Icono: 'qlementine-icons:success-12',
                Tipo: 'success',
            });
            return LIGA;
        } catch (error: unknown) {
            ErrorPersonalizado.retornarError(error);
        }
    }
    private async editar(equipos: number[]): Promise<TLigaAPI> {
        const res = await api.patch<TLigaAPI>('/Administracion/Liga/editar', {
            Codigo: this.Codigo,
            Nombre: this.Nombre,
            Descripcion: this.Descripcion,
            Logo: this.Logo,
            Anio: parseInt(this.Anio),
            FechaInicio: this.FechaInicio,
            FechaFin: this.FechaFin,
            Equipos: equipos,
        });
        return res.data as TLigaAPI;
    }
}
