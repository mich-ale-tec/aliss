import { CreateIndexesOptions, MongoClient } from 'mongodb';
import { AdapterMongoDB } from '../../Infraestructure/AdapterMongoDB';
import { EntityIndex } from '../../Domain/EntityIndex';
import { EntityObjectDatabase } from '../../Domain/EntityObjectDatabase';

export class BootstrapingDatabaseMongo {
    private readonly uri: string;
    private readonly database: string;
    private readonly objects: Array<EntityObjectDatabase>;
    private readonly indexes: Array<EntityIndex>;
    private readonly directConection: boolean;

    constructor(
        _uri: string,
        _database: string,
        _objects: Array<EntityObjectDatabase>,
        indexes: Array<EntityIndex>,
        _directConection: boolean,
    ) {
        this.uri = _uri;
        this.database = _database;
        this.objects = _objects;
        this.indexes = indexes;
        this.directConection = _directConection;
    }
    public async exec(): Promise<void> {
        if (!!this.objects.length) {
            for (let row of this.objects) {
                await this.createCollection(row.schema, row.entity);
            }
        }
        if (!!this.indexes.length) {
            await this.createIndexes();
        }
    }
    private async createCollection(schema: string, entity: string): Promise<void> {
        let client: MongoClient = await AdapterMongoDB.connection(this.uri, this.directConection);
        let db = client.db(this.database);
        let collections = await db.listCollections().toArray();
        if (collections.findIndex(col => col.name === `${schema}_${entity}`) === -1) {
            await db.createCollection(`${schema}_${entity}`);
        }
        await client.close();
    }
    private async createIndexes(): Promise<void> {
        let client: MongoClient = await AdapterMongoDB.connection(this.uri, this.directConection);
        try {
            for (let row of this.indexes) {
                let db = client.db(this.database);
                let col = db.collection(`${row.schema}_${row.entity}`);

                let indexesExists = await col.listIndexes().toArray();
                if (!indexesExists.find(idx => idx.name === row.name)) {
                    await col.createIndex(
                        row.fields.reduce((obj, subrow) => {
                            Object.assign(obj, { [subrow.name]: subrow.direction });
                            return obj;
                        }, {}),
                        { name: row.name, ...row.options },
                    );
                }
            }
        } catch (error) {
            throw error;
        } finally {
            await client.close();
        }
    }
}
