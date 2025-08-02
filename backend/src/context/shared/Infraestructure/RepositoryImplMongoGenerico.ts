import {
    ClientSession as CS,
    AggregateOptions,
    Filter,
    MongoClient as MC,
    UpdateFilter as UF,
    OptionalUnlessRequiredId,
} from 'mongodb';
import { RepositoryGenerico } from '../Domain/RepositoryGenerico';
import { AdapterMongoDB } from './AdapterMongoDB';
import { pipeline } from '../Domain/EntityUpdate';
import { Document } from 'mongodb';

export abstract class RepositoryImplMongoGenerico<T extends Document>
    implements RepositoryGenerico<T>
{
    protected uri: string;
    protected database: string;
    protected schema: string;
    protected entity: string;

    protected constructor(_uri: string, _database: string, _schema: string, _entity: string) {
        this.uri = _uri;
        this.database = _database;
        this.schema = _schema;
        this.entity = _entity;
    }
    async connection(): Promise<MC> {
        const directConnection = process.env.MONGO_DIRECTCONECTION === 'true';
        return await AdapterMongoDB.connection(this.uri, directConnection);
    }
    async session(client: MC): Promise<CS> {
        return await AdapterMongoDB.openSession(client);
    }
    async startTransaction(session: CS): Promise<void> {
        await AdapterMongoDB.openTransaction(session);
    }
    async commitTransaction(session: CS): Promise<void> {
        await AdapterMongoDB.commitTransaction(session);
    }
    async rollbackTransaction(session: CS): Promise<void> {
        await AdapterMongoDB.rollbackTransaction(session);
    }
    async closeSession(session: CS): Promise<void> {
        await AdapterMongoDB.closeSession(session);
    }
    async closeConnection(client: MC): Promise<void> {
        await AdapterMongoDB.closeConnection(client);
    }
    public async find(cli: MC, pipe: pipeline[]): Promise<Array<T>> {
        const OPTIONS: AggregateOptions = {};
        const col = cli.db(this.database).collection<T>(`${this.schema}_${this.entity}`);
        for (const row of pipe) {
            AdapterMongoDB.validateDocument(row);
        }
        return await col.aggregate<T>(pipe, OPTIONS).toArray();
    }
    public async saveOne(client: MC, session: CS, obj: T): Promise<void> {
        return await this._saveOne(client, session, obj);
    }
    private async _saveOne(client: MC, session: CS, obj: T): Promise<void> {
        try {
            AdapterMongoDB.validateDocument(obj);
            const col = client.db(this.database).collection<T>(`${this.schema}_${this.entity}`);
            const RES = await col.insertOne(obj as OptionalUnlessRequiredId<T>, { session });
            if (!RES.acknowledged) {
                throw Error('No se guardaron los datos correctamente');
            }
        } catch (error) {
            AdapterMongoDB.decodeError(error);
        }
    }
    public async saveMany(client: MC, session: CS, obj: T[]): Promise<void> {
        await this._saveMany(client, session, obj);
    }
    private async _saveMany(client: MC, sess: CS, obj: T[]): Promise<void> {
        try {
            for (const row of obj) {
                AdapterMongoDB.validateDocument(row);
            }
            const col = client.db(this.database).collection<T>(`${this.schema}_${this.entity}`);
            const OPTIONS = {
                session: sess,
            };
            const response = await col.insertMany(obj as OptionalUnlessRequiredId<T>[], OPTIONS);
            if (!response.acknowledged) {
                throw Error('No se guardaron los datos correctamente');
            }
        } catch (error) {
            AdapterMongoDB.decodeError(error);
        }
    }
    public async updateOne(cli: MC, ses: CS, fil: Filter<T>, up: UF<T>): Promise<void> {
        await this._updateOne(cli, ses, fil, up);
    }
    private async _updateOne(cli: MC, sess: CS, fil: Filter<T>, upd: UF<T>): Promise<void> {
        try {
            AdapterMongoDB.validateDocument(fil);
            AdapterMongoDB.validateDocument(upd);
            const col = cli.db(this.database).collection<T>(`${this.schema}_${this.entity}`);
            const updateResult = await col.updateOne(fil, upd, { session: sess });
            if (!updateResult.acknowledged) {
                throw Error('No se actualizaron los datos correctamente');
            }
        } catch (error) {
            AdapterMongoDB.decodeError(error);
        }
    }
    public async updateMany(cli: MC, ses: CS, fil: Filter<T>, upd: UF<T>): Promise<void> {
        await this._updateMany(cli, ses, fil, upd);
    }
    private async _updateMany(cli: MC, session: CS, fil: Filter<T>, upd: UF<T>): Promise<void> {
        try {
            AdapterMongoDB.validateDocument(fil);
            AdapterMongoDB.validateDocument(upd);
            const col = cli.db(this.database).collection<T>(`${this.schema}_${this.entity}`);
            const updateResult = await col.updateMany(fil, upd, { session: session });
            if (!updateResult.acknowledged) {
                throw Error('No se actualizaron los datos correctamente');
            }
        } catch (error) {
            AdapterMongoDB.decodeError(error);
        }
    }
    public async deleteOne(client: MC, session: CS, filter: Filter<T>): Promise<void> {
        await this._deleteOne(client, session, filter);
    }
    private async _deleteOne(client: MC, session: CS, filter: Filter<T>): Promise<void> {
        try {
            AdapterMongoDB.validateDocument(filter);
            const col = client.db(this.database).collection<T>(`${this.schema}_${this.entity}`);
            const deleteResult = await col.deleteOne(filter, { session });
            if (!deleteResult.acknowledged) {
                throw Error('No se eliminaron los datos correctamente');
            }
        } catch (error) {
            AdapterMongoDB.decodeError(error);
            throw error;
        }
    }
    public async deleteMany(client: MC, session: CS, filter: Filter<T>): Promise<void> {
        await this._deleteMany(client, session, filter);
    }
    private async _deleteMany(client: MC, session: CS, filter: Filter<T>): Promise<void> {
        try {
            AdapterMongoDB.validateDocument(filter);
            const col = client.db(this.database).collection<T>(`${this.schema}_${this.entity}`);
            const deleteResult = await col.deleteMany(filter, { session });
            if (!deleteResult.acknowledged) {
                throw Error('No se eliminaron los datos correctamente');
            }
        } catch (error) {
            AdapterMongoDB.decodeError(error);
        }
    }
}
