import { EntityIndex } from '../../../shared/Domain/EntityIndex';
import { EntityObjectDatabase } from '../../../shared/Domain/EntityObjectDatabase';
import { EntityAdapterConfigure } from '../../../shared/Domain/EntityAdapterConfigure';

const URI: string = process.env.URI_ADMINISTRACION_LIGA ?? '';
const DATABASE: string = process.env.DATABASE_ADMINISTRACION_LIGA ?? '';
const SCHEMA: string = process.env.SCHEMA_ADMINISTRACION_LIGA ?? '';
const ENTITY: string = process.env.ENTITY_ADMINISTRACION_LIGA ?? '';

const TIMEZONE: string = process.env.TZ ?? '';

const DATABASE_OBJECTS: Array<EntityObjectDatabase> = [
    {
        schema: SCHEMA,
        entity: ENTITY,
        structure: [],
    },
];

const DATABASE_INDEXES: Array<EntityIndex> = [
    {
        schema: SCHEMA,
        entity: ENTITY,
        name: `IDX_${SCHEMA}_${ENTITY}_Codigo`,
        fields: [{ name: 'Codigo', direction: 1 }],
        options: { unique: true },
    },
];

export const AdapterConfigure: EntityAdapterConfigure = {
    TIMEZONE,
    URI,
    DATABASE,
    SCHEMA,
    ENTITY,
    DATABASE_OBJECTS,
    DATABASE_INDEXES,
};
