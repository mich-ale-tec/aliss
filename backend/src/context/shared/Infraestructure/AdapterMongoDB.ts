import {
    ClientSession,
    MongoClient,
    MongoClientOptions,
    ObjectId,
    ReadConcern,
    ReadPreference,
} from 'mongodb';

export class AdapterMongoDB {
    public static async connection(uri: string, directConnection: boolean): Promise<MongoClient> {
        try {
            const options: MongoClientOptions = {};
            if (directConnection) {
                Object.assign<MongoClientOptions, MongoClientOptions>(options, {
                    directConnection: directConnection,
                });
            }
            return await MongoClient.connect(uri, options);
        } catch (error) {
            let message = '';
            if (error instanceof Error) {
                message = error.message;
            }
            throw Error(`No es posible establecer conexión con la base de datos ${message}`);
        }
    }
    public static async closeConnection(client: MongoClient): Promise<void> {
        await client.close(true);
    }
    public static async openSession(client: MongoClient): Promise<ClientSession> {
        return client.startSession({
            causalConsistency: true,
            defaultTransactionOptions: { readPreference: ReadPreference.primaryPreferred },
        });
    }
    public static async closeSession(session: ClientSession): Promise<void> {
        try {
            await session.endSession();
        } catch (error) {
            console.error('Ocurrio un error cerrando una sessión: ', error);
        }
    }
    public static async openTransaction(session: ClientSession): Promise<void> {
        if (session.inTransaction()) {
            throw Error('Ya existe una transacción iniciada');
        }
        session.startTransaction({
            readConcern: { level: ReadConcern.SNAPSHOT },
            writeConcern: { w: 'majority' },
        });
    }
    public static async commitTransaction(session: ClientSession): Promise<void> {
        if (!session.inTransaction()) {
            throw Error('No existe una transacción');
        }
        await session.commitTransaction();
    }
    public static async rollbackTransaction(session: ClientSession): Promise<void> {
        if (!session.inTransaction()) {
            throw Error('No existe una transacción');
        }
        await session.abortTransaction();
    }
    /* eslint-disable @typescript-eslint/no-explicit-any */
    public static validateDocument(obj: any): any {
        const checkForValidMongoDbID = new RegExp('^[0-9a-fA-F]{24}$');

        const isIsoDate = (str: string) => {
            if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
            const d = new Date(str);
            return d.toISOString() === str; // valid date
        };
        for (const key of Object.keys(obj)) {
            if (obj[key]) {
                if (key.includes('_id')) {
                    if (typeof obj[key] === 'string') {
                        obj[key] = checkForValidMongoDbID.test(obj[key])
                            ? new ObjectId(obj[key])
                            : obj[key];
                    }
                }
                if (key === '$in' || key === '$nin') {
                    const valores: Array<any> = obj[key];
                    obj[key] = valores.map(row =>
                        checkForValidMongoDbID.test(row) ? new ObjectId(row) : row,
                    );
                }
                if (typeof obj[key] === 'object') {
                    if (Array.isArray(obj[key])) {
                        for (const row of obj[key]) {
                            AdapterMongoDB.validateDocument(row);
                        }
                    } else {
                        AdapterMongoDB.validateDocument(obj[key]);
                    }
                } else if (typeof obj[key] === 'string') {
                    if (key.trim().toLocaleLowerCase().includes('fecha')) {
                        obj[key] = isIsoDate(obj[key]) ? new Date(obj[key]) : obj[key];
                    }
                    if (key.trim().toLocaleLowerCase().includes('gte')) {
                        obj[key] = isIsoDate(obj[key]) ? new Date(obj[key]) : obj[key];
                    }
                    if (key.trim().toLocaleLowerCase().includes('lte')) {
                        obj[key] = isIsoDate(obj[key]) ? new Date(obj[key]) : obj[key];
                    }
                }
            }
        }
        return obj;
    }
    /* eslint-enable @typescript-eslint/no-explicit-any */
    public static decodeError(error: unknown) {
        if (error && typeof error === 'object') {
            if ('code' in error) {
                switch (error.code) {
                    case 11000:
                        throw new Error(
                            'existe duplicidad de datos, favor de verificar la información',
                        );
                        break;
                    default:
                        break;
                }
            }
        }
    }
}
