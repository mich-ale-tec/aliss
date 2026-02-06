import UsoCaso from '../../../shared/Infraestructure/UsoCaso';
import { ParameterizedContext } from 'koa';
import { RepositoryMain } from '../Domain/RepositoryMain';
import { RepositoryImplMain } from '../Infraestructure/RepositoryImplMain';
import { TEstadistica } from '../Domain/Estadistica';
import { TJugador } from '../Domain/TJugador';

export default class UsoCasoEstadistica extends UsoCaso {
    private readonly repo: RepositoryMain;
    constructor(ctx: ParameterizedContext) {
        super(ctx);
        this.repo = new RepositoryImplMain(this.lanzarError);
    }
    public async init(): Promise<TEstadistica> {
        const JUGADORES = await this.obtenerJugadores();
        return {
            Cantidad: JUGADORES.length,
            Activos: JUGADORES.filter(e => e.Status.IdStatus === 1).length,
            Inactivos: JUGADORES.filter(e => e.Status.IdStatus === 10).length,
        };
    }
    private async obtenerJugadores(): Promise<TJugador[]> {
        const client = await this.repo.connection();
        try {
            return await this.repo.obtener({ Client: client });
        } finally {
            await this.repo.closeConnection(client);
        }
    }
}
