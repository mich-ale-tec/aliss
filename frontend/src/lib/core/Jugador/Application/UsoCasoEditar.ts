import type { TJugador } from '$lib/core/Equipo/Domain/TJugador.js';
import { ErrorPersonalizado } from '$lib/core/shared/Infraestructure/ErrorPersonalizado.js';
import axios from 'axios';
import type { IModificarJugadores } from '$lib/core/Jugador/Domain/IModificarEquipo.js';
import { mostrarToast } from '../../../../store/ToastStore.js';
import Jugador from '$lib/core/Jugador/Application/Jugador.js';

export default class UsoCasoEditar extends Jugador {
    constructor(jugador: TJugador) {
        super(jugador);
    }
    public async iniciar(propsRunas: IModificarJugadores): Promise<void> {
        try {
            this.validar();
            const JUGADOR = await this.editar();
            propsRunas.modificarJugador(JUGADOR);
            mostrarToast({
                Mostrar: true,
                Texto: 'Actualizado',
                Icono: 'carbon:warning',
                Tipo: 'success',
            });
        } catch (error: any) {
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
