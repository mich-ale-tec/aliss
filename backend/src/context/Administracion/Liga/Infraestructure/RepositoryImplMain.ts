import { RepositoryImplMongoGenerico as RepoImplMongoGene } from '../../../shared/Infraestructure/RepositoryImplMongoGenerico';
import { RepositoryMain } from '../Domain/RepositoryMain';
import { AdapterConfigure as AC } from './AdapterConfigure';
import { TOptions } from '../../../shared/Domain/RepositoryGenerico';
import { pipeline } from '../../../shared/Domain/EntityUpdate';
import ErrorPersonalizado from '../../../shared/Infraestructure/ErrorPersonalizado';
import { TEntityMain } from '../Domain/TEntityMain';
import { TRequestAgregar, TRequestEditar } from '../Domain/TRequest';
import { Filter, UpdateFilter } from 'mongodb';

export class RepositoryImplMain extends RepoImplMongoGene<TEntityMain> implements RepositoryMain {
    private lanzarError: ErrorPersonalizado;
    constructor(lanzarError: ErrorPersonalizado) {
        super(AC.URI, AC.DATABASE, AC.SCHEMA, AC.ENTITY);
        this.lanzarError = lanzarError;
    }
    async obtener(opciones: TOptions): Promise<TEntityMain[]> {
        const pipe: Array<pipeline> = [{ $match: {} }];
        return await this.find(opciones.Client, pipe);
    }
    async obtenerPorCodigo(codigo: number, opciones: TOptions): Promise<TEntityMain> {
        const pipe: Array<pipeline> = [{ $match: { Codigo: codigo } }];
        const LIGAS = await this.find(opciones.Client, pipe);
        const [LIGA] = LIGAS;
        return LIGA;
    }
    async agregar(body: TRequestAgregar, opciones: Required<TOptions>): Promise<TEntityMain> {
        const CODIGO = await this.obtenerCodigo(opciones);
        const LIGA: TEntityMain = {
            Codigo: CODIGO,
            Nombre: body.Nombre,
            Descripcion: body.Descripcion,
            Logo: body.Logo,
            Anio: body.Anio,
            FechaInicio: body.FechaInicio,
            FechaFin: body.FechaFin,
            Equipos: body.Equipos,
        };
        await this.saveOne(opciones.Client, opciones.Session, LIGA);
        return LIGA;
    }
    async editar(body: TRequestEditar, opciones: Required<TOptions>) {
        const FILTER: Filter<TEntityMain> = { Codigo: body.Codigo };
        const UPDATE: UpdateFilter<TEntityMain> = {
            $set: {
                Nombre: body.Nombre,
                Descripcion: body.Descripcion,
                Logo: body.Logo,
                Anio: body.Anio,
                FechaInicio: body.FechaInicio,
                FechaFin: body.FechaFin,
                Equipos: body.Equipos,
            },
        };
        await this.updateOne(opciones.Client, opciones.Session, FILTER, UPDATE);
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
