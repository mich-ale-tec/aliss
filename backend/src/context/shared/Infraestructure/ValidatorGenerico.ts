import Ajv, { DefinedError, JSONSchemaType } from 'ajv';
import { ParameterizedContext } from 'koa';

export default abstract class ValidatorGenerico {
    private ajv: Ajv;
    protected constructor() {
        this.ajv = new Ajv();
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
                }
            }
        }
    }
}
