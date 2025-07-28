type TResultado = {
    TipoJuego: string;
    Resultado: TResultadoPregunta;
};
export type TResultadoPregunta = {
    Correctas: number;
    Incorrectas: number;
};
export default class UsoCasoAlmacenarResultado {
    private readonly TipoJuego: string = '';
    constructor(juego: string) {
        this.TipoJuego = `P${juego}`;
    }
    public iniciar(resultado: TResultadoPregunta) {
        const idFecha = UsoCasoAlmacenarResultado.construirIdFechaHoy();
        const resultadoLocal: TResultado = { TipoJuego: this.TipoJuego, Resultado: resultado };
        localStorage.setItem(idFecha.toString(), JSON.stringify(resultadoLocal));
    }
    public existeResultado(): boolean {
        const idFecha = UsoCasoAlmacenarResultado.construirIdFechaHoy();
        return Boolean(localStorage.getItem(idFecha.toString()));
    }
    public obtenerResultado(): TResultadoPregunta {
        const idFecha = UsoCasoAlmacenarResultado.construirIdFechaHoy();
        const RES_STR = localStorage.getItem(idFecha.toString()) as string;
        const RESULTADO: TResultado = JSON.parse(RES_STR);
        return RESULTADO.Resultado;
    }
    static construirIdFechaHoy(): number {
        const fecha = new Date();
        const anio = fecha.getFullYear();
        const mes = fecha.getMonth() + 1;
        const dia = fecha.getDate();
        const idFecha = `${anio}${mes.toString().padStart(2, '0')}${dia.toString().padStart(2, '0')}`;
        return parseInt(idFecha);
    }
}
