import { JSONSchemaType } from 'ajv';
import { ParameterizedContext } from 'koa';
import ValidatorGenerico from '../../../shared/Infraestructure/ValidatorGenerico';
import {
    TRequestAgregar,
    TRequestEditar,
    TRequestPorCodigo,
    TRequestPorEquipo,
    TRequestTransferir,
} from '../Domain/TRequest';

export default class ValidatorAJV extends ValidatorGenerico {
    constructor() {
        super();
    }
    editar(datos: TRequestEditar, ctx: ParameterizedContext) {
        const schema: JSONSchemaType<TRequestEditar> = {
            type: 'object',
            properties: {
                Codigo: { type: 'number' },
                Numero: { type: 'number' },
                ApellidoPaterno: { type: 'string' },
                ApellidoMaterno: { type: 'string' },
                Nombres: { type: 'string' },
                Posicion: { type: 'string' },
                Edad: { type: 'number' },
                Nacionalidad: { type: 'string' },
            },
            required: [
                'Codigo',
                'Numero',
                'ApellidoPaterno',
                'ApellidoMaterno',
                'Nombres',
                'Posicion',
                'Edad',
                'Nacionalidad',
            ],
            additionalProperties: false,
        };
        this.validar<TRequestEditar>(datos, schema, ctx);
    }
    transferir(datos: TRequestTransferir, ctx: ParameterizedContext) {
        const schema: JSONSchemaType<TRequestTransferir> = {
            type: 'object',
            properties: {
                Codigo: { type: 'number' },
                Equipo: { type: 'number' },
            },
            required: ['Codigo', 'Equipo'],
            additionalProperties: false,
        };
        this.validar<TRequestTransferir>(datos, schema, ctx);
    }
    agregar(datos: TRequestAgregar, ctx: ParameterizedContext) {
        const schema: JSONSchemaType<TRequestAgregar> = {
            type: 'object',
            properties: {
                Equipo: { type: 'number' },
                Numero: { type: 'number' },
                ApellidoPaterno: { type: 'string' },
                ApellidoMaterno: { type: 'string' },
                Nombres: { type: 'string' },
                Posicion: { type: 'string' },
                Edad: { type: 'number' },
                Nacionalidad: { type: 'string' },
            },
            required: [
                'Equipo',
                'Numero',
                'ApellidoPaterno',
                'ApellidoMaterno',
                'Nombres',
                'Posicion',
                'Edad',
                'Nacionalidad',
            ],
            additionalProperties: false,
        };
        this.validar<TRequestAgregar>(datos, schema, ctx);
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
    obtenerPorEquipo(datos: TRequestPorEquipo, ctx: ParameterizedContext) {
        const schema: JSONSchemaType<TRequestPorEquipo> = {
            type: 'object',
            properties: {
                Equipo: { type: 'number' },
            },
            required: ['Equipo'],
            additionalProperties: false,
        };
        this.validar<TRequestPorEquipo>(datos, schema, ctx);
    }
}
