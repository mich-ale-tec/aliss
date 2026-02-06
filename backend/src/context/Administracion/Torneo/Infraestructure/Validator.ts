import { JSONSchemaType } from 'ajv';
import { ParameterizedContext } from 'koa';
import ValidatorGenerico from '../../../shared/Infraestructure/ValidatorGenerico';
import { TRequestAgregar, TRequestPorCodigo, TRequestPorLiga } from '../Domain/TRequest';

export default class ValidatorAJV extends ValidatorGenerico {
    constructor() {
        super();
    }
    agregar(datos: TRequestAgregar, ctx: ParameterizedContext) {
        const schema: JSONSchemaType<TRequestAgregar> = {
            type: 'object',
            properties: {
                Nombre: { type: 'string' },
                Descripcion: { type: 'string' },
                Logo: { type: 'string' },
                Liga: { type: 'number' },
                FechaInicio: { type: 'string', format: 'date' },
                FechaFin: { type: 'string', format: 'date' },
            },
            required: ['Nombre', 'Descripcion', 'Logo', 'Liga', 'FechaInicio', 'FechaFin'],
            additionalProperties: false,
        };
        this.validar<TRequestAgregar>(datos, schema, ctx);
    }
    obtenerPorLiga(datos: TRequestPorLiga, ctx: ParameterizedContext) {
        const schema: JSONSchemaType<TRequestPorLiga> = {
            type: 'object',
            properties: {
                Liga: { type: 'number' },
            },
            required: ['Liga'],
            additionalProperties: false,
        };
        this.validar<TRequestPorLiga>(datos, schema, ctx);
    }
    obtenerPorCodigo(datos: TRequestPorCodigo, ctx: ParameterizedContext) {
        const schema: JSONSchemaType<TRequestPorCodigo> = {
            type: 'object',
            properties: {
                Codigo: { type: 'number' },
            },
            required: ['Codigo'],
            additionalProperties: false,
        };
        this.validar<TRequestPorCodigo>(datos, schema, ctx);
    }
}
