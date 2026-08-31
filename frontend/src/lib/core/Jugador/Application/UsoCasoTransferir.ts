import CJugador from '$lib/core/Jugador/Application/CJugador.js';
import type { TJugador } from '$lib/core/Jugador/Domain/TJugador.js';
import { ErrorPersonalizado } from '$lib/core/shared/Infraestructure/ErrorPersonalizado.js';
import { mostrarToast } from '../../../../store/ToastStore.js';
import { api } from '$lib/core/shared/Infraestructure/api.js';

export default class UsoCasoTransferir extends CJugador {
    constructor(jugador: TJugador) {
        super(jugador);
    }
    public async iniciar(equipo: string): Promise<TJugador | void> {
        try {
            this.validarTranferencia(equipo);
            const JUGADOR = await this.transferir(equipo);
            mostrarToast({
                Mostrar: true,
                Texto: '¡Transferido!',
                Icono: 'qlementine-icons:success-12',
                Tipo: 'success',
            });
            return JUGADOR;
        } catch (error: unknown) {
            ErrorPersonalizado.retornarError(error);
        }
    }
    private async transferir(equipo: string): Promise<TJugador> {
        const res = await api.post<TJugador>('/Administracion/Jugador/transferir', {
            Codigo: this.Codigo,
            Equipo: parseInt(equipo),
        });
        return res.data as TJugador;
    }
}
