import { ClientSession, Filter, MongoClient, MongoClient as MC, UpdateFilter } from 'mongodb';
import { pipeline } from './EntityUpdate';

export interface RepositoryGenerico<T> {
    connection(): Promise<MC>;
    session(client: MC): Promise<ClientSession>;
    startTransaction(session: ClientSession): Promise<void>;
    commitTransaction(session: ClientSession): Promise<void>;
    rollbackTransaction(session: ClientSession): Promise<void>;
    closeSession(session: ClientSession): Promise<void>;
    closeConnection(client: MC): Promise<void>;

    find(client: MC, pipe: Array<pipeline>): Promise<Array<T>>;
    saveOne(client: MC, session: ClientSession, obj: T): Promise<void>;
    saveMany(client: MC, session: ClientSession, obj: Array<T>): Promise<void>;
    updateOne(cli: MC, ses: ClientSession, fil: Filter<T>, upd: UpdateFilter<T>): Promise<void>;
    updateMany(cli: MC, sess: ClientSession, fil: Filter<T>, upd: UpdateFilter<T>): Promise<void>;
    deleteOne(client: MC, session: ClientSession, filter: Filter<T>): Promise<void>;
    deleteMany(client: MC, session: ClientSession, filter: Filter<T>): Promise<void>;
}
export type TOptions = {
    Client: MongoClient;
    Session?: ClientSession;
};
