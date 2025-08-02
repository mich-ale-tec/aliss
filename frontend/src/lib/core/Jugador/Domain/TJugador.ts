type TJugadorAPI = {
    Codigo: number;
    Equipo: number;
    ApellidoPaterno: string;
    ApellidoMaterno: string;
    Nombres: string;
    Numero: number;
    Posicion: string;
    Edad: number;
    Nacionalidad: string;
};
export type TJugadorDashboard = TJugadorAPI & {
    EquipoNombre: string;
};
export type TJugador = TJugadorAPI & {
    Index: number;
};
