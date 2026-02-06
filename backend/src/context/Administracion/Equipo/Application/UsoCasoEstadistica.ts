import UsoCaso from '../../../shared/Infraestructure/UsoCaso';
import { ParameterizedContext } from 'koa';
import { RepositoryMain } from '../Domain/RepositoryMain';
import { RepositoryImplMain } from '../Infraestructure/RepositoryImplMain';
import { TEstadistica } from '../Domain/Estadistica';
import { TEquipo } from '../Domain/TEquipo';

export default class UsoCasoEstadistica extends UsoCaso {
    private readonly repo: RepositoryMain;
    constructor(ctx: ParameterizedContext) {
        super(ctx);
        this.repo = new RepositoryImplMain(this.lanzarError);
    }
    public async init(): Promise<TEstadistica> {
        const EQUIPOS = await this.obtenerEquipos();
        return {
            Cantidad: EQUIPOS.length,
        };
    }
    private async obtenerEquipos(): Promise<TEquipo[]> {
        const client = await this.repo.connection();
        try {
            return await this.repo.obtener({ Client: client });
        } finally {
            await this.repo.closeConnection(client);
        }
    }
}
