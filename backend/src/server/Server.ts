import koa from 'koa';
import logger from 'koa-logger';
import 'dotenv/config';
import helmet from 'koa-helmet';
import compress from 'koa-compress';
import cors from '@koa/cors';
import koaBody, { KoaBodyMiddlewareOptions } from 'koa-body';
import Router from '@koa/router';
import * as zlib from 'node:zlib';

export default class Server {
    private readonly app: koa;
    private readonly port: number;
    private readonly listaBlanca: Array<string> = [];
    private prefijo: string = '/test';
    constructor() {
        this.app = new koa();
        this.port = Number(process.env.PUERTO || '3100');
        this.listaBlanca = ['localhost'];
    }
    // Public
    public cargarConfiguracion() {
        this.app.use(logger());
        this.app.proxy = true;
    }
    public cargarPlugins() {
        this.app.use(helmet());
        this.app.use(compress(this.opcionesCompress()));
        this.app.use(cors(this.opcionesCors()));
    }
    public cargarLimites() {
        this.app.use(koaBody(this.opcionesBody()));
    }
    public cargarAdministradorError() {
        this.app.on('error', (err, ctx) => {
            if (!ctx.statusCode) {
                ctx.status = 500;
            }
            ctx.throw(ctx.statusCode, {
                error: err,
                errDescripcion: err.message,
            });
        });
    }
    public inyectarRutas(router: Router) {
        if (router.opts.prefix) {
            this.prefijo = router.opts.prefix;
        }
        this.app.use(router.routes());
        this.app.use(router.allowedMethods());
    }
    public iniciar() {
        this.app.listen(this.port);
        console.info('   >> PREFIX: ', this.prefijo);
        console.info('   >> PID: ', process.pid);
        console.info('   >> PORT: ', this.port);
    }
    // Privadas
    private opcionesCompress(): compress.CompressOptions {
        return {
            filter(content_type) {
                return /text/i.test(content_type);
            },
            threshold: 2048,
            gzip: {
                flush: zlib.constants.Z_SYNC_FLUSH,
            },
            deflate: {
                flush: zlib.constants.Z_SYNC_FLUSH,
            },
            br: false,
        };
    }
    private opcionesCors(): cors.Options {
        return {
            origin: (ctx) => {
                const ORIGEN = ctx.request.header.origin || '';
                if (ctx.origin && !this.listaBlanca.includes(ORIGEN)) {
                    ctx.throw(403, 'Origin not allowed by CORS');
                }
                return ORIGEN;
            },
        };
    }
    private opcionesBody(): Partial<KoaBodyMiddlewareOptions> {
        return {
            jsonLimit: '15360mb',
            textLimit: '15360mb',
            formLimit: '15360mb',
            multipart: true,
        };
    }
}
