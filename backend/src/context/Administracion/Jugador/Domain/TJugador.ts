export type TJugador = {
    Codigo: number;
    Equipo: number;
    ApellidoPaterno: string;
    ApellidoMaterno: string;
    Nombres: string;
    Numero: number;
    Posicion: string;
    Edad: number;
    Nacionalidad: string;
    Status: TStatus;
};
type TStatus = TStatusActivo | TStatusInactivo;
type TStatusActivo = {
    IdStatus: 1;
    Status: 'Activo';
};
type TStatusInactivo = {
    IdStatus: 10;
    Status: 'Inactivo';
};
