import { mostrarToast, type TToastTipo } from '../../../../store/ToastStore.js';
import { AxiosError } from 'axios';

export class ErrorPersonalizado extends Error {
    private Tipo: TToastTipo;
    constructor(mensaje: string, tipo?: TToastTipo) {
        super(mensaje);
        this.name = 'ErrorPersonalizado';
        this.Tipo = tipo || 'warning';
    }
    static retornarError(error: Error | unknown) {
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
    static errorAPI(error: Error | unknown) {
        console.error(error);
        if (error instanceof AxiosError) {
            const { response } = error;
            // Reglas de negocio
            if (response && response.status === 422) {
                if (response.data.errorMsg) {
                    mostrarToast({
                        Mostrar: true,
                        Texto: response.data.errorMsg,
                        Icono: 'carbon:warning',
                        Tipo: 'warning',
                    });
                }
            } else {
                mostrarToast({
                    Mostrar: true,
                    Texto: '¡Ups! Tenemos problemas de conexión',
                    Icono: 'carbon:warning',
                    Tipo: 'danger',
                });
            }
        }
    }
}
