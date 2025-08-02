export type TRequestPorEquipo = {
    Equipo: number;
};
export type TRequestEditar = {
    Codigo: number;
    Numero: number;
    ApellidoPaterno: string;
    ApellidoMaterno: string;
    Nombres: string;
    Posicion: string;
    Edad: number;
    Nacionalidad: string;
};
export type TRequestAgregar = {
    Equipo: number;
    Numero: number;
    ApellidoPaterno: string;
    ApellidoMaterno: string;
    Nombres: string;
    Posicion: string;
    Edad: number;
    Nacionalidad: string;
};
export type TRequestPorCodigo = {
    Codigo: number;
};
