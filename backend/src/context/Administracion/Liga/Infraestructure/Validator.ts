import { JSONSchemaType } from 'ajv';
import { ParameterizedContext } from 'koa';
import ValidatorGenerico from '../../../shared/Infraestructure/ValidatorGenerico';
import { TRequestAgregar, TRequestEditar, TRequestPorCodigo } from '../Domain/TRequest';

export default class ValidatorAJV extends ValidatorGenerico {
    constructor() {
        super();
    }
    editar(datos: TRequestEditar, ctx: ParameterizedContext) {
        const schema: JSONSchemaType<TRequestEditar> = {
            type: 'object',
            properties: {
                Codigo: { type: 'number' },
                Nombre: { type: 'string' },
                Descripcion: { type: 'string' },
                Logo: { type: 'string' },
                Anio: { type: 'number' },
                FechaInicio: { type: 'string', format: 'date' },
                FechaFin: { type: 'string', format: 'date' },
                Equipos: { type: 'array', items: { type: 'number' } },
            },
            required: [
                'Codigo',
                'Nombre',
                'Descripcion',
                'Logo',
                'Anio',
                'FechaFin',
                'FechaInicio',
                'Equipos',
            ],
            additionalProperties: false,
        };
        this.validar<TRequestEditar>(datos, schema, ctx);
    }
    agregar(datos: TRequestAgregar, ctx: ParameterizedContext) {
        const schema: JSONSchemaType<TRequestAgregar> = {
            type: 'object',
            properties: {
                Nombre: { type: 'string' },
                Descripcion: { type: 'string' },
                Logo: { type: 'string' },
                Anio: { type: 'number' },
                FechaInicio: { type: 'string', format: 'date' },
                FechaFin: { type: 'string', format: 'date' },
                Equipos: { type: 'array', items: { type: 'number' } },
            },
            required: [
                'Nombre',
                'Descripcion',
                'Logo',
                'Anio',
                'FechaFin',
                'FechaInicio',
                'Equipos',
            ],
            additionalProperties: false,
        };
        this.validar<TRequestAgregar>(datos, schema, ctx);
    }
    obtenerPorCodigo(datos: TRequestPorCodigo, ctx: ParameterizedContext) {
        const schema: JSONSchemaType<TRequestPorCodigo> = {
            type: 'object',
            properties: {
                Liga: { type: 'number' },
            },
            required: ['Liga'],
            additionalProperties: false,
        };
        this.validar<TRequestPorCodigo>(datos, schema, ctx);
    }
}
