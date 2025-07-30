import { writable } from 'svelte/store';

export type TToastTipo = 'info' | 'success' | 'danger' | 'warning';
export type TToastStore = {
    Mostrar: boolean;
    Texto: string;
    Icono: string;
    Tipo: TToastTipo;
};
const inicial: TToastStore = {
    Mostrar: false,
    Texto: '',
    Icono: '',
    Tipo: 'info',
};

export const toast = writable(inicial);
export const mostrarToast = (payload: TToastStore) =>
    toast.update(n => {
        if (n.Mostrar)
            return {
                Mostrar: true,
                Texto: n.Texto,
                Icono: n.Icono,
                Tipo: n.Tipo,
            };
        setTimeout(() => {
            toast.set({
                Mostrar: false,
                Texto: '',
                Icono: '',
                Tipo: 'info',
            });
        }, 4000);
        return {
            Mostrar: true,
            Texto: payload.Texto,
            Icono: payload.Icono,
            Tipo: payload.Tipo,
        };
    });
