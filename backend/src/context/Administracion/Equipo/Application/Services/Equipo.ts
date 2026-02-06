import { TJugador } from '../../../Jugador/Domain/TJugador';

export default class Equipo {
    private Jugadores: TJugador[] = [];
    private readonly Posiciones = [
        'Portero',
        'Defensa Central',
        'Lateral Izquierdo',
        'Lateral Derecho',
        'Pivote',
        'Mediocentro',
        'Mediocentro Ofensivo',
        'Extremo Derecho',
        'Extremo Izquierdo',
        'Delantero Centro',
    ];
    constructor() {}
    public establecerJugadores(jugadores: TJugador[]) {
        this.Jugadores = jugadores;
    }
    public ordenarJugadoresPorPosicion(): TJugador[] {
        const JUGADORES_ORDENADOS: TJugador[] = [];
        for (const posicion of this.Posiciones) {
            const JUGADORES = this.Jugadores.filter(e => this.comparaStr(e.Posicion, posicion));
            JUGADORES_ORDENADOS.push(...JUGADORES);
        }
        const JUGADORES_SIN_POSICION = this.obtenerJugadoresSinPosicion();
        return [...JUGADORES_SIN_POSICION, ...JUGADORES_ORDENADOS];
    }
    private comparaStr(cadena1: string, cadena2: string): boolean {
        const cadena1Transformado = cadena1.trim().toUpperCase();
        const cadena2Transformado = cadena2.trim().toUpperCase();
        return cadena1Transformado === cadena2Transformado;
    }
    private obtenerJugadoresSinPosicion(): TJugador[] {
        const POSICIONES_COMPARAR = this.Posiciones.map(e => e.toUpperCase().trim());
        return this.Jugadores.filter(
            e => !POSICIONES_COMPARAR.includes(e.Posicion.toUpperCase().trim()),
        );
    }
}
