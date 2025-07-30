import Jugador from '$lib/core/Jugador/Application/Jugador.js';
import type { TJugador } from '$lib/core/Equipo/Domain/TJugador.js';
import { ErrorPersonalizado } from '$lib/core/shared/Infraestructure/ErrorPersonalizado.js';
import axios from 'axios';
import { mostrarToast } from '../../../../store/ToastStore.js';
import type { IModificarJugadores } from '$lib/core/Jugador/Domain/IModificarEquipo.js';

export default class UsoCasoAgregar extends Jugador {
    constructor(jugador: TJugador) {
        super(jugador);
    }
    public async iniciar(propsRunas: IModificarJugadores): Promise<void> {
        try {
            this.validar();
            const JUGADOR = await this.agregar();
            propsRunas.agregarJugador(JUGADOR);
            mostrarToast({
                Mostrar: true,
                Texto: 'Agregado',
                Icono: 'carbon:warning',
                Tipo: 'success',
            });
        } catch (error: any) {
            ErrorPersonalizado.retornarError(error);
        }
    }
    private async agregar(): Promise<TJugador> {
        const url = `${localStorage.getItem('URL_BACKEND')}/Administracion/Jugador/agregar`;
        const res = await axios.post<TJugador>(url, {
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
