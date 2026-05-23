export type TToastTipo = 'info' | 'success' | 'danger' | 'warning';
export type TToastStore = {
    Mostrar: boolean;
    Texto: string;
    Icono: string;
    Tipo: TToastTipo;
};
export declare const toast: import("svelte/store").Writable<TToastStore>;
export declare const mostrarToast: (payload: TToastStore) => void;
