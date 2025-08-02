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
                Breve: { type: 'string' },
                Ciudad: { type: 'string' },
                Descripcion: { type: 'string' },
                Entrenador: { type: 'string' },
                Estadio: { type: 'string' },
                Fundado: { type: 'string' },
                Logo: { type: 'string' },
            },
            required: [
                'Codigo',
                'Breve',
                'Ciudad',
                'Descripcion',
                'Entrenador',
                'Estadio',
                'Fundado',
                'Logo',
            ],
            additionalProperties: false,
        };
        this.validar<TRequestEditar>(datos, schema, ctx);
    }
    agregar(datos: TRequestAgregar, ctx: ParameterizedContext) {
        const schema: JSONSchemaType<TRequestAgregar> = {
            type: 'object',
            properties: {
                Breve: { type: 'string' },
                Ciudad: { type: 'string' },
                Descripcion: { type: 'string' },
                Entrenador: { type: 'string' },
                Estadio: { type: 'string' },
                Fundado: { type: 'string' },
                Logo: { type: 'string' },
                Nombre: { type: 'string' },
            },
            required: [
                'Breve',
                'Ciudad',
                'Descripcion',
                'Entrenador',
                'Estadio',
                'Fundado',
                'Logo',
                'Nombre',
            ],
            additionalProperties: false,
        };
        this.validar<TRequestAgregar>(datos, schema, ctx);
    }
    obtenerPorCodigo(datos: TRequestPorCodigo, ctx: ParameterizedContext) {
        const schema: JSONSchemaType<TRequestPorCodigo> = {
            type: 'object',
            properties: {
                Equipo: { type: 'number' },
            },
            required: ['Equipo'],
            additionalProperties: false,
        };
        this.validar<TRequestPorCodigo>(datos, schema, ctx);
    }
}
