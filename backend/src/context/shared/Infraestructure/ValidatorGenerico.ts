import Ajv, { DefinedError, JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
import { ParameterizedContext } from 'koa';

export default abstract class ValidatorGenerico {
    private readonly ajv: Ajv;
    protected constructor() {
        this.ajv = new Ajv();
        addFormats(this.ajv, ['date', 'time']);
    }
    protected validar<T>(datos: T, schema: JSONSchemaType<T>, ctx: ParameterizedContext) {
        const validate = this.ajv.compile(schema);
        if (!validate(datos)) {
            for (const err of validate.errors as DefinedError[]) {
                switch (err.keyword) {
                    case 'required': {
                        const msg = `El parametro ${err.params.missingProperty} es obligatorio`;
                        ctx.throw(406, msg);
                        break;
                    }
                    case 'additionalProperties': {
                        const msg = `Existe un parametro adicional ${err.params.additionalProperty}, no esta permitido`;
                        ctx.throw(406, msg);
                        break;
                    }
                    case 'type': {
                        const parametro = err.instancePath.replace('/', '');
                        const msg = `El parametro ${parametro} tiene que ser ${err.params.type}`;
                        ctx.throw(406, msg);
                        break;
                    }
                    case 'format': {
                        const parametro = err.instancePath.replace('/', '');
                        const msg = `El parametro ${parametro} tiene que ser ${err.params.format} valido`;
                        ctx.throw(406, msg);
                        break;
                    }
                    default: {
                        ctx.throw(406, '¡Error, validación desconocida');
                        break;
                    }
                }
            }
        }
    }
}
