import { TJugador } from '../Domain/TJugador';
import { TRequestPorEquipo } from '../Domain/TRequest';
import { RepositoryMain } from '../Domain/RepositoryMain';
import { RepositoryImplMain } from '../Infraestructure/RepositoryImplMain';
import UsoCaso from '../../../shared/Infraestructure/UsoCaso';
import { ParameterizedContext } from 'koa';
import Equipo from '../../Equipo/Application/Services/Equipo';

export default class UsoCasoObtenerPorEquipo extends UsoCaso {
    private readonly repoMain: RepositoryMain;
    constructor(ctx: ParameterizedContext) {
        super(ctx);
        this.repoMain = new RepositoryImplMain(this.lanzarError);
    }
    async init(body: TRequestPorEquipo): Promise<Array<TJugador>> {
        const client = await this.repoMain.connection();
        try {
            const JUGADORES = await this.repoMain.obtenerJugadoresPorEquipo(body.Equipo, {
                Client: client,
            });
            const equipo = new Equipo();
            equipo.establecerJugadores(JUGADORES);
            const JUGADORES_ORDENADOS = equipo.ordenarJugadoresPorPosicion();
            return JUGADORES_ORDENADOS.map(e => {
                if ('_id' in e) {
                    delete e._id;
                }
                return e;
            });
        } finally {
            await this.repoMain.closeConnection(client);
        }
    }
}
