export type TRequestAgregar = {
    Nombre: string;
    Descripcion: string;
    Logo: string;
    Anio: number;
    FechaInicio: string;
    FechaFin: string;
    Equipos: number[];
};
export type TRequestEditar = {
    Codigo: number;
    Nombre: string;
    Descripcion: string;
    Logo: string;
    Anio: number;
    FechaInicio: string;
    FechaFin: string;
    Equipos: number[];
};
export type TRequestPorCodigo = {
    Liga: number;
};
