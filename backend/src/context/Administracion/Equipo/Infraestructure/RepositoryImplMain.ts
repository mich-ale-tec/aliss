import { RepositoryImplMongoGenerico as RepoImplMongoGene } from '../../../shared/Infraestructure/RepositoryImplMongoGenerico';
import { RepositoryMain } from '../Domain/RepositoryMain';
import { AdapterConfigure as AC } from './AdapterConfigure';
import { TEquipo } from '../Domain/TEquipo';
import { TOptions } from '../../../shared/Domain/RepositoryGenerico';
import { pipeline } from '../../../shared/Domain/EntityUpdate';
import { TRequestAgregar, TRequestEditar } from '../Domain/TRequest';
import { Filter, UpdateFilter } from 'mongodb';
import ErrorPersonalizado from '../../../shared/Infraestructure/ErrorPersonalizado';

export class RepositoryImplMain extends RepoImplMongoGene<TEquipo> implements RepositoryMain {
    private lanzarError: ErrorPersonalizado;
    constructor(lanzarError: ErrorPersonalizado) {
        super(AC.URI, AC.DATABASE, AC.SCHEMA, AC.ENTITY);
        this.lanzarError = lanzarError;
    }
    async obtener(opciones: TOptions): Promise<Array<TEquipo>> {
        const pipe: Array<pipeline> = [{ $match: {} }];
        return await this.find(opciones.Client, pipe);
    }
    async obtenerPorCodigo(equipo: TEquipo['Codigo'], opciones: TOptions): Promise<TEquipo> {
        const pipe: Array<pipeline> = [{ $match: { Codigo: equipo } }];
        const EQUIPOS = await this.find(opciones.Client, pipe);
        const [EQUIPO] = EQUIPOS;
        if (!EQUIPO) this.lanzarError.negocio('¡No se encontró el equipo!');
        return EQUIPO;
    }
    async agregar(body: TRequestAgregar, opciones: Required<TOptions>): Promise<TEquipo> {
        const CODIGO = await this.obtenerCodigo(opciones);
        const EQUIPO: TEquipo = {
            Codigo: CODIGO,
            Nombre: body.Nombre,
            Breve: body.Breve,
            Descripcion: body.Descripcion,
            Logo: body.Logo,
            Entrenador: body.Entrenador,
            Fundado: body.Fundado,
            Estadio: body.Estadio,
            Ciudad: body.Ciudad,
        };
        await this.saveOne(opciones.Client, opciones.Session, EQUIPO);
        return EQUIPO;
    }
    async editar(body: TRequestEditar, opciones: Required<TOptions>): Promise<void> {
        const FILTER: Filter<TEquipo> = { Codigo: body.Codigo };
        const UPDATE: UpdateFilter<TEquipo> = {
            $set: {
                Breve: body.Breve,
                Ciudad: body.Ciudad,
                Descripcion: body.Descripcion,
                Entrenador: body.Entrenador,
                Estadio: body.Estadio,
                Fundado: body.Fundado,
                Logo: body.Logo,
            },
        };
        await this.updateOne(opciones.Client, opciones.Session, FILTER, UPDATE);
    }
    private async obtenerCodigo(opciones: TOptions): Promise<TEquipo['Codigo']> {
        const pipe: Array<pipeline> = [
            { $group: { _id: null, Codigo: { $max: '$Codigo' } } },
            { $project: { _id: 0, Codigo: 1 } },
            { $limit: 1 },
        ];
        const EQUIPOS = await this.find(opciones.Client, pipe);
        return EQUIPOS.length > 0 ? EQUIPOS[0].Codigo + 1 : 1;
    }
}
