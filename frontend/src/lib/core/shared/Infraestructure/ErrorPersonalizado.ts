import { mostrarToast, type TToastTipo } from '../../../../store/ToastStore.js';

export class ErrorPersonalizado extends Error {
    private Tipo: TToastTipo;
    constructor(mensaje: string, tipo?: TToastTipo) {
        super(mensaje);
        this.name = 'ErrorPersonalizado';
        this.Tipo = tipo || 'warning';
    }
    static retornarError(error: Error) {
        if (error instanceof ErrorPersonalizado) {
            mostrarToast({
                Mostrar: true,
                Texto: error.message,
                Icono: 'carbon:warning',
                Tipo: error.Tipo,
            });
        } else {
            mostrarToast({
                Mostrar: true,
                Texto: '¡Ups! Algo salio mal.',
                Icono: 'carbon:warning',
                Tipo: 'danger',
            });
        }
        console.warn(error);
    }
}
