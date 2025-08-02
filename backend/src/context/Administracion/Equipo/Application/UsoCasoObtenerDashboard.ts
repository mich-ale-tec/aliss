import { RepositoryMain } from '../Domain/RepositoryMain';
import { RepositoryMain as RepositoryMainJugador } from '../../Jugador/Domain/RepositoryMain';
import { RepositoryImplMain } from '../Infraestructure/RepositoryImplMain';
import { RepositoryImplMain as RepositoryImplMainJugador } from '../../Jugador/Infraestructure/RepositoryImplMain';
import { ParameterizedContext } from 'koa';
import { TEquipoDashboard } from '../Domain/TResponse';
import UsoCaso from '../../../shared/Infraestructure/UsoCaso';
import { TOptions } from '../../../shared/Domain/RepositoryGenerico';

export default class UsoCasoObtenerDashboard extends UsoCaso {
    private readonly repo: RepositoryMain;
    private readonly repoJugador: RepositoryMainJugador;
    constructor(ctx: ParameterizedContext) {
        super(ctx);
        this.repo = new RepositoryImplMain(this.lanzarError);
        this.repoJugador = new RepositoryImplMainJugador(this.lanzarError);
    }
    async init(): Promise<Array<TEquipoDashboard>> {
        const client = await this.repo.connection();
        try {
            const EQUIPOS_DASHBOARD: TEquipoDashboard[] = [];
            const opciones: TOptions = { Client: client };
            const EQUIPOS = await this.repo.obtener(opciones);
            for (const equipo of EQUIPOS) {
                const JUGADORES = await this.repoJugador.obtenerJugadoresPorEquipo(
                    equipo.Codigo,
                    opciones,
                );
                EQUIPOS_DASHBOARD.push({
                    ...equipo,
                    CantidadJugadores: JUGADORES.length,
                });
            }
            return EQUIPOS_DASHBOARD;
        } finally {
            await this.repo.closeConnection(client);
        }
    }
}
