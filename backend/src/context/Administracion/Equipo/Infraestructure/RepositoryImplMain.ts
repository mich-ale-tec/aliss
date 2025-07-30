import { RepositoryImplMongoGenerico as RepoImplMongoGene } from '../../../shared/Infraestructure/RepositoryImplMongoGenerico';
import { RepositoryMain } from '../Domain/RepositoryMain';
import { AdapterConfigure as AC } from './AdapterConfigure';
import { TEquipo } from '../Domain/TEquipo';
import { TOptions } from '../../../shared/Domain/RepositoryGenerico';
import { pipeline } from '../../../shared/Domain/EntityUpdate';

export class RepositoryImplMain extends RepoImplMongoGene<TEquipo> implements RepositoryMain {
    constructor() {
        super(AC.URI, AC.DATABASE, AC.SCHEMA, AC.ENTITY);
    }
    async obtener(opciones: TOptions): Promise<Array<TEquipo>> {
        const pipe: Array<pipeline> = [{ $match: {} }];
        return await this.find(opciones.Client, pipe);
    }
    async obtenerPorCodigo(equipo: TEquipo['Codigo'], opciones: TOptions): Promise<TEquipo> {
        const pipe: Array<pipeline> = [{ $match: { Codigo: equipo } }];
        const EQUIPOS = await this.find(opciones.Client, pipe);
        const [EQUIPO] = EQUIPOS;
        if (!EQUIPO) throw new Error('¡No se encontró el jugador!');
        return EQUIPO;
    }
}
