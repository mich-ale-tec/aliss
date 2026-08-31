import { mostrarToast } from '../../../../store/ToastStore.js';
import { ErrorPersonalizado } from '$lib/core/shared/Infraestructure/ErrorPersonalizado.js';
import { api } from '$lib/core/shared/Infraestructure/api.js';
import type { TTorneoAPI } from '$lib/core/Torneo/Domain/TTorneo.js';
import CTorneo from '$lib/core/Torneo/Application/CTorneo.js';

export default class UsoCasoAgregar extends CTorneo {
    constructor(torneo: TTorneoAPI) {
        super(torneo);
    }
    public async iniciar(): Promise<TTorneoAPI | void> {
        try {
            this.validarAgregar();
            const TORNEO = await this.agregar();
            mostrarToast({
                Mostrar: true,
                Texto: 'Agregado',
                Icono: 'qlementine-icons:success-12',
                Tipo: 'success',
            });
            return TORNEO;
        } catch (error: unknown) {
            ErrorPersonalizado.retornarError(error);
        }
    }
    private async agregar(): Promise<TTorneoAPI> {
        const res = await api.post<TTorneoAPI>('/Administracion/Torneo/agregar', {
            Nombre: this.Nombre,
            Descripcion: this.Descripcion,
            Logo: this.Logo,
            Liga: this.Liga,
            FechaInicio: this.FechaInicio,
            FechaFin: this.FechaFin,
        });
        return res.data as TTorneoAPI;
    }
}
