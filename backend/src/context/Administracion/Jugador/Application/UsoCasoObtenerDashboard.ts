import { RepositoryMain } from '../Domain/RepositoryMain';
import { RepositoryImplMain } from '../Infraestructure/RepositoryImplMain';
import UsoCaso from '../../../shared/Infraestructure/UsoCaso';
import { ParameterizedContext } from 'koa';
import { TJugadorDashboard } from '../Domain/TResponse';
import { RepositoryMain as RepositoryMainEquipo } from '../../Equipo/Domain/RepositoryMain';
import { RepositoryImplMain as RepositoryImplMainEquipo } from '../../Equipo/Infraestructure/RepositoryImplMain';

export default class UsoCasoObtenerDashboard extends UsoCaso {
    private readonly repo: RepositoryMain;
    private readonly repoEquipo: RepositoryMainEquipo;
    constructor(ctx: ParameterizedContext) {
        super(ctx);
        this.repo = new RepositoryImplMain(this.lanzarError);
        this.repoEquipo = new RepositoryImplMainEquipo(this.lanzarError);
    }
    async init(): Promise<Array<TJugadorDashboard>> {
        const client = await this.repo.connection();
        try {
            const JUGADORES_DASHBOARD: TJugadorDashboard[] = [];
            const JUGADORES = await this.repo.obtener({ Client: client });
            const EQUIPOS = await this.repoEquipo.obtener({ Client: client });
            for (const jugador of JUGADORES) {
                const EQUIPO = EQUIPOS.find(e => e.Codigo === jugador.Equipo);
                JUGADORES_DASHBOARD.push({
                    ...jugador,
                    EquipoNombre: EQUIPO ? EQUIPO.Nombre : 'Sin Equipo',
                });
            }
            return JUGADORES_DASHBOARD;
        } finally {
            await this.repo.closeConnection(client);
        }
    }
}
