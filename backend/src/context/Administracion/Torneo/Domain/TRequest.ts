export type TRequestAgregar = {
    Nombre: string;
    Descripcion: string;
    Logo: string;
    Liga: number;
    FechaInicio: string;
    FechaFin: string;
};
export type TRequestPorLiga = {
    Liga: number;
};
export type TRequestPorCodigo = {
    Codigo: number;
};
