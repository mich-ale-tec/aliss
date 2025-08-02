import type { TJugador } from '$lib/core/Jugador/Domain/TJugador.js';
import { ErrorPersonalizado } from '$lib/core/shared/Infraestructure/ErrorPersonalizado.js';
import axios from 'axios';
import { mostrarToast } from '../../../../store/ToastStore.js';
import CJugador from '$lib/core/Jugador/Application/CJugador.js';

export default class UsoCasoEditar extends CJugador {
    constructor(jugador: TJugador) {
        super(jugador);
    }
    public async iniciar(): Promise<TJugador | void> {
        try {
            this.validar();
            const JUGADOR = await this.editar();
            mostrarToast({
                Mostrar: true,
                Texto: 'Actualizado',
                Icono: 'qlementine-icons:success-12',
                Tipo: 'success',
            });
            return JUGADOR;
        } catch (error: unknown) {
            ErrorPersonalizado.retornarError(error);
        }
    }
    private async editar(): Promise<TJugador> {
        const url = `${localStorage.getItem('URL_BACKEND')}/Administracion/Jugador/editar`;
        const res = await axios.patch<TJugador>(url, {
            Codigo: this.Codigo,
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
