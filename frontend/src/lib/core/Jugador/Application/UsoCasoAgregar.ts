import CJugador from '$lib/core/Jugador/Application/CJugador.js';
import type { TJugador } from '$lib/core/Jugador/Domain/TJugador.js';
import { ErrorPersonalizado } from '$lib/core/shared/Infraestructure/ErrorPersonalizado.js';
import { api } from '$lib/core/shared/Infraestructure/api.js';
import { mostrarToast } from '../../../../store/ToastStore.js';

export default class UsoCasoAgregar extends CJugador {
    constructor(jugador: TJugador) {
        super(jugador);
    }
    public async iniciar(): Promise<TJugador | void> {
        try {
            this.validar();
            const JUGADOR = await this.agregar();
            mostrarToast({
                Mostrar: true,
                Texto: 'Agregado',
                Icono: 'qlementine-icons:success-12',
                Tipo: 'success',
            });
            return JUGADOR;
        } catch (error: unknown) {
            ErrorPersonalizado.retornarError(error);
        }
    }
    private async agregar(): Promise<TJugador> {
        const res = await api.post<TJugador>('/Administracion/Jugador/agregar', {
            Equipo: this.Equipo,
            Numero: this.Numero,
            ApellidoPaterno: this.ApellidoPaterno,
            ApellidoMaterno: this.ApellidoMaterno,
            Nombres: this.Nombres,
            Posicion: this.Posicion,
            Edad: this.Edad,
            Nacionalidad: this.Nacionalidad,
        });
        return res.data as TJugador;
    }
}
