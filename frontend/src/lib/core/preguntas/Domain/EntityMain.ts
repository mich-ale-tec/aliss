export type TEntityMain = {
    id: number;
    nombre: string;
    descripcion: string;
    respuestas: Array<TRespuesta>;
};
type TRespuesta = {
    id: number;
    nombre: string;
};
