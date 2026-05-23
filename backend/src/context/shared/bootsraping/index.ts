import { EntityObjectDatabase } from '../Domain/EntityObjectDatabase';
import { BootstrapingDatabaseMongo } from './database/mongodb';
import { EntityIndex } from '../Domain/EntityIndex';

export class Bootstraping {
    public databaseBootstrap: BootstrapingDatabaseMongo;
    constructor(
        motor: string,
        uri: string,
        database: string,
        objects: Array<EntityObjectDatabase>,
        indexes: Array<EntityIndex>,
    ) {
        switch (motor.toLowerCase()) {
            case 'mongo':
            case 'mongodb': {
                const directConnection = process.env.MONGO_DIRECTCONECTION === 'true';
                console.log(`URI: ${uri}`);
                this.databaseBootstrap = new BootstrapingDatabaseMongo(
                    uri,
                    database,
                    objects,
                    indexes,
                    directConnection,
                );
                break;
            }
            default:
                throw new Error('No support motor database');
                break;
        }
    }
    async exec() {
        await this.databaseBootstrap.exec();
    }
}
