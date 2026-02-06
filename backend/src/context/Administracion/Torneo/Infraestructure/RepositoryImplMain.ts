import { RepositoryImplMongoGenerico as RepoImplMongoGene } from '../../../shared/Infraestructure/RepositoryImplMongoGenerico';
import { RepositoryMain } from '../Domain/RepositoryMain';
import { AdapterConfigure as AC } from './AdapterConfigure';
import { TOptions } from '../../../shared/Domain/RepositoryGenerico';
import { pipeline } from '../../../shared/Domain/EntityUpdate';
import ErrorPersonalizado from '../../../shared/Infraestructure/ErrorPersonalizado';
import { TEntityMain } from '../Domain/TEntityMain';
import { TRequestAgregar } from '../Domain/TRequest';

export class RepositoryImplMain extends RepoImplMongoGene<TEntityMain> implements RepositoryMain {
    private lanzarError: ErrorPersonalizado;
    constructor(lanzarError: ErrorPersonalizado) {
        super(AC.URI, AC.DATABASE, AC.SCHEMA, AC.ENTITY);
        this.lanzarError = lanzarError;
    }
    async agregar(body: TRequestAgregar, opciones: Required<TOptions>): Promise<TEntityMain> {
        const CODIGO = await this.obtenerCodigo(opciones);
        const TORNEO: TEntityMain = {
            Codigo: CODIGO,
            Nombre: body.Nombre,
            Liga: body.Liga,
            Descripcion: body.Descripcion,
            Logo: body.Logo,
            FechaInicio: body.FechaInicio,
            FechaFin: body.FechaFin,
        };
        await this.saveOne(opciones.Client, opciones.Session, TORNEO);
        return TORNEO;
    }
    async obtener(opciones: TOptions): Promise<TEntityMain[]> {
        const pipe: Array<pipeline> = [{ $match: {} }];
        return await this.find(opciones.Client, pipe);
    }
    async obtenerPorCodigo(opciones: TOptions, c: TEntityMain['Codigo']): Promise<TEntityMain> {
        const pipe: Array<pipeline> = [{ $match: { Codigo: c } }];
        const [TORNEO] = await this.find(opciones.Client, pipe);
        return TORNEO;
    }
    async obtenerPorLiga(codigo: number, opciones: TOptions): Promise<TEntityMain[]> {
        const pipe: Array<pipeline> = [{ $match: { Liga: codigo } }];
        return await this.find(opciones.Client, pipe);
    }
    private async obtenerCodigo(opciones: TOptions): Promise<TEntityMain['Codigo']> {
        const pipe: Array<pipeline> = [
            { $group: { _id: null, Codigo: { $max: '$Codigo' } } },
            { $project: { _id: 0, Codigo: 1 } },
            { $limit: 1 },
        ];
        const LIGAS = await this.find(opciones.Client, pipe);
        return LIGAS.length > 0 ? LIGAS[0].Codigo + 1 : 1;
    }
}
