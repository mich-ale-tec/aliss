import { EntityIndex } from './EntityIndex';
import { EntityObjectDatabase } from './EntityObjectDatabase';

export type EntityAdapterConfigure = {
    TIMEZONE: string;
    URI: string;
    DATABASE: string;
    SCHEMA: string;
    ENTITY: string;
    DATABASE_OBJECTS: Array<EntityObjectDatabase>;
    DATABASE_INDEXES: Array<EntityIndex>;
};
