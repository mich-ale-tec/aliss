import CJugador from '$lib/core/Jugador/Application/CJugador.js';
import type { TJugador } from '$lib/core/Jugador/Domain/TJugador.js';
import { ErrorPersonalizado } from '$lib/core/shared/Infraestructure/ErrorPersonalizado.js';
import axios from 'axios';
import { mostrarToast } from '../../../../store/ToastStore.js';

export default class UsoCasoDarBaja extends CJugador {
    constructor(jugador: TJugador) {
        super(jugador);
    }
    public async iniciar(): Promise<TJugador | void> {
        try {
            this.validarDarBaja();
            const JUGADOR = await this.darBaja();
            mostrarToast({
                Mostrar: true,
                Texto: '¡Jugador dado de baja!',
                Icono: 'qlementine-icons:success-12',
                Tipo: 'success',
            });
            return JUGADOR;
        } catch (error: unknown) {
            ErrorPersonalizado.retornarError(error);
        }
    }
    private async darBaja(): Promise<TJugador> {
        const url = `${localStorage.getItem('URL_BACKEND')}/Administracion/Jugador/darBaja`;
        const res = await axios.post<TJugador>(url, {
            Codigo: this.Codigo,
        });
        return res.data as TJugador;
    }
}
